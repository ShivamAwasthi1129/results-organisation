import { PageShell } from "@/components/page-shell"
import { Download, ExternalLink } from "lucide-react"
import Link from "next/link"

const stats = [
  { value: "100K+", label: "Individuals Served", context: "Across all active programs since 2004" },
  { value: "$42M+", label: "Aid Deployed", context: "In direct humanitarian assistance" },
  { value: "10+", label: "Countries Reached", context: "Active operations and partnerships" },
  { value: "340", label: "Families Permanently Housed", context: "Through long-term recovery programs" },
  { value: "12,000", label: "Responders Certified", context: "Community preparedness training" },
  { value: "96%", label: "Program Efficiency Rate", context: "Of every dollar directed to operations" },
]

const reports = [
  {
    year: "2025",
    title: "Annual Impact Report 2025",
    pages: "48 pages",
    highlights: ["Louisiana flood response — 2,400 families served", "Haiti earthquake: 340 permanent homes built", "12 new community preparedness hubs launched"],
    size: "4.2 MB",
    href: "#",
  },
  {
    year: "2024",
    title: "Annual Impact Report 2024",
    pages: "52 pages",
    highlights: ["Record deployment speed: 4.2-hour average response", "5 new international partnerships", "$14M in aid distributed across 6 countries"],
    size: "3.8 MB",
    href: "#",
  },
  {
    year: "2023",
    title: "Annual Impact Report 2023",
    pages: "44 pages",
    highlights: ["USAID partnership designation received", "Turkey earthquake response: 800 families assisted", "Community training program expanded to 3 new countries"],
    size: "3.5 MB",
    href: "#",
  },
  {
    year: "2022",
    title: "Annual Impact Report 2022",
    pages: "40 pages",
    highlights: ["Pakistan flood: Largest single-year operation", "Launched technology-enabled logistics platform", "$8.2M raised and deployed within fiscal year"],
    size: "3.1 MB",
    href: "#",
  },
]

const deployments = [
  { event: "Louisiana Gulf Coast Flood", date: "March 2026", status: "Active", families: "2,400+", days: "Ongoing" },
  { event: "Haiti Earthquake Response", date: "Aug 2025", status: "Recovery", families: "1,200", days: "210+" },
  { event: "Texas Wildfire Relief", date: "Apr 2025", status: "Completed", families: "640", days: "45" },
  { event: "Morocco Earthquake", date: "Sep 2024", status: "Completed", families: "900", days: "90" },
  { event: "Pakistan Monsoon Flooding", date: "Jul 2024", status: "Completed", families: "3,100", days: "120" },
  { event: "Puerto Rico Storm Response", date: "Nov 2023", status: "Completed", families: "480", days: "60" },
]

export default function ImpactPage() {
  return (
    <PageShell
      breadcrumbs={[{ label: "Impact Reports" }]}
      eyebrow="Accountability"
      title="Our Impact, Measured and Reported"
      subtitle="Every operation is tracked. Every dollar is reported. Every family served counts. Here is the full picture of R3sults' work since 2004."
    >
      {/* Stats grid */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border border border-border">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background p-8 text-center">
                <div className="text-4xl md:text-5xl font-black text-brand-red mb-2">{stat.value}</div>
                <div className="text-sm font-black text-foreground mb-1">{stat.label}</div>
                <div className="text-xs text-brand-muted-text">{stat.context}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployments */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-brand-red" />
            <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">Operations Log</span>
          </div>
          <h2 className="text-3xl font-black text-foreground mb-12">Recent Deployments</h2>
          <div className="border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-surface border-b border-border">
                  <th className="text-left px-6 py-4 text-xs font-black tracking-widest uppercase text-brand-muted-text">Event</th>
                  <th className="text-left px-6 py-4 text-xs font-black tracking-widest uppercase text-brand-muted-text hidden md:table-cell">Date</th>
                  <th className="text-left px-6 py-4 text-xs font-black tracking-widest uppercase text-brand-muted-text">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-black tracking-widest uppercase text-brand-muted-text hidden sm:table-cell">Families Served</th>
                  <th className="text-left px-6 py-4 text-xs font-black tracking-widest uppercase text-brand-muted-text hidden lg:table-cell">Days Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {deployments.map((d) => (
                  <tr key={d.event} className="hover:bg-brand-surface/50 transition-colors duration-150">
                    <td className="px-6 py-4 font-bold text-foreground">{d.event}</td>
                    <td className="px-6 py-4 text-brand-muted-text hidden md:table-cell">{d.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold tracking-widest uppercase px-2.5 py-1 ${
                        d.status === "Active"
                          ? "bg-brand-red/10 text-brand-red border border-brand-red/20"
                          : d.status === "Recovery"
                          ? "bg-foreground/10 text-foreground border border-foreground/20"
                          : "bg-border/50 text-brand-muted-text border border-border"
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-foreground hidden sm:table-cell">{d.families}</td>
                    <td className="px-6 py-4 text-brand-muted-text hidden lg:table-cell">{d.days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Annual reports download */}
      <section className="bg-brand-surface border-b border-border py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-brand-red" />
            <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">Annual Reports</span>
          </div>
          <h2 className="text-3xl font-black text-foreground mb-12">Download Full Reports</h2>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.year} className="border border-border bg-background p-6 hover:border-brand-red/40 transition-colors duration-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-6">
                    <div className="text-3xl font-black text-border w-16 flex-shrink-0">{report.year}</div>
                    <div>
                      <h3 className="font-black text-foreground mb-2">{report.title}</h3>
                      <ul className="space-y-1">
                        {report.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2 text-xs text-brand-muted-text">
                            <span className="w-1 h-1 bg-foreground/40 rounded-full flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-brand-muted-text">{report.pages} · {report.size}</span>
                    <Link
                      href={report.href}
                      className="inline-flex items-center gap-2 border border-border text-foreground text-xs font-bold px-5 py-2.5 tracking-widest uppercase hover:border-foreground transition-colors duration-200"
                    >
                      <Download size={13} />
                      Download
                    </Link>
                    <Link
                      href={report.href}
                      className="inline-flex items-center gap-2 text-brand-muted-text hover:text-foreground transition-colors duration-200"
                      aria-label="View report online"
                    >
                      <ExternalLink size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="border border-border p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black text-foreground mb-2">Help drive the next impact report</h3>
            <p className="text-brand-muted-text text-sm">Your contribution becomes a measurable outcome in our next annual report.</p>
          </div>
          <Link
            href="/#donate"
            className="inline-flex items-center gap-2 bg-brand-red text-primary-foreground text-sm font-bold px-7 py-3.5 tracking-widest uppercase hover:bg-brand-red/90 transition-all duration-200 flex-shrink-0"
          >
            Donate Now
          </Link>
        </div>
      </section>
    </PageShell>
  )
}
