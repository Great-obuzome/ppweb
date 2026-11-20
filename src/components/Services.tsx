import React from "react";
import { siteContent, ServiceItem } from "@/data/content";
import { Check } from "lucide-react";

export function Services() {
  const { services } = siteContent;

  return (
    <section id="services" className="py-24 px-6 max-w-6xl mx-auto">
      {/* Eyebrow & Heading */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#1F4633]" />
          <span className="text-xs font-bold tracking-[0.24em] uppercase text-[#1F4633]">
            {services.eyebrow}
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#050409]">
          {services.heading}
        </h2>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.items.map((service: ServiceItem, idx: number) => (
          <div
            key={service.id}
            className="group relative bg-white/70 backdrop-blur-xs rounded-[20px] p-8 border border-[#1F4633]/15 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#1F4633] flex flex-col justify-between"
          >
            {/* Top Indicator */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#1F4633]/70 uppercase">
                  System 0{idx + 1}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#1F4633]/20 group-hover:bg-[#1F4633] transition-colors" />
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#050409] mb-4 group-hover:text-[#1F4633] transition-colors leading-snug">
                {service.title}
              </h3>

              {/* Short Description */}
              <p className="text-sm text-[#050409]/75 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* 3 Bullet Outcomes */}
              <ul className="space-y-3 mb-8">
                {service.outcomes.map((outcome, oIdx) => (
                  <li key={oIdx} className="flex items-start gap-2.5 text-xs text-[#050409]/85 font-medium">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-[#1F4633]/10 text-[#1F4633] flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom: Tool Logos Row */}
            <div className="pt-6 border-t border-[#1F4633]/10 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#050409]/50">
                Primary Stack
              </span>
              <div className="flex items-center gap-1.5">
                {service.tools.map((toolName) => (
                  <span
                    key={toolName}
                    className="text-[11px] font-semibold tracking-wide bg-[#F7F1DB] text-[#1F4633] px-2.5 py-1 rounded-md border border-[#1F4633]/15"
                  >
                    {toolName}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
