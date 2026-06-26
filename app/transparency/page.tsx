import { PageShell } from "@/components/page-shell"
import { ShieldCheck, Eye, FileText, Lock } from "lucide-react"
import Link from "next/link"

const policies = [
  {
    icon: ShieldCheck,
    title: "Financial Accountability",
    items: [
      "Independent annual financial audit by a PCAOB-registered firm",
      "Full Form 990 published within 30 days of IRS filing",
      "Board-approved annual budget with quarterly reviews",
      "No board member or officer compensation exceeding sector norms",
      "Conflict of interest policy enforced at all governance levels",
    ],
  },
  {
    icon: Eye,
    title: "Program Transparency",
    items: [
      "All active deployments published on our website within 72 hours",
      "Outcome metrics reported per operation — families served, resources deployed",
      "Annual Impact Report with third-party verification",
      "Beneficiary feedback collection and published response rates",
      "No restricted programs — all funds used as designated or disclosed",
    ],
  },
  {
    icon: FileText,
    title: "Governance & Compliance",
    items: [
      "Independent board majority with no staff representation exceeding 49%",
      "Whistleblower policy with anonymous reporting channel",
      "Document retention and destruction policy",
      "Anti-fraud and anti-corruption training for all staff annually",
      "Compliance with all applicable nonprofit state registration requirements",
    ],
  },
  {
    icon: Lock,
    title: "Donor Privacy",
    items: [
      "Donor data never sold, rented, or shared with third parties",
      "PCI-DSS compliant payment processing",
      "Opt-out from all mailing lists at any time",
      "Full GDPR compliance for international donors",
      "Anonymized reporting — no individual donor data in public documents",
    ],
  },
]

export default function TransparencyPage() {
  return (
    <PageShell
      breadcrumbs={[{ label: "Transparency & Compliance" }]}
      eyebrow="Accountability"
      title="Our Commitment to Transparency"
      subtitle="Trust is earned through radical openness. Every policy, every filing, every outcome — all available to the public. No exceptions."
    >
      {/* Statement */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-b border-border">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="border-l-4 border-brand-red pl-8 mb-8">
              <p className="text-xl font-black text-foreground leading-tight">
                &ldquo;Donor trust is not a marketing goal. It is an operational standard.&rdquo;
              </p>
              <p className="text-sm text-brand-muted-text mt-2">— R3sults Board of Directors Policy Statement</p>
            </div>
            <p className="text-brand-muted-text leading-relaxed mb-6">
              R3sults Foundation operates under a voluntary disclosure framework that exceeds the requirements of
              IRS 501(c)(3) status. We publish our audits, our 990s, our board minutes, and our operational
              outcomes publicly — not because we have to, but because accountability is our standard.
            </p>
            <p className="text-brand-muted-text leading-relaxed">
              Our governance structure includes an independent board majority, a standing audit committee, and a
              whistleblower protection program. We have never received a material audit finding or regulatory
              enforcement action in our 20+ year history.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { label: "Years Without Audit Finding", value: "20+" },
              { label: "Charity Navigator Stars", value: "4 / 4" },
              { label: "GuideStar Seal Level", value: "Platinum" },
              { label: "Program Efficiency Rate", value: "96%" },
              { label: "Board Independence Rate", value: "100%" },
              { label: "Financial Documents Published", value: "All" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between border border-border px-6 py-4">
                <span className="text-sm text-brand-muted-text">{item.label}</span>
                <span className="text-sm font-black text-brand-red">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy pillars */}
      <section className="bg-brand-surface border-b border-border py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-brand-red" />
              <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">Our Policies</span>
          </div>
          <h2 className="text-3xl font-black text-foreground mb-14 text-balance">How We Hold Ourselves Accountable</h2>
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {policies.map((policy) => (
              <div key={policy.title} className="bg-brand-surface p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-brand-red/10 border border-brand-red/20 flex items-center justify-center">
                    <policy.icon size={16} className="text-brand-red" />
                  </div>
                  <h3 className="font-black text-foreground">{policy.title}</h3>
                </div>
                <ul className="space-y-3">
                  {policy.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-brand-muted-text leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links to financials */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-border p-10">
          <div>
            <h3 className="text-xl font-black text-foreground mb-2">Review our financial documents</h3>
            <p className="text-brand-muted-text text-sm">Form 990s, independent audits, and financial statements — all publicly available.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/financials"
              className="inline-flex items-center gap-2 bg-brand-red text-primary-foreground text-sm font-bold px-7 py-3.5 tracking-widest uppercase hover:bg-brand-red/90 transition-all duration-200"
            >
              View Financials
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-border text-foreground text-sm font-bold px-7 py-3.5 tracking-widest uppercase hover:border-foreground transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
