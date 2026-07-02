"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useContent } from "@/lib/content-context"

const typeLabel: Record<string, string> = {
  survivor: "Survivor Story",
  volunteer: "Volunteer",
  partner: "Partner Testimonial",
}

export function TestimonialsSection() {
  const { content } = useContent()
  const { eyebrow, heading, items: testimonials } = content.testimonials
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1))
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1))

  const t = testimonials[active]

  return (
    <section className="bg-brand-surface border-y border-border py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-brand-red" />
              <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">
                {eyebrow}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
              {heading}
            </h2>
          </div>
          {/* Navigation */}
          {testimonials.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-11 h-11 border border-border flex items-center justify-center text-foreground hover:border-brand-red hover:text-brand-red transition-colors duration-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm text-brand-muted-text font-medium">
                {active + 1} / {testimonials.length}
              </span>
              <button
                onClick={next}
                className="w-11 h-11 border border-border flex items-center justify-center text-foreground hover:border-brand-red hover:text-brand-red transition-colors duration-200"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Active testimonial */}
        {t && (
          <div className="grid md:grid-cols-5 gap-0 border border-border overflow-hidden">
            {/* Image */}
            <div className="md:col-span-2 relative h-72 md:h-auto">
              <Image
                src={t.image}
                alt={`Portrait of ${t.name}, ${t.role}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="inline-block border border-foreground/30 text-foreground/70 text-xs font-bold tracking-widest uppercase px-3 py-1">
                  {typeLabel[t.type] || "Testimonial"}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3 p-8 lg:p-12 flex flex-col justify-between bg-brand-light">
              <div>
                <Quote size={40} className="text-brand-red/30 mb-6" aria-hidden />
                <blockquote className="text-xl md:text-2xl font-light text-brand-light-text leading-relaxed mb-8">
                  {`"${t.quote}"`}
                </blockquote>
              </div>
              <div>
                <div className="w-12 h-px bg-brand-red mb-4" />
                <p className="font-black text-brand-light-text text-lg">{t.name}</p>
                <p className="text-sm text-brand-light-muted mt-1">
                  {t.role} &mdash; {t.location}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab indicators */}
        {testimonials.length > 0 && (
          <div className="flex items-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-0.5 transition-all duration-300 ${
                  i === active ? "w-12 bg-brand-red" : "w-4 bg-border"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Mid-page CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/#donate"
            className="inline-flex items-center gap-2 bg-brand-red text-primary-foreground text-sm font-bold px-8 py-4 tracking-widest uppercase hover:bg-brand-red/90 active:scale-95 transition-all duration-200"
          >
            Support Our Mission
          </Link>
        </div>
      </div>
    </section>
  )
}
