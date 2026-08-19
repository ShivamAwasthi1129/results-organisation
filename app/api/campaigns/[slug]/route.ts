import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ slug: string }> | { slug: string } }) {
  try {
    const raw = await context.params;
    const adminUrl = process.env.ADMIN_DASHBOARD_URL || 'http://localhost:3001';
    const res = await fetch(`${adminUrl}/api/public/campaigns/${raw.slug}?t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
