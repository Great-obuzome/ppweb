"use client";

import React, { useState } from "react";
import { siteContent } from "@/data/content";
import { projects, ProjectItem } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { CaseStudyModal } from "./CaseStudyModal";
import { SectionHeader } from "./SectionHeader";

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
        {/* Reusable SectionHeader */}
        <SectionHeader
          eyebrow={caseStudies.eyebrow}
          split={caseStudies.heading}
          description={caseStudies.description}
          buttonLabel={caseStudies.buttonLabel}
          buttonUrl={caseStudies.buttonUrl}
        />

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
      </div>

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        project={selectedProject}
        projectsList={featuredProjects}
        onSelectProject={setSelectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
