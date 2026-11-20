import React from "react";
import { siteContent, PlatformItem, ClientItem } from "@/data/content";
import { SplitHeading } from "./SplitHeading";

export function WorkingWith() {
  const { section2 } = siteContent;
  const isPlatformMode = section2.mode === "platforms";
  const currentLabel = isPlatformMode ? section2.platformsLabel : section2.clientsLabel;

  return (
    <section className="w-full bg-[#050409] text-[#F7F1DB] min-h-[240px] md:min-h-[280px] py-14 px-6 sm:px-12 border-y border-[#F7F1DB]/10 flex flex-col justify-center relative z-20">
      <div className="max-w-6xl mx-auto w-full">
        {/* Label top-left: Sentence case, ~18-20px, with two-tone styling */}
        <div className="mb-10 text-left">
          <SplitHeading
            as="h2"
            theme="dark"
            split={currentLabel}
            className="text-lg sm:text-[20px] font-medium tracking-tight"
          />
        </div>

        {/* MODE 1: PLATFORMS (Active) */}
        {isPlatformMode && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-between w-full">
            {section2.platforms.map((platform: PlatformItem) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform.accessibleLabel}
                className="group flex flex-col items-center justify-center text-center transition-transform duration-200 hover:scale-[1.04]"
              >
                {/* Logo with pure white invert filter: brightness(0) invert(1) at 85% opacity -> 100% on hover */}
                <div className="h-[40px] md:h-[48px] w-full max-w-[160px] flex items-center justify-center mb-3">
                  <img
                    src={platform.logo}
                    alt={platform.accessibleLabel}
                    className="max-h-full max-w-full w-auto object-contain transition-all duration-200 filter brightness-0 invert opacity-85 group-hover:opacity-100"
                  />
                </div>

                {/* Small caption in white at 50% opacity */}
                <span className="text-xs text-white/50 font-normal tracking-normal group-hover:text-white/75 transition-colors">
                  {platform.caption}
                </span>
              </a>
            ))}
          </div>
        )}

        {/* MODE 2: CLIENTS (Available for future when user has real client logos) */}
        {!isPlatformMode && (
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
        )}
      </div>
    </section>
  );
}
