"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Video } from "lucide-react";
import { useAutoSaveForm } from "@/hooks/useAutoSaveForm";

const videoSchema = z.object({
  id: z.string().optional(),
  url: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  order: z.number(),
});

const videoFormSchema = z.object({
  videos: z.array(videoSchema),
});

type VideoFormData = z.infer<typeof videoFormSchema>;

interface VideoFormProps {
  defaultValues?: Partial<VideoFormData>;
  onSave: (data: VideoFormData) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onChange?: (data: VideoFormData) => void;
}

export function VideoForm({ defaultValues, onSave, onNext, onPrev, onChange }: VideoFormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
  } = useForm<VideoFormData>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: defaultValues || { videos: [] },
  });

  useAutoSaveForm(watch, onChange);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "videos",
  });

  const onSubmit = (data: VideoFormData) => {
    onSave(data);
    if (onNext) onNext();
  };

  const addVideo = () => {
    append({ url: "", title: "", description: "", order: fields.length });
  };

  const getEmbedUrl = (url: string | undefined): string | null => {
    if (!url) return null;
    const ytMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/
    );
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    return url;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> Tambahkan video prewedding, video undangan, atau video 
          sambutan. Mendukung YouTube dan URL video langsung.
        </p>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-2xl border border-gold/15 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="size-5 text-gold" />
                <h3 className="font-serif text-xl text-brown">
                  Video {index + 1}
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
              <div>
                <label className="mb-2 block text-sm font-medium text-brown">
                  URL Video
                </label>
                <input
                  {...register(`videos.${index}.url`)}
                  className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
                  placeholder="https://youtube.com/watch?v=..."
                />
                <p className="mt-1 text-xs text-brown-light">
                  Support YouTube, Vimeo, atau direct video URL
                </p>
              </div>

              {(() => {
                const videoUrl = watch(`videos.${index}.url`);
                const embedUrl = getEmbedUrl(videoUrl);
                return videoUrl ? (
                  <div className="aspect-video rounded-xl bg-black/5">
                    {embedUrl ? (
                      <iframe
                        src={embedUrl}
                        className="h-full w-full rounded-xl"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope"
                        allowFullScreen
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-brown-light">
                        <Video className="mr-2 size-5" />
                        Preview tidak tersedia
                      </div>
                    )}
                  </div>
                ) : null;
              })()}

              <input
                {...register(`videos.${index}.title`)}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
                placeholder="Judul video (opsional)"
              />

              <textarea
                {...register(`videos.${index}.description`)}
                rows={2}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
                placeholder="Deskripsi video (opsional)"
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addVideo}
        className="w-full gap-2 border-dashed"
      >
        <Plus className="size-4" />
        Tambah Video
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
