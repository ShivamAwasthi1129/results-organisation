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

export async function GET() {
  const config = await readConfig()
  return NextResponse.json(config, {
    headers: {
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
    }
  })
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

    await writeFile(CONFIG_PATH, JSON.stringify(updated, null, 2), 'utf-8')
    return NextResponse.json({ success: true, config: updated })
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
