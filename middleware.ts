import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that should NEVER be redirected to maintenance
const BYPASS_PREFIXES = [
  '/admin',
  '/api',
  '/_next',
  '/maintenance',
  '/favicon',
]

const BYPASS_EXTENSIONS = [
  '.ico', '.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif',
  '.woff', '.woff2', '.ttf', '.css', '.js', '.map'
]

function shouldBypass(pathname: string): boolean {
  if (BYPASS_PREFIXES.some(prefix => pathname.startsWith(prefix))) return true
  if (BYPASS_EXTENSIONS.some(ext => pathname.endsWith(ext))) return true
  return false
}

// Admin dashboard URL — where maintenance config is managed via toggle
const ADMIN_DASHBOARD_URL =
  process.env.ADMIN_DASHBOARD_URL ||
  process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL ||
  'https://results-admin-dashboard.vercel.app'

// In-memory cache for edge/serverless runtime
// Avoids repeated external fetches on rapid navigation and eliminates cold-start timeouts
interface MaintenanceState {
  globalMaintenance: boolean
  routes: Record<string, boolean>
}

let cachedState: MaintenanceState | null = null
let lastFetchTime = 0
const CACHE_TTL_MS = 3000 // 3 seconds: re-checks admin panel frequently for instant toggle response

async function fetchMaintenanceState(requestUrl: string): Promise<MaintenanceState | null> {
  const now = Date.now()
  if (cachedState && (now - lastFetchTime) < CACHE_TTL_MS) {
    return cachedState
  }

  // 1. Primary: fetch from central Admin Dashboard
  try {
    const res = await fetch(`${ADMIN_DASHBOARD_URL}/api/public/maintenance`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(8000), // Generous 8s timeout to tolerate Vercel cold starts
      headers: { 'Accept': 'application/json' },
    })

    if (res.ok) {
      const data = await res.json()
      cachedState = {
        globalMaintenance: Boolean(data.globalMaintenance),
        routes: data.routes || {},
      }
      lastFetchTime = Date.now()
      return cachedState
    }
  } catch (error) {
    console.warn('[Middleware] Failed to fetch maintenance state from admin dashboard:', error)
  }

  // 2. Secondary fallback: fetch from local app API route
  try {
    const localUrl = new URL('/api/maintenance', requestUrl)
    const localRes = await fetch(localUrl.toString(), {
      cache: 'no-store',
      signal: AbortSignal.timeout(2000),
      headers: { 'Accept': 'application/json' },
    })
    if (localRes.ok) {
      const localData = await localRes.json()
      cachedState = {
        globalMaintenance: Boolean(localData.globalMaintenance),
        routes: localData.routes || {},
      }
      lastFetchTime = Date.now()
      return cachedState
    }
  } catch {
    // Local fetch also failed
  }

  // 3. Preserve last known state rather than failing open
  return cachedState
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip maintenance check for static assets, Next.js bundles, API, admin, and /maintenance
  if (shouldBypass(pathname)) {
    return NextResponse.next()
  }

  const config = await fetchMaintenanceState(request.url)

  if (config) {
    const normalizedPath = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
    const isUnderMaintenance =
      config.globalMaintenance === true ||
      (config.routes && config.routes[normalizedPath] === true)

    if (isUnderMaintenance) {
      const maintenanceUrl = new URL('/maintenance', request.url)
      const response = NextResponse.redirect(maintenanceUrl, 307)
      // Prevent browser / proxy caching of the redirect so toggle OFF works immediately
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      response.headers.set('Pragma', 'no-cache')
      response.headers.set('Expires', '0')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
