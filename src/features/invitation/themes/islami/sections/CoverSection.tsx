"use client";

import { motion } from "framer-motion";
import type { CoverSectionProps } from "../../../types";

const geometricBorder = {
  backgroundImage: `
    url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='25,3 32,17 47,17 36,27 41,43 25,33 9,43 14,27 3,17 18,17' fill='none' stroke='%23D4A84B' stroke-width='0.5' opacity='0.1'/%3E%3C/svg%3E")
  `,
  backgroundSize: "50px 50px",
};

export function CoverSection({ config, colors, fonts, invitation, onEnter }: CoverSectionProps) {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20"
      style={{
        background: `linear-gradient(180deg, #0A2E0D, ${colors.primary}, #0A2E0D)`,
        fontFamily: fonts.heading,
      }}
    >
      <div className="absolute inset-0 opacity-40" style={geometricBorder} />

      <div className="absolute top-0 left-0 w-full h-2" style={{ background: `linear-gradient(90deg, transparent, ${colors.secondary}, transparent)` }} />
      <div className="absolute bottom-0 left-0 w-full h-2" style={{ background: `linear-gradient(90deg, transparent, ${colors.secondary}, transparent)` }} />

      <button
        onClick={onEnter}
        className="absolute top-6 right-6 text-xs tracking-widest uppercase cursor-pointer transition-all hover:opacity-70"
        style={{ color: colors.secondary, fontFamily: fonts.body }}
      >
        Skip
      </button>

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 max-w-2xl text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <p className="text-lg mb-6" style={{ color: colors.accent, fontFamily: fonts.quote, direction: "rtl" }}>
          ﷽
        </p>

        <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: colors.secondary, fontFamily: fonts.body }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </p>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.secondary})` }} />
          <span style={{ color: colors.secondary }}>◈</span>
          <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, ${colors.secondary}, transparent)` }} />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-3" style={{ color: colors.surface }}>
          {invitation?.groomName || "Groom"}
        </h1>
        <p className="text-lg tracking-widest mb-2" style={{ color: colors.secondary }}>&</p>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4" style={{ color: colors.surface }}>
          {invitation?.brideName || "Bride"}
        </h1>

        <div className="w-24 h-0.5 mb-6" style={{ background: `linear-gradient(90deg, transparent, ${colors.secondary}, transparent)` }} />

        <p className="text-sm mb-1" style={{ color: colors.muted, fontFamily: fonts.body }}>
          {invitation?.weddingDate || "Sabtu, 12 September 2026"}
        </p>
        <p className="text-xs mb-8" style={{ color: colors.accent, fontFamily: fonts.quote }}>
          12 Rabiul Awal 1448 H
        </p>

        <p className="text-sm leading-relaxed max-w-md mb-10"
          style={{ color: colors.muted, fontFamily: fonts.body }}
        >
          Merupakan suatu kehormatan dan kebahagiaan apabila Bapak/Ibu/Saudara/i
          berkenan hadir memberikan doa restu pada acara pernikahan putra-putri kami
        </p>

        <motion.button
          onClick={onEnter}
          className="px-10 py-3 text-base tracking-wider cursor-pointer"
          style={{
            color: colors.secondary,
            border: `1.5px solid ${colors.secondary}`,
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
