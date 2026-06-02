"use client";

import { motion } from "framer-motion";
import type { ThemeConfig } from "../types";

interface OpeningCoverProps {
  config: ThemeConfig;
  colors: ThemeConfig["colors"];
  fonts: ThemeConfig["fonts"];
  invitation?: any;
}

export function OpeningCover({ config, colors, fonts, invitation }: OpeningCoverProps) {
  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: colors.background,
        fontFamily: fonts.heading,
      }}
    >
      {/* Top-left corner ornament */}
      <div className="absolute top-0 left-0 pointer-events-none">
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          <path d="M0 0 L140 0 L140 10 L10 10 L10 140 L0 140 Z" fill={colors.accent} opacity="0.08" />
          <path d="M30 30 L100 30 L100 38 L38 38 L38 100 L30 100 Z" fill="none" stroke={colors.accent} strokeWidth="0.8" opacity="0.2" />
          <path d="M0 50 L0 0 L50 0" stroke={colors.accent} strokeWidth="1.5" opacity="0.25" />
          <circle cx="25" cy="25" r="3" fill={colors.accent} opacity="0.25" />
          <path d="M50 0 L50 20 L70 20" stroke={colors.accent} strokeWidth="0.8" opacity="0.15" />
          <path d="M0 50 L20 50 L20 70" stroke={colors.accent} strokeWidth="0.8" opacity="0.15" />
          <path d="M0 30 L30 0" stroke={colors.accent} strokeWidth="0.6" opacity="0.15" />
        </svg>
      </div>

      {/* Top-right corner ornament */}
      <div className="absolute top-0 right-0 pointer-events-none">
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          <path d="M140 0 L0 0 L0 10 L130 10 L130 140 L140 140 Z" fill={colors.accent} opacity="0.08" />
          <path d="M110 30 L40 30 L40 38 L102 38 L102 100 L110 100 Z" fill="none" stroke={colors.accent} strokeWidth="0.8" opacity="0.2" />
          <path d="M140 50 L140 0 L90 0" stroke={colors.accent} strokeWidth="1.5" opacity="0.25" />
          <circle cx="115" cy="25" r="3" fill={colors.accent} opacity="0.25" />
          <path d="M90 0 L90 20 L70 20" stroke={colors.accent} strokeWidth="0.8" opacity="0.15" />
          <path d="M140 50 L120 50 L120 70" stroke={colors.accent} strokeWidth="0.8" opacity="0.15" />
          <path d="M140 30 L110 0" stroke={colors.accent} strokeWidth="0.6" opacity="0.15" />
        </svg>
      </div>

      {/* Bottom-left corner ornament */}
      <div className="absolute bottom-0 left-0 pointer-events-none">
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          <path d="M0 140 L140 140 L140 130 L10 130 L10 0 L0 0 Z" fill={colors.accent} opacity="0.08" />
          <path d="M30 110 L100 110 L100 102 L38 102 L38 40 L30 40 Z" fill="none" stroke={colors.accent} strokeWidth="0.8" opacity="0.2" />
          <path d="M0 90 L0 140 L50 140" stroke={colors.accent} strokeWidth="1.5" opacity="0.25" />
          <circle cx="25" cy="115" r="3" fill={colors.accent} opacity="0.25" />
          <path d="M50 140 L50 120 L70 120" stroke={colors.accent} strokeWidth="0.8" opacity="0.15" />
          <path d="M0 90 L20 90 L20 70" stroke={colors.accent} strokeWidth="0.8" opacity="0.15" />
          <path d="M0 110 L30 140" stroke={colors.accent} strokeWidth="0.6" opacity="0.15" />
        </svg>
      </div>

      {/* Bottom-right corner ornament */}
      <div className="absolute bottom-0 right-0 pointer-events-none">
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          <path d="M140 140 L0 140 L0 130 L130 130 L130 0 L140 0 Z" fill={colors.accent} opacity="0.08" />
          <path d="M110 110 L40 110 L40 102 L102 102 L102 40 L110 40 Z" fill="none" stroke={colors.accent} strokeWidth="0.8" opacity="0.2" />
          <path d="M140 90 L140 140 L90 140" stroke={colors.accent} strokeWidth="1.5" opacity="0.25" />
          <circle cx="115" cy="115" r="3" fill={colors.accent} opacity="0.25" />
          <path d="M90 140 L90 120 L70 120" stroke={colors.accent} strokeWidth="0.8" opacity="0.15" />
          <path d="M140 90 L120 90 L120 70" stroke={colors.accent} strokeWidth="0.8" opacity="0.15" />
          <path d="M140 110 L110 140" stroke={colors.accent} strokeWidth="0.6" opacity="0.15" />
        </svg>
      </div>

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${colors.accent}06 0%, transparent 70%)`,
        }}
      />

      {/* Central content */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1
          className="text-4xl md:text-5xl font-bold leading-tight mb-4"
          style={{
            color: colors.text,
            fontFamily: fonts.heading,
          }}
        >
          We are getting married!
        </h1>

        <p
          className="text-sm md:text-base leading-relaxed max-w-xs"
          style={{
            color: colors.muted,
            fontFamily: fonts.body,
          }}
        >
          Kepada Yth. Bpk/Ibu/Saudara/i
        </p>
      </motion.div>
    </div>
  );
}
