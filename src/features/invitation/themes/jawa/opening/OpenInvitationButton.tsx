"use client";

import { motion } from "framer-motion";
import type { OpenButtonProps } from "../../../types";

export function OpenInvitationButton({ onClick, config }: OpenButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative px-10 py-4 text-lg font-medium tracking-wider transition-all duration-300 cursor-pointer"
      style={{
        color: config.colors.surface,
        border: `2px solid ${config.colors.accent}`,
        borderRadius: config.layout.borderRadius,
        fontFamily: config.fonts.body,
        background: `linear-gradient(135deg, ${config.colors.primary}22, transparent, ${config.colors.primary}22)`,
        boxShadow: `0 0 20px ${config.colors.accent}33, inset 0 0 20px ${config.colors.accent}11`,
      }}
      whileHover={{ scale: 1.05, boxShadow: `0 0 35px ${config.colors.accent}55` }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">Bikak Undangan</span>
    </motion.button>
  );
}
