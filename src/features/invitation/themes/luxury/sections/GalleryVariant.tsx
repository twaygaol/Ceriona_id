"use client";

import { motion } from "framer-motion";
import type { GalleryVariantProps } from "../../../types";

export function GalleryVariant({ config, colors, fonts, items, onImageClick }: GalleryVariantProps) {
  return (
    <section
      className="relative w-full py-20 px-6"
      style={{ background: colors.surface, fontFamily: fonts.heading }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: colors.accent, fontFamily: fonts.body }}>
            Moments
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: colors.text }}>
            Our Gallery
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
            <svg width="8" height="8" viewBox="0 0 8 8" fill={colors.accent}><path d="M4 0L8 4L4 8L0 4Z" /></svg>
            <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {(items || []).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative group cursor-pointer"
              onClick={() => onImageClick?.(item)}
              style={{
                border: `2.5px solid ${colors.accent}`,
                borderRadius: config.layout.borderRadius,
                overflow: "hidden",
                boxShadow: `0 0 15px ${colors.accent}22`,
              }}
            >
              <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="absolute top-1 left-1 w-6 h-6" viewBox="0 0 30 30" fill="none">
                  <path d="M4 4 L15 4 L15 15 L4 15 Z" stroke={colors.text} strokeWidth="0.8" fill="none" />
                  <circle cx="9.5" cy="9.5" r="2" fill={colors.text} opacity="0.5" />
                </svg>
                <svg className="absolute top-1 right-1 w-6 h-6" viewBox="0 0 30 30" fill="none">
                  <path d="M15 4 L26 4 L26 15 L15 15 Z" stroke={colors.text} strokeWidth="0.8" fill="none" />
                  <circle cx="20.5" cy="9.5" r="2" fill={colors.text} opacity="0.5" />
                </svg>
                <svg className="absolute bottom-1 left-1 w-6 h-6" viewBox="0 0 30 30" fill="none">
                  <path d="M4 15 L15 15 L15 26 L4 26 Z" stroke={colors.text} strokeWidth="0.8" fill="none" />
                  <circle cx="9.5" cy="20.5" r="2" fill={colors.text} opacity="0.5" />
                </svg>
                <svg className="absolute bottom-1 right-1 w-6 h-6" viewBox="0 0 30 30" fill="none">
                  <path d="M15 15 L26 15 L26 26 L15 26 Z" stroke={colors.text} strokeWidth="0.8" fill="none" />
                  <circle cx="20.5" cy="20.5" r="2" fill={colors.text} opacity="0.5" />
                </svg>
              </div>

              <img
                src={item.thumbnail || item.url}
                alt={item.caption || "Gallery image"}
                className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                {item.caption && (
                  <p className="text-xs text-left" style={{ color: colors.text, fontFamily: fonts.body }}>
                    {item.caption}
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
