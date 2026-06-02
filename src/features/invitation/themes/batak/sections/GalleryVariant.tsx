"use client";

import { motion } from "framer-motion";

export function GalleryVariant({ config, colors, fonts, items, onImageClick }: any) {
  return (
    <section
      className="relative w-full px-5 py-20"
      style={{ background: colors.surface, fontFamily: fonts.heading }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-xs uppercase tracking-[0.35em]" style={{ color: colors.accent, fontFamily: fonts.body }}>
            Pameran Gombungi
          </p>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: colors.text }}>
            Galeri Foto
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
            <svg width="8" height="8" viewBox="0 0 8 8"><path d="M4 0L8 4L4 8L0 4Z" fill={colors.accent} /></svg>
            <div className="h-px w-12" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
          </div>
        </motion.div>

        {/* Grid: 2 columns mobile, 3 columns tablet, 4 columns desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(items || []).map((item: any, idx: number) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.3) }}
              className="overflow-hidden rounded-xl active:scale-95 transition-transform duration-150"
              style={{
                border: `3px solid ${colors.primary}`,
              }}
              onClick={() => onImageClick?.(item)}
            >
              <img
                src={item.thumbnail || item.url}
                alt={item.caption || ""}
                className="aspect-square w-full object-cover"
                loading="lazy"
              />

              {/* Caption overlay */}
              {item.caption && (
                <div
                  className="px-3 py-2 text-center"
                  style={{ background: colors.primary }}
                >
                  <span className="text-xs leading-tight" style={{ color: colors.accent, fontFamily: fonts.body }}>
                    {item.caption}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
