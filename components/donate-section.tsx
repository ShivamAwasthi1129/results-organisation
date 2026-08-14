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

interface CampaignData {
  id: string;
  name: string;
  location?: string;
  date?: string;
  tiers: { amount: number; label: string; description: string }[];
}

const CAMPAIGNS: CampaignData[] = [
  {
    id: "CAM-001",
    name: "Standard Contribution",
    location: "Global",
    date: "Ongoing",
    tiers: [
      { amount: 50, label: "General Relief", description: "Supports day-to-day operations and general preparedness." },
      { amount: 100, label: "Community Aid", description: "Fund community-led programs and resources." },
      { amount: 250, label: "Sustaining Gift", description: "Provides ongoing support for our operational capabilities." },
    ]
  },
  {
    id: "CAM-002",
    name: "Venezuela Earthquake Relief",
    location: "Caracas, Venezuela",
    date: "June 24, 2026",
    tiers: [
      { amount: 50, label: "Emergency Food & Water", description: "Provides immediate clean water and ration packs for a displaced family." },
      { amount: 100, label: "Medical Supplies Kit", description: "Funds essential medical supplies and first-aid kits for disaster response." },
      { amount: 250, label: "Temporary Shelter Tent", description: "Supplies a family-sized temporary thermal shelter for those left homeless." },
    ]
  },
  {
    id: "CAM-003",
    name: "Japan Earthquake Relief",
    location: "Fukushima, Japan",
    date: "July 12, 2026",
    tiers: [
      { amount: 50, label: "Hygiene & Sanitation Kit", description: "Supplies hygiene products and sanitizing items for evacuation centers." },
      { amount: 100, label: "Warm Blankets & Apparel", description: "Provides thermal blankets and cold-weather clothing for survivors." },
      { amount: 250, label: "Rescue Team Support", description: "Funds search-and-rescue teams and structural inspection gear." },
    ]
  },
  {
    id: "CAM-004",
    name: "Turkey Earthquake Relief",
    location: "Van Province, Turkey",
    date: "August 5, 2026",
    tiers: [
      { amount: 50, label: "Warm Meals Distribution", description: "Funds hot meals for families in temporary refugee settlements." },
      { amount: 100, label: "Clean Water Station", description: "Helps set up temporary clean water distribution points." },
      { amount: 250, label: "Thermal Heating Unit", description: "Supplies heating equipment to keep families safe in freezing winter temperatures." },
    ]
  },
  {
    id: "CAM-005",
    name: "Chile Earthquake Relief",
    location: "Valparaiso, Chile",
    date: "August 10, 2026",
    tiers: [
      { amount: 50, label: "First Aid & Triage Support", description: "Provides medical kits for triage centers." },
      { amount: 100, label: "Baby & Toddler Support", description: "Funds baby formula, diapers, and nutrition packs." },
      { amount: 250, label: "Debris & Emergency Tool Kit", description: "Provides shovels, helmets, and tools for clear-up teams." },
    ]
  },
  {
    id: "CAM-006",
    name: "Colombia Earthquake Relief 2026",
    location: "Bogota, Colombia",
    date: "March 14, 2026",
    tiers: [
      { amount: 50, label: "Survival Food Package", description: "Supplies high-nutrition dry food rations for a family." },
      { amount: 100, label: "First Response Medication", description: "Funds antibiotics, bandages, and critical medication." },
      { amount: 250, label: "Rebuilding Supplies", description: "Contributes to building materials for homes destroyed by structural failure." },
    ]
  },
  {
    id: "CAM-007",
    name: "Typhoon Saola Relief",
    location: "Philippines & Taiwan",
    date: "September 2026",
    tiers: [
      { amount: 50, label: "Flashlights & Emergency Batteries", description: "Supplies lighting and power sources to storm victims." },
      { amount: 100, label: "Waterproof Tarp & Rope", description: "Provides immediate protection for homes with damaged roofs." },
      { amount: 250, label: "Water Purification Systems", description: "Funds high-volume portable filtration systems." },
    ]
  },
  {
    id: "CAM-008",
    name: "Mediterranean Wildfires Relief",
    location: "Greece & Italy",
    date: "August 2026",
    tiers: [
      { amount: 50, label: "Respiratory Protection Gear", description: "Supplies protective smoke masks and filters." },
      { amount: 100, label: "Wildlife Rescue & Rehab", description: "Funds treatment for animals affected by forest fires." },
      { amount: 250, label: "Firefighter Support Kit", description: "Provides cooling equipment and hydration for volunteer responders." },
    ]
  }
];

export function DonateSection() {
  const { content } = useContent()
  const d = content.donate

  const [campaignId, setCampaignId] = useState("CAM-001")
  const activeCampaign = CAMPAIGNS.find(c => c.id === campaignId) || CAMPAIGNS[0];
  const activeTiers = activeCampaign.tiers;

  const [selected, setSelected] = useState<number | null>(activeTiers[1]?.amount ?? 100)
  const [custom, setCustom] = useState("")
  const [recurring, setRecurring] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const handleCustom = (val: string) => { setCustom(val); setSelected(null) }

  const handleCampaignChange = (id: string) => {
    setCampaignId(id);
    const targetCampaign = CAMPAIGNS.find(c => c.id === id) || CAMPAIGNS[0];
    // Keep amount selected if it exists in the new campaign, otherwise default to second tier
    if (selected && !targetCampaign.tiers.some(t => t.amount === selected)) {
      setSelected(targetCampaign.tiers[1]?.amount ?? 100);
    }
  }

  const handleDonate = async () => {
    const amount = selected || parseFloat(custom);
    if (!amount || amount <= 0) return;

    setIsPending(true);
    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount, 
          recurring, 
          campaign: activeCampaign.name,
          campaignId: activeCampaign.id
        }),
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
            
            {/* Campaign Select - Moved to the Top */}
            <div className="mb-6">
              <label htmlFor="campaign-select" className="block text-sm font-bold text-brand-light-text mb-2">Select Campaign</label>
              <div className="relative">
                <select
                  id="campaign-select"
                  value={campaignId}
                  onChange={(e) => handleCampaignChange(e.target.value)}
                  className="w-full appearance-none bg-brand-light-surface border border-brand-light-border text-brand-light-text text-sm py-3 px-4 outline-none focus:border-brand-red transition-colors cursor-pointer"
                >
                  {CAMPAIGNS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.id}) {c.location ? `— ${c.location}` : ""} {c.date ? `| ${c.date}` : ""}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-light-muted">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>

            {/* Dynamic Amount Tiers */}
            <div className="space-y-3 mb-6">
              {activeTiers.map((tier) => (
                <button
                  key={tier.amount}
                  onClick={() => { setSelected(tier.amount); setCustom("") }}
                  className={`w-full text-left p-4 border transition-all duration-200 ${selected === tier.amount
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

            {/* Redesigned Monthly Toggle Switch */}
            <div className="flex items-center justify-between mb-8 p-4 border border-brand-light-border bg-brand-light-surface rounded-md">
              <div>
                <p className="text-sm font-bold text-brand-light-text">Monthly Recurring Donation</p>
                <p className="text-xs text-brand-light-muted mt-0.5">Sustained support for long-term recovery</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={recurring} 
                  onChange={() => setRecurring(!recurring)} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-brand-light-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-red"></div>
              </label>
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
