"use client";

import { motion } from "framer-motion";
import type { OpeningScreenProps } from "../../../types";
import { OpenInvitationButton } from "./OpenInvitationButton";

export function OpeningScreen({ onOpen, config }: OpeningScreenProps) {
  return (
    <div
      className="relative w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: config.colors.background,
        fontFamily: config.fonts.heading,
      }}
    >
      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <p
          className="text-xs tracking-[0.3em] uppercase mb-6"
          style={{ color: config.colors.muted, fontFamily: config.fonts.body }}
        >
          We're Getting Married
        </p>

        <div
          className="w-12 h-px mb-6"
          style={{ background: config.colors.secondary }}
        />

        <h1 className="text-5xl md:text-7xl font-light tracking-wide mb-2"
          style={{ color: config.colors.text }}
        >
          Undangan
        </h1>

        <p
          className="text-sm tracking-wider mt-6 mb-10"
          style={{ color: config.colors.muted, fontFamily: config.fonts.body }}
        >
          Sabtu, 12 Desember 2026
        </p>

        <OpenInvitationButton onClick={onOpen} config={config} />
      </motion.div>
    </div>
  );
}
