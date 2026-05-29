"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { SendHorizonal } from "lucide-react";

interface RSVPSectionProps {
  invitation: any;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    accent: string;
    muted: string;
  };
  fonts: { heading: string; body: string; quote: string };
  layout: {
    borderRadius: string;
    maxWidth: string;
    spacing: string;
    buttonStyle: string;
    containerStyle: string;
  };
}

export default function RSVPSection({
  invitation,
  colors,
  fonts,
  layout,
}: RSVPSectionProps) {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"hadir" | "tidak hadir" | "">("");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !attendance) return;
    setLoading(true);
    try {
      await axios.post("/api/rsvp", {
        invitationId: invitation?.id,
        name,
        attendance,
        guestCount,
        message,
      });
      toast.success("Konfirmasi kehadiran berhasil dikirim");
      setName("");
      setAttendance("");
      setGuestCount(1);
      setMessage("");
    } catch {
      toast.error("Gagal mengirim konfirmasi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative px-6 py-20 md:px-12"
      style={{ backgroundColor: colors.background }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: layout.maxWidth }}
      >
        <h2
          className="mb-12 text-center text-3xl font-light tracking-wide md:text-4xl"
          style={{ fontFamily: fonts.heading, color: colors.text }}
        >
          Konfirmasi Kehadiran
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-lg space-y-6"
          style={{
            backgroundColor: colors.surface,
            borderRadius: layout.borderRadius,
            padding: layout.spacing,
          }}
        >
          <div>
            <label
              className="mb-1 block text-sm"
              style={{ fontFamily: fonts.body, color: colors.text }}
            >
              Nama
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border px-4 py-2 outline-none transition-colors focus:ring-2"
              style={{
                fontFamily: fonts.body,
                color: colors.text,
                backgroundColor: colors.background,
                borderColor: colors.muted,
                borderRadius: layout.borderRadius,
                "--tw-ring-color": colors.primary,
              } as React.CSSProperties}
            />
          </div>

          <div>
            <label
              className="mb-1 block text-sm"
              style={{ fontFamily: fonts.body, color: colors.text }}
            >
              Kehadiran
            </label>
            <select
              value={attendance}
              onChange={(e) =>
                setAttendance(e.target.value as "hadir" | "tidak hadir")
              }
              required
              className="w-full border px-4 py-2 outline-none transition-colors focus:ring-2"
              style={{
                fontFamily: fonts.body,
                color: colors.text,
                backgroundColor: colors.background,
                borderColor: colors.muted,
                borderRadius: layout.borderRadius,
                "--tw-ring-color": colors.primary,
              } as React.CSSProperties}
            >
              <option value="">Pilih kehadiran</option>
              <option value="hadir">Hadir</option>
              <option value="tidak hadir">Tidak Hadir</option>
            </select>
          </div>

          <div>
            <label
              className="mb-1 block text-sm"
              style={{ fontFamily: fonts.body, color: colors.text }}
            >
              Jumlah Tamu
            </label>
            <input
              type="number"
              min={1}
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full border px-4 py-2 outline-none transition-colors focus:ring-2"
              style={{
                fontFamily: fonts.body,
                color: colors.text,
                backgroundColor: colors.background,
                borderColor: colors.muted,
                borderRadius: layout.borderRadius,
                "--tw-ring-color": colors.primary,
              } as React.CSSProperties}
            />
          </div>

          <div>
            <label
              className="mb-1 block text-sm"
              style={{ fontFamily: fonts.body, color: colors.text }}
            >
              Pesan (opsional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full border px-4 py-2 outline-none transition-colors focus:ring-2"
              style={{
                fontFamily: fonts.body,
                color: colors.text,
                backgroundColor: colors.background,
                borderColor: colors.muted,
                borderRadius: layout.borderRadius,
                "--tw-ring-color": colors.primary,
                resize: "vertical",
              } as React.CSSProperties}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !name || !attendance}
            className={`flex w-full items-center justify-center gap-2 px-6 py-3 text-sm font-medium uppercase tracking-wider transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 ${
              layout.buttonStyle === "pill"
                ? "rounded-full"
                : layout.buttonStyle === "rounded"
                  ? "rounded-lg"
                  : "rounded-md"
            }`}
            style={{
              backgroundColor: colors.primary,
              color: colors.surface,
            }}
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <SendHorizonal size={16} />
                Kirim
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export { RSVPSection };
