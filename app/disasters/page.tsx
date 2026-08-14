"use client"

import { useState, useEffect } from "react"
import { PageShell } from "@/components/page-shell"
import { Calendar, MapPin, AlertTriangle, Users, ChevronRight, Activity } from "lucide-react"
import Link from "next/link"

const disasters = [
  {
    id: "venezuela-eq-2026",
    title: "Magnitude 7.5 Earthquake Strikes Venezuela",
    location: "Caracas & La Guaira, Venezuela",
    date: "June 24, 2026",
    type: "Earthquake",
    impact: "Over 6,300 casualties, 80% buildings collapsed in epicenter",
    description: "Two powerful consecutive earthquakes (magnitude 7.2 foreshock followed by a 7.5 mainshock) struck the north-central region of Venezuela. Emergency operations are currently focused on rehabilitating health facilities and supporting transitional camps.",
    imageUrls: [
      "https://www.reuters.com/resizer/v2/7KGX6NTZFVIFJPT2AOMEOB6VVA.jpg?auth=50aa8dae86feb81389efad3e8474afd83bf16d69a76cc1680d7444591c2fdbb6&width=1920&quality=80",
      "https://dims.apnews.com/dims4/default/519adbe/2147483647/strip/true/crop/5472x3648+0+0/resize/727x485!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F2d%2F49%2F5dd7ff3e16547537d28fac041d88%2F42940ff662c44406a78591ead1b03d00",
      "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i_6peVIev_Kg/v1/-1x-1.webp"
    ],
    status: "Emergency Response",
  },
  {
    id: "japan-eq-2026",
    title: "7.1 Magnitude Earthquake Off the Coast of Japan",
    location: "Fukushima Prefecture, Japan",
    date: "July 12, 2026",
    type: "Earthquake",
    impact: "Infrastructure damage, temporary power outages",
    description: "A strong earthquake hit off the eastern coast, triggering minor tsunami warnings that were later canceled. Structural assessments are ongoing as aftershocks continue to rumble through the coastal communities.",
    imageUrls: [
      "https://www.tribuneindia.com/sortd-service/imaginary/v22-01/jpg/large/high?url=dGhldHJpYnVuZS1zb3J0ZC1wcm8tcHJvZC1zb3J0ZC9tZWRpYWQ1NjYzNjIwLTU1NjgtMTFlZi05MTM0LTQ5ZWFkNjFlNTNiYS5qcGc=",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt7QUYf6KkMoZTe6w9SlfooFWXa8kYeUi2y_amtrv0Aw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGJ0oMFYA2y7qWxnqooPVOr9KWNDCKrFVO-MIWKuE4Q&s=10"
    ],
    status: "Assessment",
  },
  {
    id: "turkey-eq-2026",
    title: "Strong 7.3 Earthquake Hits Eastern Turkey",
    location: "Van Province, Turkey",
    date: "August 5, 2026",
    type: "Earthquake",
    impact: "Severe structural collapses, 1,200 displaced",
    description: "A shallow earthquake caused significant destruction in rural eastern Turkey. Harsh weather conditions are complicating rescue efforts, and international search-and-rescue teams have been mobilized.",
    imageUrls: [
      "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/72d3/live/b72d6c90-a6f1-11ed-8f65-71bfa0525ce3.jpg.webp",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVSUfcFPIKwk_K7zfDXiAdPgdK7jfaoQ7sfku6JD6ibqjPz02brGi8zXE&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-dUli63ocmbmwIeTBKCnbTjub3SRzlXmRb_xwnrtkoQ&s=10"
    ],
    status: "Active Crisis",
  },
  {
    id: "chile-eq-2026",
    title: "6.8 Magnitude Tremor in Central Chile",
    location: "Valparaiso Region, Chile",
    date: "August 10, 2026",
    type: "Earthquake",
    impact: "Minor injuries, localized landslides",
    description: "The coastal city of Valparaiso experienced severe shaking. Due to the country's strict building codes, damage was limited, but localized landslides have cut off several mountain communities.",
    imageUrls: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHyzyKNfIuzzsoc1mk4RkQlwNhiEUmVu0NdlFaiHw2UP8nz0XgAAD6epAq&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLGBsMi4kr9GzcM-IbhoZxM8BJqN-6qo_0jNPmh4Mo1bYmc6Q08ovUJ9BU&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNKkJi4MmPg2g6VUs6rXeuLJ9E9Org3CB8Csjn5dRHLBrr6Gx8iTqQWn0&s=10"
    ],
    status: "Recovery",
  },
  {
    id: "typhoon-saola-2026",
    title: "Super Typhoon Saola Devastates Coastlines",
    location: "Philippines & Taiwan",
    date: "September 2026",
    type: "Typhoon",
    impact: "2.1 million displaced, severe infrastructural damage",
    description: "Super Typhoon Saola made landfall with sustained winds of 250 km/h, causing massive storm surges and unprecedented flooding. Rescue teams are evacuating stranded residents.",
    imageUrls: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgq_D1FZBY7XjKhbD_QLHvqyCs9qI8RQJN0lscfTBMog&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfKXQCnkUvXJMijV1UVMPXm71XC83i9yw35SpM2KBDIQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQMFXrP2nwBLizLr6TcFG-CZMKemfa79Ax8xNdRxOWhw&s=10"
    ],
    status: "Relief Operations",
  },
  {
    id: "mediterranean-wildfires-2026",
    title: "Uncontrollable Mediterranean Wildfires",
    location: "Greece & Southern Italy",
    date: "August 2026",
    type: "Wildfire",
    impact: "150,000 hectares burned, mass evacuations",
    description: "Intense heatwaves exceeding 45°C (113°F) have sparked massive wildfires across the Mediterranean basin. Firefighting teams from multiple nations are deployed as thousands are evacuated.",
    imageUrls: [
      "https://picsum.photos/seed/fire1/800/500",
      "https://picsum.photos/seed/fire2/800/500",
      "https://picsum.photos/seed/fire3/800/500"
    ],
    status: "Active Crisis",
  }
]

function ImageCarousel({ images, title }: { images: string[], title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    
    // Cycle image every 4 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full h-full">
      {images.map((img, idx) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={img}
          src={img}
          alt={`${title} - image ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-1.5">
        {images.map((_, idx) => (
          <div 
            key={idx}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function DisastersPage() {
  return (
    <PageShell
      breadcrumbs={[{ label: "Global Disasters" }]}
      eyebrow="Crisis Updates"
      title="Monitoring Global Emergencies"
      subtitle="Stay informed about the latest natural disasters and humanitarian crises. We actively monitor these situations to coordinate relief efforts and deploy life-saving resources where they are needed most."
    >
      <section className="py-20 relative overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {disasters.map((disaster) => (
              <div key={disaster.id} className="group bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:border-brand-red/30 transition-all duration-300 flex flex-col">
                <div className="relative h-56 w-full overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
                  
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <div className="bg-black/60 backdrop-blur-sm border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                      {disaster.status === "Active Crisis" ? (
                        <Activity size={14} className="text-brand-red animate-pulse" />
                      ) : (
                        <AlertTriangle size={14} className="text-amber-400" />
                      )}
                      {disaster.status}
                    </div>
                  </div>
                  
                  <ImageCarousel images={disaster.imageUrls} title={disaster.title} />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span className="bg-muted px-2 py-1 rounded font-medium text-foreground">{disaster.type}</span>
                    <span className="flex items-center gap-1"><Calendar size={14} /> {disaster.date}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold leading-tight mb-3 group-hover:text-brand-red transition-colors">
                    {disaster.title}
                  </h2>
                  
                  <p className="text-muted-foreground text-sm mb-6 flex-grow line-clamp-4">
                    {disaster.description}
                  </p>
                  
                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin size={16} className="text-brand-red shrink-0 mt-0.5" />
                      <span className="font-medium text-foreground">{disaster.location}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Users size={16} className="text-brand-red shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{disaster.impact}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4">
                    <Link 
                      href="/donation" 
                      className="inline-flex w-full items-center justify-center gap-2 bg-foreground text-background hover:bg-brand-red hover:text-white text-sm font-bold px-4 py-3 rounded-md transition-colors duration-200 uppercase tracking-wide group/btn"
                    >
                      Donate Now <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
