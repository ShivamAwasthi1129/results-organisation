"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useContent } from "@/lib/content-context"

function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, start])
  return count
}

function StatCard({ stat, animate }: { stat: { end: number; suffix: string; label: string; description: string }; animate: boolean }) {
  const count = useCountUp(stat.end, 2000, animate)
  return (
    <div className="p-8 border-b md:border-b-0 md:border-r border-border last:border-0 flex flex-col gap-3">
      <div className="text-5xl lg:text-6xl font-black text-brand-red tracking-tighter leading-none">
        {count}
        <span className="text-foreground/60">{stat.suffix}</span>
      </div>
      <div className="text-sm font-black uppercase tracking-wide text-foreground">{stat.label}</div>
      <div className="text-sm text-muted-foreground leading-relaxed">{stat.description}</div>
    </div>
  )
}

export function ImpactSection() {
  const { content } = useContent()
  const imp = content.impact
  const ref = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="impact" className="bg-brand-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-brand-red" />
              <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">{imp.eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight text-balance">
              {imp.heading}{" "}
              <span className="text-muted-foreground font-light">{imp.headingAccent}</span>
            </h2>
          </div>
          <Link
            href="/#donate"
            className="inline-flex items-center gap-2 bg-brand-red text-primary-foreground text-sm font-bold px-6 py-3.5 tracking-widest uppercase hover:bg-brand-red/90 active:scale-95 transition-all duration-200 flex-shrink-0"
          >
            Support Our Mission
          </Link>
        </div>

        <div ref={ref} className="grid md:grid-cols-4 border border-border">
          {imp.stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} animate={animate} />
          ))}
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border border-border p-6">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Positioned as experienced disaster management experts with a proven track record of results.
          </p>
          <div className="flex items-center gap-6 flex-shrink-0">
            {["FEMA Compliant", "IRS Registered 501(c)(3)", "Charity Navigator Rated"].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full" />
                <span className="text-xs font-bold tracking-wide text-foreground/60">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
