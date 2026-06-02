"use client";

import { motion } from "framer-motion";

export function MomentSection({ config, colors, fonts, moments }: any) {
  if (!moments || moments.length === 0) return null;

  return (
    <section
      className="relative w-full px-5 py-16"
      style={{ background: colors.background, fontFamily: fonts.heading }}
    >
      <div className="mx-auto max-w-sm">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-[26px] font-bold" style={{ color: colors.text }}>
            Momen Berharga
          </h2>
          <div className="mt-2 flex items-center justify-center gap-2">
            <div className="h-px w-8" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
            <svg width="6" height="6" viewBox="0 0 6 6"><path d="M3 0L6 3L3 6L0 3Z" fill={colors.accent} /></svg>
            <div className="h-px w-8" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
          </div>
          <p className="mt-3 text-xs" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Kenangan manis yang kami abadikan
          </p>
        </motion.div>

        <div className="space-y-4">
          {moments.map((moment: any, idx: number) => (
            <motion.div
              key={moment.id || idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="overflow-hidden rounded-xl active:scale-[0.98] transition-transform duration-150"
              style={{
                background: colors.surface,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {moment.photo && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={moment.photo}
                    alt={moment.title || ""}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-4">
                {moment.title && (
                  <h3 className="mb-1 text-[16px] font-medium" style={{ color: colors.text }}>
                    {moment.title}
                  </h3>
                )}
                {moment.description && (
                  <p className="text-sm leading-relaxed" style={{ color: colors.muted, fontFamily: fonts.body }}>
                    {moment.description}
                  </p>
                )}
                {moment.date && (
                  <p className="mt-2 text-[10px]" style={{ color: colors.muted }}>
                    {new Date(moment.date).toLocaleDateString("id-ID", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
