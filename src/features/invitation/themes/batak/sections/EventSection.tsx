"use client";

import { motion } from "framer-motion";
import type { EventSectionProps } from "../../../types";

export function EventSection({ config, colors, fonts, event }: EventSectionProps) {
  return (
    <section
      className="relative w-full py-20 px-6"
      style={{
        background: `linear-gradient(180deg, ${colors.background}, ${colors.surface})`,
        fontFamily: fonts.heading,
      }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: colors.accent, fontFamily: fonts.body }}>
            Ulaon
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: colors.text }}>
            Acara Pernikahan
          </h2>
          <div className="w-16 h-0.5 mx-auto" style={{ background: colors.accent }} />
        </motion.div>

        {/* Akad Card */}
        <motion.div
          className="mb-8 p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            border: `2px solid ${colors.primary}66`,
            borderRadius: config.layout.borderRadius,
            background: colors.background,
          }}
        >
          {/* Gorga decorative header */}
          <svg className="mx-auto mb-3 w-24 h-6 opacity-60" viewBox="0 0 120 20" fill="none">
            <path d="M10 10 C20 2 30 2 40 10 C50 18 60 18 70 10 C80 2 90 2 100 10" stroke={colors.accent} strokeWidth="1" fill="none" />
          </svg>
          <p className="text-sm tracking-[0.3em] uppercase mb-4"
            style={{ color: colors.accent, fontFamily: fonts.body }}
          >
            Martumpol / Pemberkatan
          </p>
          <div className="w-12 h-px mx-auto mb-4" style={{ background: colors.accent }} />
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <p className="text-base" style={{ color: colors.text }}>
              {event.eventDate || "Sabtu, 12 Desember 2026"}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <p className="text-sm" style={{ color: colors.muted, fontFamily: fonts.body }}>
              {event.akadTime || "09:00 - 11:00 WIB"}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="text-sm" style={{ color: colors.muted, fontFamily: fonts.body }}>
              {event.venueName || "HKBP Resort ..."}
            </p>
          </div>
        </motion.div>

        {/* Ornamental divider with gorga motif */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex-1 h-px max-w-24" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
          <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
            <path d="M5 10 C10 2 15 2 20 10 C25 18 30 18 25 10" stroke={colors.accent} strokeWidth="1" fill="none" />
          </svg>
          <div className="flex-1 h-px max-w-24" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
        </div>

        {/* Resepsi Card */}
        <motion.div
          className="mb-8 p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            border: `2px solid ${colors.primary}66`,
            borderRadius: config.layout.borderRadius,
            background: colors.background,
          }}
        >
          <svg className="mx-auto mb-3 w-24 h-6 opacity-60" viewBox="0 0 120 20" fill="none">
            <path d="M10 10 C20 2 30 2 40 10 C50 18 60 18 70 10 C80 2 90 2 100 10" stroke={colors.accent} strokeWidth="1" fill="none" />
          </svg>
          <p className="text-sm tracking-[0.3em] uppercase mb-4"
            style={{ color: colors.accent, fontFamily: fonts.body }}
          >
            Pesta / Resepsi
          </p>
          <div className="w-12 h-px mx-auto mb-4" style={{ background: colors.accent }} />
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <p className="text-base" style={{ color: colors.text }}>
              {event.eventDate || "Sabtu, 12 Desember 2026"}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <p className="text-sm" style={{ color: colors.muted, fontFamily: fonts.body }}>
              {event.receptionTime || "12:00 - Selesai WIB"}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="text-sm" style={{ color: colors.muted, fontFamily: fonts.body }}>
              {event.eventLocation || event.venueAddress || "Gedung Serbaguna ..."}
            </p>
          </div>

          {event.googleMapsUrl && (
            <motion.a
              href={event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 text-sm tracking-wider cursor-pointer"
              style={{
                color: colors.text,
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                border: `1px solid ${colors.accent}`,
                borderRadius: config.layout.borderRadius,
                fontFamily: fonts.body,
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Lihat Google Maps
            </motion.a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
