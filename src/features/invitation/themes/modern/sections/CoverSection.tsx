"use client";

import { motion } from "framer-motion";
import type { CoverSectionProps } from "../../../types";

export function CoverSection({ config, colors, fonts, invitation, onEnter }: CoverSectionProps) {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20 px-6"
      style={{
        background: colors.background,
        fontFamily: fonts.heading,
      }}
    >
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-2xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <p
          className="text-xs tracking-[0.3em] uppercase mb-6"
          style={{ color: colors.muted, fontFamily: fonts.body }}
        >
          We're Getting Married
        </p>

        <div
          className="w-12 h-px mb-8"
          style={{ background: colors.secondary }}
        />

        <h1 className="text-5xl md:text-7xl font-light leading-tight mb-2" style={{ color: colors.text }}>
          {invitation?.groomName || "Groom"}
        </h1>
        <p className="text-lg tracking-widest mb-2" style={{ color: colors.secondary }}>&</p>
        <h1 className="text-5xl md:text-7xl font-light leading-tight mb-8" style={{ color: colors.text }}>
          {invitation?.brideName || "Bride"}
        </h1>

        <div
          className="w-12 h-px mb-6"
          style={{ background: colors.secondary }}
        />

        <p
          className="text-sm tracking-wider mb-10"
          style={{ color: colors.muted, fontFamily: fonts.body }}
        >
          Sabtu, 12 Desember 2026
        </p>

        <motion.button
          onClick={onEnter}
          className="px-10 py-3 text-sm tracking-wider cursor-pointer"
          style={{
            color: colors.text,
            border: `1px solid ${colors.secondary}`,
            background: "transparent",
            fontFamily: fonts.body,
          }}
          whileHover={{ scale: 1.04, background: colors.secondary, color: colors.background }}
          whileTap={{ scale: 0.96 }}
        >
          Buka Undangan
        </motion.button>

        <motion.div
          className="absolute bottom-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] tracking-widest uppercase" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Scroll
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.muted} strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
