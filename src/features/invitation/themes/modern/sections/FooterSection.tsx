"use client";

import { motion } from "framer-motion";
import type { FooterSectionProps } from "../../../types";

export function FooterSection({ config, colors, fonts, brideName, groomName }: FooterSectionProps) {
  return (
    <footer
      className="relative w-full py-16 px-6"
      style={{
        background: colors.surface,
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
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: colors.secondary, fontFamily: fonts.body }}>
            Terima Kasih
          </p>

          <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Merupakan suatu kehormatan dan kebahagiaan apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu
          </p>

          <div
            className="w-12 h-px mx-auto mb-6"
            style={{ background: colors.secondary }}
          />

          <h3 className="text-xl font-light mb-1" style={{ color: colors.text }}>
            {groomName}
          </h3>
          <p className="text-sm tracking-widest mb-1" style={{ color: colors.secondary }}>&</p>
          <h3 className="text-xl font-light mb-8" style={{ color: colors.text }}>
            {brideName}
          </h3>

          <div
            className="w-12 h-px mx-auto mb-6"
            style={{ background: colors.secondary }}
          />

          <p className="text-[10px] tracking-wider" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Powered by <span style={{ color: colors.secondary }}>Ceriona</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
