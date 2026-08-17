export type HeroContent = {
  eyebrow: string
  headline: string
  headlineAccent: string
  headlineSuffix: string
  subtext: string
  ctaPrimary: string
  ctaSecondary: string
  stats: { value: string; label: string }[]
  heroImage?: string
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
  backgroundImage?: string
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
  items: Story[]
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

export type NewsLeadStory = {
  category: string
  source: string
  date: string
  readTime: string
  title: string
  excerpt: string
  tags: string[]
  href: string
}

export type NewsSideStory = {
  category: string
  source: string
  date: string
  title: string
  excerpt: string
  href: string
}

export type NewsWireItem = {
  time: string
  headline: string
  source: string
}

export type NewsContent = {
  eyebrow: string
  heading: string
  subtext: string
  leadStory: NewsLeadStory
  sideStories: NewsSideStory[]
  wireItems: NewsWireItem[]
}

export type VolunteerRoleCard = {
  eyebrow: string
  heading: string
  subtext: string
  roles: string[]
  ctaText: string
  ctaLink: string
}

export type VolunteerContent = {
  partnerCard: VolunteerRoleCard
  volunteerCard: VolunteerRoleCard
}

export type OperationPillar = {
  number: string
  title: string
  body: string
}

export type OperationsContent = {
  eyebrow: string
  heading: string
  headingAccent: string
  subtext: string
  pillars: OperationPillar[]
  positioning: {
    eyebrow: string
    heading: string
    headingAccent: string
    points: string[]
  }
}

export type Testimonial = {
  name: string
  role: string
  type: string
  image: string
  quote: string
  location: string
}

export type TestimonialsContent = {
  eyebrow: string
  heading: string
  items: Testimonial[]
}

export type SiteContent = {
  hero: HeroContent
  approach: ApproachContent
  impact: ImpactContent
  stories: StoriesContent
  donate: DonateContent
  news: NewsContent
  volunteer: VolunteerContent
  operations: OperationsContent
  testimonials: TestimonialsContent
}

export const defaultContent: SiteContent = {
  "hero": {
      "stats": [{
          "label": "Years Experience",
          "value": "20+"
      }, {
          "label": "Rapid Response",
          "value": "24/7"
      }, {
          "label": "Countries Served",
          "value": "10+"
      }, {
          "label": "Transparency",
          "value": "100%"
      }],
      "eyebrow": "Nonprofit Disaster Management",
      "subtext": "We don't just respond to disasters. We prepare communities, manage response, and stay until recovery and rebuilding is complete.",
      "headline": "Prepared Before.",
      "heroImage": "/images/hero-main.jpg",
      "ctaPrimary": "Donate Now",
      "ctaSecondary": "Become a Partner",
      "headlineAccent": "Present During.",
      "headlineSuffix": "Committed After."
  },
  "news": {
      "eyebrow": "News & Media",
      "heading": "Disaster Intelligence",
      "subtext": "Real-time coverage of global disasters, emergency response operations, and humanitarian developments.",
      "leadStory": {
          "date": "March 1, 2026",
          "href": "/stories",
          "tags": ["Southeast Asia", "Flooding", "Displacement", "UN Response"],
          "title": "Catastrophic Flooding Displaces 1.2 Million Across Southeast Asia",
          "source": "Reuters",
          "excerpt": "Record monsoon rainfall has caused catastrophic flooding across Vietnam, Thailand, and Myanmar. The United Nations estimates 1.2 million people have been displaced, with hundreds of communities cut off from emergency services.",
          "category": "Breaking",
          "readTime": "4 min read"
      },
      "wireItems": [{
          "time": "2h ago",
          "source": "FEMA",
          "headline": "FEMA activates Emergency Operations Center for Gulf Coast flooding"
      }, {
          "time": "4h ago",
          "source": "WHO",
          "headline": "WHO reports cholera risk rising in post-earthquake Haiti camps"
      }, {
          "time": "6h ago",
          "source": "Red Cross",
          "headline": "Red Cross deploys 200 volunteers to Tennessee tornado zone"
      }, {
          "time": "9h ago",
          "source": "Reuters",
          "headline": "Pakistan declares national emergency as glacial lake outburst flood spreads"
      }, {
          "time": "12h ago",
          "source": "ABC Australia",
          "headline": "Australian bushfire season declared 'worst in a decade' by meteorologists"
      }, {
          "time": "14h ago",
          "source": "UN News",
          "headline": "UN Security Council calls emergency session on Sudan humanitarian crisis"
      }],
      "sideStories": [{
          "date": "Feb 28, 2026",
          "href": "/stories",
          "title": "California Wildfires Force Mass Evacuations in Three Counties",
          "source": "AP News",
          "excerpt": "Fast-moving wildfires driven by Santa Ana winds have prompted mandatory evacuations across 85,000 residents in Ventura, San Bernardino, and Riverside counties.",
          "category": "Wildfire"
      }, {
          "date": "Feb 27, 2026",
          "href": "/stories",
          "title": "7.4 Magnitude Earthquake Strikes Off Japan's Pacific Coast",
          "source": "BBC",
          "excerpt": "A powerful 7.4 magnitude earthquake struck 120km off the Tohoku coast. Tsunami warnings have been issued for low-lying coastal areas.",
          "category": "Earthquake"
      }, {
          "date": "Feb 25, 2026",
          "href": "/stories",
          "title": "Caribbean Braces as Category 4 Storm Approaches Lesser Antilles",
          "source": "CNN",
          "excerpt": "Authorities in Dominica, St. Lucia, and Martinique have issued mandatory evacuation orders as the storm intensifies to Category 4 with 145 mph winds.",
          "category": "Hurricane"
      }]
  },
  "donate": {
      "tiers": [{
          "label": "Emergency Relief Kit",
          "amount": 50,
          "description": "Provides an individual with immediate emergency supplies and clean water access."
      }, {
          "label": "Family Survival Package",
          "amount": 250,
          "description": "Food, shelter materials, and hygiene supplies for a family of four for two weeks."
      }, {
          "label": "Temporary Shelter Support",
          "amount": 1000,
          "description": "Funds construction of temporary shelter for a displaced family during recovery."
      }],
      "campaigns": [
        {
          "id": "CAM-001",
          "name": "Standard Contribution",
          "location": "Global",
          "date": "Ongoing",
          "tiers": [
            { "amount": 50, "label": "General Relief", "description": "Supports day-to-day operations and general preparedness." },
            { "amount": 100, "label": "Community Aid", "description": "Fund community-led programs and resources." },
            { "amount": 250, "label": "Sustaining Gift", "description": "Provides ongoing support for our operational capabilities." }
          ]
        },
        {
          "id": "CAM-002",
          "name": "Venezuela Earthquake Relief",
          "location": "Caracas, Venezuela",
          "date": "June 24, 2026",
          "tiers": [
            { "amount": 50, "label": "Emergency Food & Water", "description": "Provides immediate clean water and ration packs for a displaced family." },
            { "amount": 100, "label": "Medical Supplies Kit", "description": "Funds essential medical supplies and first-aid kits for disaster response." },
            { "amount": 250, "label": "Temporary Shelter Tent", "description": "Supplies a family-sized temporary thermal shelter for those left homeless." }
          ]
        },
        {
          "id": "CAM-003",
          "name": "Japan Earthquake Relief",
          "location": "Fukushima, Japan",
          "date": "July 12, 2026",
          "tiers": [
            { "amount": 50, "label": "Hygiene & Sanitation Kit", "description": "Supplies hygiene products and sanitizing items for evacuation centers." },
            { "amount": 100, "label": "Warm Blankets & Apparel", "description": "Provides thermal blankets and cold-weather clothing for survivors." },
            { "amount": 250, "label": "Rescue Team Support", "description": "Funds search-and-rescue teams and structural inspection gear." }
          ]
        },
        {
          "id": "CAM-004",
          "name": "Turkey Earthquake Relief",
          "location": "Van Province, Turkey",
          "date": "August 5, 2026",
          "tiers": [
            { "amount": 50, "label": "Warm Meals Distribution", "description": "Funds hot meals for families in temporary refugee settlements." },
            { "amount": 100, "label": "Clean Water Station", "description": "Helps set up temporary clean water distribution points." },
            { "amount": 250, "label": "Thermal Heating Unit", "description": "Supplies heating equipment to keep families safe in freezing winter temperatures." }
          ]
        },
        {
          "id": "CAM-005",
          "name": "Chile Earthquake Relief",
          "location": "Valparaiso, Chile",
          "date": "August 10, 2026",
          "tiers": [
            { "amount": 50, "label": "First Aid & Triage Support", "description": "Provides medical kits for triage centers." },
            { "amount": 100, "label": "Baby & Toddler Support", "description": "Funds baby formula, diapers, and nutrition packs." },
            { "amount": 250, "label": "Debris & Emergency Tool Kit", "description": "Provides shovels, helmets, and tools for clear-up teams." }
          ]
        },
        {
          "id": "CAM-006",
          "name": "Colombia Earthquake Relief 2026",
          "location": "Bogota, Colombia",
          "date": "March 14, 2026",
          "tiers": [
            { "amount": 50, "label": "Survival Food Package", "description": "Supplies high-nutrition dry food rations for a family." },
            { "amount": 100, "label": "First Response Medication", description: "Funds antibiotics, bandages, and critical medication." },
            { "amount": 250, "label": "Rebuilding Supplies", description: "Contributes to building materials for homes destroyed by structural failure." }
          ]
        },
        {
          "id": "CAM-007",
          "name": "Typhoon Saola Relief",
          "location": "Philippines & Taiwan",
          "date": "September 2026",
          "tiers": [
            { "amount": 50, "label": "Flashlights & Emergency Batteries", description: "Supplies lighting and power sources to storm victims." },
            { "amount": 100, "label": "Waterproof Tarp & Rope", description: "Provides immediate protection for homes with damaged roofs." },
            { "amount": 250, "label": "Water Purification Systems", description: "Funds high-volume portable filtration systems." }
          ]
        },
        {
          "id": "CAM-008",
          "name": "Mediterranean Wildfires Relief",
          "location": "Greece & Italy",
          "date": "August 2026",
          "tiers": [
            { "amount": 50, "label": "Respiratory Protection Gear", description: "Supplies protective smoke masks and filters." },
            { "amount": 100, "label": "Wildlife Rescue & Rehab", description: "Funds treatment for animals affected by forest fires." },
            { "amount": 250, "label": "Firefighter Support Kit", description: "Provides cooling equipment and hydration for volunteer responders." }
          ]
        },
        {
          "id": "CAM-009",
          "name": "Hawaii Storms (Hurricane Lala) Relief",
          "location": "Big Island, Hawaii",
          "date": "August 15, 2026",
          "tiers": [
            { "amount": 50, "label": "Emergency Food & Water", "description": "Provides immediate clean water and nutrition rations for families affected by Hurricane Lala." },
            { "amount": 100, "label": "Flood Debris Removal", description: "Funds local clean-up crews and tools to clear roads and homes of landslide debris." },
            { "amount": 250, "label": "Emergency Shelter Repair", description: "Provides emergency tarps, tools, and temporary shelter materials for damaged homes." }
          ]
        },
        {
          "id": "CAM-010",
          "name": "Indiana Flooding Relief",
          "location": "Indianapolis & Surrounding Counties, Indiana",
          "date": "August 11, 2026",
          "tiers": [
            { "amount": 50, "label": "Clean-up & Sanitation Supplies", description: "Provides disinfectant kits, gloves, and boots for families cleaning flooded homes." },
            { "amount": 100, "label": "First Responder Rescue Support", description: "Supports local emergency search-and-rescue teams and boat deployment." },
            { "amount": 250, "label": "Disaster Assistance & Recovery", description: "Funds basic household essentials and emergency financial aid for displaced residents." }
          ]
        },
        {
          "id": "CAM-011",
          "name": "Spokane Wildfires Relief",
          "location": "Spokane County, Washington",
          "date": "August 1, 2026",
          "tiers": [
            { "amount": 50, "label": "Respiratory & N95 Masks", description: "Supplies high-efficiency N95 masks to communities impacted by dense wildfire smoke." },
            { "amount": 100, "label": "Evacuee Support Kits", description: "Provides hygiene products, blankets, and essential needs for residents in temporary shelters." },
            { "amount": 250, "label": "Home Rebuilding Assistance", description: "Contributes to building supplies and long-term recovery efforts for lost structures." }
          ]
        }
      ],
      "eyebrow": "Make a Difference",
      "heading": "Be the Reason Recovery Happens",
      "subtext": "Every dollar is tracked, reported, and directed to communities that need it most.",
      "legalNote": "R3sults Foundation is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the fullest extent allowed by law. We publish annual impact reports with full financial disclosure.",
      "trustHeading": "Our Commitment to You"
  },
  "impact": {
      "stats": [{
          "end": 20,
          "label": "Years of Disaster Management Experience",
          "suffix": "+",
          "description": "Two decades of on-the-ground expertise across multiple disaster types."
      }, {
          "end": 50,
          "label": "Families Assisted",
          "suffix": "K+",
          "description": "Thousands of families reached with emergency relief, shelter, and recovery support."
      }, {
          "end": 10,
          "label": "Countries Served",
          "suffix": "+",
          "description": "International deployments across multiple continents and disaster zones."
      }, {
          "end": 24,
          "label": "Rapid Response Capability",
          "suffix": "/7",
          "description": "Around-the-clock operational readiness for immediate deployment."
      }],
      "eyebrow": "Our Impact",
      "heading": "20+ Years. Thousands Helped.",
      "headingAccent": "Countless Lives Impacted."
  },
  "stories": {
      "items": [{
          "date": "March 2026",
          "href": "/stories/flood-response-louisiana-gulf-coast",
          "image": "/images/story-1.jpg",
          "title": "Flood Response Operations: Louisiana Gulf Coast",
          "excerpt": "Our team of 40 deployed within 6 hours of the Category 3 landfall. Supply distribution reached 2,400 families in the first 72 hours.",
          "category": "Active Deployment"
      }, {
          "date": "February 2026",
          "href": "/stories/six-months-after-the-earthquake",
          "image": "/images/story-2.jpg",
          "title": "Six Months After the Earthquake: A Community Rebuilt",
          "excerpt": "One year into our Haiti partnership, 340 families have moved into permanent housing and the local economy is showing measurable recovery.",
          "category": "Recovery Progress"
      }, {
          "date": "January 2026",
          "href": "/stories/how-our-logistics-network-delivers",
          "image": "/images/story-3.jpg",
          "title": "How Our Logistics Network Delivers in 24 Hours",
          "excerpt": "A look inside our pre-positioned supply network and the technology that allows us to deploy faster than any other organization in the region.",
          "category": "Behind the Scenes"
      }],
      "eyebrow": "Stories & Updates",
      "heading": "From the Field"
  },
  "approach": {
      "phases": [{
          "items": ["Risk assessment & vulnerability mapping", "Community training programs", "Infrastructure readiness audits", "Pre-positioned resources & supply chains"],
          "title": "PREPARE",
          "number": "01",
          "headline": "Prevention Saves Lives"
      }, {
          "items": ["On-ground disaster response teams", "Medical & emergency logistics", "Rapid deployment operations", "Technology-enabled coordination"],
          "title": "RESPOND",
          "number": "02",
          "headline": "Deployed Within Hours"
      }, {
          "items": ["Long-term rehabilitation programs", "Housing & infrastructure restoration", "Economic restart initiatives", "Community resilience systems"],
          "title": "RECOVER & REBUILD",
          "number": "03",
          "headline": "We Stay Until It's Done"
      }],
      "eyebrow": "Our Methodology",
      "heading": "Full-Cycle Disaster Management",
      "statement": "We stay until rebuilding is complete — not just until headlines fade.",
      "backgroundImage": "/images/approach-bg.jpg"
  },
  "volunteer": {
      "partnerCard": {
          "roles": ["Corporate Matching Programs", "Resource & Equipment Donations", "Technology Partnerships", "Media & Communications"],
          "ctaLink": "/partner",
          "ctaText": "Partner With Us",
          "eyebrow": "Partnership",
          "heading": "Become a Partner",
          "subtext": "Corporate and institutional partners bring resources, networks, and expertise that multiply our impact. Join a coalition of organizations committed to real results."
      },
      "volunteerCard": {
          "roles": ["Field Response Teams", "Logistics & Supply Chain", "Medical Support", "Community Training"],
          "ctaLink": "/volunteer",
          "ctaText": "Apply to Volunteer",
          "eyebrow": "Get Involved",
          "heading": "Volunteer With Us",
          "subtext": "We need skilled professionals — logistics coordinators, medical personnel, engineers, communications specialists, and community liaisons. Your skills can save lives."
      }
  },
  "operations": {
      "eyebrow": "How We Operate",
      "heading": "Efficient. Transparent.",
      "pillars": [{
          "body": "Our lean structure is powered by committed volunteers with professional expertise, keeping overhead minimal and impact maximal.",
          "title": "Volunteer-Driven Operations",
          "number": "01"
      }, {
          "body": "Years of partnerships translate into discounted procurement agreements and pre-positioned resources ready for immediate deployment.",
          "title": "Deep Supplier Network",
          "number": "02"
      }, {
          "body": "Real-time logistics, GPS asset tracking, and data-driven resource allocation ensure nothing falls through the cracks.",
          "title": "Technology-Driven Coordination",
          "number": "03"
      }, {
          "body": "We operate lean so more of every donated dollar reaches the communities and families who need it most.",
          "title": "Low Overhead Model",
          "number": "04"
      }, {
          "body": "Funds flow directly to affected communities — no excessive administrative layers between your donation and real impact.",
          "title": "Direct Resource Allocation",
          "number": "05"
      }, {
          "body": "Comprehensive impact reports, audited financials, and real-time deployment updates keep donors informed and accountable.",
          "title": "Full Transparency & Reporting",
          "number": "06"
      }],
      "subtext": "We are operationally disciplined — not just emotionally driven. Every system, every process, every partnership is designed to maximize impact for those we serve.",
      "positioning": {
          "points": ["A preparedness-first organization", "A long-term recovery partner", "A 20+ year experienced response team", "A systems-driven humanitarian operation"],
          "eyebrow": "Our Positioning",
          "heading": "This is not just a charity. This is a",
          "headingAccent": "disaster management authority."
      },
      "headingAccent": "Resource-Optimized."
  },
  "testimonials": {
      "items": [{
          "name": "Maria Gonzalez",
          "role": "Survivor",
          "type": "survivor",
          "image": "/images/testimonial-1.jpg",
          "quote": "When the floodwaters rose, R3sults was the first team on the ground. They didn't just hand out supplies and leave — they stayed with our community for months until we were truly back on our feet.",
          "location": "Houston, TX"
      }, {
          "name": "James Okafor",
          "role": "Volunteer Field Coordinator",
          "type": "volunteer",
          "image": "/images/testimonial-2.jpg",
          "quote": "I've worked with many disaster response organizations. R3sults operates with a discipline and efficiency I've never seen elsewhere. The systems in place mean nothing falls through the cracks when it matters most.",
          "location": "Lagos, Nigeria"
      }, {
          "name": "David Chen",
          "role": "Partner, Global Aid Alliance",
          "type": "partner",
          "image": "/images/testimonial-3.jpg",
          "quote": "We partner with R3sults because of one simple reason: they deliver results. Their transparency, accountability, and operational precision make them the most trusted partner in the space.",
          "location": "New York, NY"
      }],
      "eyebrow": "Voices from the Field",
      "heading": "Real Stories. Real Impact."
  }
}
