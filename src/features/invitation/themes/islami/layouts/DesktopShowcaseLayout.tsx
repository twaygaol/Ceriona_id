"use client";

import { motion } from "framer-motion";
import type { DesktopShowcaseLayoutProps } from "../../../types";

export function DesktopShowcaseLayout({ config, colors, fonts, invitation }: DesktopShowcaseLayoutProps) {
  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${colors.background}, ${colors.surface})`,
        fontFamily: fonts.heading,
      }}
    >
      {/* Geometric pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 30%, ${colors.primary} 0.5px, transparent 0.5px),
            radial-gradient(circle at 70% 70%, ${colors.primary} 0.5px, transparent 0.5px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Top calligraphy stroke */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none opacity-[0.12]">
        <svg viewBox="0 0 600 40" className="w-full">
          <path d="M0,20 Q50,5 100,20 T200,20 T300,20 T400,20 T500,20 T600,20" stroke={colors.accent} strokeWidth="1.5" fill="none" />
          <path d="M0,25 Q50,12 100,25 T200,25 T300,25 T400,25 T500,25 T600,25" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.5" />
        </svg>
      </div>

      {/* Bottom calligraphy stroke */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-[0.12]">
        <svg viewBox="0 0 600 40" className="w-full">
          <path d="M0,20 Q50,35 100,20 T200,20 T300,20 T400,20 T500,20 T600,20" stroke={colors.accent} strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* 8-pointed Islamic star — left */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.1]">
        <svg width="120" height="120" viewBox="0 0 200 200" fill="none">
          <polygon points="100,10 123,55 172,55 137,88 152,138 100,110 48,138 63,88 28,55 77,55" stroke={colors.primary} strokeWidth="1.5" fill="none" />
          <polygon points="100,35 115,65 148,65 127,85 136,120 100,100 64,120 73,85 52,65 85,65" stroke={colors.accent} strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="85" stroke={colors.primary} strokeWidth="0.8" fill="none" />
          <circle cx="100" cy="100" r="60" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.5" />
        </svg>
      </div>

      {/* 8-pointed Islamic star — right */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.1]">
        <svg width="120" height="120" viewBox="0 0 200 200" fill="none">
          <polygon points="100,10 123,55 172,55 137,88 152,138 100,110 48,138 63,88 28,55 77,55" stroke={colors.primary} strokeWidth="1.5" fill="none" />
          <polygon points="100,35 115,65 148,65 127,85 136,120 100,100 64,120 73,85 52,65 85,65" stroke={colors.accent} strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="60" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.5" />
        </svg>
      </div>

      {/* Mosque lantern — bottom left */}
      <div className="absolute bottom-16 left-10 pointer-events-none opacity-[0.08]">
        <svg width="36" height="60" viewBox="0 0 36 60" fill="none">
          <path d="M18 0 L18 6" stroke={colors.primary} strokeWidth="1" />
          <path d="M10 6 L26 6 L28 10 L8 10 Z" fill={colors.primary} />
          <path d="M8 10 L28 10 Q18 40 8 10Z" fill={colors.primary} opacity="0.6" />
          <path d="M8 10 Q18 35 28 10" stroke={colors.accent} strokeWidth="0.5" fill="none" />
          <ellipse cx="18" cy="20" rx="6" ry="3" fill={colors.accent} opacity="0.3" />
          <path d="M10 5 L18 2 L26 5" stroke={colors.accent} strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* Mosque lantern — bottom right */}
      <div className="absolute bottom-16 right-10 pointer-events-none opacity-[0.08]">
        <svg width="36" height="60" viewBox="0 0 36 60" fill="none">
          <path d="M18 0 L18 6" stroke={colors.primary} strokeWidth="1" />
          <path d="M10 6 L26 6 L28 10 L8 10 Z" fill={colors.primary} />
          <path d="M8 10 L28 10 Q18 40 8 10Z" fill={colors.primary} opacity="0.6" />
          <path d="M8 10 Q18 35 28 10" stroke={colors.accent} strokeWidth="0.5" fill="none" />
          <ellipse cx="18" cy="20" rx="6" ry="3" fill={colors.accent} opacity="0.3" />
        </svg>
      </div>

      {/* Calligraphy decorative arch */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 pointer-events-none opacity-[0.06]">
        <svg width="200" height="80" viewBox="0 0 200 80" fill="none">
          <path d="M100 10 Q40 10 20 40 Q10 55 0 80" stroke={colors.primary} strokeWidth="2" fill="none" />
          <path d="M100 10 Q160 10 180 40 Q190 55 200 80" stroke={colors.primary} strokeWidth="2" fill="none" />
          <path d="M100 15 Q50 15 30 40" stroke={colors.accent} strokeWidth="0.8" fill="none" />
          <path d="M100 15 Q150 15 170 40" stroke={colors.accent} strokeWidth="0.8" fill="none" />
        </svg>
      </div>

      {/* Central content */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: colors.accent, fontFamily: fonts.body }}>
          Bismillahirrahmanirrahim
        </p>

        <div className="w-12 h-0.5 mb-4" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />

        <h1 className="text-4xl font-bold leading-tight mb-1" style={{ color: colors.text }}>
          {invitation?.groomName || "Groom"}
        </h1>
        <p className="text-xl tracking-widest my-1" style={{ color: colors.accent }}>&</p>
        <h1 className="text-4xl font-bold leading-tight mb-4" style={{ color: colors.text }}>
          {invitation?.brideName || "Bride"}
        </h1>

        <div className="w-16 h-0.5 mb-4" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />

        <p className="text-sm leading-relaxed max-w-xs" style={{ color: colors.muted, fontFamily: fonts.body }}>
          Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan acara pernikahan
        </p>
      </motion.div>
    </div>
  );
}
