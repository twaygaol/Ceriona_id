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
          <p className="text-sm mb-2" style={{ color: colors.secondary, fontFamily: fonts.quote, direction: "rtl" }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: colors.text }}>
            Akad & Resepsi
          </h2>
          <svg width="80" height="12" viewBox="0 0 80 12" className="mx-auto opacity-50">
            <path d="M0 6 Q20 0 40 6 Q60 12 80 6" stroke={colors.secondary} strokeWidth="1" fill="none" />
          </svg>
        </motion.div>

        {/* Akad Card */}
        <motion.div
          className="mb-8 p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            border: `1.5px solid ${colors.accent}44`,
            borderRadius: config.layout.borderRadius,
            background: colors.surface,
          }}
        >
          <p className="text-sm tracking-[0.3em] uppercase mb-4"
            style={{ color: colors.accent, fontFamily: fonts.body }}
          >
            Akad Nikah
          </p>
          <div className="w-12 h-px mx-auto mb-4" style={{ background: colors.accent }} />
          <p className="text-base mb-1" style={{ color: colors.text }}>
            {event.eventDate || "Sabtu, 12 September 2026"}
          </p>
          <p className="text-xs mb-3" style={{ color: colors.accent, fontFamily: fonts.quote }}>
            12 Rabiul Awal 1448 H
          </p>
          <p className="text-sm mb-1" style={{ color: colors.muted, fontFamily: fonts.body }}>
            {event.akadTime || "08:00 - 10:00 WIB"}
          </p>
          <p className="text-sm" style={{ color: colors.muted, fontFamily: fonts.body }}>
            {event.venueName || "Kediaman Mempelai Wanita"}
          </p>
        </motion.div>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex-1 h-px max-w-24" style={{ background: `linear-gradient(90deg, transparent, ${colors.secondary})` }} />
          <svg width="20" height="20" viewBox="0 0 20 20" className="opacity-50">
            <polygon points="10,2 12,8 18,8 13,12 15,18 10,14 5,18 7,12 2,8 8,8" fill={colors.secondary} />
          </svg>
          <div className="flex-1 h-px max-w-24" style={{ background: `linear-gradient(90deg, ${colors.secondary}, transparent)` }} />
        </div>

        {/* Resepsi Card */}
        <motion.div
          className="mb-8 p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            border: `1.5px solid ${colors.accent}44`,
            borderRadius: config.layout.borderRadius,
            background: colors.surface,
          }}
        >
          <p className="text-sm tracking-[0.3em] uppercase mb-4"
            style={{ color: colors.accent, fontFamily: fonts.body }}
          >
            Resepsi
          </p>
          <div className="w-12 h-px mx-auto mb-4" style={{ background: colors.accent }} />
          <p className="text-base mb-1" style={{ color: colors.text }}>
            {event.eventDate || "Sabtu, 12 September 2026"}
          </p>
          <p className="text-sm mb-1" style={{ color: colors.muted, fontFamily: fonts.body }}>
            {event.receptionTime || "10:00 - Selesai WIB"}
          </p>
          <p className="text-sm mb-4" style={{ color: colors.muted, fontFamily: fonts.body }}>
            {event.eventLocation || event.venueAddress || "Kediaman Mempelai Wanita"}
          </p>

          {event.googleMapsUrl && (
            <motion.a
              href={event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 text-sm tracking-wider cursor-pointer"
              style={{
                color: colors.surface,
                background: `linear-gradient(135deg, ${colors.primary}, #0D3B10)`,
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
