"use client";

import { motion } from "framer-motion";
import type { FooterSectionProps } from "../../../types";

export function FooterSection({ config, colors, fonts, brideName, groomName }: FooterSectionProps) {
  return (
    <footer
      className="relative w-full py-16 px-6"
      style={{
        background: `linear-gradient(180deg, ${colors.surface}, ${colors.background})`,
        fontFamily: fonts.heading,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${colors.accent.replace("#", "%23")}' fill-opacity='0.5'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <svg className="mx-auto mb-8 w-40 h-8 opacity-40" viewBox="0 0 200 20" fill="none">
            <path d="M10 10 C20 3 35 3 45 10 C55 17 70 17 80 10 C90 3 105 3 115 10 C125 17 140 17 150 10 C160 3 175 3 190 10" stroke={colors.accent} strokeWidth="0.8" fill="none" />
            <path d="M45 10 L55 10" stroke={colors.accent} strokeWidth="0.5" />
            <path d="M115 10 L125 10" stroke={colors.accent} strokeWidth="0.5" />
          </svg>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
            <svg width="8" height="8" viewBox="0 0 8 8" fill={colors.accent}><path d="M4 0L8 4L4 8L0 4Z" /></svg>
            <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
          </div>

          <p className="text-2xl md:text-3xl mb-4" style={{ color: colors.accent, fontFamily: fonts.quote }}>
            Thank You
          </p>

          <p className="text-sm leading-relaxed mb-8 max-w-sm"
            style={{ color: colors.muted, fontFamily: fonts.body }}
          >
            Thank you for your presence and blessings. Your love and support mean the world to us.
          </p>

          <h3 className="text-xl font-bold mb-1" style={{ color: colors.text }}>
            {groomName}
          </h3>
          <p className="text-sm tracking-widest mb-1" style={{ color: colors.accent }}>&</p>
          <h3 className="text-xl font-bold mb-8" style={{ color: colors.text }}>
            {brideName}
          </h3>

          <div className="flex items-center justify-center gap-3 mb-8">
            <svg width="6" height="6" viewBox="0 0 6 6" fill={colors.accent} opacity="0.5"><path d="M3 0L6 3L3 6L0 3Z" /></svg>
            <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
            <svg width="10" height="10" viewBox="0 0 10 10" fill={colors.accent} opacity="0.8"><path d="M5 0L10 5L5 10L0 5Z" /></svg>
            <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
            <svg width="6" height="6" viewBox="0 0 6 6" fill={colors.accent} opacity="0.5"><path d="M3 0L6 3L3 6L0 3Z" /></svg>
          </div>

          <p className="text-[10px] tracking-wider" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Powered by <span style={{ color: colors.accent }}>Ceriona</span>
          </p>
          <p className="text-[10px] tracking-wider mt-1" style={{ color: `${colors.muted}99`, fontFamily: fonts.body }}>
            Premium Digital Invitation
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
