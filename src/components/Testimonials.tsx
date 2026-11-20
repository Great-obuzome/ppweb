"use client";

import React, { useState } from "react";
import { siteContent, TestimonialItem } from "@/data/content";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function Testimonials() {
  const { testimonials } = siteContent;
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.items.length - 1 : current - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current === testimonials.items.length - 1 ? 0 : current + 1));
  };

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto overflow-hidden">
      {/* Header with Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#1F4633]" />
            <span className="text-xs font-bold tracking-[0.24em] uppercase text-[#1F4633]">
              {testimonials.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#050409]">
            {testimonials.heading}
          </h2>
        </div>

        {/* Carousel buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-11 h-11 rounded-full border border-[#1F4633]/20 bg-white flex items-center justify-center text-[#050409] hover:bg-[#1F4633] hover:text-[#F7F1DB] transition-colors shadow-xs active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-11 h-11 rounded-full border border-[#1F4633]/20 bg-white flex items-center justify-center text-[#050409] hover:bg-[#1F4633] hover:text-[#F7F1DB] transition-colors shadow-xs active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Testimonials Grid / Carousel View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.items.map((item: TestimonialItem, idx: number) => {
          const isFeatured = idx === activeIndex;
          return (
            <div
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className={`cursor-pointer rounded-[24px] p-8 transition-all duration-300 flex flex-col justify-between border ${
                isFeatured
                  ? "bg-white border-[#1F4633] shadow-lg -translate-y-2"
                  : "bg-white/60 border-[#1F4633]/15 hover:border-[#1F4633]/50 hover:bg-white"
              }`}
            >
              <div>
                <Quote className="w-8 h-8 text-[#1F4633]/40 mb-6" />
                <p className="text-sm sm:text-base text-[#050409]/85 leading-relaxed font-normal mb-8 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-[#1F4633]/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-[#050409] tracking-tight">
                    {item.author}
                  </div>
                  <div className="text-xs text-[#050409]/60 font-medium">
                    {item.role}, {item.company}
                  </div>
                </div>

                <div
                  className={`w-3 h-3 rounded-full transition-colors ${
                    isFeatured ? "bg-[#1F4633]" : "bg-[#1F4633]/20"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
