"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Music, Play, Pause, Library, Link, Upload, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useAutoSaveForm } from "@/hooks/useAutoSaveForm";

const musicFormSchema = z.object({
  selectedMusic: z.string().optional(),
  musicTitle: z.string().optional(),
  autoplay: z.boolean(),
  source: z.enum(["library", "upload", "url"]).optional(),
});

type MusicFormData = z.infer<typeof musicFormSchema>;

interface MusicFormProps {
  defaultValues?: Partial<MusicFormData>;
  onSave: (data: MusicFormData) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onChange?: (data: MusicFormData) => void;
}

interface SongItem {
  id: string;
  title: string;
  artist: string;
  album?: string;
  coverUrl?: string;
  audioUrl: string;
  duration?: number;
}

export function MusicForm({ defaultValues, onSave, onNext, onPrev, onChange }: MusicFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
  } = useForm<MusicFormData>({
    resolver: zodResolver(musicFormSchema),
    defaultValues: defaultValues || {
      selectedMusic: "",
      musicTitle: "",
      autoplay: true,
      source: "library",
    },
  });

  useAutoSaveForm(watch, onChange);

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);
  const [songs, setSongs] = useState<SongItem[]>([]);
  const [loadingSongs, setLoadingSongs] = useState(false);
  const [source, setSource] = useState<"library" | "upload" | "url">(
    defaultValues?.source || "library"
  );

  useEffect(() => {
    if (source === "library") {
      setLoadingSongs(true);
      fetch("/api/songs")
        .then((r) => r.json())
        .then((data) => setSongs(data))
        .catch(() => {})
        .finally(() => setLoadingSongs(false));
    }
  }, [source]);

  useEffect(() => {
    return () => {
      if (audioEl) {
        audioEl.pause();
        audioEl.src = "";
      }
    };
  }, [audioEl]);

  const onSubmit = (data: MusicFormData) => {
    if (audioEl) {
      audioEl.pause();
      audioEl.src = "";
    }
    onSave({ ...data, source });
    if (onNext) onNext();
  };

  const togglePlay = (url?: string) => {
    if (isPlaying && audioEl) {
      audioEl.pause();
      setIsPlaying(false);
      return;
    }
    if (!url) return;
    const audio = new Audio(url);
    audio.onended = () => setIsPlaying(false);
    audio.play();
    setAudioEl(audio);
    setIsPlaying(true);
  };

  const tabs: { key: typeof source; label: string; icon: typeof Library }[] = [
    { key: "library", label: "Pilih dari Library", icon: Library },
    { key: "upload", label: "Upload Musik", icon: Upload },
    { key: "url", label: "External URL", icon: Link },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Source Tabs */}
      <div className="flex gap-2 rounded-2xl border border-gold/15 bg-white p-2">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setSource(key)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${
              source === key
                ? "bg-brown text-gold-light"
                : "text-brown-light hover:bg-ivory"
            }`}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Library */}
      {source === "library" && (
        <div className="rounded-2xl border border-gold/15 bg-white p-6">
          <h3 className="mb-6 font-serif text-2xl text-brown">Library Musik</h3>
          {loadingSongs ? (
            <p className="text-sm text-brown-light">Memuat daftar lagu...</p>
          ) : songs.length === 0 ? (
            <p className="text-sm text-brown-light">
              Belum ada lagu di library. Upload musik atau gunakan URL eksternal.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {songs.map((song) => (
                <div
                  key={song.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setValue("selectedMusic", song.audioUrl, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
                    setValue("musicTitle", `${song.title} - ${song.artist}`, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
                    if (onChange) onChange(getValues());
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setValue("selectedMusic", song.audioUrl, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
                      setValue("musicTitle", `${song.title} - ${song.artist}`, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
                      if (onChange) onChange(getValues());
                    }
                  }}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 text-left transition hover:bg-ivory ${
                    watch("selectedMusic") === song.audioUrl
                      ? "border-brown bg-ivory"
                      : "border-gold/20"
                  }`}
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
                    {watch("selectedMusic") === song.audioUrl ? (
                      <Check className="size-5 text-brown" />
                    ) : (
                      <Music className="size-5 text-brown-light" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-brown">{song.title}</p>
                    <p className="truncate text-xs text-brown-light">{song.artist}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay(song.audioUrl);
                    }}
                    className="flex size-8 shrink-0 items-center justify-center rounded-full hover:bg-gold/10"
                  >
                    {isPlaying && audioEl?.src?.includes(song.audioUrl) ? (
                      <Pause className="size-4 text-brown" />
                    ) : (
                      <Play className="size-4 text-brown" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Upload */}
      {source === "upload" && (
        <div className="rounded-2xl border border-gold/15 bg-white p-6">
          <h3 className="mb-6 font-serif text-2xl text-brown">Upload Musik</h3>
          <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-gold/30 bg-ivory p-10">
            <Upload className="size-10 text-brown-light" />
            <p className="text-center text-sm text-brown-light">
              Drag & drop file MP3 di sini, atau klik untuk memilih file
            </p>
            <Button type="button" variant="outline" size="sm">
              Pilih File
            </Button>
            <p className="text-xs text-brown-light">
              Format: MP3, WAV, M4A (maks 10MB)
            </p>
          </div>
        </div>
      )}

      {/* URL */}
      {source === "url" && (
        <div className="rounded-2xl border border-gold/15 bg-white p-6">
          <h3 className="mb-6 font-serif text-2xl text-brown">External URL</h3>
          <div>
            <label className="mb-2 block text-sm font-medium text-brown">
              Link Musik (MP3/Stream)
            </label>
            <div className="relative">
              <Link className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-brown-light" />
              <input
                {...register("selectedMusic")}
                className="w-full rounded-xl border border-gold/20 bg-white py-3 pl-12 pr-4 text-brown outline-none transition focus:border-brown"
                placeholder="https://example.com/music.mp3"
              />
            </div>
            <p className="mt-1 text-xs text-brown-light">
              Gunakan link langsung ke file MP3 atau stream audio
            </p>
          </div>
        </div>
      )}

      {/* Music Title */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <h3 className="mb-6 font-serif text-2xl text-brown">Judul Musik</h3>
        <div>
          <label className="mb-2 block text-sm font-medium text-brown">
            Nama Lagu (opsional)
          </label>
          <input
            {...register("musicTitle")}
            className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-brown outline-none transition focus:border-brown"
            placeholder="Contoh: Perfect - Ed Sheeran"
          />
        </div>
      </div>

      {/* Autoplay */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-serif text-xl text-brown">Putar Otomatis</h3>
            <p className="mt-1 text-sm text-brown-light">
              Musik akan diputar otomatis saat tamu membuka undangan
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={watch("autoplay")}
              onChange={(e) => {
                setValue("autoplay", e.target.checked, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
                if (onChange) onChange(getValues());
              }}
              className="peer sr-only"
            />
            <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-gold peer-checked:after:translate-x-full" />
          </label>
        </div>
      </div>

      {/* Preview */}
      {watch("selectedMusic") && (
        <div className="rounded-2xl border border-gold/15 bg-white p-6">
          <h3 className="mb-4 font-serif text-xl text-brown">Preview Musik</h3>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => togglePlay(watch("selectedMusic"))}
              className="h-12 w-12 rounded-full"
            >
              {isPlaying ? (
                <Pause className="size-5" />
              ) : (
                <Play className="size-5" />
              )}
            </Button>
            <div>
              <p className="font-medium text-brown">
                {watch("musicTitle") || "Musik Pilihan"}
              </p>
              <p className="text-xs text-brown-light">
                {isPlaying ? "Sedang diputar..." : "Klik untuk preview"}
              </p>
            </div>
          </div>
        </div>
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
