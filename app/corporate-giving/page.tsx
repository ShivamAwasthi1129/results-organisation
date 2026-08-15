"use client"

import { useState } from "react"
import { PageShell } from "@/components/page-shell"
import { ArrowRight, Building2, Users, BarChart3, Globe, CheckCircle2 } from "lucide-react"

const programs = [
  {
    icon: Building2,
    title: "Corporate Matching",
    description: "We provide a simple matching portal for your HR team to manage employee donations. Every matched dollar goes directly to active operations.",
    benefit: "Double your team's impact",
  },
  {
    icon: Users,
    title: "Group Volunteering",
    description: "Bring your team to the field or provide skilled volunteer hours remotely. We coordinate everything — from briefings to deployment logistics.",
    benefit: "Up to 50-person group deployments",
  },
  {
    icon: BarChart3,
    title: "Cause Marketing",
    description: "Run a campaign with R3sults as the beneficiary. We provide approved messaging, impact tracking, and co-branded reporting for all stakeholders.",
    benefit: "Brand-aligned impact campaigns",
  },
  {
    icon: Globe,
    title: "Disaster-Specific Sponsorship",
    description: "Sponsor a named operation or program. Your brand is featured in all operation communications, press releases, and our annual impact report.",
    benefit: "Named recognition in all reports",
  },
]

const tiers = [
  {
    name: "Community Partner",
    range: "$10,000 – $49,999",
    perks: [
      "Logo in Annual Impact Report",
      "Quarterly impact updates",
      "Corporate matching portal access",
      "Certificate of corporate partnership",
    ],
  },
  {
    name: "Response Partner",
    range: "$50,000 – $249,999",
    perks: [
      "All Community Partner benefits",
      "Named in active deployment communications",
      "Group volunteer deployment (up to 15 people)",
      "Dedicated impact liaison",
      "Co-branded cause marketing assets",
    ],
    featured: true,
  },
  {
    name: "Recovery Partner",
    range: "$250,000+",
    perks: [
      "All Response Partner benefits",
      "Named operation or program sponsorship",
      "CEO/Board briefing and site visits",
      "Group volunteer deployment (up to 50 people)",
      "Exclusive annual partner summit invitation",
      "Custom impact report for stakeholders",
    ],
  },
]

export default function CorporateGivingPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ company: "", name: "", email: "", tier: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <PageShell breadcrumbs={[{ label: "Corporate Giving" }]} eyebrow="Corporate Programs" title="Inquiry Received">
        <div className="max-w-2xl mx-auto px-6 py-32 text-center">
          <CheckCircle2 size={64} className="text-brand-red mx-auto mb-8" />
          <h2 className="text-3xl font-black text-foreground mb-4">Thank you, {form.company}.</h2>
          <p className="text-brand-muted-text leading-relaxed mb-8">
            Your corporate giving inquiry has been received. Our partnerships team will contact you within
            2 business days to discuss your program.
          </p>
          <a href="/" className="inline-flex items-center gap-2 bg-brand-red text-primary-foreground text-sm font-bold px-7 py-3.5 tracking-widest uppercase hover:bg-brand-red/90 transition-all duration-200">
            Return Home
          </a>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell
      breadcrumbs={[{ label: "Corporate Giving" }]}
      eyebrow="Corporate Programs"
      title="Corporate Giving & Employee Engagement"
      subtitle="Partner your organization's values with real-world humanitarian impact. R3sults offers flexible corporate programs that deliver measurable outcomes and employee engagement."
    >
      {/* Programs */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {programs.map((prog) => (
              <div key={prog.title} className="bg-background p-8 hover:bg-brand-surface transition-colors duration-300">
                <div className="w-10 h-10 bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mb-5">
                  <prog.icon size={18} className="text-brand-red" />
                </div>
                <h3 className="font-black text-foreground mb-2">{prog.title}</h3>
                <p className="text-sm text-brand-muted-text leading-relaxed mb-4">{prog.description}</p>
                <p className="text-xs font-bold text-brand-red border-t border-border pt-3 mt-auto">{prog.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-brand-surface border-b border-border py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-brand-red" />
              <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">Partnership Tiers</span>
          </div>
          <h2 className="text-3xl font-black text-foreground mb-12">Corporate Partnership Levels</h2>
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-8 relative ${tier.featured ? "bg-brand-red" : "bg-background hover:bg-brand-surface"} transition-colors duration-300`}
              >
                {tier.featured && (
                  <div className="absolute top-4 right-4 text-xs font-black tracking-widest uppercase bg-primary-foreground text-brand-red px-2 py-0.5">
                    Most Popular
                  </div>
                )}
                <h3 className={`font-black text-xl mb-1 ${tier.featured ? "text-primary-foreground" : "text-foreground"}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm font-bold mb-6 ${tier.featured ? "text-primary-foreground/70" : "text-brand-muted-text"}`}>
                  {tier.range}
                </p>
                <ul className="space-y-3">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-sm">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${tier.featured ? "bg-primary-foreground" : "bg-foreground/40"}`} />
                      <span className={tier.featured ? "text-primary-foreground/90" : "text-brand-muted-text"}>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-brand-red" />
              <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">Get Started</span>
            </div>
            <h2 className="text-3xl font-black text-foreground mb-6 text-balance">
              Start Your Corporate Partnership
            </h2>
            <p className="text-brand-muted-text leading-relaxed mb-8">
              Our corporate partnerships team will work with you to design a program that fits your organization&apos;s
              CSR goals, reporting requirements, and employee engagement objectives.
            </p>
            <div className="border border-border p-6">
              <p className="text-xs font-black tracking-widest uppercase text-foreground mb-3">Tax Information</p>
              <p className="text-sm text-brand-muted-text leading-relaxed">
                R3sults Foundation is a registered 501(c)(3) organization (EIN: 42-2695859). All corporate
                contributions are tax-deductible to the fullest extent permitted by law. We provide all required
                documentation for your tax records and corporate reporting.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { id: "company", label: "Company Name", required: true },
              { id: "name", label: "Your Name", required: true },
              { id: "email", label: "Work Email", required: true },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-xs font-bold tracking-wide text-foreground mb-2">
                  {field.label}<span className="text-brand-red ml-1">*</span>
                </label>
                <input
                  id={field.id}
                  type={field.id === "email" ? "email" : "text"}
                  required={field.required}
                  value={form[field.id as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                  className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors duration-200"
                />
              </div>
            ))}
            <div>
              <label htmlFor="tier" className="block text-xs font-bold tracking-wide text-foreground mb-2">
                Partnership Level
              </label>
              <select
                id="tier"
                value={form.tier}
                onChange={(e) => setForm({ ...form, tier: e.target.value })}
                className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors duration-200"
              >
                <option value="">Select a level...</option>
                <option value="community">Community Partner ($10K–$49K)</option>
                <option value="response">Response Partner ($50K–$249K)</option>
                <option value="recovery">Recovery Partner ($250K+)</option>
                <option value="custom">Custom / In-Kind</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-bold tracking-wide text-foreground mb-2">
                Goals & Questions
              </label>
              <textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us about your CSR goals and what you're looking for in a nonprofit partnership."
                className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground placeholder:text-brand-muted-text outline-none focus:border-brand-red transition-colors duration-200 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-red text-primary-foreground text-sm font-bold px-8 py-4 tracking-widest uppercase hover:bg-brand-red/90 active:scale-95 transition-all duration-200 group"
            >
              Send Inquiry
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  )
}
