export interface Story {
  slug: string
  image: string
  category: string
  date: string
  title: string
  excerpt: string
  content: string[]
  stats?: { value: string; label: string }[]
  tags: string[]
}

export const stories: Story[] = [
  {
    slug: "louisiana-gulf-coast-flood-response",
    image: "/images/story-1.jpg",
    category: "Active Deployment",
    date: "March 2026",
    title: "Flood Response Operations: Louisiana Gulf Coast",
    excerpt:
      "Our team of 40 deployed within 6 hours of the Category 3 landfall. Supply distribution reached 2,400 families in the first 72 hours.",
    content: [
      "When Category 3 Hurricane Mara made landfall on the Louisiana Gulf Coast on March 4, 2026, R3sults had already pre-positioned 12 supply containers in Baton Rouge and mobilized our Gulf Response Team 36 hours in advance of impact.",
      "Within 6 hours of landfall, our first teams were on the ground conducting rapid needs assessments in the hardest-hit parishes. By hour 72, we had reached over 2,400 families with emergency supplies — clean water, food packages, hygiene kits, and temporary shelter materials.",
      "Our logistics network, built over 20 years, allowed us to bypass the supply chain delays that have historically slowed response times. Every container is GPS-tracked. Every distribution point is staffed by trained coordinators. Every family served is logged in our impact system.",
      "As of publication, operations are ongoing. We have established 6 distribution hubs across three parishes and are transitioning from immediate relief to medium-term recovery operations. Shelter assessment teams are beginning structural evaluations for the housing recovery phase.",
      "This operation represents R3sults' largest single domestic deployment since Hurricane Harvey in 2017. It also marks the first full utilization of our new technology-enabled logistics platform, which reduced distribution time by an estimated 34% compared to previous operations.",
    ],
    stats: [
      { value: "6hrs", label: "Time to first deployment" },
      { value: "2,400+", label: "Families served" },
      { value: "40", label: "Team members deployed" },
      { value: "6", label: "Distribution hubs active" },
    ],
    tags: ["Active Deployment", "Hurricane Response", "Louisiana", "United States"],
  },
  {
    slug: "haiti-earthquake-six-months-later",
    image: "/images/story-2.jpg",
    category: "Recovery Progress",
    date: "February 2026",
    title: "Six Months After the Earthquake: A Community Rebuilt",
    excerpt:
      "One year into our Haiti partnership, 340 families have moved into permanent housing and the local economy is showing measurable recovery.",
    content: [
      "Eighteen months ago, a 7.2-magnitude earthquake struck southern Haiti, displacing over 22,000 families and destroying more than 80% of permanent structures in three communes. R3sults deployed within 48 hours and has maintained continuous operations since.",
      "At the six-month mark, we shifted from emergency response — water, food, and temporary shelter — to the long-term recovery and rebuilding phase. This is where R3sults differs from most response organizations: we stay.",
      "Working alongside local construction cooperatives, our engineering teams have supervised the construction of 340 permanent, earthquake-resistant homes using locally-sourced materials and local labor. This approach creates jobs, retains money in the community, and produces higher-quality outcomes than imported prefab solutions.",
      "We have also partnered with three local NGOs to launch a micro-enterprise restart program, providing 180 small business owners with seed capital and business training to rebuild their livelihoods. Preliminary data shows 70% of participants have resumed operations at or above pre-earthquake income levels.",
      "The community preparedness infrastructure — early warning systems, trained local responders, and resilient shelter designs — will remain after R3sults transitions out. We don't just rebuild. We build better.",
    ],
    stats: [
      { value: "340", label: "Permanent homes built" },
      { value: "180", label: "Businesses restarted" },
      { value: "18mo", label: "Continuous operations" },
      { value: "70%", label: "Businesses recovering" },
    ],
    tags: ["Recovery", "Earthquake Response", "Haiti", "Caribbean"],
  },
  {
    slug: "logistics-network-24-hour-deployment",
    image: "/images/story-3.jpg",
    category: "Behind the Scenes",
    date: "January 2026",
    title: "How Our Logistics Network Delivers in 24 Hours",
    excerpt:
      "A look inside our pre-positioned supply network and the technology that allows us to deploy faster than any other organization in the region.",
    content: [
      "The most common question donors and partners ask us: how do you get there so fast? The answer is not a secret — it is a system. A system built over 20 years and refined through every deployment.",
      "R3sults maintains 8 pre-positioned supply hubs across North America, the Caribbean, and West Africa. Each hub contains a standardized inventory of emergency response supplies: water purification equipment, medical consumables, shelter materials, communications gear, and food packages — enough to serve 1,000 families for two weeks without resupply.",
      "Our logistics technology platform, launched in 2024, connects all 8 hubs in real time. When a disaster event is detected through our monitoring systems, our operations team can calculate the optimal deployment package, generate a supply manifest, assign teams, and generate transport logistics within 2 hours of activation.",
      "We also maintain a Rapid Response Agreement with four regional air freight carriers, giving us guaranteed lift capacity within 12 hours of activation. Ground transport is coordinated through a partner network of logistics companies who have pre-signed mutual aid agreements with R3sults.",
      "None of this is possible without the donors and partners who fund hub maintenance, staff training, and technology development year-round — not just during disasters. Preparedness is expensive. It is also the reason we can be first.",
    ],
    stats: [
      { value: "8", label: "Pre-positioned supply hubs" },
      { value: "2hrs", label: "Logistics calculation time" },
      { value: "12hrs", label: "Air freight activation" },
      { value: "34%", label: "Faster distribution vs prior ops" },
    ],
    tags: ["Operations", "Logistics", "Technology", "Behind the Scenes"],
  },
  {
    slug: "texas-wildfire-rapid-response",
    image: "/images/story-1.jpg",
    category: "Completed Operation",
    date: "April 2025",
    title: "Texas Wildfire: 640 Families Assisted in 45 Days",
    excerpt:
      "Fast-moving wildfires across West Texas required a different response approach. Our team adapted operations in real time as the fire line shifted daily.",
    content: [
      "Wildfire response demands different tactics than flood or earthquake response. The hazard moves. Evacuation patterns are unpredictable. The affected area can change from hour to hour. When the West Texas Wildfire Complex ignited in April 2025, our teams adapted.",
      "We established three mobile response bases rather than fixed distribution hubs — allowing us to reposition as the fire line moved. This decision, made by our field operations director within the first six hours, ultimately allowed us to stay ahead of the disaster rather than chasing it.",
      "Over 45 days of operations, our teams served 640 families, including 280 with agricultural operations who faced catastrophic livestock and equipment losses. We partnered with the Texas Farm Bureau to provide targeted agricultural recovery support that went beyond standard humanitarian response.",
      "We completed operations in June 2025 with a full transition to local recovery agencies, comprehensive after-action documentation, and an updated wildfire response protocol that will inform all future R3sults wildfire deployments.",
    ],
    stats: [
      { value: "640", label: "Families served" },
      { value: "45", label: "Days of operations" },
      { value: "3", label: "Mobile response bases" },
      { value: "280", label: "Agricultural households assisted" },
    ],
    tags: ["Completed", "Wildfire Response", "Texas", "United States"],
  },
]

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug)
}

export function getAllStorySlugs(): string[] {
  return stories.map((s) => s.slug)
}
