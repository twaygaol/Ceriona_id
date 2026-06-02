"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useAutoSaveForm } from "@/hooks/useAutoSaveForm";

const parentsInfoSchema = z.object({
  brideFatherName: z.string().optional(),
  brideMotherName: z.string().optional(),
  groomFatherName: z.string().optional(),
  groomMotherName: z.string().optional(),
});

type ParentsInfoFormData = z.infer<typeof parentsInfoSchema>;

interface ParentsInfoFormProps {
  defaultValues?: Partial<ParentsInfoFormData>;
  onSave: (data: ParentsInfoFormData) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onChange?: (data: ParentsInfoFormData) => void;
}

export function ParentsInfoForm({ defaultValues, onSave, onNext, onPrev, onChange }: ParentsInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ParentsInfoFormData>({
    resolver: zodResolver(parentsInfoSchema),
    defaultValues,
  });

  useAutoSaveForm(watch, onChange);

  const onSubmit = (data: ParentsInfoFormData) => {
    onSave(data);
    if (onNext) onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Orang Tua Mempelai Wanita */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <h3 className="mb-6 font-serif text-2xl text-brown">Orang Tua Mempelai Wanita</h3>
        
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Nama Ayah
            </label>
            <input
              {...register("brideFatherName")}
              className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
              placeholder="Contoh: Bapak Ahmad Suryanto"
            />
            <p className="mt-1 text-xs text-brown-light">
              Gunakan gelar yang sesuai (Bapak, H., Dr., dll)
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Nama Ibu
            </label>
            <input
              {...register("brideMotherName")}
              className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
              placeholder="Contoh: Ibu Siti Nurhaliza"
            />
            <p className="mt-1 text-xs text-brown-light">
              Gunakan gelar yang sesuai (Ibu, Hj., Dr., dll)
            </p>
          </div>
        </div>
      </div>

      {/* Orang Tua Mempelai Pria */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <h3 className="mb-6 font-serif text-2xl text-brown">Orang Tua Mempelai Pria</h3>
        
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Nama Ayah
            </label>
            <input
              {...register("groomFatherName")}
              className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
              placeholder="Contoh: Bapak Budi Santoso"
            />
            <p className="mt-1 text-xs text-brown-light">
              Gunakan gelar yang sesuai (Bapak, H., Dr., dll)
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Nama Ibu
            </label>
            <input
              {...register("groomMotherName")}
              className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
              placeholder="Contoh: Ibu Ani Wijaya"
            />
            <p className="mt-1 text-xs text-brown-light">
              Gunakan gelar yang sesuai (Ibu, Hj., Dr., dll)
            </p>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          <strong>Catatan:</strong> Informasi orang tua akan ditampilkan di beberapa tema undangan. 
          Jika tidak diisi, tema akan menyesuaikan tampilan secara otomatis.
        </p>
      </div>

      {/* Actions */}
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
