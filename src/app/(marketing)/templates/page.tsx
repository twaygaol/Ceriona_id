"use client";

import { useEffect, useState } from "react";
import { Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { templateThemePresets } from "@/services/templateThemeService";

export default function TemplatesPage() {
  const themes = templateThemePresets;
  const [previewKey, setPreviewKey] = useState<string | null>(null);
  const previewTheme = themes.find((t) => t.key === previewKey);

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
                    <Button type="button" variant="outline" onClick={() => setPreviewKey(theme.key)}>
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={Boolean(previewTheme)} onOpenChange={(open) => !open && setPreviewKey(null)}>
        <DialogContent className="max-w-5xl bg-[#120f0d] p-0 text-white">
          {previewTheme && (
            <>
              <DialogHeader className="p-6 pb-0">
                <DialogTitle>{previewTheme.label}</DialogTitle>
                <DialogDescription className="text-white/60">{previewTheme.description}</DialogDescription>
              </DialogHeader>
              <div className="p-6 pt-4">
                <div className="overflow-hidden rounded-[28px] border border-white/10 p-6" style={{ background: previewTheme.preview, color: previewTheme.values.textColor }}>
                  <div className="rounded-[24px] border border-white/15 bg-white/15 p-6 text-center backdrop-blur-md">
                    <p className="text-xs uppercase tracking-[0.35em] opacity-60">{previewTheme.opening.eyebrow}</p>
                    <h3 className="mt-5 font-serif text-6xl leading-none">Ayla & Reza</h3>
                    <p className="mt-4 text-sm opacity-75">Preview tema undangan digital</p>
                    <div className="mt-8 flex justify-center">
                      <Button type="button" variant="outline" onClick={() => setPreviewKey(null)} className="border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                        Tutup
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
