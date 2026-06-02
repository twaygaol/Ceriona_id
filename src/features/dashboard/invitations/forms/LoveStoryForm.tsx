"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Heart, Upload, Loader2 } from "lucide-react";
import { useAutoSaveForm } from "@/hooks/useAutoSaveForm";
import { uploadToCloudinary } from "@/lib/upload";
import { useRef, useState } from "react";

const storySchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.string().optional(),
  photoUrl: z.string().optional(),
  order: z.number(),
});

const loveStorySchema = z.object({
  stories: z.array(storySchema).optional(),
});

type LoveStoryFormData = z.infer<typeof loveStorySchema>;

interface LoveStoryFormProps {
  defaultValues?: Partial<LoveStoryFormData>;
  onSave: (data: LoveStoryFormData) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onChange?: (data: LoveStoryFormData) => void;
}

export function LoveStoryForm({ defaultValues, onSave, onNext, onPrev, onChange }: LoveStoryFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm<LoveStoryFormData>({
    resolver: zodResolver(loveStorySchema),
    defaultValues: defaultValues || {
      stories: [
        {
          title: "Pertama Bertemu",
          description: "",
          date: "",
          photoUrl: "",
          order: 0,
        },
      ],
    },
  });

  useAutoSaveForm(watch, onChange);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stories",
  });

  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const handleUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingIndex(index);
      const url = await uploadToCloudinary(file);
      setValue(`stories.${index}.photoUrl`, url, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
      if (onChange) onChange(getValues());
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload gagal. Silakan coba lagi.");
    } finally {
      setUploadingIndex(null);
    }
  };

  const onSubmit = (data: LoveStoryFormData) => {
    onSave(data);
    if (onNext) onNext();
  };

  const addStory = () => {
    append({
      title: "",
      description: "",
      date: "",
      photoUrl: "",
      order: fields.length,
    });
  };

  const storyIdeas = [
    "Pertama Bertemu",
    "Mulai Dekat",
    "Momen Spesial",
    "Lamaran",
    "Pra-Nikah",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> Ceritakan perjalanan cinta kalian dalam 2-5 cerita pendek. 
          Setiap cerita akan ditampilkan berurutan dalam timeline interaktif.
        </p>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-2xl border border-gold/15 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="size-5 text-rose" />
                <h3 className="font-serif text-xl text-brown">
                  Cerita {index + 1}
                </h3>
              </div>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="size-4" />
                  Hapus
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-brown">
                  Judul Cerita <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`stories.${index}.title`)}
                  list={`story-ideas-${index}`}
                  className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
                  placeholder="Contoh: Pertama Bertemu"
                />
                <datalist id={`story-ideas-${index}`}>
                  {storyIdeas.map((idea) => (
                    <option key={idea} value={idea} />
                  ))}
                </datalist>
                {errors.stories?.[index]?.title && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.stories[index]?.title?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-brown">
                  Cerita <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register(`stories.${index}.description`)}
                  rows={4}
                  className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
                  placeholder="Ceritakan momen berkesan kalian..."
                />
                {errors.stories?.[index]?.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.stories[index]?.description?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-brown">
                  Tanggal
                </label>
                <input
                  type="date"
                  {...register(`stories.${index}.date`)}
                  className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-brown">
                  Foto
                </label>
                <div className="flex items-center gap-4">
                  {watch(`stories.${index}.photoUrl`) && (
                    <img
                      src={watch(`stories.${index}.photoUrl`)}
                      alt={`Story ${index + 1}`}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                  )}
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
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addStory}
        className="w-full gap-2 border-dashed"
      >
        <Plus className="size-4" />
        Tambah Cerita
      </Button>

      {errors.stories && (
        <p className="text-sm text-red-500">{errors.stories.message}</p>
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
