"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useAutoSaveForm } from "@/hooks/useAutoSaveForm";

const countdownSchema = z.object({
  countdownTarget: z.string().optional(),
});

type CountdownFormData = z.infer<typeof countdownSchema>;

interface CountdownFormProps {
  defaultValues?: Partial<CountdownFormData>;
  onSave: (data: CountdownFormData) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onChange?: (data: CountdownFormData) => void;
}

export function CountdownForm({ defaultValues, onSave, onNext, onPrev, onChange }: CountdownFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CountdownFormData>({
    resolver: zodResolver(countdownSchema),
    defaultValues,
  });

  useAutoSaveForm(watch, onChange);

  const onSubmit = (data: CountdownFormData) => {
    onSave(data);
    if (onNext) onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <h3 className="mb-6 font-serif text-2xl text-brown">Hitung Mundur</h3>
        
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Tanggal Target Hitung Mundur <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register("countdownTarget")}
              className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
            />
            {errors.countdownTarget && (
              <p className="mt-1 text-sm text-red-500">{errors.countdownTarget.message}</p>
            )}
            <p className="mt-2 text-xs text-brown-light">
              Hitung mundur akan dihitung otomatis dari tanggal ini. 
              Biasanya menggunakan tanggal acara utama.
            </p>
          </div>

          {/* Preview */}
          <div className="rounded-xl border border-gold/10 bg-ivory p-4">
            <p className="mb-2 text-sm font-medium text-brown">Pratinjau:</p>
            <div className="flex gap-6 text-center">
              {["Hari", "Jam", "Menit", "Detik"].map((unit) => (
                <div key={unit} className="flex flex-col">
                  <span className="font-serif text-3xl text-gold">00</span>
                  <span className="text-xs text-brown-light">{unit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
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
