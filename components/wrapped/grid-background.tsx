"use client";

export function GridBackground() {
  return (
    <div className="yir-grid-background">
      <div className="yir-grid-lines">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="yir-grid-line" />
        ))}
      </div>
    </div>
  );
}
