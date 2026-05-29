"use client";

import { motion } from "framer-motion";
import type { CoupleSectionProps } from "../../../types";

export function CoupleSection({ config, colors, fonts, brideName, groomName, heroImage }: CoupleSectionProps) {
  return (
    <section
      className="relative w-full py-20 px-6"
      style={{ background: colors.background, fontFamily: fonts.heading }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: colors.accent, fontFamily: fonts.body }}>
            Dear Couple
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: colors.text }}>
            The Happy Couple
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
            <svg width="8" height="8" viewBox="0 0 8 8" fill={colors.accent}><path d="M4 0L8 4L4 8L0 4Z" /></svg>
            <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            className="relative p-8 text-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              border: `2px solid ${colors.accent}44`,
              borderRadius: config.layout.borderRadius,
              background: colors.surface,
            }}
          >
            <svg className="absolute top-2 left-2 w-8 h-8" viewBox="0 0 40 40" fill="none">
              <path d="M4 4 L20 4 L20 20 L4 20 Z" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" fill="none" />
              <path d="M8 8 L18 8 L18 18 L8 18 Z" stroke={colors.accent} strokeWidth="0.5" opacity="0.2" fill="none" />
            </svg>
            <svg className="absolute top-2 right-2 w-8 h-8" viewBox="0 0 40 40" fill="none">
              <path d="M20 4 L36 4 L36 20 L20 20 Z" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" fill="none" />
              <path d="M22 8 L32 8 L32 18 L22 18 Z" stroke={colors.accent} strokeWidth="0.5" opacity="0.2" fill="none" />
            </svg>
            <svg className="absolute bottom-2 left-2 w-8 h-8" viewBox="0 0 40 40" fill="none">
              <path d="M4 20 L20 20 L20 36 L4 36 Z" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" fill="none" />
              <path d="M8 22 L18 22 L18 32 L8 32 Z" stroke={colors.accent} strokeWidth="0.5" opacity="0.2" fill="none" />
            </svg>
            <svg className="absolute bottom-2 right-2 w-8 h-8" viewBox="0 0 40 40" fill="none">
              <path d="M20 20 L36 20 L36 36 L20 36 Z" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" fill="none" />
              <path d="M22 22 L32 22 L32 32 L22 32 Z" stroke={colors.accent} strokeWidth="0.5" opacity="0.2" fill="none" />
            </svg>

            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4"
              style={{ background: colors.background, color: colors.accent }}
            >
              <span className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: fonts.body }}>Groom</span>
            </div>

            <div
              className="w-28 h-28 mx-auto mb-4 rounded-full flex items-center justify-center overflow-hidden"
              style={{
                border: `2.5px solid ${colors.accent}`,
                boxShadow: `0 0 20px ${colors.accent}33`,
              }}
            >
              {heroImage ? (
                <img src={heroImage} alt={groomName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold" style={{ color: colors.accent }}>{groomName?.charAt(0) || "G"}</span>
              )}
            </div>

            <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>{groomName}</h3>
            <p className="text-sm" style={{ color: colors.accent, fontFamily: fonts.quote }}>The Groom</p>
            <p className="text-xs tracking-widest uppercase mt-2" style={{ color: colors.muted, fontFamily: fonts.body }}>
              Son of Mr. ... & Mrs. ...
            </p>

            <div className="flex justify-center gap-1 mt-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-2 h-2" style={{ border: `1px solid ${colors.accent}44`, transform: "rotate(45deg)" }} />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative p-8 text-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              border: `2px solid ${colors.accent}44`,
              borderRadius: config.layout.borderRadius,
              background: colors.surface,
            }}
          >
            <svg className="absolute top-2 left-2 w-8 h-8" viewBox="0 0 40 40" fill="none">
              <path d="M4 4 L20 4 L20 20 L4 20 Z" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" fill="none" />
              <path d="M8 8 L18 8 L18 18 L8 18 Z" stroke={colors.accent} strokeWidth="0.5" opacity="0.2" fill="none" />
            </svg>
            <svg className="absolute top-2 right-2 w-8 h-8" viewBox="0 0 40 40" fill="none">
              <path d="M20 4 L36 4 L36 20 L20 20 Z" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" fill="none" />
              <path d="M22 8 L32 8 L32 18 L22 18 Z" stroke={colors.accent} strokeWidth="0.5" opacity="0.2" fill="none" />
            </svg>
            <svg className="absolute bottom-2 left-2 w-8 h-8" viewBox="0 0 40 40" fill="none">
              <path d="M4 20 L20 20 L20 36 L4 36 Z" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" fill="none" />
              <path d="M8 22 L18 22 L18 32 L8 32 Z" stroke={colors.accent} strokeWidth="0.5" opacity="0.2" fill="none" />
            </svg>
            <svg className="absolute bottom-2 right-2 w-8 h-8" viewBox="0 0 40 40" fill="none">
              <path d="M20 20 L36 20 L36 36 L20 36 Z" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" fill="none" />
              <path d="M22 22 L32 22 L32 32 L22 32 Z" stroke={colors.accent} strokeWidth="0.5" opacity="0.2" fill="none" />
            </svg>

            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4"
              style={{ background: colors.background, color: colors.accent }}
            >
              <span className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: fonts.body }}>Bride</span>
            </div>

            <div
              className="w-28 h-28 mx-auto mb-4 rounded-full flex items-center justify-center overflow-hidden"
              style={{
                border: `2.5px solid ${colors.accent}`,
                boxShadow: `0 0 20px ${colors.accent}33`,
              }}
            >
              {heroImage ? (
                <img src={heroImage} alt={brideName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold" style={{ color: colors.accent }}>{brideName?.charAt(0) || "B"}</span>
              )}
            </div>

            <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>{brideName}</h3>
            <p className="text-sm" style={{ color: colors.accent, fontFamily: fonts.quote }}>The Bride</p>
            <p className="text-xs tracking-widest uppercase mt-2" style={{ color: colors.muted, fontFamily: fonts.body }}>
              Daughter of Mr. ... & Mrs. ...
            </p>

            <div className="flex justify-center gap-1 mt-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-2 h-2" style={{ border: `1px solid ${colors.accent}44`, transform: "rotate(45deg)" }} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
