"use client";

import { motion } from "framer-motion";
import type { CoupleSectionProps } from "../../../types";

export function CoupleSection({ config, colors, fonts, brideName, groomName, heroImage }: CoupleSectionProps) {
  return (
    <section
      className="relative w-full py-20 px-6"
      style={{ background: colors.background, fontFamily: fonts.heading }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-3" style={{ color: colors.text }}>
            Kedua Mempelai
          </h2>
          <div
            className="w-12 h-px mx-auto"
            style={{ background: colors.secondary }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <motion.div
            className="text-center px-6 py-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              border: `1px solid ${colors.secondary}44`,
              background: colors.surface,
            }}
          >
            {heroImage && (
              <div
                className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden"
                style={{ border: `2px solid ${colors.secondary}` }}
              >
                <img src={heroImage} alt={groomName} className="w-full h-full object-cover" />
              </div>
            )}
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: colors.secondary, fontFamily: fonts.body }}>
              Mempelai Pria
            </p>
            <h3 className="text-2xl font-light mb-3" style={{ color: colors.text }}>{groomName}</h3>
            <p className="text-xs tracking-wider" style={{ color: colors.muted, fontFamily: fonts.body }}>
              Putra dari Bapak ... & Ibu ...
            </p>
          </motion.div>

          <motion.div
            className="text-center px-6 py-10"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              border: `1px solid ${colors.secondary}44`,
              background: colors.surface,
            }}
          >
            {heroImage && (
              <div
                className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden"
                style={{ border: `2px solid ${colors.secondary}` }}
              >
                <img src={heroImage} alt={brideName} className="w-full h-full object-cover" />
              </div>
            )}
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: colors.secondary, fontFamily: fonts.body }}>
              Mempelai Wanita
            </p>
            <h3 className="text-2xl font-light mb-3" style={{ color: colors.text }}>{brideName}</h3>
            <p className="text-xs tracking-wider" style={{ color: colors.muted, fontFamily: fonts.body }}>
              Putri dari Bapak ... & Ibu ...
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
