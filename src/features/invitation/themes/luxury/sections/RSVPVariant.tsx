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
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
              boxShadow: `0 0 30px ${colors.accent}44`,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.background} strokeWidth="2.5">
              <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>Thank You!</h3>
            <p className="text-sm" style={{ color: colors.muted, fontFamily: fonts.body }}>
              Your RSVP has been received. We look forward to celebrating with you.
            </p>
          </motion.div>
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
          <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: colors.accent, fontFamily: fonts.body }}>
            RSVP
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: colors.text }}>
            Will You Attend?
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
            <svg width="8" height="8" viewBox="0 0 8 8" fill={colors.accent}><path d="M4 0L8 4L4 8L0 4Z" /></svg>
            <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
          </div>
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
              Full Name
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
                border: `1.5px solid ${colors.accent}66`,
                borderRadius: config.layout.borderRadius,
                fontFamily: fonts.body,
              }}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-xs tracking-wider mb-1.5" style={{ color: colors.text, fontFamily: fonts.body }}>
              Attendance
            </label>
            <div className="flex gap-3">
              {(["hadir", "tidak hadir", "ragu"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setAttendance(opt)}
                  className="flex-1 py-2.5 text-xs tracking-wider transition-all cursor-pointer"
                  style={{
                    color: attendance === opt ? colors.background : colors.accent,
                    background: attendance === opt ? `linear-gradient(135deg, ${colors.accent}, ${colors.primary})` : "transparent",
                    border: `1.5px solid ${attendance === opt ? "transparent" : colors.accent}66`,
                    borderRadius: config.layout.borderRadius,
                    fontFamily: fonts.body,
                    letterSpacing: "0.1em",
                  }}
                >
                  {opt === "hadir" ? "Attend" : opt === "tidak hadir" ? "Not Attend" : "Unsure"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-wider mb-1.5" style={{ color: colors.text, fontFamily: fonts.body }}>
              Number of Guests
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
                border: `1.5px solid ${colors.accent}66`,
                borderRadius: config.layout.borderRadius,
                fontFamily: fonts.body,
              }}
            />
          </div>

          <div>
            <label className="block text-xs tracking-wider mb-1.5" style={{ color: colors.text, fontFamily: fonts.body }}>
              Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 text-sm outline-none resize-none transition-colors"
              style={{
                color: colors.text,
                background: colors.background,
                border: `1.5px solid ${colors.accent}66`,
                borderRadius: config.layout.borderRadius,
                fontFamily: fonts.body,
              }}
              placeholder="Write a message for the couple..."
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 text-sm tracking-[0.25em] uppercase cursor-pointer disabled:opacity-60"
            style={{
              color: "#0D0A08",
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary}, ${colors.muted})`,
              border: "none",
              borderRadius: config.layout.borderRadius,
              fontFamily: fonts.body,
              letterSpacing: "0.3em",
            }}
            whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${colors.accent}44` }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Sending..." : "Confirm"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
