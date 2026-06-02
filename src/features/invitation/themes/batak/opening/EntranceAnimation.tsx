"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import type { EntranceProps } from "../../../types";

export function EntranceAnimation({ onComplete, config }: EntranceProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${config.colors.background} 0%, #FFF5E8 50%, ${config.colors.background} 100%)`,
      }}
    >
      {/* Gorga Left - Slide In */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 0.8 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <svg width="150" height="400" viewBox="0 0 150 400">
          {/* Gorga Pattern Left */}
          <path
            d="M120,50 Q90,80 120,110 Q90,140 120,170 Q90,200 120,230 Q90,260 120,290 Q90,320 120,350"
            stroke={config.colors.primary}
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M100,50 Q80,80 100,110 Q80,140 100,170 Q80,200 100,230 Q80,260 100,290 Q80,320 100,350"
            stroke={config.colors.secondary}
            strokeWidth="2"
            fill="none"
            opacity="0.7"
          />
          {[70, 130, 190, 250, 310].map((y, i) => (
            <circle key={i} cx="120" cy={y} r="6" fill={config.colors.secondary} />
          ))}
        </svg>
      </motion.div>

      {/* Gorga Right - Slide In */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 0.8 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <svg width="150" height="400" viewBox="0 0 150 400">
          {/* Gorga Pattern Right */}
          <path
            d="M30,50 Q60,80 30,110 Q60,140 30,170 Q60,200 30,230 Q60,260 30,290 Q60,320 30,350"
            stroke={config.colors.primary}
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M50,50 Q70,80 50,110 Q70,140 50,170 Q70,200 50,230 Q70,260 50,290 Q70,320 50,350"
            stroke={config.colors.secondary}
            strokeWidth="2"
            fill="none"
            opacity="0.7"
          />
          {[70, 130, 190, 250, 310].map((y, i) => (
            <circle key={i} cx="30" cy={y} r="6" fill={config.colors.secondary} />
          ))}
        </svg>
      </motion.div>

      {/* Center Content */}
      <div className="relative z-10 text-center">
        {/* Top Ornament */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <svg width="200" height="60" viewBox="0 0 200 60">
            <path
              d="M100,10 Q80,25 100,40 Q120,25 100,10 Z"
              fill={config.colors.primary}
              opacity="0.9"
            />
            <path
              d="M100,40 Q90,48 100,55 Q110,48 100,40 Z"
              fill={config.colors.secondary}
              opacity="0.8"
            />
            <circle cx="100" cy="40" r="5" fill={config.colors.secondary} />
            <path
              d="M20,30 Q60,35 100,30 Q140,35 180,30"
              stroke={config.colors.secondary}
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{ fontFamily: config.fonts.heading }}
        >
          <h1
            className="mb-4 font-bold tracking-wide"
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              color: config.colors.primary,
              textShadow: "0 2px 20px rgba(122,0,25,0.15)",
            }}
          >
            Mempelai Pria
          </h1>

          <motion.div
            className="my-6 flex items-center justify-center gap-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            <div className="h-px w-16" style={{ backgroundColor: config.colors.secondary }} />
            <svg width="24" height="24" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="8" fill="none" stroke={config.colors.secondary} strokeWidth="2" />
              <circle cx="12" cy="12" r="3" fill={config.colors.secondary} />
            </svg>
            <div className="h-px w-16" style={{ backgroundColor: config.colors.secondary }} />
          </motion.div>

          <h1
            className="font-bold tracking-wide"
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              color: config.colors.primary,
              textShadow: "0 2px 20px rgba(122,0,25,0.15)",
            }}
          >
            Mempelai Wanita
          </h1>
        </motion.div>

        {/* Bottom Ornament */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <svg width="200" height="60" viewBox="0 0 200 60">
            <path
              d="M100,50 Q80,35 100,20 Q120,35 100,50 Z"
              fill={config.colors.primary}
              opacity="0.9"
            />
            <path
              d="M100,20 Q90,12 100,5 Q110,12 100,20 Z"
              fill={config.colors.secondary}
              opacity="0.8"
            />
            <circle cx="100" cy="20" r="5" fill={config.colors.secondary} />
            <path
              d="M20,30 Q60,25 100,30 Q140,25 180,30"
              stroke={config.colors.secondary}
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </motion.div>

        {/* Horas Text */}
        <motion.p
          className="mt-6 text-sm uppercase tracking-[0.3em]"
          style={{ color: config.colors.muted, fontFamily: config.fonts.body }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.6, delay: 2.2 }}
        >
          Horas
        </motion.p>
      </div>

      {/* Fade Out Effect */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.5 }}
      />
    </div>
  );
}
