"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { siteContent } from "@/data/content";
import { Menu, X } from "lucide-react";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const navPillRef = useRef<HTMLElement>(null);
  const { brand, navigation } = siteContent;
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let animationFrameId: number;

    const handleScrollAndCheck = () => {
      cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        if (!navPillRef.current) return;
        const pr = navPillRef.current.getBoundingClientRect();

        // 1. Detect if the floating pill is over a dark section or card
        // (WorkingWith section, SelectedWork dark project cards, Final CTA & Footer band)
        const darkCandidates = document.querySelectorAll<HTMLElement>(
          'section, footer, div[class*="group"], div[class*="bg-"]'
        );

        let overDark = false;

        for (let i = 0; i < darkCandidates.length; i++) {
          const el = darkCandidates[i];
          if (el.tagName === "BODY" || el.tagName === "HTML" || el.closest("header")) continue;

          const cls = el.className ? el.className.toString() : "";
          const isDarkElement =
            el.tagName === "FOOTER" ||
            cls.includes("bg-[#050409]") ||
            (cls.includes("bg-[#1F4633]") && !cls.includes("bg-[#1F4633]/")) ||
            cls.includes("bg-[#0c0b14]");

          if (!isDarkElement) continue;

          const r = el.getBoundingClientRect();
          // Filter out tiny chips/badges: must be a full section or card (min width 240px, min height 100px)
          if (r.width < 240 || r.height < 100) continue;

          // Check if dark element overlaps the floating pill bounding rect
          if (
            r.top <= pr.bottom - 4 &&
            r.bottom >= pr.top + 4 &&
            r.left <= pr.right - 10 &&
            r.right >= pr.left + 10
          ) {
            overDark = true;
            break;
          }
        }

        setIsDark(overDark);

        // 2. Active section detection for the sliding pill highlight
        const sectionIds = ["work", "services", "process", "about", "contact"];
        let matchedSection: string | null = null;

        for (const id of sectionIds) {
          const sec = document.getElementById(id);
          if (!sec) continue;
          const secRect = sec.getBoundingClientRect();
          // Active when section header / reading zone is in the upper area
          if (secRect.top <= 260 && secRect.bottom >= 140) {
            matchedSection = `#${id}`;
          }
        }

        // If scrolled to the bottom of the page, activate #contact
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 80
        ) {
          matchedSection = "#contact";
        }

        setActiveLink(matchedSection);
      });
    };

    window.addEventListener("scroll", handleScrollAndCheck, { passive: true });
    window.addEventListener("resize", handleScrollAndCheck, { passive: true });
    handleScrollAndCheck();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScrollAndCheck);
      window.removeEventListener("resize", handleScrollAndCheck);
    };
  }, []);

  return (
    <>
      {/* Flow Spacer preserving layout space so Hero and other sections remain unaffected */}
      <div className="w-full h-18 sm:h-20 pointer-events-none select-none" aria-hidden="true" />

      {/* Floating Translucent Glass Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full pt-4 pb-3 sm:pt-5 sm:pb-3 pointer-events-none transition-colors duration-200">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between select-none">
          
          {/* Left: Brand Lockup [Icon] [UPBYNATURE] */}
          <motion.div
            className="flex-1 pointer-events-auto flex items-center"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.5,
              delay: 0,
              ease: EASE_OUT_EXPO,
            }}
            suppressHydrationWarning
          >
            <Link
              href="/"
              className="inline-flex items-center gap-3 sm:gap-3.5 group"
            >
              {/* Interlocking Serif Monogram Icon */}
              <span
                className="w-[25px] h-[34px] sm:w-[30px] sm:h-[40px] flex-shrink-0 transition-colors duration-200"
                style={{
                  backgroundColor: isDark ? "#F7F1DB" : "#1F4633",
                  WebkitMaskImage: "url(/images/monogram-mask.png)",
                  maskImage: "url(/images/monogram-mask.png)",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
                aria-hidden="true"
              />
              <span
                className={`text-base sm:text-lg font-bold tracking-[0.25em] uppercase transition-colors duration-200 ${
                  isDark
                    ? "text-[#F7F1DB] group-hover:text-white"
                    : "text-[#050409] group-hover:text-[#1F4633]"
                }`}
              >
                {brand.name}
              </span>
            </Link>
          </motion.div>

          {/* Center: Translucent Glass Floating Navbar Pill */}
          <motion.nav
            ref={navPillRef}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.5,
              delay: 0,
              ease: EASE_OUT_EXPO,
            }}
            suppressHydrationWarning
            className="hidden md:flex items-center p-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em] relative pointer-events-auto transition-all duration-200 select-none glass-nav-pill"
            style={{
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.16)"
                : "rgba(255, 255, 255, 0.38)",
              backdropFilter: "blur(18px) saturate(1.6)",
              WebkitBackdropFilter: "blur(18px) saturate(1.6)",
              border: isDark
                ? "1px solid rgba(255, 255, 255, 0.22)"
                : "1px solid rgba(255, 255, 255, 0.55)",
              boxShadow: isDark
                ? [
                    "0 0 0 1px rgba(255, 255, 255, 0.08)",
                    "inset 0 1px 0 rgba(255, 255, 255, 0.35)",
                    "inset 0 -1px 0 rgba(0, 0, 0, 0.20)",
                    "0 8px 30px rgba(0, 0, 0, 0.35)",
                  ].join(", ")
                : [
                    "0 0 0 1px rgba(31, 70, 51, 0.08)",
                    "inset 0 1px 0 rgba(255, 255, 255, 0.70)",
                    "inset 0 -1px 0 rgba(31, 70, 51, 0.06)",
                    "0 8px 30px rgba(5, 4, 9, 0.08)",
                  ].join(", "),
              borderRadius: "9999px",
            }}
          >
            {/* Subtle diagonal sheen layer: linear-gradient(135deg, rgba(255,255,255,0.45), rgba(255,255,255,0) 55%) */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-200"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 55%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 55%)",
              }}
              aria-hidden="true"
            />

            {/* Links with Sliding Active Highlight Pill */}
            <div className="flex items-center space-x-1 sm:space-x-1.5 relative z-10">
              {navigation.links.map((link) => {
                const isActive = activeLink === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setActiveLink(link.href)}
                    className={`relative px-4 py-1.5 rounded-full transition-colors duration-200 z-10 ${
                      isDark
                        ? isActive
                          ? "text-[#F7F1DB] font-bold"
                          : "text-[#F7F1DB]/80 hover:text-white"
                        : isActive
                        ? "text-[#050409] font-bold"
                        : "text-[#050409]/80 hover:text-[#050409]"
                    }`}
                  >
                    {/* Sliding pill highlight for active link */}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavPillHighlight"
                        className="absolute inset-0 rounded-full -z-10 pointer-events-none"
                        style={{
                          backgroundColor: isDark
                            ? "rgba(255, 255, 255, 0.16)"
                            : "rgba(31, 70, 51, 0.10)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </motion.nav>

          {/* Right: CTA Links & Buttons */}
          <motion.div
            className="hidden sm:flex flex-1 items-center justify-end space-x-5 pointer-events-auto"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.5,
              delay: 0,
              ease: EASE_OUT_EXPO,
            }}
            suppressHydrationWarning
          >
            <a
              href={navigation.ctaSecondary.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ${
                isDark
                  ? "text-[#F7F1DB]/85 hover:text-white"
                  : "text-[#050409]/80 hover:text-[#050409]"
              }`}
            >
              {navigation.ctaSecondary.label}
            </a>

            <a
              href={navigation.ctaPrimary.href}
              className={`text-xs font-bold uppercase tracking-[0.14em] px-6 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow active:scale-95 ${
                isDark
                  ? "bg-[#F7F1DB] text-[#1F4633] hover:bg-white"
                  : "bg-[#050409] text-[#F7F1DB] hover:bg-[#1F4633]"
              }`}
            >
              {navigation.ctaPrimary.label}
            </a>
          </motion.div>

          {/* Mobile Menu Toggle Button */}
          <motion.div
            className="flex sm:hidden items-center pointer-events-auto"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.5,
              delay: 0,
              ease: EASE_OUT_EXPO,
            }}
            suppressHydrationWarning
          >
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className={`p-1.5 transition-colors duration-200 ${
                isDark
                  ? "text-[#F7F1DB] hover:text-white"
                  : "text-[#050409] hover:text-[#1F4633]"
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </motion.div>

        </div>

        {/* Mobile Drawer with Matching Translucent Glass Style */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-x-4 top-20 rounded-2xl p-6 flex flex-col space-y-4 md:hidden z-50 pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-200 glass-drawer"
            style={{
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.16)"
                : "rgba(255, 255, 255, 0.55)",
              backdropFilter: "blur(20px) saturate(1.6)",
              WebkitBackdropFilter: "blur(20px) saturate(1.6)",
              border: isDark
                ? "1px solid rgba(255, 255, 255, 0.22)"
                : "1px solid rgba(255, 255, 255, 0.60)",
              boxShadow: isDark
                ? "0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 0 rgba(0, 0, 0, 0.20), 0 16px 40px rgba(0, 0, 0, 0.50)"
                : "0 0 0 1px rgba(31, 70, 51, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.70), inset 0 -1px 0 rgba(31, 70, 51, 0.06), 0 16px 40px rgba(5, 4, 9, 0.12)",
            }}
          >
            {/* Diagonal sheen overlay for drawer */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0) 60%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 60%)",
              }}
              aria-hidden="true"
            />

            <div
              className={`flex flex-col space-y-2 pb-3 border-b relative z-10 ${
                isDark ? "border-white/10" : "border-[#1F4633]/10"
              }`}
            >
              {navigation.links.map((link) => {
                const isActive = activeLink === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      setActiveLink(link.href);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-sm font-semibold tracking-wider uppercase py-2 px-3 rounded-xl transition-colors ${
                      isDark
                        ? isActive
                          ? "text-[#F7F1DB] bg-white/10 font-bold"
                          : "text-[#F7F1DB]/80 hover:text-white"
                        : isActive
                        ? "text-[#050409] bg-[#1F4633]/10 font-bold"
                        : "text-[#050409] hover:text-[#1F4633]"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 pt-1 relative z-10">
              <a
                href={navigation.ctaSecondary.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-center text-xs font-bold uppercase tracking-wider py-2 rounded-full border transition-colors ${
                  isDark
                    ? "border-[#F7F1DB]/30 text-[#F7F1DB] hover:border-[#F7F1DB] hover:bg-white/10"
                    : "border-[#050409]/20 text-[#050409] hover:border-[#1F4633] hover:bg-white/50"
                }`}
              >
                {navigation.ctaSecondary.label}
              </a>
              <a
                href={navigation.ctaPrimary.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-center text-xs font-bold uppercase tracking-wider py-2.5 rounded-full transition-colors shadow-sm ${
                  isDark
                    ? "bg-[#F7F1DB] text-[#1F4633] hover:bg-white"
                    : "bg-[#050409] text-[#F7F1DB] hover:bg-[#1F4633]"
                }`}
              >
                {navigation.ctaPrimary.label}
              </a>
            </div>
          </div>
        )}

        {/* Fallback for browsers that do not support backdrop-filter */}
        <style jsx global>{`
          @supports not ((backdrop-filter: blur(18px)) or (-webkit-backdrop-filter: blur(18px))) {
            .glass-nav-pill {
              background-color: rgba(247, 241, 219, 0.92) !important;
            }
            .glass-drawer {
              background-color: rgba(247, 241, 219, 0.96) !important;
            }
          }
        `}</style>
      </header>
    </>
  );
}
