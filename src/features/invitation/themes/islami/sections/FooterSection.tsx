"use client";

import { motion } from "framer-motion";
import type { FooterSectionProps } from "../../../types";

export function FooterSection({ config, colors, fonts, brideName, groomName }: FooterSectionProps) {
  return (
    <footer
      className="relative w-full py-16 px-6"
      style={{
        background: `linear-gradient(180deg, ${colors.background}, ${colors.surface})`,
        fontFamily: fonts.heading,
      }}
    >
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-0.5 mx-auto mb-6" style={{ background: `linear-gradient(90deg, transparent, ${colors.secondary}, transparent)` }} />

          <p className="text-lg mb-3" style={{ color: colors.accent, fontFamily: fonts.quote, direction: "rtl" }}>
            ﷽
          </p>

          <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: colors.primary, fontFamily: fonts.body }}>
            Jazakumullahu Khairan
          </p>

          <p className="text-xs mb-1 italic" style={{ color: colors.muted, fontFamily: fonts.quote }}>
            &ldquo;Barakallahu laka wa baraka alayka wa jamaa baynakuma fii khair&rdquo;
          </p>

          <p className="text-sm leading-relaxed mb-6 max-w-sm mt-4"
            style={{ color: colors.muted, fontFamily: fonts.body }}
          >
            Terima kasih atas kehadiran dan doa restu Bapak/Ibu/Saudara/i.
            Semoga Allah memberkahi kita semua.
          </p>

          <div className="w-24 h-px mx-auto mb-6" style={{ background: `linear-gradient(90deg, transparent, ${colors.secondary}, transparent)` }} />

          <h3 className="text-2xl font-bold mb-1" style={{ color: colors.text }}>
            {groomName}
          </h3>
          <p className="text-sm tracking-widest mb-1" style={{ color: colors.secondary }}>&</p>
          <h3 className="text-2xl font-bold mb-8" style={{ color: colors.text }}>
            {brideName}
          </h3>

          <div className="w-16 h-0.5 mx-auto mb-6" style={{ background: `linear-gradient(90deg, transparent, ${colors.secondary}, transparent)` }} />

          <p className="text-[10px] tracking-wider" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Powered by <span style={{ color: colors.primary }}>Ceriona</span>
          </p>

          <p className="text-[10px] tracking-wider mt-1" style={{ color: `${colors.muted}99`, fontFamily: fonts.body }}>
            Wedding Digital Invitation
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
