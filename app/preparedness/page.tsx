import { PageShell } from "@/components/page-shell"
import { AlertTriangle, Home, Droplets, Radio, Heart, Car } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    icon: Home,
    title: "Home Preparedness",
    color: "text-brand-red",
    items: [
      "Assemble a 72-hour emergency kit with food, water, and medications",
      "Know your home's utility shutoffs (gas, water, electric)",
      "Create a household communication plan with out-of-area contacts",
      "Identify two exit routes from every room in your home",
      "Keep important documents in a waterproof, portable container",
      "Store at least one gallon of water per person per day for 3 days",
    ],
  },
  {
    icon: Droplets,
    title: "Flood Preparedness",
    color: "text-brand-red",
    items: [
      "Know your flood zone classification (FEMA Flood Map Service)",
      "Never drive through flooded roads — turn around, don't drown",
      "Move valuables and documents to upper floors before storms",
      "Consider flood insurance even if not in a high-risk zone",
      "Identify community shelters and know evacuation routes",
      "Disconnect electrical equipment if flooding is imminent",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Earthquake Preparedness",
    color: "text-brand-red",
    items: [
      "Secure heavy furniture and appliances to walls",
      "Know Drop, Cover, and Hold On — practice it with your household",
      "Identify safe spots in each room away from windows and heavy items",
      "Store shoes near your bed in case of broken glass",
      "Keep a flashlight and shoes under your bed",
      "Know how to shut off your gas supply after an earthquake",
    ],
  },
  {
    icon: Radio,
    title: "Communications & Alerts",
    color: "text-brand-red",
    items: [
      "Register for your local emergency alert system (text/email alerts)",
      "Keep a battery-powered or hand-crank weather radio",
      "Program NOAA Weather Radio (162.400–162.550 MHz) in your area",
      "Designate an out-of-state family contact as your communication hub",
      "Download your local emergency management app",
      "Know the difference between Watch, Warning, and Advisory",
    ],
  },
  {
    icon: Heart,
    title: "Medical & First Aid",
    color: "text-brand-red",
    items: [
      "Keep a stocked first aid kit at home and in your vehicle",
      "Know basic CPR and first aid — take a certified course",
      "Maintain a 30-day supply of essential prescription medications",
      "Know the location of the nearest emergency room and urgent care",
      "Keep medical records and insurance cards in your emergency kit",
      "Consider training as a Community Emergency Response Team (CERT) member",
    ],
  },
  {
    icon: Car,
    title: "Evacuation Planning",
    color: "text-brand-red",
    items: [
      "Have a paper map — GPS may fail during disasters",
      "Identify two evacuation routes from your neighborhood",
      "Pre-identify pet-friendly shelters if you have animals",
      "Keep your vehicle's gas tank at least half full during storm season",
      "Prepare a go-bag ready to grab in under 5 minutes",
      "Practice your evacuation route with all household members annually",
    ],
  },
]

const downloads = [
  { title: "72-Hour Emergency Checklist", format: "PDF", pages: "2 pages", href: "#" },
  { title: "Household Emergency Plan Template", format: "PDF", pages: "4 pages", href: "#" },
  { title: "Emergency Supply Inventory Sheet", format: "PDF", pages: "2 pages", href: "#" },
  { title: "Child & Pet Emergency Card", format: "PDF", pages: "1 page", href: "#" },
]

export default function PreparednessPage() {
  return (
    <PageShell
      breadcrumbs={[{ label: "Disaster Preparedness" }]}
      eyebrow="Be Ready Before"
      title="Disaster Preparedness Guide"
      subtitle="Preparedness is R3sults' first principle. Communities that prepare experience dramatically fewer deaths, injuries, and recovery times. Use these resources to get your household ready."
    >
      {/* Categories grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-b border-border">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {categories.map((cat) => (
            <div key={cat.title} className="bg-background p-8 hover:bg-brand-surface transition-colors duration-300">
              <div className="flex items-center gap-3 mb-6">
                <cat.icon size={20} className={cat.color} />
                <h2 className="font-black text-foreground">{cat.title}</h2>
              </div>
              <ul className="space-y-3">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brand-muted-text leading-relaxed">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${cat.color.replace("text-", "bg-")}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Downloads */}
      <section className="bg-brand-surface border-b border-border py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-brand-red" />
            <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">Free Resources</span>
          </div>
          <h2 className="text-3xl font-black text-foreground mb-12 text-balance">Download Preparedness Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {downloads.map((doc) => (
              <a
                key={doc.title}
                href={doc.href}
                className="border border-border bg-background p-6 hover:border-brand-red/40 hover:bg-brand-surface transition-all duration-200 group block"
              >
                <div className="text-xs font-black tracking-widest uppercase text-brand-red border border-brand-red/30 px-2 py-0.5 inline-block mb-4">
                  {doc.format}
                </div>
                <h3 className="font-black text-foreground text-sm leading-tight mb-2 group-hover:text-brand-red transition-colors">
                  {doc.title}
                </h3>
                <p className="text-xs text-brand-muted-text">{doc.pages}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Training CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          <div className="bg-background p-10">
            <h3 className="text-xl font-black text-foreground mb-3 text-balance">Community Preparedness Training</h3>
            <p className="text-brand-muted-text text-sm leading-relaxed mb-6">
              R3sults offers certified community preparedness training programs for neighborhoods, schools,
              faith communities, and employers. Our trainers are all field-experienced responders.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-foreground text-foreground text-sm font-bold px-6 py-3 tracking-widest uppercase hover:bg-foreground hover:text-background transition-all duration-200"
            >
              Request Training
            </Link>
          </div>
          <div className="bg-brand-surface p-10">
            <h3 className="text-xl font-black text-foreground mb-3 text-balance">Official Government Resources</h3>
            <p className="text-brand-muted-text text-sm leading-relaxed mb-6">
              For official emergency management guidance, visit Ready.gov (US), your local emergency
              management agency, or the FEMA website.
            </p>
            <a
              href="https://www.ready.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border text-foreground text-sm font-bold px-6 py-3 tracking-widest uppercase hover:border-foreground transition-colors duration-200"
            >
              Visit Ready.gov
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
