"use client";

import { RadialTimeline } from "@/components/radial-timeline/radial-timeline";

interface JourneySlideProps {
  onNext?: () => void;
}

export function JourneySlide({ onNext }: JourneySlideProps) {
  return <RadialTimeline onComplete={onNext} />;
}
