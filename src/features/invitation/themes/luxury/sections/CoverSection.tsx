"use client";

import { motion } from "framer-motion";
import type { CoverSectionProps } from "../../../types";

const sparkles = Array.from({ length: 16 }, (_, i) => ({
  id: i, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
  size: `${2 + Math.random() * 3}px`, delay: `${Math.random() * 5}s`, dur: `${2 + Math.random() * 3}s`,
}));

export function CoverSection({ config, colors, fonts, invitation, onEnter }: CoverSectionProps) {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20"
      style={{
        background: `linear-gradient(180deg, #0D0A08, ${colors.secondary}, #0D0A08)`,
        fontFamily: fonts.heading,
      }}
    >
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at center, ${colors.accent}06 0%, transparent 60%)`,
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${colors.accent.replace("#", "%23")}' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <svg className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] pointer-events-none" viewBox="0 0 500 700" fill="none">
        <rect x="1" y="1" width="498" height="698" rx="4" stroke={colors.accent} strokeWidth="1" opacity="0.3" />
        <rect x="8" y="8" width="484" height="684" rx="2" stroke={colors.accent} strokeWidth="0.4" opacity="0.15" />
        <path d="M1 20 L20 1" stroke={colors.accent} strokeWidth="1.5" opacity="0.4" />
        <path d="M480 1 L499 20" stroke={colors.accent} strokeWidth="1.5" opacity="0.4" />
        <path d="M1 680 L20 699" stroke={colors.accent} strokeWidth="1.5" opacity="0.4" />
        <path d="M480 699 L499 680" stroke={colors.accent} strokeWidth="1.5" opacity="0.4" />
        <circle cx="20" cy="20" r="2.5" fill={colors.accent} opacity="0.3" />
        <circle cx="480" cy="20" r="2.5" fill={colors.accent} opacity="0.3" />
        <circle cx="20" cy="680" r="2.5" fill={colors.accent} opacity="0.3" />
        <circle cx="480" cy="680" r="2.5" fill={colors.accent} opacity="0.3" />
        <path d="M20 1 L20 15" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" />
        <path d="M480 1 L480 15" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" />
        <path d="M20 685 L20 699" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" />
        <path d="M480 685 L480 699" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" />
        <path d="M1 20 L15 20" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" />
        <path d="M485 20 L499 20" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" />
        <path d="M1 680 L15 680" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" />
        <path d="M485 680 L499 680" stroke={colors.accent} strokeWidth="0.8" opacity="0.3" />
      </svg>

      <style>{`
        @keyframes shine-${colors.accent.replace("#", "")} {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 0.7; transform: scale(1); }
        }
      `}</style>
      {sparkles.map((sp) => (
        <div key={sp.id} className="absolute rounded-full pointer-events-none" style={{
          top: sp.top, left: sp.left, width: sp.size, height: sp.size,
          background: colors.accent,
          animation: `shine-${colors.accent.replace("#", "")} ${sp.dur} ${sp.delay} infinite`,
        }} />
      ))}

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 max-w-2xl text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: colors.accent, fontFamily: fonts.body }}>
          The Wedding of
        </p>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
          <svg width="8" height="8" viewBox="0 0 8 8" fill={colors.accent}><path d="M4 0L8 4L4 8L0 4Z" /></svg>
          <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-2" style={{ color: colors.text }}>
          {invitation?.groomName || "Groom"}
        </h1>
        <p className="text-xl tracking-widest my-2" style={{ color: colors.accent }}>&</p>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8" style={{ color: colors.text }}>
          {invitation?.brideName || "Bride"}
        </h1>

        <div className="w-24 h-0.5 mb-6" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />

        <p className="text-sm leading-relaxed max-w-md mb-10"
          style={{ color: colors.muted, fontFamily: fonts.body }}
        >
          Together with their families, we invite you to share in our joy
        </p>

        <motion.button
          onClick={onEnter}
          className="px-12 py-3.5 text-sm tracking-[0.25em] uppercase cursor-pointer"
          style={{
            color: "#0D0A08",
            background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary}, ${colors.muted})`,
            border: "none",
            borderRadius: config.layout.borderRadius,
            fontFamily: fonts.body,
            letterSpacing: "0.3em",
          }}
          whileHover={{ scale: 1.04, boxShadow: `0 0 30px ${colors.accent}66` }}
          whileTap={{ scale: 0.96 }}
        >
          Enter
        </motion.button>

        <motion.div
          className="absolute bottom-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] tracking-widest uppercase" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Scroll
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
