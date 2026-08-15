import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from "lucide-react"

const navGroups = [
  {
    label: "Organization",
    links: [
      { label: "Our Mission", href: "/about" },
      { label: "Our Approach", href: "/#approach" },
      { label: "Impact Reports", href: "/impact" },
      { label: "Leadership Team", href: "/leadership" },
      { label: "Financials", href: "/financials" },
    ],
  },
  {
    label: "Get Involved",
    links: [
      { label: "Donate", href: "/#donate" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Partner With Us", href: "/partner" },
      { label: "Corporate Giving", href: "/corporate-giving" },
      { label: "Planned Giving", href: "/contact" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Stories & Updates", href: "/stories" },
      { label: "Disaster Preparedness", href: "/preparedness" },
      { label: "Annual Reports", href: "/impact" },
      { label: "Press & Media", href: "/press" },
      { label: "Transparency & Compliance", href: "/transparency" },
    ],
  },
]

const socials = [
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Twitter, label: "Twitter / X", href: "https://x.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
]

export function SiteFooter() {
  return (
    <footer
      className="border-t border-border"
      style={{
        backgroundColor: "#f8f5f5",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Ccircle cx='30' cy='30' r='0.6' fill='%23bf0637' fill-opacity='0.07'/%3E%3Ccircle cx='0' cy='0' r='0.6' fill='%23bf0637' fill-opacity='0.07'/%3E%3Ccircle cx='60' cy='0' r='0.6' fill='%23bf0637' fill-opacity='0.07'/%3E%3Ccircle cx='0' cy='60' r='0.6' fill='%23bf0637' fill-opacity='0.07'/%3E%3Ccircle cx='60' cy='60' r='0.6' fill='%23bf0637' fill-opacity='0.07'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Final CTA band */}
      <div className="bg-brand-red">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-primary-foreground text-balance">
                Ready to make an impact? Start today.
              </h3>
              <p className="text-primary-foreground/70 text-sm mt-1">
                Every dollar, every hour, every partnership matters.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <Link
                href="/#donate"
                className="inline-flex items-center gap-2 bg-primary-foreground text-brand-red text-sm font-black px-7 py-3.5 tracking-widest uppercase hover:bg-primary-foreground/90 transition-all duration-200 group"
              >
                Donate Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex items-center gap-2 border border-primary-foreground/40 text-primary-foreground text-sm font-bold px-7 py-3.5 tracking-widest uppercase hover:border-primary-foreground transition-colors duration-200"
              >
                Volunteer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex mb-6" aria-label="R3sults Foundation — Home">
              <Image
                src="/images/r3sults-logo-dark.png"
                alt="R3sults Foundation"
                width={160}
                height={54}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              A disaster management authority. A long-term recovery partner. A preparedness-first organization.
              Present from the first alert to the last brick laid.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:border-brand-red hover:text-brand-red transition-colors duration-200"
                >
                  <s.icon size={14} />
                </Link>
              ))}
            </div>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.label}>
              <h4 className="text-xs font-black tracking-widest uppercase text-foreground mb-5">
                {group.label}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-brand-red transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} R3sults Foundation. All rights reserved. EIN: 42-2695859
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Use", href: "/terms" },
              { label: "Transparency & Compliance", href: "/transparency" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-brand-red transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
