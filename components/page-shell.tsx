import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

interface Crumb {
  label: string
  href?: string
}

interface PageShellProps {
  breadcrumbs: Crumb[]
  eyebrow?: string
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function PageShell({ breadcrumbs, eyebrow, title, subtitle, children }: PageShellProps) {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Page hero band */}
        <div className="bg-brand-surface border-b border-border pt-28 pb-14">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-6">
              <Link href="/" className="text-xs text-brand-muted-text hover:text-foreground transition-colors">
                Home
              </Link>
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-border" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="text-xs text-brand-muted-text hover:text-foreground transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-xs text-foreground font-medium">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>

            {eyebrow && (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-brand-red" />
                <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">{eyebrow}</span>
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight text-balance max-w-3xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-lg text-brand-muted-text leading-relaxed max-w-2xl">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Page content */}
        <div className="bg-background">
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
