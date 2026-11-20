import React from "react";
import { siteContent, ToolItem } from "@/data/content";

export default function LogoCheckPage() {
  const { tools } = siteContent;

  return (
    <div className="min-h-screen bg-[#F7F1DB] text-[#050409] p-8 sm:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 border-b border-[#050409]/15 pb-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[#1F4633] font-bold mb-2">
            Verification Route (Temporary)
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Official Tool Logos Verification Grid
          </h1>
          <p className="text-sm text-[#050409]/70 mt-2">
            Inspecting all 16 tool icons saved locally in <code className="bg-white px-2 py-0.5 rounded font-mono text-xs">/public/logos/</code>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {tools.map((tool: ToolItem) => (
            <div
              key={tool.id}
              className="bg-white rounded-2xl p-6 border border-[#050409]/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Logo Tile preview - identical to hero tile style */}
                <div className="w-20 h-20 mx-auto rounded-2xl bg-white border border-[#050409]/10 shadow-md p-3.5 flex items-center justify-center mb-5">
                  <img
                    src={tool.logoPath}
                    alt={tool.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="text-center mb-4">
                  <h2 className="text-lg font-bold text-[#050409]">{tool.name}</h2>
                  <span className="text-xs text-[#050409]/60 font-medium">
                    {tool.category}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#050409]/10 text-xs space-y-1.5 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-[#050409]/50">Source:</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    tool.source === 'official' ? 'bg-emerald-100 text-emerald-800' :
                    tool.source === 'Simple Icons' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {tool.source}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#050409]/50">File:</span>
                  <span className="text-[11px] truncate max-w-[130px]" title={tool.logoPath}>
                    {tool.logoPath}
                  </span>
                </div>

                <div className="pt-1">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-[#1F4633] hover:underline block truncate"
                    title={tool.sourceUrl}
                  >
                    ↗ {tool.sourceUrl}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
