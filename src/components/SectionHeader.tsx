"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SplitHeading } from "./SplitHeading";
import { SplitText } from "@/data/content";

export interface SectionHeaderProps {
  eyebrow: string;
  lead?: string;
  accent?: string;
  split?: SplitText | string;
  description?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  buttonExternal?: boolean;
  theme?: "light" | "dark";
  className?: string;
  headingMaxWidth?: string;
  as?: "h1" | "h2";
  bottomSpacing?: string;
  rightChildren?: React.ReactNode;
  enableMotion?: boolean;
}

export function SectionHeader({
  eyebrow,
  lead,
  accent,
  split,
  description,
  buttonLabel,
  buttonUrl,
  buttonExternal,
  theme = "light",
  className = "",
  headingMaxWidth = "",
  as = "h2",
  bottomSpacing = "mb-12 md:mb-16",
  rightChildren,
  enableMotion,
}: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === "dark";
  const isAnimated = (enableMotion !== undefined ? enableMotion : as !== "h1") && !shouldReduceMotion;

  const isExternal =
    buttonExternal !== undefined
      ? buttonExternal
      : buttonUrl
      ? buttonUrl.startsWith("http") || buttonUrl.startsWith("mailto:")
      : false;

  const buttonClasses = `group/btn inline-flex items-center gap-2.5 px-[26px] py-[14px] rounded-full text-[15px] font-medium transition-all duration-200 hover:-translate-y-[2px] motion-reduce:transform-none select-none shadow-sm hover:shadow ${
    isDark
      ? "bg-[#F7F1DB] text-[#050409] hover:bg-[#8DBF9F]"
      : "bg-[#050409] text-[#F7F1DB] hover:bg-[#1F4633]"
  }`;

  const arrowClasses = `w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-[3px] motion-reduce:transform-none ${
    isDark ? "text-[#050409]" : "text-[#F7F1DB]"
  }`;

  return (
    <div
      className={`flex flex-col min-[900px]:flex-row min-[900px]:items-end min-[900px]:justify-between gap-5 min-[900px]:gap-12 ${bottomSpacing} ${className}`}
    >
      {/* Left Column: Eyebrow and Heading */}
      <div className="flex-1 max-w-2xl min-[900px]:max-w-[560px]">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-[14px] mb-5">
          {/* Animated horizontal line: 40px wide, 1px thick */}
          {isAnimated ? (
            <motion.span
              className={`w-[40px] h-[1px] block shrink-0 ${
                isDark ? "bg-[#8DBF9F]" : "bg-[#1F4633]"
              }`}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
              aria-hidden="true"
            />
          ) : (
            <span
              className={`w-[40px] h-[1px] block shrink-0 ${
                isDark ? "bg-[#8DBF9F]" : "bg-[#1F4633]"
              }`}
              aria-hidden="true"
            />
          )}

          {/* Eyebrow Text: Sentence case, 15-16px, regular weight, 80% opacity, no letter-spacing */}
          {isAnimated ? (
            <motion.span
              className={`text-[15px] sm:text-[16px] font-normal tracking-normal ${
                isDark ? "text-[#F7F1DB]/80" : "text-[#050409]/80"
              }`}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
            >
              {eyebrow}
            </motion.span>
          ) : (
            <span
              className={`text-[15px] sm:text-[16px] font-normal tracking-normal ${
                isDark ? "text-[#F7F1DB]/80" : "text-[#050409]/80"
              }`}
            >
              {eyebrow}
            </span>
          )}
        </div>

        {/* Heading: Uppercase, bold 700, 1.05 leading, -0.01em tracking, clamp(34px, 5vw, 60px) */}
        <SplitHeading
          as={as}
          theme={theme}
          lead={lead}
          accent={accent}
          split={split}
          enableMotion={isAnimated}
          className={`text-[clamp(34px,5vw,60px)] font-bold tracking-[-0.01em] leading-[1.05] uppercase [text-wrap:balance] ${headingMaxWidth}`}
        />
      </div>

      {/* Right Column: Description & Pill Button / Controls */}
      {(description || (buttonLabel && buttonUrl) || rightChildren) && (
        isAnimated ? (
          <motion.div
            className="flex flex-col items-start min-[900px]:items-end text-left min-[900px]:text-right shrink-0 max-w-[420px] gap-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {description && (
              <p
                className={`text-[15px] sm:text-[16px] leading-[1.6] font-normal ${
                  isDark ? "text-[#F7F1DB]/60" : "text-[#050409]/60"
                }`}
              >
                {description}
              </p>
            )}

            {buttonLabel && buttonUrl && (
              isExternal ? (
                <a
                  href={buttonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses}
                >
                  <span>{buttonLabel}</span>
                  <ArrowRight className={arrowClasses} />
                </a>
              ) : (
                <Link href={buttonUrl} className={buttonClasses}>
                  <span>{buttonLabel}</span>
                  <ArrowRight className={arrowClasses} />
                </Link>
              )
            )}

            {rightChildren}
          </motion.div>
        ) : (
          <div className="flex flex-col items-start min-[900px]:items-end text-left min-[900px]:text-right shrink-0 max-w-[420px] gap-5">
            {description && (
              <p
                className={`text-[15px] sm:text-[16px] leading-[1.6] font-normal ${
                  isDark ? "text-[#F7F1DB]/60" : "text-[#050409]/60"
                }`}
              >
                {description}
              </p>
            )}

            {buttonLabel && buttonUrl && (
              isExternal ? (
                <a
                  href={buttonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses}
                >
                  <span>{buttonLabel}</span>
                  <ArrowRight className={arrowClasses} />
                </a>
              ) : (
                <Link href={buttonUrl} className={buttonClasses}>
                  <span>{buttonLabel}</span>
                  <ArrowRight className={arrowClasses} />
                </Link>
              )
            )}

            {rightChildren}
          </div>
        )
      )}
    </div>
  );
}
