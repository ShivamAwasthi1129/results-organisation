"use client";

import React, { useState, useMemo } from "react";
import { PageShell } from "@/components/page-shell";
import { Calendar, MapPin, AlertTriangle, Users, ChevronRight, Activity, Heart, Search } from "lucide-react";
import Link from "next/link";

const TYPE_CONFIG: Record<string, { label: string; status: string }> = {
  DISASTER_RELIEF: { label: "Disaster Relief", status: "Emergency Response" },
  FUNDRAISING: { label: "Donation Drive", status: "Active Campaign" },
  EVENT: { label: "Event", status: "Open Registration" },
  EMERGENCY: { label: "Emergency", status: "Urgent Relief" },
  EDUCATION: { label: "Education", status: "Active Program" },
  MEDICAL: { label: "Medical Aid", status: "Crisis Response" },
  COMMUNITY: { label: "Community", status: "Community Action" },
};

export default function CampaignsListClient({ initialCampaigns }: { initialCampaigns: any[] }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const filtered = useMemo(() => {
    return initialCampaigns.filter((c) => {
      const matchSearch =
        !search ||
        c.title?.toLowerCase().includes(search.toLowerCase()) ||
        c.organization?.toLowerCase().includes(search.toLowerCase()) ||
        c.location?.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "ALL" || c.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [initialCampaigns, search, typeFilter]);

  return (
    <PageShell
      breadcrumbs={[{ label: "Campaigns & Drives" }]}
      eyebrow="Active Initiatives"
      title="Support Critical Campaigns & Emergency Drives"
      subtitle="Directly support verified relief missions, community recovery, education, and medical aid around the world. Every gift provides direct, transparent impact."
    >
      <section className="py-14 md:py-10 relative overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 space-y-10">
          
          {/* Cards Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-24 rounded-2xl bg-card border border-dashed border-border p-8">
              <div className="w-14 h-14 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mx-auto mb-4 text-brand-red">
                <Heart size={24} />
              </div>
              <h3 className="text-lg font-bold text-foreground">No matching campaigns</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1">
                Try searching for a different term or selecting another cause category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((campaign) => {
                const typeCfg = TYPE_CONFIG[campaign.type] || { label: campaign.type?.replace("_", " ") || "Relief", status: "Active" };
                const primary = campaign.primaryColor || "#c00000";
                const percentage = campaign.goalAmount && campaign.raisedAmount
                  ? (campaign.raisedAmount / campaign.goalAmount) * 100
                  : 0;
                const isOverGoal = percentage > 100;
                const barWidth = Math.min(100, percentage);

                return (
                  <div
                    key={campaign.id || campaign.slug}
                    className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:border-brand-red/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Banner Image */}
                      <div className="relative h-56 w-full overflow-hidden shrink-0 bg-slate-900">
                        {campaign.bannerUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={campaign.bannerUrl}
                            alt={campaign.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div
                            className="flex flex-col items-center justify-center h-full text-white"
                            style={{ background: `linear-gradient(135deg, ${primary}99, #0f172a)` }}
                          >
                            <Heart size={40} className="text-white/40 mb-2" />
                            <span className="text-xs font-bold uppercase tracking-wider">{typeCfg.label}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                        {/* Top status overlay pill */}
                        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                          <div className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                            <Activity size={14} className="text-brand-red animate-pulse" />
                            {typeCfg.status}
                          </div>
                        </div>

                        {/* Organization tag */}
                        <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-white text-xs font-semibold">
                          <span>{campaign.organization || "R3sults"}</span>
                          <span className="bg-brand-red px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                            {typeCfg.label}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        {campaign.startDate && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar size={14} className="text-brand-red" />
                            <span>{new Date(campaign.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                          </div>
                        )}

                        <div>
                          <h2 className="text-xl font-bold leading-tight group-hover:text-brand-red transition-colors line-clamp-2">
                            {campaign.title}
                          </h2>
                          {campaign.subtitle && (
                            <p className="text-xs text-brand-red font-medium mt-1 line-clamp-1">
                              {campaign.subtitle}
                            </p>
                          )}
                        </div>

                        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                          {campaign.description || "Every registration and contribution brings us closer to delivering life-saving supplies, medical care, and recovery assistance to affected families."}
                        </p>

                        {/* Location / Stats footer */}
                        {campaign.location && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
                            <MapPin size={15} className="text-brand-red shrink-0" />
                            <span className="truncate font-medium text-foreground">{campaign.location}</span>
                          </div>
                        )}

                        {/* Goal Progress bar */}
                        {campaign.goalAmount ? (
                          <div className="space-y-1.5 pt-2">
                            <div className="flex justify-between items-baseline text-xs font-semibold">
                              <div>
                                <span className="text-sm font-black text-foreground">
                                  ${(campaign.raisedAmount || 0).toLocaleString()}
                                </span>
                                <span className="text-[10px] text-muted-foreground ml-1">
                                  raised
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] text-muted-foreground mr-1">
                                  Goal:
                                </span>
                                <span className="font-bold text-foreground">
                                  ${campaign.goalAmount.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <div className="h-2 rounded-full bg-muted overflow-hidden relative">
                              <div
                                className="h-full rounded-full bg-brand-red transition-all duration-700"
                                style={{ width: `${barWidth}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-[10px] text-muted-foreground font-medium pt-0.5">
                              <span className={isOverGoal ? "text-emerald-500 font-bold" : ""}>
                                {isOverGoal ? `+${percentage.toFixed(0)}% Funded` : `${percentage.toFixed(0)}% Completed`}
                              </span>
                              <span>
                                {isOverGoal
                                  ? `+$${((campaign.raisedAmount || 0) - campaign.goalAmount).toLocaleString()} over goal`
                                  : `$${Math.max(0, campaign.goalAmount - (campaign.raisedAmount || 0)).toLocaleString()} left`}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="pt-2 text-[10px] text-muted-foreground flex justify-between font-medium">
                            <span>Ongoing drive</span>
                            <span>Direct support</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="p-6 pt-0">
                      <Link
                        href={`/campaigns/${campaign.slug}`}
                        className="inline-flex w-full items-center justify-center gap-2 bg-foreground text-background hover:bg-brand-red hover:text-white text-xs font-bold px-4 py-3 rounded-xl transition-all duration-200 uppercase tracking-wider group/btn shadow-sm"
                      >
                        Donate to Campaign
                        <ChevronRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>
    </PageShell>
  );
}
