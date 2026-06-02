"use client";

import { motion } from "framer-motion";

export function CoupleSection({ config, colors, fonts, brideName, groomName, heroImage }: any) {
  return (
    <section
      className="relative w-full px-5 py-20"
      style={{ background: colors.background, fontFamily: fonts.heading }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-xs uppercase tracking-[0.35em]" style={{ color: colors.accent, fontFamily: fonts.body }}>
            Na Marhahom
          </p>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: colors.text }}>
            Kedua Mempelai
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
            <svg width="8" height="8" viewBox="0 0 8 8"><path d="M4 0L8 4L4 8L0 4Z" fill={colors.accent} /></svg>
            <div className="h-px w-12" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Groom Card */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {heroImage && (
              <motion.div
                className="w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full"
                style={{
                  border: `4px solid ${colors.accent}`,
                  boxShadow: `0 10px 30px ${colors.accent}22`,
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img src={heroImage} alt={groomName} className="h-full w-full object-cover" />
              </motion.div>
            )}

            <h3 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: colors.text }}>
              {groomName || "Groom"}
            </h3>
            <p className="text-base italic mb-4" style={{ color: colors.accent, fontFamily: fonts.quote }}>
              Anak ni Raja
            </p>

            <div className="mx-auto mb-4 h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />

            <p className="text-sm leading-relaxed" style={{ color: colors.muted, fontFamily: fonts.body }}>
              Putra dari
            </p>
            <p className="text-base font-medium mt-1" style={{ color: colors.text, fontFamily: fonts.body }}>
              Bapak ... &amp; Ibu ...
            </p>
          </motion.div>

          {/* Bride Card */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {heroImage && (
              <motion.div
                className="w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full"
                style={{
                  border: `4px solid ${colors.accent}`,
                  boxShadow: `0 10px 30px ${colors.accent}22`,
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img src={heroImage} alt={brideName} className="h-full w-full object-cover" />
              </motion.div>
            )}

            <h3 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: colors.text }}>
              {brideName || "Bride"}
            </h3>
            <p className="text-base italic mb-4" style={{ color: colors.accent, fontFamily: fonts.quote }}>
              Boru ni Raja
            </p>

            <div className="mx-auto mb-4 h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />

            <p className="text-sm leading-relaxed" style={{ color: colors.muted, fontFamily: fonts.body }}>
              Putri dari
            </p>
            <p className="text-base font-medium mt-1" style={{ color: colors.text, fontFamily: fonts.body }}>
              Bapak ... &amp; Ibu ...
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
