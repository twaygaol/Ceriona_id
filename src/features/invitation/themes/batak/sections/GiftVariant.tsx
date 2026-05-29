"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { GiftVariantProps } from "../../../types";

export function GiftVariant({ config, colors, fonts, banks, onCopy }: GiftVariantProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    onCopy(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      className="relative w-full py-20 px-6"
      style={{ background: colors.background, fontFamily: fonts.heading }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Amplop decorative icon */}
          <div className="flex justify-center mb-4">
            <svg width="48" height="36" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="44" height="30" rx="2" stroke={colors.accent} strokeWidth="1.5" fill="none" />
              <path d="M2 4L24 20L46 4" stroke={colors.accent} strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: colors.text }}>
            Amplop Digital
          </h2>
          <div className="w-16 h-0.5 mx-auto" style={{ background: colors.accent }} />
          <p className="text-sm mt-4 max-w-md mx-auto" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Molo denggan basa ni rohami, boi do hamu mangalehon tanda holong tu hami
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(banks || []).map((bank, idx) => (
            <motion.div
              key={bank.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 text-center relative"
              style={{
                border: `1.5px solid ${colors.accent}44`,
                borderRadius: config.layout.borderRadius,
                background: colors.surface,
              }}
            >
              {/* Ulos pattern decorative border */}
              <div className="flex justify-center gap-0.5 mb-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-2 h-2" style={{ border: `1px solid ${colors.accent}44`, transform: "rotate(45deg)" }} />
                ))}
              </div>
              {bank.logo && (
                <img src={bank.logo} alt={bank.bank} className="h-8 mx-auto mb-3 object-contain" />
              )}
              <p className="text-sm tracking-wider mb-1" style={{ color: colors.accent, fontFamily: fonts.body }}>
                {bank.bank}
              </p>
              <p className="text-lg font-bold tracking-wider mb-1" style={{ color: colors.text }}>
                {bank.accountNumber}
              </p>
              <p className="text-sm mb-4" style={{ color: colors.muted, fontFamily: fonts.body }}>
                a.n. {bank.accountName}
              </p>
              <motion.button
                onClick={() => handleCopy(bank.accountNumber, bank.id)}
                className="px-5 py-2 text-xs tracking-wider cursor-pointer"
                style={{
                  color: copiedId === bank.id ? colors.background : colors.accent,
                  background: copiedId === bank.id ? colors.accent : "transparent",
                  border: `1px solid ${colors.accent}`,
                  borderRadius: config.layout.borderRadius,
                  fontFamily: fonts.body,
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {copiedId === bank.id ? "Tersalin!" : "Salin Nomor"}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
