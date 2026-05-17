"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";
import { FileUpload } from "@/components/ui/FileUpload";
import Image from "next/image";
import type { DashboardTemplate } from "@/types/template";

const invitationSchema = z.object({
  title: z.string().min(3, "Minimal 3 karakter"),
  brideName: z.string().min(2, "Minimal 2 karakter"),
  groomName: z.string().min(2, "Minimal 2 karakter"),
  templateId: z.string(),
  eventDate: z.string(),
  eventTime: z.string(),
  eventLocation: z.string().min(5, "Minimal 5 karakter"),
  googleMapsUrl: z.string().url().optional().or(z.literal("")),
  story: z.string().optional(),
});

type InvitationForm = z.infer<typeof invitationSchema>;

export default function CreateInvitationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [templates, setTemplates] = useState<DashboardTemplate[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [musicUrl, setMusicUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InvitationForm>({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      eventDate: new Date().toISOString().split("T")[0],
      eventTime: "10:00",
    },
  });

  useEffect(() => {
    async function loadTemplates() {
      try {
        const { data } = await axios.get<DashboardTemplate[]>("/api/templates");
        setTemplates(data);
        if (data[0]) setValue("templateId", data[0].id);
      } catch {
        toast.error("Gagal memuat template");
      } finally {
        setIsLoadingTemplates(false);
      }
    }

    loadTemplates();
  }, [setValue]);

  const onSubmit = async (data: InvitationForm) => {
    setIsSubmitting(true);
    try {
      await axios.post("/api/invitations", {
        ...data,
        eventDate: new Date(data.eventDate),
        gallery: galleryImages,
        musicUrl,
      });
      toast.success("Undangan berhasil dibuat!");
      router.push("/dashboard/invitations");
    } catch {
      toast.error("Gagal membuat undangan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-serif text-3xl text-brown mb-6">Buat Undangan Baru</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm text-brown mb-1">Judul Undangan</label>
          <input
            {...register("title")}
            className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold"
            placeholder="Wedding Rizky & Salsabila"
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        {/* Bride & Groom */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-brown mb-1">Nama Pengantin Wanita</label>
            <input {...register("brideName")} className="w-full px-4 py-2 border border-gold/20 rounded-lg" />
            {errors.brideName && <p className="text-xs text-red-500 mt-1">{errors.brideName.message}</p>}
          </div>
          <div>
            <label className="block text-sm text-brown mb-1">Nama Pengantin Pria</label>
            <input {...register("groomName")} className="w-full px-4 py-2 border border-gold/20 rounded-lg" />
            {errors.groomName && <p className="text-xs text-red-500 mt-1">{errors.groomName.message}</p>}
          </div>
        </div>

        {/* Template */}
        <div>
          <label className="block text-sm text-brown mb-1">Pilih Template</label>
          <select
            {...register("templateId")}
            disabled={isLoadingTemplates || templates.length === 0}
            className="w-full px-4 py-2 border border-gold/20 rounded-lg disabled:bg-brown/5"
          >
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} {t.isPremium ? "(Premium)" : "(Free)"}
              </option>
            ))}
          </select>
          {!isLoadingTemplates && templates.length === 0 && (
            <p className="mt-1 text-xs text-red-500">
              Belum ada template aktif. Buat template dulu di dashboard.
            </p>
          )}
        </div>

        {/* Event Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-brown mb-1">Tanggal Acara</label>
            <input {...register("eventDate")} type="date" className="w-full px-4 py-2 border border-gold/20 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm text-brown mb-1">Waktu Acara</label>
            <input {...register("eventTime")} type="time" className="w-full px-4 py-2 border border-gold/20 rounded-lg" />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm text-brown mb-1">Lokasi Acara</label>
          <input {...register("eventLocation")} className="w-full px-4 py-2 border border-gold/20 rounded-lg" />
        </div>

        {/* Google Maps URL */}
        <div>
          <label className="block text-sm text-brown mb-1">Google Maps URL (opsional)</label>
          <input {...register("googleMapsUrl")} className="w-full px-4 py-2 border border-gold/20 rounded-lg" />
        </div>

        {/* Gallery Upload */}
        <div>
          <label className="block text-sm text-brown mb-2">Galeri Foto</label>
          <FileUpload
            type="image"
            onUploadComplete={(url) => setGalleryImages([...galleryImages, url])}
          />
          <div className="flex gap-2 mt-3 flex-wrap">
            {galleryImages.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`Galeri ${idx + 1}`}
                width={80}
                height={80}
                className="h-20 w-20 rounded-lg object-cover"
              />
            ))}
          </div>
        </div>

        {/* Music Upload */}
        <div>
          <label className="block text-sm text-brown mb-2">Background Music (opsional)</label>
          <FileUpload type="music" onUploadComplete={setMusicUrl} existingUrl={musicUrl} onRemove={() => setMusicUrl("")} />
        </div>

        {/* Story */}
        <div>
          <label className="block text-sm text-brown mb-1">Kisah Cinta</label>
          <textarea {...register("story")} rows={5} className="w-full px-4 py-2 border border-gold/20 rounded-lg" />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || templates.length === 0}
          className="w-full py-3 bg-brown text-gold-light rounded-lg hover:bg-gold hover:text-brown transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Undangan"}
        </button>
      </form>
    </div>
  );
}
