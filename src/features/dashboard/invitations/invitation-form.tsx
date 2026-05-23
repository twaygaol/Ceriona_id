"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectedTemplateSidebar, TemplateSelector } from "@/features/dashboard/invitations/template-selector";
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

interface InvitationFormProps {
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

export function InvitationForm({ mode, initialInvitation }: InvitationFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [templates, setTemplates] = useState<DashboardTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<DashboardTemplate | null>(null);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>(initialInvitation?.gallery?.map((item) => item.url) ?? []);
  const [musicUrl, setMusicUrl] = useState(initialInvitation?.musicUrl ?? "");

  const {
    register,
    handleSubmit,
    setValue,
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

  const recommendedTemplates = useMemo(() => {
    if (!selectedTemplate) return templates.slice(0, 3);
    return templates
      .filter((template) => template.category === selectedTemplate.category && template.id !== selectedTemplate.id)
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, 3);
  }, [selectedTemplate, templates]);

  const selectTemplate = (template: DashboardTemplate) => {
    setSelectedTemplate(template);
    setValue("templateId", template.id, { shouldValidate: true, shouldDirty: true });
  };

  const confirmTemplateChange = () => {
    if (mode !== "edit") return true;
    return window.confirm("Mengganti template akan mereset beberapa data yang tidak sesuai dengan template baru. Lanjutkan?");
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
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-brown-light">Kelola Undangan</p>
        <h1 className="font-serif text-3xl text-brown">{mode === "create" ? "Buat Undangan Baru" : "Edit Undangan"}</h1>
        <p className="mt-1 text-sm text-brown-light">Template yang aktif di admin langsung tersedia untuk dipakai user.</p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-8">
          <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Template</CardTitle>
              <CardDescription>Pilih template aktif dari database sebelum mengisi detail undangan.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingTemplates ? (
                <div className="py-12 text-center text-brown-light">Memuat template...</div>
              ) : (
                <TemplateSelector
                  templates={templates}
                  selectedTemplateId={selectedTemplate?.id}
                  onSelect={selectTemplate}
                  onChangeTemplate={(template) => {
                    const confirmed = confirmTemplateChange();
                    if (confirmed) selectTemplate(template);
                    return confirmed;
                  }}
                />
              )}
              {!isLoadingTemplates && templates.length > 0 && !templates.some((template) => template.isActive) && (
                <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  Semua template masih draft. Publish template terlebih dahulu di Kelola Template agar bisa digunakan untuk membuat undangan.
                </p>
              )}
            </CardContent>
          </Card>

          {recommendedTemplates.length > 0 && (
            <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Recommended Templates</CardTitle>
                <CardDescription>Rekomendasi berdasarkan kategori dan template yang paling sering digunakan.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {recommendedTemplates.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => selectTemplate(template)}
                      className="rounded-full border border-gold/15 bg-white px-4 py-2 text-sm text-brown transition hover:border-brown"
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Informasi Utama</CardTitle>
                <CardDescription>Field dasar selalu ditampilkan karena dibutuhkan semua template.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <input type="hidden" {...register("templateId")} />

                <Field label="Judul Undangan" error={errors.title?.message}>
                  <input {...register("title")} className="input-premium" placeholder="Wedding Rizky & Salsabila" />
                </Field>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Nama Pengantin Wanita" error={errors.brideName?.message}>
                    <input {...register("brideName")} className="input-premium" />
                  </Field>
                  <Field label="Nama Pengantin Pria" error={errors.groomName?.message}>
                    <input {...register("groomName")} className="input-premium" />
                  </Field>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Tanggal Acara" error={errors.eventDate?.message}>
                    <input {...register("eventDate")} type="date" className="input-premium" />
                  </Field>
                  <Field label="Waktu Acara" error={errors.eventTime?.message}>
                    <input {...register("eventTime")} type="time" className="input-premium" />
                  </Field>
                </div>

                <Field label="Lokasi Acara" error={errors.eventLocation?.message}>
                  <input {...register("eventLocation")} className="input-premium" />
                </Field>

                <Field label="Google Maps URL" error={errors.googleMapsUrl?.message}>
                  <input {...register("googleMapsUrl")} className="input-premium" placeholder="https://maps.google.com/..." />
                </Field>
              </CardContent>
            </Card>

            {hasSection(selectedTemplate, "story") && (
              <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Kisah Cinta</CardTitle>
                  <CardDescription>Muncul karena template memiliki section Story.</CardDescription>
                </CardHeader>
                <CardContent>
                  <textarea {...register("story")} rows={5} className="input-premium min-h-32 py-3" />
                </CardContent>
              </Card>
            )}

            {hasSection(selectedTemplate, "gallery") && (
              <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Galeri Foto</CardTitle>
                  <CardDescription>Muncul karena template memiliki section Gallery.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload type="image" onUploadComplete={(url) => setGalleryImages((current) => [...current, url])} />
                  <div className="mt-3 flex flex-wrap gap-2">
                    {galleryImages.map((img, idx) => (
                      <Image key={img} src={img} alt={`Galeri ${idx + 1}`} width={80} height={80} className="h-20 w-20 rounded-lg object-cover" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {hasSection(selectedTemplate, "gift") && (
              <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Wedding Gift</CardTitle>
                  <CardDescription>Muncul karena template memiliki section Gift. Data ini siap dipetakan ke model saat backend diperluas.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                  <Field label="Bank">
                    <input {...register("giftBankName")} className="input-premium" placeholder="BCA" />
                  </Field>
                  <Field label="Nomor Rekening">
                    <input {...register("giftAccountNumber")} className="input-premium" />
                  </Field>
                  <Field label="Nama Pemilik">
                    <input {...register("giftAccountName")} className="input-premium" />
                  </Field>
                </CardContent>
              </Card>
            )}

            <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Media Tambahan</CardTitle>
                <CardDescription>Musik tetap opsional untuk semua template.</CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload type="music" onUploadComplete={setMusicUrl} existingUrl={musicUrl} onRemove={() => setMusicUrl("")} />
              </CardContent>
            </Card>

            <Button type="submit" disabled={isSubmitting || !selectedTemplate || !selectedTemplate.isActive} className="h-12 w-full bg-brown text-gold-light hover:bg-gold hover:text-brown">
              {isSubmitting ? "Menyimpan..." : mode === "create" ? "Simpan Undangan" : "Simpan Perubahan"}
            </Button>
          </form>
        </div>

        <SelectedTemplateSidebar template={selectedTemplate} />
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-brown">{label}</span>
      {children}
      {error ? <span className="text-xs text-red-500">{error}</span> : null}
    </label>
  );
}
