"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteContent } from "@/data/content";
import { projects, ProjectItem } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { CaseStudyModal } from "./CaseStudyModal";
import { ArrowUpRight } from "lucide-react";

export function SelectedWork() {
  const { caseStudies } = siteContent;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Take the 6 featured projects for Section 5
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <section
      id="work"
      className="relative w-full pt-24 sm:pt-28 pb-20 sm:pb-24 px-6 sm:px-10 overflow-hidden bg-gradient-to-b from-[#F7F1DB] via-[#F1ECD5] to-[#FAF6E8]"
    >
      {/* 1. Seamless Gradient & Dotted Grid Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft radial glow of #1F4633 at ~6% opacity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#1F4633]/[0.06] blur-[140px] pointer-events-none" />

        {/* Faint dotted grid overlay matching hero */}
        <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="work-grid-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.1" fill="#050409" fillOpacity="0.06" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#work-grid-dots)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Eyebrow & Headline */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F4633]" />
              <span className="text-xs font-bold tracking-[0.24em] uppercase text-[#1F4633]">
                {caseStudies.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#050409]">
              {caseStudies.heading}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#050409]/60 max-w-xs font-normal">
            Automated architectures built for high-intent B2B conversion.
          </p>
        </div>

        {/* 2. Cards with Thumbnails Grid: 3 columns x 2 rows (6 cards) on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onOpenModal={setSelectedProject}
            />
          ))}
        </div>

        {/* 3. Centered "View all projects" button with exactly ~40px of spacing */}
        <div className="mt-10 flex items-center justify-center text-center">
          <Link
            href="/work"
            className="group px-7 py-3 rounded-full bg-[#050409] hover:bg-[#1F4633] text-[#F7F1DB] text-xs font-bold uppercase tracking-[0.16em] transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2 active:scale-95"
          >
            <span>View all projects</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
