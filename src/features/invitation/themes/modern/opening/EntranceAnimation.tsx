"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import type { EntranceProps } from "../../../types";

const items = [
  {
    content: (config: EntranceProps["config"]) => (
      <p
        className="text-xs tracking-[0.3em] uppercase"
        style={{ color: config.colors.muted, fontFamily: config.fonts.body }}
      >
        We're Getting Married
      </p>
    ),
  },
  {
    content: (config: EntranceProps["config"]) => (
      <div className="text-center" style={{ fontFamily: config.fonts.heading }}>
        <div
          className="w-12 h-px mx-auto mb-4"
          style={{ background: config.colors.secondary }}
        />
        <h2
          className="text-4xl md:text-6xl font-light tracking-wide"
          style={{ color: config.colors.text }}
        >
          Groom & Bride
        </h2>
      </div>
    ),
  },
  {
    content: (config: EntranceProps["config"]) => (
      <p
        className="text-sm tracking-wider"
        style={{ color: config.colors.muted, fontFamily: config.fonts.body }}
      >
        Sabtu, 12 Desember 2026
      </p>
    ),
  },
];

export function EntranceAnimation({ onComplete, config }: EntranceProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: config.colors.background }}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.3, duration: 0.5, ease: "easeOut" }}
        >
          {item.content(config)}
        </motion.div>
      ))}
    </div>
  );
}
