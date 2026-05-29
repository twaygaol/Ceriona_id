"use client";

import { motion } from "framer-motion";
import type { CoverSectionProps } from "../../../types";

const diamondBg = {
  backgroundImage: `
    linear-gradient(45deg, rgba(212,168,75,0.06) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(212,168,75,0.06) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(212,168,75,0.06) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(212,168,75,0.06) 75%)
  `,
  backgroundSize: "50px 50px",
};

export function CoverSection({ config, colors, fonts, invitation, onEnter }: CoverSectionProps) {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20"
      style={{
        background: `linear-gradient(180deg, ${colors.secondary}, #2C1810, ${colors.secondary})`,
        fontFamily: fonts.heading,
      }}
    >
      <div className="absolute inset-0" style={diamondBg} />

      <div className="absolute top-0 left-0 w-full h-2" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 max-w-2xl text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: colors.accent, fontFamily: fonts.body }}>
          Bismillahirrahmanirrahim
        </p>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
          <span style={{ color: colors.accent }}>◈</span>
          <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-3" style={{ color: colors.surface }}>
          {invitation?.groomName || "Groom"}
        </h1>
        <p className="text-lg tracking-widest mb-2" style={{ color: colors.accent }}>&</p>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8" style={{ color: colors.surface }}>
          {invitation?.brideName || "Bride"}
        </h1>

        <div className="w-24 h-0.5 mb-6" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />

        <p className="text-sm leading-relaxed max-w-md mb-10"
          style={{ color: colors.muted, fontFamily: fonts.body }}
        >
          Merupakan suatu kehormatan dan kebahagiaan apabila Bapak/Ibu/Saudara/i
          berkenan hadir memberikan doa restu pada pernikahan putra-putri kami
        </p>

        <motion.button
          onClick={onEnter}
          className="px-10 py-3 text-base tracking-wider cursor-pointer"
          style={{
            color: colors.surface,
            border: `1.5px solid ${colors.accent}`,
            borderRadius: config.layout.borderRadius,
            fontFamily: fonts.body,
            background: `linear-gradient(135deg, ${colors.primary}44, transparent, ${colors.primary}44)`,
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          Buka Undangan
        </motion.button>
      </motion.div>
    </section>
  );
}
