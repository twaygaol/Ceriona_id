"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function GiftVariant({ config, colors, fonts, banks, onCopy }: any) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    onCopy(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      className="relative w-full px-5 py-20"
      style={{ background: `linear-gradient(180deg, ${colors.background}, ${colors.surface})`, fontFamily: fonts.heading }}
    >
      <div className="mx-auto max-w-3xl">
        {/* Title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 flex justify-center">
            <svg width="48" height="36" viewBox="0 0 48 36" fill="none">
              <rect x="2" y="3" width="44" height="30" rx="2" stroke={colors.accent} strokeWidth="2" fill="none" />
              <path d="M2 3L24 20L46 3" stroke={colors.accent} strokeWidth="2" fill="none" />
              <circle cx="24" cy="20" r="4" fill={colors.accent} opacity="0.15" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: colors.text }}>
            Amplop Digital
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
            <svg width="8" height="8" viewBox="0 0 8 8"><path d="M4 0L8 4L4 8L0 4Z" fill={colors.accent} /></svg>
            <div className="h-px w-12" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
          </div>
          <p className="mx-auto mt-4 max-w-md text-sm italic leading-relaxed" style={{ color: colors.muted, fontFamily: fonts.quote }}>
            &ldquo;Molo denggan basa ni rohami, boi do hamu mangalehon tanda holong tu hami&rdquo;
          </p>
        </motion.div>

        {/* Bank cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(banks || []).map((bank: any, idx: number) => (
            <motion.div
              key={bank.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="rounded-2xl border p-8 text-center"
              style={{
                borderColor: `${colors.accent}44`,
                background: colors.surface,
              }}
            >
              {bank.logo && (
                <img src={bank.logo} alt={bank.bank} className="mx-auto mb-3 h-8 object-contain" />
              )}
              <p className="mb-2 text-base tracking-wider font-medium" style={{ color: colors.accent, fontFamily: fonts.body }}>
                {bank.bank}
              </p>
              <p className="mb-2 text-xl font-bold tracking-wider" style={{ color: colors.text }}>
                {bank.accountNumber}
              </p>
              <p className="mb-6 text-sm" style={{ color: colors.muted, fontFamily: fonts.body }}>
                a.n. {bank.accountName}
              </p>

              {/* Copy button */}
              <button
                onClick={() => handleCopy(bank.accountNumber, bank.id)}
                className="inline-flex h-12 w-full items-center justify-center rounded-xl text-sm font-medium tracking-wider active:scale-[0.97] transition-transform duration-100"
                style={{
                  color: copiedId === bank.id ? colors.background : colors.accent,
                  background: copiedId === bank.id ? colors.accent : "transparent",
                  border: `2px solid ${colors.accent}`,
                  fontFamily: fonts.body,
                }}
              >
                {copiedId === bank.id ? "Tersalin!" : "Salin Nomor Rekening"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
