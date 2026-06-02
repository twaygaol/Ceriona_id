"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useAutoSaveForm } from "@/hooks/useAutoSaveForm";

const rsvpFormSchema = z.object({
  enableRsvp: z.boolean(),
  rsvpDeadline: z.string().optional(),
  maxGuests: z.string().optional(),
  confirmMessage: z.string().optional(),
});

type RSVPFormData = z.infer<typeof rsvpFormSchema>;

interface RSVPFormProps {
  defaultValues?: Partial<RSVPFormData>;
  onSave: (data: RSVPFormData) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onChange?: (data: RSVPFormData) => void;
}

export function RSVPForm({ defaultValues, onSave, onNext, onPrev, onChange }: RSVPFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: defaultValues || {
      enableRsvp: true,
      rsvpDeadline: "",
      maxGuests: "1",
      confirmMessage: "",
    },
  });

  useAutoSaveForm(watch, onChange);
  const onSubmit = (data: RSVPFormData) => {
    onSave(data);
    if (onNext) onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> Fitur RSVP memungkinkan tamu mengonfirmasi kehadiran 
          langsung dari undangan. Data akan masuk ke dashboard Anda.
        </p>
      </div>

      {/* Enable RSVP */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-serif text-xl text-brown">Aktifkan RSVP</h3>
            <p className="mt-1 text-sm text-brown-light">
              Tamu dapat mengisi form konfirmasi kehadiran
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={watch("enableRsvp")}
              onChange={(e) => setValue("enableRsvp", e.target.checked)}
              className="peer sr-only"
            />
            <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-gold peer-checked:after:translate-x-full" />
          </label>
        </div>
      </div>

      {watch("enableRsvp") && (
        <>
          {/* RSVP Deadline */}
          <div className="rounded-2xl border border-gold/15 bg-white p-6">
            <h3 className="mb-6 font-serif text-2xl text-brown">Batas Waktu</h3>
            
            <div>
              <label className="mb-2 block text-sm font-medium text-brown">
                Batas Akhir Konfirmasi
              </label>
              <input
                type="date"
                {...register("rsvpDeadline")}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
              />
              <p className="mt-1 text-xs text-brown-light">
                Biarkan kosong jika tidak ada batas waktu
              </p>
            </div>
          </div>

          {/* Max Guests */}
          <div className="rounded-2xl border border-gold/15 bg-white p-6">
            <h3 className="mb-6 font-serif text-2xl text-brown">Jumlah Tamu</h3>
            
            <div>
              <label className="mb-2 block text-sm font-medium text-brown">
                Maksimal Tamu per Konfirmasi
              </label>
              <input
                type="number"
                min="1"
                max="20"
                {...register("maxGuests")}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
              />
              <p className="mt-1 text-xs text-brown-light">
                Jumlah maksimal orang yang bisa dikonfirmasi dalam satu form
              </p>
            </div>
          </div>

          {/* Confirm Message */}
          <div className="rounded-2xl border border-gold/15 bg-white p-6">
            <h3 className="mb-6 font-serif text-2xl text-brown">Pesan Konfirmasi</h3>
            
            <div>
              <label className="mb-2 block text-sm font-medium text-brown">
                Teks Setelah Konfirmasi
              </label>
              <textarea
                {...register("confirmMessage")}
                rows={3}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
                placeholder='Contoh: "Terima kasih atas konfirmasinya. Kami tunggu kehadirannya!"'
              />
              <p className="mt-1 text-xs text-brown-light">
                Pesan yang muncul setelah tamu berhasil konfirmasi
              </p>
            </div>
          </div>
        </>
      )}

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {onPrev && (
            <Button type="button" variant="outline" onClick={onPrev}>
              Kembali
            </Button>
          )}
          <Button type="button" variant="outline">
            Simpan Draft
          </Button>
        </div>
        <Button type="submit" className="bg-brown text-gold-light hover:bg-gold hover:text-brown">
          Simpan & Lanjutkan
        </Button>
      </div>
    </form>
  );
}
