"use client";

import { motion } from "framer-motion";
import type { InvitationTransitionProps } from "../../types";

const variants = {
  "fade": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  "slide-up": {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },
  "zoom": {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  },
};

export function InvitationTransition({ children, direction = "fade", duration = 0.5 }: InvitationTransitionProps) {
  const v = variants[direction];

  return (
    <motion.div
      initial={v.initial}
      animate={v.animate}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  );
}
