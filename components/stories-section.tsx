"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useContent } from "@/lib/content-context"

export function StoriesSection() {
  const { content } = useContent()
  const s = content.stories

  return (
    <section id="stories" className="bg-brand-surface border-t border-border py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-brand-red" />
              <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">{s.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight text-balance">
              {s.heading}
            </h2>
          </div>
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-foreground hover:text-brand-red transition-colors duration-200 group"
          >
            View All Reports
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
          {s.stories.map((story, index) => (
            <article key={story.title} className="bg-brand-surface group overflow-hidden">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover brightness-[0.8] group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="eager"
                  priority={index === 0}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-red text-primary-foreground text-xs font-bold tracking-widest uppercase px-3 py-1">
                    {story.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-muted-foreground tracking-wide mb-3">{story.date}</p>
                <h3 className="text-lg font-black text-foreground leading-tight mb-3 text-balance group-hover:text-brand-red transition-colors duration-200">
                  {story.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{story.excerpt}</p>
                <Link
                  href={story.href}
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
  )
}
