"use client";

import { motion } from "framer-motion";
import type { HeroSectionProps } from "../../../types";

const ulosOverlay = {
  backgroundImage: `
    linear-gradient(45deg, rgba(212,168,75,0.04) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(212,168,75,0.04) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(212,168,75,0.04) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(212,168,75,0.04) 75%)
  `,
  backgroundSize: "50px 50px",
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
      <div className="absolute inset-0" style={ulosOverlay} />

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
          Horas! Horas! Horas!
        </p>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
          <span className="text-xl" style={{ color: colors.accent }}>ᯎ</span>
          <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
        </div>

        {/* Groom card */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <div
            className="px-8 py-6 text-center"
            style={{
              border: `1.5px solid ${colors.accent}55`,
              borderRadius: config.layout.borderRadius,
              background: `${colors.surface}88`,
            }}
          >
            {/* Ulos-pattern border decoration */}
            <div className="flex justify-center gap-1 mb-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-3 h-3" style={{ border: `1px solid ${colors.accent}44`, transform: "rotate(45deg)" }} />
              ))}
            </div>
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: colors.muted, fontFamily: fonts.body }}>
              Mempelai Pria
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: colors.text }}>
              {invitation?.groomName || "Groom"}
            </h2>
            <p className="text-xs mt-2 italic" style={{ color: colors.accent, fontFamily: fonts.quote }}>
              Pasukan Raja
            </p>
          </div>

          {/* Gorga motif separator */}
          <div className="flex flex-col items-center gap-2">
            <svg width="40" height="30" viewBox="0 0 40 30" fill="none" className="opacity-60">
              <path d="M5 15 C10 5 20 5 25 15 C30 25 40 25 35 15" stroke={colors.accent} strokeWidth="1.5" fill="none" />
            </svg>
            <span className="text-lg" style={{ color: colors.accent }}>&</span>
            <svg width="40" height="30" viewBox="0 0 40 30" fill="none" className="opacity-60 scale-y-[-1]">
              <path d="M5 15 C10 5 20 5 25 15 C30 25 40 25 35 15" stroke={colors.accent} strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          {/* Bride card */}
          <div
            className="px-8 py-6 text-center"
            style={{
              border: `1.5px solid ${colors.accent}55`,
              borderRadius: config.layout.borderRadius,
              background: `${colors.surface}88`,
            }}
          >
            <div className="flex justify-center gap-1 mb-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-3 h-3" style={{ border: `1px solid ${colors.accent}44`, transform: "rotate(45deg)" }} />
              ))}
            </div>
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: colors.muted, fontFamily: fonts.body }}>
              Mempelai Wanita
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: colors.text }}>
              {invitation?.brideName || "Bride"}
            </h2>
            <p className="text-xs mt-2 italic" style={{ color: colors.accent, fontFamily: fonts.quote }}>
              Boru ni Raja
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <div className="w-8 h-px" style={{ background: colors.muted }} />
          <p className="text-sm italic tracking-wide" style={{ color: colors.muted, fontFamily: fonts.quote }}>
            &ldquo;Sai horas ma hamu nadua, sai hipas-hipas ma hamu, jala sai marparbue na denggan ma hamu&rdquo;
          </p>
          <div className="w-8 h-px" style={{ background: colors.muted }} />
        </div>
      </motion.div>
    </section>
  );
}
