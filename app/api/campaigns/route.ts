import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(`${process.env.DOMAIN_NAME}/api/home-page-content?t=${Date.now()}`, {
      headers: {
        'AUTHORIZATION_KEY': process.env.AUTHORIZATION_KEY || ""
      },
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      let campaigns = data?.donate?.campaigns || [];
      if (campaigns && !Array.isArray(campaigns) && (campaigns as any).campaigns) {
        campaigns = (campaigns as any).campaigns;
      }
      if (!Array.isArray(campaigns)) {
        campaigns = [];
      }
      return NextResponse.json({ success: true, campaigns });
    }
    return NextResponse.json({ success: false, campaigns: [] }, { status: res.status });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json({ success: false, campaigns: [] }, { status: 500 });
  }
}
