"use client";

import React from "react";
import { siteContent, ServiceItem, ToolItem } from "@/data/content";
import { ToolIcon } from "./ToolIcon";
import { Check, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SplitHeading } from "./SplitHeading";

export function Services() {
  const { services, tools } = siteContent;
  const shouldReduceMotion = useReducedMotion();

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
      {/* Header: Left Column (Eyebrow + Heading) & Right Column (Description + Button) */}
      <div className="mb-12 md:mb-16 flex flex-col min-[900px]:flex-row min-[900px]:items-end min-[900px]:justify-between gap-5 min-[900px]:gap-12">
        {/* Left Column: Eyebrow and Heading */}
        <div className="flex-1 max-w-2xl min-[900px]:max-w-[540px]">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-[14px] mb-5">
            {/* Animated horizontal line: 40px wide, 1px thick, #1F4633 */}
            <motion.span
              className="w-[40px] h-[1px] bg-[#1F4633] block shrink-0"
              initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
              aria-hidden="true"
            />
            {/* Eyebrow Text: Sentence case "Services", 15-16px, regular weight, #050409 at 80%, no letter-spacing */}
            <motion.span
              className="text-[15px] sm:text-[16px] font-normal tracking-normal text-[#050409]/80"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
            >
              {services.eyebrow}
            </motion.span>
          </div>

          {/* Heading */}
          <SplitHeading
            split={services.heading}
            className="text-[clamp(34px,5vw,60px)] font-bold tracking-[-0.01em] leading-[1.05] uppercase min-[900px]:max-w-[13ch] [text-wrap:balance]"
          />
        </div>

        {/* Right Column: Description & Pill Button (stacks left on mobile, right-aligned & bottom-aligned on desktop) */}
        <motion.div
          className="flex flex-col items-start min-[900px]:items-end text-left min-[900px]:text-right shrink-0 max-w-[420px] gap-5"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Description */}
          <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[#050409]/60 font-normal">
            {services.description}
          </p>

          {/* Pill Button: #050409 background, #F7F1DB text, 999px radius, 14px 26px padding, 15px medium text */}
          <a
            href={services.allServicesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-2.5 px-[26px] py-[14px] rounded-full bg-[#050409] text-[#F7F1DB] text-[15px] font-medium transition-all duration-200 hover:-translate-y-[2px] hover:bg-[#1F4633] motion-reduce:transform-none select-none shadow-sm hover:shadow"
          >
            <span>{services.allServicesLabel || "All services"}</span>
            <ArrowRight className="w-4 h-4 text-[#F7F1DB] transition-transform duration-200 group-hover/btn:translate-x-[3px] motion-reduce:transform-none" />
          </a>
        </motion.div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.items.map((service: ServiceItem, idx: number) => (
          <div
            key={service.id}
            className="system-card group relative rounded-[20px] p-8 border border-[#1F4633]/10 shadow-sm transition-all duration-300 hover:border-[#1F4633]/35 hover:-translate-y-1 hover:shadow-md motion-reduce:transform-none flex flex-col justify-between overflow-hidden"
          >
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

      {/* Scoped CSS for multi-layer smooth gradient & hover transitions */}
      <style jsx>{`
        .system-card {
          background-image:
            radial-gradient(120% 90% at 0% 0%, #FFFFFF 0%, rgba(255, 255, 255, 0) 60%),
            radial-gradient(130% 110% at 100% 100%, rgba(31, 70, 51, 0.14) 0%, rgba(31, 70, 51, 0.06) 45%, rgba(31, 70, 51, 0) 80%),
            radial-gradient(90% 70% at 100% 0%, rgba(247, 241, 219, 0.9) 0%, rgba(247, 241, 219, 0) 70%),
            radial-gradient(90% 70% at 0% 100%, rgba(31, 70, 51, 0.07) 0%, rgba(31, 70, 51, 0) 70%),
            linear-gradient(155deg, #FFFEFA 0%, #F6F5E8 50%, #ECEFDC 100%);
          background-size: 100% 100%;
          background-position: center;
          transition: border-color 300ms ease, transform 300ms ease, box-shadow 300ms ease, background-position 400ms ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .system-card:hover {
            background-position: 10px 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .system-card {
            transition: none !important;
            background-position: center !important;
          }
        }
      `}</style>
    </section>
  );
}
