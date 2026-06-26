import { PageShell } from "@/components/page-shell"
import { Download, ExternalLink } from "lucide-react"
import Link from "next/link"

const pressReleases = [
  {
    date: "March 1, 2026",
    title: "R3sults Deploys 40-Person Team to Louisiana Gulf Coast in Response to Hurricane Mara",
    outlet: "Press Release",
    href: "#",
  },
  {
    date: "February 14, 2026",
    title: "R3sults Reports 340 Permanent Homes Completed in Haiti Earthquake Recovery Operation",
    outlet: "Press Release",
    href: "#",
  },
  {
    date: "January 20, 2026",
    title: "R3sults Launches Enhanced Logistics Platform, Reducing Deployment Time by 34%",
    outlet: "Press Release",
    href: "#",
  },
  {
    date: "December 5, 2025",
    title: "R3sults Foundation Awarded Four Stars by Charity Navigator for Fifth Consecutive Year",
    outlet: "Press Release",
    href: "#",
  },
  {
    date: "November 12, 2025",
    title: "R3sults Announces $4.2M in New Institutional Grants for 2026 Operations",
    outlet: "Press Release",
    href: "#",
  },
]

const mediaMentions = [
  { outlet: "Reuters", date: "March 2026", title: "First Responders Race to Louisiana as Floodwaters Rise", href: "#" },
  { outlet: "NPR", date: "February 2026", title: "How One Nonprofit Stayed in Haiti After the Earthquake — And What They Found", href: "#" },
  { outlet: "The New York Times", date: "January 2026", title: "After the Camera Crews Leave: Long-Term Disaster Recovery Organizations", href: "#" },
  { outlet: "PBS NewsHour", date: "December 2025", title: "The Science of Getting There Fast: Pre-Positioned Disaster Supply Networks", href: "#" },
  { outlet: "CNN", date: "October 2025", title: "Nonprofit Accountability: Which Organizations Actually Deliver?", href: "#" },
]

const brandAssets = [
  { name: "R3sults Logo Pack (PNG, SVG, EPS)", size: "2.4 MB", href: "#" },
  { name: "Brand Guidelines", size: "1.8 MB", href: "#" },
  { name: "Executive Headshots (Hi-Res)", size: "8.2 MB", href: "#" },
  { name: "Operations Photography (Licensed)", size: "42 MB", href: "#" },
  { name: "Fact Sheet — 2025 Operations", size: "0.8 MB", href: "#" },
]

export default function PressPage() {
  return (
    <PageShell
      breadcrumbs={[{ label: "Press & Media" }]}
      eyebrow="Media Relations"
      title="Press & Media Center"
      subtitle="Press releases, media coverage, brand assets, and contact information for journalists and media professionals."
    >
      {/* Media contact */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            <div className="bg-brand-surface p-8 md:col-span-2">
              <h2 className="text-xl font-black text-foreground mb-4">Media Inquiries</h2>
              <p className="text-brand-muted-text text-sm leading-relaxed mb-6">
                For press inquiries, interview requests, expert commentary on disaster management, or photo/video
                licensing, please contact our communications team. We typically respond to media inquiries within
                4 hours during business hours.
              </p>
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold tracking-wide text-brand-muted-text">Media Contact</span>
                  <p className="text-foreground font-bold">communications@r3sults.org</p>
                </div>
                <div>
                  <span className="text-xs font-bold tracking-wide text-brand-muted-text">Press Line</span>
                  <p className="text-foreground font-bold">+1 954-231-1750</p>
                </div>
                <div>
                  <span className="text-xs font-bold tracking-wide text-brand-muted-text">General Email</span>
                  <p className="text-foreground font-bold">info@r3sults.org</p>
                </div>
              </div>
            </div>
            <div className="bg-background p-8 flex flex-col justify-center">
              <h3 className="text-sm font-black tracking-widest uppercase text-foreground mb-4">Quick Facts</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Founded", value: "2004" },
                  { label: "EIN", value: "XX-XXXXXXX" },
                  { label: "Headquarters", value: "Oakland Park, FL" },
                  { label: "Status", value: "501(c)(3) Nonprofit" },
                  { label: "Countries Active", value: "10+" },
                  { label: "Staff & Volunteers", value: "400+" },
                ].map((fact) => (
                  <div key={fact.label} className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-brand-muted-text">{fact.label}</span>
                    <span className="font-bold text-foreground">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press releases */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-brand-red" />
              <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">Press Releases</span>
          </div>
          <h2 className="text-3xl font-black text-foreground mb-12">Latest Announcements</h2>
          <div className="space-y-3">
            {pressReleases.map((pr) => (
              <Link
                key={pr.title}
                href={pr.href}
                className="flex items-center gap-6 border border-border bg-background p-6 hover:border-brand-red/40 hover:bg-brand-surface transition-all duration-200 group"
              >
                <span className="text-xs text-brand-muted-text w-28 flex-shrink-0 hidden sm:block">{pr.date}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold tracking-widest uppercase text-brand-red mr-3">{pr.outlet}</span>
                  <span className="text-sm font-bold text-foreground group-hover:text-brand-red transition-colors duration-200">
                    {pr.title}
                  </span>
                </div>
                <ExternalLink size={14} className="text-brand-muted-text group-hover:text-foreground transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Media mentions */}
      <section className="bg-brand-surface border-b border-border py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-brand-red" />
              <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">In the News</span>
          </div>
          <h2 className="text-3xl font-black text-foreground mb-12">Media Coverage</h2>
          <div className="space-y-3">
            {mediaMentions.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-6 border border-border bg-background p-5 hover:border-brand-red/40 hover:bg-brand-surface transition-all duration-200 group"
              >
                <div className="w-24 flex-shrink-0 hidden sm:block">
                  <span className="text-xs font-black tracking-wide text-brand-red">{item.outlet}</span>
                  <p className="text-xs text-brand-muted-text">{item.date}</p>
                </div>
                <p className="flex-1 text-sm font-bold text-foreground group-hover:text-brand-red transition-colors duration-200">
                  {item.title}
                </p>
                <ExternalLink size={14} className="text-brand-muted-text group-hover:text-foreground transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand assets */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-0.5 bg-brand-red" />
            <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">Assets</span>
        </div>
        <h2 className="text-3xl font-black text-foreground mb-12">Brand & Media Assets</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brandAssets.map((asset) => (
            <a
              key={asset.name}
              href={asset.href}
              className="flex items-center justify-between gap-4 border border-border p-5 hover:border-brand-red/40 hover:bg-brand-surface transition-all duration-200 group"
            >
              <div>
                <p className="text-sm font-bold text-foreground group-hover:text-brand-red transition-colors">{asset.name}</p>
                <p className="text-xs text-brand-muted-text mt-0.5">{asset.size}</p>
              </div>
              <Download size={15} className="text-brand-muted-text group-hover:text-foreground transition-colors flex-shrink-0" />
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
