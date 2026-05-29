"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import type { EntranceProps } from "../../../types";

export function EntranceAnimation({ onComplete, config }: EntranceProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: `linear-gradient(135deg, #2C1810, ${config.colors.secondary}, #2C1810)` }}
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
            <div
              className="w-64 h-64 border-2 border-opacity-30 rounded-full"
              style={{ borderColor: config.colors.accent }}
            />
          )}
          {i === 1 && (
            <div
              className="w-96 h-96 border border-opacity-20"
              style={{
                borderColor: config.colors.accent,
                transform: "rotate(45deg)",
              }}
            />
          )}
          {i === 2 && (
            <div className="text-center" style={{ fontFamily: config.fonts.heading }}>
              <p className="text-lg tracking-widest uppercase" style={{ color: config.colors.accent }}>
                Wilujeng Sumping
              </p>
              <div className="w-20 h-0.5 mx-auto mt-3" style={{ background: config.colors.accent }} />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
