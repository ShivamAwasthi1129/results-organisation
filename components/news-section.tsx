"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Radio, ExternalLink, Clock, ChevronRight } from "lucide-react"
import { useContent } from "@/lib/content-context"

// Hardcoded arrays removed to use dynamic context data

const categoryColor = (cat: string) => {
  switch (cat.toLowerCase()) {
    case "breaking": return "bg-brand-red text-primary-foreground"
    case "wildfire": return "bg-orange-100 text-orange-700"
    case "earthquake": return "bg-amber-100 text-amber-700"
    case "hurricane": return "bg-blue-100 text-blue-700"
    default: return "bg-[#f8f5f5] text-brand-light-text border border-brand-light-border"
  }
}

export function NewsSection() {
  const { content } = useContent()
  const { eyebrow, heading, subtext, leadStory, sideStories, wireItems } = content.news
  const [activeWire, setActiveWire] = useState<number | null>(null)

  return (
    <section id="news" className="bg-brand-light border-t border-brand-light-border py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-brand-red" />
              <span className="text-xs font-bold tracking-widest uppercase text-brand-light-muted">
                {eyebrow}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-brand-light-text tracking-tight text-balance">
              {heading}
            </h2>
            <p className="text-brand-light-muted text-sm mt-3 max-w-lg leading-relaxed">
              {subtext}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-red" />
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-brand-red">Live Updates</span>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-12 gap-px bg-brand-light-border border border-brand-light-border">

          {/* Lead story — 5 cols */}
          <article className="lg:col-span-5 bg-brand-light p-8 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className={`text-xs font-black tracking-widest uppercase px-2.5 py-1 ${categoryColor(leadStory.category)}`}>
                  {leadStory.category}
                </span>
                <span className="text-xs text-brand-light-muted font-medium">{leadStory.source}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-brand-light-text leading-tight mb-5 text-balance group-hover:text-brand-red transition-colors duration-300">
                {leadStory.title}
              </h3>
              <p className="text-sm text-brand-light-muted leading-relaxed mb-6">
                {leadStory.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {leadStory.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-brand-light-muted border border-brand-light-border px-2.5 py-1 tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-5 border-t border-brand-light-border">
              <div className="flex items-center gap-4 text-xs text-brand-light-muted">
                <span>{leadStory.date}</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={11} />
                  {leadStory.readTime}
                </span>
              </div>
              <Link
                href={leadStory.href}
                className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-brand-light-text hover:text-brand-red transition-colors duration-200 group/link"
              >
                Full Story
                <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>

          {/* Side stories — 4 cols */}
          <div className="lg:col-span-4 flex flex-col divide-y divide-brand-light-border bg-brand-light-surface">
            {sideStories.map((story) => (
              <article key={story.title} className="p-6 group hover:bg-brand-light transition-colors duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-black tracking-widest uppercase px-2 py-0.5 ${categoryColor(story.category)}`}>
                    {story.category}
                  </span>
                  <span className="text-xs text-brand-light-muted">{story.source}</span>
                  <span className="text-xs text-brand-light-muted ml-auto">{story.date}</span>
                </div>
                <Link href={story.href}>
                  <h4 className="text-sm font-black text-brand-light-text leading-tight mb-2 group-hover:text-brand-red transition-colors duration-200 text-balance">
                    {story.title}
                  </h4>
                </Link>
                <p className="text-xs text-brand-light-muted leading-relaxed line-clamp-2">
                  {story.excerpt}
                </p>
              </article>
            ))}
          </div>

          {/* Live wire — 3 cols */}
          <div className="lg:col-span-3 bg-[#f8f5f5] flex flex-col">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-brand-light-border">
              <Radio size={14} className="text-brand-red" />
              <span className="text-xs font-black tracking-widest uppercase text-brand-light-muted">
                From the Wire
              </span>
            </div>
            <div className="flex-1 divide-y divide-brand-light-border">
              {wireItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveWire(activeWire === i ? null : i)}
                  className="w-full text-left px-6 py-4 group hover:bg-brand-light transition-colors duration-150"
                >
                  <div className="flex items-start gap-3">
                    <ChevronRight
                      size={12}
                      className={`text-brand-red flex-shrink-0 mt-0.5 transition-transform duration-200 ${activeWire === i ? "rotate-90" : ""}`}
                    />
                    <div>
                      <p className="text-xs font-bold text-brand-light-text leading-snug mb-1.5 text-left">
                        {item.headline}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-brand-light-muted font-medium">{item.source}</span>
                        <span className="text-xs text-brand-light-muted">·</span>
                        <span className="text-xs text-brand-light-muted flex items-center gap-1">
                          <Clock size={9} />
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-brand-light-border">
              <Link
                href="/press"
                className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-brand-light-muted hover:text-brand-red transition-colors duration-200 group"
              >
                All Media
                <ExternalLink size={11} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-brand-light-border">
          <p className="text-xs text-brand-light-muted">
            News sourced from Reuters, AP, BBC, CNN, and wire services. R3sults.org does not control third-party content.
          </p>
          <Link
            href="/press"
            className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-brand-light-text hover:text-brand-red transition-colors duration-200 group flex-shrink-0"
          >
            Press Room
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  )
}
