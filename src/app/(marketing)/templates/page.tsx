"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getRegistryPresets } from "@/services/themeRegistryAdapter";
import { ThemeRenderer } from "@/features/invitation/renderer/ThemeRenderer";
import type { DashboardTemplate, TemplateSection } from "@/types/template";

const registryPresets = getRegistryPresets();
const themes = registryPresets;
const registryKeys = new Set(registryPresets.map((t) => t.key));

export default function TemplatesPage() {
  const router = useRouter();
  const [previewKey, setPreviewKey] = useState<string | null>(null);
  const previewTheme = themes.find((t) => t.key === previewKey);

  const openPreview = useCallback((themeKey: string) => {
    const theme = themes.find((t) => t.key === themeKey);
    if (!theme) return;
    setPreviewKey(themeKey);
  }, []);

  return (
    <main className="overflow-hidden bg-[#fffaf4] text-[#241A16]">
      <section className="px-4 py-24 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B99A62]">Koleksi Tema</p>
            <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-7xl">Pilih Tema Undangan</h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#6F5A4E]">
              Setiap tema dirancang dengan detail visual yang elegan. Preview langsung untuk melihat tampilan di perangkat.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {themes.map((theme) => (
              <div key={theme.key} className="group overflow-hidden rounded-[2.2rem] border border-[#241A16]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative aspect-[4/5] p-5" style={{ background: theme.preview, color: theme.values.textColor }}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.28),transparent_34%)]" />
                  <div className="relative flex h-full flex-col justify-between rounded-[1.6rem] border border-white/20 bg-white/10 p-5 text-center backdrop-blur-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">{theme.values.isPremium ? "Premium" : "Free"}</span>
                      <span className="rounded-full bg-black/15 px-3 py-1 text-xs capitalize backdrop-blur">{theme.values.category}</span>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] opacity-60">{theme.opening.eyebrow}</p>
                      <p className="mt-5 font-serif text-5xl leading-none">Ayla & Reza</p>
                      <p className="mt-3 text-sm opacity-70">12 Des 2026 · Jakarta</p>
                    </div>
                    <div className="mx-auto h-px w-24" style={{ backgroundColor: theme.values.secondaryColor }} />
                  </div>
                </div>
                <div className="space-y-4 p-5">
                  <div>
                    <h3 className="font-serif text-2xl">{theme.label}</h3>
                    <p className="mt-1 text-sm text-[#6F5A4E]">{theme.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#8A672D]">
                    <Eye className="size-3.5" /> Preview dan pilih tema
                  </div>
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => openPreview(theme.key)}>
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={Boolean(previewTheme)} onOpenChange={(open) => { if (!open) setPreviewKey(null); }}>
        <DialogContent className="max-w-5xl bg-[#0D0D0D] p-0 text-white">
          <DialogHeader className="sr-only">
            <DialogTitle>{previewTheme?.label || "Preview Tema"}</DialogTitle>
            <DialogDescription>Preview tema undangan</DialogDescription>
          </DialogHeader>
          {previewTheme && (
            <div className="flex h-[90vh] flex-col">
              <div className="flex items-center justify-between border-b border-white/10 bg-black/60 px-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="ml-2 text-sm font-medium text-white/80">{previewTheme.label}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    onClick={() => router.push(`/dashboard/invitations/create?theme=${previewTheme.key}`)}
                    className="bg-brown text-gold-light hover:bg-gold hover:text-brown"
                  >
                    <Sparkles className="size-4" />
                    Gunakan Template Ini
                  </Button>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center overflow-hidden bg-[#0D0D0D] p-4">
                <div className="h-full w-full overflow-y-auto rounded-2xl bg-white">
                  <ThemeRenderer
                    themeId={previewTheme.key}
                    invitation={{
                      brideName: "Ayla",
                      groomName: "Reza",
                      eventDate: new Date("2026-12-12"),
                      eventTime: "10:00",
                      eventLocation: "Jakarta",
                      story: "Kisah cinta kami dimulai dari sebuah pertemuan yang tidak terduga...",
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
