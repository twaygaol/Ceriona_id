"use client";

import { motion } from "framer-motion";
import type { OpeningScreenProps } from "../../../types";
import { OpenInvitationButton } from "./OpenInvitationButton";

const ulosPattern = {
  backgroundImage: `
    repeating-linear-gradient(
      0deg,
      rgba(200,164,77,0.03) 0px,
      rgba(200,164,77,0.03) 2px,
      transparent 2px,
      transparent 12px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(122,0,25,0.02) 0px,
      rgba(122,0,25,0.02) 2px,
      transparent 2px,
      transparent 12px
    )
  `,
};

export function OpeningScreen({ onOpen, config }: OpeningScreenProps) {
  return (
    <div
      className="relative flex h-screen w-screen items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${config.colors.background} 0%, #FFF5E8 50%, ${config.colors.background} 100%)`,
        fontFamily: config.fonts.heading,
        paddingTop: "env(safe-area-inset-top, 0px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="absolute inset-0" style={ulosPattern} />

      {/* Gorga Top */}
      <motion.div
        className="absolute left-1/2 top-6 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <svg width="240" height="40" viewBox="0 0 240 40">
          <path d="M120,8 Q100,20 120,32 Q140,20 120,8 Z" fill={config.colors.primary} opacity="0.9" />
          <path d="M120,32 Q110,38 120,40 Q130,38 120,32 Z" fill={config.colors.secondary} opacity="0.8" />
          <circle cx="120" cy="32" r="4" fill={config.colors.secondary} />
          <path d="M30,24 Q70,28 120,24 Q170,28 210,24" stroke={config.colors.secondary} strokeWidth="1.5" fill="none" />
          <circle cx="60" cy="25" r="3" fill={config.colors.secondary} opacity="0.6" />
          <circle cx="180" cy="25" r="3" fill={config.colors.secondary} opacity="0.6" />
        </svg>
      </motion.div>

      {/* Gorga Bottom */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <svg width="240" height="40" viewBox="0 0 240 40">
          <path d="M120,32 Q100,20 120,8 Q140,20 120,32 Z" fill={config.colors.primary} opacity="0.9" />
          <path d="M120,8 Q110,2 120,0 Q130,2 120,8 Z" fill={config.colors.secondary} opacity="0.8" />
          <circle cx="120" cy="8" r="4" fill={config.colors.secondary} />
          <path d="M30,16 Q70,12 120,16 Q170,12 210,16" stroke={config.colors.secondary} strokeWidth="1.5" fill="none" />
        </svg>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex w-full max-w-xs flex-col items-center px-6 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.p
          className="mb-3 text-xs uppercase tracking-[0.25em]"
          style={{ color: config.colors.primary, fontFamily: config.fonts.body }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Undangan Pernikahan
        </motion.p>

        <motion.div
          className="mb-5 flex items-center gap-2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="h-px w-8" style={{ background: `linear-gradient(90deg, transparent, ${config.colors.secondary})` }} />
          <svg width="14" height="14" viewBox="0 0 14 14">
            <circle cx="7" cy="7" r="4" fill="none" stroke={config.colors.secondary} strokeWidth="1.2" />
            <circle cx="7" cy="7" r="1.5" fill={config.colors.secondary} />
          </svg>
          <div className="h-px w-8" style={{ background: `linear-gradient(90deg, ${config.colors.secondary}, transparent)` }} />
        </motion.div>

        <motion.h1
          className="mb-2 font-bold leading-tight tracking-wide"
          style={{
            fontSize: "clamp(1.75rem, 7vw, 2.5rem)",
            color: config.colors.primary,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Mempelai Pria
          <br />
          <span style={{ fontSize: "clamp(1.25rem, 5vw, 1.75rem)", color: config.colors.secondary }}>&amp;</span>
          <br />
          Mempelai Wanita
        </motion.h1>

        <motion.p
          className="mb-6 mt-3 text-sm leading-relaxed"
          style={{ color: config.colors.muted, fontFamily: config.fonts.body }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <em>&ldquo;Marhahom ma rohami, ro do hami tu langkanami&rdquo;</em>
        </motion.p>

        <motion.div
          className="mb-8 w-full rounded-xl border px-5 py-3"
          style={{
            borderColor: config.colors.secondary,
            backgroundColor: `${config.colors.surface}CC`,
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <p className="mb-0.5 text-[10px] uppercase tracking-wider" style={{ color: config.colors.muted }}>
            Kepada Yth.
          </p>
          <p className="text-base font-semibold" style={{ color: config.colors.primary }}>
            Bapak/Ibu/Saudara/i
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <OpenInvitationButton onClick={onOpen} config={config} />
        </motion.div>

        <motion.p
          className="mt-6 text-[10px] uppercase tracking-widest"
          style={{ color: config.colors.muted, opacity: 0.5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.6 }}
        >
          Horas
        </motion.p>
      </motion.div>

      {/* Gold particles - lightweight */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            left: `${10 + (i * 9) % 80}%`,
            top: `${10 + (i * 13) % 80}%`,
            backgroundColor: config.colors.secondary,
            opacity: 0.15,
          }}
          animate={{ y: [0, -15, 0], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8 + (i % 5), repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </div>
  );
}
