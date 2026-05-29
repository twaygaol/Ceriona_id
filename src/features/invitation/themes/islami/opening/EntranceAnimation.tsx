"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { EntranceProps } from "../../../types";

const phases = [
  {
    content: (colors: any) => (
      <div className="relative">
        <svg width="280" height="280" viewBox="0 0 280 280" className="opacity-40">
          <polygon
            points="140,20 180,100 260,100 200,155 220,240 140,190 60,240 80,155 20,100 100,100"
            fill="none"
            stroke={colors.secondary}
            strokeWidth="1.5"
          />
          <circle cx="140" cy="140" r="50" fill="none" stroke={colors.secondary} strokeWidth="0.8" opacity="0.4" />
          <circle cx="140" cy="140" r="80" fill="none" stroke={colors.secondary} strokeWidth="0.5" opacity="0.25" />
          <polygon
            points="140,40 168,98 232,98 183,137 202,200 140,163 78,200 97,137 48,98 112,98"
            fill="none"
            stroke={colors.accent}
            strokeWidth="0.6"
            opacity="0.3"
          />
        </svg>
      </div>
    ),
  },
  {
    content: (colors: any, fonts: any) => (
      <div className="text-center" style={{ fontFamily: fonts.quote }}>
        <p className="text-5xl md:text-7xl leading-relaxed" style={{ color: colors.surface, direction: "rtl" }}>
          ﷽
        </p>
        <p className="text-lg md:text-xl mt-6 leading-relaxed" style={{ color: colors.secondary, direction: "rtl" }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </p>
      </div>
    ),
  },
  {
    content: (colors: any, fonts: any) => (
      <div className="text-center" style={{ fontFamily: fonts.heading }}>
        <div
          className="w-16 h-px mx-auto mb-6"
          style={{ background: `linear-gradient(90deg, transparent, ${colors.secondary}, transparent)` }}
        />
        <p className="text-3xl md:text-5xl font-bold tracking-wide" style={{ color: colors.surface }}>
          Assalamu&apos;alaikum
        </p>
        <p className="text-base mt-4 tracking-wider" style={{ color: colors.secondary, fontFamily: fonts.body }}>
          Warahmatullahi Wabarakatuh
        </p>
      </div>
    ),
  },
];

export function EntranceAnimation({ onComplete, config }: EntranceProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (phase >= phases.length) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setPhase((p) => p + 1), 900);
    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #0A2E0D, ${config.colors.primary}, #0A2E0D)`,
      }}
    >
      <AnimatePresence mode="wait">
        {phase < phases.length && (
          <motion.div
            key={phase}
            initial={{ opacity: 0, scale: 0.8, rotate: phase === 0 ? -10 : 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.1, rotate: phase === 2 ? 5 : 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            {phases[phase].content(config.colors, config.fonts)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
