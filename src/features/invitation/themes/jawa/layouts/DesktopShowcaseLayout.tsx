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
      {/* Batik pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, ${colors.primary} 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, ${colors.primary} 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top decorative band */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none opacity-[0.15]">
        <svg viewBox="0 0 600 50" className="w-full">
          <path d="M0,25 L30,10 L60,25 L90,10 L120,25 L150,10 L180,25 L210,10 L240,25 L270,10 L300,25 L330,10 L360,25 L390,10 L420,25 L450,10 L480,25 L510,10 L540,25 L570,10 L600,25" stroke={colors.accent} strokeWidth="1" fill="none" />
          <path d="M15,35 L45,20 L75,35 L105,20 L135,35 L165,20 L195,35 L225,20 L255,35 L285,20 L315,35 L345,20 L375,35 L405,20 L435,35 L465,20 L495,35 L525,20 L555,35 L585,20" stroke={colors.accent} strokeWidth="0.6" fill="none" opacity="0.5" />
        </svg>
      </div>

      {/* Bottom decorative band */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-[0.15]">
        <svg viewBox="0 0 600 50" className="w-full">
          <path d="M0,25 L30,40 L60,25 L90,40 L120,25 L150,40 L180,25 L210,40 L240,25 L270,40 L300,25 L330,40 L360,25 L390,40 L420,25 L450,40 L480,25 L510,40 L540,25 L570,40 L600,25" stroke={colors.accent} strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Gunungan (tree of life) - left */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.1]">
        <svg width="100" height="140" viewBox="0 0 160 200" fill="none">
          <path d="M80 5 C60 30 30 50 25 80 C20 110 30 130 40 140 L50 150 C55 160 60 170 65 180 L70 195 L90 195 L95 180 C100 170 105 160 110 150 L120 140 C130 130 140 110 135 80 C130 50 100 30 80 5Z" fill={colors.primary} />
          <path d="M80 20 C65 40 45 55 42 75 C39 95 45 110 55 120" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M80 20 C95 40 115 55 118 75 C121 95 115 110 105 120" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.5" />
          <ellipse cx="80" cy="85" rx="12" ry="18" stroke={colors.accent} strokeWidth="1" fill="none" opacity="0.5" />
        </svg>
      </div>

      {/* Gunungan (tree of life) - right */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.1]">
        <svg width="100" height="140" viewBox="0 0 160 200" fill="none">
          <path d="M80 5 C60 30 30 50 25 80 C20 110 30 130 40 140 L50 150 C55 160 60 170 65 180 L70 195 L90 195 L95 180 C100 170 105 160 110 150 L120 140 C130 130 140 110 135 80 C130 50 100 30 80 5Z" fill={colors.primary} />
          <path d="M80 20 C65 40 45 55 42 75 C39 95 45 110 55 120" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M80 20 C95 40 115 55 118 75 C121 95 115 110 105 120" stroke={colors.accent} strokeWidth="1.5" fill="none" opacity="0.5" />
        </svg>
      </div>

      {/* Wayang puppet silhouette - left bottom */}
      <div className="absolute bottom-20 left-12 pointer-events-none opacity-[0.08]">
        <svg width="50" height="100" viewBox="0 0 50 100" fill="none">
          <path d="M25 5 C15 15 10 30 10 40 C10 55 5 60 5 70 L5 95 L15 95 L15 75 C18 70 20 65 22 60 L22 95 L28 95 L28 60 C30 65 32 70 35 75 L35 95 L45 95 L45 70 C45 60 40 55 40 40 C40 30 35 15 25 5Z" fill={colors.primary} />
          <circle cx="25" cy="20" r="8" fill={colors.primary} />
        </svg>
      </div>

      {/* Wayang puppet silhouette - right bottom */}
      <div className="absolute bottom-20 right-12 pointer-events-none opacity-[0.08]">
        <svg width="50" height="100" viewBox="0 0 50 100" fill="none">
          <path d="M25 5 C15 15 10 30 10 40 C10 55 5 60 5 70 L5 95 L15 95 L15 75 C18 70 20 65 22 60 L22 95 L28 95 L28 60 C30 65 32 70 35 75 L35 95 L45 95 L45 70 C45 60 40 55 40 40 C40 30 35 15 25 5Z" fill={colors.primary} />
          <circle cx="25" cy="20" r="8" fill={colors.primary} />
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
          Wilujeng Sumping
        </p>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
          <span className="text-lg" style={{ color: colors.accent }}>✦</span>
          <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
        </div>

        <h1 className="text-4xl font-bold leading-tight mb-1" style={{ color: colors.text }}>
          {invitation?.groomName || "Groom"}
        </h1>
        <p className="text-xl tracking-widest my-1" style={{ color: colors.accent }}>&</p>
        <h1 className="text-4xl font-bold leading-tight mb-4" style={{ color: colors.text }}>
          {invitation?.brideName || "Bride"}
        </h1>

        <div className="w-16 h-0.5 mb-4" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />

        <p className="text-sm leading-relaxed max-w-xs" style={{ color: colors.muted, fontFamily: fonts.body }}>
          Dengan memohon rahmat dan ridho Allah, kami bermaksud menyelenggarakan acara pernikahan putra-putri kami
        </p>
      </motion.div>
    </div>
  );
}
