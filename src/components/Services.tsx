"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowDownRight,
  ArrowUpRight,
  Layers,
  CheckCircle2,
  Radio,
  Sparkles,
  Target,
  RefreshCw,
  Mail,
  Zap,
  Bot,
  FileSpreadsheet,
} from "lucide-react";
import { siteContent, ServiceItem, ToolItem } from "@/data/content";
import { ToolIcon } from "./ToolIcon";
import { SectionHeader } from "./SectionHeader";

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

  const featured = services.items[0];
  const smallerCards = services.items.slice(1);

  // 6 capability blocks for the Featured Card
  const capabilityList = [
    {
      title: "Waterfall enrichment",
      description: "Multiple data providers, one clean record.",
      icon: <Layers className="w-3.5 h-3.5 text-[#1F4633]" />,
    },
    {
      title: "Email verification",
      description: "Verified work emails before anything is sent.",
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#1F4633]" />,
    },
    {
      title: "Phone and signal data",
      description: "Mobile numbers and buying signals when they exist.",
      icon: <Radio className="w-3.5 h-3.5 text-[#1F4633]" />,
    },
    {
      title: "AI research",
      description: "Company summaries and personalization points.",
      icon: <Sparkles className="w-3.5 h-3.5 text-[#1F4633]" />,
    },
    {
      title: "ICP scoring",
      description: "Rank accounts by fit and intent.",
      icon: <Target className="w-3.5 h-3.5 text-[#1F4633]" />,
    },
    {
      title: "CRM sync",
      description: "Deduplicated records pushed into HubSpot or Salesforce.",
      icon: <RefreshCw className="w-3.5 h-3.5 text-[#1F4633]" />,
    },
  ];

  // 5 flow nodes for the Featured Card flow strip
  const flowNodes = [
    { label: "Import list", icon: <FileSpreadsheet className="w-3 h-3 text-[#1F4633]" /> },
    { label: "Enrich", icon: <Layers className="w-3 h-3 text-[#1F4633]" /> },
    { label: "Score", icon: <Target className="w-3 h-3 text-[#1F4633]" /> },
    { label: "Personalize", icon: <Sparkles className="w-3 h-3 text-[#1F4633]" /> },
    { label: "Sync to CRM", icon: <RefreshCw className="w-3 h-3 text-[#1F4633]" /> },
  ];

  return (
    <section id="services" className="py-24 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <SectionHeader
        eyebrow={services.eyebrow}
        split={services.heading}
        headingMaxWidth="min-[900px]:max-w-[13ch]"
        description={services.description}
        buttonLabel={services.allServicesLabel || "All services"}
        buttonUrl={services.allServicesUrl}
      />

      {/* Bento Layout: Row 1 Featured Card + Row 2 Three Smaller Cards */}
      <div className="space-y-6">
        {/* ROW 1: FEATURED CARD (THE CORE) */}
        {featured && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="featured-system-card group relative rounded-[24px] p-6 sm:p-8 md:p-10 border border-[#1F4633]/15 shadow-sm transition-all duration-300 hover:border-[#1F4633]/35 hover:-translate-y-1 hover:shadow-md motion-reduce:transform-none overflow-hidden"
          >
            {/* Top Indicator & Pulsing Status Dot */}
            <div className="relative z-10 flex items-center justify-between mb-6">
              <div className="inline-flex items-center gap-2">
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#1F4633] uppercase">
                  {featured.badge || "THE CORE"}
                </span>
              </div>

              {/* Status indicator: #1F4633 dot with slow soft pulse */}
              <div className="relative flex items-center justify-center w-3 h-3">
                <span className="absolute w-2.5 h-2.5 rounded-full bg-[#1F4633] opacity-35 animate-ping motion-reduce:animate-none" />
                <span className="relative w-2 h-2 rounded-full bg-[#1F4633]" />
              </div>
            </div>

            {/* Two-Column Internal Grid (Desktop >= 900px, single column on mobile) */}
            <div className="relative z-10 grid grid-cols-1 min-[900px]:grid-cols-12 gap-8 items-start">
              {/* Left Column: Title, Description, Primary Stack, and Action Link */}
              <div className="min-[900px]:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#050409] mb-4 group-hover:text-[#1F4633] transition-colors leading-tight">
                    {featured.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-[#050409]/75 leading-relaxed font-normal mb-6">
                    {featured.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1F4633]/10">
                  <div className="mb-3">
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#1F4633]/70 block">
                      PRIMARY STACK
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-6">
                    {featured.tools.map((rawTool) => {
                      const tool = getToolData(rawTool);
                      return (
                        <div
                          key={tool.id}
                          className="group/chip inline-flex items-center gap-2 h-9 pl-2.5 pr-3.5 bg-white rounded-full border border-[#1F4633]/[0.12] shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 select-none motion-reduce:transform-none"
                        >
                          <div className="w-[18px] h-[18px] flex items-center justify-center flex-shrink-0">
                            <ToolIcon id={tool.id} className="w-full h-full object-contain" />
                          </div>
                          <span className="text-[14px] font-medium text-[#050409] tracking-tight leading-none whitespace-nowrap">
                            {tool.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <Link
                    href="#work"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#1F4633] hover:text-[#050409] transition-colors group/link select-none"
                  >
                    <span>{featured.linkText || "See how it works"}</span>
                    <ArrowDownRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:translate-y-0.5 motion-reduce:transform-none" />
                  </Link>
                </div>
              </div>

              {/* Right Column: 2 x 3 Capability Grid */}
              <div className="min-[900px]:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {capabilityList.map((cap) => (
                    <div
                      key={cap.title}
                      className="group/cap rounded-xl p-3.5 bg-white/50 border border-[#1F4633]/10 hover:bg-[#1F4633]/[0.06] hover:border-[#1F4633]/25 transition-all duration-200"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-5 h-5 rounded-md bg-[#1F4633]/10 flex items-center justify-center text-[#1F4633] shrink-0">
                          {cap.icon}
                        </div>
                        <h4 className="text-xs sm:text-[13px] font-bold text-[#050409] tracking-tight">
                          {cap.title}
                        </h4>
                      </div>
                      <p className="text-[11px] sm:text-xs text-[#050409]/70 leading-relaxed font-normal">
                        {cap.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom: Mini Flow Strip across the full card */}
            <div className="relative z-10 pt-6 mt-8 border-t border-[#1F4633]/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1F4633]/70">
                  AUTOMATED PIPELINE FLOW
                </span>
                <span className="text-[10px] text-[#050409]/40 font-mono hidden sm:inline-block">
                  Continuous waterfall loop
                </span>
              </div>

              <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
                <div className="min-w-[620px] lg:min-w-0 flex items-center justify-between relative py-2.5 px-3">
                  {/* Track line connecting nodes */}
                  <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#1F4633]/20 z-0" />

                  {/* Traveling glowing dot along the flow line */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#1F4633] shadow-[0_0_8px_#1F4633] z-[5] flow-track-dot motion-reduce:hidden"
                    aria-hidden="true"
                  />

                  {flowNodes.map((node) => (
                    <div
                      key={node.label}
                      className="relative z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1F4633]/15 shadow-2xs select-none"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#1F4633]/10 flex items-center justify-center text-[#1F4633] shrink-0">
                        {node.icon}
                      </div>
                      <span className="text-[11px] font-semibold text-[#050409] tracking-tight whitespace-nowrap">
                        {node.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ROW 2: THREE EQUAL SMALLER CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {smallerCards.map((service: ServiceItem, idx: number) => (
            <motion.div
              key={service.id}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 * (idx + 1), ease: "easeOut" }}
              className={`system-card group relative rounded-[20px] p-6 sm:p-7 border border-[#1F4633]/10 shadow-sm transition-all duration-300 hover:border-[#1F4633]/35 hover:-translate-y-1 hover:shadow-md motion-reduce:transform-none flex flex-col justify-between overflow-hidden ${
                idx === 2 ? "md:col-span-2 lg:col-span-1" : "md:col-span-1"
              }`}
            >
              {/* Card Header & Content */}
              <div>
                {/* Top Badge & Pulsing Status Dot */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-[#1F4633]/70 uppercase">
                    {service.badge || `System 0${idx + 2}`}
                  </span>

                  <div className="relative flex items-center justify-center w-3 h-3">
                    <span className="absolute w-2.5 h-2.5 rounded-full bg-[#1F4633] opacity-35 animate-ping motion-reduce:animate-none" />
                    <span className="relative w-2 h-2 rounded-full bg-[#1F4633]" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#050409] mb-2.5 group-hover:text-[#1F4633] transition-colors leading-snug">
                  {service.title}
                </h3>

                {/* Plain 1-2 line description */}
                <p className="text-xs sm:text-[13px] text-[#050409]/75 leading-relaxed font-normal">
                  {service.description}
                </p>

                {/* MIDDLE MINI VISUALS */}
                {idx === 0 && (
                  /* Visual 1: B2B Lead list building - Three stacked mini lead rows */
                  <div className="my-5 p-3 rounded-xl bg-white/45 border border-[#1F4633]/10 space-y-2">
                    {/* Top Row - Lightly Highlighted */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#1F4633]/25 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#1F4633] text-[#F7F1DB] text-[10px] font-bold flex items-center justify-center shrink-0">
                          JD
                        </div>
                        <div className="space-y-1">
                          <div className="w-20 h-2 bg-[#050409]/80 rounded-full" />
                          <div className="w-12 h-1.5 bg-[#050409]/30 rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        <span className="text-[10px] font-semibold text-[#1F4633]">VP Sales</span>
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/60 border border-[#1F4633]/[0.08]">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#1F4633]/15 text-[#1F4633] text-[10px] font-bold flex items-center justify-center shrink-0">
                          SK
                        </div>
                        <div className="space-y-1">
                          <div className="w-16 h-2 bg-[#050409]/60 rounded-full" />
                          <div className="w-10 h-1.5 bg-[#050409]/25 rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]/50" />
                        <span className="text-[10px] font-medium text-[#050409]/60">Head of Growth</span>
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/40 border border-[#1F4633]/[0.05]">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#1F4633]/10 text-[#1F4633] text-[10px] font-bold flex items-center justify-center shrink-0">
                          AL
                        </div>
                        <div className="space-y-1">
                          <div className="w-14 h-2 bg-[#050409]/50 rounded-full" />
                          <div className="w-8 h-1.5 bg-[#050409]/20 rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]/40" />
                        <span className="text-[10px] font-medium text-[#050409]/50">Founder & CEO</span>
                      </div>
                    </div>
                  </div>
                )}

                {idx === 1 && (
                  /* Visual 2: Cold outbound launch - 3 envelope / inbox icons with rotating highlight */
                  <div className="my-5 p-3 rounded-xl bg-white/45 border border-[#1F4633]/10">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="inbox-box inbox-box-1 p-2.5 rounded-lg flex flex-col items-center gap-1.5 text-center transition-all bg-white border border-[#1F4633]/30 shadow-2xs">
                        <div className="w-7 h-7 rounded-md bg-[#1F4633]/10 flex items-center justify-center text-[#1F4633]">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-bold text-[#050409] tracking-tight">inbox 1</span>
                        <span className="text-[9px] font-medium text-[#10B981] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                          Sending
                        </span>
                      </div>

                      <div className="inbox-box inbox-box-2 p-2.5 rounded-lg flex flex-col items-center gap-1.5 text-center transition-all bg-white/60 border border-[#1F4633]/10">
                        <div className="w-7 h-7 rounded-md bg-[#1F4633]/10 flex items-center justify-center text-[#1F4633]">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-bold text-[#050409] tracking-tight">inbox 2</span>
                        <span className="text-[9px] font-medium text-[#050409]/60 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]/50" />
                          Warmup
                        </span>
                      </div>

                      <div className="inbox-box inbox-box-3 p-2.5 rounded-lg flex flex-col items-center gap-1.5 text-center transition-all bg-white/60 border border-[#1F4633]/10">
                        <div className="w-7 h-7 rounded-md bg-[#1F4633]/10 flex items-center justify-center text-[#1F4633]">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-bold text-[#050409] tracking-tight">inbox 3</span>
                        <span className="text-[9px] font-medium text-[#050409]/60 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]/50" />
                          Ready
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {idx === 2 && (
                  /* Visual 3: Workflow and AI agent automation - 3-node mini flow with traveling dot */
                  <div className="my-5 p-3.5 rounded-xl bg-white/45 border border-[#1F4633]/10 relative overflow-hidden">
                    <div className="flex items-center justify-between relative px-2 py-1">
                      {/* Connecting Line with animated traveling dot */}
                      <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#1F4633]/20 z-0">
                        <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1F4633] shadow-[0_0_6px_#1F4633] mini-flow-travel-dot motion-reduce:hidden" />
                      </div>

                      {/* Node 1: Trigger */}
                      <div className="relative z-10 flex flex-col items-center gap-1 bg-white border border-[#1F4633]/20 px-2.5 py-1.5 rounded-lg shadow-2xs">
                        <Zap className="w-3.5 h-3.5 text-[#EA4B71]" />
                        <span className="text-[10px] font-bold text-[#050409]">Trigger</span>
                      </div>

                      {/* Node 2: AI Step */}
                      <div className="relative z-10 flex flex-col items-center gap-1 bg-white border border-[#1F4633]/20 px-2.5 py-1.5 rounded-lg shadow-2xs">
                        <Bot className="w-3.5 h-3.5 text-[#D97757]" />
                        <span className="text-[10px] font-bold text-[#1F4633]">AI Step</span>
                      </div>

                      {/* Node 3: Action */}
                      <div className="relative z-10 flex flex-col items-center gap-1 bg-white border border-[#1F4633]/20 px-2.5 py-1.5 rounded-lg shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                        <span className="text-[10px] font-bold text-[#050409]">Action</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom: Primary Stack Chips and Text Link */}
              <div className="relative z-10 pt-4 mt-4 border-t border-[#1F4633]/10">
                <div className="mb-2.5">
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#1F4633]/70 block">
                    PRIMARY STACK
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {service.tools.map((rawTool) => {
                    const tool = getToolData(rawTool);
                    return (
                      <div
                        key={tool.id}
                        className="group/chip inline-flex items-center gap-2 h-9 pl-2.5 pr-3.5 bg-white rounded-full border border-[#1F4633]/[0.12] shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 select-none motion-reduce:transform-none"
                      >
                        <div className="w-[18px] h-[18px] flex items-center justify-center flex-shrink-0">
                          <ToolIcon id={tool.id} className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[14px] font-medium text-[#050409] tracking-tight leading-none whitespace-nowrap">
                          {tool.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <a
                  href={service.linkUrl || "#contact"}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1F4633] hover:text-[#050409] transition-colors group/link select-none"
                >
                  <span>{service.linkText || "Learn more"}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1 motion-reduce:transform-none" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scoped CSS for multi-layer smooth gradient & hover transitions */}
      <style jsx>{`
        .featured-system-card {
          background-image:
            radial-gradient(120% 90% at 0% 0%, #FFFFFF 0%, rgba(255, 255, 255, 0) 60%),
            radial-gradient(130% 110% at 100% 100%, rgba(31, 70, 51, 0.18) 0%, rgba(31, 70, 51, 0.08) 45%, rgba(31, 70, 51, 0) 80%),
            radial-gradient(90% 70% at 100% 0%, rgba(247, 241, 219, 0.9) 0%, rgba(247, 241, 219, 0) 70%),
            radial-gradient(90% 70% at 0% 100%, rgba(31, 70, 51, 0.09) 0%, rgba(31, 70, 51, 0) 70%),
            linear-gradient(155deg, #FFFEFA 0%, #F6F5E8 50%, #ECEFDC 100%);
          background-size: 100% 100%;
          background-position: center;
          transition: border-color 300ms ease, transform 300ms ease, box-shadow 300ms ease, background-position 400ms ease;
        }

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
          .featured-system-card:hover,
          .system-card:hover {
            background-position: 10px 10px;
          }
        }

        /* Traveling dot on the featured card flow strip */
        @keyframes flowDotTravel {
          0% {
            left: 24px;
            opacity: 0;
          }
          6% {
            opacity: 1;
          }
          94% {
            opacity: 1;
          }
          100% {
            left: calc(100% - 24px);
            opacity: 0;
          }
        }
        .flow-track-dot {
          animation: flowDotTravel 5.5s ease-in-out infinite;
        }

        /* Traveling dot on Card 3 mini flow */
        @keyframes miniFlowDot {
          0% {
            left: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
        .mini-flow-travel-dot {
          animation: miniFlowDot 3.2s ease-in-out infinite;
        }

        /* Rotating highlight for Card 2 inboxes */
        @keyframes rotateHighlight1 {
          0%, 33.3% {
            border-color: rgba(31, 70, 51, 0.4);
            background-color: #ffffff;
            box-shadow: 0 1px 3px rgba(5, 4, 9, 0.08);
          }
          33.4%, 100% {
            border-color: rgba(31, 70, 51, 0.1);
            background-color: rgba(255, 255, 255, 0.6);
            box-shadow: none;
          }
        }
        @keyframes rotateHighlight2 {
          0%, 33.3% {
            border-color: rgba(31, 70, 51, 0.1);
            background-color: rgba(255, 255, 255, 0.6);
            box-shadow: none;
          }
          33.4%, 66.6% {
            border-color: rgba(31, 70, 51, 0.4);
            background-color: #ffffff;
            box-shadow: 0 1px 3px rgba(5, 4, 9, 0.08);
          }
          66.7%, 100% {
            border-color: rgba(31, 70, 51, 0.1);
            background-color: rgba(255, 255, 255, 0.6);
            box-shadow: none;
          }
        }
        @keyframes rotateHighlight3 {
          0%, 66.6% {
            border-color: rgba(31, 70, 51, 0.1);
            background-color: rgba(255, 255, 255, 0.6);
            box-shadow: none;
          }
          66.7%, 100% {
            border-color: rgba(31, 70, 51, 0.4);
            background-color: #ffffff;
            box-shadow: 0 1px 3px rgba(5, 4, 9, 0.08);
          }
        }
        .inbox-box-1 {
          animation: rotateHighlight1 6s infinite;
        }
        .inbox-box-2 {
          animation: rotateHighlight2 6s infinite;
        }
        .inbox-box-3 {
          animation: rotateHighlight3 6s infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .flow-track-dot,
          .mini-flow-travel-dot,
          .inbox-box-1,
          .inbox-box-2,
          .inbox-box-3 {
            animation: none !important;
          }
          .featured-system-card,
          .system-card {
            transition: none !important;
            background-position: center !important;
          }
        }
      `}</style>
    </section>
  );
}
