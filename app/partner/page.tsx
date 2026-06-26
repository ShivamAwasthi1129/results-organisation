"use client"

import { useState } from "react"
import { PageShell } from "@/components/page-shell"
import { ArrowRight, CheckCircle2, Building2, Globe, Zap, BarChart3 } from "lucide-react"

const partnershipTypes = [
  { id: "corporate", label: "Corporate Partner", description: "Financial support, resource donations, employee volunteering" },
  { id: "foundation", label: "Foundation / Grant", description: "Institutional grant funding and philanthropic partnership" },
  { id: "government", label: "Government / Agency", description: "Public sector contracts and inter-agency coordination" },
  { id: "technology", label: "Technology Partner", description: "Software, hardware, or logistics technology support" },
  { id: "media", label: "Media Partner", description: "Communications, PR, and awareness campaigns" },
  { id: "ngo", label: "NGO / Nonprofit Partner", description: "Coalition building and joint field operations" },
]

const benefits = [
  { icon: Globe, title: "Global Visibility", description: "Your brand featured across all active deployment communications, reports, and media." },
  { icon: BarChart3, title: "Impact Reporting", description: "Dedicated impact reports showing exactly how your partnership contributed to outcomes." },
  { icon: Zap, title: "Rapid Deployment Access", description: "Partner organizations receive priority coordination during disaster activations." },
  { icon: Building2, title: "Tax Benefits", description: "All qualifying contributions are fully tax-deductible as donations to a 501(c)(3) organization." },
]

export default function PartnerPage() {
  const [submitted, setSubmitted] = useState(false)
  const [selectedType, setSelectedType] = useState("")
  const [form, setForm] = useState({
    orgName: "", contactName: "", title: "", email: "",
    phone: "", website: "", budget: "", message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <PageShell breadcrumbs={[{ label: "Partner" }]} eyebrow="Partnership" title="Inquiry Received">
        <div className="max-w-2xl mx-auto px-6 py-32 text-center">
          <CheckCircle2 size={64} className="text-brand-red mx-auto mb-8" />
          <h2 className="text-3xl font-black text-foreground mb-4">Thank you, {form.orgName}.</h2>
          <p className="text-brand-muted-text leading-relaxed mb-8">
            Your partnership inquiry has been received. Our partnerships team will be in touch within
            3 business days to schedule an introductory call.
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
      breadcrumbs={[{ label: "Partner With Us" }]}
      eyebrow="Partnership"
      title="Partner With R3sults"
      subtitle="Corporate, institutional, and government partners amplify our capacity and multiply the communities we can serve. Join a coalition committed to real results."
    >
      {/* Partnership benefits */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-brand-red" />
            <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">Why Partner</span>
          </div>
          <h2 className="text-3xl font-black text-foreground mb-12 text-balance">Partnership Delivers Real Returns</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {benefits.map((b) => (
              <div key={b.title} className="bg-background p-8 hover:bg-brand-surface transition-colors duration-300">
                <div className="w-10 h-10 bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mb-5">
                  <b.icon size={18} className="text-brand-red" />
                </div>
                <h3 className="font-black text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-brand-muted-text leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-16">
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              <div>
                <h3 className="text-xs font-black tracking-widest uppercase text-foreground mb-4">Current Partners Include</h3>
                <ul className="space-y-3">
                  {[
                    "Fortune 500 corporate donors",
                    "International development foundations",
                    "Federal and state emergency agencies",
                    "Technology providers (logistics & comms)",
                    "Global NGO coalitions",
                    "Faith-based relief networks",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-brand-muted-text">
                      <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border p-6">
                <h3 className="text-xs font-black tracking-widest uppercase text-foreground mb-3">Corporate Giving</h3>
                <p className="text-sm text-brand-muted-text leading-relaxed mb-4">
                  Looking for employee matching or group volunteer programs? Visit our dedicated corporate giving page.
                </p>
                <a href="/corporate-giving" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-foreground hover:text-brand-red transition-colors">
                  Corporate Giving
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Org info */}
              <fieldset>
                <legend className="text-xs font-black tracking-widest uppercase text-foreground mb-6 pb-3 border-b border-border w-full">
                  Organization Details
                </legend>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { id: "orgName", label: "Organization Name", required: true },
                    { id: "website", label: "Website URL", required: false },
                    { id: "contactName", label: "Primary Contact Name", required: true },
                    { id: "title", label: "Title / Role", required: false },
                    { id: "email", label: "Email Address", required: true },
                    { id: "phone", label: "Phone Number", required: false },
                  ].map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-xs font-bold tracking-wide text-foreground mb-2">
                        {field.label}{field.required && <span className="text-brand-red ml-1">*</span>}
                      </label>
                      <input
                        id={field.id}
                        type={field.id === "email" ? "email" : field.id === "website" ? "url" : "text"}
                        required={field.required}
                        value={form[field.id as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                        className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground placeholder:text-brand-muted-text outline-none focus:border-brand-red transition-colors duration-200"
                      />
                    </div>
                  ))}
                </div>
              </fieldset>

              {/* Partnership type */}
              <fieldset>
                <legend className="text-xs font-black tracking-widest uppercase text-foreground mb-6 pb-3 border-b border-border w-full">
                  Partnership Type <span className="text-brand-red">*</span>
                </legend>
                <div className="grid sm:grid-cols-2 gap-3">
                  {partnershipTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`text-left p-4 border transition-all duration-200 ${
                        selectedType === type.id
                          ? "border-brand-red bg-brand-red/5"
                          : "border-border hover:border-foreground/30"
                      }`}
                    >
                      <p className="text-sm font-bold text-foreground mb-0.5">{type.label}</p>
                      <p className="text-xs text-brand-muted-text">{type.description}</p>
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Budget & message */}
              <fieldset>
                <legend className="text-xs font-black tracking-widest uppercase text-foreground mb-6 pb-3 border-b border-border w-full">
                  Partnership Scope
                </legend>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="budget" className="block text-xs font-bold tracking-wide text-foreground mb-2">
                      Annual Budget / Contribution Range
                    </label>
                    <select
                      id="budget"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors duration-200"
                    >
                      <option value="">Select range...</option>
                      <option value="under10k">Under $10,000</option>
                      <option value="10k-50k">$10,000 – $50,000</option>
                      <option value="50k-250k">$50,000 – $250,000</option>
                      <option value="250k-1m">$250,000 – $1M</option>
                      <option value="over1m">Over $1M</option>
                      <option value="inkind">In-Kind / Non-Monetary</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold tracking-wide text-foreground mb-2">
                      Tell us about your partnership vision <span className="text-brand-red">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your organization's goals, how you see the partnership working, and any specific programs or regions of interest."
                      className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground placeholder:text-brand-muted-text outline-none focus:border-brand-red transition-colors duration-200 resize-none"
                    />
                  </div>
                </div>
              </fieldset>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-red text-primary-foreground text-sm font-bold px-8 py-4 tracking-widest uppercase hover:bg-brand-red/90 active:scale-95 transition-all duration-200 group"
              >
                Submit Partnership Inquiry
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
