"use client";

import React from "react";
import { Database, Filter, Sparkles, Send, CheckCircle2, UserCheck, Play } from "lucide-react";

interface NodeItem {
  id: string;
  label: string;
  type: string;
  x: number; // percentage of canvas width (0-100)
  y: number; // percentage of canvas height (0-100)
  icon: React.ReactNode;
  statusColor: string;
  driftDelay: number;
}

export function WorkflowCanvas() {
  // 7 strategic workflow nodes placed at edges/corners so the center stays clean
  const nodes: NodeItem[] = [
    {
      id: "node-1",
      label: "Trigger: Inbound / ICP Signal",
      type: "Webhook Trigger",
      x: 8,
      y: 20,
      icon: <Play className="w-3.5 h-3.5 text-[#1F4633]" />,
      statusColor: "#10B981", // active green
      driftDelay: 0,
    },
    {
      id: "node-2",
      label: "Enrich: Multi-source Waterfall",
      type: "Clay Waterfall",
      x: 18,
      y: 74,
      icon: <Database className="w-3.5 h-3.5 text-[#4F46E5]" />,
      statusColor: "#3B82F6",
      driftDelay: 1.2,
    },
    {
      id: "node-3",
      label: "Filter & Dedupe",
      type: "Validation Node",
      x: 6,
      y: 48,
      icon: <Filter className="w-3.5 h-3.5 text-[#050409]" />,
      statusColor: "#10B981",
      driftDelay: 2.1,
    },
    {
      id: "node-4",
      label: "Score & Rank",
      type: "Intent Scoring",
      x: 82,
      y: 18,
      icon: <UserCheck className="w-3.5 h-3.5 text-[#D97757]" />,
      statusColor: "#10B981",
      driftDelay: 0.8,
    },
    {
      id: "node-5",
      label: "Personalize with LLM",
      type: "Claude Agent",
      x: 88,
      y: 46,
      icon: <Sparkles className="w-3.5 h-3.5 text-[#D97757]" />,
      statusColor: "#F59E0B",
      driftDelay: 1.6,
    },
    {
      id: "node-6",
      label: "Send & Rotate Inboxes",
      type: "Smartlead / Instantly",
      x: 78,
      y: 76,
      icon: <Send className="w-3.5 h-3.5 text-[#3B82F6]" />,
      statusColor: "#10B981",
      driftDelay: 2.8,
    },
    {
      id: "node-7",
      label: "Meeting Booked",
      type: "Pipeline Revenue",
      x: 50,
      y: 88,
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#1F4633]" />,
      statusColor: "#1F4633",
      driftDelay: 3.2,
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. Subtle dotted grid canvas on cream (dots at ~6% opacity) */}
      <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="n8n-grid-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#050409" fillOpacity="0.07" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#n8n-grid-dots)" />
      </svg>

      {/* 2. Node Graph Connections: Thin curved bezier lines with glowing traveling pulse dots */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Subtle line gradient */}
          <linearGradient id="flow-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1F4633" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#1F4633" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1F4633" stopOpacity="0.35" />
          </linearGradient>

          {/* Glow filter for flow dots */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Path 1: Trigger (x:80, y:120) -> Dedupe (x:60, y:288) -> Enrich (x:180, y:444) */}
        <path
          id="flow-path-left"
          d="M 120 135 C 80 200, 70 240, 100 290 C 130 350, 150 380, 210 440"
          fill="none"
          stroke="url(#flow-line-grad)"
          strokeWidth="1.6"
          strokeDasharray="4 4"
        />

        {/* Path 2: Enrich (x:250, y:460) -> Meeting Booked (x:500, y:528) */}
        <path
          id="flow-path-bottom"
          d="M 280 460 C 360 480, 420 520, 480 528"
          fill="none"
          stroke="url(#flow-line-grad)"
          strokeWidth="1.6"
          strokeDasharray="4 4"
        />

        {/* Path 3: Score (x:820, y:108) -> Personalize (x:880, y:276) -> Send (x:780, y:456) */}
        <path
          id="flow-path-right"
          d="M 820 135 C 870 190, 890 230, 860 280 C 830 350, 810 390, 780 456"
          fill="none"
          stroke="url(#flow-line-grad)"
          strokeWidth="1.6"
          strokeDasharray="4 4"
        />

        {/* Path 4: Send (x:750, y:470) -> Meeting Booked (x:550, y:528) */}
        <path
          id="flow-path-bottom-right"
          d="M 750 470 C 670 510, 610 525, 550 528"
          fill="none"
          stroke="url(#flow-line-grad)"
          strokeWidth="1.6"
          strokeDasharray="4 4"
        />

        {/* Traveling Flow Pulse Dots */}
        <circle r="3.5" fill="#1F4633" filter="url(#glow)" className="motion-safe:animate-flow-dot">
          <animateMotion dur="7s" repeatCount="indefinite" path="M 120 135 C 80 200, 70 240, 100 290 C 130 350, 150 380, 210 440" />
        </circle>
        <circle r="3.5" fill="#1F4633" filter="url(#glow)" className="motion-safe:animate-flow-dot">
          <animateMotion dur="6s" repeatCount="indefinite" path="M 820 135 C 870 190, 890 230, 860 280 C 830 350, 810 390, 780 456" />
        </circle>
        <circle r="3.5" fill="#1F4633" filter="url(#glow)" className="motion-safe:animate-flow-dot">
          <animateMotion dur="5s" repeatCount="indefinite" path="M 750 470 C 670 510, 610 525, 550 528" />
        </circle>
      </svg>

      {/* 3. Workflow Node Cards (Drifting slowly, faded toward center) */}
      <div className="hidden lg:block absolute inset-0">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 opacity-40 hover:opacity-75 transition-opacity duration-300"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              animation: `nodeDrift 8s ease-in-out infinite alternate ${node.driftDelay}s`,
            }}
          >
            <div className="bg-white/90 backdrop-blur-xs rounded-xl px-3 py-2 border border-[#1F4633]/20 shadow-xs flex items-center gap-2.5 min-w-[150px]">
              <div className="w-6 h-6 rounded-md bg-[#F7F1DB] flex items-center justify-center p-1 flex-shrink-0">
                {node.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-[#050409] tracking-tight leading-none whitespace-nowrap">
                  {node.label}
                </span>
                <span className="text-[8px] font-medium text-[#050409]/60 tracking-wider uppercase mt-0.5">
                  {node.type}
                </span>
              </div>
              <span
                className="w-1.5 h-1.5 rounded-full ml-auto flex-shrink-0"
                style={{ backgroundColor: node.statusColor }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Radial Gradient Mask: Fades out completely toward the center headline so center stays 100% clean */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(247,241,219,0.95)_0%,rgba(247,241,219,0.4)_70%,transparent_100%)] pointer-events-none" />

      {/* Keyframe animation for subtle drift */}
      <style jsx global>{`
        @keyframes nodeDrift {
          0% {
            transform: translate(-50%, -50%) translateY(0px) translateX(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-5px) translateX(3px);
          }
          100% {
            transform: translate(-50%, -50%) translateY(4px) translateX(-2px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-flow-dot {
            animation: none !important;
          }
          div[style*="animation: nodeDrift"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
