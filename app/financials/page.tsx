import { PageShell } from "@/components/page-shell"
import { Download, ShieldCheck, FileText } from "lucide-react"
import Link from "next/link"

const allocationData = [
  { label: "Field Operations & Response", pct: 68, color: "bg-brand-red" },
  { label: "Community Preparedness Programs", pct: 16, color: "bg-brand-red/55" },
  { label: "Fundraising & Development", pct: 8, color: "bg-foreground/30" },
  { label: "Administration & Overhead", pct: 8, color: "bg-border" },
]

const filings = [
  { label: "Form 990 (2025)", type: "IRS Filing", date: "Filed Nov 2025", href: "#" },
  { label: "Form 990 (2024)", type: "IRS Filing", date: "Filed Nov 2024", href: "#" },
  { label: "Form 990 (2023)", type: "IRS Filing", date: "Filed Nov 2023", href: "#" },
  { label: "Audited Financial Statements 2025", type: "Independent Audit", date: "Released Dec 2025", href: "#" },
  { label: "Audited Financial Statements 2024", type: "Independent Audit", date: "Released Dec 2024", href: "#" },
  { label: "IRS Determination Letter", type: "501(c)(3) Status", date: "Issued 2004", href: "#" },
]

const certifications = [
  { name: "Charity Navigator: 4-Star Rating", description: "Highest possible rating for accountability and transparency." },
  { name: "GuideStar Platinum Seal", description: "Demonstrates commitment to nonprofit transparency." },
  { name: "USAID Partner Designation", description: "Certified partner for international disaster response." },
  { name: "BBB Wise Giving Alliance", description: "Meets all 20 standards for charity accountability." },
]

export default function FinancialsPage() {
  return (
    <PageShell
      breadcrumbs={[{ label: "Financials" }]}
      eyebrow="Financial Transparency"
      title="Where Every Dollar Goes"
      subtitle="R3sults Foundation publishes complete financial data, independent audits, and IRS filings. We believe accountability is not optional — it is the foundation of donor trust."
    >
      {/* Fund allocation */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-b border-border">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-brand-red" />
              <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">Allocation</span>
            </div>
            <h2 className="text-3xl font-black text-foreground mb-4 text-balance">
              96 Cents of Every Dollar Goes to Programs
            </h2>
            <p className="text-brand-muted-text leading-relaxed mb-10">
              We maintain an industry-leading program efficiency rate. Only 4% of funds are used for administrative
              operations — among the lowest overhead in the nonprofit disaster response sector.
            </p>
            <div className="space-y-5">
              {allocationData.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-foreground">{item.label}</span>
                    <span className="text-sm font-black text-brand-red">{item.pct}%</span>
                  </div>
                  <div className="h-2 bg-border rounded-none">
                    <div
                      className={`h-full ${item.color} transition-all duration-700`}
                      style={{ width: `${item.pct}%` }}
                      role="progressbar"
                      aria-valuenow={item.pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${item.label}: ${item.pct}%`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary financials */}
          <div className="border border-border">
            <div className="bg-brand-surface px-8 py-5 border-b border-border">
              <h3 className="text-xs font-black tracking-widest uppercase text-foreground">FY 2025 Financial Summary</h3>
            </div>
            <div className="divide-y divide-border">
              {[
                { label: "Total Revenue", value: "$18.4M" },
                { label: "Individual Donations", value: "$9.2M" },
                { label: "Corporate & Institutional Grants", value: "$6.8M" },
                { label: "Government Grants", value: "$2.4M" },
                { label: "Total Program Expenses", value: "$15.6M" },
                { label: "Administrative Expenses", value: "$1.5M" },
                { label: "Fundraising Expenses", value: "$1.1M" },
                { label: "Net Assets (End of Year)", value: "$4.3M" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between px-8 py-4">
                  <span className="text-sm text-brand-muted-text">{row.label}</span>
                  <span className="text-sm font-black text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="px-8 py-5 border-t border-border bg-brand-surface">
              <p className="text-xs text-brand-muted-text">
                Figures reflect independently audited financials. Full audited statements available below.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Document downloads */}
      <section className="bg-brand-surface border-b border-border py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-brand-red" />
            <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">Documents</span>
          </div>
          <h2 className="text-3xl font-black text-foreground mb-12">Public Filings & Audits</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {filings.map((file) => (
              <Link
                key={file.label}
                href={file.href}
                className="flex items-center justify-between gap-4 border border-border bg-background p-5 hover:border-brand-red/40 hover:bg-brand-surface transition-all duration-200 group"
              >
                <div className="flex items-start gap-4">
                  <FileText size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-sm">{file.label}</p>
                    <p className="text-xs text-brand-muted-text mt-0.5">{file.type} · {file.date}</p>
                  </div>
                </div>
                <Download size={16} className="text-brand-muted-text group-hover:text-foreground transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-0.5 bg-brand-red" />
          <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">Recognition</span>
        </div>
        <h2 className="text-3xl font-black text-foreground mb-12">Certifications & Ratings</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <div key={cert.name} className="flex items-start gap-4 p-6 border border-border hover:border-brand-red/40 transition-colors duration-200">
              <ShieldCheck size={20} className="text-brand-red flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-black text-foreground mb-1">{cert.name}</h3>
                <p className="text-sm text-brand-muted-text">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact for financials */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="border border-border p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black text-foreground mb-2">Questions about our financials?</h3>
            <p className="text-brand-muted-text text-sm">Our CFO team is available to speak with institutional donors and partners.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-foreground text-foreground text-sm font-bold px-7 py-3.5 tracking-widest uppercase hover:bg-foreground hover:text-background transition-all duration-200 flex-shrink-0"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </PageShell>
  )
}
