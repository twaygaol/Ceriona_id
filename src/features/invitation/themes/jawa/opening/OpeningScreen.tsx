"use client";

import { motion } from "framer-motion";
import type { OpeningScreenProps } from "../../../types";
import { OpenInvitationButton } from "./OpenInvitationButton";

const diamondPattern = {
  backgroundImage: `
    linear-gradient(45deg, rgba(212,168,75,0.08) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(212,168,75,0.08) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(212,168,75,0.08) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(212,168,75,0.08) 75%)
  `,
  backgroundSize: "60px 60px",
  backgroundPosition: "0 0, 0 30px, 30px -30px, -30px 0px",
};

export function OpeningScreen({ onOpen, config }: OpeningScreenProps) {
  return (
    <div
      className="relative w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #2C1810, ${config.colors.secondary}, #2C1810)`,
        fontFamily: config.fonts.heading,
      }}
    >
      <div className="absolute inset-0" style={diamondPattern} />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-40 h-40 border-t-4 border-l-4 opacity-40"
        style={{ borderColor: config.colors.accent, borderRadius: "0 0 100% 0" }}
      />
      <div className="absolute top-0 right-0 w-40 h-40 border-t-4 border-r-4 opacity-40"
        style={{ borderColor: config.colors.accent, borderRadius: "0 0 0 100%" }}
      />
      <div className="absolute bottom-0 left-0 w-40 h-40 border-b-4 border-l-4 opacity-40"
        style={{ borderColor: config.colors.accent, borderRadius: "0 100% 0 0" }}
      />
      <div className="absolute bottom-0 right-0 w-40 h-40 border-b-4 border-r-4 opacity-40"
        style={{ borderColor: config.colors.accent, borderRadius: "100% 0 0 0" }}
      />

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
          Wilujeng Sumping
        </p>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, transparent, ${config.colors.accent})` }} />
          <span className="text-2xl" style={{ color: config.colors.accent }}>✦</span>
          <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, ${config.colors.accent}, transparent)` }} />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-wide mb-2"
          style={{ color: config.colors.surface }}
        >
          Pengantin
        </h1>

        <p className="text-base md:text-lg mt-6 mb-10 leading-relaxed max-w-md"
          style={{ color: config.colors.muted, fontFamily: config.fonts.body }}
        >
          Dengan memohon ridho Allah, kami bermaksud menyelenggarakan acara pernikahan
        </p>

        <OpenInvitationButton onClick={onOpen} config={config} />
      </motion.div>
    </div>
  );
}
