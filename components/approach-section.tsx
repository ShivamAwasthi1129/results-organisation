"use client"

import Image from "next/image"
import { useContent } from "@/lib/content-context"

export function ApproachSection() {
  const { content } = useContent()
  const a = content.approach

  return (
    <section id="approach" className="relative bg-brand-light">
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="/images/approach-bg.jpg"
          alt="Aerial view of disaster recovery operations in progress"
          fill
          className="object-cover brightness-[0.45]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light/50 via-transparent to-brand-light" />
        <div className="relative h-full flex items-center max-w-7xl mx-auto px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-brand-red" />
              <span className="text-xs font-bold tracking-widest uppercase text-brand-red">
                {a.eyebrow}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight text-balance drop-shadow-lg">
              {a.heading}
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-brand-light-border border border-brand-light-border">
          {a.phases.map((phase) => (
            <div
              key={phase.number}
              className="p-8 lg:p-10 group hover:bg-brand-light-surface transition-colors duration-300 bg-brand-light"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-5xl font-black text-brand-light-border group-hover:text-brand-red/20 transition-colors duration-300 leading-none">
                  {phase.number}
                </span>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                  <div className="w-1.5 h-1.5 bg-brand-red/50 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-brand-red/20 rounded-full" />
                </div>
              </div>
              <div className="mb-2">
                <span className="text-xs font-black tracking-widest uppercase text-brand-red border-b border-brand-red pb-0.5">
                  {phase.title}
                </span>
              </div>
              <h3 className="text-2xl font-black text-brand-light-text mb-5 text-balance">{phase.headline}</h3>
              <ul className="space-y-3">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brand-light-muted leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-red flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-l-4 border-brand-red pl-8">
          <p className="text-2xl md:text-3xl font-black text-brand-light-text leading-tight text-balance">
            {a.statement.split("—")[0].trim()}{" "}
            {a.statement.includes("—") && (
              <>{"— "}<span className="text-brand-light-muted font-light">{a.statement.split("—")[1].trim()}</span></>
            )}
          </p>
        </div>
      </div>
    </section>
  )
}
