"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import type { EventSectionProps } from "../../../types";

export function EventSection({ config, colors, fonts, event }: EventSectionProps) {
  return (
    <section
      className="relative w-full py-20 px-6"
      style={{
        background: colors.surface,
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
          <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: colors.secondary, fontFamily: fonts.body }}>
            Acara
          </p>
          <h2 className="text-3xl md:text-4xl font-light mb-3" style={{ color: colors.text }}>
            Pernikahan
          </h2>
          <div
            className="w-12 h-px mx-auto"
            style={{ background: colors.secondary }}
          />
        </motion.div>

        <motion.div
          className="mb-8 p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            borderLeft: `2px solid ${colors.secondary}`,
            background: colors.background,
          }}
        >
          <p className="text-sm tracking-[0.2em] uppercase mb-4" style={{ color: colors.secondary, fontFamily: fonts.body }}>
            Akad Nikah
          </p>
          <div className="flex items-center gap-3 mb-2">
            <Calendar size={16} color={colors.secondary} />
            <p className="text-sm" style={{ color: colors.text }}>
              {event.eventDate || "Sabtu, 12 Desember 2026"}
            </p>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <Clock size={16} color={colors.secondary} />
            <p className="text-sm" style={{ color: colors.muted, fontFamily: fonts.body }}>
              {event.akadTime || "09:00 - 11:00 WIB"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={16} color={colors.secondary} />
            <p className="text-sm" style={{ color: colors.muted, fontFamily: fonts.body }}>
              {event.venueName || "Gedung Serbaguna"}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mb-8 p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            borderLeft: `2px solid ${colors.secondary}`,
            background: colors.background,
          }}
        >
          <p className="text-sm tracking-[0.2em] uppercase mb-4" style={{ color: colors.secondary, fontFamily: fonts.body }}>
            Resepsi
          </p>
          <div className="flex items-center gap-3 mb-2">
            <Calendar size={16} color={colors.secondary} />
            <p className="text-sm" style={{ color: colors.text }}>
              {event.eventDate || "Sabtu, 12 Desember 2026"}
            </p>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <Clock size={16} color={colors.secondary} />
            <p className="text-sm" style={{ color: colors.muted, fontFamily: fonts.body }}>
              {event.receptionTime || "12:00 - Selesai WIB"}
            </p>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <MapPin size={16} color={colors.secondary} />
            <p className="text-sm" style={{ color: colors.muted, fontFamily: fonts.body }}>
              {event.eventLocation || event.venueAddress || "Gedung Serbaguna"}
            </p>
          </div>

          {event.googleMapsUrl && (
            <motion.a
              href={event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 text-xs tracking-wider cursor-pointer"
              style={{
                color: colors.text,
                border: `1px solid ${colors.secondary}`,
                background: "transparent",
                fontFamily: fonts.body,
              }}
              whileHover={{ scale: 1.04, background: colors.secondary, color: colors.background }}
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
