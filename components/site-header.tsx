"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Our Approach", href: "/#approach" },
    { label: "Impact", href: "/impact" },
    { label: "How We Operate", href: "/#operations" },
    { label: "Stories", href: "/stories" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background/80 backdrop-blur-sm border-b border-border/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo — dark version for light background */}
          <Link href="/" aria-label="R3sults Foundation — Home">
            <Image
              src="/images/r3sults-logo-dark.png"
              alt="R3sults Foundation"
              width={160}
              height={52}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/volunteer"
              className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors duration-200 tracking-wide"
            >
              Volunteer
            </Link>
            <Link
              href="/#donate"
              className="inline-flex items-center gap-2 bg-brand-red text-primary-foreground text-sm font-bold px-5 py-2.5 tracking-wide uppercase hover:bg-brand-red/90 active:scale-95 transition-all duration-200"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="px-6 py-6 flex flex-col gap-4" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-foreground hover:text-brand-red transition-colors duration-200 border-b border-border pb-4"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/volunteer"
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-foreground hover:text-brand-red transition-colors"
            >
              Volunteer
            </Link>
            <Link
              href="/#donate"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center bg-brand-red text-primary-foreground text-sm font-bold px-6 py-3 tracking-widest uppercase mt-2"
            >
              Donate Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
