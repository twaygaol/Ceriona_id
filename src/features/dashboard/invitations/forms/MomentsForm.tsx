"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Camera, Upload, Loader2 } from "lucide-react";
import { useAutoSaveForm } from "@/hooks/useAutoSaveForm";
import { uploadToCloudinary } from "@/lib/upload";
import { useRef, useState } from "react";

const momentSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  order: z.number(),
});

const momentsFormSchema = z.object({
  moments: z.array(momentSchema),
});

type MomentsFormData = z.infer<typeof momentsFormSchema>;

interface MomentsFormProps {
  defaultValues?: Partial<MomentsFormData>;
  onSave: (data: MomentsFormData) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onChange?: (data: MomentsFormData) => void;
}

export function MomentsForm({ defaultValues, onSave, onNext, onPrev, onChange }: MomentsFormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
  } = useForm<MomentsFormData>({
    resolver: zodResolver(momentsFormSchema),
    defaultValues: defaultValues || { moments: [] },
  });

  useAutoSaveForm(watch, onChange);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "moments",
  });

  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const handleUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingIndex(index);
      const url = await uploadToCloudinary(file);
      setValue(`moments.${index}.imageUrl`, url, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
      if (onChange) onChange(getValues());
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload gagal. Silakan coba lagi.");
    } finally {
      setUploadingIndex(null);
    }
  };

  const onSubmit = (data: MomentsFormData) => {
    onSave(data);
    if (onNext) onNext();
  };

  const addMoment = () => {
    append({ title: "", description: "", imageUrl: "", order: fields.length });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> Momen adalah foto-foto candid/kecil yang ingin ditampilkan 
          dalam gaya grid polaroid atau momen tersendiri.
        </p>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-2xl border border-gold/15 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="size-5 text-gold" />
                <h3 className="font-serif text-xl text-brown">
                  Momen {index + 1}
                </h3>
              </div>
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

            <div className="space-y-4">
              {watch(`moments.${index}.imageUrl`) && (
                <img
                  src={watch(`moments.${index}.imageUrl`)}
                  alt={watch(`moments.${index}.title`) || ""}
                  className="h-40 w-full rounded-xl object-cover"
                />
              )}

              <div className="flex items-center gap-4">
                <input
                  ref={(el) => { fileInputRefs.current[index] = el; }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUpload(index, e)}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => fileInputRefs.current[index]?.click()}
                  disabled={uploadingIndex === index}
                >
                  {uploadingIndex === index ? (
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
              </div>

              <input
                {...register(`moments.${index}.title`)}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
                placeholder="Judul momen (opsional)"
              />

              <textarea
                {...register(`moments.${index}.description`)}
                rows={2}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
                placeholder="Cerita singkat tentang momen ini (opsional)"
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addMoment}
        className="w-full gap-2 border-dashed"
      >
        <Plus className="size-4" />
        Tambah Momen
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
