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
            border: `1.5px solid ${colors.accent}33`,
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
            {event.eventDate || "Minggu, 12 Maret 2026"}
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
          <div className="flex-1 h-px max-w-24" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
          <span className="text-lg" style={{ color: colors.accent }}>◈</span>
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
            border: `1.5px solid ${colors.accent}33`,
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
            {event.eventDate || "Minggu, 12 Maret 2026"}
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
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
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
