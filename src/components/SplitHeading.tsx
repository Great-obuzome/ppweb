"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SplitText } from "@/data/content";

export interface SplitHeadingProps {
  lead?: string;
  accent?: string;
  split?: SplitText | string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div";
  theme?: "light" | "dark" | "cta";
  className?: string;
  style?: React.CSSProperties;
  enableMotion?: boolean;
}

export function SplitHeading({
  lead: rawLead,
  accent: rawAccent,
  split,
  as: Component = "h2",
  theme = "light",
  className = "",
  style = {},
  enableMotion = true,
}: SplitHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  // Resolve lead and accent from props or split object/string
  let resolvedLead = rawLead || "";
  let resolvedAccent = rawAccent || "";

  if (split) {
    if (typeof split === "object" && split.lead !== undefined && split.accent !== undefined) {
      resolvedLead = split.lead;
      resolvedAccent = split.accent;
    } else if (typeof split === "string") {
      const words = split.trim().split(/\s+/);
      if (words.length <= 2) {
        resolvedLead = words[0] || "";
        resolvedAccent = words.slice(1).join(" ");
      } else {
        const splitIndex = Math.max(1, Math.floor(words.length / 2));
        resolvedLead = words.slice(0, splitIndex).join(" ");
        resolvedAccent = words.slice(splitIndex).join(" ");
      }
    }
  }

  const cleanLead = resolvedLead.trimEnd();
  const cleanAccent = resolvedAccent.trimStart();

  // Color & Gradient definitions based on theme
  let leadColorClass = "text-[#050409]";
  let accentColorClass = "text-[#1F4633]";
  let accentGradientStyle: React.CSSProperties = {
    backgroundImage: "linear-gradient(90deg, #1F4633 0%, #2F6B4C 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "#1F4633",
    WebkitBoxDecorationBreak: "clone",
    boxDecorationBreak: "clone",
  };

  if (theme === "dark") {
    leadColorClass = "text-[#F7F1DB]";
    accentColorClass = "text-[#8DBF9F]";
    accentGradientStyle = {
      backgroundImage: "linear-gradient(90deg, #8DBF9F 0%, #C9E4D3 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "#8DBF9F",
      WebkitBoxDecorationBreak: "clone",
      boxDecorationBreak: "clone",
    };
  } else if (theme === "cta") {
    leadColorClass = "text-[#F7F1DB]";
    accentColorClass = "text-[#F7F1DB]/55";
    accentGradientStyle = {
      color: "rgba(247, 241, 219, 0.55)",
    };
  }

  const isMotionActive = enableMotion && !shouldReduceMotion;

  return (
    <Component className={className} style={style}>
      {isMotionActive ? (
        <>
          <motion.span
            className={`inline ${leadColorClass}`}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {cleanLead}
          </motion.span>
          {" "}
          <motion.span
            className={`inline ${accentColorClass}`}
            style={accentGradientStyle}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: 0.12,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            {cleanAccent}
          </motion.span>
        </>
      ) : (
        <>
          <span className={`inline ${leadColorClass}`}>{cleanLead}</span>
          {" "}
          <span className={`inline ${accentColorClass}`} style={accentGradientStyle}>
            {cleanAccent}
          </span>
        </>
      )}
    </Component>
  );
}
