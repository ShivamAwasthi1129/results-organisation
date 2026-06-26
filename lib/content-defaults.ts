export type HeroContent = {
  eyebrow: string
  headline: string
  headlineAccent: string
  headlineSuffix: string
  subtext: string
  ctaPrimary: string
  ctaSecondary: string
  stats: { value: string; label: string }[]
}

export type ApproachPhase = {
  number: string
  title: string
  headline: string
  items: string[]
}

export type ApproachContent = {
  eyebrow: string
  heading: string
  statement: string
  phases: ApproachPhase[]
}

export type ImpactStat = {
  end: number
  suffix: string
  label: string
  description: string
}

export type ImpactContent = {
  eyebrow: string
  heading: string
  headingAccent: string
  stats: ImpactStat[]
}

export type Story = {
  image: string
  category: string
  date: string
  title: string
  excerpt: string
  href: string
}

export type StoriesContent = {
  eyebrow: string
  heading: string
  stories: Story[]
}

export type DonateTier = {
  amount: number
  label: string
  description: string
}

export type DonateContent = {
  eyebrow: string
  heading: string
  subtext: string
  tiers: DonateTier[]
  trustHeading: string
  legalNote: string
}

export type SiteContent = {
  hero: HeroContent
  approach: ApproachContent
  impact: ImpactContent
  stories: StoriesContent
  donate: DonateContent
}

export const defaultContent: SiteContent = {
  hero: {
    eyebrow: "Nonprofit Disaster Management",
    headline: "Prepared Before.",
    headlineAccent: "Present During.",
    headlineSuffix: "Committed After.",
    subtext:
      "We don't just respond to disasters. We prepare communities, manage response, and stay until recovery and rebuilding is complete.",
    ctaPrimary: "Donate Now",
    ctaSecondary: "Become a Partner",
    stats: [
      { value: "20+", label: "Years Experience" },
      { value: "24/7", label: "Rapid Response" },
      { value: "10+", label: "Countries Served" },
      { value: "100%", label: "Transparency" },
    ],
  },
  approach: {
    eyebrow: "Our Methodology",
    heading: "Full-Cycle Disaster Management",
    statement:
      "We stay until rebuilding is complete — not just until headlines fade.",
    phases: [
      {
        number: "01",
        title: "PREPARE",
        headline: "Prevention Saves Lives",
        items: [
          "Risk assessment & vulnerability mapping",
          "Community training programs",
          "Infrastructure readiness audits",
          "Pre-positioned resources & supply chains",
        ],
      },
      {
        number: "02",
        title: "RESPOND",
        headline: "Deployed Within Hours",
        items: [
          "On-ground disaster response teams",
          "Medical & emergency logistics",
          "Rapid deployment operations",
          "Technology-enabled coordination",
        ],
      },
      {
        number: "03",
        title: "RECOVER & REBUILD",
        headline: "We Stay Until It's Done",
        items: [
          "Long-term rehabilitation programs",
          "Housing & infrastructure restoration",
          "Economic restart initiatives",
          "Community resilience systems",
        ],
      },
    ],
  },
  impact: {
    eyebrow: "Our Impact",
    heading: "20+ Years. Thousands Helped.",
    headingAccent: "Countless Lives Impacted.",
    stats: [
      {
        end: 20,
        suffix: "+",
        label: "Years of Disaster Management Experience",
        description: "Two decades of on-the-ground expertise across multiple disaster types.",
      },
      {
        end: 50,
        suffix: "K+",
        label: "Families Assisted",
        description: "Thousands of families reached with emergency relief, shelter, and recovery support.",
      },
      {
        end: 10,
        suffix: "+",
        label: "Countries Served",
        description: "International deployments across multiple continents and disaster zones.",
      },
      {
        end: 24,
        suffix: "/7",
        label: "Rapid Response Capability",
        description: "Around-the-clock operational readiness for immediate deployment.",
      },
    ],
  },
  stories: {
    eyebrow: "Stories & Updates",
    heading: "From the Field",
    stories: [
      {
        image: "/images/story-1.jpg",
        category: "Active Deployment",
        date: "March 2026",
        title: "Flood Response Operations: Louisiana Gulf Coast",
        excerpt:
          "Our team of 40 deployed within 6 hours of the Category 3 landfall. Supply distribution reached 2,400 families in the first 72 hours.",
        href: "/stories/flood-response-louisiana-gulf-coast",
      },
      {
        image: "/images/story-2.jpg",
        category: "Recovery Progress",
        date: "February 2026",
        title: "Six Months After the Earthquake: A Community Rebuilt",
        excerpt:
          "One year into our Haiti partnership, 340 families have moved into permanent housing and the local economy is showing measurable recovery.",
        href: "/stories/six-months-after-the-earthquake",
      },
      {
        image: "/images/story-3.jpg",
        category: "Behind the Scenes",
        date: "January 2026",
        title: "How Our Logistics Network Delivers in 24 Hours",
        excerpt:
          "A look inside our pre-positioned supply network and the technology that allows us to deploy faster than any other organization in the region.",
        href: "/stories/how-our-logistics-network-delivers",
      },
    ],
  },
  donate: {
    eyebrow: "Make a Difference",
    heading: "Be the Reason Recovery Happens",
    subtext: "Every dollar is tracked, reported, and directed to communities that need it most.",
    tiers: [
      {
        amount: 50,
        label: "Emergency Relief Kit",
        description: "Provides an individual with immediate emergency supplies and clean water access.",
      },
      {
        amount: 250,
        label: "Family Survival Package",
        description: "Food, shelter materials, and hygiene supplies for a family of four for two weeks.",
      },
      {
        amount: 1000,
        label: "Temporary Shelter Support",
        description: "Funds construction of temporary shelter for a displaced family during recovery.",
      },
    ],
    trustHeading: "Our Commitment to You",
    legalNote:
      "R3sults Foundation is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the fullest extent allowed by law. We publish annual impact reports with full financial disclosure.",
  },
}
