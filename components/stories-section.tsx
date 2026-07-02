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
          {s.items.map((story) => (
            <article key={story.title} className="bg-brand-light group flex flex-col h-full border border-brand-light-border">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-brand-light/90 backdrop-blur-sm px-3 py-1.5 border border-brand-light-border">
                  <span className="text-xs font-bold tracking-widest uppercase text-brand-red">
                    {story.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <time className="text-xs font-semibold tracking-widest uppercase text-brand-light-muted mb-4 block">
                  {story.date}
                </time>
                <h3 className="text-xl font-black leading-tight text-brand-light-text mb-4 text-balance group-hover:text-brand-red transition-colors duration-200">
                  {story.title}
                </h3>
                <p className="text-sm text-brand-light-muted leading-relaxed mb-8 flex-1">
                  {story.excerpt}
                </p>
                <Link
                  href={story.href}
                  className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-brand-light-text hover:text-brand-red transition-colors duration-200 group/link mt-auto w-fit"
                >
                  Read Dispatch
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
