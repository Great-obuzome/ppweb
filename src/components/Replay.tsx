"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Check,
  Calendar,
  Sparkles,
  Zap,
  Mail,
  ShieldCheck,
  TrendingUp,
  Building2,
  User,
  ArrowRight,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { replayData, ReplayNode, ReplayLeadState } from "@/data/replay";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export function Replay() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 5 | 20>(5); // default 5x for brisk engaging demo
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);

  const { header, nodes, leadStates } = replayData;
  const totalSteps = nodes.length;

  // Base step durations: 1x = 9000ms (~54s total), 5x = 2000ms, 20x = 600ms
  const getStepDuration = useCallback(() => {
    if (speed === 1) return 9000;
    if (speed === 5) return 2000;
    return 600;
  }, [speed]);

  // Autoplay once scrolled into view
  useEffect(() => {
    if (isInView && !hasAutoPlayed) {
      setIsPlaying(true);
      setHasAutoPlayed(true);
    }
  }, [isInView, hasAutoPlayed]);

  // Step advancement timer loop
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      setActiveStep((prev) => {
        if (prev >= totalSteps - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, getStepDuration());

    return () => clearTimeout(timer);
  }, [isPlaying, activeStep, totalSteps, getStepDuration]);

  // Control handlers
  const handleTogglePlay = () => {
    if (activeStep >= totalSteps - 1 && !isPlaying) {
      // If at the end, restart from step 0
      setActiveStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((p) => !p);
    }
  };

  const handleReplay = () => {
    setActiveStep(0);
    setIsPlaying(true);
  };

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsPlaying(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleTogglePlay();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveStep((prev) => Math.min(totalSteps - 1, prev + 1));
      setIsPlaying(false);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveStep((prev) => Math.max(0, prev - 1));
      setIsPlaying(false);
    }
  };

  const currentState: ReplayLeadState = leadStates[activeStep] || leadStates[0];

  return (
    <section
      ref={sectionRef}
      id="replay"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-full bg-[#050409] text-[#F7F1DB] py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden focus:outline-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(247, 241, 219, 0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
      aria-label="How it runs: Watch a lead become a meeting"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          theme="dark"
          eyebrow={header.eyebrow}
          lead={header.lead}
          accent={header.accent}
          description={header.description}
          bottomSpacing="mb-10 md:mb-14"
        />

        {/* DESKTOP TIMELINE (768px and up) */}
        <div className="hidden md:block relative mb-10 select-none">
          {/* Background Connecting Rail Line */}
          <div className="absolute top-[28px] left-[6%] right-[6%] h-[2px] bg-white/10 z-0" />

          {/* Active Progress Filled Line */}
          <motion.div
            className="absolute top-[28px] left-[6%] h-[2px] bg-[#8DBF9F] z-0 origin-left"
            style={{
              width: `${(activeStep / (totalSteps - 1)) * 88}%`,
            }}
            transition={{
              duration: shouldReduceMotion ? 0.1 : 0.4,
              ease: EASE_OUT_EXPO,
            }}
          />

          {/* Traveling Glow Dot on Line */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute top-[23px] w-3 h-3 rounded-full bg-[#8DBF9F] shadow-[0_0_12px_#8DBF9F] z-10 pointer-events-none"
              style={{
                left: `calc(6% + ${(activeStep / (totalSteps - 1)) * 88}% - 6px)`,
              }}
              transition={{
                duration: shouldReduceMotion ? 0.1 : 0.45,
                ease: EASE_OUT_EXPO,
              }}
            />
          )}

          {/* 6 Node Cards Grid */}
          <div className="grid grid-cols-6 gap-3 lg:gap-4 relative z-10">
            {nodes.map((node: ReplayNode, index: number) => {
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;

              return (
                <button
                  key={node.id}
                  onClick={() => handleStepClick(index)}
                  className={`flex flex-col items-center text-center p-3.5 rounded-2xl transition-all duration-300 group cursor-pointer text-left relative focus:outline-none focus:ring-1 focus:ring-[#8DBF9F] ${
                    isActive
                      ? "bg-[#0d1611] border-2 border-[#8DBF9F] shadow-[0_0_24px_rgba(141,191,159,0.30)] scale-[1.03]"
                      : isCompleted
                      ? "bg-[#0a100d]/90 border border-[#8DBF9F]/35 opacity-90 hover:opacity-100"
                      : "bg-[#070b09]/80 border border-white/10 opacity-55 hover:opacity-85 hover:border-white/20"
                  }`}
                  aria-label={`Step ${node.stepNumber}: ${node.label}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  {/* Tool Icon Circle */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center p-2.5 mb-3 transition-transform duration-200 group-hover:scale-105 relative ${
                      isActive
                        ? "bg-[#1F4633] shadow-[0_0_16px_rgba(141,191,159,0.5)]"
                        : isCompleted
                        ? "bg-[#1F4633]/50 border border-[#8DBF9F]/40"
                        : "bg-white/5 border border-white/10"
                    }`}
                  >
                    <div className="w-7 h-7 relative flex items-center justify-center">
                      <Image
                        src={node.toolLogo}
                        alt={node.toolName}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>

                    {/* Completed Check Badge */}
                    {isCompleted && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#8DBF9F] text-[#050409] flex items-center justify-center shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}

                    {/* Active Step Pulse Ring */}
                    {isActive && (
                      <span className="absolute -inset-1 rounded-full border border-[#8DBF9F] animate-ping opacity-35 pointer-events-none" />
                    )}
                  </div>

                  {/* Step Number & Label */}
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${
                      isActive ? "text-[#8DBF9F]" : "text-[#F7F1DB]/50"
                    }`}
                  >
                    0{node.stepNumber} · {node.toolName}
                  </span>
                  <h4
                    className={`text-sm font-bold tracking-tight mb-1.5 ${
                      isActive ? "text-[#F7F1DB]" : "text-[#F7F1DB]/85"
                    }`}
                  >
                    {node.label}
                  </h4>
                  <p className="text-[11px] leading-[1.35] text-[#F7F1DB]/55 line-clamp-2">
                    {node.shortDesc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* MOBILE TIMELINE (Vertical stack below 768px) */}
        <div className="md:hidden relative mb-8 space-y-2.5 pl-6 select-none">
          {/* Vertical Connecting Line */}
          <div className="absolute top-4 bottom-4 left-3 w-[2px] bg-white/10" />
          <motion.div
            className="absolute top-4 left-3 w-[2px] bg-[#8DBF9F] origin-top"
            style={{
              height: `${(activeStep / (totalSteps - 1)) * 92}%`,
            }}
          />

          {nodes.map((node: ReplayNode, index: number) => {
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;

            return (
              <button
                key={`mob-node-${node.id}`}
                onClick={() => handleStepClick(index)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all relative ${
                  isActive
                    ? "bg-[#0d1611] border-[#8DBF9F] shadow-[0_0_18px_rgba(141,191,159,0.25)]"
                    : isCompleted
                    ? "bg-[#090f0c] border-[#8DBF9F]/30 opacity-90"
                    : "bg-[#070b09] border-white/10 opacity-55"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center p-2 shrink-0 ${
                    isActive
                      ? "bg-[#1F4633] ring-2 ring-[#8DBF9F]"
                      : isCompleted
                      ? "bg-[#1F4633]/60"
                      : "bg-white/5"
                  }`}
                >
                  <Image
                    src={node.toolLogo}
                    alt={node.toolName}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8DBF9F]">
                      Step 0{node.stepNumber} · {node.toolName}
                    </span>
                    {isCompleted && (
                      <span className="w-4 h-4 rounded-full bg-[#8DBF9F] text-[#050409] flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-[#F7F1DB] truncate">{node.label}</div>
                  <div className="text-[10px] text-[#F7F1DB]/55 truncate">{node.shortDesc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* LIVE LEAD CARD (Updating per Step) */}
        <div className="relative bg-[#090e0b]/95 backdrop-blur-xl border border-[#8DBF9F]/20 rounded-2xl p-5 sm:p-8 shadow-2xl mb-8">
          {/* Card Header Row */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8DBF9F] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8DBF9F]" />
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#F7F1DB] tracking-wide">
                Lead Record:{" "}
                <span className="text-[#8DBF9F]">{currentState.company.name}</span>
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#1F4633]/70 text-[#8DBF9F] text-[10px] font-semibold border border-[#8DBF9F]/25">
                {currentState.badge}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F7F1DB]/40">
                Step 0{activeStep + 1} of 06
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-[#F7F1DB]/50">
                Sample data
              </span>
            </div>
          </div>

          {/* Dynamic Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`lead-step-${activeStep}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
              className="space-y-5"
            >
              {/* Profile Bar: Company & Target Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/8">
                {/* Target Contact */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1F4633] text-[#8DBF9F] font-bold text-sm flex items-center justify-center shrink-0 border border-[#8DBF9F]/30 shadow-inner">
                    {currentState.contact.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-[#F7F1DB] truncate">
                      {currentState.contact.name}
                    </div>
                    <div className="text-xs text-[#F7F1DB]/60 truncate">
                      {currentState.contact.title} · {currentState.company.name}
                    </div>
                  </div>
                </div>

                {/* Company & Domain */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 text-[#F7F1DB]/70 flex items-center justify-center shrink-0 border border-white/10">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#F7F1DB]">
                      {currentState.company.domain}
                    </div>
                    <div className="text-[11px] text-[#F7F1DB]/50 truncate">
                      {currentState.company.industry} · {currentState.company.size} ·{" "}
                      {currentState.company.funding}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step Specific Inspection Panel */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#0e1712] border border-[#8DBF9F]/20">
                {/* STEP 0: Trigger */}
                {activeStep === 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#8DBF9F] uppercase tracking-wider">
                      <Zap className="w-4 h-4 text-[#8DBF9F]" />
                      <span>Signal Trigger Detected</span>
                    </div>
                    <p className="text-sm text-[#F7F1DB]/90 leading-relaxed">
                      Executive promotion webhook fired:{" "}
                      <span className="font-semibold text-[#8DBF9F]">
                        Alex Mercer appointed VP of Sales
                      </span>{" "}
                      at Apex Dynamics. Signal matched priority ICP filter within 14 days of job
                      start.
                    </p>
                    <div className="inline-flex items-center gap-2 text-xs text-[#F7F1DB]/60 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 font-mono">
                      <span>Source: LinkedIn Sales Navigator & Intent Webhook</span>
                    </div>
                  </div>
                )}

                {/* STEP 1: Enrich */}
                {activeStep === 1 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#8DBF9F] uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-[#8DBF9F]" />
                      <span>Multi-Source Waterfall Enrichment</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-[#8DBF9F]/20">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-[#8DBF9F]" />
                          <span className="text-xs font-mono text-[#F7F1DB]">
                            {currentState.contact.email}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#8DBF9F] bg-[#1F4633]/60 px-2 py-0.5 rounded">
                          <Check className="w-3 h-3 stroke-[3]" /> Verified (99%)
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-[#8DBF9F]/20">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#8DBF9F]" />
                          <span className="text-xs font-mono text-[#F7F1DB]">
                            {currentState.contact.phone}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#8DBF9F] bg-[#1F4633]/60 px-2 py-0.5 rounded">
                          <Check className="w-3 h-3 stroke-[3]" /> Direct Mobile
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Score */}
                {activeStep === 2 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#8DBF9F] uppercase tracking-wider">
                        <TrendingUp className="w-4 h-4 text-[#8DBF9F]" />
                        <span>Account ICP & Buying Intent Fit</span>
                      </div>
                      <span className="text-sm font-bold text-[#8DBF9F]">
                        {currentState.score?.value} / 100 · Tier A Priority
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#1F4633] via-[#8DBF9F] to-[#8DBF9F] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${currentState.score?.value}%` }}
                        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                      />
                    </div>
                    <p className="text-xs text-[#F7F1DB]/75 leading-relaxed">
                      Criteria validated: B2B FinTech SaaS, $15M-$50M ARR bracket, hiring 6+ SDRs,
                      actively using HubSpot & Apollo.{" "}
                      <span className="text-[#8DBF9F] font-semibold">Immediate outreach qualified.</span>
                    </p>
                  </div>
                )}

                {/* STEP 3: Personalize */}
                {activeStep === 3 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#8DBF9F] uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-[#8DBF9F]" />
                        <span>Claude Agent Contextual Opener</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#F7F1DB]/50">
                        Angle: Team Scaling & Domain Safety
                      </span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-black/50 border border-white/10 font-sans space-y-2">
                      <div className="text-[11px] font-mono text-[#8DBF9F]">
                        Subject: {currentState.opener?.subject}
                      </div>
                      <p className="text-xs sm:text-sm text-[#F7F1DB]/90 leading-relaxed italic">
                        "{currentState.opener?.body}"
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP 4: Send */}
                {activeStep === 4 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#8DBF9F] uppercase tracking-wider">
                        <Mail className="w-4 h-4 text-[#8DBF9F]" />
                        <span>Outbound Mailbox Dispatch</span>
                      </div>
                      <span className="text-xs font-bold text-[#8DBF9F] bg-[#1F4633]/70 px-2.5 py-0.5 rounded-full border border-[#8DBF9F]/30">
                        {currentState.dispatch?.statusText}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/10">
                        <span className="text-[10px] text-[#F7F1DB]/50 uppercase tracking-wider block">
                          Sending Mailbox
                        </span>
                        <span className="text-xs font-mono text-[#F7F1DB]">
                          {currentState.dispatch?.inboxNumber}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-[#F7F1DB]/50 uppercase tracking-wider block">
                            Domain Health
                          </span>
                          <span className="text-xs font-bold text-[#8DBF9F]">
                            {currentState.dispatch?.domainHealth}
                          </span>
                        </div>
                        <ShieldCheck className="w-5 h-5 text-[#8DBF9F]" />
                      </div>
                    </div>
                    <div className="text-[11px] text-[#F7F1DB]/60 flex items-center gap-1.5 font-mono">
                      <Check className="w-3.5 h-3.5 text-[#8DBF9F]" />
                      <span>{currentState.dispatch?.auth}</span>
                    </div>
                  </div>
                )}

                {/* STEP 5: Meeting booked */}
                {activeStep === 5 && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#8DBF9F] uppercase tracking-wider">
                        <Calendar className="w-4 h-4 text-[#8DBF9F]" />
                        <span>Calendar Invite Confirmed</span>
                      </div>
                      <span className="text-xs font-bold text-[#8DBF9F] bg-[#1F4633] px-3 py-0.5 rounded-full border border-[#8DBF9F]">
                        Meeting Booked
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-r from-[#1F4633]/50 to-[#0e1712] border border-[#8DBF9F]/35 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#8DBF9F] text-[#050409] flex items-center justify-center font-bold">
                          <Calendar className="w-5 h-5 stroke-[2.5]" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#F7F1DB]">
                            {currentState.booking?.time}
                          </div>
                          <div className="text-xs text-[#8DBF9F]">
                            {currentState.booking?.format}
                          </div>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-xs font-bold text-[#F7F1DB]">
                          {currentState.booking?.dealValue}
                        </div>
                        <div className="text-[11px] text-[#F7F1DB]/60">
                          {currentState.booking?.crmDeal}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-[#8DBF9F] flex items-center gap-1.5 font-medium">
                      <Check className="w-4 h-4 text-[#8DBF9F] stroke-[3]" />
                      <span>{currentState.booking?.status}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CONTROLS BAR: Play/Pause, Replay, Speed, Scrub Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 select-none">
          {/* Left: Play/Pause & Replay Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleTogglePlay}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8DBF9F] hover:bg-[#a6d1b4] text-[#050409] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              aria-label={isPlaying ? "Pause replay" : "Play replay"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{activeStep >= totalSteps - 1 ? "Play Again" : "Play"}</span>
                </>
              )}
            </button>

            <button
              onClick={handleReplay}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 text-[#F7F1DB]/80 hover:text-[#F7F1DB] text-xs font-semibold tracking-wider transition-colors cursor-pointer"
              aria-label="Restart from step 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay</span>
            </button>
          </div>

          {/* Center: Step Scrub Bar */}
          <div className="w-full sm:w-auto flex-1 max-w-md mx-2 flex items-center gap-1.5">
            {nodes.map((_, i: number) => (
              <button
                key={`scrub-${i}`}
                onClick={() => handleStepClick(i)}
                className={`flex-1 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                  i === activeStep
                    ? "bg-[#8DBF9F] shadow-[0_0_8px_#8DBF9F]"
                    : i < activeStep
                    ? "bg-[#8DBF9F]/50"
                    : "bg-white/10 hover:bg-white/20"
                }`}
                aria-label={`Scrub to step ${i + 1}`}
              />
            ))}
          </div>

          {/* Right: Speed Toggle (1x / 5x / 20x) */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F7F1DB]/40 px-2">
              Speed:
            </span>
            {([1, 5, 20] as const).map((s) => (
              <button
                key={`speed-${s}`}
                onClick={() => setSpeed(s)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
                  speed === s
                    ? "bg-[#8DBF9F] text-[#050409]"
                    : "text-[#F7F1DB]/60 hover:text-[#F7F1DB]"
                }`}
                aria-label={`Set playback speed to ${s}x`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
