"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { FinalCtaAndFooter } from "@/components/FinalCtaAndFooter";
import { projects, ProjectItem } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { CaseStudyModal } from "@/components/CaseStudyModal";
import { SplitHeading } from "@/components/SplitHeading";
import { ArrowLeft, Search, Filter } from "lucide-react";

type CategoryFilter = "All" | "Clay" | "n8n" | "Outbound" | "AI Agents" | "Dashboards";

export default function WorkLibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories: CategoryFilter[] = ["All", "Clay", "n8n", "Outbound", "AI Agents", "Dashboards"];

  // Filter projects by category and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F7F1DB] via-[#F1ECD5] to-[#E6E4C6] text-[#050409]">
      {/* Navbar with same brand header */}
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 sm:px-10 pt-32 pb-24">
        {/* Back to Home Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#050409]/70 hover:text-[#1F4633] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F4633]" />
            <span className="text-xs font-bold tracking-[0.24em] uppercase text-[#1F4633]">
              PROJECT LIBRARY
            </span>
          </div>
          <SplitHeading
            as="h1"
            lead="All"
            accent="Projects"
            className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4"
          />
          <p className="text-sm sm:text-base text-[#050409]/75 max-w-2xl font-normal leading-relaxed">
            Explore the complete directory of lead generation, waterfall enrichment, and outbound automation systems.
          </p>
        </div>

        {/* Filter Chips & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#050409]/10">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(12);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 ${
                  selectedCategory === cat
                    ? "bg-[#050409] text-[#F7F1DB] shadow-sm"
                    : "bg-white/80 text-[#050409]/75 hover:bg-white hover:text-[#050409] border border-[#050409]/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#050409]/40 pointer-events-none" />
            <input
              type="text"
              placeholder="Search systems, tools..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(12);
              }}
              className="w-full bg-white/90 border border-[#050409]/15 rounded-full pl-10 pr-4 py-2 text-xs font-medium text-[#050409] placeholder:text-[#050409]/40 focus:outline-none focus:border-[#1F4633] transition-colors shadow-2xs"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {displayedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                onOpenModal={setSelectedProject}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center justify-center bg-white/40 rounded-3xl border border-[#050409]/10 p-8">
            <Filter className="w-8 h-8 text-[#050409]/30 mb-3" />
            <h3 className="text-base font-bold text-[#050409] mb-1">No matching projects found</h3>
            <p className="text-xs text-[#050409]/60 max-w-xs mb-4">
              Try adjusting your category filter or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-xs font-bold text-[#1F4633] underline underline-offset-4"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="px-8 py-3.5 rounded-full bg-[#050409] hover:bg-[#1F4633] text-[#F7F1DB] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-95"
            >
              Load more
            </button>
          </div>
        )}
      </main>

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        project={selectedProject}
        projectsList={filteredProjects}
        onSelectProject={setSelectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Footer */}
      <FinalCtaAndFooter />
    </div>
  );
}
