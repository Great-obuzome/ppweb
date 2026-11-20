"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { ProjectItem } from "@/data/projects";
import { ToolIcon } from "./ToolIcon";
import { X, ArrowUpRight, Workflow, CheckCircle2 } from "lucide-react";

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#050409]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#050409] text-[#F7F1DB] rounded-[28px] border border-[#F7F1DB]/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Close Button */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#1F4633] text-[#F7F1DB]">
              {project.category}
            </span>
            {Boolean(project.metric) && (
              <span className="px-2.5 py-0.5 rounded text-xs font-extrabold bg-[#F7F1DB] text-[#1F4633]">
                {project.metric}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F1DB] flex items-center justify-center transition-colors active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Thumbnail / Visual Placeholder */}
          <div className="relative w-full aspect-[16/9] rounded-[20px] overflow-hidden bg-[#0c0b14] border border-white/10">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#151227] to-[#050409]">
                <Workflow className="w-10 h-10 text-[#1F4633] mb-2 opacity-75" />
                <span className="text-xs font-mono text-[#F7F1DB]/50">
                  Visual Architecture / Thumbnail coming soon
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F7F1DB] mb-2 leading-snug">
              {project.title}
            </h2>
            <p className="text-sm text-[#F7F1DB]/70 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Problem & What I Built Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {project.problem && (
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7F1DB]/50 mb-2">
                  The Problem
                </h4>
                <p className="text-xs text-[#F7F1DB]/80 leading-relaxed font-normal">
                  {project.problem}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F4633] mb-2">
                  What I Built
                </h4>
                <p className="text-xs text-[#F7F1DB]/80 leading-relaxed font-normal">
                  {project.solution}
                </p>
              </div>
            )}
          </div>

          {/* Result (if provided) */}
          {Boolean(project.result) && (
            <div className="p-4 rounded-xl bg-[#1F4633]/20 border border-[#1F4633]/40 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7F1DB] mb-1">
                  Result
                </h4>
                <p className="text-xs text-[#F7F1DB]/90 leading-relaxed font-medium">
                  {project.result}
                </p>
              </div>
            </div>
          )}

          {/* Tools Used Row */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7F1DB]/50 mb-3">
              Technologies & Infrastructure
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((toolId) => (
                <div
                  key={toolId}
                  className="flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full"
                >
                  <div className="w-4 h-4 bg-white rounded flex items-center justify-center p-0.5">
                    <ToolIcon id={toolId} className="w-3 h-3 object-contain" />
                  </div>
                  <span className="text-xs font-medium text-[#F7F1DB] capitalize">
                    {toolId.replace("-", " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with Action */}
        <div className="p-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-xs text-[#F7F1DB]/50">
            Have a similar system in mind?
          </span>
          <a
            href="https://calendly.com/upbynature/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#1F4633] hover:bg-[#2A5E45] text-[#F7F1DB] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <span>Book a call</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
