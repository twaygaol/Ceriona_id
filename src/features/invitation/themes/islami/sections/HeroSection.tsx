"use client";

import { motion } from "framer-motion";
import type { HeroSectionProps } from "../../../types";

const geometricOverlay = {
  backgroundImage: `
    radial-gradient(circle at 30% 30%, rgba(212,168,75,0.04) 1px, transparent 1px),
    radial-gradient(circle at 70% 70%, rgba(27,94,32,0.04) 1px, transparent 1px)
  `,
  backgroundSize: "40px 40px",
};

export function HeroSection({ config, colors, fonts, invitation }: HeroSectionProps) {
  return (
    <section
      className="relative w-full py-24 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${colors.background}, ${colors.surface}, ${colors.background})`,
        fontFamily: fonts.heading,
      }}
    >
      <div className="absolute inset-0" style={geometricOverlay} />

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-sm tracking-[0.3em] uppercase mb-6"
          style={{ color: colors.primary, fontFamily: fonts.body }}
        >
          Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
        </p>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.secondary})` }} />
          <span className="text-xl" style={{ color: colors.secondary }}>✦</span>
          <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, ${colors.secondary}, transparent)` }} />
        </div>

        {/* Mihrab-inspired arched frames */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <div
            className="relative px-10 py-8 text-center"
            style={{
              border: `1.5px solid ${colors.accent}44`,
              borderRadius: "50% 50% 12px 12px",
              background: `${colors.surface}88`,
              minWidth: "200px",
            }}
          >
            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-16 h-px" style={{ background: colors.secondary }} />
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: colors.muted, fontFamily: fonts.body }}>
              Mempelai Pria
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: colors.text }}>
              {invitation?.groomName || "Groom"}
            </h2>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-px" style={{ background: colors.secondary }} />
            <span className="text-2xl font-light" style={{ color: colors.secondary }}>&</span>
            <div className="w-12 h-px" style={{ background: colors.secondary }} />
          </div>

          <div
            className="relative px-10 py-8 text-center"
            style={{
              border: `1.5px solid ${colors.accent}44`,
              borderRadius: "50% 50% 12px 12px",
              background: `${colors.surface}88`,
              minWidth: "200px",
            }}
          >
            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-16 h-px" style={{ background: colors.secondary }} />
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: colors.muted, fontFamily: fonts.body }}>
              Mempelai Wanita
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: colors.text }}>
              {invitation?.brideName || "Bride"}
            </h2>
          </div>
        </div>

        {/* Arabesque divider */}
        <div className="mt-10 flex items-center gap-4">
          <svg width="60" height="16" viewBox="0 0 60 16" className="opacity-40">
            <path d="M0 8 Q15 0 30 8 Q45 16 60 8" stroke={colors.secondary} strokeWidth="1" fill="none" />
          </svg>
          <p className="text-sm italic tracking-wide" style={{ color: colors.muted, fontFamily: fonts.quote }}>
            &ldquo;Semoga menjadi keluarga yang sakinah, mawaddah, warahmah&rdquo;
          </p>
          <svg width="60" height="16" viewBox="0 0 60 16" className="opacity-40">
            <path d="M0 8 Q15 0 30 8 Q45 16 60 8" stroke={colors.secondary} strokeWidth="1" fill="none" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
