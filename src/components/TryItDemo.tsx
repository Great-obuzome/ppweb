"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  Check,
  Building,
  Globe,
  Briefcase,
  Users,
  UserCheck,
  Mail,
  ShieldCheck,
  Cpu,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { tryItContent, generateSampleEnrichment, EnrichedRow } from "@/data/tryIt";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export function TryItDemo() {
  const shouldReduceMotion = useReducedMotion();
  const [inputValue, setInputValue] = useState("Acme Corp");
  const [isEnriching, setIsEnriching] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeWaterfallLog, setActiveWaterfallLog] = useState<string>(
    "Ready to run · 3 waterfall providers queued"
  );
  const [rows, setRows] = useState<EnrichedRow[]>(() => generateSampleEnrichment("Acme Corp"));
  const [visibleRowCount, setVisibleRowCount] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startSimulation = (companyName: string) => {
    if (timerRef.current) clearInterval(timerRef.current);

    const generated = generateSampleEnrichment(companyName);
    setRows(generated);
    setIsEnriching(true);
    setIsComplete(false);
    setProgress(5);
    setVisibleRowCount(0);
    setActiveWaterfallLog("Querying Provider 1 (Apollo.io)...");

    const startTime = Date.now();
    const duration = 6000; // 6 seconds total

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < 1400) {
        setActiveWaterfallLog("Querying Provider 1 (Apollo.io)... checking domain match");
      } else if (elapsed < 2400) {
        setVisibleRowCount(1);
        setActiveWaterfallLog("Provider 1: not found, Provider 2: found (Clay Waterfall)");
      } else if (elapsed < 3800) {
        setVisibleRowCount(2);
        setActiveWaterfallLog("Provider 1: found (Apollo Waterfall) · 98% confidence score");
      } else if (elapsed < 5400) {
        setVisibleRowCount(3);
        setActiveWaterfallLog("Provider 1: not found, Provider 2: found (Dropcontact) · Phone matched");
      } else if (elapsed >= duration) {
        clearInterval(interval);
        setVisibleRowCount(3);
        setProgress(100);
        setIsEnriching(false);
        setIsComplete(true);
        setActiveWaterfallLog("Waterfall complete: 3 verified records found & validated");
      }
    }, 100);

    timerRef.current = interval as unknown as NodeJS.Timeout;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    startSimulation(inputValue);
  };

  const handleExampleClick = (example: string) => {
    setInputValue(example);
    startSimulation(example);
  };

  return (
    <section
      id="try-it"
      className="w-full bg-[#F7F1DB] text-[#050409] py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(31, 70, 51, 0.08) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
      aria-label="Try it demo: Waterfall enrichment simulation"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          theme="light"
          eyebrow={tryItContent.header.eyebrow}
          lead={tryItContent.header.lead}
          accent={tryItContent.header.accent}
          description={tryItContent.header.description}
          bottomSpacing="mb-10 md:mb-12"
        />

        {/* Centered Cream Input Card */}
        <div className="bg-white/85 backdrop-blur-md rounded-[24px] p-6 sm:p-8 border border-[#1F4633]/15 shadow-sm max-w-4xl mx-auto mb-10">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. Acme Corp, Horizon Labs, Nexus AI..."
                className="w-full bg-[#F7F1DB]/50 border border-[#1F4633]/20 rounded-full px-5 py-3.5 text-sm text-[#050409] font-medium placeholder:text-[#050409]/40 focus:outline-none focus:border-[#1F4633] focus:ring-2 focus:ring-[#1F4633]/20 transition-all"
                disabled={isEnriching}
                aria-label="Enter company name to simulate waterfall enrichment"
              />
            </div>

            <button
              type="submit"
              disabled={isEnriching || !inputValue.trim()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#050409] hover:bg-[#1F4633] text-[#F7F1DB] text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-sm cursor-pointer whitespace-nowrap"
            >
              {isEnriching ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-[#F7F1DB] border-t-transparent animate-spin" />
                  <span>Enriching...</span>
                </>
              ) : isComplete ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Re-run</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run enrichment</span>
                </>
              )}
            </button>
          </form>

          {/* Preset Example Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-[#1F4633]/10">
            <span className="text-xs font-semibold text-[#050409]/60">Try an example:</span>
            {tryItContent.examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => handleExampleClick(example)}
                disabled={isEnriching}
                className="px-3 py-1 rounded-full bg-[#1F4633]/8 hover:bg-[#1F4633]/15 text-[#1F4633] text-xs font-semibold tracking-tight transition-colors border border-[#1F4633]/12 disabled:opacity-50 cursor-pointer"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Clay-Style Waterfall Spreadsheet Container */}
        <div className="bg-white rounded-2xl border border-[#1F4633]/20 shadow-md overflow-hidden mb-6">
          {/* Top Status & Waterfall Indicator Bar */}
          <div className="bg-[#FAF6E9] px-5 py-3 border-b border-[#1F4633]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="relative flex h-2 w-2 shrink-0">
                {isEnriching ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1F4633] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1F4633]" />
                  </>
                ) : isComplete ? (
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1F4633]" />
                ) : (
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#050409]/30" />
                )}
              </span>
              <span className="text-xs font-mono font-medium text-[#050409]/85 truncate">
                {activeWaterfallLog}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono font-bold text-[#1F4633]">
                {progress}%
              </span>
              <div className="w-24 sm:w-32 h-2 bg-[#050409]/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#1F4633] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.1 }}
                />
              </div>
            </div>
          </div>

          {/* Horizontally Scrollable Table Container */}
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[940px]">
              <thead>
                <tr className="bg-[#FAF6E9]/60 border-b border-[#1F4633]/15 text-[11px] font-bold text-[#050409]/70 uppercase tracking-wider">
                  <th className="py-3 px-4 border-r border-[#1F4633]/10">
                    <div className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-[#1F4633]" />
                      <span>Company</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 border-r border-[#1F4633]/10">
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#1F4633]" />
                      <span>Website</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 border-r border-[#1F4633]/10">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#1F4633]" />
                      <span>Industry</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 border-r border-[#1F4633]/10">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#1F4633]" />
                      <span>Headcount</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 border-r border-[#1F4633]/10">
                    <div className="flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-[#1F4633]" />
                      <span>Decision maker</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 border-r border-[#1F4633]/10">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#1F4633]" />
                      <span>Work email</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 border-r border-[#1F4633]/10">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#1F4633]" />
                      <span>Email status</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 border-r border-[#1F4633]/10">
                    <div className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#1F4633]" />
                      <span>Tech stack</span>
                    </div>
                  </th>
                  <th className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-[#1F4633]" />
                      <span>Funding</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F4633]/10 text-xs text-[#050409]">
                {rows.map((row, index) => {
                  const isRowVisible = visibleRowCount > index || isComplete;
                  const isCurrentEnriching = isEnriching && visibleRowCount === index;

                  return (
                    <tr
                      key={row.id}
                      className={`transition-colors duration-150 ${
                        isCurrentEnriching
                          ? "bg-[#1F4633]/5"
                          : index % 2 === 0
                          ? "bg-white"
                          : "bg-[#FAF6E9]/30"
                      }`}
                    >
                      {/* 1. Company */}
                      <td className="py-3.5 px-4 font-bold border-r border-[#1F4633]/10 whitespace-nowrap">
                        {isRowVisible ? (
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-[#1F4633]/10 text-[#1F4633] text-[10px] font-bold flex items-center justify-center">
                              {row.company.slice(0, 2).toUpperCase()}
                            </span>
                            <span>{row.company}</span>
                          </div>
                        ) : isCurrentEnriching ? (
                          <div className="w-24 h-4 rounded bg-[#1F4633]/10 animate-pulse" />
                        ) : (
                          <span className="text-[#050409]/30">—</span>
                        )}
                      </td>

                      {/* 2. Website */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#050409]/80 border-r border-[#1F4633]/10 whitespace-nowrap">
                        {isRowVisible ? (
                          row.website
                        ) : isCurrentEnriching ? (
                          <div className="w-28 h-4 rounded bg-[#1F4633]/10 animate-pulse" />
                        ) : (
                          <span className="text-[#050409]/30">—</span>
                        )}
                      </td>

                      {/* 3. Industry */}
                      <td className="py-3.5 px-4 border-r border-[#1F4633]/10 whitespace-nowrap">
                        {isRowVisible ? (
                          <span className="px-2 py-0.5 rounded-md bg-[#1F4633]/8 text-[#1F4633] font-medium text-[11px]">
                            {row.industry}
                          </span>
                        ) : isCurrentEnriching ? (
                          <div className="w-20 h-4 rounded bg-[#1F4633]/10 animate-pulse" />
                        ) : (
                          <span className="text-[#050409]/30">—</span>
                        )}
                      </td>

                      {/* 4. Headcount */}
                      <td className="py-3.5 px-4 border-r border-[#1F4633]/10 whitespace-nowrap text-[#050409]/80">
                        {isRowVisible ? (
                          row.headcount
                        ) : isCurrentEnriching ? (
                          <div className="w-16 h-4 rounded bg-[#1F4633]/10 animate-pulse" />
                        ) : (
                          <span className="text-[#050409]/30">—</span>
                        )}
                      </td>

                      {/* 5. Decision Maker */}
                      <td className="py-3.5 px-4 border-r border-[#1F4633]/10 whitespace-nowrap">
                        {isRowVisible ? (
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#050409] text-[#F7F1DB] text-[9px] font-bold flex items-center justify-center">
                              {row.decisionMaker.avatar}
                            </span>
                            <div>
                              <div className="font-bold text-[#050409]">
                                {row.decisionMaker.name}
                              </div>
                              <div className="text-[10px] text-[#050409]/60">
                                {row.decisionMaker.title}
                              </div>
                            </div>
                          </div>
                        ) : isCurrentEnriching ? (
                          <div className="w-28 h-4 rounded bg-[#1F4633]/10 animate-pulse" />
                        ) : (
                          <span className="text-[#050409]/30">—</span>
                        )}
                      </td>

                      {/* 6. Work Email */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#1F4633] font-semibold border-r border-[#1F4633]/10 whitespace-nowrap">
                        {isRowVisible ? (
                          row.workEmail
                        ) : isCurrentEnriching ? (
                          <div className="w-32 h-4 rounded bg-[#1F4633]/10 animate-pulse" />
                        ) : (
                          <span className="text-[#050409]/30">—</span>
                        )}
                      </td>

                      {/* 7. Email Status */}
                      <td className="py-3.5 px-4 border-r border-[#1F4633]/10 whitespace-nowrap">
                        {isRowVisible ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1F4633]/10 text-[#1F4633] text-[10px] font-bold border border-[#1F4633]/20">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>{row.emailConfidence}</span>
                          </span>
                        ) : isCurrentEnriching ? (
                          <div className="w-20 h-4 rounded bg-[#1F4633]/10 animate-pulse" />
                        ) : (
                          <span className="text-[#050409]/30">—</span>
                        )}
                      </td>

                      {/* 8. Tech Stack */}
                      <td className="py-3.5 px-4 border-r border-[#1F4633]/10 whitespace-nowrap">
                        {isRowVisible ? (
                          <div className="flex items-center gap-1">
                            {row.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="px-1.5 py-0.5 rounded bg-black/5 text-[#050409]/80 text-[10px] font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        ) : isCurrentEnriching ? (
                          <div className="w-24 h-4 rounded bg-[#1F4633]/10 animate-pulse" />
                        ) : (
                          <span className="text-[#050409]/30">—</span>
                        )}
                      </td>

                      {/* 9. Funding */}
                      <td className="py-3.5 px-4 whitespace-nowrap font-medium text-[#050409]/80">
                        {isRowVisible ? (
                          row.funding
                        ) : isCurrentEnriching ? (
                          <div className="w-16 h-4 rounded bg-[#1F4633]/10 animate-pulse" />
                        ) : (
                          <span className="text-[#050409]/30">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Bottom Disclaimer Row */}
          <div className="bg-[#FAF6E9]/40 px-5 py-2.5 border-t border-[#1F4633]/10 flex items-center justify-between text-[11px] text-[#050409]/60">
            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-[#1F4633]" />
              <span>{tryItContent.disclaimer}</span>
            </div>
            <span className="hidden sm:inline font-mono text-[10px] text-[#050409]/45">
              Client-side simulated waterfall
            </span>
          </div>
        </div>

        {/* Completion CTA Banner */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              className="mt-8 p-6 sm:p-8 rounded-[24px] bg-gradient-to-r from-[#1F4633] to-[#122b1f] text-[#F7F1DB] flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-lg border border-[#8DBF9F]/20 select-none"
            >
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#8DBF9F] stroke-[3]" />
                  <h4 className="text-lg font-bold tracking-tight text-[#F7F1DB]">
                    {tryItContent.completion.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#F7F1DB]/75 leading-relaxed max-w-xl">
                  {tryItContent.completion.description}
                </p>
              </div>

              <a
                href={tryItContent.completion.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#F7F1DB] hover:bg-[#8DBF9F] text-[#050409] text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md shrink-0"
              >
                <span>{tryItContent.completion.buttonLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
