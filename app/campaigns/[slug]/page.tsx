import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CampaignDetailClient from './CampaignDetailClient';

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }): Promise<Metadata> {
  try {
    const raw = await params;
    const adminUrl = process.env.ADMIN_DASHBOARD_URL || 'http://localhost:3001';
    const res = await fetch(`${adminUrl}/api/public/campaigns/${raw.slug}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.campaign) {
        return {
          title: `${data.campaign.title} | R3sults.org`,
          description: data.campaign.subtitle || 'Support this campaign on R3sults.org',
          openGraph: { images: data.campaign.bannerUrl ? [data.campaign.bannerUrl] : [] },
        };
      }
    }
  } catch {}
  return { title: 'Campaign | R3sults.org' };
}

export default async function CampaignDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const raw = await params;
  let campaign: any = null;
  try {
    const adminUrl = process.env.ADMIN_DASHBOARD_URL || 'http://localhost:3001';
    const res = await fetch(`${adminUrl}/api/public/campaigns/${raw.slug}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.campaign) campaign = data.campaign;
    }
  } catch (e) {
    console.error('Error fetching campaign:', e);
  }
  if (!campaign) notFound();
  return <CampaignDetailClient campaign={campaign} />;
}
