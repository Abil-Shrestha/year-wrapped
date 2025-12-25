"use client";

import * as React from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { PROCESSED_DATA, type TimelineItem } from "./data";

const LINE_COUNT = 180;
const ZOOM_THRESHOLD = 150;

// Super brand colors for each month
const MONTH_COLORS = [
  "#176BE5", // Jan - Neptune Blue
  "#7FD1FE", // Feb - Light Blue Nova
  "#EF91F7", // Mar - Pink Nebula
  "#FF824D", // Apr - Saturn Orange
  "#FFD2E1", // May - Pink Moon
  "#176BE5", // Jun - Neptune Blue
  "#7FD1FE", // Jul - Light Blue Nova
  "#EF91F7", // Aug - Pink Nebula
  "#FF824D", // Sep - Saturn Orange
  "#FFD2E1", // Oct - Pink Moon
  "#176BE5", // Nov - Neptune Blue
  "#7FD1FE", // Dec - Light Blue Nova
];

interface RadialTimelineProps {
  onComplete?: () => void;
}

export function RadialTimeline({ onComplete }: RadialTimelineProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollAccumulator = React.useRef(0);
  const monthScrollAccumulator = React.useRef(0);

  const rotate = useSpring(0, { stiffness: 150, damping: 40 });
  const scale = useSpring(1, { stiffness: 200, damping: 40 });

  const goToMonth = React.useCallback((index: number) => {
    setActiveIndex(index);
    const item = PROCESSED_DATA[index];
    rotate.set(-item.degree * 2);
  }, [rotate]);

  const zoomOut = React.useCallback(() => {
    scrollAccumulator.current = 0;
    monthScrollAccumulator.current = 0;
    scale.set(1);
    rotate.set(0);
    setZoom(false);
    setActiveIndex(0);
  }, [scale, rotate]);

  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (!zoom) {
        scrollAccumulator.current = Math.max(
          0,
          scrollAccumulator.current + e.deltaY
        );
        const progress = Math.min(
          scrollAccumulator.current / ZOOM_THRESHOLD,
          1
        );
        const newScale = 1 + progress * 1.5;
        scale.set(newScale);

        if (progress >= 1) {
          setZoom(true);
          monthScrollAccumulator.current = 0;
          const item = PROCESSED_DATA[0];
          rotate.set(-item.degree * 2);
        }
      } else {
        monthScrollAccumulator.current += e.deltaY;
        const threshold = 80;
        if (monthScrollAccumulator.current > threshold) {
          monthScrollAccumulator.current = 0;
          const newIndex = Math.min(activeIndex + 1, PROCESSED_DATA.length - 1);
          goToMonth(newIndex);
        } else if (monthScrollAccumulator.current < -threshold) {
          monthScrollAccumulator.current = 0;
          const newIndex = Math.max(activeIndex - 1, 0);
          if (newIndex === 0 && activeIndex === 0) {
            scrollAccumulator.current = Math.max(
              0,
              scrollAccumulator.current - 50
            );
            const progress = scrollAccumulator.current / ZOOM_THRESHOLD;
            if (progress < 0.5) {
              zoomOut();
            }
          } else {
            goToMonth(newIndex);
          }
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [zoom, activeIndex, scale, rotate, goToMonth, zoomOut]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        zoomOut();
      } else if (e.key === "ArrowDown" && zoom) {
        e.preventDefault();
        const newIndex = Math.min(activeIndex + 1, PROCESSED_DATA.length - 1);
        goToMonth(newIndex);
      } else if (e.key === "ArrowUp" && zoom) {
        e.preventDefault();
        if (activeIndex === 0) {
          zoomOut();
        } else {
          goToMonth(activeIndex - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoom, activeIndex, goToMonth, zoomOut]);

  const [size, setSize] = React.useState(400);
  React.useEffect(() => {
    const updateSize = () => {
      const vmin = Math.min(window.innerWidth, window.innerHeight);
      setSize(Math.min(vmin * 0.7, 500));
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const radius = size / 2 - 40;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      {/* Center text */}
      <motion.div
        style={{
          position: "absolute",
          textAlign: "center",
          zIndex: 10,
        }}
        animate={{ opacity: zoom ? 0 : 1 }}
      >
        <div
          style={{
            color: "#6b6b6b",
            fontSize: 12,
            letterSpacing: 2,
            marginBottom: 8,
          }}
        >
          YOUR YEAR
        </div>
        <div style={{ color: "#fafafa", fontSize: 48, fontWeight: 700 }}>
          2025
        </div>
        <div style={{ color: "#6b6b6b", fontSize: 14, marginTop: 16 }}>
          Scroll to explore
        </div>
      </motion.div>

      {/* Stacked Detail Cards */}
      {zoom && (
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            width: "90%",
            maxWidth: 340,
            height: 320,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {PROCESSED_DATA.map((item, i) => {
            const offsetIndex = i - activeIndex;
            
            // Only render cards that are visible in the stack or just passed
            if (offsetIndex < -1 || offsetIndex > 3) return null;
            
            const y = offsetIndex * -30;
            const cardScale = Math.max(1 - Math.max(0, offsetIndex) * 0.08, 0.76);
            const blur = offsetIndex < 0 ? 2 : 0;
            const opacity = offsetIndex < 0 ? 0 : 1;
            
            return (
              <motion.div
                key={item.month}
                initial={false}
                animate={{
                  y,
                  scale: cardScale,
                  opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 20,
                  mass: 0.5,
                }}
                style={{
                  position: "absolute",
                  textAlign: "center",
                  background: "radial-gradient(49.41% 64.58% at 49.4% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%), #141414",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  borderRadius: 16,
                  boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
                  padding: 24,
                  width: "100%",
                  minHeight: 320,
                  display: "flex",
                  flexDirection: "column",
                  willChange: "transform",
                  filter: `blur(${blur}px)`,
                  zIndex: 100 - offsetIndex,
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 8 }}>
                  {item.emoji}
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    color: "#fafafa",
                    fontSize: 20,
                    marginBottom: 4,
                    minHeight: 24,
                  }}
                >
                  {item.title}
                </div>
                <div style={{ fontSize: 14, color: "#6b6b6b", marginBottom: 16 }}>
                  {item.month} 2025
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "#a1a1a1",
                    lineHeight: 1.6,
                    marginBottom: 20,
                    minHeight: 44,
                    flex: 1,
                  }}
                >
                  {item.description}
                </p>
                {item.stats && (
                  <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
                    {item.stats.map((stat) => (
                      <div key={stat.label} style={{ minWidth: 60 }}>
                        <div
                          style={{ fontSize: 22, fontWeight: 600, color: "#fafafa" }}
                        >
                          {stat.value}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: "#6b6b6b",
                            textTransform: "uppercase",
                            letterSpacing: 1,
                          }}
                        >
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {i === activeIndex && (
                  <div
                    style={{
                      marginTop: 20,
                      display: "flex",
                      justifyContent: "center",
                      gap: 4,
                    }}
                  >
                    {PROCESSED_DATA.map((_, dotIndex) => (
                      <div
                        key={dotIndex}
                        style={{
                          width: dotIndex === activeIndex ? 16 : 6,
                          height: 6,
                          borderRadius: 3,
                          background: dotIndex === activeIndex ? "#fafafa" : "#2a2a2a",
                          transition: "all 0.2s",
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Timeline wheel */}
      <motion.div
        style={{
          width: size,
          height: size,
          position: "absolute",
          scale,
        }}
      >
        <motion.div style={{ width: "100%", height: "100%", rotate }}>
          {Array.from({ length: LINE_COUNT }).map((_, i) => {
            const angle = (i / LINE_COUNT) * 360 - 90;
            const radians = (angle * Math.PI) / 180;
            const x = Math.cos(radians) * radius + size / 2;
            const y = Math.sin(radians) * radius + size / 2;

            const monthItem = PROCESSED_DATA.find((item) => item.degree === i);
            const monthIndex = monthItem
              ? PROCESSED_DATA.indexOf(monthItem)
              : null;
            const isActive = monthIndex === activeIndex && zoom;
            const isMonth = monthItem !== null;
            const monthColor =
              monthIndex !== null
                ? MONTH_COLORS[monthIndex % MONTH_COLORS.length]
                : "#2a2a2a";

            const lineLength = isMonth
              ? monthItem?.variant === "large"
                ? 50
                : 35
              : 20;

            return (
              <React.Fragment key={i}>
                <motion.div
                  style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: lineLength,
                    height: isMonth ? 2 : 1,
                    background: isMonth ? monthColor : "#2a2a2a",
                    transformOrigin: "0 50%",
                    rotate: angle,
                    cursor: isMonth ? "pointer" : "default",
                    opacity: isActive ? 1 : isMonth ? 0.8 : 0.4,
                    zIndex: 1,
                  }}
                  whileHover={isMonth ? { opacity: 1 } : {}}
                  onClick={
                    isMonth && monthIndex !== null
                      ? () => {
                          setZoom(true);
                          scrollAccumulator.current = ZOOM_THRESHOLD;
                          scale.set(2.5);
                          goToMonth(monthIndex);
                        }
                      : undefined
                  }
                />
                {monthItem && monthIndex !== null && (
                  <MonthLabel
                    item={monthItem}
                    x={x}
                    y={y}
                    angle={angle}
                    isActive={isActive}
                    color={MONTH_COLORS[monthIndex % MONTH_COLORS.length]}
                    parentRotate={rotate}
                  />
                )}
              </React.Fragment>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      {!zoom && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 24,
              height: 40,
              border: "2px solid #2a2a2a",
              borderRadius: 12,
              display: "flex",
              justifyContent: "center",
              paddingTop: 8,
            }}
          >
            <motion.div
              style={{
                width: 4,
                height: 8,
                background: "#176BE5",
                borderRadius: 2,
              }}
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
          <span style={{ fontSize: 14, color: "#6b6b6b" }}>
            Scroll to explore
          </span>
        </div>
      )}

      {/* Navigation buttons */}
      {zoom && (
        <>
          <button
            onClick={() => {
              if (activeIndex > 0) {
                goToMonth(activeIndex - 1);
              } else {
                zoomOut();
              }
            }}
            aria-label="Previous month"
            style={{
              position: "absolute",
              left: 20,
              top: "50%",
              transform: "translateY(-50%)",
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
              color: "#fafafa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 30,
              opacity: activeIndex > 0 ? 1 : 0.3,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={() => {
              if (activeIndex < PROCESSED_DATA.length - 1) {
                goToMonth(activeIndex + 1);
              } else if (onComplete) {
                onComplete();
              }
            }}
            aria-label={activeIndex < PROCESSED_DATA.length - 1 ? "Next month" : "Continue to next slide"}
            style={{
              position: "absolute",
              right: 20,
              top: "50%",
              transform: "translateY(-50%)",
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
              color: "#fafafa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 30,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {zoom && (
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 12,
            color: "#6b6b6b",
          }}
        >
          ESC to close
        </div>
      )}
    </div>
  );
}

function MonthLabel({
  item,
  x,
  y,
  angle,
  isActive,
  color,
  parentRotate,
}: {
  item: TimelineItem;
  x: number;
  y: number;
  angle: number;
  isActive: boolean;
  color: string;
  parentRotate: ReturnType<typeof useSpring>;
}) {
  const labelOffset = 85;
  const radians = (angle * Math.PI) / 180;
  const labelX = x + Math.cos(radians) * labelOffset;
  const labelY = y + Math.sin(radians) * labelOffset;

  const counterRotate = useTransform(parentRotate, (r) => -r);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: labelX,
        top: labelY,
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        pointerEvents: "none",
        rotate: counterRotate,
        zIndex: 10,
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: isActive ? color : "#a1a1a1",
        }}
      >
        {item.monthShort}
      </div>
    </motion.div>
  );
}

export default RadialTimeline;
