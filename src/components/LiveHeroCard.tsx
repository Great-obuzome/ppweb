"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

interface LeadItem {
  id: number;
  code: string;
  avatar: string;
  stage: 0 | 1 | 2; // 0: Enriched, 1: Scored, 2: Booked
}

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export function LiveHeroCard() {
  const shouldReduceMotion = useReducedMotion();

  // Initial 3 staggered sample leads
  const [leads, setLeads] = useState<LeadItem[]>([
    { id: 139, code: "Lead 0139", avatar: "L9", stage: 2 },
    { id: 140, code: "Lead 0140", avatar: "L0", stage: 1 },
    { id: 141, code: "Lead 0141", avatar: "L1", stage: 0 },
  ]);

  const [counters, setCounters] = useState({
    enriched: 28,
    scored: 19,
    booked: 7,
  });

  const [nextId, setNextId] = useState(142);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeads((prev) => {
        // Step 1: Remove lead that completed stage 2
        // Step 2: Advance remaining leads to next stage
        // Step 3: Add new lead at stage 0 (max 3 visible)
        const updated = prev
          .filter((l) => l.stage < 2)
          .map((l) => ({
            ...l,
            stage: (l.stage + 1) as 0 | 1 | 2,
          }));

        const newLead: LeadItem = {
          id: nextId,
          code: `Lead 0${nextId}`,
          avatar: `L${nextId % 10}`,
          stage: 0,
        };

        return [...updated, newLead].slice(-3);
      });

      // Tick counters up
      setCounters((c) => ({
        enriched: c.enriched + 1,
        scored: c.scored + 1,
        booked: c.booked + 1,
      }));

      setNextId((id) => (id >= 999 ? 100 : id + 1));
    }, 2500);

    return () => clearInterval(interval);
  }, [nextId]);

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.7,
        delay: shouldReduceMotion ? 0 : 0.9,
        ease: EASE_OUT_EXPO,
      }}
      className="live-hero-card w-[280px] rounded-[20px] p-3.5 shadow-lg select-none"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.70)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(31, 70, 51, 0.12)",
        boxShadow: "0 10px 30px rgba(5, 4, 9, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
      }}
      suppressHydrationWarning
    >
      {/* Top Header: Pulsing dot, "Pipeline, live", "Sample data" */}
      <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-[#1F4633]/10">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1F4633] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1F4633]" />
          </span>
          <span className="text-[11px] font-bold tracking-tight text-[#050409]">Pipeline, live</span>
        </div>
        <span className="text-[9px] font-semibold tracking-wider uppercase text-[#050409]/45">Sample data</span>
      </div>

      {/* Three Columns: Enriched, Scored, Meeting booked */}
      <div className="grid grid-cols-3 gap-1.5">
        {/* Column 1: Enriched */}
        <div className="flex flex-col bg-white/50 rounded-xl p-1.5 min-h-[68px] border border-[#1F4633]/8">
          <div className="flex items-center justify-between mb-1.5 px-0.5">
            <span className="text-[9px] font-bold text-[#050409]/70 uppercase tracking-tight truncate">Enriched</span>
            <span className="text-[9px] font-bold text-[#1F4633] tabular-nums">{counters.enriched}</span>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            {leads
              .filter((l) => l.stage === 0)
              .map((lead) => (
                <motion.div
                  layoutId={`lead-card-${lead.id}`}
                  key={lead.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                  className="bg-white rounded-lg px-1.5 py-1 shadow-2xs border border-[#1F4633]/15 flex items-center gap-1"
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#1F4633]/10 text-[#1F4633] text-[8px] font-bold flex items-center justify-center shrink-0">
                    {lead.avatar}
                  </span>
                  <span className="text-[9px] font-semibold text-[#050409] tracking-tight truncate">
                    {lead.code}
                  </span>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Column 2: Scored */}
        <div className="flex flex-col bg-white/50 rounded-xl p-1.5 min-h-[68px] border border-[#1F4633]/8">
          <div className="flex items-center justify-between mb-1.5 px-0.5">
            <span className="text-[9px] font-bold text-[#050409]/70 uppercase tracking-tight truncate">Scored</span>
            <span className="text-[9px] font-bold text-[#1F4633] tabular-nums">{counters.scored}</span>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            {leads
              .filter((l) => l.stage === 1)
              .map((lead) => (
                <motion.div
                  layoutId={`lead-card-${lead.id}`}
                  key={lead.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                  className="bg-white rounded-lg px-1.5 py-1 shadow-2xs border border-[#1F4633]/15 flex items-center gap-1"
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#1F4633]/10 text-[#1F4633] text-[8px] font-bold flex items-center justify-center shrink-0">
                    {lead.avatar}
                  </span>
                  <span className="text-[9px] font-semibold text-[#050409] tracking-tight truncate">
                    {lead.code}
                  </span>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Column 3: Meeting booked */}
        <div className="flex flex-col bg-white/50 rounded-xl p-1.5 min-h-[68px] border border-[#1F4633]/8">
          <div className="flex items-center justify-between mb-1.5 px-0.5">
            <span className="text-[9px] font-bold text-[#050409]/70 uppercase tracking-tight truncate">Booked</span>
            <span className="text-[9px] font-bold text-[#1F4633] tabular-nums">{counters.booked}</span>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            {leads
              .filter((l) => l.stage === 2)
              .map((lead) => (
                <motion.div
                  layoutId={`lead-card-${lead.id}`}
                  key={lead.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                  className="bg-white rounded-lg px-1.5 py-1 shadow-2xs border border-[#1F4633]/15 flex items-center justify-between gap-1"
                >
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#1F4633]/10 text-[#1F4633] text-[8px] font-bold flex items-center justify-center shrink-0">
                      {lead.avatar}
                    </span>
                    <span className="text-[9px] font-semibold text-[#050409] tracking-tight truncate">
                      {lead.code}
                    </span>
                  </div>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.25, 1] }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-3.5 h-3.5 rounded-full bg-[#1F4633] text-white flex items-center justify-center shrink-0"
                  >
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </motion.span>
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .live-hero-card {
          animation: gentleFloat 5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .live-hero-card {
            animation: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
