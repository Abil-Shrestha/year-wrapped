"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const SOURCES = [
  { name: "Notion", color: "rgb(207, 45, 86)" },
  { name: "Slack", color: "rgb(219, 112, 75)" },
  { name: "Google Drive", color: "rgb(161, 105, 0)" },
  { name: "Confluence", color: "rgb(85, 165, 131)" },
  { name: "GitHub", color: "rgb(30, 85, 99)" },
  { name: "Linear", color: "rgb(98, 153, 195)" },
  { name: "Jira", color: "rgb(208, 107, 166)" },
  { name: "Intercom", color: "rgb(0, 114, 81)" },
];

const GRID_SIZE = 5;
const CHART_COLS = 73; // ~365 days / 5
const CHART_ROWS = 40;

const generatePixelData = () => {
  return SOURCES.map((source, sourceIndex) => {
    const pixels: { x: number; y: number }[] = [];
    
    // Generate pixels on a grid that form wave-like patterns
    for (let col = 0; col < CHART_COLS; col++) {
      const normalizedX = col / CHART_COLS;
      
      // Create unique wave patterns for each source
      const baseRow = 8 + sourceIndex * 3;
      const freq1 = 2 + sourceIndex * 0.4;
      const freq2 = 4 + sourceIndex * 0.3;
      const phase = sourceIndex * 0.9;
      
      const wave1 = Math.sin(normalizedX * Math.PI * freq1 + phase) * 8;
      const wave2 = Math.sin(normalizedX * Math.PI * freq2 + phase * 1.5) * 4;
      const trend = (normalizedX - 0.5) * 6 * (sourceIndex % 2 === 0 ? 1 : -1);
      
      const row = Math.round(Math.max(2, Math.min(CHART_ROWS - 2, baseRow + wave1 + wave2 + trend)));
      
      pixels.push({ x: col, y: row });
    }
    
    return { ...source, pixels };
  });
};

function PixelChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sourceData] = useState(() => generatePixelData());

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Calculate actual pixel dimensions based on grid
    const pixelWidth = CHART_COLS * GRID_SIZE;
    const pixelHeight = CHART_ROWS * GRID_SIZE;
    
    canvas.width = pixelWidth * dpr;
    canvas.height = pixelHeight * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.scale(dpr, dpr);
    
    // Scale to fit container
    const scaleX = rect.width / pixelWidth;
    const scaleY = rect.height / pixelHeight;
    ctx.scale(scaleX, scaleY);

    ctx.clearRect(0, 0, pixelWidth, pixelHeight);

    // Draw pixels for each source
    for (const source of sourceData) {
      ctx.fillStyle = source.color;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      
      for (const pixel of source.pixels) {
        const x = Math.round(GRID_SIZE * pixel.x + 2.5);
        const y = Math.round(GRID_SIZE * pixel.y + 2.5);
        
        // Draw 2px radius circle
        ctx.moveTo(x + 2, y);
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
      }
      
      ctx.fill();
    }
    
    ctx.globalAlpha = 1;
  }, [sourceData]);

  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

  return (
    <div className="w-full h-full flex flex-col">
      {/* Chart wrapper */}
      <div className="flex-1 relative min-h-0">
        {/* Month grid lines */}
        <div 
          className="absolute top-0 left-5 right-5 bottom-0 grid pointer-events-none z-0"
          style={{ gridTemplateColumns: "repeat(12, 1fr)" }}
        >
          <div />
          {months.slice(1).map((_, i) => (
            <div key={i} className="border-l border-white/[0.06]" />
          ))}
        </div>
        
        {/* Canvas */}
        <div ref={containerRef} className="absolute inset-0 z-10 mx-5">
          <canvas ref={canvasRef} />
        </div>
      </div>

      {/* Baseline */}
      <div className="h-px mx-5 bg-[#2a2a2a]" />

      {/* Month labels */}
      <div 
        className="grid mt-2 mx-5"
        style={{ gridTemplateColumns: "repeat(12, 1fr)" }}
      >
        {months.map((month, i) => (
          <span 
            key={i} 
            className="text-[12px] text-[--color-theme-text-tertiary]"
          >
            {month}
          </span>
        ))}
      </div>

      {/* Legend */}
      <div 
        className="grid gap-2 mt-5 mx-5"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))" }}
      >
        {sourceData.map((source) => (
          <div key={source.name} className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: source.color }}
            />
            <span className="text-[12px] text-[--color-theme-text-primary]">
              {source.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArchetypeSlide() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", ease: "easeIn", delay: 0.2 }}
        className="mb-8 text-center"
      >
        <h2 className="yir-heading">Source Usage</h2>
        <p className="yir-subheading mt-2">Your Super Signature</p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", ease: "easeIn", delay: 0.3 }}
        className="w-full max-w-[500px] overflow-hidden"
        style={{
          background: "radial-gradient(49.41% 64.58% at 49.4% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%), #141414",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: 16,
          boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="p-5">
          <div className="h-[320px]">
            <PixelChart />
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#2a2a2a] flex items-center justify-between">
          <Image 
            src="/super.svg" 
            alt="Super" 
            width={24} 
            height={24}
            className="h-6 w-auto"
          />
          <span className="text-[16px] text-[--color-theme-text-secondary]">
            super.work/2025
          </span>
        </div>
      </motion.div>

      <div className="absolute bottom-8 flex items-center gap-2 text-[--text-xs] text-[--color-theme-text-quaternary]">
        <span>Powered by</span>
        <span className="font-medium text-[--color-theme-text-tertiary]">Super</span>
      </div>
    </div>
  );
}
