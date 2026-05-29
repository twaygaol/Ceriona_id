"use client";

import { motion } from "framer-motion";
import type { InvitationLoaderProps } from "../../types";

export function InvitationLoader({ message = "Memuat undangan..." }: InvitationLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F2]"
    >
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#C9A96E] border-t-transparent" />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-sm tracking-widest text-[#7A5C42] uppercase"
      >
        {message}
      </motion.p>
    </motion.div>
  );
}
