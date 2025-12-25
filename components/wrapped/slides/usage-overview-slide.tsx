"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { userStats } from "@/lib/data";
import Image from "next/image";

function ActivityGrid() {
  const months = userStats.monthlyQuestions;
  const maxCount = Math.max(...months.map(m => m.count));
  
  // Generate 31 dots per month (days)
  const generateDots = (monthCount: number) => {
    const dots = [];
    for (let i = 0; i < 31; i++) {
      // Simulate daily activity based on monthly total
      const baseActivity = monthCount / 31;
      const randomFactor = Math.random() * 0.8 + 0.6;
      const dayActivity = baseActivity * randomFactor;
      const normalizedActivity = dayActivity / (maxCount / 31);
      
      // Determine color intensity
      const intensity = Math.min(normalizedActivity, 1);
      dots.push(intensity);
    }
    return dots;
  };

  // Pre-generate dots for consistency
  const [monthDots] = useState(() => 
    months.map(m => generateDots(m.count))
  );

  // Use brand blue color for recent months (last 2)
  const brandColor = "#176BE5";
  
  return (
    <div className="w-full h-full grid grid-cols-12 gap-[2px] bg-[#141414]">
      {months.map((month, monthIndex) => (
        <div key={month.month} className="flex flex-col gap-[2px]">
          {monthDots[monthIndex].map((intensity, dayIndex) => {
            const isRecent = monthIndex >= 10; // Nov, Dec
            const baseColor = isRecent ? brandColor : "rgba(237, 236, 236, 0.6)";
            const bgColor = intensity < 0.15 
              ? "rgba(237, 236, 236, 0.06)" 
              : baseColor;
            const opacity = intensity < 0.15 ? 1 : Math.max(0.4, intensity);
            
            return (
              <div key={dayIndex} className="flex-1 flex items-center justify-center min-h-0">
                <div 
                  className="w-full aspect-square rounded-full max-w-[10px] max-h-[10px]"
                  style={{ 
                    backgroundColor: bgColor,
                    opacity 
                  }}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function UsageOverviewSlide() {
  const [scale, setScale] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const updateScale = () => {
      if (wrapperRef.current) {
        const wrapperHeight = wrapperRef.current.clientHeight;
        const cardHeight = 500;
        const newScale = Math.min(wrapperHeight / cardHeight, 1);
        setScale(newScale);
      }
    };
    
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const topSources = userStats.sourcesSearched.slice(0, 3);

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", ease: "easeIn", delay: 0.2 }}
        className="mb-8 text-center"
      >
        <h2 className="yir-heading">Usage Overview</h2>
        <p className="yir-subheading mt-2">Your Year</p>
      </motion.div>

      <motion.div 
        ref={wrapperRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", ease: "easeIn", delay: 0.3 }}
        className="w-full flex items-center justify-center"
        style={{ height: "480px" }}
      >
        <div 
          className="grid grid-cols-2 overflow-hidden p-5 gap-5"
          style={{ 
            width: "500px",
            height: "500px",
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            background: "radial-gradient(49.41% 64.58% at 49.4% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%), #141414",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: 16,
            boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Left Column */}
          <div className="flex flex-col justify-between min-h-0">
            <div className="flex flex-col gap-6">
              {/* Stats Section */}
              <div className="flex flex-col gap-6">
                {/* Usage Rank */}
                <div className="flex flex-col gap-1">
                  <p className="text-[14px] text-[--color-theme-text-secondary]">Usage</p>
                  <p className="text-[18px] font-medium text-[--color-theme-text-primary]">Top 0.001%</p>
                </div>

                {/* Top Sources */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-[14px] font-medium text-[--color-theme-text-secondary]">Top Sources</h3>
                  <div className="flex flex-col gap-1">
                    {topSources.map((source, index) => (
                      <div key={source} className="flex items-center gap-3 text-[18px] font-medium text-[--color-theme-text-primary]">
                        <span className="min-w-[12px] text-[--color-theme-text-secondary] tabular-nums">{index + 1}</span>
                        <span className="whitespace-nowrap">{source}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats Row 1 */}
                <div className="flex gap-8">
                  <div className="flex flex-col flex-1 gap-1">
                    <p className="text-[14px] text-[--color-theme-text-secondary]">Questions</p>
                    <p className="text-[18px] font-medium text-[--color-theme-text-primary]">{userStats.totalQuestions}</p>
                  </div>
                  <div className="flex flex-col flex-1 gap-1">
                    <p className="text-[14px] text-[--color-theme-text-secondary]">Workflows</p>
                    <p className="text-[18px] font-medium text-[--color-theme-text-primary]">{userStats.workflowsRun}</p>
                  </div>
                </div>

                {/* Stats Row 2 */}
                <div className="flex gap-8">
                  <div className="flex flex-col flex-1 gap-1">
                    <p className="text-[14px] text-[--color-theme-text-secondary]">Time Saved</p>
                    <p className="text-[18px] font-medium text-[--color-theme-text-primary]">{userStats.timeSavedHours}h</p>
                  </div>
                  <div className="flex flex-col flex-1 gap-1">
                    <p className="text-[14px] text-[--color-theme-text-secondary]">Streak</p>
                    <p className="text-[18px] font-medium text-[--color-theme-text-primary]">{userStats.longestStreak}d</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-3 flex-shrink-0">
              <div className="flex items-center gap-3">
                <Image 
                  src="/super.svg" 
                  alt="Super" 
                  width={24} 
                  height={24}
                  className="h-6 w-auto"
                />
                <span className="text-[14px] text-[--color-theme-text-secondary]">super.work/2025</span>
              </div>
            </div>
          </div>

          {/* Right Column - Activity Grid */}
          <div className="min-w-0 min-h-0 overflow-hidden">
            <ActivityGrid />
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-8 flex items-center gap-2 text-[--text-xs] text-[--color-theme-text-quaternary]">
        <span>Powered by</span>
        <span className="font-medium text-[--color-theme-text-tertiary]">Super</span>
      </div>
    </div>
  );
}
