"use client";

import React from "react";
import Image from "next/image";
import { siteContent, StatItem } from "@/data/content";
import { SplitHeading } from "./SplitHeading";
import { ArrowUpRight } from "lucide-react";

export function About() {
  const { about } = siteContent;

  return (
    <section id="about" className="py-24 px-6 bg-[#FAF6E8] border-t border-[#1F4633]/10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Photo with offset frame (about 40% width on desktop, stacked on mobile) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative group w-[280px] sm:w-[320px] md:w-[340px] aspect-[4/5] max-w-full">
              
              {/* Thin 2px #1F4633 outline ring offset about 10px outside the photo with subtle hover shift */}
              <div 
                className="absolute -inset-2.5 rounded-[28px] border-2 border-[#1F4633] pointer-events-none transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transform-none"
                aria-hidden="true"
              />

              {/* Main Photo Container with 24px radius, 4:5 ratio, soft shadow, and scroll rise animation */}
              <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-white shadow-lg border border-[#1F4633]/15 transition-transform duration-300 group-hover:scale-[1.01] motion-reduce:transform-none">
                <Image
                  src={about.photoUrl}
                  alt="Daniel, GTM engineer"
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 400px"
                  priority={false}
                  loading="lazy"
                  className="object-cover object-[50%_18%] transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none select-none"
                />
              </div>

              {/* Floating badge overlapping bottom-left corner of the photo */}
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 border border-[#1F4633]/20 shadow-md flex items-center gap-2.5 z-20 transition-transform duration-200 group-hover:-translate-y-0.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-xs font-semibold text-[#050409] tracking-tight whitespace-nowrap">
                  {about.badgeText}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Eyebrow, Heading, Bio, Stats, and Discovery CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow: "ABOUT" in small, wide-spaced caps */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F4633]" />
              <span className="text-xs font-bold tracking-[0.24em] uppercase text-[#1F4633]">
                {about.eyebrow}
              </span>
            </div>

            {/* Heading: "Hi, I'm Daniel." */}
            <SplitHeading
              split={about.heading}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight"
            />

            {/* Bio Body Text */}
            <p className="text-base sm:text-lg text-[#050409]/80 font-normal leading-relaxed mb-10 max-w-2xl">
              {about.bio}
            </p>

            {/* 3 Stats Row (marked TODO in config for user replacement) */}
            <div className="grid grid-cols-3 gap-6 sm:gap-10 pt-6 border-t border-[#1F4633]/15 w-full max-w-xl mb-8">
              {about.stats.map((stat: StatItem, idx: number) => (
                <div key={idx} className="flex flex-col">
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1F4633]">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#050409]/60 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Text link "Book a free discovery call" in #1F4633 */}
            <a
              href={about.discoveryCallUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-bold tracking-wide text-[#1F4633] hover:text-[#153324] underline underline-offset-4 decoration-[#1F4633]/40 hover:decoration-[#1F4633] transition-colors"
            >
              <span>{about.discoveryCallText}</span>
              <ArrowUpRight className="w-4 h-4 text-[#1F4633]" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
