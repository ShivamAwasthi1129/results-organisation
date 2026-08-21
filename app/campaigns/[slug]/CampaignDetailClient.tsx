"use client";

import React, { useState, useEffect, useRef } from "react";
import { PageShell } from "@/components/page-shell";
import {
  Calendar, MapPin, Users, ChevronRight, Activity,
  ShieldCheck, BarChart3, RefreshCw, Heart, ArrowRight,
  QrCode, Copy, Lock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import QRCode from "qrcode";

const DOMAIN = "https://www.r3sults.org";

interface DonationTier {
  id: string;
  name: string;
  amount: number;
  description: string;
}

const trustIcons = [ShieldCheck, BarChart3, RefreshCw];
const trustLabels = ["100% Transparent", "Direct Impact", "Recurring Support"];
const trustDescs = [
  "Full financial transparency with every dollar accounted for.",
  "Direct resource deployment to on-the-ground recovery teams.",
  "Set up recurring giving for sustained, long-term assistance.",
];

// Background Animation CSS
const BACKGROUND_ANIMATIONS_CSS = `
  @keyframes drift-particle {
    0% { transform: translateY(0) translateX(0); opacity: 0.1; }
    50% { transform: translateY(-40px) translateX(20px); opacity: 0.5; }
    100% { transform: translateY(-80px) translateX(-10px); opacity: 0.1; }
  }
  @keyframes twinkle-star {
    0%, 100% { opacity: 0.2; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  @keyframes rise-bubble {
    0% { transform: translateY(110%) scale(0.8); opacity: 0; }
    10% { opacity: 0.4; }
    90% { opacity: 0.4; }
    100% { transform: translateY(-10%) scale(1.1); opacity: 0; }
  }
  @keyframes fall-confetti {
    0% { transform: translateY(-20px) rotate(0deg) translateX(0px); opacity: 1; }
    50% { transform: translateY(200px) rotate(180deg) translateX(15px); opacity: 0.8; }
    100% { transform: translateY(400px) rotate(360deg) translateX(-15px); opacity: 0; }
  }
  @keyframes move-wave {
    0% { transform: translateX(0) translateZ(0) scaleY(1); }
    50% { transform: translateX(-25%) translateZ(0) scaleY(0.85); }
    100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
  }
`;

// Animated Effects
function AnimatedEffects({ theme, primaryColor }: { theme: string; primaryColor: string }) {
  const particleConfig = useRef(Array.from({ length: 20 }).map((_, i) => ({
    left: `${(i * 7 + 13) % 100}%`,
    top: `${(i * 13 + 7) % 100}%`,
    size: `${(i % 3) * 3 + 4}px`,
    delay: `${(i * 0.3) % 5}s`,
    duration: `${(i * 1.5) % 8 + 8}s`,
  })));
  const starConfig = useRef(Array.from({ length: 20 }).map((_, i) => ({
    left: `${(i * 9 + 5) % 100}%`,
    top: `${(i * 11 + 17) % 80}%`,
    size: `${(i % 2) * 2 + 3}px`,
    delay: `${(i * 0.4) % 4}s`,
    duration: `${(i % 3) * 1 + 2}s`,
  })));
  const bubbleConfig = useRef(Array.from({ length: 15 }).map((_, i) => ({
    left: `${(i * 8 + 6) % 100}%`,
    size: `${(i % 3) * 6 + 10}px`,
    delay: `${(i * 0.5) % 6}s`,
    duration: `${(i * 1.2) % 6 + 6}s`,
  })));
  const confettiColors = ["#f43f5e", "#3b82f6", "#10b981", "#eab308", "#8b5cf6", "#f97316"];
  const confettiConfig = useRef(Array.from({ length: 25 }).map((_, i) => ({
    left: `${(i * 6 + 4) % 100}%`,
    color: confettiColors[i % confettiColors.length],
    w: `${(i % 3) * 3 + 7}px`,
    h: `${(i % 4) * 4 + 9}px`,
    delay: `${(i * 0.3) % 5}s`,
    duration: `${(i * 0.8) % 4 + 4}s`,
  })));

  if (theme === "Particles") return (
    <>
      {particleConfig.current.map((p, idx) => (
        <div key={idx} className="absolute rounded-full pointer-events-none" style={{
          left: p.left, top: p.top, width: p.size, height: p.size,
          backgroundColor: primaryColor, opacity: 0.2,
          animationName: "drift-particle",
          animationDuration: p.duration,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDelay: p.delay,
        }} />
      ))}
    </>
  );
  if (theme === "Stars") return (
    <>
      {starConfig.current.map((s, idx) => (
        <div key={idx} className="absolute pointer-events-none" style={{
          left: s.left, top: s.top, width: s.size, height: s.size,
          animationName: "twinkle-star",
          animationDuration: s.duration,
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationDelay: s.delay,
        }}>
          <svg viewBox="0 0 24 24" className="w-full h-full fill-current" style={{ color: primaryColor }}>
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
          </svg>
        </div>
      ))}
    </>
  );
  if (theme === "Bubbles") return (
    <>
      {bubbleConfig.current.map((b, idx) => (
        <div key={idx} className="absolute rounded-full border pointer-events-none" style={{
          left: b.left, bottom: "-20px", width: b.size, height: b.size,
          borderColor: `${primaryColor}44`,
          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, ${primaryColor}11 100%)`,
          animationName: "rise-bubble",
          animationDuration: b.duration,
          animationTimingFunction: "ease-in",
          animationIterationCount: "infinite",
          animationDelay: b.delay,
        }} />
      ))}
    </>
  );
  if (theme === "Confetti") return (
    <>
      {confettiConfig.current.map((c, idx) => (
        <div key={idx} className="absolute pointer-events-none" style={{
          left: c.left, top: "-20px", width: c.w, height: c.h,
          backgroundColor: c.color, borderRadius: "2px",
          animationName: "fall-confetti",
          animationDuration: c.duration,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDelay: c.delay,
        }} />
      ))}
    </>
  );
  if (theme === "Waves") return (
    <div className="absolute inset-x-0 bottom-0 h-32 overflow-hidden pointer-events-none opacity-20">
      <svg className="absolute w-[200%] h-full bottom-0 left-0" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ animation: "move-wave 12s linear infinite" }}>
        <path d="M0,60 C150,90 350,30 500,60 C650,90 850,30 1000,60 C1150,90 1350,30 1500,60 L1500,120 L0,120 Z" fill={primaryColor} />
      </svg>
      <svg className="absolute w-[200%] h-full bottom-0 left-0 opacity-70" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ animation: "move-wave 8s linear infinite", animationDirection: "reverse" }}>
        <path d="M0,50 C180,80 380,20 540,50 C700,80 900,20 1060,50 C1220,80 1420,20 1580,50 L1580,120 L0,120 Z" fill={primaryColor} />
      </svg>
    </div>
  );
  return null;
}

// Static Shape Effects
function StaticShapeEffects({ theme, primaryColor, isDark }: { theme: string; primaryColor: string; isDark: boolean }) {
  const opacityVal = isDark ? 0.15 : 0.10;
  const renderIcon = (type: string) => {
    switch (type) {
      case "leaf": return <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z M12 2v20 M8 12h8" stroke={primaryColor} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />;
      case "book": return <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5V4.5z" stroke={primaryColor} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />;
      case "cap": return <path d="M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M22 7v10" stroke={primaryColor} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />;
      case "heart": return <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={primaryColor} />;
      case "cross": return <path d="M12 2v20 M7 8h10" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />;
      case "aid-cross": return <path d="M19 10.5h-5.5V5h-3v5.5H5v3h5.5V19h3v-5.5H19v-3z" fill={primaryColor} />;
      case "music": return <path d="M9 18V5l12-2v13 M9 10l12-2 M9 21a3 3 0 1 1-3-3 3 3 0 0 1 3 3zm12-2a3 3 0 1 1-3-3 3 3 0 0 1 3 3z" stroke={primaryColor} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />;
      case "paw": return <path d="M12 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-4-4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-6-6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm4 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" fill={primaryColor} />;
      case "tree": return <path d="M12 2L3 17h6v5h6v-5h6L12 2z" stroke={primaryColor} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />;
      case "globe": return <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke={primaryColor} strokeWidth="1.5" fill="none" />;
      case "trophy": return <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34M12 2a6 6 0 0 1 6 6v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" stroke={primaryColor} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />;
      case "circle": return <circle cx="12" cy="12" r="10" stroke={primaryColor} strokeWidth="1.5" fill="none" />;
      case "triangle": return <path d="M12 2L2 22h20L12 2z" stroke={primaryColor} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />;
      case "square": return <rect x="3" y="3" width="18" height="18" rx="2" stroke={primaryColor} strokeWidth="1.5" fill="none" />;
      default: return <circle cx="12" cy="12" r="4" fill={primaryColor} />;
    }
  };
  const themeIcons: Record<string, string[]> = {
    Abstract: ["circle", "triangle", "square", "circle", "triangle", "square"],
    School: ["book", "cap", "book", "cap", "book", "cap"],
    Animals: ["paw", "leaf", "paw", "leaf", "paw", "leaf"],
    Aid: ["heart", "aid-cross", "heart", "aid-cross", "heart", "aid-cross"],
    Theatre: ["music", "circle", "music", "circle", "music", "circle"],
    Faith: ["cross", "circle", "cross", "circle", "cross", "circle"],
    Environment: ["leaf", "tree", "globe", "leaf", "tree", "globe"],
    Health: ["heart", "aid-cross", "heart", "aid-cross", "heart", "aid-cross"],
    Sports: ["trophy", "circle", "trophy", "circle", "trophy", "circle"],
  };
  const icons = themeIcons[theme] || themeIcons.Abstract;
  const positions = [
    { top: "5%", left: "3%", transform: "rotate(15deg) scale(6)" },
    { top: "8%", right: "3%", transform: "rotate(-25deg) scale(7)" },
    { top: "35%", left: "1%", transform: "rotate(10deg) scale(5.5)" },
    { top: "32%", right: "1%", transform: "rotate(-15deg) scale(5.5)" },
    { bottom: "8%", left: "4%", transform: "rotate(-10deg) scale(6)" },
    { bottom: "5%", right: "4%", transform: "rotate(30deg) scale(5)" },
  ];
  return (
    <>
      {positions.map((pos, idx) => (
        <svg key={idx} viewBox="0 0 24 24"
          style={{ position: "absolute", ...pos, width: "32px", height: "32px", opacity: opacityVal, pointerEvents: "none", transition: "all 0.5s ease" } as React.CSSProperties}
        >
          {renderIcon(icons[idx % icons.length])}
        </svg>
      ))}
    </>
  );
}

// Background Effects
function BackgroundEffects({ campaign, isDark, primaryColor }: { campaign: any; isDark: boolean; primaryColor: string }) {
  const { backgroundStyle, backgroundTheme } = campaign;
  if (!backgroundStyle || backgroundStyle === "Simple") return null;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0, userSelect: "none" }}>
      <style dangerouslySetInnerHTML={{ __html: BACKGROUND_ANIMATIONS_CSS }} />
      {backgroundStyle === "Animated" && <AnimatedEffects theme={backgroundTheme} primaryColor={primaryColor} />}
      {backgroundStyle === "Static shapes" && <StaticShapeEffects theme={backgroundTheme} primaryColor={primaryColor} isDark={isDark} />}
    </div>
  );
}

function getCampaignBackgroundStyle(campaign: any, isDark: boolean, primaryColor: string) {
  const bgColor = isDark ? "#0f1117" : "#ffffff";
  const textColor = isDark ? "#f1f5f9" : "#0f172a";
  let styles: any = {
    background: bgColor,
    color: textColor,
    position: "relative" as const,
    transition: "all 0.3s ease",
  };
  if (campaign.backgroundStyle === "Animated") {
    if (campaign.backgroundTheme === "Particles") {
      styles.background = `radial-gradient(${primaryColor}1a 2px, transparent 2px)`;
      styles.backgroundSize = "16px 16px";
    } else if (campaign.backgroundTheme === "Waves") {
      styles.background = `linear-gradient(135deg, ${bgColor} 60%, ${primaryColor}11 100%)`;
    } else if (campaign.backgroundTheme === "Stars") {
      styles.background = isDark
        ? "radial-gradient(circle at 50% 50%, #1e1b4b 0%, #020617 100%)"
        : "radial-gradient(circle at 50% 50%, #e0e7ff 0%, #ffffff 100%)";
    } else if (campaign.backgroundTheme === "Confetti") {
      styles.background = `repeating-linear-gradient(45deg, ${primaryColor}08 0px, ${primaryColor}08 2px, transparent 2px, transparent 8px)`;
    } else if (campaign.backgroundTheme === "Bubbles") {
      styles.background = `radial-gradient(circle, ${primaryColor}15 10%, transparent 10%), radial-gradient(circle, ${primaryColor}08 20%, transparent 20%)`;
      styles.backgroundSize = "30px 30px, 60px 60px";
    } else {
      styles.background = `linear-gradient(to bottom, ${bgColor}, ${primaryColor}0a)`;
    }
  } else if (campaign.backgroundStyle === "Static shapes") {
    if (campaign.backgroundTheme === "Abstract") {
      styles.background = `linear-gradient(135deg, ${primaryColor}0d 0%, ${bgColor} 50%, ${primaryColor}05 100%)`;
    } else if (campaign.backgroundTheme === "Environment") {
      styles.background = isDark ? "linear-gradient(to bottom right, #022c22, #020617)" : "linear-gradient(to bottom right, #f0fdf4, #ffffff)";
    } else if (campaign.backgroundTheme === "Health" || campaign.backgroundTheme === "Aid") {
      styles.background = isDark ? "linear-gradient(to right, #450a0a, #020617)" : "linear-gradient(to right, #fef2f2, #ffffff)";
    } else if (campaign.backgroundTheme === "School") {
      styles.background = isDark ? "linear-gradient(135deg, #1e1b4b, #020617)" : "linear-gradient(135deg, #eff6ff, #ffffff)";
    } else if (campaign.backgroundTheme === "Sports") {
      styles.background = isDark ? "linear-gradient(to right, #052e16, #020617)" : "linear-gradient(to right, #f0fdf4, #ecfdf5)";
    } else if (campaign.backgroundTheme === "Faith") {
      styles.background = isDark ? "linear-gradient(135deg, #2e1065, #020617)" : "linear-gradient(135deg, #faf5ff, #ffffff)";
    } else if (campaign.backgroundTheme === "Animals") {
      styles.background = isDark ? "linear-gradient(to bottom right, #78350f, #020617)" : "linear-gradient(to bottom right, #fef3c7, #ffffff)";
    } else if (campaign.backgroundTheme === "Theatre") {
      styles.background = isDark ? "linear-gradient(to bottom right, #831843, #020617)" : "linear-gradient(to bottom right, #fce7f3, #ffffff)";
    } else {
      styles.background = `radial-gradient(${primaryColor}0d 1.5px, transparent 0)`;
      styles.backgroundSize = "24px 24px";
    }
  }
  return styles;
}

export default function CampaignDetailClient({ campaign }: { campaign: any }) {
  const config = typeof campaign.donationConfig === "string"
    ? JSON.parse(campaign.donationConfig || "{}")
    : (campaign.donationConfig || {});

  const tiers: DonationTier[] = config.tiers && config.tiers.length > 0 ? config.tiers : [
    { id: "1", name: "Supporter", amount: 25, description: "Emergency relief kit for one family" },
    { id: "2", name: "Champion", amount: 50, description: "Supplies essential food and clean water" },
    { id: "3", name: "Hero", amount: 100, description: "Funds field operations and medical supplies" },
    { id: "4", name: "Guardian", amount: 250, description: "Rebuilds damaged community infrastructure" },
  ];

  const allowCustom: boolean = config.allowCustomAmount !== false;
  const allowRecurring: boolean = config.allowRecurring || false;

  const primary = campaign.primaryColor || "#c00000";
  const isDark = campaign.colorMode === "Dark";
  const bgStyle = getCampaignBackgroundStyle(campaign, isDark, primary);

  const themeStyles = isDark ? {
    '--background': '#0f1117',
    '--foreground': '#f1f5f9',
    '--card': '#161920',
    '--card-foreground': '#f1f5f9',
    '--muted': '#11131a',
    '--muted-foreground': '#94a3b8',
    '--border': '#2a2f3a',
    '--input': '#11131a',
  } : {} as any;

  const combinedStyles = { ...bgStyle, ...themeStyles };

  const percentage = campaign.goalAmount && campaign.raisedAmount
    ? (campaign.raisedAmount / campaign.goalAmount) * 100
    : 0;
  const isOverGoal = percentage > 100;
  const barWidth = Math.min(100, percentage);

  const [selectedAmount, setSelectedAmount] = useState<number | null>(tiers[1]?.amount || tiers[0]?.amount || 50);
  const [customAmount, setCustomAmount] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [qrCopied, setQrCopied] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const campaignUrl = `${DOMAIN}/campaigns/${campaign.slug}`;
  const donationAmount = customAmount ? parseFloat(customAmount) : (selectedAmount || 0);

  // Generate QR on mount
  useEffect(() => {
    QRCode.toDataURL(campaignUrl, {
      width: 200,
      margin: 2,
      color: { dark: "#1e293b", light: "#ffffff" },
      errorCorrectionLevel: "H",
    }).then(setQrDataUrl).catch(console.error);
  }, [campaignUrl]);

  const handleCustom = (val: string) => {
    setCustomAmount(val);
    setSelectedAmount(null);
  };

  const handleDonateClick = () => {
    if (!donationAmount || donationAmount <= 0) return;
    setEmailError("");
    setPhoneError("");
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationAmount || donationAmount <= 0) return;
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
    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: donationAmount,
          recurring: isRecurring && allowRecurring,
          campaign: campaign.title,
          campaignId: campaign.id,
          campaignLocation: campaign.location || "",
          campaignDate: campaign.startDate ? new Date(campaign.startDate).toLocaleDateString() : "",
          firstName, lastName, email, phone,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Payment initialization failed.");
        setIsPending(false);
      }
    } catch (err) {
      console.error(err);
      alert("Network error connecting to payment gateway.");
      setIsPending(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(campaignUrl);
      setQrCopied(true);
      setTimeout(() => setQrCopied(false), 2000);
    } catch {}
  };

  return (
    <PageShell
      breadcrumbs={[
        { label: "Campaigns", href: "/campaigns" },
        { label: campaign.title },
      ]}
      eyebrow={campaign.type?.replace("_", " ") || "Emergency Relief"}
      title={campaign.title}
      subtitle={campaign.subtitle || `Join ${campaign.organization || "R3sults"} in providing crucial aid and relief.`}
    >
      <section className="py-12 md:py-16 relative overflow-hidden bg-background" style={combinedStyles}>
        {/* Background animated / static effects */}
        <BackgroundEffects campaign={campaign} isDark={isDark} primaryColor={primary} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Left Column: Media Banner + Details + Story */}
            <div className="lg:col-span-7 space-y-8">

              {/* Media Card */}
              <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm">
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  {campaign.bannerUrl ? (
                    campaign.bannerType === "video" ? (
                      <video src={campaign.bannerUrl} className="w-full h-full object-cover" controls autoPlay loop muted />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={campaign.bannerUrl} alt={campaign.title} className="w-full h-full object-cover" />
                    )
                  ) : (
                    <div
                      className="flex flex-col items-center justify-center h-full text-white"
                      style={{ background: `linear-gradient(135deg, ${primary}99, #0f172a)` }}
                    >
                      <Heart size={48} className="text-white/40 mb-2 animate-pulse" />
                      <p className="text-lg font-bold">{campaign.title}</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <div className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                      <Activity size={14} className="text-brand-red animate-pulse" />
                      {campaign.type?.replace("_", " ") || "Active Crisis"}
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-white">
                    {campaign.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={campaign.logoUrl} alt="Logo" className="w-8 h-8 rounded-full object-cover border-2 border-white/40" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-xs font-bold text-white shadow">
                        {(campaign.organization || "R")[0]}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold leading-none">{campaign.organization || "R3sults"}</p>
                      <p className="text-[10px] text-white/70">Verified Initiative</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {campaign.startDate && (
                      <div className="flex items-center gap-2.5 text-sm p-3 rounded-xl bg-muted/50 border border-border">
                        <Calendar size={18} className="text-brand-red shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-foreground">
                            {new Date(campaign.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                          {campaign.endDate && (
                            <p className="text-[11px] text-muted-foreground">
                              through {new Date(campaign.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    {campaign.location && (
                      <div className="flex items-center gap-2.5 text-sm p-3 rounded-xl bg-muted/50 border border-border">
                        <MapPin size={18} className="text-brand-red shrink-0" />
                        <span className="font-semibold text-foreground break-words">{campaign.location}</span>
                      </div>
                    )}
                  </div>

                  {campaign.goalAmount ? (
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-baseline">
                        <div>
                          <span className="text-2xl font-black text-foreground">${(campaign.raisedAmount || 0).toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground ml-1.5">raised of ${campaign.goalAmount.toLocaleString()} goal</span>
                        </div>
                        <span className={`text-sm font-bold ${isOverGoal ? "text-emerald-500" : "text-brand-red"}`}>
                          {isOverGoal ? `+${percentage.toFixed(0)}%` : `${percentage.toFixed(0)}%`}
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-brand-red transition-all duration-1000" style={{ width: `${barWidth}%` }} />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground pt-0.5">
                        <span className="flex items-center gap-1"><Users size={13} /> {campaign._count?.donations || 0} supporters</span>
                        {isOverGoal ? (
                          <span className="text-emerald-600 font-semibold">+${((campaign.raisedAmount || 0) - campaign.goalAmount).toLocaleString()} over goal · Tax Deductible 501(c)(3)</span>
                        ) : (
                          <span>Tax Deductible · 501(c)(3)</span>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Story & Description */}
              <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-sm space-y-5">
                <div className="flex items-center gap-2 border-b border-border pb-4">
                  <div className="w-1 h-5 bg-brand-red rounded-full" />
                  <h2 className="text-xl font-bold tracking-tight text-foreground">About this Initiative</h2>
                </div>
                <div className="prose dark:prose-invert max-w-none text-muted-foreground text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {campaign.description || campaign.subtitle || "Every registration and contribution to this campaign brings us closer to delivering life-saving supplies, medical care, and recovery assistance to affected families. Together, we can create a brighter, more compassionate world."}
                </div>
              </div>

              {/* Trust Panel */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {trustLabels.map((label, i) => {
                  const Icon = trustIcons[i];
                  return (
                    <div key={label} className="p-4 rounded-xl bg-card border border-border flex flex-col justify-between space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red">
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-foreground uppercase tracking-wide">{label}</p>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{trustDescs[i]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Sticky Donation Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
                <div className="p-6 sm:p-7 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-red bg-brand-red/10 border border-brand-red/20 px-2 py-0.5 rounded-full">
                      Direct Giving
                    </span>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-foreground">Choose Your Impact</h3>
                  <p className="text-xs text-muted-foreground mt-1">Select a support tier or enter a custom contribution.</p>
                </div>

                <div className="p-6 sm:p-7 space-y-5">
                  <div className="space-y-2.5">
                    {tiers.map((tier) => {
                      const isSelected = selectedAmount === tier.amount && !customAmount;
                      return (
                        <button
                          key={tier.id || tier.amount}
                          type="button"
                          onClick={() => { setSelectedAmount(tier.amount); setCustomAmount(""); }}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                            isSelected
                              ? "border-brand-red bg-brand-red/5 ring-1 ring-brand-red shadow-sm"
                              : "border-border hover:border-muted-foreground/40 bg-card"
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-base font-black text-foreground">${tier.amount}</span>
                              <span className="text-xs font-bold text-brand-red">— {tier.name}</span>
                            </div>
                            {tier.description && (
                              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{tier.description}</p>
                            )}
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-brand-red" : "border-muted-foreground/40"}`}>
                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-brand-red" />}
                          </div>
                        </button>
                      );
                    })}

                    {allowCustom && (
                      <div className={`rounded-xl border transition-all duration-200 bg-card ${customAmount ? "border-brand-red ring-1 ring-brand-red shadow-sm" : "border-border"}`}>
                        <div className="flex items-center px-4 py-3">
                          <span className="text-foreground font-black text-base mr-2">$</span>
                          <input
                            type="number"
                            value={customAmount}
                            onChange={(e) => handleCustom(e.target.value)}
                            placeholder="Enter custom amount..."
                            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm font-semibold outline-none"
                            min="1"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Recurring Donation Toggle — only shown if admin enabled it */}
                  {allowRecurring && (
                    <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-muted/20">
                      <div>
                        <p className="text-xs font-bold text-foreground">Monthly Sustained Donation</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Automate monthly support for lasting impact</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isRecurring}
                          onChange={() => setIsRecurring(!isRecurring)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-red" />
                      </label>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleDonateClick}
                    disabled={!donationAmount || donationAmount <= 0}
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red/90 text-white font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl shadow-lg shadow-brand-red/20 hover:shadow-brand-red/30 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    Donate ${donationAmount > 0 ? donationAmount : 0}{isRecurring ? "/month" : ""} Now
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground text-center leading-relaxed">
                    <Lock size={12} className="text-muted-foreground shrink-0" />
                    <span>Secured 256-bit encrypted checkout via Stripe. Tax deductible under EIN: 42-2695859.</span>
                  </div>
                </div>
              </div>

              {/* QR Code Card */}
              <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red">
                      <QrCode size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">Share via QR Code</p>
                      <p className="text-[11px] text-muted-foreground">Scan to open this campaign page</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className={`text-muted-foreground transition-transform ${showQR ? "rotate-90" : ""}`} />
                </button>
                {showQR && (
                  <div className="p-4 pt-0 space-y-3">
                    <div className="flex items-center justify-center p-3 bg-white rounded-xl border border-border">
                      {qrDataUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={qrDataUrl} alt="QR Code" className="w-40 h-40" />
                      ) : (
                        <div className="w-40 h-40 bg-muted animate-pulse rounded-lg flex items-center justify-center">
                          <QrCode size={32} className="text-muted-foreground/40" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground text-center font-mono break-all">{campaignUrl}</p>
                    <button
                      onClick={handleCopyLink}
                      className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold border transition-all ${
                        qrCopied
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-muted/50 text-foreground border-border hover:border-brand-red/40 hover:text-brand-red"
                      }`}
                    >
                      <Copy size={13} />
                      {qrCopied ? "Link Copied!" : "Copy Campaign Link"}
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Donor Information Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md w-[95vw] max-h-[92vh] overflow-y-auto bg-background text-foreground p-6 rounded-2xl border border-border shadow-2xl" style={themeStyles}>
          <DialogHeader className="mb-4 text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-red/10 text-brand-red border border-brand-red/20 mb-2">
              Step 2 of 2
            </div>
            <DialogTitle className="text-xl font-black uppercase tracking-tight text-foreground">Donor Information</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Donating <span className="font-bold text-brand-red">${donationAmount}{isRecurring ? "/month" : ""}</span> to <span className="font-semibold text-foreground">{campaign.title}</span>. Please complete this quick form to proceed.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleModalSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">First Name *</label>
                <input type="text" required placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-background border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all font-medium" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Last Name *</label>
                <input type="text" required placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-background border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all font-medium" />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Email Address *</label>
              <input type="email" required placeholder="john.doe@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-background border ${emailError ? "border-brand-red" : "border-neutral-300 dark:border-neutral-700"} rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all font-medium`} />
              {emailError && <p className="text-brand-red text-xs mt-1 font-semibold">{emailError}</p>}
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Phone Number *</label>
              <PhoneInput
                defaultCountry="US" value={phone} onChange={(val) => setPhone(val || "")} required
                className={`w-full bg-background border ${phoneError ? "border-brand-red" : "border-neutral-300 dark:border-neutral-700"} rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus-within:ring-1 focus-within:ring-brand-red focus-within:border-brand-red transition-all [&_input]:outline-none [&_input]:border-none [&_input]:p-0 [&_input]:bg-transparent [&_input]:text-foreground [&_input]:ml-2`}
              />
              {phoneError && <p className="text-brand-red text-xs mt-1 font-semibold">{phoneError}</p>}
            </div>
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground flex items-center justify-between">
              <span>Total Contribution:</span>
              <span className="text-base font-black text-foreground">${donationAmount} {isRecurring ? "/ month" : "one-time"}</span>
            </div>
            <button type="submit" disabled={isPending}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red/90 text-white font-bold text-sm uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50">
              {isPending ? "Connecting to Stripe..." : `Proceed to Payment · $${donationAmount}${isRecurring ? "/month" : ""}`}
              {!isPending && <ChevronRight size={16} />}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
