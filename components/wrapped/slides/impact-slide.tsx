"use client";

import { useState, useEffect } from "react";
import { userStats } from "@/lib/data";

interface ImpactCardProps {
  index: number;
  label: string;
  value: string;
  visible: boolean;
}

function ImpactCard({ index, label, value, visible }: ImpactCardProps) {
  return (
    <div
      className="relative flex h-[56px] items-center transition-all duration-300 ease-out"
      style={{
        background: "radial-gradient(49.41% 64.58% at 49.4% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%), #141414",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        borderRadius: 16,
        boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
        width: "320px",
        marginTop: index === 0 ? 0 : "8px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div className="flex w-full flex-row items-center justify-between px-5">
        <span className="select-none text-[14px] text-[--color-theme-text-secondary]">
          {label}
        </span>
        <span className="select-none text-[18px] font-semibold text-[--color-theme-text-primary]">
          {value}
        </span>
      </div>
    </div>
  );
}

export function ImpactSlide() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    setVisibleCards([]);
    const timers: NodeJS.Timeout[] = [];
    
    for (let i = 0; i < 4; i++) {
      const timer = setTimeout(() => {
        setVisibleCards(prev => [...prev, i]);
      }, 150 * (i + 1));
      timers.push(timer);
    }

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const impactCards = [
    { label: "Time Saved", value: `${userStats.timeSavedHours}h` },
    { label: "Accuracy", value: `${userStats.searchAccuracy}%` },
    { label: "Questions Deflected", value: userStats.questionsDeflected.toLocaleString() },
    { label: "Total Questions", value: userStats.totalQuestions.toLocaleString() },
  ];

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="mb-8 text-center">
        <h2 className="yir-heading">Time Well Saved</h2>
        <p className="yir-subheading mt-2">Your Impact</p>
      </div>

      <div className="flex flex-col items-center">
        {impactCards.map((card, index) => (
          <ImpactCard
            key={card.label}
            index={index}
            label={card.label}
            value={card.value}
            visible={visibleCards.includes(index)}
          />
        ))}
      </div>

      <div className="absolute bottom-8 flex items-center gap-2 text-[--text-xs] text-[--color-theme-text-quaternary]">
        <span>Powered by</span>
        <span className="font-medium text-[--color-theme-text-tertiary]">Super</span>
      </div>
    </div>
  );
}
