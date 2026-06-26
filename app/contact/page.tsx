"use client"

import { useState } from "react"
import { PageShell } from "@/components/page-shell"
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react"

const departments = [
  { id: "general", label: "General Inquiry" },
  { id: "donations", label: "Donations & Giving" },
  { id: "volunteer", label: "Volunteer Program" },
  { id: "partnership", label: "Corporate / Institutional Partnerships" },
  { id: "media", label: "Press & Media" },
  { id: "community", label: "Community Training Request" },
  { id: "financial", label: "Financial / Audit Inquiry" },
  { id: "emergency", label: "Active Emergency Coordination" },
]

const contactInfo = [
  {
    icon: Mail,
    label: "General Email",
    value: "info@r3sults.org",
    href: "mailto:info@r3sults.org",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+1 954-231-1750",
    href: "tel:+19542311750",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "200 W Prospect Rd, Oakland Park, FL 33309",
    href: "https://maps.google.com/?q=200+W+Prospect+Rd,+Oakland+Park,+FL+33309",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon–Fri, 8:00 AM – 6:00 PM ET",
    href: null,
  },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: "", email: "", phone: "", department: "", subject: "", message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <PageShell breadcrumbs={[{ label: "Contact" }]} eyebrow="Contact Us" title="Message Sent">
        <div className="max-w-2xl mx-auto px-6 py-32 text-center">
          <CheckCircle2 size={64} className="text-brand-red mx-auto mb-8" />
          <h2 className="text-3xl font-black text-foreground mb-4">We received your message, {form.name.split(" ")[0]}.</h2>
          <p className="text-brand-muted-text leading-relaxed mb-8">
            Our team will respond within 1–2 business days. For urgent matters, please call our main line
            directly at +1 954-231-1750.
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
      breadcrumbs={[{ label: "Contact" }]}
      eyebrow="Get in Touch"
      title="Contact R3sults Foundation"
      subtitle="Whether you are a donor, partner, journalist, volunteer, or community member, our team is here to help."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Contact info sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              <div className="space-y-5">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-9 h-9 border border-brand-red/30 bg-brand-red/5 flex items-center justify-center flex-shrink-0">
                      <info.icon size={15} className="text-brand-red" />
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-wide text-brand-muted-text mb-0.5">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm font-bold text-foreground hover:text-brand-red transition-colors duration-200"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm font-bold text-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Emergency banner */}
              <div className="bg-brand-red p-5">
                <p className="text-xs font-black tracking-widest uppercase text-primary-foreground mb-2">
                  Active Emergency?
                </p>
                <p className="text-xs text-primary-foreground/80 leading-relaxed mb-3">
                  For active disaster coordination or emergency response inquiries, call our 24/7 emergency line.
                </p>
                <a
                  href="tel:+19542311750"
                  className="inline-flex items-center gap-2 bg-primary-foreground text-brand-red text-xs font-black px-4 py-2 tracking-widest uppercase hover:bg-primary-foreground/90 transition-colors"
                >
                  Call +1 954-231-1750
                </a>
              </div>

              <div className="border border-border p-5">
                <p className="text-xs font-black tracking-widest uppercase text-foreground mb-2">Press Inquiries</p>
                <p className="text-xs text-brand-muted-text leading-relaxed">
                  For media and press inquiries, please visit our{" "}
                  <a href="/press" className="text-foreground underline underline-offset-4 hover:text-brand-red transition-colors">
                    Press Center
                  </a>.
                </p>
              </div>
            </div>
          </aside>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold tracking-wide text-foreground mb-2">
                    Full Name <span className="text-brand-red">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground placeholder:text-brand-muted-text outline-none focus:border-brand-red transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold tracking-wide text-foreground mb-2">
                    Email Address <span className="text-brand-red">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground placeholder:text-brand-muted-text outline-none focus:border-brand-red transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold tracking-wide text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground placeholder:text-brand-muted-text outline-none focus:border-brand-red transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="department" className="block text-xs font-bold tracking-wide text-foreground mb-2">
                    Department / Topic <span className="text-brand-red">*</span>
                  </label>
                  <select
                    id="department"
                    required
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-brand-red transition-colors duration-200"
                  >
                    <option value="">Select a topic...</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>{d.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-bold tracking-wide text-foreground mb-2">
                  Subject <span className="text-brand-red">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground placeholder:text-brand-muted-text outline-none focus:border-brand-red transition-colors duration-200"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold tracking-wide text-foreground mb-2">
                  Message <span className="text-brand-red">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we help you?"
                  className="w-full bg-brand-surface border border-border px-4 py-3 text-sm text-foreground placeholder:text-brand-muted-text outline-none focus:border-brand-red transition-colors duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-red text-primary-foreground text-sm font-bold px-8 py-4 tracking-widest uppercase hover:bg-brand-red/90 active:scale-95 transition-all duration-200 group"
              >
                Send Message
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-xs text-brand-muted-text text-center">
                By submitting, you agree to our{" "}
                <a href="/privacy" className="underline underline-offset-4 hover:text-foreground transition-colors">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
