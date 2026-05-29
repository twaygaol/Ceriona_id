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
          <div className="flex justify-center mb-4">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="4" y="10" width="40" height="34" rx="2" stroke={colors.accent} strokeWidth="1.5" fill="none" />
              <path d="M4 20h40" stroke={colors.accent} strokeWidth="1.5" />
              <path d="M24 10V44" stroke={colors.accent} strokeWidth="1" opacity="0.5" />
              <path d="M24 10C24 10 16 4 10 8C4 12 6 18 12 20" stroke={colors.accent} strokeWidth="1.5" fill="none" />
              <path d="M24 10C24 10 32 4 38 8C44 12 42 18 36 20" stroke={colors.accent} strokeWidth="1.5" fill="none" />
              <path d="M12 20L12 44" stroke={colors.accent} strokeWidth="1" opacity="0.3" />
              <path d="M36 20L36 44" stroke={colors.accent} strokeWidth="1" opacity="0.3" />
              <path d="M18 20L18 44" stroke={colors.accent} strokeWidth="0.5" opacity="0.2" />
              <path d="M30 20L30 44" stroke={colors.accent} strokeWidth="0.5" opacity="0.2" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: colors.text }}>
            Wedding Gift
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
            <svg width="8" height="8" viewBox="0 0 8 8" fill={colors.accent}><path d="M4 0L8 4L4 8L0 4Z" /></svg>
            <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
          </div>
          <p className="text-sm mt-4 max-w-md mx-auto" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Your presence is the greatest gift. If you wish to give a gift in another form, we humbly welcome it
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
                border: `2px solid ${colors.accent}44`,
                borderRadius: config.layout.borderRadius,
                background: colors.surface,
              }}
            >
              <svg className="absolute top-2 left-2 w-4 h-4" viewBox="0 0 20 20" fill="none">
                <path d="M10 0L20 10L10 20L0 10Z" fill={colors.accent} opacity="0.15" />
              </svg>
              <svg className="absolute top-2 right-2 w-4 h-4" viewBox="0 0 20 20" fill="none">
                <path d="M10 0L20 10L10 20L0 10Z" fill={colors.accent} opacity="0.15" />
              </svg>
              <svg className="absolute bottom-2 left-2 w-4 h-4" viewBox="0 0 20 20" fill="none">
                <path d="M10 0L20 10L10 20L0 10Z" fill={colors.accent} opacity="0.15" />
              </svg>
              <svg className="absolute bottom-2 right-2 w-4 h-4" viewBox="0 0 20 20" fill="none">
                <path d="M10 0L20 10L10 20L0 10Z" fill={colors.accent} opacity="0.15" />
              </svg>

              <div className="flex justify-center gap-0.5 mb-4">
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
                className="px-6 py-2 text-xs tracking-wider cursor-pointer"
                style={{
                  color: copiedId === bank.id ? colors.background : colors.accent,
                  background: copiedId === bank.id ? colors.accent : "transparent",
                  border: `1.5px solid ${colors.accent}`,
                  borderRadius: config.layout.borderRadius,
                  fontFamily: fonts.body,
                  letterSpacing: "0.15em",
                }}
                whileHover={{ scale: 1.04, boxShadow: `0 0 15px ${colors.accent}33` }}
                whileTap={{ scale: 0.96 }}
              >
                {copiedId === bank.id ? "Copied!" : "Copy"}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
