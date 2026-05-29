"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HexColorPicker } from "react-colorful";
import {
  BadgeCheck,
  CalendarHeart,
  Check,
  Eye,
  GripVertical,
  ImageIcon,
  Info,
  LayoutTemplate,
  LoaderCircle,
  MessageCircleHeart,
  Palette,
  PartyPopper,
  Quote,
  Save,
  ScrollText,
  Sparkles,
  WandSparkles,
  Gift,
  Radio,
  Timer,
} from "lucide-react";
import { Cormorant_Garamond, DM_Sans, Great_Vibes, Inter, Montserrat, Playfair_Display, Poppins } from "next/font/google";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { templateThemePresets } from "@/services/templateThemeService";
import { templateCategories, type DashboardTemplate, type TemplateSection } from "@/types/template";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-poppins" });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-great-vibes" });

const formSchema = z.object({
  name: z.string().min(3, "Nama template minimal 3 karakter"),
  slug: z
    .string()
    .min(3, "Slug minimal 3 karakter")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Gunakan huruf kecil, angka, dan tanda hubung"),
  description: z.string().max(240, "Deskripsi maksimal 240 karakter").optional(),
  category: z.enum(templateCategories),
  isPremium: z.boolean(),
  isFeatured: z.boolean(),
  visualTheme: z.string().optional(),
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  secondaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  backgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  textColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  gradientFrom: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  gradientTo: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  headingFont: z.string().min(1),
  bodyFont: z.string().min(1),
  buttonStyle: z.enum(["solid", "outline", "rounded"]),
  borderRadius: z.enum(["0px", "4px", "8px", "16px", "24px"]),
});

type TemplateEditorValues = z.infer<typeof formSchema>;

type EditorMode = "create" | "edit";
type SubmitIntent = "draft" | "continue" | "publish";

interface TemplateEditorProps {
  mode: EditorMode;
  initialTemplate?: DashboardTemplate;
}

const stepLabels = [
  "Informasi Dasar",
  "Desain & Tema",
  "Layout & Sections",
  "Preview & Publish",
];

const fontOptions = {
  heading: [
    { value: "Cormorant Garamond", label: "Cormorant Garamond", category: "Serif", className: cormorant.className },
    { value: "Playfair Display", label: "Playfair Display", category: "Serif", className: playfair.className },
    { value: "Montserrat", label: "Montserrat", category: "Sans-serif", className: montserrat.className },
    { value: "Great Vibes", label: "Great Vibes", category: "Script", className: greatVibes.className },
  ],
  body: [
    { value: "DM Sans", label: "DM Sans", category: "Sans-serif", className: dmSans.className },
    { value: "Inter", label: "Inter", category: "Sans-serif", className: inter.className },
    { value: "Poppins", label: "Poppins", category: "Sans-serif", className: poppins.className },
    { value: "Cormorant Garamond", label: "Cormorant Garamond", category: "Serif", className: cormorant.className },
  ],
} as const;

const palettePresets = [
  {
    key: "soft",
    label: "Soft",
    description: "Cream, sage, dan nuansa hangat yang lembut.",
    colors: { primaryColor: "#6D5F53", secondaryColor: "#D6B98C", backgroundColor: "#F7F1E8", textColor: "#2C2420", gradientFrom: "#F8F4ED", gradientTo: "#E8DED0" },
  },
  {
    key: "elegant",
    label: "Elegant",
    description: "Nuansa editorial untuk undangan klasik premium.",
    colors: { primaryColor: "#3F3127", secondaryColor: "#C9A96E", backgroundColor: "#FAF7F2", textColor: "#241B16", gradientFrom: "#F8F2EA", gradientTo: "#E7D9C1" },
  },
  {
    key: "luxury",
    label: "Luxury",
    description: "Kontras gelap dengan aksen gold mewah.",
    colors: { primaryColor: "#181411", secondaryColor: "#D6B165", backgroundColor: "#221B18", textColor: "#F9F2E8", gradientFrom: "#2E2521", gradientTo: "#141110" },
  },
  {
    key: "romantic",
    label: "Romantic",
    description: "Dusty rose untuk kesan hangat dan intim.",
    colors: { primaryColor: "#875E61", secondaryColor: "#D7A1A7", backgroundColor: "#FFF7F7", textColor: "#3C2A2D", gradientFrom: "#FDEEF0", gradientTo: "#F6D7DB" },
  },
];

const visualThemePresets = templateThemePresets;

const categoryOptions = [
  { value: "wedding", label: "Wedding" },
  { value: "birthday", label: "Birthday" },
  { value: "graduation", label: "Graduation" },
  { value: "custom", label: "Custom" },
];

const sectionOptions: Array<{ value: TemplateSection; label: string; description: string; icon: typeof Sparkles }> = [
  { value: "opening", label: "Opening", description: "Layar pembuka dengan nama tamu dan CTA masuk.", icon: Sparkles },
  { value: "hero", label: "Hero", description: "Header utama untuk pasangan dan tanggal acara.", icon: LayoutTemplate },
  { value: "quote", label: "Quote", description: "Ayat, quote, atau pesan pembuka.", icon: Quote },
  { value: "countdown", label: "Countdown", description: "Hitung mundur menuju hari acara.", icon: Timer },
  { value: "story", label: "Story", description: "Timeline singkat perjalanan pasangan.", icon: ScrollText },
  { value: "gallery", label: "Gallery", description: "Grid atau slider foto unggulan.", icon: ImageIcon },
  { value: "event", label: "Event Details", description: "Detail akad, resepsi, lokasi, dan jam.", icon: CalendarHeart },
  { value: "rsvp", label: "RSVP Form", description: "Form konfirmasi kehadiran tamu.", icon: BadgeCheck },
  { value: "wishes", label: "Guest Wishes", description: "Daftar ucapan dan doa tamu.", icon: MessageCircleHeart },
  { value: "gift", label: "Gift", description: "Amplop digital atau info hadiah.", icon: Gift },
  { value: "live-streaming", label: "Live Streaming", description: "Link YouTube, Zoom, Meet, Instagram, atau live custom.", icon: Radio },
  { value: "footer", label: "Footer", description: "Penutup dan ucapan terima kasih.", icon: PartyPopper },
];

const defaultSections: TemplateSection[] = ["opening", "hero", "quote", "countdown", "story", "gallery", "event", "rsvp", "wishes", "gift", "live-streaming", "footer"];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function createDefaultValues(template?: DashboardTemplate): TemplateEditorValues {
  return {
    name: template?.name ?? "",
    slug: template?.slug ?? "",
    description: template?.description ?? "",
    category: (template?.category as TemplateEditorValues["category"]) ?? "wedding",
    isPremium: template?.isPremium ?? false,
    isFeatured: Boolean(template?.layout?.featured),
    visualTheme: template?.layout?.visualTheme,
    primaryColor: template?.layout?.colors?.primary ?? "#4A3728",
    secondaryColor: template?.layout?.colors?.secondary ?? "#C9A96E",
    backgroundColor: template?.layout?.colors?.background ?? "#FAF7F2",
    textColor: template?.layout?.colors?.text ?? "#2C2420",
    gradientFrom: (template?.layout as { backgroundGradient?: { from?: string } } | undefined)?.backgroundGradient?.from ?? template?.layout?.colors?.background ?? "#F8F2EA",
    gradientTo: (template?.layout as { backgroundGradient?: { to?: string } } | undefined)?.backgroundGradient?.to ?? template?.layout?.colors?.secondary ?? "#E7D9C1",
    headingFont: template?.layout?.fonts?.heading ?? "Cormorant Garamond",
    bodyFont: template?.layout?.fonts?.body ?? "DM Sans",
    buttonStyle: template?.styles?.buttonStyle ?? "solid",
    borderRadius: (template?.styles?.borderRadius as TemplateEditorValues["borderRadius"]) ?? "16px",
  };
}

function buildPayload(values: TemplateEditorValues, sections: TemplateSection[], isActive: boolean) {
  return {
    name: values.name,
    slug: values.slug,
    description: values.description,
    category: values.category,
    isPremium: values.isPremium,
    isActive,
    layout: {
      sections,
      featured: values.isFeatured,
      visualTheme: values.visualTheme,
      colors: {
        primary: values.primaryColor,
        secondary: values.secondaryColor,
        background: values.backgroundColor,
        text: values.textColor,
      },
      backgroundGradient: {
        from: values.gradientFrom,
        to: values.gradientTo,
      },
      fonts: {
        heading: values.headingFont,
        body: values.bodyFont,
      },
    },
    styles: {
      borderRadius: values.borderRadius,
      buttonStyle: values.buttonStyle,
    },
  };
}

function getFontClass(fontName: string) {
  return [...fontOptions.heading, ...fontOptions.body].find((item) => item.value === fontName)?.className ?? dmSans.className;
}

function SectionRow({
  section,
  enabled,
  onToggle,
}: {
  section: (typeof sectionOptions)[number];
  enabled: boolean;
  onToggle: (section: TemplateSection) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.value, disabled: !enabled });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition",
        enabled ? "shadow-[0_16px_40px_-28px_rgba(201,169,110,0.8)]" : "opacity-65",
        isDragging && "scale-[1.01] border-gold/50 bg-white/10 shadow-2xl"
      )}
    >
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-white/70 disabled:cursor-not-allowed"
        aria-label={`Atur urutan ${section.label}`}
        disabled={!enabled}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-4" />
      </button>
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-gold-light">
        <section.icon className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium text-white">{section.label}</p>
          <span title={section.description} className="text-white/40">
            <Info className="size-4" />
          </span>
        </div>
        <p className="text-sm text-white/55">{section.description}</p>
      </div>
      <button
        type="button"
        onClick={() => onToggle(section.value)}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-medium transition",
          enabled ? "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/30" : "bg-white/5 text-white/50 ring-1 ring-white/10"
        )}
      >
        {enabled ? "Visible" : "Hidden"}
      </button>
    </div>
  );
}

function TemplatePreview({ values, sections }: { values: TemplateEditorValues; sections: TemplateSection[] }) {
  const headingClass = getFontClass(values.headingFont);
  const bodyClass = getFontClass(values.bodyFont);

  return (
    <div className={cn("relative overflow-hidden rounded-[28px] border border-white/10 bg-black/20 p-4 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] backdrop-blur-xl", headingClass, bodyClass)}>
      <div
        className="overflow-hidden rounded-[24px] border border-white/10"
        style={{
          background: `linear-gradient(160deg, ${values.gradientFrom}, ${values.gradientTo})`,
          color: values.textColor,
          borderRadius: values.borderRadius,
        }}
      >
        <div className="space-y-4 p-5">
          <div className="rounded-3xl border border-white/15 bg-white/30 p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-current/60">Preview Template</p>
            <h3 className={cn("mt-3 text-3xl leading-none", headingClass)} style={{ color: values.primaryColor }}>
              Ayla & Reza
            </h3>
            <p className="mt-2 text-sm text-current/70">Sabtu, 12 Desember 2026 · The Manor Jakarta</p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                className={cn(
                  "px-4 py-2 text-sm transition",
                  values.buttonStyle === "outline" && "border bg-transparent",
                  values.buttonStyle === "rounded" && "rounded-full",
                  values.buttonStyle === "solid" && "rounded-xl",
                  values.buttonStyle !== "rounded" && values.buttonStyle !== "solid" && "rounded-xl border"
                )}
                style={{
                  backgroundColor: values.buttonStyle === "outline" ? "transparent" : values.primaryColor,
                  borderColor: values.primaryColor,
                  color: values.buttonStyle === "outline" ? values.primaryColor : values.backgroundColor,
                }}
              >
                Buka Undangan
              </button>
              <button
                type="button"
                className="rounded-xl border px-4 py-2 text-sm"
                style={{ borderColor: `${values.textColor}30`, color: values.textColor }}
              >
                RSVP
              </button>
            </div>
          </div>

          <div className="grid gap-3">
            {sections.map((section) => {
              const option = sectionOptions.find((item) => item.value === section);
              if (!option) return null;

              return (
                <div key={section} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white/55 p-3 backdrop-blur-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl" style={{ backgroundColor: `${values.secondaryColor}33`, color: values.primaryColor }}>
                    <option.icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{option.label}</p>
                    <p className="text-xs text-current/60">{option.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TemplateEditor({ mode, initialTemplate }: TemplateEditorProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSections, setSelectedSections] = useState<TemplateSection[]>(initialTemplate?.layout.sections?.length ? initialTemplate.layout.sections : defaultSections);
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const [colorHistory, setColorHistory] = useState<string[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [autoSlug, setAutoSlug] = useState(mode === "create");
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hydratedRef = useRef(false);

  const form = useForm<TemplateEditorValues>({
    resolver: zodResolver(formSchema),
    defaultValues: createDefaultValues(initialTemplate),
    mode: "onChange",
  });

  const values = useWatch({ control: form.control }) as TemplateEditorValues;
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (!hydratedRef.current) {
      hydratedRef.current = true;
      return;
    }

    setHasUnsavedChanges(true);
  }, [values, selectedSections]);

  useEffect(() => {
    if (!autoSlug) return;

    form.setValue("slug", slugify(values.name ?? ""), {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [autoSlug, form, values.name]);

  useEffect(() => {
    const slug = values.slug?.trim();
    if (!slug || slug.length < 3) {
      const timer = window.setTimeout(() => setSlugStatus("idle"), 0);
      return () => window.clearTimeout(timer);
    }

    if (mode === "edit" && slug === initialTemplate?.slug) {
      const timer = window.setTimeout(() => setSlugStatus("available"), 0);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(async () => {
      try {
        setSlugStatus("checking");
        const { data } = await axios.get<{ available: boolean }>("/api/templates/check-slug", {
          params: {
            slug,
            excludeId: initialTemplate?.id,
          },
        });
        setSlugStatus(data.available ? "available" : "taken");
      } catch {
        setSlugStatus("idle");
      }
    }, 450);

    return () => window.clearTimeout(timer);
  }, [values.slug, initialTemplate?.id, initialTemplate?.slug, mode]);

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) return;
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasUnsavedChanges]);

  const setPalette = (presetKey: string) => {
    const preset = palettePresets.find((item) => item.key === presetKey);
    if (!preset) return;

    for (const [key, value] of Object.entries(preset.colors)) {
      form.setValue(key as keyof TemplateEditorValues, value as never, { shouldDirty: true, shouldValidate: true });
    }
  };

  const applyVisualTheme = (presetKey: string) => {
    const preset = visualThemePresets.find((item) => item.key === presetKey);
    if (!preset) return;

    form.setValue("visualTheme", preset.key, { shouldDirty: true });
    for (const [key, value] of Object.entries(preset.values)) {
      form.setValue(key as keyof TemplateEditorValues, value as never, { shouldDirty: true, shouldValidate: true });
    }
    setSelectedSections(preset.sections);
  };

  const pushColorHistory = (color: string) => {
    setColorHistory((current) => [color, ...current.filter((item) => item !== color)].slice(0, 8));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSelectedSections((current) => {
      const oldIndex = current.indexOf(active.id as TemplateSection);
      const newIndex = current.indexOf(over.id as TemplateSection);
      if (oldIndex === -1 || newIndex === -1) return current;
      return arrayMove(current, oldIndex, newIndex);
    });
  };

  const toggleSection = (section: TemplateSection) => {
    setSelectedSections((current) => {
      if (current.includes(section)) {
        return current.filter((item) => item !== section);
      }

      const base = sectionOptions.map((item) => item.value);
      return base.filter((item) => current.includes(item) || item === section);
    });
  };

  const submitForm = async (intent: SubmitIntent, silent = false) => {
    const valid = await form.trigger();
    if (!valid) {
      if (!silent) toast.error("Periksa kembali field yang masih belum valid");
      return;
    }

    if (selectedSections.length === 0) {
      toast.error("Pilih minimal satu section");
      setCurrentStep(2);
      return;
    }

    if (slugStatus === "taken") {
      toast.error("Slug sudah digunakan, pilih slug lain");
      setCurrentStep(0);
      return;
    }

    setIsSaving(true);

    try {
      const payload = buildPayload(form.getValues(), selectedSections, intent === "publish");

      if (mode === "create") {
        await axios.post("/api/templates", payload);
      } else {
        await axios.put(`/api/templates/${initialTemplate?.id}`, payload);
      }

      setHasUnsavedChanges(false);
      setLastSavedAt(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));

      if (!silent) {
        if (intent === "draft") toast.success("Template disimpan sebagai draft");
        if (intent === "continue") toast.success("Perubahan berhasil disimpan");
        if (intent === "publish") toast.success(mode === "create" ? "Template berhasil dipublish" : "Template berhasil diperbarui dan dipublish");
      }

      if (intent === "publish" || intent === "draft") {
        router.push("/dashboard/templates");
        router.refresh();
      }
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.error as string | undefined)
        : undefined;

      if (!silent) toast.error(message ?? "Gagal menyimpan template");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!hasUnsavedChanges) return;

    autosaveTimerRef.current = setTimeout(() => {
      void (async () => {
        const valid = await form.trigger();
        if (!valid || selectedSections.length === 0 || slugStatus === "taken") return;

        setIsSaving(true);
        try {
          const payload = buildPayload(form.getValues(), selectedSections, false);

          if (mode === "create") {
            await axios.post("/api/templates", payload);
          } else {
            await axios.put(`/api/templates/${initialTemplate?.id}`, payload);
          }

          setHasUnsavedChanges(false);
          setLastSavedAt(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
        } catch {
          // Auto-save stays silent to avoid interrupting editing.
        } finally {
          setIsSaving(false);
        }
      })();
    }, 30000);

    return () => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    };
  }, [form, hasUnsavedChanges, initialTemplate?.id, mode, selectedSections, slugStatus, values]);

  const onSubmit = form.handleSubmit(async () => submitForm("publish"));

  const headingPreview = getFontClass(values.headingFont);
  const bodyPreview = getFontClass(values.bodyFont);

  return (
    <div className={cn("space-y-6", cormorant.variable, dmSans.variable, playfair.variable, inter.variable, montserrat.variable, poppins.variable, greatVibes.variable)}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-brown-light">Template Studio</p>
          <h1 className="font-serif text-3xl text-brown">{mode === "create" ? "Buat Template Baru" : "Edit Template"}</h1>
          <p className="mt-1 text-sm text-brown-light">Flow baru yang lebih cepat untuk desain, layout, preview, dan publish.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-gold/15 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
          <span className="text-sm text-brown-light">{lastSavedAt ? `Saved ${lastSavedAt}` : "Belum pernah disimpan"}</span>
          <Button type="button" variant="outline" onClick={() => void submitForm("draft")} disabled={isSaving}>
            Save as Draft
          </Button>
          <Button type="button" variant="outline" onClick={() => void submitForm("continue")} disabled={isSaving}>
            <Save className="size-4" />
            Save & Continue
          </Button>
          <Button type="submit" form="template-editor-form" disabled={isSaving} className="bg-brown text-gold-light hover:bg-gold hover:text-brown">
            {isSaving ? <LoaderCircle className="size-4 animate-spin" /> : <WandSparkles className="size-4" />}
            Publish
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-6">
          <Card className="border-gold/15 bg-white/75 shadow-[0_20px_60px_-40px_rgba(74,55,40,0.5)] backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Stepper</CardTitle>
              <CardDescription>Empat langkah untuk membuat flow admin yang lebih jelas dan premium.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-4">
                {stepLabels.map((label, index) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setCurrentStep(index)}
                    className={cn(
                      "rounded-2xl border p-4 text-left transition",
                      currentStep === index
                        ? "border-brown bg-brown text-gold-light shadow-lg"
                        : "border-gold/15 bg-white/70 text-brown hover:border-gold/40 hover:bg-white"
                    )}
                  >
                    <p className="text-xs uppercase tracking-[0.25em] opacity-70">Langkah {index + 1}</p>
                    <p className="mt-2 font-medium">{label}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <form id="template-editor-form" onSubmit={onSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {currentStep === 0 && (
                  <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle>Pilih Tema & Informasi Dasar</CardTitle>
                      <CardDescription>Pilih mood visual dulu, lalu isi identitas template. Tema akan mengatur warna, font, style, dan section default.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div className="grid gap-4 lg:grid-cols-3">
                        {visualThemePresets.map((preset) => {
                          const active = values.visualTheme === preset.key;

                          return (
                            <button
                              key={preset.key}
                              type="button"
                              onClick={() => applyVisualTheme(preset.key)}
                              className={cn(
                                "overflow-hidden rounded-3xl border bg-white text-left transition hover:-translate-y-1 hover:shadow-xl",
                                active ? "border-brown ring-2 ring-brown/15" : "border-gold/15"
                              )}
                            >
                              <div className="relative h-40 p-4 text-white" style={{ background: preset.preview }}>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.22),transparent_42%)]" />
                                <div className="relative flex h-full flex-col justify-between rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                                  <p className="text-xs uppercase tracking-[0.28em] text-white/60">Wedding Theme</p>
                                  <div>
                                    <p className="font-serif text-3xl leading-none">Ayla & Reza</p>
                                    <p className="mt-2 text-xs text-white/65">Opening · Hero · RSVP</p>
                                  </div>
                                </div>
                              </div>
                              <div className="p-4">
                                <p className="font-medium text-brown">{preset.label}</p>
                                <p className="mt-1 text-sm leading-6 text-brown-light">{preset.description}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <Field label="Nama template" error={form.formState.errors.name?.message}>
                        <input
                          {...form.register("name")}
                          className="h-11 w-full rounded-2xl border border-gold/20 bg-white px-4 outline-none ring-0 transition focus:border-brown"
                          placeholder="Elegant Wedding Editorial"
                        />
                      </Field>

                      <div className="grid gap-5 md:grid-cols-2">
                        <Field label="Slug" error={form.formState.errors.slug?.message}>
                          <div className="space-y-2">
                            <input
                              {...form.register("slug", {
                                onChange: () => setAutoSlug(false),
                              })}
                              className="h-11 w-full rounded-2xl border border-gold/20 bg-white px-4 outline-none transition focus:border-brown"
                              placeholder="elegant-wedding-editorial"
                              disabled={initialTemplate?.isDefault}
                            />
                            <p className="text-xs text-brown-light">
                              {slugStatus === "checking" && "Memeriksa ketersediaan slug..."}
                              {slugStatus === "available" && "Slug tersedia"}
                              {slugStatus === "taken" && "Slug sudah digunakan"}
                              {slugStatus === "idle" && "Gunakan slug unik agar template mudah dikenali."}
                            </p>
                          </div>
                        </Field>

                        <Field label="Kategori">
                          <select
                            {...form.register("category")}
                            className="h-11 w-full rounded-2xl border border-gold/20 bg-white px-4 outline-none transition focus:border-brown"
                          >
                            {categoryOptions.map((item) => (
                              <option key={item.value} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>

                      <Field label="Deskripsi" error={form.formState.errors.description?.message}>
                        <textarea
                          {...form.register("description")}
                          rows={4}
                          className="w-full rounded-2xl border border-gold/20 bg-white px-4 py-3 outline-none transition focus:border-brown"
                          placeholder="Template clean dengan gaya editorial, nuansa hangat, dan struktur section lengkap."
                        />
                      </Field>

                      <div className="grid gap-3 md:grid-cols-2">
                        <ToggleRow
                          title="Premium"
                          description="Labelkan template untuk paket premium."
                          checked={values.isPremium}
                          onChange={(next) => form.setValue("isPremium", next, { shouldDirty: true })}
                        />
                        <ToggleRow
                          title="Featured"
                          description="Pin template ke area highlighted di homepage admin."
                          checked={values.isFeatured}
                          onChange={(next) => form.setValue("isFeatured", next, { shouldDirty: true })}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
                      <CardHeader>
                        <CardTitle>Color System</CardTitle>
                        <CardDescription>Palet warna, riwayat custom color, dan gradient background.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                          <ColorField label="Primary" value={values.primaryColor} onChange={(color) => form.setValue("primaryColor", color, { shouldDirty: true, shouldValidate: true })} onCommit={pushColorHistory} />
                          <ColorField label="Secondary" value={values.secondaryColor} onChange={(color) => form.setValue("secondaryColor", color, { shouldDirty: true, shouldValidate: true })} onCommit={pushColorHistory} />
                          <ColorField label="Background" value={values.backgroundColor} onChange={(color) => form.setValue("backgroundColor", color, { shouldDirty: true, shouldValidate: true })} onCommit={pushColorHistory} />
                          <ColorField label="Text" value={values.textColor} onChange={(color) => form.setValue("textColor", color, { shouldDirty: true, shouldValidate: true })} onCommit={pushColorHistory} />
                        </div>

                        <div className="rounded-3xl border border-gold/15 bg-[#111111] p-4 text-white">
                          <div className="mb-4 flex items-center justify-between">
                            <div>
                              <p className="font-medium">Gradient Background</p>
                              <p className="text-sm text-white/60">Pilih dua warna untuk hero background atau card preview.</p>
                            </div>
                            <Palette className="size-5 text-gold-light" />
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <ColorField label="Gradient From" value={values.gradientFrom} onChange={(color) => form.setValue("gradientFrom", color, { shouldDirty: true, shouldValidate: true })} onCommit={pushColorHistory} dark />
                            <ColorField label="Gradient To" value={values.gradientTo} onChange={(color) => form.setValue("gradientTo", color, { shouldDirty: true, shouldValidate: true })} onCommit={pushColorHistory} dark />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <p className="text-sm font-medium text-brown">Rekomendasi Palette</p>
                          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                            {palettePresets.map((preset) => (
                              <button
                                key={preset.key}
                                type="button"
                                onClick={() => setPalette(preset.key)}
                                className="rounded-3xl border border-gold/15 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg"
                              >
                                <div className="mb-3 flex gap-2">
                                  {Object.values(preset.colors).slice(0, 4).map((color, i) => (
                                    <span key={`${color}-${i}`} className="h-8 w-8 rounded-full border border-black/5" style={{ backgroundColor: color }} />
                                  ))}
                                </div>
                                <p className="font-medium text-brown">{preset.label}</p>
                                <p className="mt-1 text-sm text-brown-light">{preset.description}</p>
                              </button>
                            ))}
                          </div>
                        </div>

                        {colorHistory.length > 0 && (
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-brown">Custom Color History</p>
                            <div className="flex flex-wrap gap-2">
                              {colorHistory.map((color) => (
                                <button
                                  key={color}
                                  type="button"
                                  title={color}
                                  className="h-10 w-10 rounded-full border border-black/10"
                                  style={{ backgroundColor: color }}
                                  onClick={() => form.setValue("primaryColor", color, { shouldDirty: true, shouldValidate: true })}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
                      <CardHeader>
                        <CardTitle>Typography & Style</CardTitle>
                        <CardDescription>Google Fonts preview live untuk heading dan body, plus style tombol.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Tabs defaultValue="heading" className="gap-4">
                          <TabsList variant="default" className="w-full justify-start overflow-auto rounded-2xl bg-muted/60 p-1">
                            <TabsTrigger value="heading">Heading Font</TabsTrigger>
                            <TabsTrigger value="body">Body Font</TabsTrigger>
                            <TabsTrigger value="style">Button & Radius</TabsTrigger>
                          </TabsList>

                          <TabsContent value="heading" className="space-y-3">
                            {fontOptions.heading.map((font) => (
                              <button
                                key={font.value}
                                type="button"
                                onClick={() => form.setValue("headingFont", font.value, { shouldDirty: true })}
                                className={cn(
                                  "flex w-full items-start justify-between rounded-2xl border p-4 text-left transition",
                                  values.headingFont === font.value ? "border-brown bg-brown/5" : "border-gold/15 bg-white"
                                )}
                              >
                                <div>
                                  <p className="text-xs uppercase tracking-[0.25em] text-brown-light">{font.category}</p>
                                  <p className={cn("mt-2 text-3xl text-brown", font.className)}>The Wedding of Ayla & Reza</p>
                                </div>
                                {values.headingFont === font.value && <Check className="size-4 text-brown" />}
                              </button>
                            ))}
                          </TabsContent>

                          <TabsContent value="body" className="space-y-3">
                            {fontOptions.body.map((font) => (
                              <button
                                key={font.value}
                                type="button"
                                onClick={() => form.setValue("bodyFont", font.value, { shouldDirty: true })}
                                className={cn(
                                  "flex w-full items-start justify-between rounded-2xl border p-4 text-left transition",
                                  values.bodyFont === font.value ? "border-brown bg-brown/5" : "border-gold/15 bg-white"
                                )}
                              >
                                <div>
                                  <p className="text-xs uppercase tracking-[0.25em] text-brown-light">{font.category}</p>
                                  <p className={cn("mt-2 text-base text-brown", font.className)}>Kehadiran Anda akan membuat momen istimewa ini semakin bermakna bagi kami.</p>
                                </div>
                                {values.bodyFont === font.value && <Check className="size-4 text-brown" />}
                              </button>
                            ))}
                          </TabsContent>

                          <TabsContent value="style" className="space-y-5">
                            <div className="grid gap-3 md:grid-cols-3">
                              {(["solid", "outline", "rounded"] as const).map((style) => (
                                <button
                                  key={style}
                                  type="button"
                                  onClick={() => form.setValue("buttonStyle", style, { shouldDirty: true })}
                                  className={cn(
                                    "rounded-2xl border p-4 text-left transition",
                                    values.buttonStyle === style ? "border-brown bg-brown text-gold-light" : "border-gold/15 bg-white text-brown"
                                  )}
                                >
                                  <p className="font-medium capitalize">{style}</p>
                                  <p className="mt-2 text-sm opacity-75">Button preview untuk CTA utama template.</p>
                                </button>
                              ))}
                            </div>

                            <Field label="Border Radius">
                              <select
                                {...form.register("borderRadius")}
                                className="h-11 w-full rounded-2xl border border-gold/20 bg-white px-4 outline-none transition focus:border-brown"
                              >
                                <option value="0px">Sharp</option>
                                <option value="4px">Subtle</option>
                                <option value="8px">Rounded</option>
                                <option value="16px">Premium Rounded</option>
                                <option value="24px">Soft Capsule</option>
                              </select>
                            </Field>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {currentStep === 2 && (
                  <Card className="border-gold/15 bg-[#16120f] text-white backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="text-white">Layout & Sections</CardTitle>
                      <CardDescription className="text-white/60">Drag-and-drop untuk atur urutan section dan toggle visibilitas tiap block.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={selectedSections} strategy={verticalListSortingStrategy}>
                          <div className="space-y-3">
                            {sectionOptions
                              .slice()
                              .sort((a, b) => {
                                const aIndex = selectedSections.indexOf(a.value);
                                const bIndex = selectedSections.indexOf(b.value);
                                return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
                              })
                              .map((section) => (
                                <SectionRow
                                  key={section.value}
                                  section={section}
                                  enabled={selectedSections.includes(section.value)}
                                  onToggle={toggleSection}
                                />
                              ))}
                          </div>
                        </SortableContext>
                      </DndContext>
                      {selectedSections.length === 0 && <p className="text-sm text-red-300">Minimal satu section harus aktif.</p>}
                    </CardContent>
                  </Card>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
                      <CardHeader>
                        <CardTitle>Preview & Publish</CardTitle>
                        <CardDescription>Review cepat sebelum template masuk ke katalog aktif.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                          <SummaryItem label="Category" value={values.category} />
                          <SummaryItem label="Status" value={values.isPremium ? "Premium" : "Free"} />
                          <SummaryItem label="Featured" value={values.isFeatured ? "Pinned" : "Standard"} />
                          <SummaryItem label="Sections" value={`${selectedSections.length} aktif`} />
                        </div>

                        <div className="rounded-3xl border border-gold/15 bg-gradient-to-br from-white to-[#f7efe6] p-5">
                          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                              <p className="text-sm uppercase tracking-[0.28em] text-brown-light">Ready to Publish</p>
                              <h3 className={cn("mt-2 text-4xl text-brown", headingPreview)}>{values.name || "Untitled Template"}</h3>
                              <p className={cn("mt-2 text-brown-light", bodyPreview)}>{values.description || "Tambahkan deskripsi singkat agar admin lain memahami positioning template ini."}</p>
                            </div>
                            <Button type="button" variant="outline" onClick={() => setPreviewOpen(true)}>
                              <Eye className="size-4" />
                              Preview Full
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <TemplatePreview values={values} sections={selectedSections} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between gap-3">
              <Button type="button" variant="outline" disabled={currentStep === 0} onClick={() => setCurrentStep((step) => Math.max(step - 1, 0))}>
                Back
              </Button>
              <Button type="button" variant="outline" disabled={currentStep === stepLabels.length - 1} onClick={() => setCurrentStep((step) => Math.min(step + 1, stepLabels.length - 1))}>
                Continue
              </Button>
            </div>
          </form>
        </div>

        <div className="xl:sticky xl:top-6 xl:self-start">
          <Card className="overflow-hidden border-gold/15 bg-[#120f0d] text-white shadow-[0_30px_90px_-50px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Live Preview</CardTitle>
              <CardDescription className="text-white/60">Perubahan warna, font, dan section tampil langsung tanpa reload.</CardDescription>
            </CardHeader>
            <CardContent>
              <TemplatePreview values={values} sections={selectedSections} />
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl bg-[#120f0d] p-0 text-white">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Full Preview</DialogTitle>
            <DialogDescription className="text-white/60">Preview penuh untuk mengecek ritme visual sebelum publish.</DialogDescription>
          </DialogHeader>
          <div className="p-6 pt-4">
            <TemplatePreview values={values} sections={selectedSections} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-brown">{label}</span>
      {children}
      {error ? <span className="text-xs text-red-500">{error}</span> : null}
    </label>
  );
}

function ToggleRow({ title, description, checked, onChange }: { title: string; description: string; checked: boolean; onChange: (next: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "flex items-center justify-between rounded-2xl border p-4 text-left transition",
        checked ? "border-brown bg-brown text-gold-light" : "border-gold/15 bg-white text-brown"
      )}
    >
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm opacity-75">{description}</p>
      </div>
      <div className={cn("h-6 w-11 rounded-full p-1 transition", checked ? "bg-gold" : "bg-black/10")}>
        <div className={cn("h-4 w-4 rounded-full bg-white transition", checked && "translate-x-5")} />
      </div>
    </button>
  );
}

function ColorField({
  label,
  value,
  onChange,
  onCommit,
  dark = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onCommit: (value: string) => void;
  dark?: boolean;
}) {
  return (
    <div className={cn("space-y-3 rounded-3xl border p-4", dark ? "border-white/10 bg-white/5" : "border-gold/15 bg-white") }>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className={cn("text-sm font-medium", dark ? "text-white" : "text-brown")}>{label}</p>
          <p className={cn("text-xs", dark ? "text-white/55" : "text-brown-light")}>{value}</p>
        </div>
        <span className="h-10 w-10 rounded-2xl border border-black/10" style={{ backgroundColor: value }} />
      </div>
      <div onMouseUp={() => onCommit(value)}>
        <HexColorPicker color={value} onChange={onChange} />
      </div>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={() => onCommit(value)}
        className={cn("h-10 w-full rounded-2xl border bg-transparent px-3 font-mono text-sm uppercase outline-none", dark ? "border-white/10 text-white" : "border-gold/15 text-brown")}
      />
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/15 bg-white p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-brown-light">{label}</p>
      <p className="mt-2 text-lg font-medium text-brown">{value}</p>
    </div>
  );
}
