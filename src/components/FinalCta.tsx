"use client";

import React from "react";
import { siteContent } from "@/data/content";
import { SplitHeading } from "./SplitHeading";
import { ArrowUpRight, Mail } from "lucide-react";

export function FinalCta() {
  const { finalCta } = siteContent;

  return (
    <div className="w-full bg-[#1F4633] text-[#F7F1DB] py-24 px-6 relative overflow-hidden">
      {/* Subtle decorative circles */}
      <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full border border-white/10 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F1DB]/10 border border-[#F7F1DB]/20 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#F7F1DB] animate-pulse" />
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#F7F1DB]">
            Start Your Outbound Engine
          </span>
        </div>

        <SplitHeading
          theme="cta"
          split={finalCta.heading}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight max-w-2xl"
        />

        <p className="text-base sm:text-lg text-[#F7F1DB]/80 font-normal max-w-xl mb-10 leading-relaxed">
          {finalCta.subheading}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {/* Cream pill button */}
          <a
            href={finalCta.ctaPrimary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 rounded-full bg-[#F7F1DB] hover:bg-white text-[#1F4633] text-sm font-bold uppercase tracking-[0.16em] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span>{finalCta.ctaPrimary.label}</span>
            <ArrowUpRight className="w-4 h-4 text-[#1F4633] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Email link */}
          <a
            href={`mailto:${finalCta.emailLabel}`}
            className="text-xs font-semibold tracking-wider text-[#F7F1DB]/90 hover:text-white flex items-center gap-2 py-2 px-4 transition-colors underline underline-offset-4 decoration-[#F7F1DB]/30"
          >
            <Mail className="w-4 h-4 opacity-75" />
            <span>{finalCta.emailLabel}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
