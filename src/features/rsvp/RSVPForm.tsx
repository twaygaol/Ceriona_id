"use client";

import { useForm } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRSVPStore } from "@/store/useRSVPStore";

const rsvpSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  attending: z.enum(["yes", "no"], { error: "Pilih konfirmasi kehadiran" }),
  guestCount: z.number().min(1).max(5).optional(),
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
    },
  });

  const attending = useWatch({ control, name: "attending" });

  const onSubmit = async (data: RSVPFormData) => {
    // Simulasi API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const submittedAt = new Date();
    
    addRSVP({
      id: submittedAt.getTime().toString(),
      invitationId,
      name: data.name,
      attending: data.attending,
      guestCount: data.guestCount || 1,
      message: data.message || "",
      createdAt: submittedAt,
    });
    
    toast.success(
      data.attending === "yes" 
        ? "Terima kasih! Kami tunggu kehadiran Anda 🎉" 
        : "Terima kasih atas konfirmasinya"
    );
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Nama */}
      <div>
        <label className="block text-sm font-medium text-brown mb-2">
          Nama Lengkap <span className="text-gold">*</span>
        </label>
        <input
          {...register("name")}
          type="text"
          className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold bg-white"
          placeholder="Masukkan nama Anda"
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Konfirmasi Kehadiran */}
      <div>
        <label className="block text-sm font-medium text-brown mb-2">
          Konfirmasi Kehadiran <span className="text-gold">*</span>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              {...register("attending")}
              type="radio"
              value="yes"
              className="text-gold focus:ring-gold"
            />
            <span className="text-sm text-brown">Hadir</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              {...register("attending")}
              type="radio"
              value="no"
              className="text-gold focus:ring-gold"
            />
            <span className="text-sm text-brown">Tidak Hadir</span>
          </label>
        </div>
        {errors.attending && (
          <p className="text-xs text-red-500 mt-1">{errors.attending.message}</p>
        )}
      </div>

      {/* Jumlah Tamu (conditional) */}
      {attending === "yes" && (
        <div>
          <label className="block text-sm font-medium text-brown mb-2">
            Jumlah Tamu yang Hadir
          </label>
          <select
            {...register("guestCount", { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold bg-white"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} orang
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Ucapan/Doa */}
      <div>
        <label className="block text-sm font-medium text-brown mb-2">
          Ucapan & Doa
        </label>
        <textarea
          {...register("message")}
          rows={4}
          className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold bg-white resize-none"
          placeholder="Tuliskan ucapan dan doa untuk pengantin..."
        />
        {errors.message && (
          <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-brown text-gold-light rounded-lg hover:bg-gold hover:text-brown transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Mengirim..." : "Kirim Konfirmasi"}
      </button>
    </form>
  );
}
