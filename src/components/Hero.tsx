"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteContent, ToolItem } from "@/data/content";
import { ToolIcon } from "./ToolIcon";
import { WorkflowCanvas } from "./WorkflowCanvas";
import { ArrowUpRight } from "lucide-react";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { hero, tools } = siteContent;
  const shouldReduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [rotationReady, setRotationReady] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [ringSize, setRingSize] = useState(640);
  const containerRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const [contentScale, setContentScale] = useState(1);

  // Start the ring's rotation only after the last tile lands (~1.35s - 1.4s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setRotationReady(true);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  // Responsive single square dimension: --ring: clamp(520px, min(62vw, 86vh), 780px)
  // Scale down gracefully on shorter screens (down to 640px) to prevent clipping navbar (~75px) & works-with (~55px)
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const computed = Math.min(vw * 0.62, vh * 0.86);
      const maxVerticalFit = vh - 116; // navbar ~72px + worksWith ~36px + 8px padding
      const target = Math.min(computed, maxVerticalFit > 520 ? maxVerticalFit : Math.max(520, maxVerticalFit));
      const clamped = Math.max(520, Math.min(target, 780));
      setRingSize(clamped);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Bounding-box collision check: ensure text block sits strictly within safe radius (R - tileSize/2 - 24px)
  useEffect(() => {
    if (!textBlockRef.current) return;
    const rect = textBlockRef.current.getBoundingClientRect();
    const radius = (ringSize - 58) / 2;
    const safeRadius = radius - 29 - 24; // inner edge minus 24px clearance
    const halfH = rect.height / 2;
    const halfW = rect.width / 2;
    const cornerDist = Math.sqrt(halfW * halfW + halfH * halfH);

    if (cornerDist > safeRadius || halfH > safeRadius - 10) {
      const neededScale = (safeRadius - 8) / Math.max(halfH + 10, cornerDist);
      const target = Math.max(0.78, Number(neededScale.toFixed(2)));
      setContentScale((prev) => (Math.abs(prev - target) > 0.02 ? target : prev));
    } else {
      setContentScale((prev) => (prev !== 1 ? 1 : prev));
    }
  }, [ringSize]);

  // Subtle mouse-parallax on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 8, y: y * 8 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Color-alternated list of 16 tools around the ring
  const orderedToolIds = [
    "clay", // Purple / Indigo
    "hubspot", // Orange
    "instantly", // Electric Blue
    "claude", // Terracotta
    "salesforce", // Light Blue
    "zapier", // Vermilion
    "n8n", // Coral / Pink
    "google-sheets", // Green
    "smartlead", // Violet
    "apollo", // Yellow / Black
    "make", // Purple
    "slack", // 4-color mark
    "metabase", // Cyan / Blue
    "openai", // Black
    "linkedin-sales-nav", // Royal Blue
    "notion", // Black
  ];

  const ringTools: ToolItem[] = orderedToolIds
    .map((id) => tools.find((t) => t.id === id))
    .filter((t): t is ToolItem => Boolean(t));

  const totalTiles = ringTools.length;

  // Single circle radius: R = (ringSize - averageTileSize) / 2
  // With tileSize ~58px, R sits exactly on the track
  const baseTileSize = 58;
  const radius = (ringSize - baseTileSize) / 2;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        minHeight: "calc(100vh - 5rem)",
      }}
      className="relative w-full flex flex-col justify-between items-center px-4 sm:px-6 select-none bg-[#F7F1DB] overflow-hidden"
    >
      {/* SECTION 3: Workflow-style Background Canvas (dotted grid + corner node graph) */}
      <WorkflowCanvas />

      {/* Top spacer */}
      <div className="w-full h-1" />

      {/* Main Center Stage: Perfect Circular Tool Ring & Center-Aligned Text Block */}
      <div className="relative w-full max-w-7xl flex-1 flex items-center justify-center z-10 py-2 my-auto">
        
        {/* Relative Anchor Box sized exactly to the text block so the Ring is centered on the text block */}
        <div className="relative flex items-center justify-center">

          {/* DESKTOP PERFECT CIRCLE TOOL ORBIT RING (Centered on the text block) */}
          <div
            className="hidden md:block absolute top-1/2 left-1/2 pointer-events-none transition-transform duration-500 ease-out z-0"
            style={{
              transform: `translate(calc(-50% + ${mouseOffset.x}px), calc(-50% + ${mouseOffset.y}px))`,
              width: `${ringSize}px`,
              height: `${ringSize}px`,
            }}
          >
            {/* Subtle guide orbit track (perfect circle, border-radius: 50%, aspect-ratio: 1) */}
            <motion.div
              className="absolute inset-0 rounded-full border border-[#1F4633]/12 pointer-events-none"
              style={{
                width: "100%",
                height: "100%",
                aspectRatio: "1 / 1",
              }}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0.2 : 0.6,
                delay: shouldReduceMotion ? 0 : 0.3,
                ease: EASE_OUT_EXPO,
              }}
              suppressHydrationWarning
            />

            {/* Rotating Circle Orbit Layer (90s linear infinite, starts after last tile lands at 1.4s) */}
            <div
              className="absolute inset-0 rounded-full pointer-events-auto"
              style={{
                animation: rotationReady ? "orbitRotate 90s linear infinite" : "none",
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              {ringTools.map((tool: ToolItem, index: number) => {
                const angleDeg = (index / totalTiles) * 360;
                const angleRad = (angleDeg * Math.PI) / 180;

                // PERFECT CIRCLE: R * cos(a), R * sin(a)
                const x = radius * Math.cos(angleRad);
                const y = radius * Math.sin(angleRad);

                // Small size variation: 54px, 58px, 62px
                const sizePx = 54 + (index % 3) * 4;

                // 300ms onward: scale from 0.6 to 1 and fade in, 40ms stagger clockwise from top
                const angleClockwiseFromTop = (angleDeg + 90) % 360;
                const orderRank = Math.round(angleClockwiseFromTop / (360 / totalTiles));
                const tileDelay = 0.30 + orderRank * 0.04;

                return (
                  <div
                    key={tool.id}
                    className="absolute top-1/2 left-1/2 flex items-center justify-center"
                    style={{
                      transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`,
                    }}
                    onMouseEnter={() => {
                      setIsPaused(true);
                      setActiveTooltip(tool.name);
                    }}
                    onMouseLeave={() => {
                      setIsPaused(false);
                      setActiveTooltip(null);
                    }}
                  >
                    {/* Counter-rotation keeps logos upright */}
                    <div
                      style={{
                        animation: rotationReady ? "orbitCounterRotate 90s linear infinite" : "none",
                        animationPlayState: isPaused ? "paused" : "running",
                      }}
                    >
                      {/* Entry animation: scale 0.6 -> 1, opacity 0 -> 1 */}
                      <motion.div
                        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: shouldReduceMotion ? 0.2 : 0.45,
                          delay: shouldReduceMotion ? 0 : tileDelay,
                          ease: EASE_OUT_EXPO,
                        }}
                        suppressHydrationWarning
                      >
                        {/* Gentle staggered floating animation */}
                        <div
                          className="group relative cursor-pointer"
                          style={{
                            animation: `toolFloat 4s ease-in-out infinite ${index * 0.25}s`,
                          }}
                        >
                          <div
                            style={{ width: `${sizePx}px`, height: `${sizePx}px` }}
                            className="bg-white rounded-2xl p-2.5 shadow-sm border border-[#050409]/8 flex items-center justify-center transition-all duration-200 group-hover:scale-125 group-hover:shadow-xl group-hover:border-[#1F4633]/30 group-hover:z-30"
                          >
                            <ToolIcon id={tool.id} className="w-6 h-6 object-contain" />
                          </div>

                          {/* Tooltip on hover */}
                          {activeTooltip === tool.name && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-[#050409] text-[#F7F1DB] text-[11px] font-semibold tracking-wider uppercase rounded-md shadow-lg pointer-events-none whitespace-nowrap z-40 animate-in fade-in zoom-in-95 duration-150">
                              {tool.name}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CENTER TEXT BLOCK: Scaled to fit safely inside the ring radius */}
          <div
            ref={textBlockRef}
            className="relative z-10 text-center flex flex-col items-center px-4"
            style={{
              transform: contentScale < 1 ? `scale(${contentScale})` : undefined,
              transformOrigin: "center center",
            }}
          >
            {/* Main Headline (150ms: reveals line by line in overflow-hidden mask, 700ms duration, 90ms stagger, two-tone accent phrase follows last) */}
            <h1
              className="font-extrabold tracking-tight leading-[1.12] text-center"
              style={{
                fontSize: `clamp(24px, ${ringSize * 0.076}px, 50px)`,
                maxWidth: `min(${ringSize * 0.72}px, 500px)`,
                marginBottom: ringSize < 560 ? "8px" : "14px",
              }}
            >
              {/* Line 1: 150ms delay, 700ms duration */}
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-[#050409]"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.7,
                    delay: shouldReduceMotion ? 0 : 0.15,
                    ease: EASE_OUT_EXPO,
                  }}
                  suppressHydrationWarning
                >
                  I build the systems
                </motion.span>
              </span>

              {/* Line 2: 240ms delay (150ms + 90ms stagger), 700ms duration */}
              <span className="block overflow-hidden">
                <motion.span
                  className="inline-block text-[#050409]"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.7,
                    delay: shouldReduceMotion ? 0 : 0.24,
                    ease: EASE_OUT_EXPO,
                  }}
                  suppressHydrationWarning
                >
                  that&nbsp;
                </motion.span>
                <motion.span
                  className="inline-block text-[#1F4633]"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #1F4633 0%, #2F6B4C 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "#1F4633",
                  }}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.7,
                    delay: shouldReduceMotion ? 0 : 0.24,
                    ease: EASE_OUT_EXPO,
                  }}
                  suppressHydrationWarning
                >
                  fill your
                </motion.span>
              </span>

              {/* Line 3 (two-tone accent phrase follows last): 330ms delay (240ms + 90ms stagger), 700ms duration */}
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-[#1F4633]"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #1F4633 0%, #2F6B4C 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "#1F4633",
                  }}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.7,
                    delay: shouldReduceMotion ? 0 : 0.33,
                    ease: EASE_OUT_EXPO,
                  }}
                  suppressHydrationWarning
                >
                  pipeline.
                </motion.span>
              </span>
            </h1>

            {/* Sub-line (450ms: fades up from 20px, 600ms duration) */}
            <motion.p
              className="text-[#050409]/75 font-normal leading-relaxed tracking-tight"
              style={{
                fontSize: `clamp(12px, ${ringSize * 0.022}px, 15px)`,
                maxWidth: `${ringSize * 0.54}px`,
                marginBottom: ringSize < 560 ? "12px" : "18px",
              }}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0.2 : 0.6,
                delay: shouldReduceMotion ? 0 : 0.45,
                ease: EASE_OUT_EXPO,
              }}
              suppressHydrationWarning
            >
              {hero.subline}
            </motion.p>

            {/* CTAs: Primary Dark Pill Button + "See my work" Link (600ms onward: 600ms duration, 80ms apart) */}
            <div
              className="flex flex-row items-center justify-center gap-2.5 sm:gap-4"
              style={{
                marginBottom: ringSize < 560 ? "10px" : "16px",
              }}
            >
              <motion.a
                href={hero.ctaPrimary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-[#050409] hover:bg-[#1F4633] text-[#F7F1DB] text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] transition-all duration-200 shadow-sm hover:shadow active:scale-95 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 0.6,
                  delay: shouldReduceMotion ? 0 : 0.60,
                  ease: EASE_OUT_EXPO,
                }}
                suppressHydrationWarning
              >
                <span>{hero.ctaPrimary.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>

              <motion.a
                href={hero.ctaSecondary.href}
                className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[#050409] hover:text-[#1F4633] transition-colors py-1 underline underline-offset-4 decoration-[#050409]/30 hover:decoration-[#1F4633] whitespace-nowrap"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 0.6,
                  delay: shouldReduceMotion ? 0 : 0.68,
                  ease: EASE_OUT_EXPO,
                }}
                suppressHydrationWarning
              >
                {hero.ctaSecondary.label}
              </motion.a>
            </div>

            {/* "Built with" Row (fades up 80ms after button 2: 760ms delay) */}
            <motion.div
              className="flex items-center justify-center gap-2 text-xs text-[#050409]/70 font-medium"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0.2 : 0.6,
                delay: shouldReduceMotion ? 0 : 0.76,
                ease: EASE_OUT_EXPO,
              }}
              suppressHydrationWarning
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#050409]/80">
                {hero.builtWithLabel}
              </span>
              <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs border border-[#050409]/10 px-2.5 py-1 rounded-full shadow-2xs">
                {hero.featuredTools.map((toolId) => (
                  <div
                    key={toolId}
                    title={toolId.toUpperCase()}
                    className="w-4.5 h-4.5 rounded-md flex items-center justify-center p-0.5 hover:scale-115 transition-transform cursor-pointer"
                  >
                    <ToolIcon id={toolId} className="w-3.5 h-3.5 object-contain" />
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>

      </div>

      {/* MOBILE (below 768px): Two slow horizontal marquee rows above and below */}
      <motion.div
        className="md:hidden w-full my-6 overflow-hidden space-y-3 z-10"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.6,
          delay: shouldReduceMotion ? 0 : 0.3,
          ease: EASE_OUT_EXPO,
        }}
        suppressHydrationWarning
      >
        {/* Row 1 */}
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee flex items-center gap-3 py-1">
            {[...ringTools.slice(0, 8), ...ringTools.slice(0, 8)].map((tool, idx) => (
              <div
                key={`mob-1-${tool.id}-${idx}`}
                className="w-13 h-13 bg-white rounded-2xl shadow-xs border border-[#050409]/8 flex items-center justify-center flex-shrink-0 p-2"
              >
                <ToolIcon id={tool.id} className="w-6 h-6 object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 (Reversed direction) */}
        <div className="relative flex overflow-x-hidden">
          <div
            className="flex items-center gap-3 py-1"
            style={{
              display: "flex",
              width: "max-content",
              animation: "marquee 42s linear infinite reverse",
            }}
          >
            {[...ringTools.slice(8, 16), ...ringTools.slice(8, 16)].map((tool, idx) => (
              <div
                key={`mob-2-${tool.id}-${idx}`}
                className="w-13 h-13 bg-white rounded-2xl shadow-xs border border-[#050409]/8 flex items-center justify-center flex-shrink-0 p-2"
              >
                <ToolIcon id={tool.id} className="w-6 h-6 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* BOTTOM RIGHT: "Works with" + 4 full-color brand logos + "+100 more integrations" (fades in last) */}
      <motion.div
        className="w-full max-w-7xl px-4 sm:px-10 pb-6 flex items-center justify-end text-xs text-[#050409]/75 select-none z-10"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.6,
          delay: shouldReduceMotion ? 0 : 1.45,
          ease: EASE_OUT_EXPO,
        }}
        suppressHydrationWarning
      >
        <div className="flex items-center gap-2.5 bg-white/70 backdrop-blur-xs border border-[#050409]/10 px-3.5 py-1.5 rounded-full shadow-2xs">
          <span className="text-[11px] font-medium tracking-normal text-[#050409]">
            {hero.worksWithLabel}
          </span>
          <div className="flex items-center gap-1.5">
            {hero.worksWithTools.map((id) => (
              <div
                key={id}
                title={id.toUpperCase()}
                className="w-5 h-5 rounded-md flex items-center justify-center p-0.5"
              >
                <ToolIcon id={id} className="w-3.5 h-3.5 object-contain" />
              </div>
            ))}
          </div>
          <span className="text-[11px] font-medium text-[#1F4633] ml-0.5">
            {hero.worksWithSuffix}
          </span>
        </div>
      </motion.div>

      {/* Orbit and Float Animations */}
      <style jsx global>{`
        @keyframes orbitRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes orbitCounterRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes toolFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="animation: orbitRotate"],
          div[style*="animation: orbitCounterRotate"],
          div[style*="animation: toolFloat"],
          .animate-marquee {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
