"use client";

import { motion } from "framer-motion";
import type { OpeningScreenProps } from "../../../types";
import { OpenInvitationButton } from "./OpenInvitationButton";

const ulosDiamondPattern = {
  backgroundImage: `
    linear-gradient(45deg, rgba(212,168,75,0.08) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(212,168,75,0.08) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(212,168,75,0.08) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(212,168,75,0.08) 75%)
  `,
  backgroundSize: "80px 80px",
  backgroundPosition: "0 0, 0 40px, 40px -40px, -40px 0px",
};

export function OpeningScreen({ onOpen, config }: OpeningScreenProps) {
  return (
    <div
      className="relative w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #1A0A0A, ${config.colors.secondary}, #0D0505)`,
        fontFamily: config.fonts.heading,
      }}
    >
      <div className="absolute inset-0" style={ulosDiamondPattern} />

      {/* Ulos-inspired geometric border pattern */}
      <div className="absolute inset-6 pointer-events-none">
        <div className="w-full h-full border" style={{ borderColor: `${config.colors.accent}22`, borderRadius: "4px" }} />
        <div className="absolute top-2 left-2 right-2 bottom-2 border" style={{ borderColor: `${config.colors.accent}11` }} />
      </div>

      {/* Gorga-inspired corner ornaments */}
      <svg className="absolute top-0 left-0 w-32 h-32 opacity-30" viewBox="0 0 100 100" fill="none">
        <path d="M5 50 C5 20 25 5 50 5 C70 5 85 15 90 30" stroke={config.colors.accent} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M50 15 L70 50 L50 85 L30 50 Z" stroke={config.colors.accent} strokeWidth="1" fill="none" />
        <line x1="50" y1="15" x2="50" y2="85" stroke={config.colors.accent} strokeWidth="0.6" opacity="0.5" />
        <line x1="30" y1="50" x2="70" y2="50" stroke={config.colors.accent} strokeWidth="0.6" opacity="0.5" />
      </svg>
      <svg className="absolute top-0 right-0 w-32 h-32 opacity-30 scale-x-[-1]" viewBox="0 0 100 100" fill="none">
        <path d="M5 50 C5 20 25 5 50 5 C70 5 85 15 90 30" stroke={config.colors.accent} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M50 15 L70 50 L50 85 L30 50 Z" stroke={config.colors.accent} strokeWidth="1" fill="none" />
        <line x1="50" y1="15" x2="50" y2="85" stroke={config.colors.accent} strokeWidth="0.6" opacity="0.5" />
        <line x1="30" y1="50" x2="70" y2="50" stroke={config.colors.accent} strokeWidth="0.6" opacity="0.5" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-32 h-32 opacity-30 scale-y-[-1]" viewBox="0 0 100 100" fill="none">
        <path d="M5 50 C5 20 25 5 50 5 C70 5 85 15 90 30" stroke={config.colors.accent} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M50 15 L70 50 L50 85 L30 50 Z" stroke={config.colors.accent} strokeWidth="1" fill="none" />
        <line x1="50" y1="15" x2="50" y2="85" stroke={config.colors.accent} strokeWidth="0.6" opacity="0.5" />
        <line x1="30" y1="50" x2="70" y2="50" stroke={config.colors.accent} strokeWidth="0.6" opacity="0.5" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-32 h-32 opacity-30 scale-[-1]" viewBox="0 0 100 100" fill="none">
        <path d="M5 50 C5 20 25 5 50 5 C70 5 85 15 90 30" stroke={config.colors.accent} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M50 15 L70 50 L50 85 L30 50 Z" stroke={config.colors.accent} strokeWidth="1" fill="none" />
        <line x1="50" y1="15" x2="50" y2="85" stroke={config.colors.accent} strokeWidth="0.6" opacity="0.5" />
        <line x1="30" y1="50" x2="70" y2="50" stroke={config.colors.accent} strokeWidth="0.6" opacity="0.5" />
      </svg>

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <p
          className="text-sm tracking-[0.3em] uppercase mb-6"
          style={{ color: config.colors.accent, fontFamily: config.fonts.body }}
        >
          Dongan Tu Ulaon
        </p>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, transparent, ${config.colors.accent})` }} />
          <span className="text-xl" style={{ color: config.colors.accent }}>ᯎ</span>
          <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, ${config.colors.accent}, transparent)` }} />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-wide mb-2"
          style={{ color: config.colors.surface }}
        >
          Undangan
        </h1>

        <p className="text-base md:text-lg mt-6 mb-10 leading-relaxed max-w-md"
          style={{ color: config.colors.muted, fontFamily: config.fonts.body }}
        >
          Marhahom ma rohami, ro do hami tu langkanami.
        </p>

        <OpenInvitationButton onClick={onOpen} config={config} />
      </motion.div>
    </div>
  );
}
