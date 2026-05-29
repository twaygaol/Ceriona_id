"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Eye, Monitor, Smartphone } from "lucide-react";
import { FileUpload } from "@/components/ui/FileUpload";
import { MusicPicker } from "@/components/ui/MusicPicker";
import { Button } from "@/components/ui/button";
import { TemplateSelector } from "@/features/dashboard/invitations/template-selector";
import { SectionRenderer } from "@/components/templates/SectionRenderer";
import type { DashboardTemplate, TemplateSection } from "@/types/template";

const invitationSchema = z.object({
  title: z.string().min(3, "Minimal 3 karakter"),
  brideName: z.string().min(2, "Minimal 2 karakter"),
  groomName: z.string().min(2, "Minimal 2 karakter"),
  templateId: z.string().min(1, "Pilih template"),
  eventDate: z.string().min(1, "Tanggal wajib diisi"),
  eventTime: z.string().min(1, "Waktu wajib diisi"),
  eventLocation: z.string().min(5, "Minimal 5 karakter"),
  googleMapsUrl: z.string().url("URL tidak valid").optional().or(z.literal("")),
  story: z.string().optional(),
  giftBankName: z.string().optional(),
  giftAccountNumber: z.string().optional(),
  giftAccountName: z.string().optional(),
});

type InvitationFormValues = z.infer<typeof invitationSchema>;

export interface EditableInvitation {
  id: string;
  title: string;
  brideName: string;
  groomName: string;
  templateId: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  googleMapsUrl?: string | null;
  story?: string | null;
  musicUrl?: string | null;
  gallery?: Array<{ url: string }>;
}

interface VisualBuilderProps {
  mode: "create" | "edit";
  initialInvitation?: EditableInvitation;
}

function formatDateInput(value?: string) {
  if (!value) return new Date().toISOString().split("T")[0];
  return new Date(value).toISOString().split("T")[0];
}

function hasSection(template: DashboardTemplate | null, section: TemplateSection) {
  return template?.layout.sections?.includes(section) ?? false;
}

export function VisualBuilder({ mode, initialInvitation }: VisualBuilderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [templates, setTemplates] = useState<DashboardTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<DashboardTemplate | null>(null);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>(initialInvitation?.gallery?.map((item) => item.url) ?? []);
  const [musicUrl, setMusicUrl] = useState(initialInvitation?.musicUrl ?? "");
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop">("mobile");
  const [previewVisible, setPreviewVisible] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InvitationFormValues>({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      title: initialInvitation?.title ?? "",
      brideName: initialInvitation?.brideName ?? "",
      groomName: initialInvitation?.groomName ?? "",
      templateId: initialInvitation?.templateId ?? "",
      eventDate: formatDateInput(initialInvitation?.eventDate),
      eventTime: initialInvitation?.eventTime ?? "10:00",
      eventLocation: initialInvitation?.eventLocation ?? "",
      googleMapsUrl: initialInvitation?.googleMapsUrl ?? "",
      story: initialInvitation?.story ?? "",
    },
  });

  const watchedValues = watch();

  const autoSaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string>("");

  useEffect(() => {
    if (mode !== "edit" || !initialInvitation?.id) return;

    if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);

    autoSaveTimeoutRef.current = setTimeout(async () => {
      const snapshot = JSON.stringify({ ...watchedValues, musicUrl, galleryImages });
      if (snapshot === lastSavedRef.current) return;
      try {
        await axios.put(`/api/invitations/${initialInvitation.id}`, {
          ...watchedValues,
          eventDate: new Date(watchedValues.eventDate),
          gallery: hasSection(selectedTemplate, "gallery") ? galleryImages : [],
          musicUrl,
          story: hasSection(selectedTemplate, "story") ? watchedValues.story : "",
        });
        lastSavedRef.current = snapshot;
      } catch {
        /* silent autosave failure */
      }
    }, 2500);

    return () => {
      if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
    };
  }, [watchedValues, musicUrl, galleryImages, mode, initialInvitation?.id, selectedTemplate]);

  useEffect(() => {
    async function loadTemplates() {
      try {
        const { data } = await axios.get<DashboardTemplate[]>("/api/templates?includeInactive=true");
        setTemplates(data);

        const activeTemplates = data.filter((template) => template.isActive);
        const requestedTheme = searchParams.get("theme");
        const themeMatchedTemplate = requestedTheme
          ? activeTemplates.find((template) => template.layout.visualTheme === requestedTheme)
          : null;
        const initialTemplate =
          activeTemplates.find((template) => template.id === initialInvitation?.templateId) ??
          themeMatchedTemplate ??
          activeTemplates[0] ??
          null;
        if (initialTemplate) {
          setSelectedTemplate(initialTemplate);
          setValue("templateId", initialTemplate.id);
        }
      } catch {
        toast.error("Gagal memuat template");
      } finally {
        setIsLoadingTemplates(false);
      }
    }

    loadTemplates();
  }, [initialInvitation?.templateId, searchParams, setValue]);

  const previewData = useMemo(() => ({
    id: initialInvitation?.id ?? "preview",
    slug: "preview",
    brideName: watchedValues.brideName || "Nama Wanita",
    groomName: watchedValues.groomName || "Nama Pria",
    templateId: watchedValues.templateId,
    eventDate: watchedValues.eventDate ? new Date(watchedValues.eventDate) : new Date(),
    eventTime: watchedValues.eventTime || "10:00",
    eventLocation: watchedValues.eventLocation || "Lokasi Acara",
    googleMapsUrl: watchedValues.googleMapsUrl || "",
    story: watchedValues.story || "Kisah cinta kami dimulai dari sebuah pertemuan yang tidak terduga...",
    gallery: galleryImages.length > 0 ? galleryImages : [],
    heroImage: galleryImages[0],
    musicUrl: musicUrl,
  }), [watchedValues, galleryImages, musicUrl, initialInvitation?.id]);

  const sections = useMemo(() => {
    return selectedTemplate?.layout.sections?.length
      ? selectedTemplate.layout.sections
      : (["hero", "event", "rsvp"] satisfies TemplateSection[]);
  }, [selectedTemplate]);

  const selectTemplate = (template: DashboardTemplate) => {
    setSelectedTemplate(template);
    setValue("templateId", template.id, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (data: InvitationFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        eventDate: new Date(data.eventDate),
        gallery: hasSection(selectedTemplate, "gallery") ? galleryImages : [],
        musicUrl,
        story: hasSection(selectedTemplate, "story") ? data.story : "",
      };

      if (mode === "create") {
        await axios.post("/api/invitations", payload);
        toast.success("Undangan berhasil dibuat!");
      } else {
        await axios.put(`/api/invitations/${initialInvitation?.id}`, payload);
        toast.success("Undangan berhasil diperbarui!");
      }

      router.push("/dashboard/invitations");
      router.refresh();
    } catch {
      toast.error(mode === "create" ? "Gagal membuat undangan" : "Gagal memperbarui undangan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Panel — Settings */}
      <AnimatePresence>
        {sidebarVisible && (
          <motion.div
            initial={{ width: 0, opacity: 0, minWidth: 0 }}
            animate={{ width: "auto", opacity: 1, minWidth: 420 }}
            exit={{ width: 0, opacity: 0, minWidth: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col overflow-y-auto border-r border-gold/15 bg-white/50 backdrop-blur-xl"
          >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gold/15 bg-white/80 px-5 py-3 backdrop-blur-xl">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-brown-light hover:text-brown">
            <ArrowLeft className="size-4" />
            <span>Kembali</span>
          </button>
          <button
            onClick={() => setPreviewVisible((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-gold/20 px-3 py-1.5 text-xs text-brown transition hover:border-gold/50 lg:hidden"
          >
            <Eye className="size-3.5" />
            {previewVisible ? "Sembunyikan" : "Preview"}
          </button>
        </div>

        <div className="flex-1 space-y-5 p-5">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-brown-light">Kelola Undangan</p>
            <h1 className="font-serif text-2xl text-brown">{mode === "create" ? "Buat Undangan Baru" : "Edit Undangan"}</h1>
          </div>

          {/* Template Selector */}
          <section className="rounded-xl border border-gold/15 bg-white/80 p-4 backdrop-blur-xl">
            <h3 className="mb-3 text-sm font-medium text-brown">Template</h3>
            {isLoadingTemplates ? (
              <div className="py-6 text-center text-sm text-brown-light">Memuat template...</div>
            ) : (
              <TemplateSelector
                templates={templates}
                selectedTemplateId={selectedTemplate?.id}
                onSelect={selectTemplate}
                onChangeTemplate={(template) => {
                  if (mode !== "edit" || window.confirm("Mengganti template akan mereset beberapa data. Lanjutkan?")) {
                    selectTemplate(template);
                    return true;
                  }
                  return false;
                }}
                compact
              />
            )}
          </section>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <input type="hidden" {...register("templateId")} />

            <section className="rounded-xl border border-gold/15 bg-white/80 p-4 backdrop-blur-xl">
              <h3 className="mb-3 text-sm font-medium text-brown">Informasi Utama</h3>
              <div className="space-y-3">
                <Field label="Judul Undangan" error={errors.title?.message}>
                  <input {...register("title")} className="input-premium" placeholder="Wedding Rizky & Salsabila" />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Nama Wanita" error={errors.brideName?.message}>
                    <input {...register("brideName")} className="input-premium" />
                  </Field>
                  <Field label="Nama Pria" error={errors.groomName?.message}>
                    <input {...register("groomName")} className="input-premium" />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Tanggal" error={errors.eventDate?.message}>
                    <input {...register("eventDate")} type="date" className="input-premium" />
                  </Field>
                  <Field label="Waktu" error={errors.eventTime?.message}>
                    <input {...register("eventTime")} type="time" className="input-premium" />
                  </Field>
                </div>
                <Field label="Lokasi" error={errors.eventLocation?.message}>
                  <input {...register("eventLocation")} className="input-premium" />
                </Field>
                <Field label="Google Maps URL" error={errors.googleMapsUrl?.message}>
                  <input {...register("googleMapsUrl")} className="input-premium" placeholder="https://maps.google.com/..." />
                </Field>
              </div>
            </section>

            {hasSection(selectedTemplate, "story") && (
              <section className="rounded-xl border border-gold/15 bg-white/80 p-4 backdrop-blur-xl">
                <h3 className="mb-3 text-sm font-medium text-brown">Kisah Cinta</h3>
                <textarea {...register("story")} rows={4} className="input-premium min-h-24 py-3" />
              </section>
            )}

            {hasSection(selectedTemplate, "gallery") && (
              <section className="rounded-xl border border-gold/15 bg-white/80 p-4 backdrop-blur-xl">
                <h3 className="mb-3 text-sm font-medium text-brown">Galeri Foto</h3>
                <FileUpload type="image" onUploadComplete={(url) => setGalleryImages((current) => [...current, url])} />
                {galleryImages.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {galleryImages.map((img, idx) => (
                      <Image key={img} src={img} alt={`Galeri ${idx + 1}`} width={64} height={64} className="h-16 w-16 rounded-lg object-cover" />
                    ))}
                  </div>
                )}
              </section>
            )}

            {hasSection(selectedTemplate, "gift") && (
              <section className="rounded-xl border border-gold/15 bg-white/80 p-4 backdrop-blur-xl">
                <h3 className="mb-3 text-sm font-medium text-brown">Wedding Gift</h3>
                <div className="space-y-3">
                  <Field label="Bank">
                    <input {...register("giftBankName")} className="input-premium" placeholder="BCA" />
                  </Field>
                  <Field label="No. Rekening">
                    <input {...register("giftAccountNumber")} className="input-premium" />
                  </Field>
                  <Field label="Nama">
                    <input {...register("giftAccountName")} className="input-premium" />
                  </Field>
                </div>
              </section>
            )}

            <section className="rounded-xl border border-gold/15 bg-white/80 p-4 backdrop-blur-xl">
              <h3 className="mb-3 text-sm font-medium text-brown">Musik</h3>
              <MusicPicker value={musicUrl} onChange={setMusicUrl} />
            </section>

            <Button type="submit" disabled={isSubmitting || !selectedTemplate || !selectedTemplate.isActive} className="h-12 w-full bg-brown text-gold-light hover:bg-gold hover:text-brown">
              {isSubmitting ? "Menyimpan..." : mode === "create" ? "Simpan Undangan" : "Simpan Perubahan"}
            </Button>
          </form>
        </div>
      </motion.div>
        )}
      </AnimatePresence>

      {/* Right Panel — Live Preview */}
      <AnimatePresence>
        {previewVisible && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-1 flex-col bg-[#0D0D0D]"
          >
            {/* Preview Toolbar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-black/60 px-4 py-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSidebarVisible((v) => !v)}
                  className="rounded-lg p-2 text-xs text-white/40 transition hover:bg-white/10 hover:text-white/70"
                  title={sidebarVisible ? "Sembunyikan sidebar" : "Tampilkan sidebar"}
                >
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {sidebarVisible ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    )}
                  </svg>
                </button>
                <div className="h-4 w-px bg-white/10" />
                <button
                  onClick={() => setPreviewDevice("mobile")}
                  className={`rounded-lg p-2 text-xs transition ${previewDevice === "mobile" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}
                >
                  <Smartphone className="size-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice("desktop")}
                  className={`rounded-lg p-2 text-xs transition ${previewDevice === "desktop" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}
                >
                  <Monitor className="size-4" />
                </button>
              </div>
              <span className="text-xs text-white/30">Live Preview</span>
            </div>

            {/* Preview Area — iframe loading real invitation route */}
            <div ref={previewRef} className="flex flex-1 items-center justify-center overflow-hidden bg-[#0D0D0D] p-4">
              {selectedTemplate ? (
                <div
                  className={`relative transition-all duration-200 ${
                    previewDevice === "mobile"
                      ? "h-[780px] w-[390px] shrink-0 rounded-[3rem] border-[4px] border-[#222] bg-[#000] shadow-2xl"
                      : "h-full w-full max-w-4xl"
                  }`}
                >
                  {/* Phone notch + dynamic island */}
                  {previewDevice === "mobile" && (
                    <>
                      <div className="absolute left-1/2 top-0 z-20 h-[30px] w-[120px] -translate-x-1/2 rounded-b-2xl bg-[#000]" />
                      <div className="absolute left-1/2 top-[10px] z-20 h-[14px] w-[14px] -translate-x-1/2 rounded-full bg-[#222]" />
                    </>
                  )}

                  {/* Phone side buttons */}
                  {previewDevice === "mobile" && (
                    <>
                      <div className="absolute left-[-6px] top-[140px] z-10 h-[50px] w-[4px] rounded-r bg-[#333]" />
                      <div className="absolute left-[-6px] top-[200px] z-10 h-[60px] w-[4px] rounded-r bg-[#333]" />
                      <div className="absolute right-[-6px] top-[160px] z-10 h-[70px] w-[4px] rounded-l bg-[#333]" />
                    </>
                  )}

                  {/* Iframe loading real preview route with proper viewport */}
                  <iframe
                    key={`${previewDevice}-${watchedValues.templateId}-${watchedValues.brideName}-${watchedValues.groomName}`}
                    src={`/preview/builder?device=${previewDevice}&data=${encodeURIComponent(JSON.stringify({
                      ...previewData,
                      template: selectedTemplate,
                      sections,
                    }))}`}
                    className={`h-full w-full border-0 bg-white ${
                      previewDevice === "mobile"
                        ? "rounded-[2.6rem]"
                        : "rounded-2xl border border-white/10 shadow-2xl"
                    }`}
                    title="Preview"
                    sandbox="allow-same-origin allow-scripts"
                  />
                </div>
              ) : (
                <div className="flex h-96 items-center justify-center text-white/40">
                  Pilih template untuk melihat preview
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-brown">{label}</span>
      {children}
      {error ? <span className="text-xs text-red-500">{error}</span> : null}
    </label>
  );
}
