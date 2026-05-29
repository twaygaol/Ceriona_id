"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import type { EntranceProps } from "../../../types";

const sparkles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  top: `${10 + Math.random() * 80}%`,
  left: `${5 + Math.random() * 90}%`,
  size: `${2 + Math.random() * 4}px`,
  delay: Math.random() * 0.8,
}));

export function EntranceAnimation({ onComplete, config }: EntranceProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: `linear-gradient(160deg, #0D0A08, ${config.colors.secondary}, #0D0A08)` }}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 700" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.rect
          x="20" y="20" width="460" height="660" rx="4"
          stroke={config.colors.accent} strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.rect
          x="40" y="40" width="420" height="620" rx="2"
          stroke={config.colors.accent} strokeWidth="0.5" opacity="0.3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.circle cx="60" cy="60" r="4" fill={config.colors.accent} opacity="0.5"
          initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0] }} transition={{ delay: 1.2, duration: 0.6 }}
        />
        <motion.circle cx="440" cy="60" r="4" fill={config.colors.accent} opacity="0.5"
          initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0] }} transition={{ delay: 1.2, duration: 0.6 }}
        />
        <motion.circle cx="60" cy="640" r="4" fill={config.colors.accent} opacity="0.5"
          initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0] }} transition={{ delay: 1.2, duration: 0.6 }}
        />
        <motion.circle cx="440" cy="640" r="4" fill={config.colors.accent} opacity="0.5"
          initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0] }} transition={{ delay: 1.2, duration: 0.6 }}
        />
        <motion.path d="M60 20 L60 50" stroke={config.colors.accent} strokeWidth="1" opacity="0.4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5, duration: 0.4 }}
        />
        <motion.path d="M440 20 L440 50" stroke={config.colors.accent} strokeWidth="1" opacity="0.4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5, duration: 0.4 }}
        />
        <motion.path d="M60 650 L60 680" stroke={config.colors.accent} strokeWidth="1" opacity="0.4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5, duration: 0.4 }}
        />
        <motion.path d="M440 650 L440 680" stroke={config.colors.accent} strokeWidth="1" opacity="0.4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5, duration: 0.4 }}
        />
        <motion.path d="M20 60 L50 60" stroke={config.colors.accent} strokeWidth="1" opacity="0.4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5, duration: 0.4 }}
        />
        <motion.path d="M450 60 L480 60" stroke={config.colors.accent} strokeWidth="1" opacity="0.4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5, duration: 0.4 }}
        />
        <motion.path d="M20 640 L50 640" stroke={config.colors.accent} strokeWidth="1" opacity="0.4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5, duration: 0.4 }}
        />
        <motion.path d="M450 640 L480 640" stroke={config.colors.accent} strokeWidth="1" opacity="0.4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5, duration: 0.4 }}
        />
      </svg>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
      >
        <p className="text-sm tracking-[0.35em] uppercase" style={{ color: config.colors.accent, fontFamily: config.fonts.body }}>
          The Wedding of
        </p>
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center mt-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
        style={{ fontFamily: config.fonts.heading }}
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-wide" style={{ color: config.colors.text }}>
          Groom
        </h1>
        <p className="text-xl tracking-widest my-2" style={{ color: config.colors.accent }}>&</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-wide" style={{ color: config.colors.text }}>
          Bride
        </h1>
      </motion.div>

      {sparkles.map((sp) => (
        <motion.div
          key={sp.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: sp.top,
            left: sp.left,
            width: sp.size,
            height: sp.size,
            background: config.colors.accent,
            boxShadow: `0 0 ${parseInt(sp.size) * 3}px ${config.colors.accent}`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0.6, 1, 0], scale: [0, 1, 0.5, 1, 0] }}
          transition={{ delay: 2.2 + sp.id * 0.12, duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
