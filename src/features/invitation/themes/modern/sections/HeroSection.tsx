"use client";

import { motion } from "framer-motion";
import type { HeroSectionProps } from "../../../types";

export function HeroSection({ config, colors, fonts, invitation }: HeroSectionProps) {
  return (
    <section
      className="relative w-full py-24 flex flex-col items-center justify-center overflow-hidden px-6"
      style={{
        background: colors.surface,
        fontFamily: fonts.heading,
      }}
    >
      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <p
          className="text-xs tracking-[0.3em] uppercase mb-6"
          style={{ color: colors.muted, fontFamily: fonts.body }}
        >
          The Wedding of
        </p>

        <div
          className="w-12 h-px mb-8"
          style={{ background: colors.secondary }}
        />

        <h2 className="text-5xl md:text-7xl font-light leading-tight mb-2" style={{ color: colors.text }}>
          {invitation?.groomName || "Groom"}
        </h2>
        <p className="text-2xl tracking-widest my-4" style={{ color: colors.secondary }}>&</p>
        <h2 className="text-5xl md:text-7xl font-light leading-tight" style={{ color: colors.text }}>
          {invitation?.brideName || "Bride"}
        </h2>
      </motion.div>
    </section>
  );
}
