"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { RSVPVariantProps } from "../../../types";

export function RSVPVariant({ config, colors, fonts, onSubmit }: RSVPVariantProps) {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"hadir" | "tidak hadir" | "ragu">("hadir");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ id: "", name, attendance, guestCount, message });
      setSuccess(true);
    } catch {
      // error handled by parent
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="w-full py-20 px-6" style={{ background: colors.surface, fontFamily: fonts.heading }}>
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ background: colors.accent }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.background} strokeWidth="2.5">
              <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>Mauliate!</h3>
          <p className="text-sm" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Terima kasih, konfirmasi kehadiran Anda telah kami terima
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative w-full py-20 px-6"
      style={{ background: colors.surface, fontFamily: fonts.heading }}
    >
      <div className="max-w-lg mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: colors.text }}>
            Konfirmasi Hadir
          </h2>
          <div className="w-16 h-0.5 mx-auto" style={{ background: colors.accent }} />
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <label className="block text-xs tracking-wider mb-1.5" style={{ color: colors.text, fontFamily: fonts.body }}>
              Nama Lengkap
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm outline-none transition-colors"
              style={{
                color: colors.text,
                background: colors.background,
                border: `1.5px solid ${colors.primary}66`,
                borderRadius: config.layout.borderRadius,
                fontFamily: fonts.body,
              }}
              placeholder="Masukkan nama Anda"
            />
          </div>

          <div>
            <label className="block text-xs tracking-wider mb-1.5" style={{ color: colors.text, fontFamily: fonts.body }}>
              Kehadiran
            </label>
            <div className="flex gap-3">
              {(["hadir", "tidak hadir", "ragu"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setAttendance(opt)}
                  className="flex-1 py-2.5 text-xs tracking-wider transition-all cursor-pointer"
                  style={{
                    color: attendance === opt ? colors.text : colors.muted,
                    background: attendance === opt ? colors.accent : colors.background,
                    border: `1.5px solid ${attendance === opt ? colors.accent : colors.primary}44`,
                    borderRadius: config.layout.borderRadius,
                    fontFamily: fonts.body,
                  }}
                >
                  {opt === "hadir" ? "Hadir" : opt === "tidak hadir" ? "Tidak" : "Ragu"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-wider mb-1.5" style={{ color: colors.text, fontFamily: fonts.body }}>
              Jumlah Tamu
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full px-4 py-3 text-sm outline-none transition-colors"
              style={{
                color: colors.text,
                background: colors.background,
                border: `1.5px solid ${colors.primary}66`,
                borderRadius: config.layout.borderRadius,
                fontFamily: fonts.body,
              }}
            />
          </div>

          <div>
            <label className="block text-xs tracking-wider mb-1.5" style={{ color: colors.text, fontFamily: fonts.body }}>
              Pesan (opsional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 text-sm outline-none resize-none transition-colors"
              style={{
                color: colors.text,
                background: colors.background,
                border: `1.5px solid ${colors.primary}66`,
                borderRadius: config.layout.borderRadius,
                fontFamily: fonts.body,
              }}
              placeholder="Tulis pesan untuk mempelai..."
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 text-sm tracking-wider cursor-pointer disabled:opacity-60"
            style={{
              color: colors.text,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              border: `1.5px solid ${colors.accent}`,
              borderRadius: config.layout.borderRadius,
              fontFamily: fonts.body,
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Mengirim..." : "Kirim Konfirmasi"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
