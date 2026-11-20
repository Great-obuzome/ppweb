"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectItem } from "@/data/projects";
import { siteContent, ToolItem } from "@/data/content";
import { ToolIcon } from "./ToolIcon";
import {
  X,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Workflow,
  CheckCircle2,
} from "lucide-react";

interface CaseStudyModalProps {
  project: ProjectItem | null;
  projectsList: ProjectItem[];
  onClose: () => void;
  onSelectProject: (p: ProjectItem) => void;
  originRect?: DOMRect | null;
}

export function CaseStudyModal({
  project,
  projectsList,
  onClose,
  onSelectProject,
  originRect,
}: CaseStudyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  const currentIndex = project
    ? projectsList.findIndex((p) => p.slug === project.slug)
    : -1;
  const total = projectsList.length;

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectProject(projectsList[currentIndex - 1]);
    } else {
      onSelectProject(projectsList[total - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      onSelectProject(projectsList[currentIndex + 1]);
    } else {
      onSelectProject(projectsList[0]);
    }
  };

  // Keyboard controls: ESC to close, Left/Right arrows to navigate, and focus trap
  useEffect(() => {
    if (!project) return;

    previouslyFocusedElement.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    // Focus the modal container
    if (modalRef.current) {
      modalRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [project, currentIndex]);

  if (!project) return null;

  // Retrieve official tool name from siteContent
  const getToolData = (toolId: string) => {
    const found = siteContent.tools.find(
      (t: ToolItem) => t.id.toLowerCase() === toolId.toLowerCase()
    );
    return {
      id: found ? found.id : toolId,
      name: found ? found.name : toolId.replace("-", " "),
    };
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 perspective-1600"
    >
      {/* 1. Backdrop: #050409 at 55% with 6px blur, fades in */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#050409]/60 backdrop-blur-[6px] transition-opacity duration-300 animate-in fade-in"
      />

      {/* 2. Expanded Flip Card Container (Centered in viewport, max-width 920px, max-height 88vh) */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-[920px] max-h-[90vh] md:max-h-[88vh] rounded-[24px] bg-[#050409] text-[#F7F1DB] border border-[#F7F1DB]/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden outline-none animate-flip-expand"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle green radial glow in top-right (#1F4633 at ~18%) */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(31, 70, 51, 0.22) 0%, rgba(31, 70, 51, 0) 70%)",
          }}
          aria-hidden="true"
        />

        {/* HEADER: Category pill, Title, One-line summary, 40px Circle Close button */}
        <div className="relative z-10 px-6 sm:px-8 pt-6 pb-4 border-b border-white/[0.08] flex items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#1F4633] text-[#F7F1DB] shadow-xs">
                {project.category}
              </span>
              {Boolean(project.metric) && (
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-[#F7F1DB] text-[#1F4633]">
                  {project.metric}
                </span>
              )}
            </div>

            <h2
              id="case-study-title"
              className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#F7F1DB] leading-snug mb-1"
            >
              {project.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#F7F1DB]/70 font-normal leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Close Button: 40px circle, top-right */}
          <button
            onClick={onClose}
            aria-label="Close case study dialog"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F1DB] flex items-center justify-center transition-all duration-200 active:scale-95 flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SCROLLABLE BODY: Two columns on desktop, one column on mobile */}
        <div className="relative z-10 flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-8 md:space-y-0 md:grid md:grid-cols-12 md:gap-8">
          
          {/* LEFT COLUMN (5 cols on desktop): Thumbnail + White Tool Chips */}
          <div className="md:col-span-5 flex flex-col space-y-6">
            {/* 16:10 Thumbnail */}
            <div className="relative w-full aspect-[16/10] rounded-[18px] overflow-hidden bg-[#0c0b14] border border-white/10 shadow-sm">
              {project.thumbnail ? (
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-[#131022] to-[#050409]">
                  <Workflow className="w-8 h-8 text-[#1F4633] mb-2 opacity-80" />
                  <span className="text-xs font-mono text-[#F7F1DB]/50">
                    Thumbnail coming soon
                  </span>
                </div>
              )}
            </div>

            {/* Tool Chips with official logos and names (reused from Services cards) */}
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1F4633]/90 block mb-3">
                INTEGRATED STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((rawTool) => {
                  const tool = getToolData(rawTool);
                  return (
                    <div
                      key={tool.id}
                      className="inline-flex items-center gap-2 h-8 pl-2.5 pr-3 bg-white rounded-full border border-[#1F4633]/20 shadow-2xs select-none"
                    >
                      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                        <ToolIcon id={tool.id} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-xs font-medium text-[#050409] tracking-tight leading-none whitespace-nowrap">
                        {tool.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (7 cols on desktop): The problem, What I built, Workflow, Result */}
          <div className="md:col-span-7 flex flex-col space-y-6">
            
            {/* 1. The Problem */}
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1F4633]/90 block mb-2">
                THE PROBLEM
              </span>
              <p className="text-xs sm:text-sm text-[#F7F1DB]/80 leading-relaxed font-normal">
                {project.problem}
              </p>
            </div>

            {/* 2. What I Built (3-5 bullets with green check icons) */}
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1F4633]/90 block mb-2.5">
                WHAT I BUILT
              </span>
              <ul className="space-y-2.5">
                {project.solution.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#F7F1DB]/85 leading-relaxed font-normal">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-[#1F4633]/20 text-[#10B981] flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Workflow (Horizontal node diagram with animated flow dot) */}
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1F4633]/90 block mb-3">
                WORKFLOW ARCHITECTURE
              </span>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-2 min-w-max">
                  {project.steps.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <div className="px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/10 text-[11px] font-semibold text-[#F7F1DB] flex items-center gap-1.5 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1F4633]" />
                        <span>{step}</span>
                      </div>
                      {idx < project.steps.length - 1 && (
                        <div className="relative w-6 h-[2px] bg-[#1F4633]/40 flex items-center justify-center flex-shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1F4633] animate-pulse" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Result (Shown ONLY if the project has real results) */}
            {project.results && project.results.length > 0 && (
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1F4633]/90 block mb-3">
                  RESULTS
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.results.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#1F4633]/15 border border-[#1F4633]/30 flex flex-col"
                    >
                      <span className="text-xl sm:text-2xl font-extrabold text-[#F7F1DB] tracking-tight">
                        {res.value}
                      </span>
                      <span className="text-[10px] text-[#F7F1DB]/70 uppercase tracking-wider mt-0.5">
                        {res.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* FOOTER BAR: Book a discovery call, See all projects, Prev/Next navigation */}
        <div className="relative z-10 px-6 sm:px-8 py-4 border-t border-white/[0.08] bg-[#050409]/95 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Action CTAs */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
            <a
              href={siteContent.brand.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-[#F7F1DB] hover:bg-white text-[#1F4633] text-xs font-bold uppercase tracking-[0.14em] transition-all duration-200 shadow-sm flex items-center gap-1.5 active:scale-95"
            >
              <span>Book a discovery call</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <Link
              href="/work"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-white/20 hover:border-white/50 text-[#F7F1DB] text-xs font-semibold uppercase tracking-[0.14em] transition-colors"
            >
              See all projects
            </Link>
          </div>

          {/* Prev/Next arrows & Counter */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#F7F1DB]/50">
              {currentIndex + 1} / {total}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                aria-label="Previous project"
                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-[#F7F1DB] flex items-center justify-center transition-colors active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next project"
                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-[#F7F1DB] flex items-center justify-center transition-colors active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Scoped CSS for Flip & Expand animation with iOS Safari -webkit- prefixes */}
      <style jsx>{`
        .perspective-1600 {
          perspective: 1600px;
          -webkit-perspective: 1600px;
        }

        @keyframes flipExpand {
          0% {
            opacity: 0.2;
            transform: scale(0.65) rotateY(-80deg);
          }
          45% {
            opacity: 0.8;
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
          }
        }

        .animate-flip-expand {
          animation: flipExpand 650ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-flip-expand {
            animation: fadeIn 250ms ease forwards !important;
            transform: none !important;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        }
      `}</style>
    </div>
  );
}
