const pillars = [
  {
    number: "01",
    title: "Volunteer-Driven Operations",
    body: "Our lean structure is powered by committed volunteers with professional expertise, keeping overhead minimal and impact maximal.",
  },
  {
    number: "02",
    title: "Deep Supplier Network",
    body: "Years of partnerships translate into discounted procurement agreements and pre-positioned resources ready for immediate deployment.",
  },
  {
    number: "03",
    title: "Technology-Driven Coordination",
    body: "Real-time logistics, GPS asset tracking, and data-driven resource allocation ensure nothing falls through the cracks.",
  },
  {
    number: "04",
    title: "Low Overhead Model",
    body: "We operate lean so more of every donated dollar reaches the communities and families who need it most.",
  },
  {
    number: "05",
    title: "Direct Resource Allocation",
    body: "Funds flow directly to affected communities — no excessive administrative layers between your donation and real impact.",
  },
  {
    number: "06",
    title: "Full Transparency & Reporting",
    body: "Comprehensive impact reports, audited financials, and real-time deployment updates keep donors informed and accountable.",
  },
]

export function OperationsSection() {
  return (
    <section id="operations" className="bg-brand-light-surface py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-brand-red" />
            <span className="text-xs font-bold tracking-widest uppercase text-brand-red">
              How We Operate
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-brand-light-text tracking-tight text-balance mb-4">
            Efficient. Transparent.{" "}
            <span className="text-brand-red">Resource-Optimized.</span>
          </h2>
          <p className="text-lg text-brand-light-muted leading-relaxed">
            We are operationally disciplined — not just emotionally driven. Every system, every process,
            every partnership is designed to maximize impact for those we serve.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-light-border border border-brand-light-border">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="bg-brand-light hover:bg-brand-light-surface transition-colors duration-300 p-8 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-black tracking-widest text-brand-light-muted">
                  {pillar.number}
                </span>
                <div className="flex-1 h-px bg-brand-light-border group-hover:bg-brand-red/40 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-black text-brand-light-text mb-3 text-balance">{pillar.title}</h3>
              <p className="text-sm text-brand-light-muted leading-relaxed">{pillar.body}</p>
            </div>
          ))}
        </div>

        {/* Positioning statement */}
        <div className="mt-16 bg-[#f8f5f5] border border-border p-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-brand-red mb-4">
                Our Positioning
              </p>
              <h3 className="text-3xl font-black text-foreground text-balance leading-tight">
                This is not just a charity. This is a{" "}
                <span className="text-brand-red">disaster management authority.</span>
              </h3>
            </div>
            <div className="space-y-4">
              {[
                "A preparedness-first organization",
                "A long-term recovery partner",
                "A 20+ year experienced response team",
                "A systems-driven humanitarian operation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-brand-red flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
