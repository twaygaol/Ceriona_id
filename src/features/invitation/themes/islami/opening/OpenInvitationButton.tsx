"use client";

import { motion } from "framer-motion";
import type { OpenButtonProps } from "../../../types";

const geometricBorder = {
  backgroundImage: `
    radial-gradient(circle at 2px 2px, rgba(212,168,75,0.15) 1px, transparent 1px),
    radial-gradient(circle at 50% 50%, rgba(27,94,32,0.06) 0px, transparent 4px)
  `,
  backgroundSize: "16px 16px, 32px 32px",
};

export function OpenInvitationButton({ onClick, config }: OpenButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative px-12 py-4 text-lg font-medium tracking-wider transition-all duration-300 cursor-pointer overflow-hidden"
      style={{
        color: config.colors.secondary,
        border: `2px solid ${config.colors.secondary}`,
        borderRadius: config.layout.borderRadius,
        fontFamily: config.fonts.body,
        background: `linear-gradient(135deg, ${config.colors.primary}, #0D3B10, ${config.colors.primary})`,
        boxShadow: `0 4px 25px rgba(27,94,32,0.4), 0 0 40px ${config.colors.secondary}22`,
      }}
      animate={{
        boxShadow: [
          `0 4px 25px rgba(27,94,32,0.4), 0 0 40px ${config.colors.secondary}22`,
          `0 4px 35px rgba(27,94,32,0.6), 0 0 60px ${config.colors.secondary}44`,
          `0 4px 25px rgba(27,94,32,0.4), 0 0 40px ${config.colors.secondary}22`,
        ],
      }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 opacity-30" style={geometricBorder} />
      <span className="relative z-10">Buka Undangan</span>
    </motion.button>
  );
}
