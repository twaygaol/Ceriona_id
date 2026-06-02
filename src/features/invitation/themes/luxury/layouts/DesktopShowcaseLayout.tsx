"use client";

import { motion } from "framer-motion";
import type { DesktopShowcaseLayoutProps } from "../../../types";

export function DesktopShowcaseLayout({ config, colors, fonts, invitation }: DesktopShowcaseLayoutProps) {
  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${colors.background}, ${colors.secondary}, ${colors.background})`,
        fontFamily: fonts.heading,
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${colors.accent}06 0%, transparent 70%)`,
        }}
      />

      {/* Gold frame */}
      <div className="absolute inset-6 pointer-events-none">
        <svg viewBox="0 0 500 700" className="w-full h-full" fill="none">
          <rect x="2" y="2" width="496" height="696" rx="4" stroke={colors.accent} strokeWidth="1.5" opacity="0.3" />
          <rect x="10" y="10" width="480" height="680" rx="2" stroke={colors.accent} strokeWidth="0.5" opacity="0.15" />
          <path d="M2 30 L40 2" stroke={colors.accent} strokeWidth="1.5" opacity="0.4" />
          <path d="M498 30 L460 2" stroke={colors.accent} strokeWidth="1.5" opacity="0.4" />
          <path d="M2 670 L40 698" stroke={colors.accent} strokeWidth="1.5" opacity="0.4" />
          <path d="M498 670 L460 698" stroke={colors.accent} strokeWidth="1.5" opacity="0.4" />
          <circle cx="30" cy="30" r="3" fill={colors.accent} opacity="0.3" />
          <circle cx="470" cy="30" r="3" fill={colors.accent} opacity="0.3" />
          <circle cx="30" cy="670" r="3" fill={colors.accent} opacity="0.3" />
          <circle cx="470" cy="670" r="3" fill={colors.accent} opacity="0.3" />
          <path d="M30 2 L30 20" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" />
          <path d="M470 2 L470 20" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" />
          <path d="M2 30 L20 30" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" />
          <path d="M480 30 L498 30" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" />
        </svg>
      </div>

      {/* Sparkle particles */}
      <SparkleEffect color={colors.accent} />

      {/* Central content */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: colors.accent, fontFamily: fonts.body }}>
          The Wedding of
        </p>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
          <svg width="7" height="7" viewBox="0 0 7 7" fill={colors.accent}><path d="M3.5 0L7 3.5L3.5 7L0 3.5Z" /></svg>
          <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-1" style={{ color: colors.text }}>
          {invitation?.groomName || "Groom"}
        </h1>
        <p className="text-xl tracking-widest my-1" style={{ color: colors.accent }}>&</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: colors.text }}>
          {invitation?.brideName || "Bride"}
        </h1>

        <div className="w-16 h-0.5 mb-4" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />

        <p className="text-sm leading-relaxed max-w-xs" style={{ color: colors.muted, fontFamily: fonts.body }}>
          Together with their families, we invite you to celebrate our wedding day
        </p>
      </motion.div>
    </div>
  );
}

function SparkleEffect({ color }: { color: string }) {
  const sparkles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${2 + Math.random() * 3}px`,
    delay: `${Math.random() * 5}s`,
    dur: `${2 + Math.random() * 3}s`,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((sp) => (
        <motion.div
          key={sp.id}
          className="absolute rounded-full"
          style={{
            top: sp.top,
            left: sp.left,
            width: sp.size,
            height: sp.size,
            background: color,
            boxShadow: `0 0 ${parseInt(sp.size) * 2}px ${color}`,
          }}
          animate={{ opacity: [0, 0.8, 0.4, 0.8, 0], scale: [0, 1, 0.6, 1, 0] }}
          transition={{ delay: parseFloat(sp.delay), duration: parseFloat(sp.dur) + 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
