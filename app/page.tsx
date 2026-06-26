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

export default function HomePage() {
  return (
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
  )
}
