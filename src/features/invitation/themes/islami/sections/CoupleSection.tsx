"use client";

import { motion } from "framer-motion";
import type { CoupleSectionProps } from "../../../types";

export function CoupleSection({ config, colors, fonts, brideName, groomName, heroImage }: CoupleSectionProps) {
  return (
    <section
      className="relative w-full py-20 px-6"
      style={{ background: colors.surface, fontFamily: fonts.heading }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg mb-2" style={{ color: colors.accent, fontFamily: fonts.quote, direction: "rtl" }}>
            ﷽
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: colors.text }}>
            Kedua Mempelai
          </h2>
          <div className="w-16 h-0.5 mx-auto" style={{ background: colors.secondary }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Groom Card - Mihrab arch shape */}
          <motion.div
            className="relative p-8 text-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              border: `1.5px solid ${colors.accent}33`,
              borderRadius: "50% 50% 12px 12px",
              background: colors.background,
            }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4"
              style={{ background: colors.surface, color: colors.secondary }}
            >
              <span className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: fonts.body }}>Pria</span>
            </div>
            {heroImage && (
              <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-2"
                style={{ borderColor: colors.accent }}
              >
                <img src={heroImage} alt={groomName} className="w-full h-full object-cover" />
              </div>
            )}
            <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>{groomName}</h3>
            <p className="text-xs tracking-widest uppercase" style={{ color: colors.muted, fontFamily: fonts.body }}>
              Putra dari Bapak ... & Ibu ...
            </p>
            <div className="mt-4 w-12 h-px mx-auto" style={{ background: colors.accent }} />
            <p className="text-xs mt-2 italic" style={{ color: colors.muted, fontFamily: fonts.quote }}>
              Ibnu ...
            </p>
          </motion.div>

          {/* Bride Card - Mihrab arch shape */}
          <motion.div
            className="relative p-8 text-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              border: `1.5px solid ${colors.accent}33`,
              borderRadius: "50% 50% 12px 12px",
              background: colors.background,
            }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4"
              style={{ background: colors.surface, color: colors.secondary }}
            >
              <span className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: fonts.body }}>Wanita</span>
            </div>
            {heroImage && (
              <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-2"
                style={{ borderColor: colors.accent }}
              >
                <img src={heroImage} alt={brideName} className="w-full h-full object-cover" />
              </div>
            )}
            <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>{brideName}</h3>
            <p className="text-xs tracking-widest uppercase" style={{ color: colors.muted, fontFamily: fonts.body }}>
              Putri dari Bapak ... & Ibu ...
            </p>
            <div className="mt-4 w-12 h-px mx-auto" style={{ background: colors.accent }} />
            <p className="text-xs mt-2 italic" style={{ color: colors.muted, fontFamily: fonts.quote }}>
              Binti ...
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
