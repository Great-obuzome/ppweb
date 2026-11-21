// Blur client names, emails and data in the recording.

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Play, ExternalLink, Calendar } from "lucide-react";
import { featuredCaseStudy } from "@/data/featured";
import { siteContent } from "@/data/content";
import { Navbar } from "@/components/Navbar";
import { FinalCtaAndFooter } from "@/components/FinalCtaAndFooter";

export const metadata = {
  title: `${featuredCaseStudy.title || "Featured Case Study"} | UPBYNATURE`,
  description: featuredCaseStudy.summary || "In-depth case study walkthrough and architecture.",
};

export default function FeaturedWorkPage() {
  const {
    category,
    title,
    summary,
    thumbnail,
    videoUrl,
    tools,
    problem,
    whatIBuilt,
    workflowSteps,
    results,
    review,
  } = featuredCaseStudy;

  // Map tool IDs to tool items from siteContent
  const activeTools = (tools || [])
    .map((id) => siteContent.tools.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const isLocalMp4 = videoUrl?.endsWith(".mp4");

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F1DB] text-[#050409]">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 sm:px-10 py-12 sm:py-16">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#050409]/60 hover:text-[#1F4633] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Selected Work</span>
          </Link>
        </div>

        {/* Page Header */}
        <header className="mb-10 space-y-4">
          {category && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#1F4633] text-[#8DBF9F] text-xs font-bold uppercase tracking-wider">
              {category}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#050409] leading-tight">
            {title || "Featured Case Study"}
          </h1>

          {summary && (
            <p className="text-base sm:text-lg text-[#050409]/75 leading-relaxed max-w-3xl">
              {summary}
            </p>
          )}

          {/* Tools Stack */}
          {activeTools.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-semibold text-[#050409]/60 uppercase tracking-wider">
                Tools used:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {activeTools.map((tool) => (
                  <span
                    key={tool.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#1F4633]/15 text-xs font-medium text-[#050409] shadow-2xs"
                  >
                    <Image
                      src={tool.logoPath}
                      alt={tool.name}
                      width={14}
                      height={14}
                      className="object-contain"
                    />
                    <span>{tool.name}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Video Walkthrough Player (Lazy Loaded) */}
        {videoUrl && (
          <div className="mb-12 rounded-2xl overflow-hidden bg-[#050409] border border-[#1F4633]/25 shadow-2xl relative">
            <div className="aspect-video w-full relative">
              {isLocalMp4 ? (
                <video
                  src={videoUrl}
                  controls
                  poster={thumbnail}
                  className="w-full h-full object-contain"
                  preload="none"
                />
              ) : (
                <iframe
                  src={videoUrl}
                  title={title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}
            </div>
            <div className="p-3 bg-[#0a110d] flex items-center justify-between text-xs text-[#F7F1DB]/60 border-t border-white/10">
              <span className="font-mono text-[11px]">
                // Blur client names, emails and data in the recording.
              </span>
              <span className="font-semibold text-[#8DBF9F]">
                Walkthrough Video
              </span>
            </div>
          </div>
        )}

        {/* Content Grid: Problem & Solution */}
        <div className="space-y-10 mb-12">
          {problem && (
            <section className="bg-white/80 backdrop-blur-xs rounded-2xl p-6 sm:p-8 border border-[#1F4633]/15 shadow-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#050409] uppercase">
                The Problem
              </h2>
              <p className="text-sm sm:text-base text-[#050409]/80 leading-relaxed">
                {problem}
              </p>
            </section>
          )}

          {whatIBuilt && (
            <section className="bg-white/80 backdrop-blur-xs rounded-2xl p-6 sm:p-8 border border-[#1F4633]/15 shadow-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#050409] uppercase">
                What I Built
              </h2>
              <p className="text-sm sm:text-base text-[#050409]/80 leading-relaxed">
                {whatIBuilt}
              </p>
            </section>
          )}
        </div>

        {/* Workflow Architecture Diagram / Steps */}
        {workflowSteps && workflowSteps.length > 0 && (
          <section className="mb-12 bg-[#050409] text-[#F7F1DB] rounded-2xl p-6 sm:p-8 border border-[#1F4633]/30 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#F7F1DB] uppercase">
                Workflow Architecture
              </h2>
              <span className="text-xs font-mono text-[#8DBF9F]">
                4-Stage Pipeline
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {workflowSteps.map((step) => (
                <div
                  key={step.step}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#8DBF9F]">
                      STEP {step.step}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-[#1F4633] text-[#8DBF9F]">
                      {step.tool}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#F7F1DB]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#F7F1DB]/60 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Results & Metrics */}
        {results && results.length > 0 && (
          <section className="mb-12 bg-white/80 backdrop-blur-xs rounded-2xl p-6 sm:p-8 border border-[#1F4633]/15 shadow-sm space-y-4">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#050409] uppercase">
              Measurable Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {results.map((result, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#FAF6E9] border border-[#1F4633]/10 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-[#1F4633] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#050409] leading-snug">
                    {result}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Client Review Quote (if present in data) */}
        {review && review.quote && (
          <section className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1F4633] to-[#122b1f] text-[#F7F1DB] border border-[#8DBF9F]/30 shadow-lg space-y-4">
            <blockquote className="text-base sm:text-lg italic leading-relaxed text-[#F7F1DB]">
              "{review.quote}"
            </blockquote>
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
              <div>
                <span className="font-bold text-[#F7F1DB] block">
                  {review.author}
                </span>
                <span className="text-[#8DBF9F]">{review.role}</span>
              </div>
              {review.platform && (
                <span className="uppercase text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-[#F7F1DB]/80 border border-white/10">
                  Verified via {review.platform}
                </span>
              )}
            </div>
          </section>
        )}

        {/* Next Steps CTA */}
        <div className="text-center py-8 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-[#050409]">
            Ready to build a system like this?
          </h2>
          <p className="text-sm text-[#050409]/70 max-w-md mx-auto">
            Book a 30-minute discovery call to map out your outbound architecture and Clay waterfall.
          </p>
          <a
            href={siteContent.brand.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#050409] hover:bg-[#1F4633] text-[#F7F1DB] text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a discovery call</span>
          </a>
        </div>
      </main>

      <FinalCtaAndFooter />
    </div>
  );
}
