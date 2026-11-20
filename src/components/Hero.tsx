"use client";

import React, { useState, useRef, useEffect } from "react";
import { siteContent, ToolItem } from "@/data/content";
import { ToolIcon } from "./ToolIcon";
import { WorkflowCanvas } from "./WorkflowCanvas";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  const { hero, tools } = siteContent;
  const [isPaused, setIsPaused] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 1440, height: 800 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track window dimensions for collision detection and clamping
  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Subtle mouse-parallax on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 10, y: y * 10 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Curated color-alternated list of 16 tools around the ring
  // Alternating colors: Purple(Clay) -> Orange(HubSpot) -> Coral(n8n) -> Yellow/Black(Apollo) -> Blue(Instantly) -> Terracotta(Claude) -> Electric Violet(Smartlead) -> Light Blue(Salesforce) -> Dark(OpenAI) -> Vermilion(Zapier) -> Green(Google Sheets) -> Magenta(Make) -> LinkedIn Blue -> Black(Notion) -> 4-color(Slack) -> Teal/Cyan(Metabase)
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

  // Compute responsive elliptical radii with safe-zone clearance & viewport clamping:
  // Text safe-zone: width ~600px, height ~360px centered.
  // Half dimensions of safe zone: safeX = 310, safeY = 190.
  // Viewport clamping with 45px padding.
  const padding = 45;
  const maxRx = Math.max(340, (dimensions.width / 2) - padding - 36);
  const maxRy = Math.max(220, (dimensions.height / 2) - padding - 40);

  // Desired base elliptical radii: rx ~ 44vw, ry ~ 38vh
  const baseRx = Math.min(maxRx, Math.max(360, dimensions.width * 0.44));
  const baseRy = Math.min(maxRy, Math.max(230, dimensions.height * 0.38));

  // Safe zone bounds (half-width & half-height) around the text block
  const safeZoneX = 315;
  const safeZoneY = 195;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 sm:px-6 select-none bg-[#F7F1DB] overflow-hidden"
    >
      {/* SECTION 3: Workflow-style Background Canvas (dotted grid + node graph layer) */}
      <WorkflowCanvas />

      {/* Top spacer for breathing room */}
      <div className="w-full h-1" />

      {/* Main Center Stage: Elliptical Tool Ring & Perfectly Centered Content Block */}
      <div className="relative w-full max-w-7xl flex-1 flex items-center justify-center z-10 py-6 my-auto">
        
        {/* DESKTOP TOOL ORBIT RING (Hidden below 768px) */}
        <div
          className="hidden md:block absolute top-1/2 left-1/2 pointer-events-none transition-transform duration-500 ease-out z-0"
          style={{
            transform: `translate(calc(-50% + ${mouseOffset.x}px), calc(-50% + ${mouseOffset.y}px))`,
            width: `${baseRx * 2}px`,
            height: `${baseRy * 2}px`,
          }}
        >
          {/* Subtle guide ellipse */}
          <div
            className="absolute inset-0 rounded-[50%] border border-[#1F4633]/10 pointer-events-none"
            style={{
              width: "100%",
              height: "100%",
            }}
          />

          {/* Rotating Ellipse Orbit Layer */}
          <div
            className="absolute inset-0 rounded-[50%] pointer-events-auto"
            style={{
              animation: "orbitRotate 90s linear infinite",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {ringTools.map((tool: ToolItem, index: number) => {
              const angleDeg = (index / totalTiles) * 360;
              const angleRad = (angleDeg * Math.PI) / 180;
              
              // Unconstrained point on ellipse
              let x = baseRx * Math.cos(angleRad);
              let y = baseRy * Math.sin(angleRad);

              // COLLISION RULE: If tile point falls within the central safe-zone ellipse, push outward
              const normX = Math.abs(x) / safeZoneX;
              const normY = Math.abs(y) / safeZoneY;
              const distSq = normX * normX + normY * normY;
              if (distSq < 1.05) {
                const pushFactor = Math.sqrt(1.15 / distSq);
                x *= pushFactor;
                y *= pushFactor;
              }

              // Subtle random-feel size variation: 54px, 58px, 62px
              const sizePx = 54 + (index % 3) * 4;

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
                  {/* Counter-rotation to keep logo upright */}
                  <div
                    style={{
                      animation: "orbitCounterRotate 90s linear infinite",
                      animationPlayState: isPaused ? "paused" : "running",
                    }}
                  >
                    {/* Gentle staggered floating animation (y +/- 6px) */}
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

        {/* CENTER CONTENT BLOCK: Centered in safe zone */}
        <div className="relative z-10 max-w-[560px] mx-auto text-center flex flex-col items-center px-4">
          {/* Main Two-Line Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-[50px] font-extrabold tracking-tight text-[#050409] leading-[1.12] mb-5">
            I build the systems that{" "}
            <span className="text-[#1F4633] inline-block">fill your pipeline.</span>
          </h1>

          {/* Sub-line (Max-width ~560px, muted dark text) */}
          <p className="text-sm sm:text-base text-[#050409]/75 font-normal max-w-[540px] leading-relaxed mb-7 tracking-tight">
            GTM engineer. Clay, n8n, AI agents and outbound automation for startups and agencies.
          </p>

          {/* CTAs: Primary Dark Pill Button + "See my work" Link */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-7">
            <a
              href={hero.ctaPrimary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-7 py-3.5 rounded-full bg-[#050409] hover:bg-[#1F4633] text-[#F7F1DB] text-xs font-bold uppercase tracking-[0.16em] transition-all duration-200 shadow-sm hover:shadow active:scale-95 flex items-center gap-2"
            >
              <span>{hero.ctaPrimary.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={hero.ctaSecondary.href}
              className="text-xs font-bold uppercase tracking-[0.16em] text-[#050409] hover:text-[#1F4633] transition-colors py-1 underline underline-offset-4 decoration-[#050409]/30 hover:decoration-[#1F4633]"
            >
              {hero.ctaSecondary.label}
            </a>
          </div>

          {/* "Built with" Row (with official full-color logos on white badges) */}
          <div className="flex items-center justify-center gap-2.5 text-xs text-[#050409]/70 font-medium">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#050409]/80">
              {hero.builtWithLabel}
            </span>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs border border-[#050409]/10 px-3 py-1.5 rounded-full shadow-2xs">
              {hero.featuredTools.map((toolId) => (
                <div
                  key={toolId}
                  title={toolId.toUpperCase()}
                  className="w-5 h-5 rounded-md flex items-center justify-center p-0.5 hover:scale-115 transition-transform cursor-pointer"
                >
                  <ToolIcon id={toolId} className="w-4 h-4 object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE (below 768px): Two slow horizontal marquee rows above and below so nothing overlaps text */}
      <div className="md:hidden w-full my-6 overflow-hidden space-y-3 z-10">
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
            transform: translateY(-6px);
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
