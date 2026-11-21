"use client";

// Blur client names, emails and data in the recording.

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight, X, ExternalLink } from "lucide-react";
import { featuredCaseStudy } from "@/data/featured";
import { siteContent } from "@/data/content";

export function FeaturedCaseStudyCard() {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Hide the whole featured card until a title and thumbnail exist
  if (!featuredCaseStudy || !featuredCaseStudy.title || !featuredCaseStudy.thumbnail) {
    return null;
  }

  const {
    category,
    title,
    summary,
    thumbnail,
    videoUrl,
    videoDuration,
    tools,
  } = featuredCaseStudy;

  // Map tool IDs to tool data from siteContent
  const activeTools = (tools || [])
    .map((id) => siteContent.tools.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const isLocalMp4 = videoUrl?.endsWith(".mp4");

  return (
    <>
      <div className="w-full bg-[#050409] text-[#F7F1DB] rounded-[24px] border border-[#1F4633]/30 p-5 sm:p-7 lg:p-9 shadow-xl mb-12 relative overflow-hidden group">
        {/* Ambient subtle green glow in background */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1F4633]/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
          {/* Left Column: Video Thumbnail with Play Button (lg:col-span-6) */}
          <div className="lg:col-span-6 w-full">
            <div
              onClick={() => setIsPlayingVideo(true)}
              className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#0a110d] border border-white/10 cursor-pointer group/thumb shadow-lg transition-transform duration-300 group-hover/thumb:scale-[1.01]"
              role="button"
              tabIndex={0}
              aria-label={`Watch walkthrough: ${title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsPlayingVideo(true);
                }
              }}
            >
              {/* Thumbnail Image */}
              <Image
                src={thumbnail}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-opacity duration-300 group-hover/thumb:opacity-90"
              />

              {/* Dark subtle overlay */}
              <div className="absolute inset-0 bg-black/25 group-hover/thumb:bg-black/10 transition-colors" />

              {/* Centered Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#F7F1DB] text-[#050409] flex items-center justify-center shadow-2xl transition-transform duration-200 group-hover/thumb:scale-110 active:scale-95">
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-0.5" />
                </div>
              </div>

              {/* Video Duration Badge */}
              {videoDuration && (
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-xs text-[11px] font-mono font-bold text-[#F7F1DB] border border-white/10 shadow-xs">
                  {videoDuration}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Text & Actions (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
            {/* Category Pill */}
            {category && (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#1F4633] text-[#8DBF9F] text-xs font-bold uppercase tracking-wider border border-[#8DBF9F]/30 shadow-2xs">
                  {category}
                </span>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#F7F1DB]/40">
                  Featured Case Study
                </span>
              </div>
            )}

            {/* Title */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#F7F1DB] leading-tight">
              {title}
            </h3>

            {/* 2-3 Line Summary */}
            {summary && (
              <p className="text-sm sm:text-[15px] leading-relaxed text-[#F7F1DB]/75 line-clamp-3">
                {summary}
              </p>
            )}

            {/* Tool Chips */}
            {activeTools.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-[#F7F1DB]/50">Primary stack:</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeTools.map((tool) => (
                    <div
                      key={tool.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-[#F7F1DB]"
                      title={tool.name}
                    >
                      <Image
                        src={tool.logoPath}
                        alt={tool.name}
                        width={14}
                        height={14}
                        className="object-contain"
                      />
                      <span>{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions: "Watch walkthrough" button and "Read the case study" link */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                type="button"
                onClick={() => setIsPlayingVideo(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#F7F1DB] hover:bg-[#8DBF9F] text-[#050409] text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch walkthrough</span>
              </button>

              <Link
                href="/work/featured"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8DBF9F] hover:text-[#F7F1DB] transition-colors py-2 underline underline-offset-4 decoration-[#8DBF9F]/40 hover:decoration-[#F7F1DB]"
              >
                <span>Read the case study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Player */}
      {isPlayingVideo && videoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsPlayingVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#050409] rounded-2xl border border-white/15 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0a110d]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8DBF9F]">
                Walkthrough Video · {title}
              </span>
              <button
                type="button"
                onClick={() => setIsPlayingVideo(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F1DB] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Frame */}
            <div className="aspect-video w-full bg-black relative">
              {isLocalMp4 ? (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={videoUrl}
                  title="Walkthrough Video"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-[#0a110d] flex items-center justify-between text-xs text-[#F7F1DB]/70 border-t border-white/10">
              <span className="text-[11px] font-mono text-[#F7F1DB]/50">
                // Blur client names, emails and data in the recording.
              </span>
              <Link
                href="/work/featured"
                onClick={() => setIsPlayingVideo(false)}
                className="inline-flex items-center gap-1 text-[#8DBF9F] hover:underline font-semibold"
              >
                <span>Full case study & architecture</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
