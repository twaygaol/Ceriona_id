"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAutoSaveForm } from "@/hooks/useAutoSaveForm";
import { uploadToCloudinary } from "@/lib/upload";
import { useRef, useState } from "react";

const heroSectionSchema = z.object({
  heroImage: z.string().optional(),
  heroBackground: z.string().optional(),
  heroQuote: z.string().optional(),
});

type HeroSectionFormData = z.infer<typeof heroSectionSchema>;

interface HeroSectionFormProps {
  defaultValues?: Partial<HeroSectionFormData>;
  onSave: (data: HeroSectionFormData) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onChange?: (data: HeroSectionFormData) => void;
}

export function HeroSectionForm({ defaultValues, onSave, onNext, onPrev, onChange }: HeroSectionFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
  } = useForm<HeroSectionFormData>({
    resolver: zodResolver(heroSectionSchema),
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
      setValue("heroImage", url, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
      if (onChange) onChange(getValues());
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload gagal. Silakan coba lagi.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data: HeroSectionFormData) => {
    onSave(data);
    if (onNext) onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Hero Image */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <h3 className="mb-6 font-serif text-2xl text-brown">Foto Hero</h3>
        
        <div>
          <label className="mb-2 block text-sm font-medium text-brown">
            Gambar Hero Section
          </label>
          <div className="flex items-center gap-4">
            {watch("heroImage") && (
              <img
                src={watch("heroImage")}
                alt="Hero"
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
                    Upload Gambar
                  </>
                )}
              </Button>
              <p className="mt-2 text-xs text-brown-light">
                Gambar besar di section pembuka konten undangan. Rekomendasi: 1200x800px.
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
            Warna Background Hero
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              {...register("heroBackground")}
              className="h-16 w-16 cursor-pointer rounded-xl border border-gold/20"
            />
            <span className="text-sm text-brown-light">
              Warna fallback jika gambar tidak tampil
            </span>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <h3 className="mb-6 font-serif text-2xl text-brown">Kutipan Hero</h3>
        
        <div>
          <label className="mb-2 block text-sm font-medium text-brown">
            Teks Kutipan
          </label>
          <textarea
            {...register("heroQuote")}
            rows={3}
            className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
            placeholder="Kutipan atau kata sambutan di hero section..."
          />
          <p className="mt-1 text-xs text-brown-light">
            Kata sambutan singkat untuk para tamu undangan
          </p>
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
