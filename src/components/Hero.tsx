"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { siteContent, ToolItem } from "@/data/content";
import { ToolIcon } from "./ToolIcon";
import { WorkflowCanvas } from "./WorkflowCanvas";
import { SplitHeading } from "./SplitHeading";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  const { hero, tools } = siteContent;
  const [isPaused, setIsPaused] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [ringSize, setRingSize] = useState(800);
  const containerRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const [contentScale, setContentScale] = useState(1);

  // Responsive single square dimension: --ring: clamp(680px, min(56vw, 880px), 880px)
  // At 1440px wide: 1440 * 0.56 = 806.4px (~800px).
  // Perfect circle, does not shrink to fit viewport height.
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      const computed = Math.min(vw * 0.56, 880);
      const clamped = Math.max(680, computed);
      setRingSize(clamped);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Bounding-box collision check: ensure text block sits strictly within safe radius
  // with at least 48px clearance to the nearest tile at every size.
  useEffect(() => {
    if (!textBlockRef.current) return;
    const rect = textBlockRef.current.getBoundingClientRect();
    const baseRadius = (ringSize - 60) / 2;
    // Inner edge of tile is at (baseRadius - 32px).
    // Safe radius requires at least 48px between the text and the nearest tile.
    const safeRadius = baseRadius - 32 - 48;
    const halfH = rect.height / 2;
    const halfW = rect.width / 2;
    const cornerDist = Math.sqrt(halfW * halfW + halfH * halfH);

    if (cornerDist > safeRadius || halfH > safeRadius - 10) {
      const neededScale = safeRadius / Math.max(halfH + 10, cornerDist);
      // Reduce text scale by up to 10% (down to 0.90 max)
      const target = Math.max(0.90, Number(neededScale.toFixed(2)));
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

  // Color-alternated list of 18 tools around the ring
  // No two similar colors side by side, and no duplicate tool placed next to each other
  const orderedToolIds = [
    "clay", // 0: Indigo/Purple (#4F46E5)
    "hubspot", // 1: Orange (#FF7A59)
    "salesforce", // 2: Sky Blue (#00A1E0)
    "claude", // 3: Terracotta/Warm Coral (#D97757)
    "google-sheets", // 4: Green (#34A853)
    "instantly", // 5: Electric Blue (#3B82F6)
    "zapier", // 6: Bright Orange (#FF4F00)
    "notion", // 7: Monochrome/Black (#000000)
    "n8n", // 8: Magenta/Pink (#EA4B71)
    "apollo", // 9: Bright Yellow (#FFE600)
    "make", // 10: Deep Violet (#6D00CC)
    "metabase", // 11: Cyan/Light Blue (#509EE3)
    "openai", // 12: Black (#000000)
    "slack", // 13: Plum/Multi (#4A154B)
    "linkedin-sales-nav", // 14: Royal Blue (#0A66C2)
    "smartlead", // 15: Violet/Indigo (#6366F1)
    "google-sheets", // 16: Green (#34A853)
    "hubspot", // 17: Orange (#FF7A59)
  ];

  const ringTools: ToolItem[] = orderedToolIds
    .map((id) => tools.find((t) => t.id === id))
    .filter((t): t is ToolItem => Boolean(t));

  const totalTiles = ringTools.length; // 18

  // Single circle radius: R = (ringSize - averageTileSize) / 2
  // With tileSize ~60px, R sits exactly on the track
  const baseTileSize = 60;
  const radius = (ringSize - baseTileSize) / 2;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        minHeight: `calc(${ringSize}px + 220px)`,
        paddingTop: "32px",
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
            <div
              className="absolute inset-0 rounded-full border border-[#1F4633]/12 pointer-events-none"
              style={{
                width: "100%",
                height: "100%",
                aspectRatio: "1 / 1",
              }}
            />

            {/* Rotating Circle Orbit Layer (90s linear infinite) */}
            <div
              className="absolute inset-0 rounded-full pointer-events-auto"
              style={{
                animation: "orbitRotate 90s linear infinite",
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              {ringTools.map((tool: ToolItem, index: number) => {
                const angleDeg = (index / totalTiles) * 360;
                const angleRad = (angleDeg * Math.PI) / 180;

                // PERFECT CIRCLE: R * cos(a), R * sin(a) rounded to 2 decimal places to prevent SSR hydration precision mismatch
                const x = Math.round(radius * Math.cos(angleRad) * 100) / 100;
                const y = Math.round(radius * Math.sin(angleRad) * 100) / 100;

                // Small size variation: 56px, 60px, 64px (within 56-66px specification)
                const sizePx = 56 + (index % 3) * 4;

                return (
                  <div
                    key={`${tool.id}-${index}`}
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
                        animation: "orbitCounterRotate 90s linear infinite",
                        animationPlayState: isPaused ? "paused" : "running",
                      }}
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
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CENTER TEXT BLOCK: Scaled to fit safely inside the ring radius with >=48px clearance */}
          <div
            ref={textBlockRef}
            className="relative z-10 text-center flex flex-col items-center px-4"
            style={{
              transform: contentScale < 1 ? `scale(${contentScale})` : undefined,
              transformOrigin: "center center",
            }}
          >
            {/* Main Headline: font-size calc(ring * 0.082) (44px - 72px) on desktop, exactly two lines on desktop, max-width calc(ring * 0.74) */}
            <h1
              className="font-extrabold tracking-tight leading-[1.08] [text-wrap:balance] select-none text-[clamp(36px,10vw,48px)] md:text-[var(--hero-font-size)] max-w-full md:max-w-[var(--hero-max-w)] mb-6"
              style={
                {
                  "--hero-font-size": `clamp(44px, ${ringSize * 0.082}px, 72px)`,
                  "--hero-max-w": `${ringSize * 0.74}px`,
                } as React.CSSProperties
              }
            >
              <span className="md:block text-[#050409]">I build the systems</span>{" "}
              <span className="md:block">
                <span className="text-[#050409]">that </span>
                <span
                  style={{
                    backgroundImage: "linear-gradient(90deg, #1F4633 0%, #2F6B4C 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "#1F4633",
                    WebkitBoxDecorationBreak: "clone",
                    boxDecorationBreak: "clone",
                  }}
                >
                  fill your pipeline.
                </span>
              </span>
            </h1>

            {/* Sub-line: 18-20px (calc(ring * 0.024)) on desktop, 16-17px on mobile, line-height 1.6, max-width calc(ring * 0.58), #050409 at 70% */}
            <p
              className="font-normal leading-[1.6] tracking-tight text-[#050409]/70 text-[16px] sm:text-[17px] md:text-[var(--hero-sub-size)] max-w-full md:max-w-[var(--hero-sub-max-w)] mb-8"
              style={
                {
                  "--hero-sub-size": `clamp(18px, ${ringSize * 0.024}px, 20px)`,
                  "--hero-sub-max-w": `${ringSize * 0.58}px`,
                } as React.CSSProperties
              }
            >
              GTM engineer. Clay, n8n, AI agents and outbound automation for startups and agencies.
            </p>

            {/* CTAs: Primary Pill Button (56px tall, 32px px, 15px text) + "See my work" Link (15px) with 20px gap */}
            <div
              className="flex flex-row items-center justify-center gap-5"
              style={{
                marginBottom: "28px",
              }}
            >
              <a
                href={hero.ctaPrimary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group h-[56px] px-8 rounded-full bg-[#050409] hover:bg-[#1F4633] text-[#F7F1DB] text-[15px] font-bold uppercase tracking-[0.14em] transition-all duration-200 shadow-sm hover:shadow active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>{hero.ctaPrimary.label}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={hero.ctaSecondary.href}
                className="text-[15px] font-bold uppercase tracking-[0.14em] text-[#050409] hover:text-[#1F4633] transition-colors py-2 underline underline-offset-4 decoration-[#050409]/30 hover:decoration-[#1F4633] whitespace-nowrap"
              >
                {hero.ctaSecondary.label}
              </a>
            </div>

            {/* "Built with" Row: label 13px, chips 24px, 14px padding inside pill */}
            <div className="flex items-center justify-center gap-2.5 text-xs text-[#050409]/70 font-medium select-none">
              <span className="text-[13px] font-semibold uppercase tracking-wider text-[#050409]/80">
                {hero.builtWithLabel}
              </span>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs border border-[#050409]/10 px-[14px] py-1.5 rounded-full shadow-2xs">
                {hero.featuredTools.map((toolId) => (
                  <div
                    key={toolId}
                    title={toolId.toUpperCase()}
                    className="w-6 h-6 rounded-md flex items-center justify-center p-0.5 hover:scale-115 transition-transform cursor-pointer"
                  >
                    <ToolIcon id={toolId} className="w-4.5 h-4.5 object-contain" />
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* MOBILE (below 768px): Two slow horizontal marquee rows with all 18 tools */}
      <div className="md:hidden w-full my-6 overflow-hidden space-y-3 z-10">
        {/* Row 1 */}
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee flex items-center gap-3 py-1">
            {[...ringTools.slice(0, 9), ...ringTools.slice(0, 9)].map((tool, idx) => (
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
            {[...ringTools.slice(9, 18), ...ringTools.slice(9, 18)].map((tool, idx) => (
              <div
                key={`mob-2-${tool.id}-${idx}`}
                className="w-13 h-13 bg-white rounded-2xl shadow-xs border border-[#050409]/8 flex items-center justify-center flex-shrink-0 p-2"
              >
                <ToolIcon id={tool.id} className="w-6 h-6 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM RIGHT: "Works with" + 4 full-color brand logos + "+100 more integrations" */}
      <div className="w-full max-w-7xl px-4 sm:px-10 pb-6 flex items-center justify-end text-xs text-[#050409]/75 select-none z-10">
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
      </div>

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
