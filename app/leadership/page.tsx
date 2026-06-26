import { PageShell } from "@/components/page-shell"
import Image from "next/image"
import Link from "next/link"
import { Linkedin } from "lucide-react"

const leaders = [
  {
    name: "KT Catlin",
    title: "CEO & Co-Founder",
    expertise: "Non-Profit & Fundraising — Strategy & Scaling",
    bio: "Katherine \"K.T.\" Catlin is a highly accomplished sales and marketing executive in the real estate and home building industries, with decades of experience driving revenue growth, market penetration, and strategic initiatives. Since 2018, as owner of KT Consulting & Associates LLC in Palm Beach, Florida, she offers specialized marketing strategies, consultations, and team-building solutions for housing professionals and property owners. From 2013 to 2023, K.T. served as Executive Officer for multiple Local Builders Associations, managing daily operations, educational programs, advocacy, budgeting, and fundraising. Earlier in her career (1989–2017), she held senior leadership roles—including Director of Sales & Marketing, Sales Manager, Regional New Homes Director, and Licensed Real Estate Broker—at major firms such as Weichert Realtors, Coldwell Banker, Century 21, and RE/MAX. K.T. has consistently earned top industry recognition, including Sales Director of the Year, Associate of the Year, and induction into the NJBA Associate Hall of Fame. A dedicated leader, she holds prestigious certifications: GRI, CSP, CMP, and CLHMS. Civically engaged, K.T. is a member of the Town of Palm Beach Architectural Review Commission and a United Way volunteer. She earned a B.A. in Fine Arts from Fairleigh Dickinson University and brings strategic vision, strong leadership, and deep industry expertise to deliver exceptional results at R3sults Foundation.",
    image: "/images/leader-kt-catlin.jpg",
    objectPosition: "center 20%",
    linkedin: "#",
    featured: true,
  },
  {
    name: "Herbert V. Tremble II",
    title: "Chairman",
    expertise: "Disaster Relief Expert",
    bio: "A seasoned disaster-relief and construction expert with decades of experience across the U.S. and the Caribbean. An FAA-trained operator and successful multimillion-dollar entrepreneur, Herbert brings deep operational and on-ground response expertise to large-scale disasters.",
    image: "/images/leader-herbert-tremble.jpg",
    objectPosition: "center 15%",
    linkedin: "#",
    featured: false,
  },
  {
    name: "S. Robert August",
    title: "Vice President, Fundraising",
    expertise: "Marketing, Operations & Fundraising",
    bio: "Nationally and globally accomplished, acclaimed, and awarded 50+ year marketing, management, fundraising, and sales executive professional, specializing in new and existing real estate development and construction. He has a successful history of disaster relief preparedness and recovery.",
    image: "/images/leader-robert-august.jpg",
    objectPosition: "center 10%",
    linkedin: "#",
    featured: false,
  },
  {
    name: "Ajay Verma",
    title: "Chief Technology Advisor",
    expertise: "Technology, Engineering & Product",
    bio: "An accomplished tech leader with 24 years of international experience in tech, AI, operations, marketing and business strategy. Engineering graduate from IIT, MBA from Harvard University. Lived and worked across 4 countries, bringing a global perspective to disaster tech innovation.",
    image: "/images/leader-ajay-verma.jpg",
    objectPosition: "center 15%",
    linkedin: "#",
    featured: false,
  },
  {
    name: "Sam Yates",
    title: "Head of Media & PR",
    expertise: "Media Coverage & Spokesperson",
    bio: "A veteran communicator who has shaped public perception across industries. Sam leads R3sults' media presence, amplifying our mission and ensuring our work reaches the communities, partners, and supporters who need to hear it most.",
    image: "/images/leader-sam-yates.jpg",
    objectPosition: "center 20%",
    linkedin: "#",
    featured: false,
  },
]

const boardMembers = [
  "To Be Announced",
]

export default function LeadershipPage() {
  return (
    <PageShell
      breadcrumbs={[{ label: "About", href: "/about" }, { label: "Leadership Team" }]}
      eyebrow="Our People"
      title="Leadership Team"
      subtitle="Experienced operators, respected practitioners, and mission-driven leaders — our team brings decades of combined field experience across the full spectrum of disaster management."
    >
      {/* Leadership grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Featured CEO row */}
        <div className="border border-border mb-px">
          {leaders.filter((l) => l.featured).map((leader) => (
            <div key={leader.name} className="bg-background hover:bg-brand-surface transition-colors duration-300 group">
              <div className="flex flex-col md:flex-row">
                {/* Image — portrait aspect ratio 3:4 */}
                <div className="relative w-full md:w-80 aspect-[3/4] flex-shrink-0 overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    style={{ objectPosition: leader.objectPosition ?? "center 20%" }}
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/60 hidden md:block" />
                </div>
                {/* Text — full height on desktop */}
                <div className="p-8 md:p-12 flex flex-col justify-center md:justify-start flex-1">
                  <div className="inline-flex items-center gap-2 mb-4 w-fit">
                    <div className="w-6 h-0.5 bg-brand-red" />
                    <span className="text-xs font-bold tracking-widest uppercase text-brand-red">Founding Leadership</span>
                  </div>
                  <h2 className="text-4xl md:text-3xl font-black text-foreground leading-tight mb-2">{leader.name}</h2>
                  <p className="text-sm text-brand-red font-bold tracking-wide mb-2">{leader.title}</p>
                  <p className="text-xs text-brand-muted-text tracking-widest uppercase mb-6">{leader.expertise}</p>
                  <p className="text-brand-muted-text leading-relaxed mb-8 text-sm">{leader.bio}</p>
                  <Link
                    href={leader.linkedin}
                    aria-label={`${leader.name} on LinkedIn`}
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-brand-muted-text hover:text-brand-red transition-colors self-start"
                  >
                    <Linkedin size={14} />
                    LinkedIn Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Remaining leaders grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {leaders.filter((l) => !l.featured).map((leader) => (
            <div key={leader.name} className="bg-background p-8 hover:bg-brand-surface transition-colors duration-300 group">
              <div className="flex items-start gap-4 mb-5">
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border border-border">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    style={{ objectPosition: leader.objectPosition ?? "center 15%" }}
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-black text-foreground leading-tight">{leader.name}</h3>
                      <p className="text-xs text-brand-red font-bold tracking-wide mt-0.5">{leader.title}</p>
                      <p className="text-[10px] text-brand-muted-text tracking-wider uppercase mt-0.5">{leader.expertise}</p>
                    </div>
                    <Link
                      href={leader.linkedin}
                      aria-label={`${leader.name} on LinkedIn`}
                      className="text-brand-muted-text hover:text-brand-red transition-colors flex-shrink-0"
                    >
                      <Linkedin size={16} />
                    </Link>
                  </div>
                </div>
              </div>
              <p className="text-sm text-brand-muted-text leading-relaxed">{leader.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Board of Directors */}
      <section className="bg-brand-surface border-t border-border py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-brand-red" />
            <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">Governance</span>
          </div>
          <h2 className="text-3xl font-black text-foreground mb-4 text-balance">Board of Directors</h2>
          <p className="text-brand-muted-text text-sm mb-12 max-w-xl">
            Our Board provides strategic oversight and accountability. Additional board members are in the process of being announced.
          </p>
          <div className="border border-border border-dashed p-8 flex items-center gap-5 max-w-md">
            <div className="w-10 h-10 border border-border flex items-center justify-center flex-shrink-0">
              <div className="w-3 h-3 border-2 border-brand-muted-text/40 rounded-full" />
            </div>
            <div>
              <p className="text-sm font-black text-foreground mb-0.5">Board Members — To Be Announced</p>
              <p className="text-xs text-brand-muted-text">Additional appointments will be shared here as confirmed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join the team CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="border border-border p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black text-foreground mb-2">Interested in joining R3sults?</h3>
            <p className="text-brand-muted-text text-sm">We recruit skilled professionals in logistics, medical, engineering, and communications.</p>
          </div>
          <Link
            href="/volunteer"
            className="inline-flex items-center gap-2 bg-brand-red text-primary-foreground text-sm font-bold px-7 py-3.5 tracking-widest uppercase hover:bg-brand-red/90 transition-all duration-200 flex-shrink-0"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </PageShell>
  )
}
