"use client";

import React from "react";
import Image from "next/image";
import { ProjectItem } from "@/data/projects";
import { ToolIcon } from "./ToolIcon";
import { ArrowUpRight, Workflow } from "lucide-react";

interface ProjectCardProps {
  project: ProjectItem;
  onOpenModal: (project: ProjectItem) => void;
  isOpening?: boolean;
}

export function ProjectCard({ project, onOpenModal, isOpening }: ProjectCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpenModal(project);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      data-project-slug={project.slug}
      onClick={() => onOpenModal(project)}
      onKeyDown={handleKeyDown}
      aria-haspopup="dialog"
      aria-label={`View case study: ${project.title}`}
      className={`group cursor-pointer bg-[#050409] text-[#F7F1DB] rounded-[24px] p-3 sm:p-3.5 border border-[#F7F1DB]/[0.08] flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#1F4633] hover:shadow-[0_12px_30px_rgba(31,70,51,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4633] motion-reduce:transform-none select-none ${
        isOpening ? "opacity-30 pointer-events-none" : "opacity-100"
      }`}
    >
      <div>
        {/* Top Thumbnail: 16:10 ratio, 16px inner radius, subtle bottom gradient overlay */}
        <div className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden bg-[#0c0b14] border border-white/[0.05]">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
            />
          ) : (
            /* Styled placeholder: Dark panel with faint workflow-node illustration and label */
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center relative overflow-hidden bg-gradient-to-b from-[#131022] to-[#050409]">
              {/* Subtle background nodes illustration */}
              <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 200 120" fill="none">
                  <circle cx="40" cy="60" r="12" stroke="#1F4633" strokeWidth="2" strokeDasharray="3 3" />
                  <circle cx="100" cy="40" r="14" stroke="#F7F1DB" strokeWidth="2" />
                  <circle cx="160" cy="70" r="12" stroke="#1F4633" strokeWidth="2" strokeDasharray="3 3" />
                  <path d="M52 60 Q 75 40, 86 40 M 114 40 Q 135 60, 148 70" stroke="#1F4633" strokeWidth="1.5" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#F7F1DB]/50">
                  <Workflow className="w-4 h-4 text-[#1F4633]" />
                </div>
                <span className="text-[11px] font-medium tracking-wide text-[#F7F1DB]/40 font-mono">
                  Thumbnail coming soon
                </span>
              </div>
            </div>
          )}

          {/* Bottom gradient so thumbnail blends seamlessly into dark card */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#050409] to-transparent pointer-events-none" />

          {/* Overlaid Pill: Top-Left Category */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/10 backdrop-blur-md border border-white/15 text-[#F7F1DB]/90 shadow-xs">
              {project.category}
            </span>
          </div>

          {/* Overlaid Expand Arrow: Top-Right (appears on hover) */}
          <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-6 h-6 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-[#F7F1DB]">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Overlaid Metric Badge: Bottom-Left (rendered ONLY if metric is provided in data) */}
          {Boolean(project.metric) && (
            <div className="absolute bottom-2.5 left-2.5 z-10">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-wide bg-[#F7F1DB] text-[#1F4633] shadow-md border border-[#1F4633]/20">
                {project.metric}
              </span>
            </div>
          )}
        </div>

        {/* Content Below Thumbnail: Title & Description */}
        <div className="px-2 pt-4 pb-2">
          {/* Title (max 2 lines) */}
          <h3 className="text-base font-bold tracking-tight text-[#F7F1DB] line-clamp-2 mb-2 group-hover:text-[#F7F1DB] transition-colors leading-snug">
            {project.title}
          </h3>

          {/* Description (max 2 lines, clamp rest) */}
          <p className="text-xs text-[#F7F1DB]/60 font-normal leading-relaxed line-clamp-2 mb-4">
            {project.description}
          </p>
        </div>
      </div>

      {/* Bottom Area: Tool Chips + "View case study" link */}
      <div className="px-2 pt-3 border-t border-white/[0.06] flex items-center justify-between">
        {/* Row of small white tool-logo chips */}
        <div className="flex items-center gap-1.5 overflow-hidden">
          {project.tools.slice(0, 4).map((toolId) => (
            <div
              key={toolId}
              title={toolId.toUpperCase()}
              className="w-5 h-5 rounded bg-white flex items-center justify-center p-0.5 shadow-2xs border border-white/10 flex-shrink-0"
            >
              <ToolIcon id={toolId} className="w-3.5 h-3.5 object-contain" />
            </div>
          ))}
          {project.tools.length > 4 && (
            <span className="text-[10px] text-[#F7F1DB]/50 font-mono ml-0.5">
              +{project.tools.length - 4}
            </span>
          )}
        </div>

        {/* "View case study" Link with Arrow in cream */}
        <div className="inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-[#F7F1DB] group-hover:text-[#F7F1DB]/80 transition-colors">
          <span>View case study</span>
          <ArrowUpRight className="w-3 h-3 text-[#F7F1DB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}
