"use client";

import { motion } from "framer-motion";
import type { CoverSectionProps } from "../../../types";

const ulosWatermark = {
  backgroundImage: `
    linear-gradient(45deg, rgba(212,168,75,0.05) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(212,168,75,0.05) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(212,168,75,0.05) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(212,168,75,0.05) 75%)
  `,
  backgroundSize: "60px 60px",
};

export function CoverSection({ config, colors, fonts, invitation, onEnter }: CoverSectionProps) {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20"
      style={{
        background: `linear-gradient(180deg, ${colors.background}, ${colors.secondary}, ${colors.background})`,
        fontFamily: fonts.heading,
      }}
    >
      <div className="absolute inset-0" style={ulosWatermark} />

      <div className="absolute top-0 left-0 w-full h-2" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />

      {/* Ulos diamond border decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <svg className="absolute top-4 left-4 w-16 h-16 opacity-20" viewBox="0 0 60 60">
          <path d="M30 5 L48 30 L30 55 L12 30 Z" stroke={colors.accent} strokeWidth="1" fill="none" />
          <path d="M30 15 L40 30 L30 45 L20 30 Z" stroke={colors.accent} strokeWidth="0.8" fill="none" />
          <line x1="30" y1="5" x2="30" y2="55" stroke={colors.accent} strokeWidth="0.5" opacity="0.5" />
          <line x1="12" y1="30" x2="48" y2="30" stroke={colors.accent} strokeWidth="0.5" opacity="0.5" />
        </svg>
        <svg className="absolute top-4 right-4 w-16 h-16 opacity-20 scale-x-[-1]" viewBox="0 0 60 60">
          <path d="M30 5 L48 30 L30 55 L12 30 Z" stroke={colors.accent} strokeWidth="1" fill="none" />
          <path d="M30 15 L40 30 L30 45 L20 30 Z" stroke={colors.accent} strokeWidth="0.8" fill="none" />
        </svg>
        <svg className="absolute bottom-4 left-4 w-16 h-16 opacity-20 scale-y-[-1]" viewBox="0 0 60 60">
          <path d="M30 5 L48 30 L30 55 L12 30 Z" stroke={colors.accent} strokeWidth="1" fill="none" />
          <path d="M30 15 L40 30 L30 45 L20 30 Z" stroke={colors.accent} strokeWidth="0.8" fill="none" />
        </svg>
        <svg className="absolute bottom-4 right-4 w-16 h-16 opacity-20 scale-[-1]" viewBox="0 0 60 60">
          <path d="M30 5 L48 30 L30 55 L12 30 Z" stroke={colors.accent} strokeWidth="1" fill="none" />
          <path d="M30 15 L40 30 L30 45 L20 30 Z" stroke={colors.accent} strokeWidth="0.8" fill="none" />
        </svg>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 max-w-2xl text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: colors.accent, fontFamily: fonts.body }}>
          Horas!
        </p>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
          <span style={{ color: colors.accent }}>ᯎ</span>
          <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-3" style={{ color: colors.text }}>
          {invitation?.groomName || "Groom"}
        </h1>
        <p className="text-lg tracking-widest mb-2" style={{ color: colors.accent }}>&</p>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8" style={{ color: colors.text }}>
          {invitation?.brideName || "Bride"}
        </h1>

        <div className="w-24 h-0.5 mb-6" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />

        <p className="text-sm leading-relaxed max-w-md mb-10"
          style={{ color: colors.muted, fontFamily: fonts.body }}
        >
          Marhahom ma rohami, ro do hami tu langkanami. Molo denggan basa ni rohami,
          hami mangundang hamu.
        </p>

        <motion.button
          onClick={onEnter}
          className="px-10 py-3 text-base tracking-wider cursor-pointer"
          style={{
            color: colors.accent,
            border: `1.5px solid ${colors.accent}`,
            borderRadius: config.layout.borderRadius,
            fontFamily: fonts.body,
            background: `linear-gradient(135deg, ${colors.secondary}88, transparent, ${colors.secondary}88)`,
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          Masuk
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] tracking-widest uppercase" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Scroll
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
