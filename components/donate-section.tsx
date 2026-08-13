"use client"

import { useState } from "react"
import { ArrowRight, ShieldCheck, BarChart3, RefreshCw } from "lucide-react"
import { useContent } from "@/lib/content-context"

const trustIcons = [ShieldCheck, BarChart3, RefreshCw]
const trustLabels = ["100% Transparent", "Impact Reporting", "Recurring Donations"]
const trustDescs = [
  "Full financial reporting and impact accountability.",
  "Annual reports with measurable outcomes and deployments.",
  "Set up monthly giving for sustained community support.",
]

export function DonateSection() {
  const { content } = useContent()
  const d = content.donate

  const [selected, setSelected] = useState<number | null>(d.tiers[1]?.amount ?? null)
  const [custom, setCustom] = useState("")
  const [recurring, setRecurring] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const handleCustom = (val: string) => { setCustom(val); setSelected(null) }

  const handleDonate = async () => {
    const amount = selected || parseFloat(custom);
    if (!amount || amount <= 0) return;

    setIsPending(true);
    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, recurring }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error(data.error);
        setIsPending(false);
      }
    } catch (err) {
      console.error(err);
      setIsPending(false);
    }
  }

  return (
    <section id="donate" className="bg-brand-light py-20 border-t border-brand-light-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-brand-red" />
            <span className="text-xs font-bold tracking-widest uppercase text-brand-red">{d.eyebrow}</span>
            <div className="w-8 h-0.5 bg-brand-red" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-brand-light-text tracking-tight text-balance mb-4">
            {d.heading}
          </h2>
          <p className="text-lg text-brand-light-muted max-w-xl mx-auto leading-relaxed">{d.subtext}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-0 border border-brand-light-border shadow-sm">
          {/* Donation form */}
          <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-brand-light-border bg-brand-light">
            <h3 className="text-sm font-black tracking-widest uppercase text-brand-light-text mb-6">Choose Your Impact</h3>
            <div className="space-y-3 mb-6">
              {d.tiers.map((tier) => (
                <button
                  key={tier.amount}
                  onClick={() => { setSelected(tier.amount); setCustom("") }}
                  className={`w-full text-left p-4 border transition-all duration-200 ${
                    selected === tier.amount
                      ? "border-brand-red bg-brand-red/5"
                      : "border-brand-light-border hover:border-brand-light-muted bg-brand-light"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-brand-light-text">
                      ${tier.amount}{" "}
                      <span className="text-sm font-bold text-brand-red ml-1">— {tier.label}</span>
                    </span>
                    <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center flex-shrink-0 ${selected === tier.amount ? "border-brand-red" : "border-brand-light-border"}`}>
                      {selected === tier.amount && <div className="w-2 h-2 bg-brand-red rounded-full" />}
                    </div>
                  </div>
                  <p className="text-xs text-brand-light-muted leading-relaxed">{tier.description}</p>
                </button>
              ))}
              <div className={`border transition-all duration-200 ${custom ? "border-brand-red" : "border-brand-light-border"}`}>
                <div className="flex items-center px-4 py-3">
                  <span className="text-brand-light-text font-black mr-2">$</span>
                  <input
                    type="number"
                    value={custom}
                    onChange={(e) => handleCustom(e.target.value)}
                    placeholder="Custom Amount"
                    className="flex-1 bg-transparent text-brand-light-text placeholder:text-brand-light-muted text-sm outline-none"
                    min="1"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-8 p-4 border border-brand-light-border bg-brand-light-surface">
              <div>
                <p className="text-sm font-bold text-brand-light-text">Monthly Recurring Donation</p>
                <p className="text-xs text-brand-light-muted mt-0.5">Sustained support for long-term recovery</p>
              </div>
              <button
                onClick={() => setRecurring(!recurring)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${recurring ? "bg-brand-red" : "bg-brand-light-border"}`}
                aria-label={recurring ? "Disable recurring donation" : "Enable recurring donation"}
                role="switch"
                aria-checked={recurring}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm ${recurring ? "translate-x-7" : "translate-x-1"}`} />
              </button>
            </div>

            <button 
              onClick={handleDonate}
              disabled={isPending || (!selected && !custom)}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-red text-white text-sm font-bold px-8 py-4 tracking-widest uppercase hover:bg-brand-red/90 active:scale-95 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Processing..." : "Donate Now"}
              {!isPending && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
            <p className="text-xs text-brand-light-muted text-center mt-4">
              Secure 256-bit encrypted donation. Tax-deductible. EIN: XX-XXXXXXX
            </p>
          </div>

          {/* Trust panel */}
          <div className="p-8 lg:p-12 bg-foreground flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-black tracking-widest uppercase text-background mb-8">{d.trustHeading}</h3>
              <div className="space-y-8">
                {trustLabels.map((label, i) => {
                  const Icon = trustIcons[i]
                  return (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 border border-brand-red/30 flex items-center justify-center flex-shrink-0 bg-brand-red/10">
                        <Icon size={18} className="text-brand-red" />
                      </div>
                      <div>
                        <p className="font-black text-background text-sm mb-1">{label}</p>
                        <p className="text-xs text-background/60 leading-relaxed">{trustDescs[i]}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="mt-10 border-t border-background/10 pt-8">
              <p className="text-xs text-background/50 leading-relaxed">{d.legalNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
