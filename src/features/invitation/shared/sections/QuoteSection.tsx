"use client";

import { motion } from "framer-motion";
import type { ThemeConfig } from "../../types";

interface QuoteSectionProps {
  config: ThemeConfig;
  colors: ThemeConfig["colors"];
  fonts: ThemeConfig["fonts"];
  quote?: string;
  author?: string;
}

export function QuoteSection({ config, colors, fonts, quote, author }: QuoteSectionProps) {
  const displayQuote = quote || "Love is not about how many days, months, or years you've been together. Love is about how much you love each other every single day.";
  const displayAuthor = author || "";

  return (
    <section
      className="relative w-full py-20 px-6 overflow-hidden"
      style={{
        background: colors.background,
        fontFamily: fonts.heading,
      }}
    >
      {/* Symmetric ornaments — left side */}
      <div className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none flex flex-col items-center justify-center">
        {/* Top ornament */}
        <div className="absolute top-[15%] opacity-30" style={{ color: colors.accent }}>
          <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
            <path d="M20 0 Q30 15 20 30 Q10 45 20 60" stroke={colors.accent} strokeWidth="1.2" opacity="0.3" fill="none" />
            <circle cx="20" cy="30" r="3" fill={colors.accent} opacity="0.3" />
            <path d="M5 10 Q15 20 5 30" stroke={colors.accent} strokeWidth="0.6" opacity="0.15" fill="none" />
            <path d="M35 10 Q25 20 35 30" stroke={colors.accent} strokeWidth="0.6" opacity="0.15" fill="none" />
            <path d="M5 30 Q15 40 5 50" stroke={colors.accent} strokeWidth="0.6" opacity="0.15" fill="none" />
            <path d="M35 30 Q25 40 35 50" stroke={colors.accent} strokeWidth="0.6" opacity="0.15" fill="none" />
          </svg>
        </div>
        {/* Middle ornament */}
        <div className="absolute top-1/2 -translate-y-1/2 opacity-25" style={{ color: colors.accent }}>
          <svg width="30" height="80" viewBox="0 0 30 80" fill="none">
            <path d="M15 0 Q25 20 15 40 Q5 60 15 80" stroke={colors.accent} strokeWidth="1" opacity="0.25" fill="none" />
            <circle cx="15" cy="40" r="2.5" fill={colors.accent} opacity="0.25" />
            <line x1="0" y1="20" x2="30" y2="20" stroke={colors.accent} strokeWidth="0.4" opacity="0.12" />
            <line x1="0" y1="60" x2="30" y2="60" stroke={colors.accent} strokeWidth="0.4" opacity="0.12" />
          </svg>
        </div>
        {/* Bottom ornament */}
        <div className="absolute bottom-[15%] opacity-30" style={{ color: colors.accent }}>
          <svg width="36" height="50" viewBox="0 0 36 50" fill="none">
            <path d="M18 0 Q28 13 18 25 Q8 38 18 50" stroke={colors.accent} strokeWidth="1" opacity="0.3" fill="none" />
            <circle cx="18" cy="25" r="2.5" fill={colors.accent} opacity="0.3" />
            <path d="M3 8 Q13 17 3 25" stroke={colors.accent} strokeWidth="0.5" opacity="0.15" fill="none" />
            <path d="M33 8 Q23 17 33 25" stroke={colors.accent} strokeWidth="0.5" opacity="0.15" fill="none" />
          </svg>
        </div>
      </div>

      {/* Symmetric ornaments — right side (mirrored) */}
      <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none flex flex-col items-center justify-center">
        {/* Top ornament */}
        <div className="absolute top-[15%] opacity-30" style={{ color: colors.accent }}>
          <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
            <path d="M20 0 Q10 15 20 30 Q30 45 20 60" stroke={colors.accent} strokeWidth="1.2" opacity="0.3" fill="none" />
            <circle cx="20" cy="30" r="3" fill={colors.accent} opacity="0.3" />
            <path d="M35 10 Q25 20 35 30" stroke={colors.accent} strokeWidth="0.6" opacity="0.15" fill="none" />
            <path d="M5 10 Q15 20 5 30" stroke={colors.accent} strokeWidth="0.6" opacity="0.15" fill="none" />
            <path d="M35 30 Q25 40 35 50" stroke={colors.accent} strokeWidth="0.6" opacity="0.15" fill="none" />
            <path d="M5 30 Q15 40 5 50" stroke={colors.accent} strokeWidth="0.6" opacity="0.15" fill="none" />
          </svg>
        </div>
        {/* Middle ornament */}
        <div className="absolute top-1/2 -translate-y-1/2 opacity-25" style={{ color: colors.accent }}>
          <svg width="30" height="80" viewBox="0 0 30 80" fill="none">
            <path d="M15 0 Q5 20 15 40 Q25 60 15 80" stroke={colors.accent} strokeWidth="1" opacity="0.25" fill="none" />
            <circle cx="15" cy="40" r="2.5" fill={colors.accent} opacity="0.25" />
            <line x1="0" y1="20" x2="30" y2="20" stroke={colors.accent} strokeWidth="0.4" opacity="0.12" />
            <line x1="0" y1="60" x2="30" y2="60" stroke={colors.accent} strokeWidth="0.4" opacity="0.12" />
          </svg>
        </div>
        {/* Bottom ornament */}
        <div className="absolute bottom-[15%] opacity-30" style={{ color: colors.accent }}>
          <svg width="36" height="50" viewBox="0 0 36 50" fill="none">
            <path d="M18 0 Q8 13 18 25 Q28 38 18 50" stroke={colors.accent} strokeWidth="1" opacity="0.3" fill="none" />
            <circle cx="18" cy="25" r="2.5" fill={colors.accent} opacity="0.3" />
            <path d="M33 8 Q23 17 33 25" stroke={colors.accent} strokeWidth="0.5" opacity="0.15" fill="none" />
            <path d="M3 8 Q13 17 3 25" stroke={colors.accent} strokeWidth="0.5" opacity="0.15" fill="none" />
          </svg>
        </div>
      </div>

      {/* Decorative corner pieces */}
      <div className="absolute top-4 left-4 pointer-events-none opacity-20">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M0 0 L20 0 L20 3 L3 3 L3 20 L0 20 Z" fill={colors.accent} />
        </svg>
      </div>
      <div className="absolute top-4 right-4 pointer-events-none opacity-20">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M20 0 L0 0 L0 3 L17 3 L17 20 L20 20 Z" fill={colors.accent} />
        </svg>
      </div>
      <div className="absolute bottom-4 left-4 pointer-events-none opacity-20">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M0 20 L20 20 L20 17 L3 17 L3 0 L0 0 Z" fill={colors.accent} />
        </svg>
      </div>
      <div className="absolute bottom-4 right-4 pointer-events-none opacity-20">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M20 20 L0 20 L0 17 L17 17 L17 0 L20 0 Z" fill={colors.accent} />
        </svg>
      </div>

      <motion.div
        className="relative z-10 max-w-sm mx-auto text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Opening quote mark */}
        <div className="mb-4" style={{ color: colors.accent }} aria-hidden="true">
          <svg className="mx-auto w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" opacity="0.4">
            <path d="M3 21c3-3 6-6 9-9 3 3 6 6 9 9" />
            <path d="M3 3c3 3 6 6 9 9 3-3 6-6 9-9" />
          </svg>
        </div>

        <blockquote
          className="text-base md:text-lg leading-relaxed italic mb-3"
          style={{ color: colors.text, fontFamily: fonts.quote }}
        >
          &ldquo;{displayQuote}&rdquo;
        </blockquote>

        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-8 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
          <svg width="5" height="5" viewBox="0 0 5 5" fill={colors.accent}>
            <path d="M2.5 0L5 2.5L2.5 5L0 2.5Z" />
          </svg>
          <div className="w-8 h-px" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
        </div>

        {displayAuthor && (
          <p className="text-xs mt-3 tracking-wider" style={{ color: colors.accent, fontFamily: fonts.body }}>
            &mdash; {displayAuthor} &mdash;
          </p>
        )}
      </motion.div>
    </section>
  );
}
