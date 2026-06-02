"use client";

import { motion } from "framer-motion";
import type { MomentSectionProps } from "../../../types";

export function MomentSection({ config, colors, fonts, moments }: MomentSectionProps) {
  if (!moments || moments.length === 0) return null;

  return (
    <section
      className="relative w-full py-20 px-6"
      style={{ background: colors.background, fontFamily: fonts.heading }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-3" style={{ color: colors.text }}>
            Momen Berharga
          </h2>
          <div className="w-12 h-px mx-auto" style={{ background: colors.secondary }} />
          <p className="mt-4 text-sm" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Kenangan manis yang kami abadikan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {moments.map((moment, idx) => (
            <motion.div
              key={moment.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group"
              style={{
                background: colors.surface,
                borderRadius: config.layout.borderRadius || "12px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {moment.photo && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={moment.photo}
                    alt={moment.title || "Moment photo"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                {moment.title && (
                  <h3 className="text-lg font-medium mb-1" style={{ color: colors.text }}>
                    {moment.title}
                  </h3>
                )}
                {moment.description && (
                  <p className="text-sm leading-relaxed" style={{ color: colors.muted, fontFamily: fonts.body }}>
                    {moment.description}
                  </p>
                )}
                {moment.date && (
                  <p className="mt-2 text-xs" style={{ color: colors.muted }}>
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
