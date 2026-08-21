import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function GET() {
  let staticCampaigns: any[] = [];
  let dynamicCampaigns: any[] = [];

  // 1. Fetch existing static campaigns from backend content
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
      if (Array.isArray(campaigns)) {
        staticCampaigns = campaigns;
      }
    }
  } catch (error) {
    console.error("Error fetching static campaigns:", error);
  }

  // 2. Fetch new dynamic campaigns from Admin Dashboard CMS database
  try {
    const adminUrl = process.env.ADMIN_DASHBOARD_URL || 'http://localhost:3001';
    const res = await fetch(`${adminUrl}/api/public/campaigns?t=${Date.now()}`, {
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.campaigns)) {
        dynamicCampaigns = data.campaigns.map((c: any) => {
          const config = typeof c.donationConfig === 'string' 
            ? JSON.parse(c.donationConfig) 
            : c.donationConfig || {};
          
          return {
            id: c.id,
            name: c.title,
            description: c.description || "",
            location: c.location || "",
            date: c.startDate ? new Date(c.startDate).toLocaleDateString() : "",
            tiers: (config.tiers || []).map((t: any) => ({
              amount: Number(t.amount) || 0,
              label: t.name || "",
              description: t.description || ""
            }))
          };
        });
      }
    }
  } catch (error) {
    console.error("Error fetching dynamic campaigns from CMS:", error);
  }

  // Merge lists (dynamic first, fallback to static)
  const mergedCampaigns = [...dynamicCampaigns, ...staticCampaigns];

  return NextResponse.json({ success: true, campaigns: mergedCampaigns });
}

