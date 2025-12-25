"use client";

interface ProgressBarProps {
  total: number;
  current: number;
}

export function ProgressBar({ total, current }: ProgressBarProps) {
  return (
    <div className="yir-progress">
      {Array.from({ length: total }).map((_, index) => (
        <div key={index} className="yir-progress__bar">
          <div
            className="yir-progress__fill transition-all duration-300"
            style={{
              width: index < current ? "100%" : index === current ? "100%" : "0%",
            }}
          />
        </div>
      ))}
    </div>
  );
}
