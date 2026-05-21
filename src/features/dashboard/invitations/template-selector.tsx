"use client";

import { useMemo, useState } from "react";
import { Eye, Search, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { DashboardTemplate } from "@/types/template";

const categories = ["all", "wedding", "birthday", "graduation"] as const;
const plans = ["all", "free", "premium"] as const;

interface TemplateSelectorProps {
  templates: DashboardTemplate[];
  selectedTemplateId?: string;
  onSelect: (template: DashboardTemplate) => void;
  onChangeTemplate?: (template: DashboardTemplate) => boolean;
  compact?: boolean;
}

export function TemplateSelector({
  templates,
  selectedTemplateId,
  onSelect,
  onChangeTemplate,
  compact = false,
}: TemplateSelectorProps) {
  const [category, setCategory] = useState<(typeof categories)[number]>("all");
  const [plan, setPlan] = useState<(typeof plans)[number]>("all");
  const [query, setQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<DashboardTemplate | null>(null);

  const recommended = useMemo(() => {
    const sorted = [...templates].sort((a, b) => b.usageCount - a.usageCount);
    return sorted.slice(0, 3).map((item) => item.id);
  }, [templates]);

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = category === "all" || template.category === category;
    const matchesPlan = plan === "all" || (plan === "premium" ? template.isPremium : !template.isPremium);
    const matchesQuery = template.name.toLowerCase().includes(query.toLowerCase());

    return matchesCategory && matchesPlan && matchesQuery;
  });

  const chooseTemplate = (template: DashboardTemplate) => {
    if (selectedTemplateId && selectedTemplateId !== template.id && onChangeTemplate) {
      const confirmed = onChangeTemplate(template);
      if (!confirmed) return;
    }

    if (!template.isActive) return;

    onSelect(template);
    setPreviewTemplate(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.26em] text-brown-light">Template Library</p>
          <h2 className="font-serif text-2xl text-brown">Pilih template undangan</h2>
        </div>
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brown-light" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari template..."
            className="h-11 w-full rounded-2xl border border-gold/20 bg-white pl-10 pr-4 text-sm outline-none focus:border-brown"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <Tabs value={category} onValueChange={(value) => setCategory(value as (typeof categories)[number])}>
          <TabsList className="flex-wrap justify-start rounded-2xl bg-muted/60 p-1">
            {categories.map((item) => (
              <TabsTrigger key={item} value={item} className="capitalize">
                {item === "all" ? "Semua" : item}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Tabs value={plan} onValueChange={(value) => setPlan(value as (typeof plans)[number])}>
          <TabsList className="flex-wrap justify-start rounded-2xl bg-muted/60 p-1">
            {plans.map((item) => (
              <TabsTrigger key={item} value={item} className="capitalize">
                {item === "all" ? "Semua Paket" : item}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className={cn("grid gap-4", compact ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4")}>
        {filteredTemplates.map((template) => {
          const colors = template.layout.colors ?? {};
          const gradient = template.layout.backgroundGradient;
          const selected = selectedTemplateId === template.id;
          const popular = template.usageCount > 0 && recommended.includes(template.id);
          const disabled = !template.isActive;

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => chooseTemplate(template)}
              disabled={disabled}
              className={cn(
                "group overflow-hidden rounded-[26px] border bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-sm",
                selected ? "border-brown ring-2 ring-brown/15" : "border-gold/15"
              )}
            >
              <div
                className="relative aspect-[4/3] p-4"
                style={{
                  background: gradient?.from && gradient?.to
                    ? `linear-gradient(145deg, ${gradient.from}, ${gradient.to})`
                    : colors.background || "#FAF7F2",
                  color: colors.text || "#2C2420",
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.45),transparent_42%)] transition group-hover:scale-110" />
                <div className="relative flex h-full flex-col justify-between rounded-[22px] border border-white/20 bg-white/25 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-white/65 px-3 py-1 text-xs font-medium capitalize text-brown">{template.category}</span>
                    <div className="flex gap-1">
                      {!template.isActive && <span className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">Draft</span>}
                      {popular && <span className="rounded-full bg-brown px-2 py-1 text-xs text-gold-light">Populer</span>}
                      {template.isPremium && <span className="rounded-full bg-gold px-2 py-1 text-xs text-brown">Premium</span>}
                    </div>
                  </div>
                  <div>
                    <div className="mb-3 flex gap-1.5">
                      {[colors.primary, colors.secondary, colors.background].filter(Boolean).map((color) => (
                        <span key={color} className="h-6 w-6 rounded-full border border-black/10" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                    <p className="font-serif text-2xl leading-tight">{template.name}</p>
                    <p className="mt-1 line-clamp-2 text-xs opacity-75">{template.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="text-xs text-brown-light">
                  {disabled ? "Publish dulu agar bisa dipakai" : `${template.layout.sections?.length ?? 0} section · dipakai ${template.usageCount}x`}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(event) => {
                    event.stopPropagation();
                    setPreviewTemplate(template);
                  }}
                >
                  <Eye className="size-4" />
                  Preview
                </Button>
              </div>
            </button>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="rounded-3xl border border-gold/15 bg-white p-10 text-center text-brown-light">
          Template tidak ditemukan.
        </div>
      )}

      <Dialog open={Boolean(previewTemplate)} onOpenChange={(open) => !open && setPreviewTemplate(null)}>
        <DialogContent className="max-w-5xl bg-[#120f0d] p-0 text-white">
          {previewTemplate && (
            <>
              <DialogHeader className="p-6 pb-0">
                <DialogTitle>{previewTemplate.name}</DialogTitle>
                <DialogDescription className="text-white/60">
                  {previewTemplate.category} · dipakai {previewTemplate.usageCount} undangan
                </DialogDescription>
              </DialogHeader>
              <div className="p-6 pt-4">
                <div
                  className="rounded-[28px] border border-white/10 p-6"
                  style={{
                    background: previewTemplate.layout.backgroundGradient?.from && previewTemplate.layout.backgroundGradient?.to
                      ? `linear-gradient(145deg, ${previewTemplate.layout.backgroundGradient.from}, ${previewTemplate.layout.backgroundGradient.to})`
                      : previewTemplate.layout.colors?.background || "#FAF7F2",
                    color: previewTemplate.layout.colors?.text || "#2C2420",
                  }}
                >
                  <div className="rounded-[24px] border border-white/15 bg-white/25 p-6 backdrop-blur-md">
                    <p className="text-xs uppercase tracking-[0.32em] opacity-60">The Wedding of</p>
                    <h3 className="mt-3 font-serif text-5xl" style={{ color: previewTemplate.layout.colors?.primary }}>
                      Rizky & Salsabila
                    </h3>
                    <p className="mt-2 text-sm opacity-75">Minggu, 21 Juni 2026 · Jakarta</p>
                    <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                      {(previewTemplate.layout.sections ?? []).map((section) => (
                        <div key={section} className="rounded-2xl border border-black/5 bg-white/45 p-4 backdrop-blur-sm">
                          <p className="font-medium capitalize">{section}</p>
                          <p className="mt-1 text-xs opacity-70">Section aktif di template ini.</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-end">
                      <Button type="button" onClick={() => chooseTemplate(previewTemplate)} className="bg-brown text-gold-light hover:bg-gold hover:text-brown">
                        <Sparkles className="size-4" />
                        {previewTemplate.isActive ? "Gunakan Template Ini" : "Template Masih Draft"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function SelectedTemplateSidebar({ template }: { template?: DashboardTemplate | null }) {
  if (!template) {
    return (
      <div className="rounded-3xl border border-dashed border-gold/30 bg-white/70 p-6 text-sm text-brown-light">
        Pilih template untuk melihat ringkasan layout dan section yang perlu diisi.
      </div>
    );
  }

  return (
    <div className="sticky top-6 space-y-4 rounded-3xl border border-gold/15 bg-white/80 p-5 shadow-[0_20px_60px_-40px_rgba(74,55,40,0.5)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-brown-light">Selected</p>
          <h3 className="mt-1 font-serif text-2xl text-brown">{template.name}</h3>
        </div>
        {template.usageCount > 0 && <Star className="size-5 fill-gold text-gold" />}
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-brown/10 px-3 py-1 text-xs capitalize text-brown">{template.category}</span>
        <span className="rounded-full bg-gold/20 px-3 py-1 text-xs text-brown">{template.isPremium ? "Premium" : "Free"}</span>
      </div>
      <div className="flex gap-2">
        {[template.layout.colors?.primary, template.layout.colors?.secondary, template.layout.colors?.background, template.layout.colors?.text]
          .filter(Boolean)
          .map((color) => (
            <span key={color} className="h-8 w-8 rounded-full border border-black/10" style={{ backgroundColor: color }} />
          ))}
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-brown">Section aktif</p>
        <div className="flex flex-wrap gap-2">
          {(template.layout.sections ?? []).map((section) => (
            <span key={section} className="rounded-full border border-gold/15 bg-white px-3 py-1 text-xs capitalize text-brown-light">
              {section}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
