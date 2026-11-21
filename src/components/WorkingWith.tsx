"use client";

import React from "react";
import { siteContent, PlatformItem, ClientItem } from "@/data/content";
import { SplitHeading } from "./SplitHeading";

interface PlatformCardProps {
  platform: PlatformItem;
  isDuplicate?: boolean;
}

function PlatformCard({ platform, isDuplicate = false }: PlatformCardProps) {
  const isXPlatform = platform.name === "X" || platform.name === "X (Twitter)";

  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={isDuplicate ? undefined : platform.accessibleLabel}
      tabIndex={isDuplicate ? -1 : 0}
      aria-hidden={isDuplicate ? true : undefined}
      className="group flex flex-col items-center justify-center text-center transition-transform duration-200 hover:scale-[1.04]"
    >
      {/* Logo container */}
      <div className="h-[40px] md:h-[48px] w-full max-w-[160px] flex items-center justify-center mb-3">
        {isXPlatform ? (
          <div className="inline-flex items-center gap-2.5">
            <img
              src={platform.logo}
              alt=""
              className="h-[22px] md:h-[26px] w-auto object-contain transition-all duration-200 filter brightness-0 invert opacity-85 group-hover:opacity-100"
            />
            <span className="text-[20px] md:text-[24px] font-bold tracking-tight text-white/85 group-hover:text-white transition-colors leading-none select-none">
              X
            </span>
          </div>
        ) : (
          <img
            src={platform.logo}
            alt={isDuplicate ? "" : platform.accessibleLabel}
            className="max-h-full max-w-full w-auto object-contain transition-all duration-200 filter brightness-0 invert opacity-85 group-hover:opacity-100"
          />
        )}
      </div>

      {/* Caption underneath */}
      <span className="text-xs text-white/50 font-normal tracking-normal group-hover:text-white/75 transition-colors whitespace-nowrap">
        {platform.caption}
      </span>
    </a>
  );
}

export function WorkingWith() {
  const { section2 } = siteContent;
  const isPlatformMode = section2.mode === "platforms";
  const currentLabel = isPlatformMode ? section2.platformsLabel : section2.clientsLabel;

  return (
    <section className="w-full bg-[#050409] text-[#F7F1DB] min-h-[240px] md:min-h-[280px] py-14 border-y border-[#F7F1DB]/10 flex flex-col justify-center relative z-20 overflow-hidden">
      {/* Section Label (Centered container matching max-w-6xl) */}
      <div className="max-w-6xl mx-auto w-full px-6 sm:px-12 mb-10 text-left">
        <SplitHeading
          as="h2"
          theme="dark"
          split={currentLabel}
          className="text-lg sm:text-[20px] font-medium tracking-tight"
        />
      </div>

      {/* MODE 1: PLATFORMS CONTINUOUS RIGHT-MOVING MARQUEE */}
      {isPlatformMode && (
        <div className="marquee-wrapper w-full overflow-hidden select-none py-2">
          <div className="marquee-track flex items-center w-max">
            {/* Half 1 (Group A + Group B) */}
            <div className="flex items-center shrink-0">
              {/* Group A (Primary 5 platforms: keyboard accessible & screen-reader visible) */}
              <div className="flex items-center shrink-0 marquee-primary">
                {section2.platforms.map((platform) => (
                  <div
                    key={`primary-${platform.name}`}
                    className="platform-item-wrapper pr-16 md:pr-24 lg:pr-28 shrink-0"
                  >
                    <PlatformCard platform={platform} />
                  </div>
                ))}
              </div>

              {/* Group B (Duplicate 5 platforms for ultra-wide screen coverage) */}
              <div
                className="flex items-center shrink-0 marquee-dup-group"
                aria-hidden="true"
              >
                {section2.platforms.map((platform, idx) => (
                  <div
                    key={`dup-b-${platform.name}-${idx}`}
                    className="platform-item-wrapper pr-16 md:pr-24 lg:pr-28 shrink-0"
                  >
                    <PlatformCard platform={platform} isDuplicate />
                  </div>
                ))}
              </div>
            </div>

            {/* Half 2 (Group C + Group D: identical decorative duplicate for seamless infinite loop) */}
            <div
              className="flex items-center shrink-0 marquee-duplicate"
              aria-hidden="true"
            >
              {/* Group C */}
              <div className="flex items-center shrink-0 marquee-dup-group">
                {section2.platforms.map((platform, idx) => (
                  <div
                    key={`dup-c-${platform.name}-${idx}`}
                    className="platform-item-wrapper pr-16 md:pr-24 lg:pr-28 shrink-0"
                  >
                    <PlatformCard platform={platform} isDuplicate />
                  </div>
                ))}
              </div>

              {/* Group D */}
              <div className="flex items-center shrink-0 marquee-dup-group">
                {section2.platforms.map((platform, idx) => (
                  <div
                    key={`dup-d-${platform.name}-${idx}`}
                    className="platform-item-wrapper pr-16 md:pr-24 lg:pr-28 shrink-0"
                  >
                    <PlatformCard platform={platform} isDuplicate />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: CLIENTS (Available for future when client mode is toggled) */}
      {!isPlatformMode && (
        <div className="max-w-6xl mx-auto w-full px-6 sm:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-between w-full">
            {section2.clients.map((client: ClientItem) => (
              <div
                key={client.id}
                className="group cursor-pointer transition-all duration-300 opacity-60 hover:opacity-100 flex items-center justify-center py-2"
              >
                {client.type === "wordmark" ? (
                  <span className="text-sm font-bold tracking-[0.2em] text-[#F7F1DB] group-hover:text-white transition-colors">
                    {client.logoText}
                  </span>
                ) : (
                  <img
                    src={client.logoUrl}
                    alt={client.name}
                    className="h-9 w-auto object-contain filter brightness-0 invert"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scoped CSS for Marquee, Edge Fading, Hover Pause & Reduced Motion */}
      <style jsx>{`
        .marquee-wrapper {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 12%,
            black 88%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 12%,
            black 88%,
            transparent 100%
          );
        }

        .marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marquee-to-right 36s linear infinite;
        }

        @keyframes marquee-to-right {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        @media (max-width: 767px) {
          .marquee-track {
            animation-duration: 46s;
          }
        }

        @media (hover: hover) and (pointer: fine) {
          .marquee-wrapper:hover .marquee-track {
            animation-play-state: paused;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-wrapper {
            mask-image: none !important;
            -webkit-mask-image: none !important;
            overflow: visible !important;
          }
          .marquee-track {
            animation: none !important;
            transform: none !important;
            width: 100% !important;
          }
          .marquee-duplicate,
          .marquee-dup-group {
            display: none !important;
          }
          .marquee-primary {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 2rem !important;
            width: 100% !important;
            max-width: 72rem !important;
            margin: 0 auto !important;
            padding: 0 1.5rem !important;
          }
          @media (min-width: 768px) {
            .marquee-primary {
              grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
              gap: 2.5rem !important;
              padding: 0 3rem !important;
            }
          }
          .platform-item-wrapper {
            padding-right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
