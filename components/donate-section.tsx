"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ShieldCheck, BarChart3, RefreshCw } from "lucide-react"
import { useContent } from "@/lib/content-context"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input"
import "react-phone-number-input/style.css"

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

export function DonateSection() {
  const { content } = useContent()
  const d = content.donate
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);

  useEffect(() => {
    async function loadCampaigns() {
      try {
        const res = await fetch('/api/campaigns');
        const data = await res.json();
        if (data.success && data.campaigns && data.campaigns.length > 0) {
          setCampaigns(data.campaigns);
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadCampaigns();
  }, []);

  const [campaignId, setCampaignId] = useState("CAM-001")
  const activeCampaign = campaigns.find((c: any) => c.id === campaignId) || campaigns[0];
  const activeTiers = activeCampaign ? activeCampaign.tiers : [];

  const [selected, setSelected] = useState<number | null>(100)
  const [custom, setCustom] = useState("")
  const [recurring, setRecurring] = useState(false)
  const [isPending, setIsPending] = useState(false)

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [modalCampaignId, setModalCampaignId] = useState("CAM-001")
  const modalActiveCampaign = campaigns.find((c: any) => c.id === modalCampaignId) || campaigns[0];
  const [emailError, setEmailError] = useState("")
  const [phoneError, setPhoneError] = useState("")

  // Sync default selection once campaigns load
  useEffect(() => {
    if (campaigns.length > 0) {
      const active = campaigns.find((c: any) => c.id === campaignId) || campaigns[0];
      if (active && active.tiers && active.tiers[1]) {
        setSelected(active.tiers[1].amount);
      }
    }
  }, [campaigns, campaignId]);

  const handleCustom = (val: string) => { setCustom(val); setSelected(null) }

  const handleCampaignChange = (id: string) => {
    setCampaignId(id);
    const targetCampaign = campaigns.find((c: any) => c.id === id) || campaigns[0];
    // Keep amount selected if it exists in the new campaign, otherwise default to second tier
    if (selected && !targetCampaign.tiers.some((t: any) => t.amount === selected)) {
      setSelected(targetCampaign.tiers[1]?.amount ?? 100);
    }
  }

  const handleDonateClick = () => {
    const amount = selected || parseFloat(custom);
    if (!amount || amount <= 0) return;
    setModalCampaignId(campaignId);
    setEmailError("");
    setPhoneError("");
    setIsModalOpen(true);
  }

  const handleModalCampaignChange = (id: string) => {
    setModalCampaignId(id);
    const targetCampaign = campaigns.find((c: any) => c.id === id) || campaigns[0];
    if (selected && !targetCampaign.tiers.some((t: any) => t.amount === selected)) {
      setSelected(targetCampaign.tiers[1]?.amount ?? 100);
    }
  }

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selected || parseFloat(custom);
    if (!amount || amount <= 0) return;

    setEmailError("");
    setPhoneError("");
    let hasError = false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    if (!phone || !isValidPhoneNumber(phone)) {
      setPhoneError("Please enter a valid phone number (e.g. +1234567890).");
      hasError = true;
    }

    if (hasError) return;

    setIsPending(true);
    const chosenCampaign = campaigns.find((c: any) => c.id === modalCampaignId) || activeCampaign;

    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount, 
          recurring, 
          campaign: chosenCampaign.name,
          campaignId: chosenCampaign.id,
          campaignLocation: chosenCampaign.location,
          campaignDate: chosenCampaign.date,
          firstName,
          lastName,
          email,
          phone,
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
          <div className="p-6 sm:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-brand-light-border bg-brand-light">
            <h3 className="text-sm font-black tracking-widest uppercase text-brand-light-text mb-6">
              Choose Your Impact</h3>
            
            {/* Campaign Select - Moved to the Top */}
            <div className="mb-6">
              <label htmlFor="campaign-select" className="block text-sm font-bold text-brand-light-text mb-2">Select Disaster </label>
              <div className="relative">
                <select
                  id="campaign-select"
                  value={campaignId}
                  onChange={(e) => handleCampaignChange(e.target.value)}
                  className="w-full appearance-none bg-brand-light-surface border border-brand-light-border text-brand-light-text text-sm py-3 pl-4 pr-10 outline-none focus:border-brand-red transition-colors cursor-pointer truncate"
                >
                  {campaigns.map((c: any) => (
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
                  className="w-full text-left p-4 border transition-all duration-200 border-brand-light-border hover:border-brand-light-muted bg-brand-light focus:outline-none focus:border-brand-red"
                  style={selected === tier.amount ? { borderColor: '#c00000', backgroundColor: 'rgba(192, 0, 0, 0.05)' } : {}}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-brand-light-text">
                      ${tier.amount}{" "}
                      <span className="text-sm font-bold text-brand-red ml-1">— {tier.label}</span>
                    </span>
                    <div className="w-4 h-4 border-2 rounded-full flex items-center justify-center flex-shrink-0" style={{ borderColor: selected === tier.amount ? '#c00000' : '' }}>
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

            {/* Redesigned Monthly Toggle Switch - Stackable on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 p-4 border border-brand-light-border bg-brand-light-surface rounded-md">
              <div>
                <p className="text-sm font-bold text-brand-light-text">Monthly Recurring Donation</p>
                <p className="text-xs text-brand-light-muted mt-0.5">Sustained support for long-term recovery</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none self-start sm:self-auto">
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
              onClick={handleDonateClick}
              disabled={isPending || (!selected && !custom)}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-red text-white text-sm font-bold px-8 py-4 tracking-widest uppercase hover:bg-brand-red/90 active:scale-95 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Processing..." : "Donate Now"}
              {!isPending && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
            <p className="text-xs text-brand-light-muted text-center mt-4">
              Secure 256-bit encrypted donation. Tax-deductible. EIN: 42-2695859
            </p>
          </div>

          {/* Trust panel */}
          <div className="p-6 sm:p-8 lg:p-12 bg-foreground flex flex-col justify-between">
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md w-[95vw] max-h-[92vh] overflow-y-auto bg-background text-foreground p-5 sm:p-6 rounded-lg border border-border shadow-lg scrollbar-thin">
          <DialogHeader className="mb-3 text-left">
            <DialogTitle className="text-xl font-black uppercase tracking-wider text-foreground">
              Donor Information
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Please complete this quick form before proceeding to secure payment.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleModalSubmit} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-background border border-neutral-300 dark:border-neutral-700 rounded-md px-3 py-2 text-sm text-foreground outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-background border border-neutral-300 dark:border-neutral-700 rounded-md px-3 py-2 text-sm text-foreground outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-background border ${emailError ? "border-brand-red" : "border-neutral-300 dark:border-neutral-700"} rounded-md px-3 py-2 text-sm text-foreground outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all`}
              />
              {emailError && <p className="text-brand-red text-xs mt-1 font-bold">{emailError}</p>}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Phone Number *
              </label>
              <PhoneInput
                defaultCountry="US"
                value={phone}
                onChange={(val) => setPhone(val || "")}
                required
                className={`w-full bg-background border ${phoneError ? "border-brand-red" : "border-neutral-300 dark:border-neutral-700"} rounded-md px-3 py-2 text-sm text-foreground outline-none focus-within:ring-1 focus-within:ring-brand-red focus-within:border-brand-red transition-all [&_input]:outline-none [&_input]:border-none [&_input]:p-0 [&_input]:bg-transparent [&_input]:text-foreground [&_input]:ml-2`}
              />
              {phoneError && <p className="text-brand-red text-xs mt-1 font-bold">{phoneError}</p>}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Select Disaster Campaign *
              </label>
              <select
                value={modalCampaignId}
                onChange={(e) => handleModalCampaignChange(e.target.value)}
                className="w-full bg-background border border-neutral-300 dark:border-neutral-700 rounded-md text-foreground text-sm py-2 px-3 outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all cursor-pointer"
              >
                {campaigns.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.id}) {c.location ? `— ${c.location}` : ""} {c.date ? `| ${c.date}` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Dynamic Amount Tiers (Sub-options) inside Modal */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Select Donation Tier (Sub-options) *
              </label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {modalActiveCampaign?.tiers?.map((tier: any) => (
                  <button
                    key={tier.amount}
                    type="button"
                    onClick={() => { setSelected(tier.amount); setCustom("") }}
                    className="flex flex-col items-center justify-center p-2 border transition-all duration-200 border-neutral-300 dark:border-neutral-700 bg-background rounded-md focus:outline-none focus:border-brand-red text-center cursor-pointer"
                    style={selected === tier.amount ? { borderColor: '#c00000', backgroundColor: 'rgba(192, 0, 0, 0.05)' } : {}}
                  >
                    <span className="font-black text-sm text-foreground">
                      ${tier.amount}
                    </span>
                    <span className="text-[10px] font-bold text-brand-red truncate max-w-full">
                      {tier.label}
                    </span>
                  </button>
                ))}
              </div>
              
              <div className={`border rounded-md transition-all duration-200 ${custom ? "border-brand-red" : "border-neutral-300 dark:border-neutral-700"}`}>
                <div className="flex items-center px-3 py-2">
                  <span className="text-foreground font-black text-sm mr-2">$</span>
                  <input
                    type="number"
                    value={custom}
                    onChange={(e) => handleCustom(e.target.value)}
                    placeholder="Or enter custom amount"
                    className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none"
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Monthly Recurring Toggle inside Modal */}
            <div className="flex items-center justify-between gap-4 p-2.5 border border-neutral-300 dark:border-neutral-700 bg-brand-light-surface rounded-md">
              <div>
                <p className="text-xs font-bold text-foreground">Monthly Recurring Donation</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Sustained support for long-term recovery</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={recurring} 
                  onChange={() => setRecurring(!recurring)} 
                  className="sr-only peer" 
                />
                <div className="w-8 h-4.5 bg-neutral-300 dark:bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-brand-red"></div>
              </label>
            </div>

            <div className="pt-3 border-t border-border">
              <button
                type="submit"
                disabled={isPending}
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-red text-white text-sm font-bold px-8 py-3.5 tracking-widest uppercase hover:bg-brand-red/90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Processing..." : `Proceed to Pay $${selected || parseFloat(custom)}`}
                {!isPending && <ArrowRight size={16} />}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
