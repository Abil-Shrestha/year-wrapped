"use client";

import { userStats } from "@/lib/data";

const floatingColors = [
  { color: "#176BE5", x: "15%", y: "20%" },
  { color: "#232323", x: "8%", y: "55%" },
  { color: "#7FD1FE", x: "85%", y: "25%" },
  { color: "#FFD2E1", x: "88%", y: "50%" },
  { color: "#FF824D", x: "82%", y: "75%" },
  { color: "#EF91F7", x: "12%", y: "78%" },
];

interface IntroSlideProps {
  onNext?: () => void;
  onRestart?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function IntroSlide(_props: IntroSlideProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center relative overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(ellipse at 30% 20%, #176BE5 0%, transparent 40%), radial-gradient(ellipse at 70% 80%, #FF824D 0%, transparent 40%), radial-gradient(ellipse at 80% 30%, #7FD1FE 0%, transparent 35%), radial-gradient(ellipse at 20% 70%, #EF91F7 0%, transparent 35%)",
        }}
      />

      {/* Floating color dots */}
      {floatingColors.map((item, i) => (
        <div
          key={i}
          className="absolute hidden sm:block w-16 h-16 rounded-full blur-sm"
          style={{
            left: item.x,
            top: item.y,
            backgroundColor: item.color,
            opacity: 0.6,
          }}
        />
      ))}

      <div className="flex flex-col items-center gap-6 text-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[--color-theme-border-primary]" />
          <span className="text-[--text-sm] font-medium uppercase tracking-[0.2em] text-[--color-theme-text-tertiary]">
            Super Wrapped
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[--color-theme-border-primary]" />
        </div>

        <h1 className="text-[8rem] sm:text-[10rem] font-bold leading-none bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
          {userStats.year}
        </h1>

        <p className="max-w-sm text-[--text-base] text-[--color-theme-text-secondary]">
          Hey <span className="text-[--color-theme-text-primary] font-medium">{userStats.name}</span>, 
          let&apos;s explore your year with Super.
        </p>
      </div>

      <div className="absolute bottom-8 flex items-center gap-2 text-[--text-xs] text-[--color-theme-text-quaternary]">
        <span>Powered by</span>
        <span className="font-medium text-[--color-theme-text-tertiary]">Super</span>
      </div>
    </div>
  );
}
