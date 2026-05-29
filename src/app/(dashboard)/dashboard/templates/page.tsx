"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Copy, Edit, Eye, Pin, Plus, Sparkles, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { DashboardTemplate } from "@/types/template";

const categories = ["all", "wedding", "birthday", "graduation", "custom"] as const;

function buildDuplicateSlug(baseSlug: string, existingSlugs: string[]) {
  let counter = 1;
  let next = `${baseSlug}-copy-${counter}`;

  while (existingSlugs.includes(next)) {
    counter += 1;
    next = `${baseSlug}-copy-${counter}`;
  }

  return next;
}

export default function TemplatesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const routeBase = pathname.startsWith("/admin") ? "/admin/templates" : "/dashboard/templates";
  const [templates, setTemplates] = useState<DashboardTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("all");
  const [previewTemplate, setPreviewTemplate] = useState<DashboardTemplate | null>(null);

  const loadTemplates = useCallback(async () => {
    try {
      const { data } = await axios.get<DashboardTemplate[]>("/api/templates?includeInactive=true");
      setTemplates(data);
    } catch {
      toast.error("Gagal memuat template");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadTemplates);
  }, [loadTemplates]);

  const handleDuplicate = async (template: DashboardTemplate) => {
    try {
      const nextSlug = buildDuplicateSlug(template.slug, templates.map((item) => item.slug));
      await axios.post("/api/templates", {
        name: `${template.name} (Copy)`,
        slug: nextSlug,
        description: template.description,
        category: template.category,
        layout: template.layout,
        styles: template.styles,
        isPremium: template.isPremium,
        isActive: false,
      });
      toast.success("Template berhasil diduplikasi");
      loadTemplates();
    } catch {
      toast.error("Gagal menduplikasi template");
    }
  };

  const handleDelete = async (id: string, isDefault: boolean) => {
    if (isDefault) {
      toast.error("Template default tidak bisa dihapus");
      return;
    }
    
    if (confirm("Yakin ingin menghapus template ini?")) {
      try {
        await axios.delete(`/api/templates/${id}`);
        toast.success("Template berhasil dihapus");
        loadTemplates();
      } catch {
        toast.error("Gagal menghapus template");
      }
    }
  };

  const visibleTemplates = templates.filter((template) =>
    selectedCategory === "all" ? true : template.category === selectedCategory
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-serif text-3xl text-brown">Kelola Template</h1>
          <p className="text-brown-light mt-1">Buat dan kelola template undangan</p>
        </div>
        <Button
          onClick={() => router.push(`${routeBase}/create`)}
          className="bg-brown text-gold-light hover:bg-gold hover:text-brown"
        >
          <Plus size={18} />
          <span>Buat Template Baru</span>
        </Button>
      </div>

      <Card className="border-gold/15 bg-white/75 shadow-[0_18px_60px_-40px_rgba(74,55,40,0.45)] backdrop-blur-xl">
        <CardContent className="flex flex-col gap-5 py-6">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-brown-light">Template Categories</p>
              <h2 className="font-serif text-2xl text-brown">Filter katalog template</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-gold/15 bg-white/80 px-3 py-2 text-sm text-brown-light">
              <Sparkles className="size-4 text-gold" />
              {templates.length} template tersedia
            </div>
          </div>

          <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as (typeof categories)[number])}>
            <TabsList className="w-full flex-wrap justify-start rounded-2xl bg-muted/60 p-1">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="text-center py-20">Memuat template...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleTemplates.map((template) => {
            const colors = template.layout?.colors ?? {};
            const gradient = (template.layout as { backgroundGradient?: { from?: string; to?: string } } | undefined)?.backgroundGradient;

            return (
            <div
              key={template.id}
              className="group overflow-hidden rounded-[28px] border border-gold/15 bg-white/70 shadow-[0_20px_60px_-35px_rgba(74,55,40,0.35)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_28px_70px_-30px_rgba(74,55,40,0.45)]"
            >
              <div 
                className="relative aspect-[4/3] cursor-pointer overflow-hidden p-5"
                style={{ 
                  background: gradient?.from && gradient?.to
                    ? `linear-gradient(145deg, ${gradient.from}, ${gradient.to})`
                    : colors.background || "#FAF7F2",
                  color: colors.text || "#2C2420",
                }}
                onClick={() => setPreviewTemplate(template)}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.45),transparent_40%)]" />
                <div className="relative flex h-full flex-col justify-between rounded-[24px] border border-white/20 bg-white/25 p-5 backdrop-blur-md">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-flex rounded-full border border-black/5 bg-white/50 px-3 py-1 text-xs font-medium capitalize backdrop-blur-sm">
                        {template.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {template.layout && (template.layout as { featured?: boolean }).featured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-brown px-2.5 py-1 text-xs text-gold-light">
                          <Pin className="size-3.5" />
                          Featured
                        </span>
                      )}
                      {template.isDefault && (
                        <div className="rounded-full bg-white/60 p-2 text-gold backdrop-blur-sm">
                          <Star size={16} className="fill-current" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="mb-4 flex gap-2">
                      {[colors.primary, colors.secondary, colors.background, colors.text]
                        .filter(Boolean)
                        .slice(0, 4)
                        .map((color, i) => (
                          <span
                            key={`${color}-${i}`}
                            className="h-8 w-8 rounded-full border border-black/10 shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                    </div>
                    <div className="font-serif text-2xl leading-tight">{template.name}</div>
                    <div className="mt-2 text-sm opacity-75">{template.description || "Template invitation premium untuk pengalaman admin yang rapi."}</div>
                    <div className="mt-5 grid grid-cols-2 gap-3 text-xs opacity-75">
                      <div>
                        <div className="uppercase tracking-[0.2em]">Sections</div>
                        <div className="mt-1 text-sm font-medium opacity-100">{template.layout.sections?.length ?? 0}</div>
                      </div>
                      <div>
                        <div className="uppercase tracking-[0.2em]">Status</div>
                        <div className="mt-1 text-sm font-medium opacity-100">{template.isActive ? "Published" : "Draft"}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className={cn("rounded-full px-3 py-1 text-xs font-medium", template.isPremium ? "bg-gold text-brown" : "bg-white/70 text-brown")}>{template.isPremium ? "Premium" : "Free"}</span>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      setPreviewTemplate(template);
                    }}
                    className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-black/15 px-3 py-1 text-xs text-white backdrop-blur-sm"
                  >
                    <Eye className="size-3.5" />
                    Preview Full
                  </button>
                </div>
              </div>

              <div className="p-5">
                <p className="mb-4 line-clamp-2 text-sm text-brown-light">
                  {template.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-brown-light">
                    Digunakan {template.usageCount} kali
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDuplicate(template)}
                      className="rounded-xl p-2 text-brown-light transition-colors hover:bg-brown/5 hover:text-gold"
                      title="Duplikat"
                    >
                      <Copy size={16} />
                    </button>
                    <button
                      onClick={() => router.push(`${routeBase}/${template.id}/edit`)}
                      className="rounded-xl p-2 text-brown-light transition-colors hover:bg-brown/5 hover:text-gold"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    {!template.isDefault && (
                      <button
                        onClick={() => handleDelete(template.id, template.isDefault)}
                        className="rounded-xl p-2 text-brown-light transition-colors hover:bg-red-50 hover:text-red-500"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )})}
        </div>
      )}

      <Dialog open={Boolean(previewTemplate)} onOpenChange={(open) => !open && setPreviewTemplate(null)}>
        <DialogContent className="max-w-5xl bg-[#120f0d] p-0 text-white">
          {previewTemplate && (
            <>
              <DialogHeader className="p-6 pb-0">
                <DialogTitle>{previewTemplate.name}</DialogTitle>
                <DialogDescription className="text-white/60">
                  Full preview card untuk evaluasi visual template sebelum edit atau publish.
                </DialogDescription>
              </DialogHeader>
              <div className="p-6 pt-4">
                <div
                  className="overflow-hidden rounded-[28px] border border-white/10 p-6"
                  style={{
                    background: (() => {
                      const gradient = (previewTemplate.layout as { backgroundGradient?: { from?: string; to?: string } })?.backgroundGradient;
                      if (gradient?.from && gradient?.to) {
                        return `linear-gradient(145deg, ${gradient.from}, ${gradient.to})`;
                      }
                      return previewTemplate.layout.colors?.background || "#FAF7F2";
                    })(),
                    color: previewTemplate.layout.colors?.text || "#2C2420",
                  }}
                >
                  <div className="rounded-[24px] border border-white/15 bg-white/20 p-6 backdrop-blur-md">
                    <div className="mb-6 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] opacity-60">Template Preview</p>
                        <h3 className="mt-2 font-serif text-4xl">{previewTemplate.name}</h3>
                      </div>
                      <Button variant="outline" onClick={() => router.push(`${routeBase}/${previewTemplate.id}/edit`)}>
                        Edit Template
                      </Button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                      {(previewTemplate.layout.sections ?? []).map((section) => (
                        <div key={section} className="rounded-2xl border border-black/5 bg-white/45 p-4 backdrop-blur-sm">
                          <p className="text-sm font-semibold capitalize">{section}</p>
                          <p className="mt-1 text-xs opacity-70">Section aktif pada template ini.</p>
                        </div>
                      ))}
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
