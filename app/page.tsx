import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { ApproachSection } from "@/components/approach-section"
import { ImpactSection } from "@/components/impact-section"
import { OperationsSection } from "@/components/operations-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { DonateSection } from "@/components/donate-section"
import { StoriesSection } from "@/components/stories-section"
import { NewsSection } from "@/components/news-section"
import { VolunteerSection } from "@/components/volunteer-section"
import { SiteFooter } from "@/components/site-footer"
import { ContentProvider } from "@/lib/content-context"
import { SiteContent } from "@/lib/content-defaults"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  let initialContent: SiteContent | null = null
  try {
    const res = await fetch(`${process.env.DOMAIN_NAME}/api/home-page-content?t=${Date.now()}`, {
      headers: {
        'AUTHORIZATION_KEY': process.env.AUTHORIZATION_KEY || ""
      },
      cache: 'no-store'
    })
    if (res.ok) {
      initialContent = await res.json()
    } else {
      console.error("Failed to fetch home page content", res.status)
    }
  } catch (error) {
    console.error("Error fetching home page content:", error)
  }

  return (
    <ContentProvider initialContent={initialContent}>
      <main>
        <SiteHeader />
        <HeroSection />
        <ApproachSection />
        <ImpactSection />
        <OperationsSection />
        <TestimonialsSection />
        <DonateSection />
        <StoriesSection />
        <NewsSection />
        <VolunteerSection />
        <SiteFooter />
      </main>
    </ContentProvider>
  )
}
