"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { slides } from "@/lib/data";
import { GridBackground } from "./grid-background";
import { ProgressBar } from "./progress-bar";
import { IntroSlide } from "./slides/intro-slide";
import { JourneySlide } from "./slides/journey-slide";
import { UsageOverviewSlide } from "./slides/usage-overview-slide";
import { SearchHabitsSlide } from "./slides/search-habits-slide";
import { ImpactSlide } from "./slides/impact-slide";
import { FunStatsSlide } from "./slides/fun-stats-slide";
import { ArchetypeSlide } from "./slides/archetype-slide";
import { OutroSlide } from "./slides/outro-slide";

interface WrappedViewerProps {
  onRestart: () => void;
}

const slideComponents: Record<string, React.ComponentType<{ onRestart?: () => void; onNext?: () => void }>> = {
  intro: IntroSlide,
  journey: JourneySlide,
  "usage-overview": UsageOverviewSlide,
  "search-habits": SearchHabitsSlide,
  impact: ImpactSlide,
  "fun-stats": FunStatsSlide,
  archetype: ArchetypeSlide,
  outro: OutroSlide,
};

export function WrappedViewer({ onRestart }: WrappedViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const searchHabitsFlipRef = useRef<{ flip: () => boolean } | null>(null);

  const isLastSlide = currentIndex === slides.length - 1;
  const isJourneySlide = slides[currentIndex].id === "journey";
  const isSearchHabitsSlide = slides[currentIndex].id === "search-habits";

  const goToNext = useCallback(() => {
    // For search-habits slide, check if we need to flip first
    if (isSearchHabitsSlide && searchHabitsFlipRef.current) {
      const shouldContinue = searchHabitsFlipRef.current.flip();
      if (!shouldContinue) return;
    }
    
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, isSearchHabitsSlide]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    onRestart();
  }, [onRestart]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isJourneySlide) {
        if (e.key === "ArrowRight") {
          goToNext();
        } else if (e.key === "ArrowLeft") {
          goToPrev();
        }
        return;
      }
      
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, isJourneySlide]);

  const CurrentSlide = slideComponents[slides[currentIndex].id];

  return (
    <div className="yir-container">
      <GridBackground />
      <ProgressBar total={slides.length} current={currentIndex} />

      <div className="relative z-10 h-full w-full">
        <div key={slides[currentIndex].id} className="yir-slide">
          {isSearchHabitsSlide ? (
            <SearchHabitsSlide onNext={goToNext} flipRef={searchHabitsFlipRef} />
          ) : (
            <CurrentSlide onRestart={handleRestart} onNext={goToNext} />
          )}
        </div>
      </div>

      <div className="yir-gradient-top" />
      <div className="yir-gradient-bottom" />

      {!isJourneySlide && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            aria-label="Previous slide"
            disabled={currentIndex === 0}
            className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#fafafa] flex items-center justify-center z-30 hover:bg-[#2a2a2a] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next slide"
            disabled={isLastSlide}
            className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#fafafa] flex items-center justify-center z-30 hover:bg-[#2a2a2a] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
