"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, Quote, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAutoSaveForm } from "@/hooks/useAutoSaveForm";
import { uploadToCloudinary } from "@/lib/upload";
import { useRef, useState } from "react";

const coverScreenSchema = z.object({
  coverPhoto: z.string().optional(),
  coverBackground: z.string().optional(),
  coverTitle: z.string().optional(),
  coverGuestName: z.string().optional(),
  coverQuote: z.string().optional(),
});

type CoverScreenFormData = z.infer<typeof coverScreenSchema>;

interface CoverScreenFormProps {
  defaultValues?: Partial<CoverScreenFormData>;
  onSave: (data: CoverScreenFormData) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onChange?: (data: CoverScreenFormData) => void;
}

export function CoverScreenForm({ defaultValues, onSave, onNext, onPrev, onChange }: CoverScreenFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
  } = useForm<CoverScreenFormData>({
    resolver: zodResolver(coverScreenSchema),
    defaultValues,
  });

  useAutoSaveForm(watch, onChange);

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadToCloudinary(file);
      setValue("coverPhoto", url, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
      if (onChange) onChange(getValues());
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload gagal. Silakan coba lagi.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data: CoverScreenFormData) => {
    onSave(data);
    if (onNext) onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Cover Photo */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <h3 className="mb-6 font-serif text-2xl text-brown">Foto Sampul</h3>
        
        <div>
          <label className="mb-2 block text-sm font-medium text-brown">
            Foto Background Cover
          </label>
          <div className="flex items-center gap-4">
            {watch("coverPhoto") && (
              <img
                src={watch("coverPhoto")}
                alt="Cover"
                className="h-36 w-64 rounded-xl object-cover"
              />
            )}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
              <Button 
                type="button" 
                variant="outline" 
                className="gap-2"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="size-4" />
                    Upload Foto
                  </>
                )}
              </Button>
              <p className="mt-2 text-xs text-brown-light">
                Rekomendasi ukuran: 1080x1920px (9:16). Foto akan tampil full screen di layar terbuka undangan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Color */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <h3 className="mb-6 font-serif text-2xl text-brown">Warna Background</h3>
        
        <div>
          <label className="mb-2 block text-sm font-medium text-brown">
            Warna Background (jika tidak pakai foto)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              {...register("coverBackground")}
              className="h-16 w-16 cursor-pointer rounded-xl border border-gold/20"
            />
            <span className="text-sm text-brown-light">
              Atau biarkan kosong untuk menggunakan warna default tema
            </span>
          </div>
        </div>
      </div>

      {/* Cover Text */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <h3 className="mb-6 font-serif text-2xl text-brown">Teks Sampul</h3>
        
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Judul Sampul
            </label>
            <input
              {...register("coverTitle")}
              className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
              placeholder='Contoh: "The Wedding of"'
            />
            <p className="mt-1 text-xs text-brown-light">
              Biarkan kosong untuk menggunakan teks default tema
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Nama Tamu (Guest Name)
            </label>
            <input
              {...register("coverGuestName")}
              className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
              placeholder='Contoh: "Kepada Yth. Bapak/Ibu/Saudara/i"'
            />
            <p className="mt-1 text-xs text-brown-light">
              Teks di atas tombol "Buka Undangan". Biarkan kosong untuk menggunakan default.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Kutipan / Ayat
            </label>
            <div className="relative">
              <Quote className="absolute left-4 top-4 size-5 text-gold" />
              <textarea
                {...register("coverQuote")}
                rows={3}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 pl-12 text-brown outline-none transition focus:border-brown"
                placeholder='Contoh: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup..."'
              />
            </div>
            <p className="mt-1 text-xs text-brown-light">
              Ayat Al-Quran, kutipan romantis, atau kata bijak
            </p>
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
