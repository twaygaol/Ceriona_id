"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Image, Loader2 } from "lucide-react";
import { useAutoSaveForm } from "@/hooks/useAutoSaveForm";
import { uploadToCloudinary } from "@/lib/upload";
import { useRef, useState } from "react";

const galleryImageSchema = z.object({
  id: z.string().optional(),
  url: z.string().optional(),
  caption: z.string().optional(),
  order: z.number(),
});

const galleryFormSchema = z.object({
  galleryImages: z.array(galleryImageSchema),
});

type GalleryFormData = z.infer<typeof galleryFormSchema>;

interface GalleryFormProps {
  defaultValues?: Partial<GalleryFormData>;
  onSave: (data: GalleryFormData) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onChange?: (data: GalleryFormData) => void;
}

export function GalleryForm({ defaultValues, onSave, onNext, onPrev, onChange }: GalleryFormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
  } = useForm<GalleryFormData>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues: defaultValues || { galleryImages: [] },
  });

  useAutoSaveForm(watch, onChange);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "galleryImages",
  });

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMultipleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      setUploading(true);
      const uploadPromises = files.map(file => uploadToCloudinary(file));
      const urls = await Promise.all(uploadPromises);
      
      urls.forEach((url, i) => {
        append({ url, caption: "", order: fields.length + i });
      });
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload gagal. Silakan coba lagi.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data: GalleryFormData) => {
    onSave(data);
    if (onNext) onNext();
  };

  const addImage = () => {
    append({ url: "", caption: "", order: fields.length });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> Unggah foto prewedding atau foto-foto berkesan kalian. 
          Foto akan ditampilkan dalam gallery slider/interaktif.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="rounded-2xl border-2 border-dashed border-gold/30 bg-ivory/50 p-8 text-center">
        <Image className="mx-auto mb-4 size-12 text-gold" />
        <p className="text-brown">Seret foto ke sini atau klik untuk upload</p>
        <p className="mt-1 text-xs text-brown-light">
          Maks 20 foto. Format: JPG, PNG, WebP. Maks 5MB per foto.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleMultipleUpload}
          className="hidden"
        />
        <Button 
          type="button" 
          variant="outline" 
          className="mt-4 gap-2"
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
              <Plus className="size-4" />
              Pilih Foto
            </>
          )}
        </Button>
      </div>

      {/* Existing Images */}
      {fields.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-serif text-xl text-brown">
            Foto yang Ditambahkan ({fields.length})
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field, index) => (
              <div key={field.id} className="rounded-xl border border-gold/15 bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-brown">
                    Foto {index + 1}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>

                {watch(`galleryImages.${index}.url`) && (
                  <img
                    src={watch(`galleryImages.${index}.url`)}
                    alt={`Gallery ${index + 1}`}
                    className="mb-3 h-32 w-full rounded-lg object-cover"
                  />
                )}

                <div className="space-y-3">
                  <input
                    {...register(`galleryImages.${index}.url`)}
                    className="w-full rounded-lg border border-gold/20 bg-white px-3 py-2 text-sm text-brown outline-none transition focus:border-brown"
                    placeholder="URL foto"
                  />
                  <input
                    {...register(`galleryImages.${index}.caption`)}
                    className="w-full rounded-lg border border-gold/20 bg-white px-3 py-2 text-sm text-brown outline-none transition focus:border-brown"
                    placeholder="Keterangan (opsional)"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        onClick={addImage}
        className="w-full gap-2 border-dashed"
      >
        <Plus className="size-4" />
        Tambah URL Foto Manual
      </Button>

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
