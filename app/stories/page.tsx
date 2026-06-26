import { PageShell } from "@/components/page-shell"
import { stories } from "@/lib/stories"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = ["All", "Active Deployment", "Recovery Progress", "Completed Operation", "Behind the Scenes"]

export default function StoriesPage() {
  return (
    <PageShell
      breadcrumbs={[{ label: "Stories & Updates" }]}
      eyebrow="From the Field"
      title="Stories, Updates & Reports"
      subtitle="First-hand accounts of our operations, impact reports from the field, and behind-the-scenes looks at how R3sults prepares, responds, and recovers."
    >
      {/* Category filter — static labels, visual only */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-4 scrollbar-none">
            {categories.map((cat, i) => (
              <span
                key={cat}
                className={`flex-shrink-0 text-xs font-bold tracking-widest uppercase px-4 py-2 border transition-colors cursor-pointer ${
                  i === 0
                    ? "border-brand-red bg-brand-red/10 text-brand-red"
                    : "border-border text-brand-muted-text hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured story (first) */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-0.5 bg-brand-red" />
            <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">Latest Report</span>
          </div>
          <Link href={`/stories/${stories[0].slug}`} className="group grid lg:grid-cols-2 gap-0 border border-border overflow-hidden">
            <div className="relative h-64 lg:h-auto min-h-[300px] overflow-hidden">
              <Image
                src={stories[0].image}
                alt={stories[0].title}
                fill
                className="object-cover brightness-[0.75] group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-brand-red text-primary-foreground text-xs font-bold tracking-widest uppercase px-3 py-1">
                  {stories[0].category}
                </span>
              </div>
            </div>
            <div className="bg-brand-surface p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-xs text-brand-muted-text tracking-wide mb-4">{stories[0].date}</p>
              <h2 className="text-2xl md:text-3xl font-black text-foreground leading-tight mb-4 text-balance group-hover:text-brand-red transition-colors duration-300">
                {stories[0].title}
              </h2>
              <p className="text-brand-muted-text leading-relaxed mb-6 text-sm">{stories[0].excerpt}</p>
              {stories[0].stats && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {stories[0].stats.slice(0, 4).map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl font-black text-brand-red">{stat.value}</div>
                      <div className="text-xs text-brand-muted-text tracking-wide">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
              <span className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-foreground group-hover:text-brand-red transition-colors">
                Read Full Report
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* All stories grid */}
      <section>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {stories.slice(1).map((story) => (
              <article key={story.slug} className="bg-background group overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover brightness-[0.75] group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-red text-primary-foreground text-xs font-bold tracking-widest uppercase px-3 py-1">
                      {story.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs text-brand-muted-text tracking-wide mb-3">{story.date}</p>
                  <h3 className="text-lg font-black text-foreground leading-tight mb-3 text-balance group-hover:text-brand-red transition-colors duration-200">
                    {story.title}
                  </h3>
                  <p className="text-sm text-brand-muted-text leading-relaxed mb-5">{story.excerpt}</p>
                  <div className="flex items-center gap-2 flex-wrap mb-5">
                    {story.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs border border-border text-brand-muted-text px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/stories/${story.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-foreground hover:text-brand-red transition-colors duration-200 group/link"
                  >
                    Read More
                    <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black text-foreground mb-2">These stories happen because of donors like you</h3>
            <p className="text-brand-muted-text text-sm">Fund the next deployment. Fund the next recovery.</p>
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
