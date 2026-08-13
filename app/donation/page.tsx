import { PageShell } from "@/components/page-shell"
import { DonateSection } from "@/components/donate-section"

export default function DonationPage() {
  return (
    <PageShell
      breadcrumbs={[{ label: "Donation" }]}
      eyebrow="Support Our Mission"
      title="Make a Difference Today"
      subtitle="Your contribution allows us to respond immediately when disaster strikes and stay until recovery is complete. Every dollar makes a measurable impact."
    >
      <DonateSection />
    </PageShell>
  )
}
