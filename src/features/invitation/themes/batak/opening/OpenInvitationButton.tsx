"use client";

import { motion } from "framer-motion";
import type { OpenButtonProps } from "../../../types";

export function OpenInvitationButton({ onClick, config }: OpenButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative h-12 w-full max-w-[240px] text-sm font-medium tracking-wider active:scale-[0.97] transition-transform duration-100"
      style={{
        color: config.colors.accent,
        border: `2px solid ${config.colors.accent}`,
        borderRadius: "14px",
        fontFamily: config.fonts.body,
        background: `linear-gradient(135deg, ${config.colors.secondary}CC, ${config.colors.background}, ${config.colors.secondary}CC)`,
        boxShadow: `0 0 20px ${config.colors.accent}33, inset 0 0 20px ${config.colors.accent}11`,
      }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">Bungka Undangan</span>
    </motion.button>
  );
}
