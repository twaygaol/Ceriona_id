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
      {/* Ulos pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(212,168,75,0.1) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(212,168,75,0.1) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(212,168,75,0.1) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(212,168,75,0.1) 75%)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Gold divider */}
          <svg className="mx-auto mb-6 w-32 h-6 opacity-60" viewBox="0 0 160 20" fill="none">
            <path d="M10 10 C20 2 30 2 40 10 C50 18 60 18 70 10 C80 2 90 2 100 10 C110 18 120 18 130 10 C140 2 145 2 150 10" stroke={colors.accent} strokeWidth="1" fill="none" />
          </svg>

          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: colors.accent, fontFamily: fonts.body }}>
            Mauliate
          </p>

          <p className="text-sm leading-relaxed mb-6 max-w-sm"
            style={{ color: colors.muted, fontFamily: fonts.body }}
          >
            Terima kasih atas kehadiran dan doa restu Bapak/Ibu/Saudara/i.
            Tuhan memberkati kita semua.
          </p>

          <h3 className="text-xl font-bold mb-1" style={{ color: colors.text }}>
            {groomName}
          </h3>
          <p className="text-xs tracking-widest mb-1" style={{ color: colors.accent }}>&</p>
          <h3 className="text-xl font-bold mb-8" style={{ color: colors.text }}>
            {brideName}
          </h3>

          <div className="w-16 h-0.5 mx-auto mb-6" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />

          <p className="text-[10px] tracking-wider" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Powered by <span style={{ color: colors.accent }}>Ceriona</span>
          </p>

          <p className="text-[10px] tracking-wider mt-1" style={{ color: `${colors.muted}99`, fontFamily: fonts.body }}>
            Wedding Digital Invitation
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
