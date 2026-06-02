"use client";

import { motion } from "framer-motion";

const ulosPattern = {
  backgroundImage: `
    linear-gradient(45deg, rgba(200,164,77,0.06) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(200,164,77,0.06) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(200,164,77,0.06) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(200,164,77,0.06) 75%)
  `,
  backgroundSize: "40px 40px",
};

export function FooterSection({ config, colors, fonts, brideName, groomName }: any) {
  return (
    <footer
      className="relative w-full overflow-hidden px-5 py-20"
      style={{
        background: `linear-gradient(180deg, ${colors.surface}, ${colors.background})`,
        fontFamily: fonts.heading,
      }}
    >
      <div className="absolute inset-0" style={ulosPattern} />

      <div className="relative z-10 mx-auto max-w-lg text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Gorga ornament */}
          <svg className="mx-auto mb-8 w-40 h-8 opacity-60" viewBox="0 0 200 20" fill="none">
            <path d="M10 10 C35 2 60 2 85 10 C110 18 135 18 160 10 C180 2 195 2 190 10" stroke={colors.accent} strokeWidth="1.2" fill="none" />
            <circle cx="50" cy="10" r="2.5" fill={colors.accent} opacity="0.5" />
            <circle cx="100" cy="10" r="3" fill={colors.accent} opacity="0.7" />
            <circle cx="150" cy="10" r="2.5" fill={colors.accent} opacity="0.5" />
          </svg>

          <p className="mb-4 text-sm uppercase tracking-[0.25em]" style={{ color: colors.accent, fontFamily: fonts.body }}>
            Mauliate &amp; Horas
          </p>

          <div className="mx-auto mb-6 flex items-center justify-center gap-2">
            <div className="h-px w-8" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
            <svg width="6" height="6" viewBox="0 0 6 6"><path d="M3 0L6 3L3 6L0 3Z" fill={colors.accent} opacity="0.5" /></svg>
            <svg width="8" height="8" viewBox="0 0 8 8"><path d="M4 0L8 4L4 8L0 4Z" fill={colors.accent} opacity="0.7" /></svg>
            <svg width="6" height="6" viewBox="0 0 6 6"><path d="M3 0L6 3L3 6L0 3Z" fill={colors.accent} opacity="0.5" /></svg>
            <div className="h-px w-8" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
          </div>

          <p className="mb-8 text-base leading-relaxed" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Terima kasih atas kehadiran dan doa restu Bapak/Ibu/Saudara/i. Tuhan memberkati kita semua. Sai horas ma di hamu saluhutna.
          </p>

          <h3 className="text-2xl md:text-3xl font-bold" style={{ color: colors.text }}>
            {groomName || "Groom"}
          </h3>
          <p className="my-2 text-lg tracking-widest" style={{ color: colors.accent, fontFamily: fonts.quote }}>
            &amp;
          </p>
          <h3 className="mb-10 text-2xl md:text-3xl font-bold" style={{ color: colors.text }}>
            {brideName || "Bride"}
          </h3>

          <div className="mx-auto mb-6 h-px w-20" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />

          <p className="text-xs tracking-wider" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Powered by <span style={{ color: colors.accent, fontWeight: 600 }}>Ceriona</span>
          </p>
          <p className="mt-1 text-[10px] tracking-wider" style={{ color: `${colors.muted}99`, fontFamily: fonts.body }}>
            Wedding Digital Invitation
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
