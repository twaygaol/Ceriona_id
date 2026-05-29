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
            Save The Date
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: colors.text }}>
            Wedding Event
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
            <svg width="8" height="8" viewBox="0 0 8 8" fill={colors.accent}><path d="M4 0L8 4L4 8L0 4Z" /></svg>
            <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
          </div>
        </motion.div>

        <motion.div
          className="mb-8 p-8 text-center relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            border: `2px solid ${colors.accent}44`,
            borderRadius: config.layout.borderRadius,
            background: colors.background,
          }}
        >
          <svg className="absolute top-3 left-3 w-4 h-4" viewBox="0 0 20 20" fill="none">
            <path d="M10 0L20 10L10 20L0 10Z" fill={colors.accent} opacity="0.15" />
          </svg>
          <svg className="absolute top-3 right-3 w-4 h-4" viewBox="0 0 20 20" fill="none">
            <path d="M10 0L20 10L10 20L0 10Z" fill={colors.accent} opacity="0.15" />
          </svg>
          <svg className="absolute bottom-3 left-3 w-4 h-4" viewBox="0 0 20 20" fill="none">
            <path d="M10 0L20 10L10 20L0 10Z" fill={colors.accent} opacity="0.15" />
          </svg>
          <svg className="absolute bottom-3 right-3 w-4 h-4" viewBox="0 0 20 20" fill="none">
            <path d="M10 0L20 10L10 20L0 10Z" fill={colors.accent} opacity="0.15" />
          </svg>

          <div className="flex items-center justify-center gap-2 mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5">
              <rect x="2" y="4" width="20" height="18" rx="2" />
              <path d="M8 2v4M16 2v4M2 10h20" />
            </svg>
            <p className="text-sm tracking-widest uppercase" style={{ color: colors.accent, fontFamily: fonts.body }}>
              Sacred Ceremony
            </p>
          </div>
          <div className="w-12 h-px mx-auto mb-4" style={{ background: colors.accent }} />

          <div className="flex items-center justify-center gap-2 mb-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <p className="text-base" style={{ color: colors.text }}>
              {event.eventDate || "Saturday, 12 December 2026"}
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
              {event.venueName || "Grand Ballroom"}
            </p>
          </div>
        </motion.div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex-1 h-px max-w-32" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1L11 6L6 11L1 6Z" stroke={colors.accent} strokeWidth="0.8" fill="none" opacity="0.6" />
            <path d="M6 3L9 6L6 9L3 6Z" fill={colors.accent} opacity="0.4" />
          </svg>
          <div className="flex-1 h-px max-w-32" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
        </div>

        <motion.div
          className="mb-8 p-8 text-center relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            border: `2px solid ${colors.accent}44`,
            borderRadius: config.layout.borderRadius,
            background: colors.background,
          }}
        >
          <svg className="absolute top-3 left-3 w-4 h-4" viewBox="0 0 20 20" fill="none">
            <path d="M10 0L20 10L10 20L0 10Z" fill={colors.accent} opacity="0.15" />
          </svg>
          <svg className="absolute top-3 right-3 w-4 h-4" viewBox="0 0 20 20" fill="none">
            <path d="M10 0L20 10L10 20L0 10Z" fill={colors.accent} opacity="0.15" />
          </svg>
          <svg className="absolute bottom-3 left-3 w-4 h-4" viewBox="0 0 20 20" fill="none">
            <path d="M10 0L20 10L10 20L0 10Z" fill={colors.accent} opacity="0.15" />
          </svg>
          <svg className="absolute bottom-3 right-3 w-4 h-4" viewBox="0 0 20 20" fill="none">
            <path d="M10 0L20 10L10 20L0 10Z" fill={colors.accent} opacity="0.15" />
          </svg>

          <div className="flex items-center justify-center gap-2 mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="text-sm tracking-widest uppercase" style={{ color: colors.accent, fontFamily: fonts.body }}>
              Wedding Reception
            </p>
          </div>
          <div className="w-12 h-px mx-auto mb-4" style={{ background: colors.accent }} />

          <div className="flex items-center justify-center gap-2 mb-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <p className="text-base" style={{ color: colors.text }}>
              {event.eventDate || "Saturday, 12 December 2026"}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <p className="text-sm" style={{ color: colors.muted, fontFamily: fonts.body }}>
              {event.receptionTime || "12:00 - Finish"}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="text-sm" style={{ color: colors.muted, fontFamily: fonts.body }}>
              {event.eventLocation || event.venueAddress || "Grand Venue"}
            </p>
          </div>

          {event.googleMapsUrl && (
            <motion.a
              href={event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 text-sm tracking-wider cursor-pointer"
              style={{
                color: "#0D0A08",
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
                border: "none",
                borderRadius: config.layout.borderRadius,
                fontFamily: fonts.body,
              }}
              whileHover={{ scale: 1.04, boxShadow: `0 0 20px ${colors.accent}44` }}
              whileTap={{ scale: 0.96 }}
            >
              View Map
            </motion.a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
