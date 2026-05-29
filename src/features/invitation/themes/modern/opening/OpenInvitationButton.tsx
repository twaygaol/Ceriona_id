"use client";

import { motion } from "framer-motion";
import type { OpenButtonProps } from "../../../types";

export function OpenInvitationButton({ onClick, config }: OpenButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative px-10 py-3 text-sm tracking-wider transition-all duration-300 cursor-pointer"
      style={{
        color: config.colors.text,
        border: `1px solid ${config.colors.secondary}`,
        background: "transparent",
        fontFamily: config.fonts.body,
      }}
      whileHover={{ scale: 1.04, background: config.colors.secondary, color: config.colors.background }}
      whileTap={{ scale: 0.96 }}
    >
      Open Invitation
    </motion.button>
  );
}
