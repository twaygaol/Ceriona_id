"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function RSVPVariant({ config, colors, fonts, onSubmit }: any) {
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
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="w-full px-5 py-24" style={{ background: colors.surface, fontFamily: fonts.heading }}>
        <div className="mx-auto max-w-md text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.background} strokeWidth="2.5">
              <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          <h3 className="mb-3 text-3xl font-bold" style={{ color: colors.text }}>Mauliate!</h3>
          <div className="mx-auto mb-5 h-px w-16" style={{ background: colors.accent }} />
          <p className="mb-4 text-base leading-relaxed" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Terima kasih, konfirmasi kehadiran Anda telah kami terima. Tuhan memberkati.
          </p>
          <p className="text-sm italic" style={{ color: colors.accent, fontFamily: fonts.quote }}>
            &ldquo;Sai horas ma di hamu&rdquo;
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative w-full px-5 py-20"
      style={{ background: colors.surface, fontFamily: fonts.heading }}
    >
      <div className="mx-auto max-w-2xl">
        {/* Title */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-xs uppercase tracking-[0.35em]" style={{ color: colors.accent, fontFamily: fonts.body }}>
            Surat Tona
          </p>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: colors.text }}>
            Konfirmasi Hadir
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
            <svg width="8" height="8" viewBox="0 0 8 8"><path d="M4 0L8 4L4 8L0 4Z" fill={colors.accent} /></svg>
            <div className="h-px w-12" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {/* Nama */}
          <div>
            <label className="mb-2 block text-sm tracking-wider font-medium" style={{ color: colors.text, fontFamily: fonts.body }}>
              Goar / Nama Lengkap
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-12 w-full rounded-xl px-4 text-base outline-none"
              style={{
                color: colors.text,
                background: colors.background,
                border: `2px solid ${colors.primary}55`,
                fontFamily: fonts.body,
              }}
              placeholder="Masukkan goar / nama Anda"
            />
          </div>

          {/* Kehadiran */}
          <div>
            <label className="mb-2 block text-sm tracking-wider font-medium" style={{ color: colors.text, fontFamily: fonts.body }}>
              Haroroan / Kehadiran
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["hadir", "tidak hadir", "ragu"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setAttendance(opt)}
                  className="h-12 rounded-xl text-sm font-medium tracking-wider active:scale-[0.97] transition-transform duration-100"
                  style={{
                    color: attendance === opt ? colors.background : colors.muted,
                    background: attendance === opt
                      ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                      : colors.background,
                    border: `2px solid ${attendance === opt ? colors.accent : colors.primary}44`,
                    fontFamily: fonts.body,
                  }}
                >
                  {opt === "hadir" ? "Hadir" : opt === "tidak hadir" ? "Tidak" : "Ragu"}
                </button>
              ))}
            </div>
          </div>

          {/* Jumlah Tamu */}
          <div>
            <label className="mb-2 block text-sm tracking-wider font-medium" style={{ color: colors.text, fontFamily: fonts.body }}>
              Jumlah Tamu
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="h-12 w-full rounded-xl px-4 text-base outline-none"
              style={{
                color: colors.text,
                background: colors.background,
                border: `2px solid ${colors.primary}55`,
                fontFamily: fonts.body,
              }}
            />
          </div>

          {/* Pesan */}
          <div>
            <label className="mb-2 block text-sm tracking-wider font-medium" style={{ color: colors.text, fontFamily: fonts.body }}>
              Hata / Pesan <span className="opacity-50">(tinting)</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full rounded-xl px-4 py-3 text-base outline-none resize-none"
              style={{
                color: colors.text,
                background: colors.background,
                border: `2px solid ${colors.primary}55`,
                fontFamily: fonts.body,
              }}
              placeholder="Tulis hata / pesan untuk mempelai..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="h-14 w-full rounded-xl text-base font-medium tracking-wider active:scale-[0.97] transition-transform duration-100 disabled:opacity-60"
            style={{
              color: colors.text,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              border: `2px solid ${colors.accent}`,
              fontFamily: fonts.body,
            }}
          >
            {loading ? "Mengirim..." : "Kirim Surat Tona"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
