"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Heatmap } from "@paper-design/shaders-react";
import { WrappedViewer } from "@/components/wrapped/wrapped-viewer";
import { GridBackground } from "@/components/wrapped/grid-background";
import { userStats } from "@/lib/data";

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!started ? (
        <motion.div
          key="start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="yir-container"
        >
          <GridBackground />

          <div className="relative z-10 flex h-full flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-6 text-center"
            >
              <Image
                src="/super.svg"
                alt="Super"
                width={160}
                height={40}
                priority
              />

              <h1 className="yir-stat__value--hero">{userStats.year}</h1>
              
              <span className="text-[--text-lg] font-medium text-[--color-theme-text-secondary]">
                Wrapped
              </span>

              <p className="max-w-sm text-[--text-base] text-[--color-theme-text-secondary]">
                Your year across Slack, GitHub, Notion, Linear, and more.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => setStarted(true)}
              className="mt-12 relative flex items-center justify-center rounded-full transition-transform hover:scale-105 cursor-pointer"
              style={{ width: 80, height: 80 }}
            >
              {/* Shader as border ring */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <Heatmap
                  width={80}
                  height={80}
                  image="https://shaders.paper.design/images/logos/diamond.svg"
                  colors={["#112069", "#1f3ca3", "#3265e7", "#6bd8ff", "#ffe77a", "#ff9a1f", "#ff4d00"]}
                  colorBack="#000000"
                  contour={0.5}
                  angle={0}
                  noise={0}
                  innerGlow={0.5}
                  outerGlow={0.5}
                  speed={1}
                  scale={0.75}
                />
              </div>
              
              {/* Inner dark circle that covers center, leaving shader visible as ring */}
              <div 
                className="absolute rounded-full bg-[#0a0a0a] flex items-center justify-center" 
                style={{ width: 64, height: 64 }}
              >
                <Play className="h-6 w-6 text-white translate-x-0.5" fill="white" />
              </div>
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-[--text-sm] text-[--color-theme-text-tertiary]"
            >
              Click to start
            </motion.p>
          </div>

          <div className="yir-gradient-top" />
          <div className="yir-gradient-bottom" />
        </motion.div>
      ) : (
        <motion.div
          key="wrapped"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <WrappedViewer onRestart={() => setStarted(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
