"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { getAllThemeManifests } from "@/features/invitation/renderer/theme-registry";
import { useMemo, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { useAutoSaveForm } from "@/hooks/useAutoSaveForm";

const colorSchema = z.object({
  primary: z.string().optional(),
  secondary: z.string().optional(),
  accent: z.string().optional(),
  background: z.string().optional(),
  text: z.string().optional(),
});

const themeFormSchema = z.object({
  templateId: z.string().optional(),
  themeCustomization: z.object({
    colors: colorSchema.optional(),
    openingVariant: z.string().optional(),
    decorationVariant: z.string().optional(),
    layoutVariant: z.string().optional(),
  }).optional(),
});

type ThemeFormData = z.infer<typeof themeFormSchema>;

interface ThemeFormProps {
  defaultValues?: Partial<ThemeFormData>;
  onSave: (data: ThemeFormData) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onChange?: (data: ThemeFormData) => void;
}

const THEME_COLORS: Record<string, string> = {
  jawa: "#8B4513",
  batak: "#1A5276",
  islami: "#1B6B3A",
  luxury: "#C9A96E",
  modern: "#2C3E50",
};

export function ThemeForm({ defaultValues, onSave, onNext, onPrev, onChange }: ThemeFormProps) {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ThemeFormData>({
    resolver: zodResolver(themeFormSchema),
    defaultValues: defaultValues || {
      templateId: "",
      themeCustomization: {},
    },
  });

  useAutoSaveForm(watch, onChange);

  // Reset form only once when defaultValues first becomes available (edit mode)
  const hasResetRef = useRef(false);
  useEffect(() => {
    if (defaultValues && defaultValues.templateId && !hasResetRef.current) {
      reset(defaultValues);
      hasResetRef.current = true;
    }
  }, [defaultValues, reset]);

  const themes = useMemo(() => getAllThemeManifests(), []);
  const selectedTheme = watch("templateId");
  const themeColors = watch("themeCustomization.colors");

  const onSubmit = (data: ThemeFormData) => {
    onSave(data);
    if (onNext) onNext();
  };

  const colorFields = [
    { key: "primary", label: "Warna Utama", defaultColor: "#C9A96E" },
    { key: "secondary", label: "Warna Sekunder", defaultColor: "#E8D5B0" },
    { key: "accent", label: "Warna Aksen", defaultColor: "#8A9E85" },
    { key: "background", label: "Warna Latar", defaultColor: "#FAF7F2" },
    { key: "text", label: "Warna Teks", defaultColor: "#4A3728" },
  ] as const;

  type ColorKey = (typeof colorFields)[number]["key"];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Theme Selection */}
      <div>
        <h3 className="mb-4 font-serif text-2xl text-brown">Pilih Tema</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() => {
                setValue("templateId", theme.id);
                onSave({ templateId: theme.id, themeCustomization: watch("themeCustomization") });
              }}
              className={`relative overflow-hidden rounded-2xl border-2 p-0 text-left transition-all ${
                selectedTheme === theme.id
                  ? "border-gold shadow-lg"
                  : "border-gold/10 hover:border-gold/30"
              }`}
            >
              {/* Theme Preview */}
              <div
                className="h-40 w-full"
                style={{ backgroundColor: THEME_COLORS[theme.id] || "#C9A96E" }}
              >
                <div className="flex h-full items-center justify-center">
                  <span className="font-serif text-2xl text-white drop-shadow-lg">
                    {theme.name}
                  </span>
                </div>
              </div>

              {/* Theme Info */}
              <div className="p-4">
                <h4 className="font-serif text-lg text-brown">{theme.name}</h4>
                <p className="mt-1 text-xs text-brown-light">{theme.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {theme.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gold/10 px-2 py-0.5 text-xs text-brown-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Selected Check */}
              {selectedTheme === theme.id && (
                <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-gold">
                  <Check className="size-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
        {errors.templateId && (
          <p className="mt-2 text-sm text-red-500">{errors.templateId.message}</p>
        )}
      </div>

      {/* Color Customization */}
      {selectedTheme && (
        <div className="rounded-2xl border border-gold/15 bg-white p-6">
          <h3 className="mb-6 font-serif text-2xl text-brown">Kustomisasi Warna</h3>
          <p className="mb-6 text-sm text-brown-light">
            Sesuaikan warna tema dengan preferensi Anda (opsional)
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {colorFields.map(({ key, label, defaultColor }) => (
              <div key={key}>
                <label className="mb-2 block text-sm font-medium text-brown">
                  {label}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={(themeColors as Record<string, string>)?.[key] || defaultColor}
                    onChange={(e) => {
                      setValue(`themeCustomization` as any, {
                        colors: { ...(themeColors as Record<string, string>), [key]: e.target.value },
                      });
                    }}
                    className="h-10 w-10 cursor-pointer rounded-lg border border-gold/20"
                  />
                  <input
                    value={(themeColors as Record<string, string>)?.[key] || ""}
                    onChange={(e) => {
                      setValue(`themeCustomization` as any, {
                        colors: { ...(themeColors as Record<string, string>), [key]: e.target.value },
                      });
                    }}
                    className="flex-1 rounded-xl border border-gold/20 bg-white px-4 py-2 text-sm text-brown outline-none transition focus:border-brown"
                    placeholder={defaultColor}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Reset Colors */}
          <Button
            type="button"
            variant="outline"
            className="mt-6"
            onClick={() => setValue("themeCustomization" as any, { colors: {} })}
          >
            Reset Warna Default
          </Button>
        </div>
      )}

      {selectedTheme && (
        <div className="rounded-2xl border border-gold/15 bg-white p-6">
          <h3 className="mb-4 font-serif text-xl text-brown">Preview Tema</h3>
          <div className="flex aspect-video items-center justify-center rounded-xl bg-ivory">
            <p className="text-brown-light">
              Preview akan ditampilkan di sini
            </p>
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
