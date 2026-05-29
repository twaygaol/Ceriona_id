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
          <h2 className="text-3xl md:text-4xl font-light mb-3" style={{ color: colors.text }}>
            Amplop Digital
          </h2>
          <div
            className="w-12 h-px mx-auto mb-6"
            style={{ background: colors.secondary }}
          />
          <p className="text-sm max-w-md mx-auto" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Doa restu Anda adalah hadiah terindah. Jika ingin memberikan tanda kasih, berikut info rekening kami
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
              className="p-6"
              style={{
                borderLeft: `2px solid ${colors.secondary}`,
                background: colors.surface,
              }}
            >
              {bank.logo && (
                <img src={bank.logo} alt={bank.bank} className="h-6 mb-4 object-contain" />
              )}
              <p className="text-xs tracking-wider mb-1" style={{ color: colors.secondary, fontFamily: fonts.body }}>
                {bank.bank}
              </p>
              <p className="text-lg font-light tracking-wider mb-1" style={{ color: colors.text }}>
                {bank.accountNumber}
              </p>
              <p className="text-sm mb-4" style={{ color: colors.muted, fontFamily: fonts.body }}>
                a.n. {bank.accountName}
              </p>
              <motion.button
                onClick={() => handleCopy(bank.accountNumber, bank.id)}
                className="px-5 py-2 text-xs tracking-wider cursor-pointer"
                style={{
                  color: copiedId === bank.id ? colors.background : colors.secondary,
                  background: copiedId === bank.id ? colors.secondary : "transparent",
                  border: `1px solid ${colors.secondary}`,
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
