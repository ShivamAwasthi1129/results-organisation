import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const CONFIG_PATH = path.join(process.cwd(), 'maintenance-config.json')

const DEFAULT_CONFIG = {
  globalMaintenance: false,
  routes: {
    "/": false,
    "/about": false,
    "/campaigns": false,
    "/disasters": false,
    "/contact": false,
    "/corporate-giving": false,
    "/donation": false,
    "/financials": false,
    "/impact": false,
    "/leadership": false,
    "/partner": false,
    "/preparedness": false,
    "/press": false,
    "/privacy": false,
    "/stories": false,
    "/terms": false,
    "/transparency": false,
    "/volunteer": false,
  }
}

async function readConfig() {
  try {
    const raw = await readFile(CONFIG_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return DEFAULT_CONFIG
  }
}

// Trigger a Vercel redeploy so the MAINTENANCE_MODE env var change takes effect.
// Requires VERCEL_DEPLOY_HOOK_URL to be set in environment variables.
// Set this up in: Vercel Dashboard → Project → Settings → Git → Deploy Hooks
async function triggerRedeploy(): Promise<boolean> {
  const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL
  if (!hookUrl) return false
  try {
    const res = await fetch(hookUrl, { method: 'POST' })
    return res.ok
  } catch {
    return false
  }
}

export async function GET() {
  // Return the current maintenance state.
  // MAINTENANCE_MODE env var is the authoritative source.
  const envMode = process.env.MAINTENANCE_MODE
  const globalMaintenance = envMode === '1' || envMode === 'true'

  // Merge with file config for per-route settings
  const fileConfig = await readConfig()

  return NextResponse.json(
    { ...fileConfig, globalMaintenance },
    { headers: { 'Cache-Control': 'no-store', 'Access-Control-Allow-Origin': '*' } }
  )
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const current = await readConfig()

    const updated = {
      globalMaintenance: typeof body.globalMaintenance === 'boolean'
        ? body.globalMaintenance
        : current.globalMaintenance,
      routes: {
        ...current.routes,
        ...(body.routes || {})
      }
    }

    // Always write the file (for per-route settings)
    await writeFile(CONFIG_PATH, JSON.stringify(updated, null, 2), 'utf-8')

    // Trigger a redeploy so MAINTENANCE_MODE env var reflects the new state.
    // The deploy hook URL controls this; if not set, the cookie mechanism still works.
    let redeployTriggered = false
    if (typeof updated.globalMaintenance === 'boolean') {
      redeployTriggered = await triggerRedeploy()
    }

    return NextResponse.json({
      success: true,
      config: updated,
      redeployTriggered,
      note: redeployTriggered
        ? 'Redeploy triggered – maintenance mode will be active site-wide in ~1-2 minutes.'
        : 'Config saved. Set VERCEL_DEPLOY_HOOK_URL env var to enable instant site-wide maintenance.',
    })
  } catch (error) {
    console.error('Error writing maintenance config:', error)
    return NextResponse.json({ success: false, error: 'Failed to save config' }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  })
}