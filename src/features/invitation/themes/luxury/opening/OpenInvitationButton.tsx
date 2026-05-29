"use client";

import { motion } from "framer-motion";
import type { OpenButtonProps } from "../../../types";

export function OpenInvitationButton({ onClick, config }: OpenButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative px-12 py-4 text-base font-medium tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer"
      style={{
        color: "#0D0A08",
        background: `linear-gradient(135deg, ${config.colors.accent}, ${config.colors.primary}, ${config.colors.muted})`,
        border: "none",
        borderRadius: config.layout.borderRadius,
        fontFamily: config.fonts.body,
        letterSpacing: "0.3em",
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 0 40px ${config.colors.accent}88, 0 0 80px ${config.colors.primary}44`,
      }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">Open Invitation</span>
    </motion.button>
  );
}
