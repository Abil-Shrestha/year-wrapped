"use client";

import { useRef, useState, useEffect, MutableRefObject } from "react";
import { motion } from "framer-motion";
import { userStats } from "@/lib/data";

interface SearchHabitsSlideProps {
  onNext?: () => void;
  flipRef?: MutableRefObject<{ flip: () => boolean } | null>;
}

export function SearchHabitsSlide({ flipRef }: SearchHabitsSlideProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (flipRef) {
      flipRef.current = {
        flip: () => {
          if (!isFlipped) {
            setIsFlipped(true);
            return false;
          }
          return true;
        }
      };
    }
    return () => {
      if (flipRef) {
        flipRef.current = null;
      }
    };
  }, [flipRef, isFlipped]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0.5, y: 0.5 });
  };

  const rotateX = isHovered ? (mousePos.y - 0.5) * 20 : 0;
  const rotateY = isHovered ? (0.5 - mousePos.x) * 20 : 0;

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", ease: "easeIn", delay: 0.2 }}
        className="mb-8 text-center"
      >
        <h2 className="yir-heading">
          {isFlipped ? "Where You Search" : "When You Search"}
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", ease: "easeIn", delay: 0.3 }}
        ref={cardRef}
        className="cursor-pointer"
        style={{ perspective: 1000 }}
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative h-[420px] w-[320px]"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${isFlipped ? 180 : 0}deg)${isHovered ? ` rotateX(${rotateX}deg) rotateY(${rotateY}deg)` : ""}`,
            transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s ease-out",
          }}
        >
          {/* Back - Where You Search */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "radial-gradient(49.41% 64.58% at 49.4% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%), #141414",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: 16,
              boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="flex flex-col h-full p-5">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-medium text-[--color-theme-text-primary]">
                  Where You Search
                </span>
                <span className="text-[14px] text-[--color-theme-text-tertiary]">
                  {userStats.year}
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[14px] text-[--color-theme-text-secondary]">💬 Slack</span>
                      <span className="text-[14px] font-medium text-[--color-theme-text-primary]">{userStats.slackQuestions}</span>
                    </div>
                    <div className="h-2 bg-[#1a1a1a] overflow-hidden">
                      <div 
                        className="h-full bg-white/30"
                        style={{ width: `${(userStats.slackQuestions / userStats.totalQuestions) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[14px] text-[--color-theme-text-secondary]">🌐 Chrome Extension</span>
                      <span className="text-[14px] font-medium text-[--color-theme-text-primary]">{userStats.chromeExtensionQuestions}</span>
                    </div>
                    <div className="h-2 bg-[#1a1a1a] overflow-hidden">
                      <div 
                        className="h-full bg-white/30"
                        style={{ width: `${(userStats.chromeExtensionQuestions / userStats.totalQuestions) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[14px] text-[--color-theme-text-secondary]">🖥️ Web App</span>
                      <span className="text-[14px] font-medium text-[--color-theme-text-primary]">{userStats.webAppQuestions}</span>
                    </div>
                    <div className="h-2 bg-[#1a1a1a] overflow-hidden">
                      <div 
                        className="h-full bg-white/30"
                        style={{ width: `${(userStats.webAppQuestions / userStats.totalQuestions) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[12px] text-[--color-theme-text-tertiary] text-center">
                Slack is your go-to place for quick answers
              </p>
            </div>

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: isHovered && isFlipped
                  ? `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(239,145,247,0.15), rgba(23,107,229,0.1), transparent 50%)`
                  : "none",
              }}
            />
          </div>

          {/* Front - When You Search */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              background: "radial-gradient(49.41% 64.58% at 49.4% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%), #141414",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: 16,
              boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="flex flex-col h-full p-5">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-medium text-[--color-theme-text-primary]">
                  Peak Search Time
                </span>
                <span className="text-[14px] text-[--color-theme-text-tertiary]">
                  {userStats.year}
                </span>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-6xl mb-4">⏰</div>
                <div className="text-center">
                  <p className="text-[--text-2xl] font-bold text-[--color-theme-text-primary]">
                    {userStats.peakUsageDay}s at {userStats.peakUsageHour}
                  </p>
                  <p className="mt-2 text-[14px] text-[--color-theme-text-tertiary]">
                    Your most productive search hour
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                  <div className="text-center p-3 bg-[#1a1a1a] rounded-xl">
                    <div className="text-[--text-xl] font-bold text-[--color-theme-text-primary]">
                      {userStats.mostActiveMonth}
                    </div>
                    <div className="text-[11px] text-[--color-theme-text-tertiary]">
                      Busiest month
                    </div>
                  </div>
                  <div className="text-center p-3 bg-[#1a1a1a] rounded-xl">
                    <div className="text-[--text-xl] font-bold text-[--color-theme-text-primary]">
                      {userStats.longestStreak} days
                    </div>
                    <div className="text-[11px] text-[--color-theme-text-tertiary]">
                      Longest streak
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: isHovered && !isFlipped
                  ? `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,130,77,0.15), rgba(239,145,247,0.1), transparent 50%)`
                  : "none",
              }}
            />
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
