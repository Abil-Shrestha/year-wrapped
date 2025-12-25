"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, RotateCcw } from "lucide-react";
import { userStats } from "@/lib/data";
import Image from "next/image";

interface OutroSlideProps {
  onRestart?: () => void;
}

export function OutroSlide({ onRestart }: OutroSlideProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `My ${userStats.year} Super Wrapped: ${userStats.totalQuestions.toLocaleString()} questions asked, ${userStats.timeSavedHours} hours saved! #SuperWrapped`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex h-full flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", ease: "easeIn", delay: 0.2 }}
        className="w-full max-w-[400px] overflow-hidden"
        style={{
          background: "radial-gradient(49.41% 64.58% at 49.4% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%), #141414",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: 16,
          boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Content */}
        <div className="p-8 flex flex-col items-center text-center">
          {/* Logo */}
          <Image 
            src="/super.svg" 
            alt="Super" 
            width={48} 
            height={48}
            className="h-12 w-auto mb-6"
          />

          {/* Message */}
          <h2 className="text-[24px] font-bold text-[--color-theme-text-primary]">
            That&apos;s a wrap!
          </h2>
          <p className="mt-2 text-[14px] text-[--color-theme-text-secondary]">
            Here&apos;s to finding even more answers in {userStats.year + 1}
          </p>

          {/* Stats row */}
          <div className="mt-6 flex items-center gap-6">
            <div className="text-center">
              <div className="text-[20px] font-bold text-[--color-theme-text-primary]">
                {userStats.totalQuestions.toLocaleString()}
              </div>
              <div className="text-[12px] text-[--color-theme-text-tertiary]">Questions</div>
            </div>
            <div className="w-px h-8 bg-[#2a2a2a]" />
            <div className="text-center">
              <div className="text-[20px] font-bold text-[--color-theme-text-primary]">
                {userStats.timeSavedHours}h
              </div>
              <div className="text-[12px] text-[--color-theme-text-tertiary]">Saved</div>
            </div>
            <div className="w-px h-8 bg-[#2a2a2a]" />
            <div className="text-center">
              <div className="text-[20px] font-bold text-[--color-theme-text-primary]">
                {userStats.connectedSources}
              </div>
              <div className="text-[12px] text-[--color-theme-text-tertiary]">Sources</div>
            </div>
          </div>

          {/* Share section */}
          <div className="mt-8 w-full flex flex-col gap-3">
            <button
              onClick={handleTwitterShare}
              className="w-full flex items-center justify-center gap-2 h-11 text-[14px] font-medium text-white bg-black hover:bg-[#1a1a1a] transition-colors rounded-lg"
              style={{ border: "1px solid #2a2a2a" }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X
            </button>
            <button
              onClick={handleLinkedInShare}
              className="w-full flex items-center justify-center gap-2 h-11 text-[14px] font-medium text-white bg-[#0A66C2] hover:bg-[#004182] transition-colors rounded-lg"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Share on LinkedIn
            </button>
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 h-11 text-[14px] font-medium text-[--color-theme-text-primary] hover:bg-[#1a1a1a] transition-colors rounded-lg"
              style={{ border: "1px solid #2a2a2a" }}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy link
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-[#2a2a2a] flex items-center justify-between">
          <span className="text-[14px] text-[--color-theme-text-tertiary]">
            super.work/2025
          </span>
          {onRestart && (
            <button
              onClick={onRestart}
              className="flex items-center gap-2 text-[14px] text-[--color-theme-text-tertiary] hover:text-[--color-theme-text-primary] transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Watch again
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
