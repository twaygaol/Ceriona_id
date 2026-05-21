"use client";

import axios from "axios";
import { CheckCircle2, LoaderCircle, Send, Users, XCircle } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRSVPStore } from "@/store/useRSVPStore";

const rsvpSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  attending: z.enum(["yes", "no"], { error: "Pilih konfirmasi kehadiran" }),
  guestCount: z.number().min(1).max(5).optional(),
  session: z.enum(["akad", "reception", "both"]).optional(),
  menuPreference: z.enum(["regular", "vegetarian", "kids", "other"]).optional(),
  dietaryNote: z.string().max(200, "Maksimal 200 karakter").optional(),
  companionNames: z.string().max(300, "Maksimal 300 karakter").optional(),
  message: z.string().max(300, "Maksimal 300 karakter").optional(),
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

interface RSVPFormProps {
  invitationId: string;
}

export function RSVPForm({ invitationId }: RSVPFormProps) {
  const { addRSVP } = useRSVPStore();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attending: "yes",
      guestCount: 1,
      session: "both",
      menuPreference: "regular",
    },
  });

  const attending = useWatch({ control, name: "attending" });
  const fieldClass = "w-full rounded-2xl border border-gold/20 bg-white/85 px-4 py-3 text-sm text-brown outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/10";
  const labelClass = "mb-2 block text-sm font-medium text-brown";

  const onSubmit = async (data: RSVPFormData) => {
    try {
      const response = await axios.post(`/api/rsvp/${invitationId}`, data);
      addRSVP(response.data);

      toast.success(
        data.attending === "yes"
          ? "Terima kasih! Kami tunggu kehadiran Anda."
          : "Terima kasih atas konfirmasinya"
      );
      reset();
    } catch {
      toast.error("Gagal mengirim RSVP");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="rounded-[1.75rem] border border-gold/15 bg-gradient-to-br from-white/80 to-gold/10 p-5 text-center shadow-[0_20px_60px_-45px_rgba(74,55,40,0.55)] backdrop-blur-xl">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brown text-gold-light">
          <Users className="size-5" />
        </div>
        <p className="text-xs uppercase tracking-[0.28em] text-gold-dark">RSVP</p>
        <h4 className="mt-2 font-serif text-2xl text-brown">Konfirmasi Kehadiran</h4>
        <p className="mt-2 text-sm leading-6 text-brown-light">Bantu kami menyiapkan tempat terbaik untuk Anda.</p>
      </div>

      <div>
        <label className={labelClass}>
          Nama Lengkap <span className="text-gold">*</span>
        </label>
        <input
          {...register("name")}
          type="text"
          className={fieldClass}
          placeholder="Masukkan nama Anda"
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>
          Konfirmasi Kehadiran <span className="text-gold">*</span>
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className={`relative flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${attending === "yes" ? "border-gold bg-gold/10 shadow-lg shadow-gold/10" : "border-gold/15 bg-white/70 hover:border-gold/40"}`}>
            <input
              {...register("attending")}
              type="radio"
              value="yes"
              className="sr-only"
            />
            <CheckCircle2 className={`size-6 ${attending === "yes" ? "text-gold-dark" : "text-brown-light"}`} />
            <span>
              <span className="block font-medium text-brown">Hadir</span>
              <span className="text-xs text-brown-light">Saya akan datang</span>
            </span>
          </label>
          <label className={`relative flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${attending === "no" ? "border-red-300 bg-red-50 shadow-lg shadow-red-100" : "border-gold/15 bg-white/70 hover:border-gold/40"}`}>
            <input
              {...register("attending")}
              type="radio"
              value="no"
              className="sr-only"
            />
            <XCircle className={`size-6 ${attending === "no" ? "text-red-500" : "text-brown-light"}`} />
            <span>
              <span className="block font-medium text-brown">Tidak Hadir</span>
              <span className="text-xs text-brown-light">Kirim doa dari jauh</span>
            </span>
          </label>
        </div>
        {errors.attending && (
          <p className="text-xs text-red-500 mt-1">{errors.attending.message}</p>
        )}
      </div>

      {attending === "yes" && (
        <div className="space-y-5 rounded-[1.75rem] border border-gold/15 bg-white/65 p-5 shadow-inner shadow-gold/5 backdrop-blur-xl">
          <div>
            <label className={labelClass}>
              Sesi yang Dihadiri
            </label>
            <select {...register("session")} className={fieldClass}>
              <option value="both">Akad & Resepsi</option>
              <option value="akad">Akad saja</option>
              <option value="reception">Resepsi saja</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>
              Jumlah Tamu yang Hadir
            </label>
            <select
              {...register("guestCount", { valueAsNumber: true })}
              className={fieldClass}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} orang
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>
              Nama Pendamping
            </label>
            <input
              {...register("companionNames")}
              className={fieldClass}
              placeholder="Contoh: Istri/Suami, Anak, Keluarga"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Pilihan Menu
              </label>
              <select {...register("menuPreference")} className={fieldClass}>
                <option value="regular">Regular</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="kids">Kids Meal</option>
                <option value="other">Lainnya</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>
                Dietary / Alergi
              </label>
              <input
                {...register("dietaryNote")}
                className={fieldClass}
                placeholder="Contoh: alergi seafood"
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <label className={labelClass}>
          Ucapan & Doa
        </label>
        <textarea
          {...register("message")}
          rows={4}
          className={`${fieldClass} resize-none`}
          placeholder="Tuliskan ucapan dan doa untuk pengantin..."
        />
        {errors.message && (
          <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brown px-6 py-4 text-sm font-semibold text-gold-light shadow-[0_18px_45px_-25px_rgba(74,55,40,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-brown disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50"
      >
        {isSubmitting ? <LoaderCircle className="size-4 animate-spin" /> : <Send className="size-4 transition group-hover:translate-x-0.5" />}
        {isSubmitting ? "Mengirim..." : "Kirim Konfirmasi"}
      </button>
    </form>
  );
}
