"use client";

import React from "react";
import { siteContent, StepItem } from "@/data/content";
import { SectionHeader } from "./SectionHeader";

export function HowIWork() {
  const { process } = siteContent;

  return (
    <section id="process" className="py-24 px-6 bg-[#FAF6E8] border-y border-[#1F4633]/10">
      <div className="max-w-6xl mx-auto">
        {/* Reusable SectionHeader */}
        <SectionHeader
          eyebrow={process.eyebrow}
          split={process.heading}
          description={process.description}
          buttonLabel={process.buttonLabel}
          buttonUrl={process.buttonUrl}
        />

        {/* 4-step horizontal timeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden md:block absolute top-7 left-12 right-12 h-[1px] bg-[#1F4633]/20 z-0" />

          {process.steps.map((step: StepItem, idx: number) => (
            <div
              key={step.step}
              className="relative z-10 flex flex-col group bg-white/60 md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none border md:border-none border-[#1F4633]/10"
            >
              {/* Step Number Circle */}
              <div className="w-14 h-14 rounded-2xl bg-[#1F4633] text-[#F7F1DB] flex items-center justify-center font-extrabold text-lg mb-6 shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all">
                {step.step}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold tracking-tight text-[#050409] mb-3 group-hover:text-[#1F4633] transition-colors">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#050409]/75 leading-relaxed font-normal">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
