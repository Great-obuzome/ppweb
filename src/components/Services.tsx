"use client";

import React from "react";
import { siteContent, ServiceItem, ToolItem } from "@/data/content";
import { ToolIcon } from "./ToolIcon";
import { Check } from "lucide-react";

export function Services() {
  const { services, tools } = siteContent;

  // Helper to retrieve the official tool name from the tools array
  const getToolData = (toolIdOrName: string) => {
    const normalized = toolIdOrName.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "");
    const found = tools.find(
      (t: ToolItem) =>
        t.id.toLowerCase() === normalized ||
        t.name.toLowerCase() === toolIdOrName.toLowerCase() ||
        normalized.includes(t.id.toLowerCase())
    );
    return {
      id: found ? found.id : normalized,
      name: found ? found.name : toolIdOrName,
    };
  };

  return (
    <section id="services" className="py-24 px-6 max-w-6xl mx-auto">
      {/* Eyebrow & Heading */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#1F4633]" />
          <span className="text-xs font-bold tracking-[0.24em] uppercase text-[#1F4633]">
            {services.eyebrow}
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#050409]">
          {services.heading}
        </h2>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.items.map((service: ServiceItem, idx: number) => (
          <div
            key={service.id}
            className="group relative rounded-[20px] p-8 border border-[#1F4633]/10 shadow-sm transition-all duration-300 hover:border-[#1F4633]/35 hover:-translate-y-1 hover:shadow-md motion-reduce:transform-none flex flex-col justify-between overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, #FFFEFA 0%, #FBF9F3 55%, #EEF0E0 100%)",
            }}
          >
            {/* Soft radial highlight in the top-right corner for depth */}
            <div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 70%)",
              }}
              aria-hidden="true"
            />

            {/* Top Indicator & Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#1F4633]/70 uppercase">
                  System 0{idx + 1}
                </span>

                {/* Status indicator: #1F4633 dot with slow soft pulse */}
                <div className="relative flex items-center justify-center w-3 h-3">
                  <span className="absolute w-2.5 h-2.5 rounded-full bg-[#1F4633] opacity-35 animate-ping motion-reduce:animate-none" />
                  <span className="relative w-2 h-2 rounded-full bg-[#1F4633]" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#050409] mb-4 group-hover:text-[#1F4633] transition-colors leading-snug">
                {service.title}
              </h3>

              {/* Short Description */}
              <p className="text-sm text-[#050409]/75 leading-relaxed mb-6 font-normal">
                {service.description}
              </p>

              {/* 3 Bullet Outcomes */}
              <ul className="space-y-3 mb-2">
                {service.outcomes.map((outcome, oIdx) => (
                  <li key={oIdx} className="flex items-start gap-2.5 text-xs text-[#050409]/85 font-medium leading-relaxed">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-[#1F4633]/10 text-[#1F4633] flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom: Redesigned Primary Stack Section */}
            <div className="relative z-10 pt-5 mt-5 border-t border-[#1F4633]/10">
              {/* Label on its own line above the chips: all-caps, wide-spaced, #1F4633 at ~70% */}
              <div className="mb-3">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#1F4633]/70 whitespace-nowrap block">
                  PRIMARY STACK
                </span>
              </div>

              {/* Wrapping row of pill chips */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {service.tools.map((rawTool) => {
                  const tool = getToolData(rawTool);
                  return (
                    <div
                      key={tool.id}
                      className="group/chip inline-flex items-center gap-2 h-9 pl-2.5 pr-3.5 bg-white rounded-full border border-[#1F4633]/[0.12] shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 select-none motion-reduce:transform-none"
                    >
                      {/* Official full-color logo container */}
                      <div className="w-[18px] h-[18px] flex items-center justify-center flex-shrink-0">
                        <ToolIcon id={tool.id} className="w-full h-full object-contain" />
                      </div>
                      {/* Tool name in medium-weight 14px dark text */}
                      <span className="text-[14px] font-medium text-[#050409] tracking-tight leading-none whitespace-nowrap">
                        {tool.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
