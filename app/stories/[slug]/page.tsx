import { notFound } from "next/navigation"
import { PageShell } from "@/components/page-shell"
import { stories, getStoryBySlug, getAllStorySlugs } from "@/lib/stories"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export function generateStaticParams() {
  return getAllStorySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = getStoryBySlug(slug)
  if (!story) return {}
  return {
    title: `${story.title} | R3sults Foundation`,
    description: story.excerpt,
  }
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = getStoryBySlug(slug)
  if (!story) notFound()

  const currentIndex = stories.findIndex((s) => s.slug === slug)
  const prevStory = currentIndex > 0 ? stories[currentIndex - 1] : null
  const nextStory = currentIndex < stories.length - 1 ? stories[currentIndex + 1] : null

  return (
    <PageShell
      breadcrumbs={[
        { label: "Stories & Updates", href: "/stories" },
        { label: story.category, href: "/stories" },
        { label: story.title },
      ]}
      eyebrow={story.category}
      title={story.title}
      subtitle={story.excerpt}
    >
      {/* Hero image */}
      <div className="relative h-72 md:h-[480px] overflow-hidden">
        <Image
          src={story.image}
          alt={story.title}
          fill
          className="object-cover brightness-[0.6]"
          sizes="100vw"
          priority
        />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background via-background/40 to-transparent h-32" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Article */}
          <article className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-border">
              <span className="bg-brand-red text-primary-foreground text-xs font-bold tracking-widest uppercase px-3 py-1">
                {story.category}
              </span>
              <span className="text-sm text-brand-muted-text">{story.date}</span>
              <div className="flex items-center gap-2 flex-wrap">
                {story.tags.map((tag) => (
                  <span key={tag} className="text-xs border border-border text-brand-muted-text px-2 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {story.content.map((paragraph, i) => (
                <p key={i} className="text-brand-muted-text leading-relaxed text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Prev/next navigation */}
            <div className="mt-16 pt-8 border-t border-border flex items-center justify-between gap-6">
              {prevStory ? (
                <Link
                  href={`/stories/${prevStory.slug}`}
                  className="flex items-center gap-3 group max-w-xs"
                >
                  <ArrowLeft size={16} className="text-brand-muted-text group-hover:text-foreground transition-colors flex-shrink-0" />
                  <div>
                    <p className="text-xs text-brand-muted-text mb-0.5">Previous</p>
                    <p className="text-sm font-bold text-foreground group-hover:text-brand-red transition-colors leading-tight line-clamp-2">
                      {prevStory.title}
                    </p>
                  </div>
                </Link>
              ) : <div />}
              {nextStory ? (
                <Link
                  href={`/stories/${nextStory.slug}`}
                  className="flex items-center gap-3 group max-w-xs text-right ml-auto"
                >
                  <div>
                    <p className="text-xs text-brand-muted-text mb-0.5">Next</p>
                    <p className="text-sm font-bold text-foreground group-hover:text-brand-red transition-colors leading-tight line-clamp-2">
                      {nextStory.title}
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-brand-muted-text group-hover:text-foreground transition-colors flex-shrink-0" />
                </Link>
              ) : <div />}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              {/* Impact stats */}
              {story.stats && (
                <div className="border border-border">
                  <div className="bg-brand-surface px-6 py-4 border-b border-border">
                    <h3 className="text-xs font-black tracking-widest uppercase text-foreground">Operation Statistics</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {story.stats.map((stat) => (
                      <div key={stat.label} className="px-6 py-4 flex items-center justify-between">
                        <span className="text-xs text-brand-muted-text">{stat.label}</span>
                        <span className="text-xl font-black text-brand-red">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Donate CTA */}
              <div className="bg-brand-red p-6">
                <h3 className="text-sm font-black text-primary-foreground mb-2">Support This Operation</h3>
                <p className="text-xs text-primary-foreground/70 leading-relaxed mb-5">
                  Your donation directly funds operations like this one. Every dollar is tracked and reported.
                </p>
                <Link
                  href="/#donate"
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary-foreground text-brand-red text-sm font-black px-6 py-3 tracking-widest uppercase hover:bg-primary-foreground/90 transition-all duration-200 group"
                >
                  Donate Now
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* More stories */}
              <div>
                <h3 className="text-xs font-black tracking-widest uppercase text-foreground mb-5">More Stories</h3>
                <div className="space-y-4">
                  {stories
                    .filter((s) => s.slug !== slug)
                    .slice(0, 3)
                    .map((s) => (
                      <Link key={s.slug} href={`/stories/${s.slug}`} className="flex items-start gap-3 group">
                        <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden">
                          <Image
                            src={s.image}
                            alt={s.title}
                            fill
                            className="object-cover brightness-75 group-hover:brightness-100 transition-all duration-300"
                            sizes="56px"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-brand-muted-text mb-0.5">{s.date}</p>
                          <p className="text-sm font-bold text-foreground group-hover:text-brand-red transition-colors leading-tight line-clamp-2">
                            {s.title}
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </PageShell>
  )
}
