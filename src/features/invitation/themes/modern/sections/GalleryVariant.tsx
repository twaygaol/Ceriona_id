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
          <h2 className="text-3xl md:text-4xl font-light mb-3" style={{ color: colors.text }}>
            Galeri Foto
          </h2>
          <div
            className="w-12 h-px mx-auto"
            style={{ background: colors.secondary }}
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {(items || []).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative group cursor-pointer overflow-hidden"
              onClick={() => onImageClick?.(item)}
              style={{
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={item.thumbnail || item.url}
                alt={item.caption || "Gallery image"}
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                {item.caption && (
                  <p className="text-xs text-white" style={{ fontFamily: fonts.body }}>
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
