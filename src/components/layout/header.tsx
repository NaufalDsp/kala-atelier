"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Pill } from "@/components/ui/pill";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isHeroOverlay?: boolean;
}

export function Header({ isHeroOverlay = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Karya", href: "/karya" },
    { label: "Studio", href: "/studio" },
    { label: "Proses", href: "/proses" },
    { label: "Galeri", href: "/galeri" },
  ];

  const isLightText = isHeroOverlay && !isScrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-40 transition-colors duration-300",
          isHeroOverlay && !isScrolled
            ? "bg-transparent text-paper"
            : "bg-paper/95 backdrop-blur-md text-ink border-b border-ink-hairline"
        )}
      >
        <Container className="flex items-center justify-between h-20">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="flex items-baseline gap-3 group focus-visible:outline focus-visible:outline-2"
          >
            <span
              className={cn(
                "font-sans text-2xl font-medium tracking-[-0.045em] transition-colors",
                isLightText ? "text-paper" : "text-ink"
              )}
            >
              {siteConfig.shortName}
            </span>
            <span
              className={cn(
                "font-mono text-mono hidden sm:inline tracking-normal transition-colors",
                isLightText ? "text-paper/70" : "text-graphite"
              )}
            >
              ({siteConfig.descriptor})
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-8 text-label font-semibold tracking-[0.04em] uppercase"
            aria-label="Navigasi Utama"
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors duration-150 focus-visible:outline focus-visible:outline-2",
                  isLightText
                    ? "text-paper/80 hover:text-paper"
                    : "text-graphite hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Header Action & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <Pill
              href="/enquiry"
              variant={isLightText ? "paper" : "ink"}
              showArrow
              className="hidden sm:inline-flex"
            >
              Hubungi kami
            </Pill>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "md:hidden p-2 rounded-full focus-visible:outline focus-visible:outline-2",
                isLightText
                  ? "text-paper hover:bg-paper/10"
                  : "text-ink hover:bg-stone/20"
              )}
              aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={20} strokeWidth={1.5} />
              ) : (
                <Menu size={20} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink/95 text-paper flex flex-col justify-between pt-28 pb-10 px-6 sm:px-12 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col gap-6">
            <span className="font-mono text-mono text-stone uppercase tracking-wider">
              Indeks Navigasi
            </span>
            <nav className="flex flex-col gap-5 text-3xl font-medium tracking-tight">
              {navLinks.map((item, idx) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 border-b border-paper/15 text-paper hover:text-stone transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-sm text-stone">
                    (0{idx + 1})
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-6 pt-8 border-t border-paper/15">
            <Pill
              href="/enquiry"
              variant="paper"
              showArrow
              className="w-full justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              Mulai Konsultasi
            </Pill>

            <div className="flex justify-between items-center text-mono font-mono text-stone">
              <span>Jakarta, WIB</span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-1 hover:text-paper"
              >
                <span>{siteConfig.contact.email}</span>
                <ArrowUpRight size={13} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

