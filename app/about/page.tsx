import { PageShell } from "@/components/page-shell"
import { Shield, Globe, Clock, Users } from "lucide-react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Preparedness First",
    description:
      "We invest in communities before disaster strikes. Prevention and preparation are the most cost-effective interventions in disaster management.",
  },
  {
    icon: Clock,
    title: "Speed & Precision",
    description:
      "Our pre-positioned resources and logistics network allow us to be on the ground within hours of a major event — not days.",
  },
  {
    icon: Globe,
    title: "Long-Term Commitment",
    description:
      "We stay through recovery and rebuilding. Our partnerships last years, not weeks. We measure success in restored communities, not press cycles.",
  },
  {
    icon: Users,
    title: "Community-Led",
    description:
      "Local leaders know their communities best. We operate as partners and enablers, amplifying existing capacity rather than replacing it.",
  },
]

const milestones = [
  { year: "2004", event: "R3sults Foundation founded in response to the Indian Ocean Tsunami." },
  { year: "2008", event: "Expanded operations to 5 countries with Hurricane Ike response." },
  { year: "2012", event: "Launched Community Preparedness Training Program, certified 10,000 responders." },
  { year: "2017", event: "Deployed to Hurricane Harvey — 3,200 families served in 45 days." },
  { year: "2020", event: "Established rapid COVID-19 humanitarian supply network across 8 countries." },
  { year: "2023", event: "Received USAID partnership designation for disaster response excellence." },
  { year: "2025", event: "Surpassed 100,000 individuals served across all active programs." },
]

export default function AboutPage() {
  return (
    <PageShell
      breadcrumbs={[{ label: "Our Mission" }]}
      eyebrow="About R3sults"
      title="We Exist to Save Lives and Rebuild Communities"
      subtitle="Founded in 2004, R3sults Foundation is a disaster management authority built on a simple belief: communities deserve a partner who prepares with them, responds for them, and stays until the work is finished."
    >
      {/* Mission statement */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="border-l-4 border-brand-red pl-8 mb-12">
              <p className="text-2xl md:text-3xl font-black text-foreground leading-tight text-balance">
                &ldquo;We don&apos;t just respond to disasters.{" "}
                <span className="text-brand-muted-text font-light">
                  We prepare communities, manage response, and stay until recovery and rebuilding is complete.&rdquo;
                </span>
              </p>
            </div>
            <p className="text-brand-muted-text leading-relaxed mb-6">
              Too many organizations show up for the headlines and leave when the cameras do. R3sults was founded
              to be different — a full-cycle partner that invests in every phase of the disaster management lifecycle.
            </p>
            <p className="text-brand-muted-text leading-relaxed mb-6">
              Over 20 years, we have served communities across 10+ countries, responding to floods, earthquakes,
              hurricanes, wildfires, and public health crises. Our methodology is field-tested, data-driven, and
              anchored in community trust.
            </p>
            <p className="text-brand-muted-text leading-relaxed">
              We are a registered 501(c)(3) nonprofit, committed to full financial transparency and measurable impact
              reporting. Every dollar donated is tracked and reported publicly.
            </p>
          </div>

          {/* Core values */}
          <div className="space-y-6">
            {values.map((v) => (
              <div key={v.title} className="flex items-start gap-5 p-6 border border-border hover:border-brand-red/40 hover:bg-brand-surface transition-all duration-300">
                <div className="w-10 h-10 border border-brand-red/30 bg-brand-red/5 flex items-center justify-center flex-shrink-0">
                  <v.icon size={18} className="text-brand-red" />
                </div>
                <div>
                  <h3 className="font-black text-foreground mb-1">{v.title}</h3>
                  <p className="text-sm text-brand-muted-text leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-brand-surface border-t border-border py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-0.5 bg-brand-red" />
            <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">Our History</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-14 text-balance">
            20 Years of Impact
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[60px] top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m) => (
                <div key={m.year} className="flex items-start gap-8">
                  <div className="w-[60px] text-right flex-shrink-0">
                    <span className="text-sm font-black text-brand-red">{m.year}</span>
                  </div>
                  <div className="hidden md:block w-3 h-3 rounded-full border-2 border-brand-red bg-background flex-shrink-0 mt-0.5 relative z-10" />
                  <p className="text-sm text-brand-muted-text leading-relaxed pt-0.5">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border border-border p-10">
          <div>
            <h3 className="text-2xl font-black text-foreground mb-2">Join the mission</h3>
            <p className="text-brand-muted-text text-sm">Donate, volunteer, or partner with us to build resilient communities.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 border border-foreground text-foreground text-sm font-bold px-6 py-3 tracking-widest uppercase hover:bg-foreground hover:text-background transition-all duration-200"
            >
              Volunteer
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-brand-red text-primary-foreground text-sm font-bold px-6 py-3 tracking-widest uppercase hover:bg-brand-red/90 transition-all duration-200 group"
            >
              Donate Now
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
