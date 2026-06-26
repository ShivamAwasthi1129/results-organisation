import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function VolunteerSection() {
  return (
    <section id="volunteer" className="bg-brand-light border-t border-brand-light-border py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-px bg-brand-light-border border border-brand-light-border shadow-sm">
          {/* Volunteer — light panel */}
          <div className="bg-brand-light p-10 lg:p-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-brand-red" />
              <span className="text-xs font-bold tracking-widest uppercase text-brand-red">
                Get Involved
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-brand-light-text text-balance mb-4">
              Volunteer With Us
            </h2>
            <p className="text-brand-light-muted leading-relaxed mb-8">
              We need skilled professionals — logistics coordinators, medical personnel, engineers,
              communications specialists, and community liaisons. Your skills can save lives.
            </p>
            <div className="space-y-3 mb-8">
              {["Field Response Teams", "Logistics & Supply Chain", "Medical Support", "Community Training"].map((role) => (
                <div key={role} className="flex items-center gap-3 text-sm text-brand-light-text">
                  <div className="w-1.5 h-1.5 bg-brand-red flex-shrink-0" />
                  {role}
                </div>
              ))}
            </div>
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 bg-brand-red text-white text-sm font-bold px-7 py-3.5 tracking-widest uppercase hover:bg-brand-red/90 active:scale-95 transition-all duration-200 group"
            >
              Apply to Volunteer
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Partner — light panel with red accent */}
          <div id="partner" className="bg-[#f8f5f5] p-10 lg:p-14 border-l border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-brand-red" />
              <span className="text-xs font-bold tracking-widest uppercase text-brand-red">
                Partnership
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground text-balance mb-4">
              Become a Partner
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Corporate and institutional partners bring resources, networks, and expertise that
              multiply our impact. Join a coalition of organizations committed to real results.
            </p>
            <div className="space-y-3 mb-8">
              {["Corporate Matching Programs", "Resource & Equipment Donations", "Technology Partnerships", "Media & Communications"].map((role) => (
                <div key={role} className="flex items-center gap-3 text-sm text-foreground">
                  <div className="w-1.5 h-1.5 bg-brand-red flex-shrink-0" />
                  {role}
                </div>
              ))}
            </div>
            <Link
              href="/partner"
              className="inline-flex items-center gap-2 border-2 border-brand-red text-brand-red text-sm font-bold px-7 py-3.5 tracking-widest uppercase hover:bg-brand-red hover:text-white active:scale-95 transition-all duration-200 group"
            >
              Partner With Us
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
