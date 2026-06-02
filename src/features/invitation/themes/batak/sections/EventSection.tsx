"use client";

import { motion } from "framer-motion";

function GorgaMini({ color }: { color: string }) {
  return (
    <svg className="mx-auto mb-4 w-32 h-6 opacity-60" viewBox="0 0 140 16" fill="none">
      <path d="M10 8 C25 2 35 2 50 8 C65 14 75 14 90 8 C105 2 115 2 130 8" stroke={color} strokeWidth="1.2" fill="none" />
      <circle cx="40" cy="8" r="2" fill={color} opacity="0.6" />
      <circle cx="70" cy="8" r="2.5" fill={color} opacity="0.8" />
      <circle cx="100" cy="8" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

function InfoRow({ icon, children, color }: { icon: React.ReactNode; children: React.ReactNode; color: string }) {
  return (
    <div className="mb-3 flex items-start justify-center gap-3">
      <span className="shrink-0 mt-0.5">{icon}</span>
      <span className="text-base leading-relaxed" style={{ color }}>{children}</span>
    </div>
  );
}

export function EventSection({ config, colors, fonts, event }: any) {
  return (
    <section
      className="relative w-full px-5 py-20"
      style={{
        background: `linear-gradient(180deg, ${colors.background}, ${colors.surface})`,
        fontFamily: fonts.heading,
      }}
    >
      <div className="mx-auto max-w-3xl">
        {/* Title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-xs uppercase tracking-[0.35em]" style={{ color: colors.accent, fontFamily: fonts.body }}>
            Ulaon
          </p>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: colors.text }}>
            Acara Pernikahan
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
            <svg width="8" height="8" viewBox="0 0 8 8"><path d="M4 0L8 4L4 8L0 4Z" fill={colors.accent} /></svg>
            <div className="h-px w-12" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
          </div>
        </motion.div>

        {/* Martumpol / Pemberkatan */}
        <motion.div
          className="mb-12 rounded-2xl border p-10 text-center"
          style={{ borderColor: `${colors.primary}55`, background: colors.background }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <GorgaMini color={colors.accent} />
          <p className="mb-5 text-lg uppercase tracking-[0.25em] font-medium" style={{ color: colors.accent, fontFamily: fonts.body }}>
            Martumpol / Pemberkatan
          </p>
          <div className="mx-auto mb-6 h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />

          <InfoRow icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>} color={colors.text}>
            {event?.eventDate || "Sabtu, 12 Desember 2026"}
          </InfoRow>
          <InfoRow icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>} color={colors.text}>
            {event?.akadTime || event?.eventTime || "09:00 - 11:00 WIB"}
          </InfoRow>
          <InfoRow icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>} color={colors.text}>
            {event?.venueName || "HKBP Resort ..."}
          </InfoRow>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="my-10 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="h-px flex-1 max-w-32" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
          <svg width="32" height="14" viewBox="0 0 32 14" fill="none">
            <path d="M4 7 C10 2 16 2 22 7 C28 12 32 12 28 7" stroke={colors.accent} strokeWidth="1" fill="none" opacity="0.6" />
          </svg>
          <div className="h-px flex-1 max-w-32" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
        </motion.div>

        {/* Pesta / Resepsi */}
        <motion.div
          className="rounded-2xl border p-10 text-center"
          style={{ borderColor: `${colors.primary}55`, background: colors.background }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GorgaMini color={colors.accent} />
          <p className="mb-5 text-lg uppercase tracking-[0.25em] font-medium" style={{ color: colors.accent, fontFamily: fonts.body }}>
            Pesta / Resepsi
          </p>
          <div className="mx-auto mb-6 h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />

          <InfoRow icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>} color={colors.text}>
            {event?.eventDate || "Sabtu, 12 Desember 2026"}
          </InfoRow>
          <InfoRow icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>} color={colors.text}>
            {event?.receptionTime || "12:00 - Selesai WIB"}
          </InfoRow>
          <InfoRow icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>} color={colors.text}>
            {event?.eventLocation || event?.venueAddress || "Gedung Serbaguna ..."}
          </InfoRow>

          {event?.googleMapsUrl && (
            <motion.a
              href={event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-xl px-8 text-base tracking-wider font-medium"
              style={{
                color: colors.text,
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                border: `1px solid ${colors.accent}`,
                fontFamily: fonts.body,
              }}
              whileTap={{ scale: 0.97 }}
            >
              Lihat Google Maps
            </motion.a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
