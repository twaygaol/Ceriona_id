"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { useAutoSaveForm } from "@/hooks/useAutoSaveForm";

const seoFormSchema = z.object({
  slug: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaCoverImage: z.string().optional(),
});

type SEOFormData = z.infer<typeof seoFormSchema>;

interface SEOFormProps {
  defaultValues?: Partial<SEOFormData>;
  onSave: (data: SEOFormData) => void;
  onNext?: () => void;
  onPrev?: () => void;
  slug?: string;
  onChange?: (data: SEOFormData) => void;
}

export function SEOForm({ defaultValues, onSave, onNext, onPrev, slug: autoSlug, onChange }: SEOFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SEOFormData>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: defaultValues || {
      slug: autoSlug || "",
      metaTitle: "",
      metaDescription: "",
      metaCoverImage: "",
    },
  });

  useAutoSaveForm(watch, onChange);

  // Update slug when autoSlug changes
  useEffect(() => {
    if (autoSlug && !watch("slug")) {
      setValue("slug", autoSlug);
    }
  }, [autoSlug]);

  const [showPreview, setShowPreview] = useState(false);

  const onSubmit = (data: SEOFormData) => {
    onSave({ ...data, slug: data.slug || autoSlug });
    if (onNext) onNext();
  };

  const metaTitle = watch("metaTitle");
  const metaDescription = watch("metaDescription");
  const slug = watch("slug") || autoSlug;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> SEO yang baik membantu undangan muncul di pencarian 
          Google. Isi judul dan deskripsi yang relevan.
        </p>
      </div>

      {/* Slug */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <h3 className="mb-6 font-serif text-2xl text-brown">Link Undangan</h3>
        
        <div>
          <label className="mb-2 block text-sm font-medium text-brown">
            Slug URL
          </label>
          <div className="flex items-center rounded-xl border border-gold/20 bg-ivory px-4">
            <span className="text-sm text-brown-light">kundangan.com/invitation/</span>
            <span className="flex-1 py-3 text-brown font-medium">
              {slug || "nama-pasangan"}
            </span>
          </div>
          {slug && (
            <p className="mt-1 text-xs text-green-600">
              Link undangan: kundangan.com/invitation/{slug}
            </p>
          )}
        </div>
      </div>

      {/* Meta Title */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <h3 className="mb-6 font-serif text-2xl text-brown">Judul SEO</h3>
        
        <div>
          <label className="mb-2 block text-sm font-medium text-brown">
            Judul Halaman (Meta Title)
          </label>
          <input
            {...register("metaTitle")}
            className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
            placeholder='Contoh: Undangan Pernikahan Rizky & Salsabila'
          />
          <div className="mt-1 flex justify-between">
            <p className="text-xs text-brown-light">
              Akan muncul di tab browser dan hasil pencarian
            </p>
            <span className={`text-xs ${(metaTitle?.length || 0) > 70 ? "text-red-500" : "text-brown-light"}`}>
              {metaTitle?.length || 0}/70
            </span>
          </div>
        </div>
      </div>

      {/* Meta Description */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <h3 className="mb-6 font-serif text-2xl text-brown">Deskripsi SEO</h3>
        
        <div>
          <label className="mb-2 block text-sm font-medium text-brown">
            Deskripsi Halaman (Meta Description)
          </label>
          <textarea
            {...register("metaDescription")}
            rows={3}
            className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
            placeholder="Deskripsi singkat tentang undangan pernikahan..."
          />
          <div className="mt-1 flex justify-between">
            <p className="text-xs text-brown-light">
              Ringkasan yang muncul di hasil pencarian Google
            </p>
            <span className={`text-xs ${(metaDescription?.length || 0) > 160 ? "text-red-500" : "text-brown-light"}`}>
              {metaDescription?.length || 0}/160
            </span>
          </div>
        </div>
      </div>

      {/* Google Preview */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="mb-4 flex items-center gap-2 text-brown hover:text-gold"
        >
          <Eye className="size-5" />
          <span className="font-medium">Pratinjau Google Search</span>
        </button>

        {showPreview && (
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-green-700">kundangan.com/invitation/{slug || "nama-pasangan"}</p>
            <p className="text-lg text-blue-700 hover:underline">
              {metaTitle || "Undangan Pernikahan"}
            </p>
            <p className="text-sm text-gray-600">
              {metaDescription || "Deskripsi undangan akan tampil di sini..."}
            </p>
          </div>
        )}
      </div>

      {/* Cover Image */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <h3 className="mb-6 font-serif text-2xl text-brown">Gambar Sampul SEO</h3>
        
        <div>
          <label className="mb-2 block text-sm font-medium text-brown">
            URL Gambar OG (Open Graph)
          </label>
          <input
            {...register("metaCoverImage")}
            className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
            placeholder="https://..."
          />
          <p className="mt-1 text-xs text-brown-light">
            Gambar yang muncul saat link dibagikan ke WhatsApp/Media Sosial. 
            Rekomendasi: 1200x630px
          </p>
        </div>
      </div>

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
