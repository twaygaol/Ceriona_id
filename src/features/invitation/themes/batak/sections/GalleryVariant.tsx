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
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: colors.text }}>
            Galeri Foto
          </h2>
          <div className="w-16 h-0.5 mx-auto" style={{ background: colors.accent }} />
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
                border: `3px solid ${colors.primary}`,
                borderRadius: config.layout.borderRadius,
                overflow: "hidden",
              }}
            >
              {/* Ulos-pattern frame overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Corner rhombus decorations */}
                <svg className="absolute top-1 left-1 w-8 h-8" viewBox="0 0 30 30" fill="none">
                  <path d="M15 3 L24 15 L15 27 L6 15 Z" stroke={colors.accent} strokeWidth="1.5" fill="none" />
                  <line x1="15" y1="3" x2="15" y2="27" stroke={colors.accent} strokeWidth="0.5" opacity="0.5" />
                  <line x1="6" y1="15" x2="24" y2="15" stroke={colors.accent} strokeWidth="0.5" opacity="0.5" />
                </svg>
                <svg className="absolute top-1 right-1 w-8 h-8 scale-x-[-1]" viewBox="0 0 30 30" fill="none">
                  <path d="M15 3 L24 15 L15 27 L6 15 Z" stroke={colors.accent} strokeWidth="1.5" fill="none" />
                  <line x1="15" y1="3" x2="15" y2="27" stroke={colors.accent} strokeWidth="0.5" opacity="0.5" />
                  <line x1="6" y1="15" x2="24" y2="15" stroke={colors.accent} strokeWidth="0.5" opacity="0.5" />
                </svg>
                <svg className="absolute bottom-1 left-1 w-8 h-8 scale-y-[-1]" viewBox="0 0 30 30" fill="none">
                  <path d="M15 3 L24 15 L15 27 L6 15 Z" stroke={colors.accent} strokeWidth="1.5" fill="none" />
                  <line x1="15" y1="3" x2="15" y2="27" stroke={colors.accent} strokeWidth="0.5" opacity="0.5" />
                  <line x1="6" y1="15" x2="24" y2="15" stroke={colors.accent} strokeWidth="0.5" opacity="0.5" />
                </svg>
                <svg className="absolute bottom-1 right-1 w-8 h-8 scale-[-1]" viewBox="0 0 30 30" fill="none">
                  <path d="M15 3 L24 15 L15 27 L6 15 Z" stroke={colors.accent} strokeWidth="1.5" fill="none" />
                  <line x1="15" y1="3" x2="15" y2="27" stroke={colors.accent} strokeWidth="0.5" opacity="0.5" />
                  <line x1="6" y1="15" x2="24" y2="15" stroke={colors.accent} strokeWidth="0.5" opacity="0.5" />
                </svg>
              </div>

              <img
                src={item.thumbnail || item.url}
                alt={item.caption || "Gallery image"}
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                {item.caption && (
                  <p className="text-sm text-center px-4" style={{ color: colors.accent, fontFamily: fonts.body }}>
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
