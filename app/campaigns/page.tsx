import { Metadata } from 'next';
import CampaignsListClient from './CampaignsListClient';

export const metadata: Metadata = {
  title: 'Campaigns | R3sults.org',
  description: 'Browse all active fundraising campaigns and donate to causes that matter.',
};

export const dynamic = "force-dynamic";

export default async function CampaignsPage() {
  let campaigns: any[] = [];
  try {
    const adminUrl = process.env.ADMIN_DASHBOARD_URL || 'http://localhost:3001';
    const res = await fetch(`${adminUrl}/api/public/campaigns?t=${Date.now()}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.campaigns)) {
        campaigns = data.campaigns;
      }
    }
  } catch (e) {
    console.error('Error fetching campaigns:', e);
  }
  return <CampaignsListClient initialCampaigns={campaigns} />;
}
