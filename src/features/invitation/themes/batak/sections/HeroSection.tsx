"use client";

import { motion } from "framer-motion";

const ulosOverlay = {
  backgroundImage: `
    linear-gradient(45deg, rgba(200,164,77,0.05) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(200,164,77,0.05) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(200,164,77,0.05) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(200,164,77,0.05) 75%)
  `,
  backgroundSize: "40px 40px",
};

export function HeroSection({ config, colors, fonts, invitation }: any) {
  const groomPhoto = invitation?.groomPhoto;
  const bridePhoto = invitation?.bridePhoto;
  const heroImage = invitation?.heroImage || groomPhoto || bridePhoto;
  const heroQuote = invitation?.heroQuote;

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-5 py-20"
      style={{
        background: `linear-gradient(180deg, ${colors.background}, ${colors.surface})`,
        fontFamily: fonts.heading,
      }}
    >
      <div className="absolute inset-0" style={ulosOverlay} />

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
        {/* Horas greeting */}
        <motion.p
          className="mb-4 text-xs uppercase tracking-[0.3em]"
          style={{ color: colors.accent, fontFamily: fonts.body }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Horas! Horas! Horas!
        </motion.p>

        {/* Gold diamond divider */}
        <motion.div
          className="mb-8 flex items-center justify-center gap-2"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
          <svg width="8" height="8" viewBox="0 0 8 8"><path d="M4 1L7 4L4 7L1 4Z" fill={colors.accent} opacity="0.7" /></svg>
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 1L9 5L5 9L1 5Z" fill={colors.accent} opacity="0.5" /></svg>
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1L11 6L6 11L1 6Z" fill={colors.accent} opacity="0.8" /></svg>
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 1L9 5L5 9L1 5Z" fill={colors.accent} opacity="0.5" /></svg>
          <svg width="8" height="8" viewBox="0 0 8 8"><path d="M4 1L7 4L4 7L1 4Z" fill={colors.accent} opacity="0.7" /></svg>
          <div className="h-px w-12" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
        </motion.div>

        {/* Main Photo */}
        {heroImage && (
          <motion.div
            className="mb-10 mx-auto w-full max-w-md overflow-hidden rounded-2xl"
            style={{
              border: `4px solid ${colors.accent}`,
              boxShadow: `0 10px 40px ${colors.accent}22`,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="aspect-[3/4] w-full">
              <img src={heroImage} alt="" className="h-full w-full object-cover" />
            </div>
          </motion.div>
        )}

        {/* Names */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-2" style={{ color: colors.text }}>
            {invitation?.groomName || "Groom"}
          </h1>
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="h-px w-8" style={{ background: colors.accent }} />
            <span className="text-2xl" style={{ color: colors.accent, fontFamily: fonts.quote }}>&amp;</span>
            <div className="h-px w-8" style={{ background: colors.accent }} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight" style={{ color: colors.text }}>
            {invitation?.brideName || "Bride"}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm italic" style={{ color: colors.accent, fontFamily: fonts.quote }}>
            Pasukan Raja &amp; Boru ni Raja
          </p>
        </motion.div>

        {/* Batak Quote */}
        {heroQuote && (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="mx-auto mb-3 flex items-center justify-center gap-2">
              <div className="h-px w-6" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
              <svg width="5" height="5" viewBox="0 0 5 5"><path d="M2.5 0L5 2.5L2.5 5L0 2.5Z" fill={colors.accent} opacity="0.4" /></svg>
              <div className="h-px w-6" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
            </div>
            <p className="px-4 text-sm italic leading-relaxed max-w-md mx-auto" style={{ color: colors.muted, fontFamily: fonts.quote }}>
              &ldquo;{heroQuote}&rdquo;
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
