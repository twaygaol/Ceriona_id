"use client";

import { motion } from "framer-motion";
import type { DesktopShowcaseLayoutProps } from "../../../types";

export function DesktopShowcaseLayout({ config, colors, fonts, invitation }: DesktopShowcaseLayoutProps) {
  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: colors.background,
        fontFamily: fonts.heading,
      }}
    >
      {/* Minimal dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${colors.accent}22 0.5px, transparent 0.5px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Vertical accent line - left */}
      <div className="absolute left-12 top-0 bottom-0 w-px pointer-events-none" style={{
        background: `linear-gradient(180deg, transparent, ${colors.accent}44, transparent)`,
      }} />

      {/* Vertical accent line - right */}
      <div className="absolute right-12 top-0 bottom-0 w-px pointer-events-none" style={{
        background: `linear-gradient(180deg, transparent, ${colors.accent}44, transparent)`,
      }} />

      {/* Top horizontal accent */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-8 h-px" style={{ background: colors.accent }} />
          <div className="w-2 h-2 rounded-full" style={{ background: colors.accent }} />
          <div className="w-8 h-px" style={{ background: colors.accent }} />
        </div>
      </div>

      {/* Bottom horizontal accent */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-8 h-px" style={{ background: colors.accent }} />
          <div className="w-2 h-2 rounded-full" style={{ background: colors.accent }} />
          <div className="w-8 h-px" style={{ background: colors.accent }} />
        </div>
      </div>

      {/* Minimal geometric dots */}
      <div className="absolute top-1/3 left-16 pointer-events-none opacity-20">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="2" fill={colors.accent} />
          <circle cx="10" cy="10" r="1.5" fill={colors.accent} opacity="0.5" />
          <circle cx="30" cy="10" r="1.5" fill={colors.accent} opacity="0.5" />
          <circle cx="10" cy="30" r="1.5" fill={colors.accent} opacity="0.5" />
          <circle cx="30" cy="30" r="1.5" fill={colors.accent} opacity="0.5" />
        </svg>
      </div>

      <div className="absolute bottom-1/3 right-16 pointer-events-none opacity-20">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="2" fill={colors.accent} />
          <circle cx="10" cy="10" r="1.5" fill={colors.accent} opacity="0.5" />
          <circle cx="30" cy="10" r="1.5" fill={colors.accent} opacity="0.5" />
          <circle cx="10" cy="30" r="1.5" fill={colors.accent} opacity="0.5" />
          <circle cx="30" cy="30" r="1.5" fill={colors.accent} opacity="0.5" />
        </svg>
      </div>

      {/* Central content */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: colors.accent, fontFamily: fonts.body }}>
          The Wedding of
        </p>

        <h1 className="text-4xl font-bold leading-tight mb-1" style={{ color: colors.text }}>
          {invitation?.groomName || "Groom"}
        </h1>
        <p className="text-lg tracking-widest my-1" style={{ color: colors.accent, fontFamily: fonts.body }}>&</p>
        <h1 className="text-4xl font-bold leading-tight mb-6" style={{ color: colors.text }}>
          {invitation?.brideName || "Bride"}
        </h1>

        <div className="w-12 h-px mb-4" style={{ background: colors.accent }} />

        <p className="text-sm leading-relaxed max-w-xs" style={{ color: colors.muted, fontFamily: fonts.body }}>
          Together with their families, we invite you to share in our joy
        </p>
      </motion.div>
    </div>
  );
}
