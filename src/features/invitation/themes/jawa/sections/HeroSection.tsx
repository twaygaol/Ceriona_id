"use client";

import { motion } from "framer-motion";
import type { HeroSectionProps } from "../../../types";

const batikOverlay = {
  backgroundImage: `
    radial-gradient(circle at 25% 25%, rgba(212,168,75,0.05) 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, rgba(212,168,75,0.05) 1px, transparent 1px)
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
      <div className="absolute inset-0" style={batikOverlay} />

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-sm tracking-[0.3em] uppercase mb-4"
          style={{ color: colors.primary, fontFamily: fonts.body }}
        >
          Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
        </p>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
          <span className="text-xl" style={{ color: colors.accent }}>◈</span>
          <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
        </div>

        {/* Bride and groom names in ornate frames */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <div
            className="px-8 py-6 text-center"
            style={{
              border: `1.5px solid ${colors.accent}44`,
              borderRadius: config.layout.borderRadius,
              background: `${colors.surface}88`,
            }}
          >
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: colors.muted, fontFamily: fonts.body }}>
              Mempelai Pria
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: colors.text }}>
              {invitation?.groomName || "Groom"}
            </h2>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-px" style={{ background: colors.accent }} />
            <span className="text-lg" style={{ color: colors.accent }}>&</span>
            <div className="w-12 h-px" style={{ background: colors.accent }} />
          </div>

          <div
            className="px-8 py-6 text-center"
            style={{
              border: `1.5px solid ${colors.accent}44`,
              borderRadius: config.layout.borderRadius,
              background: `${colors.surface}88`,
            }}
          >
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: colors.muted, fontFamily: fonts.body }}>
              Mempelai Wanita
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: colors.text }}>
              {invitation?.brideName || "Bride"}
            </h2>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <div className="w-8 h-px" style={{ background: colors.muted }} />
          <p className="text-sm italic tracking-wide" style={{ color: colors.muted, fontFamily: fonts.quote }}>
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri&rdquo;
          </p>
          <div className="w-8 h-px" style={{ background: colors.muted }} />
        </div>
      </motion.div>
    </section>
  );
}
