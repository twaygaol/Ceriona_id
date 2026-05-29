"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import type { EntranceProps } from "../../../types";

export function EntranceAnimation({ onComplete, config }: EntranceProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: `linear-gradient(135deg, #1A0A0A, ${config.colors.secondary}, #0D0505)` }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.4, duration: 0.6, ease: "easeOut" }}
          className="absolute"
        >
          {i === 0 && (
            <svg width="200" height="200" viewBox="0 0 140 140" fill="none" className="opacity-30">
              <path d="M70 15 L105 70 L70 125 L35 70 Z" stroke={config.colors.accent} strokeWidth="1.5" fill="none" />
              <path d="M70 30 L92 70 L70 110 L48 70 Z" stroke={config.colors.accent} strokeWidth="1" fill="none" />
              <line x1="70" y1="15" x2="70" y2="125" stroke={config.colors.accent} strokeWidth="0.8" opacity="0.5" />
              <line x1="35" y1="70" x2="105" y2="70" stroke={config.colors.accent} strokeWidth="0.8" opacity="0.5" />
            </svg>
          )}
          {i === 1 && (
            <div
              className="w-80 h-80 border border-opacity-20"
              style={{
                borderColor: config.colors.accent,
                transform: "rotate(45deg)",
              }}
            />
          )}
          {i === 2 && (
            <div className="text-center" style={{ fontFamily: config.fonts.heading }}>
              <p className="text-lg tracking-widest uppercase" style={{ color: config.colors.accent }}>
                Dongan Tu Ulaon
              </p>
              <div className="w-20 h-0.5 mx-auto mt-3" style={{ background: config.colors.accent }} />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
