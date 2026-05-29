"use client";

import { motion } from "framer-motion";
import type { OpeningScreenProps } from "../../../types";
import { OpenInvitationButton } from "./OpenInvitationButton";

const sparklePositions = [
  { top: "10%", left: "8%", delay: "0s", size: "4px" },
  { top: "20%", right: "12%", delay: "0.3s", size: "3px" },
  { top: "50%", left: "5%", delay: "0.7s", size: "5px" },
  { top: "60%", right: "8%", delay: "1.1s", size: "3px" },
  { top: "80%", left: "10%", delay: "0.5s", size: "4px" },
  { top: "15%", right: "18%", delay: "0.9s", size: "2px" },
  { top: "40%", left: "15%", delay: "1.3s", size: "3px" },
  { top: "70%", right: "15%", delay: "0.2s", size: "4px" },
  { top: "85%", left: "20%", delay: "0.8s", size: "3px" },
  { top: "30%", right: "6%", delay: "0.6s", size: "5px" },
  { top: "90%", right: "20%", delay: "1.0s", size: "2px" },
  { top: "5%", left: "50%", delay: "1.5s", size: "3px" },
  { top: "75%", left: "50%", delay: "0.4s", size: "4px" },
  { top: "45%", right: "25%", delay: "1.2s", size: "3px" },
  { top: "25%", left: "30%", delay: "0.1s", size: "2px" },
  { top: "55%", left: "35%", delay: "0.8s", size: "4px" },
];

export function OpeningScreen({ onOpen, config }: OpeningScreenProps) {
  return (
    <div
      className="relative w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(160deg, #0D0A08, ${config.colors.secondary}, #0D0A08)`,
        fontFamily: config.fonts.heading,
      }}
    >
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at center, ${config.colors.accent}08 0%, transparent 70%)`,
      }} />

      {sparklePositions.map((sp, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: sp.top,
            left: sp.left,
            right: sp.right,
            width: sp.size,
            height: sp.size,
            background: config.colors.accent,
            boxShadow: `0 0 ${parseInt(sp.size) * 2}px ${config.colors.accent}`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0.5, 1, 0], scale: [0, 1, 0.6, 1, 0] }}
          transition={{ delay: parseFloat(sp.delay), duration: 2 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <svg
        className="absolute inset-6 pointer-events-none"
        style={{ width: "calc(100% - 3rem)", height: "calc(100% - 3rem)", margin: "1.5rem" }}
        viewBox="0 0 500 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="2" width="496" height="696" rx="4" stroke={config.colors.accent} strokeWidth="1.5" opacity="0.5" />
        <rect x="10" y="10" width="480" height="680" rx="2" stroke={config.colors.accent} strokeWidth="0.5" opacity="0.3" />
        <path d="M2 30 L40 2" stroke={config.colors.accent} strokeWidth="1.5" opacity="0.6" />
        <path d="M498 30 L460 2" stroke={config.colors.accent} strokeWidth="1.5" opacity="0.6" />
        <path d="M2 670 L40 698" stroke={config.colors.accent} strokeWidth="1.5" opacity="0.6" />
        <path d="M498 670 L460 698" stroke={config.colors.accent} strokeWidth="1.5" opacity="0.6" />
        <circle cx="30" cy="30" r="3" fill={config.colors.accent} opacity="0.4" />
        <circle cx="470" cy="30" r="3" fill={config.colors.accent} opacity="0.4" />
        <circle cx="30" cy="670" r="3" fill={config.colors.accent} opacity="0.4" />
        <circle cx="470" cy="670" r="3" fill={config.colors.accent} opacity="0.4" />
        <path d="M30 2 L30 20" stroke={config.colors.accent} strokeWidth="1" opacity="0.4" />
        <path d="M470 2 L470 20" stroke={config.colors.accent} strokeWidth="1" opacity="0.4" />
        <path d="M30 680 L30 698" stroke={config.colors.accent} strokeWidth="1" opacity="0.4" />
        <path d="M470 680 L470 698" stroke={config.colors.accent} strokeWidth="1" opacity="0.4" />
        <path d="M2 30 L20 30" stroke={config.colors.accent} strokeWidth="1" opacity="0.4" />
        <path d="M480 30 L498 30" stroke={config.colors.accent} strokeWidth="1" opacity="0.4" />
        <path d="M2 670 L20 670" stroke={config.colors.accent} strokeWidth="1" opacity="0.4" />
        <path d="M480 670 L498 670" stroke={config.colors.accent} strokeWidth="1" opacity="0.4" />
      </svg>

      <motion.div
        className="relative z-10 flex flex-col items-center px-8 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <p
          className="text-sm tracking-[0.35em] uppercase mb-6"
          style={{ color: config.colors.accent, fontFamily: config.fonts.body }}
        >
          The Wedding of
        </p>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-px" style={{ background: `linear-gradient(90deg, transparent, ${config.colors.accent})` }} />
          <svg width="10" height="10" viewBox="0 0 10 10" fill={config.colors.accent}>
            <path d="M5 0L10 5L5 10L0 5Z" />
          </svg>
          <div className="w-20 h-px" style={{ background: `linear-gradient(90deg, ${config.colors.accent}, transparent)` }} />
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide leading-tight mb-2"
          style={{ color: config.colors.text }}
        >
          Groom
        </h1>
        <p className="text-2xl md:text-3xl tracking-widest my-3" style={{ color: config.colors.accent }}>
          &
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide leading-tight mb-8"
          style={{ color: config.colors.text }}
        >
          Bride
        </h1>

        <div className="w-24 h-0.5 mb-6" style={{ background: `linear-gradient(90deg, transparent, ${config.colors.accent}, transparent)` }} />

        <p className="text-sm md:text-base leading-relaxed max-w-md mb-10"
          style={{ color: config.colors.muted, fontFamily: config.fonts.body }}
        >
          Together with their families, we invite you to celebrate our wedding day
        </p>

        <OpenInvitationButton onClick={onOpen} config={config} />
      </motion.div>
    </div>
  );
}
