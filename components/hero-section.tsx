"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Shield, Users, MapPin } from "lucide-react"
import { useContent } from "@/lib/content-context"

export function HeroSection() {
  const { content } = useContent()
  const h = content.hero

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "#f8f5f5" }}
      aria-label="Hero"
    >
      {/* Background subtle texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(191,6,55,0.04) 0%, transparent 60%),
                            radial-gradient(circle at 80% 20%, rgba(191,6,55,0.03) 0%, transparent 50%)`,
        }}
      />

      <div className="relative flex flex-col lg:flex-row flex-1 max-w-7xl mx-auto w-full px-6 lg:px-8 pt-28 pb-0 lg:pb-0 gap-0">

        {/* LEFT — copy column */}
        <div className="flex flex-col justify-center flex-1 py-12 lg:py-20 lg:pr-12 z-10">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-7">
            <div className="w-8 h-0.5 bg-brand-red" />
            <span className="text-xs font-bold tracking-widest uppercase text-brand-red">
              {h.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-foreground text-balance mb-6">
            {h.headline}{" "}
            <span className="text-brand-red">{h.headlineAccent}</span>{" "}
            {h.headlineSuffix}
          </h1>

          {/* Subtext */}
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-10">
            {h.subtext}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              href="/#donate"
              className="inline-flex items-center gap-2 bg-brand-red text-white text-sm font-bold px-7 py-4 tracking-widest uppercase hover:bg-brand-red/90 active:scale-95 transition-all duration-200 group"
            >
              {h.ctaPrimary}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/partner"
              className="inline-flex items-center gap-2 border border-foreground/20 text-foreground text-sm font-bold px-7 py-4 tracking-widest uppercase hover:border-foreground/50 hover:bg-foreground/5 transition-all duration-200"
            >
              {h.ctaSecondary}
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6">
            {[
              { icon: Shield, label: "Disaster Certified" },
              { icon: Users, label: "Field-Deployed Teams" },
              { icon: MapPin, label: "U.S. & Caribbean" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={14} className="text-brand-red" />
                <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — photo with glass stat cards */}
        <div className="relative lg:w-[52%] flex-shrink-0 min-h-[400px] lg:min-h-0 rounded-t-2xl lg:rounded-2xl overflow-hidden mt-4 lg:mt-20 lg:mb-10 self-stretch">
          {/* Photo */}
          <Image
            src={h.heroImage || "/images/hero-main.jpg"}
            alt="R3sults Foundation responders providing emergency medical aid at a field operations site"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1024px) 100vw, 52vw"
          />
          {/* Subtle light overlay for glass card contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Floating glass stat cards */}
          <div className="absolute bottom-6 left-4 right-4 grid grid-cols-2 gap-3">
            {h.stats.slice(0, 4).map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl px-4 py-3 flex flex-col gap-0.5"
                style={{
                  background: "rgba(248, 245, 245, 0.18)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(248, 245, 245, 0.30)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                }}
              >
                <div className="text-xl font-black text-white leading-none">{stat.value}</div>
                <div className="text-[10px] font-semibold tracking-widest uppercase text-white/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Top-right glass badge */}
          <div
            className="absolute top-5 right-5 rounded-xl px-4 py-2.5 flex items-center gap-2"
            style={{
              background: "rgba(191, 6, 55, 0.85)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.20)",
              boxShadow: "0 4px 20px rgba(191,6,55,0.3)",
            }}
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-white">
              Active Response
            </span>
          </div>
        </div>
      </div>

      {/* Bottom strip — full width stat bar */}
      <div
        className="relative border-t border-foreground/10"
        style={{ backgroundColor: "#f8f5f5" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-foreground/10">
            {h.stats.map((stat) => (
              <div key={stat.label} className="px-6 py-5 text-center">
                <div className="text-2xl font-black text-brand-red">{stat.value}</div>
                <div className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
