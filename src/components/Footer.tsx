"use client";

import React from "react";
import Link from "next/link";
import { siteContent } from "@/data/content";

export function Footer() {
  const { brand, navigation } = siteContent;

  return (
    <footer className="w-full bg-[#050409] text-[#F7F1DB] py-14 px-6 border-t border-[#F7F1DB]/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand Lockup [Icon] [UPBYNATURE] & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-3.5 group"
          >
            {/* Interlocking Serif Monogram Icon (Cream on Dark) */}
            <span
              className="w-[33px] h-[44px] flex-shrink-0 transition-colors duration-200"
              style={{
                backgroundColor: "#F7F1DB",
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
            <span className="text-base font-bold tracking-[0.25em] uppercase text-[#F7F1DB] group-hover:text-white transition-colors">
              {brand.name}
            </span>
          </Link>
          <span className="text-xs text-[#F7F1DB]/50 mt-1.5 font-medium">
            {brand.tagline} • Built by {brand.creator}
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#F7F1DB]/70">
          {navigation.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social Links (LinkedIn, X, Fiverr) */}
        <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-[0.15em] text-[#F7F1DB]/80">
          <a
            href={brand.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={brand.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            X / Twitter
          </a>
          <a
            href={brand.socials.fiverr}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Fiverr
          </a>
        </div>
      </div>

      {/* Bottom copyright line */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-[#F7F1DB]/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F7F1DB]/40 font-mono">
        <div>
          © 2026 {brand.name}. All rights reserved.
        </div>
        <div className="mt-2 sm:mt-0">
          Engineered with Next.js & Tailwind CSS
        </div>
      </div>
    </footer>
  );
}
