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
                border: `3px solid ${colors.accent}`,
                borderRadius: config.layout.borderRadius,
                overflow: "hidden",
              }}
            >
              {/* Corner ornaments */}
              <div className="absolute -top-0.5 -left-0.5 w-6 h-6 border-t-2 border-l-2 z-10"
                style={{ borderColor: colors.accent }}
              />
              <div className="absolute -top-0.5 -right-0.5 w-6 h-6 border-t-2 border-r-2 z-10"
                style={{ borderColor: colors.accent }}
              />
              <div className="absolute -bottom-0.5 -left-0.5 w-6 h-6 border-b-2 border-l-2 z-10"
                style={{ borderColor: colors.accent }}
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 border-b-2 border-r-2 z-10"
                style={{ borderColor: colors.accent }}
              />

              <img
                src={item.thumbnail || item.url}
                alt={item.caption || "Gallery image"}
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {item.caption && (
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs text-white text-center" style={{ fontFamily: fonts.body }}>
                    {item.caption}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
