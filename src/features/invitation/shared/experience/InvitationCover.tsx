"use client";

import { motion } from "framer-motion";
import type { InvitationCoverProps } from "../../types";

export function InvitationCover({ theme, onComplete, invitation }: InvitationCoverProps) {
  const OpeningScreen = theme.OpeningScreen;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50"
    >
      <OpeningScreen
        onOpen={onComplete}
        config={theme.config}
      />
    </motion.div>
  );
}
