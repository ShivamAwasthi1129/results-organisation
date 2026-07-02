"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Save, RotateCcw, Eye, Lock, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react"
import { useContent } from "@/lib/content-context"
import { defaultContent, type SiteContent } from "@/lib/content-defaults"

const ADMIN_PASSWORD = "r3sults2026"
const SESSION_KEY = "r3sults_admin_session"

// ─── Reusable field components ───────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold tracking-widest uppercase text-foreground/50">{label}</label>
      {children}
    </div>
  )
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 border border-border bg-background text-foreground text-sm outline-none focus:border-brand-red transition-colors"
    />
  )
}

function Textarea({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full px-3 py-2.5 border border-border bg-background text-foreground text-sm outline-none focus:border-brand-red transition-colors resize-y"
    />
  )
}

function SectionShell({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-card hover:bg-muted transition-colors"
      >
        <span className="text-sm font-black tracking-widest uppercase text-foreground">{title}</span>
        {open ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
      </button>
      {open && <div className="px-6 py-6 space-y-5 border-t border-border">{children}</div>}
    </div>
  )
}

// ─── Tab editors ─────────────────────────────────────────────────────────────

function HeroEditor({ draft, onChange }: { draft: SiteContent; onChange: (d: SiteContent) => void }) {
  const h = draft.hero
  const set = (key: keyof typeof h, val: string) => onChange({ ...draft, hero: { ...h, [key]: val } })

  return (
    <div className="space-y-4">
      <SectionShell title="Hero Text">
        <Field label="Eyebrow"><Input value={h.eyebrow} onChange={(v) => set("eyebrow", v)} /></Field>
        <Field label="Headline"><Input value={h.headline} onChange={(v) => set("headline", v)} /></Field>
        <Field label="Headline Accent (red)"><Input value={h.headlineAccent} onChange={(v) => set("headlineAccent", v)} /></Field>
        <Field label="Headline Suffix"><Input value={h.headlineSuffix} onChange={(v) => set("headlineSuffix", v)} /></Field>
        <Field label="Subtext"><Textarea value={h.subtext} onChange={(v) => set("subtext", v)} /></Field>
        <Field label="Primary CTA Label"><Input value={h.ctaPrimary} onChange={(v) => set("ctaPrimary", v)} /></Field>
        <Field label="Secondary CTA Label"><Input value={h.ctaSecondary} onChange={(v) => set("ctaSecondary", v)} /></Field>
      </SectionShell>
      <SectionShell title="Stats Strip">
        {h.stats.map((stat, i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <Field label={`Stat ${i + 1} Value`}><Input value={stat.value} onChange={(v) => { const s = [...h.stats]; s[i] = { ...s[i], value: v }; onChange({ ...draft, hero: { ...h, stats: s } }) }} /></Field>
            <Field label={`Stat ${i + 1} Label`}><Input value={stat.label} onChange={(v) => { const s = [...h.stats]; s[i] = { ...s[i], label: v }; onChange({ ...draft, hero: { ...h, stats: s } }) }} /></Field>
          </div>
        ))}
      </SectionShell>
    </div>
  )
}

function ApproachEditor({ draft, onChange }: { draft: SiteContent; onChange: (d: SiteContent) => void }) {
  const a = draft.approach
  const set = (key: keyof typeof a, val: string) => onChange({ ...draft, approach: { ...a, [key]: val } })

  return (
    <div className="space-y-4">
      <SectionShell title="Section Header">
        <Field label="Eyebrow"><Input value={a.eyebrow} onChange={(v) => set("eyebrow", v)} /></Field>
        <Field label="Heading"><Input value={a.heading} onChange={(v) => set("heading", v)} /></Field>
        <Field label="Closing Statement"><Textarea value={a.statement} onChange={(v) => set("statement", v)} rows={2} /></Field>
      </SectionShell>
      {a.phases.map((phase, pi) => (
        <SectionShell key={pi} title={`Phase ${pi + 1}: ${phase.title}`}>
          <Field label="Phase Title"><Input value={phase.title} onChange={(v) => { const p = [...a.phases]; p[pi] = { ...p[pi], title: v }; onChange({ ...draft, approach: { ...a, phases: p } }) }} /></Field>
          <Field label="Headline"><Input value={phase.headline} onChange={(v) => { const p = [...a.phases]; p[pi] = { ...p[pi], headline: v }; onChange({ ...draft, approach: { ...a, phases: p } }) }} /></Field>
          <Field label="Bullet Points">
            <div className="space-y-2">
              {phase.items.map((item, ii) => (
                <div key={ii} className="flex gap-2">
                  <Input value={item} onChange={(v) => { const p = [...a.phases]; const items = [...p[pi].items]; items[ii] = v; p[pi] = { ...p[pi], items }; onChange({ ...draft, approach: { ...a, phases: p } }) }} />
                  <button onClick={() => { const p = [...a.phases]; const items = p[pi].items.filter((_, idx) => idx !== ii); p[pi] = { ...p[pi], items }; onChange({ ...draft, approach: { ...a, phases: p } }) }} className="text-muted-foreground hover:text-brand-red transition-colors flex-shrink-0"><Trash2 size={14} /></button>
                </div>
              ))}
              <button onClick={() => { const p = [...a.phases]; p[pi] = { ...p[pi], items: [...p[pi].items, "New item"] }; onChange({ ...draft, approach: { ...a, phases: p } }) }} className="flex items-center gap-1.5 text-xs text-brand-red font-bold tracking-wide"><Plus size={12} />Add bullet</button>
            </div>
          </Field>
        </SectionShell>
      ))}
    </div>
  )
}

function ImpactEditor({ draft, onChange }: { draft: SiteContent; onChange: (d: SiteContent) => void }) {
  const imp = draft.impact
  const set = (key: keyof typeof imp, val: string) => onChange({ ...draft, impact: { ...imp, [key]: val } })

  return (
    <div className="space-y-4">
      <SectionShell title="Section Header">
        <Field label="Eyebrow"><Input value={imp.eyebrow} onChange={(v) => set("eyebrow", v)} /></Field>
        <Field label="Heading"><Input value={imp.heading} onChange={(v) => set("heading", v)} /></Field>
        <Field label="Heading Accent (muted)"><Input value={imp.headingAccent} onChange={(v) => set("headingAccent", v)} /></Field>
      </SectionShell>
      {imp.stats.map((stat, i) => (
        <SectionShell key={i} title={`Stat ${i + 1}`}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="End Number"><input type="number" value={stat.end} onChange={(e) => { const s = [...imp.stats]; s[i] = { ...s[i], end: Number(e.target.value) }; onChange({ ...draft, impact: { ...imp, stats: s } }) }} className="w-full px-3 py-2.5 border border-border bg-background text-foreground text-sm outline-none focus:border-brand-red transition-colors" /></Field>
            <Field label="Suffix (e.g. + or K+)"><Input value={stat.suffix} onChange={(v) => { const s = [...imp.stats]; s[i] = { ...s[i], suffix: v }; onChange({ ...draft, impact: { ...imp, stats: s } }) }} /></Field>
          </div>
          <Field label="Label"><Input value={stat.label} onChange={(v) => { const s = [...imp.stats]; s[i] = { ...s[i], label: v }; onChange({ ...draft, impact: { ...imp, stats: s } }) }} /></Field>
          <Field label="Description"><Textarea value={stat.description} onChange={(v) => { const s = [...imp.stats]; s[i] = { ...s[i], description: v }; onChange({ ...draft, impact: { ...imp, stats: s } }) }} rows={2} /></Field>
        </SectionShell>
      ))}
    </div>
  )
}

function StoriesEditor({ draft, onChange }: { draft: SiteContent; onChange: (d: SiteContent) => void }) {
  const s = draft.stories

  return (
    <div className="space-y-4">
      <SectionShell title="Section Header">
        <Field label="Eyebrow"><Input value={s.eyebrow} onChange={(v) => onChange({ ...draft, stories: { ...s, eyebrow: v } })} /></Field>
        <Field label="Heading"><Input value={s.heading} onChange={(v) => onChange({ ...draft, stories: { ...s, heading: v } })} /></Field>
      </SectionShell>
      {s.items.map((story, i) => (
        <SectionShell key={i} title={`Story ${i + 1}`}>
          <Field label="Category"><Input value={story.category} onChange={(v) => { const st = [...s.items]; st[i] = { ...st[i], category: v }; onChange({ ...draft, stories: { ...s, items: st } }) }} /></Field>
          <Field label="Date"><Input value={story.date} onChange={(v) => { const st = [...s.items]; st[i] = { ...st[i], date: v }; onChange({ ...draft, stories: { ...s, items: st } }) }} /></Field>
          <Field label="Title"><Input value={story.title} onChange={(v) => { const st = [...s.items]; st[i] = { ...st[i], title: v }; onChange({ ...draft, stories: { ...s, items: st } }) }} /></Field>
          <Field label="Excerpt"><Textarea value={story.excerpt} onChange={(v) => { const st = [...s.items]; st[i] = { ...st[i], excerpt: v }; onChange({ ...draft, stories: { ...s, items: st } }) }} /></Field>
          <Field label="Link (href)"><Input value={story.href} onChange={(v) => { const st = [...s.items]; st[i] = { ...st[i], href: v }; onChange({ ...draft, stories: { ...s, items: st } }) }} /></Field>
        </SectionShell>
      ))}
    </div>
  )
}

function DonateEditor({ draft, onChange }: { draft: SiteContent; onChange: (d: SiteContent) => void }) {
  const d = draft.donate
  const set = (key: keyof typeof d, val: string) => onChange({ ...draft, donate: { ...d, [key]: val } })

  return (
    <div className="space-y-4">
      <SectionShell title="Section Header">
        <Field label="Eyebrow"><Input value={d.eyebrow} onChange={(v) => set("eyebrow", v)} /></Field>
        <Field label="Heading"><Input value={d.heading} onChange={(v) => set("heading", v)} /></Field>
        <Field label="Subtext"><Textarea value={d.subtext} onChange={(v) => set("subtext", v)} rows={2} /></Field>
        <Field label="Trust Panel Heading"><Input value={d.trustHeading} onChange={(v) => set("trustHeading", v)} /></Field>
        <Field label="Legal / Disclosure Note"><Textarea value={d.legalNote} onChange={(v) => set("legalNote", v)} rows={3} /></Field>
      </SectionShell>
      {d.tiers.map((tier, i) => (
        <SectionShell key={i} title={`Tier ${i + 1}: $${tier.amount}`}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Amount ($)"><input type="number" value={tier.amount} onChange={(e) => { const t = [...d.tiers]; t[i] = { ...t[i], amount: Number(e.target.value) }; onChange({ ...draft, donate: { ...d, tiers: t } }) }} className="w-full px-3 py-2.5 border border-border bg-background text-foreground text-sm outline-none focus:border-brand-red transition-colors" /></Field>
            <Field label="Label"><Input value={tier.label} onChange={(v) => { const t = [...d.tiers]; t[i] = { ...t[i], label: v }; onChange({ ...draft, donate: { ...d, tiers: t } }) }} /></Field>
          </div>
          <Field label="Description"><Textarea value={tier.description} onChange={(v) => { const t = [...d.tiers]; t[i] = { ...t[i], description: v }; onChange({ ...draft, donate: { ...d, tiers: t } }) }} rows={2} /></Field>
        </SectionShell>
      ))}
    </div>
  )
}

// ─── Main admin page ──────────────────────────────────────────────────────────

const TABS = ["Hero", "Approach", "Impact", "Stories", "Donate"] as const
type Tab = typeof TABS[number]

export default function AdminPage() {
  const { content, updateContent, resetContent, isDirty } = useContent()
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [draft, setDraft] = useState<SiteContent>(content)
  const [activeTab, setActiveTab] = useState<Tab>("Hero")
  const [saved, setSaved] = useState(false)

  // Check session on mount
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") setAuthed(true)
  }, [])

  // Keep draft in sync when content changes externally
  useEffect(() => {
    setDraft(content)
  }, [content])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1")
      setAuthed(true)
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }

  const handleSave = () => {
    updateContent(draft)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleReset = () => {
    if (confirm("Reset all content to defaults? This cannot be undone.")) {
      resetContent()
      setDraft(defaultContent)
    }
  }

  // ─── Login screen ─────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-brand-red flex items-center justify-center flex-shrink-0">
              <Lock size={14} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-black tracking-widest uppercase text-foreground">R3sults Admin</p>
              <p className="text-xs text-muted-foreground">Content Editor</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Field label="Admin Password">
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(false) }}
                placeholder="Enter password"
                autoFocus
                className={`w-full px-4 py-3 border text-sm outline-none bg-background text-foreground transition-colors ${passwordError ? "border-brand-red" : "border-border focus:border-brand-red"}`}
              />
              {passwordError && <p className="text-xs text-brand-red mt-1">Incorrect password.</p>}
            </Field>
            <button type="submit" className="w-full bg-brand-red text-white text-sm font-bold px-6 py-3 tracking-widest uppercase hover:bg-brand-red/90 transition-colors">
              Sign In
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <Link href="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={12} />
              Back to site
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ─── Editor ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={14} />
              Back to site
            </Link>
            <div className="w-px h-4 bg-border" />
            <p className="text-xs font-black tracking-widest uppercase text-foreground">Content Editor</p>
            {isDirty && <span className="text-xs bg-brand-red/10 text-brand-red font-bold px-2 py-0.5">Custom content active</span>}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 border border-border text-xs font-bold px-4 py-2 text-foreground hover:border-foreground transition-colors"
            >
              <Eye size={12} />
              Preview
            </Link>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 border border-border text-xs font-bold px-4 py-2 text-muted-foreground hover:text-brand-red hover:border-brand-red transition-colors"
            >
              <RotateCcw size={12} />
              Reset
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 bg-brand-red text-white text-xs font-bold px-5 py-2 tracking-wide uppercase hover:bg-brand-red/90 transition-colors"
            >
              <Save size={12} />
              {saved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto px-6 flex gap-1 overflow-x-auto pb-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-bold tracking-widest uppercase px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "border-brand-red text-brand-red"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Editor body */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-lg font-black text-foreground">{activeTab} Section</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Changes are saved to your browser. Click <strong>Save Changes</strong> to apply them to the site.
          </p>
        </div>

        {activeTab === "Hero"     && <HeroEditor     draft={draft} onChange={setDraft} />}
        {activeTab === "Approach" && <ApproachEditor draft={draft} onChange={setDraft} />}
        {activeTab === "Impact"   && <ImpactEditor   draft={draft} onChange={setDraft} />}
        {activeTab === "Stories"  && <StoriesEditor  draft={draft} onChange={setDraft} />}
        {activeTab === "Donate"   && <DonateEditor   draft={draft} onChange={setDraft} />}

        <div className="mt-8 pt-8 border-t border-border flex justify-end gap-3">
          <button onClick={handleReset} className="inline-flex items-center gap-2 border border-border text-sm font-bold px-6 py-3 text-muted-foreground hover:text-brand-red hover:border-brand-red transition-colors">
            <RotateCcw size={14} />
            Reset to Defaults
          </button>
          <button onClick={handleSave} className="inline-flex items-center gap-2 bg-brand-red text-white text-sm font-bold px-7 py-3 tracking-wide uppercase hover:bg-brand-red/90 transition-colors">
            <Save size={14} />
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}
