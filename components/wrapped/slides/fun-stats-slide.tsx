"use client";

import { motion } from "framer-motion";
import { userStats } from "@/lib/data";

export function FunStatsSlide() {
  const assistants = userStats.topAssistants;
  const maxRuns = Math.max(...assistants.map(a => a.runs));

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", ease: "easeIn", delay: 0.2 }}
        className="mb-8 text-center"
      >
        <h2 className="yir-heading">Your Favorites</h2>
        <p className="yir-subheading mt-2">Top Assistants</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", ease: "easeIn", delay: 0.3 }}
        className="w-full max-w-md overflow-hidden p-5"
        style={{
          background: "radial-gradient(49.41% 64.58% at 49.4% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%), #141414",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: 16,
          boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="w-full h-[280px] flex flex-col justify-end relative">
          <div className="w-full h-full flex items-end">
            <div className="flex w-full h-full gap-3">
              {assistants.map((assistant) => {
                const heightPercent = Math.max((assistant.runs / maxRuns) * 85, 5);
                const isTop = assistant.runs === maxRuns;
                
                return (
                  <div key={assistant.name} className="flex-1 flex flex-col relative">
                    <div className="flex-1 relative">
                      <div 
                        className="absolute inset-0 flex items-end origin-bottom pointer-events-none"
                        style={{ opacity: 1 }}
                      >
                        <div 
                          className="absolute text-[12px] font-medium text-[--color-theme-text-primary] left-1/2 -translate-x-1/2 whitespace-nowrap"
                          style={{ 
                            bottom: `calc(${heightPercent}% + 8px)`,
                          }}
                        >
                          {assistant.runs}
                        </div>
                        <div 
                          className="w-full rounded-sm transition-all duration-150"
                          style={{ 
                            height: `${heightPercent}%`,
                            backgroundColor: isTop ? assistant.color : "var(--color-theme-bg-tertiary)",
                          }}
                        />
                      </div>
                    </div>
                    <div 
                      className="text-[9px] text-[--color-theme-text-tertiary] text-center mt-2 leading-tight"
                      style={{ 
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "24px",
                      }}
                    >
                      {assistant.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-12">
          <div className="text-center">
            <div className="text-[12px] text-[--color-theme-text-tertiary]">Top assistant</div>
            <div className="text-[18px] font-semibold text-[--color-theme-text-primary]">
              {assistants[0].name}
            </div>
          </div>
          <div className="text-center">
            <div className="text-[12px] text-[--color-theme-text-tertiary]">Total runs</div>
            <div className="text-[18px] font-semibold text-[--color-theme-text-primary]">
              {userStats.workflowsRun.toLocaleString()}
            </div>
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
