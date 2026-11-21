"use client";

import React, { useState } from "react";
import { motion, useMotionValue, animate, PanInfo } from "framer-motion";
import { ToolItem } from "@/data/content";
import { ToolIcon } from "./ToolIcon";

interface DraggableRingTileProps {
  tool: ToolItem;
  index: number;
  x: number;
  y: number;
  sizePx: number;
  tileDelay: number;
  rotationReady: boolean;
  isPaused: boolean;
  shouldReduceMotion: boolean;
  activeTooltip: string | null;
  onTileHover: (hovered: boolean, toolName: string | null) => void;
  onTileDragStart: () => void;
  onTileDragEnd: () => void;
  checkInsideSafeZone: (clientX: number, clientY: number) => boolean;
}

export function DraggableRingTile({
  tool,
  index,
  x,
  y,
  sizePx,
  tileDelay,
  rotationReady,
  isPaused,
  shouldReduceMotion,
  activeTooltip,
  onTileHover,
  onTileDragStart,
  onTileDragEnd,
  checkInsideSafeZone,
}: DraggableRingTileProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const handleDragStart = () => {
    setIsDragging(true);
    onTileDragStart();
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    onTileDragEnd();

    // Check if released inside the text safe zone
    const isSafe = checkInsideSafeZone(info.point.x, info.point.y);

    if (isSafe || shouldReduceMotion) {
      // Snap back immediately if released inside the text safe zone
      animate(dragX, 0, { type: "spring", stiffness: 480, damping: 32, duration: 0.12 });
      animate(dragY, 0, { type: "spring", stiffness: 480, damping: 32, duration: 0.12 });
    } else {
      // Springs back to its exact orbit position (stiffness about 120, damping about 14)
      animate(dragX, 0, { type: "spring", stiffness: 120, damping: 14 });
      animate(dragY, 0, { type: "spring", stiffness: 120, damping: 14 });
    }
  };

  return (
    <div
      className="absolute top-1/2 left-1/2 flex items-center justify-center pointer-events-auto"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`,
        zIndex: isDragging ? 60 : 10,
      }}
      onMouseEnter={() => {
        if (!isDragging) {
          onTileHover(true, tool.name);
        }
      }}
      onMouseLeave={() => {
        if (!isDragging) {
          onTileHover(false, null);
        }
      }}
    >
      {/* Counter-rotation keeps logos upright */}
      <div
        style={{
          animationName: rotationReady ? "orbitCounterRotate" : "none",
          animationDuration: "90s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {/* Entry animation: scale 0.6 -> 1, opacity 0 -> 1 */}
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.45,
            delay: shouldReduceMotion ? 0 : tileDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
          suppressHydrationWarning
        >
          {/* Gentle staggered floating animation (paused while dragging) */}
          <div
            className="group relative"
            style={{
              animation: `toolFloat 4s ease-in-out infinite ${index * 0.25}s`,
              animationPlayState: isDragging ? "paused" : "running",
            }}
          >
            {/* Draggable Tile with Framer Motion */}
            <motion.div
              drag
              dragMomentum={false}
              dragElastic={0.4}
              style={{
                x: dragX,
                y: dragY,
                width: `${sizePx}px`,
                height: `${sizePx}px`,
              }}
              whileHover={isDragging ? undefined : { scale: 1.22 }}
              whileDrag={{
                scale: 1.08,
                boxShadow: "0 24px 44px -8px rgba(5, 4, 9, 0.35), 0 12px 20px -4px rgba(5, 4, 9, 0.2)",
              }}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              className={`bg-white rounded-2xl p-2.5 shadow-sm border border-[#050409]/8 flex items-center justify-center transition-colors duration-200 cursor-grab active:cursor-grabbing select-none ${
                isDragging
                  ? "cursor-grabbing shadow-2xl ring-2 ring-[#1F4633]/30 z-50"
                  : "hover:border-[#1F4633]/30 hover:shadow-xl"
              }`}
            >
              <ToolIcon id={tool.id} className="w-6 h-6 object-contain pointer-events-none select-none" />
            </motion.div>

            {/* Tooltip on hover (hidden while dragging) */}
            {activeTooltip === tool.name && !isDragging && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-[#050409] text-[#F7F1DB] text-[11px] font-semibold tracking-wider uppercase rounded-md shadow-lg pointer-events-none whitespace-nowrap z-50 animate-in fade-in zoom-in-95 duration-150">
                {tool.name}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
