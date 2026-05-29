"use client";

import { motion } from "framer-motion";
import type { HeroSectionProps } from "../../../types";

const sparkleDots = Array.from({ length: 12 }, (_, i) => ({
  id: i, top: `${10 + Math.random() * 80}%`, left: `${5 + Math.random() * 90}%`,
  delay: `${Math.random() * 4}s`, size: `${2 + Math.random() * 3}px`,
}));

export function HeroSection({ config, colors, fonts, invitation }: HeroSectionProps) {
  return (
    <section
      className="relative w-full py-24 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${colors.background}, ${colors.surface}, ${colors.background})`,
        fontFamily: fonts.heading,
      }}
    >
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at center, ${colors.accent}06 0%, transparent 70%)`,
      }} />

      <style>{`
        @keyframes sparkle-${colors.accent.replace("#", "")} {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 0.6; transform: scale(1); }
        }
      `}</style>
      {sparkleDots.map((sp) => (
        <div key={sp.id} className="absolute rounded-full pointer-events-none" style={{
          top: sp.top, left: sp.left, width: sp.size, height: sp.size,
          background: colors.accent, boxShadow: `0 0 4px ${colors.accent}`,
          animation: `sparkle-${colors.accent.replace("#", "")} 3s ${sp.delay} infinite`,
        }} />
      ))}

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-sm tracking-[0.3em] uppercase mb-4"
          style={{ color: colors.accent, fontFamily: fonts.body }}
        >
          With Love
        </p>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
          <svg width="8" height="8" viewBox="0 0 8 8" fill={colors.accent}><path d="M4 0L8 4L4 8L0 4Z" /></svg>
          <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
        </div>

        <div
          className="relative px-10 py-8 md:px-14 md:py-10"
          style={{
            border: `1.5px solid ${colors.accent}44`,
            borderRadius: config.layout.borderRadius,
            background: `${colors.surface}66`,
          }}
        >
          <svg className="absolute top-2 left-2 w-6 h-6" viewBox="0 0 30 30" fill="none">
            <path d="M4 4 L15 4 L15 15 L4 15 Z" stroke={colors.accent} strokeWidth="0.8" opacity="0.4" fill="none" />
          </svg>
          <svg className="absolute top-2 right-2 w-6 h-6" viewBox="0 0 30 30" fill="none">
            <path d="M15 4 L26 4 L26 15 L15 15 Z" stroke={colors.accent} strokeWidth="0.8" opacity="0.4" fill="none" />
          </svg>
          <svg className="absolute bottom-2 left-2 w-6 h-6" viewBox="0 0 30 30" fill="none">
            <path d="M4 15 L15 15 L15 26 L4 26 Z" stroke={colors.accent} strokeWidth="0.8" opacity="0.4" fill="none" />
          </svg>
          <svg className="absolute bottom-2 right-2 w-6 h-6" viewBox="0 0 30 30" fill="none">
            <path d="M15 15 L26 15 L26 26 L15 26 Z" stroke={colors.accent} strokeWidth="0.8" opacity="0.4" fill="none" />
          </svg>

          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Mempelai Pria
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-2" style={{ color: colors.text }}>
            {invitation?.groomName || "Groom"}
          </h2>
          <p className="text-sm italic" style={{ color: colors.accent, fontFamily: fonts.quote }}>
            Son of Mr. ... & Mrs. ...
          </p>
        </div>

        <div className="flex items-center gap-4 my-8">
          <div className="w-12 h-px" style={{ background: colors.muted }} />
          <p className="text-2xl md:text-3xl tracking-widest" style={{ color: colors.accent, fontFamily: fonts.quote }}>
            &
          </p>
          <div className="w-12 h-px" style={{ background: colors.muted }} />
        </div>

        <div
          className="relative px-10 py-8 md:px-14 md:py-10"
          style={{
            border: `1.5px solid ${colors.accent}44`,
            borderRadius: config.layout.borderRadius,
            background: `${colors.surface}66`,
          }}
        >
          <svg className="absolute top-2 left-2 w-6 h-6" viewBox="0 0 30 30" fill="none">
            <path d="M4 4 L15 4 L15 15 L4 15 Z" stroke={colors.accent} strokeWidth="0.8" opacity="0.4" fill="none" />
          </svg>
          <svg className="absolute top-2 right-2 w-6 h-6" viewBox="0 0 30 30" fill="none">
            <path d="M15 4 L26 4 L26 15 L15 15 Z" stroke={colors.accent} strokeWidth="0.8" opacity="0.4" fill="none" />
          </svg>
          <svg className="absolute bottom-2 left-2 w-6 h-6" viewBox="0 0 30 30" fill="none">
            <path d="M4 15 L15 15 L15 26 L4 26 Z" stroke={colors.accent} strokeWidth="0.8" opacity="0.4" fill="none" />
          </svg>
          <svg className="absolute bottom-2 right-2 w-6 h-6" viewBox="0 0 30 30" fill="none">
            <path d="M15 15 L26 15 L26 26 L15 26 Z" stroke={colors.accent} strokeWidth="0.8" opacity="0.4" fill="none" />
          </svg>

          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Mempelai Wanita
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-2" style={{ color: colors.text }}>
            {invitation?.brideName || "Bride"}
          </h2>
          <p className="text-sm italic" style={{ color: colors.accent, fontFamily: fonts.quote }}>
            Daughter of Mr. ... & Mrs. ...
          </p>
        </div>
      </motion.div>
    </section>
  );
}
