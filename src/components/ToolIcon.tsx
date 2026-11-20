import React from "react";
import Image from "next/image";
import { siteContent, ToolItem } from "@/data/content";

interface ToolIconProps {
  id: string;
  className?: string;
  alt?: string;
}

export function ToolIcon({ id, className = "w-6 h-6", alt }: ToolIconProps) {
  const tool = siteContent.tools.find((t: ToolItem) => t.id === id);

  if (!tool) {
    return (
      <div className={`flex items-center justify-center font-bold text-[9px] uppercase ${className}`}>
        {id.slice(0, 3)}
      </div>
    );
  }

  const isSvg = tool.logoPath.endsWith(".svg");
  const displayName = alt || tool.name;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Real official logo file loaded locally from /public/logos */}
      <img
        src={tool.logoPath}
        alt={`${displayName} official logo`}
        className="w-full h-full object-contain pointer-events-none select-none"
        loading="lazy"
        onError={(e) => {
          // If fallback needed, show clean text
          console.error(`Failed to load logo for ${displayName}`);
        }}
      />
    </div>
  );
}
