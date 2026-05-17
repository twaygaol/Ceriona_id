"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import {
  templateSections,
  type DashboardTemplate,
  type TemplateSection,
} from "@/types/template";

const sectionOptions: { value: TemplateSection; label: string }[] = [
  { value: "opening", label: "Opening Screen" },
  { value: "hero", label: "Hero / Cover" },
  { value: "quote", label: "Quote / Ayat" },
  { value: "countdown", label: "Countdown Timer" },
  { value: "story", label: "Kisah Cinta" },
  { value: "gallery", label: "Galeri Foto" },
  { value: "event", label: "Detail Acara" },
  { value: "rsvp", label: "Form RSVP" },
  { value: "wishes", label: "Ucapan Tamu" },
  { value: "gift", label: "Wedding Gift" },
  { value: "footer", label: "Footer" },
];

interface TemplateForm {
  name: string;
  slug: string;
  description?: string;
  category: "wedding" | "birthday" | "graduation";
  isPremium: "true" | "false";
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  buttonStyle: "solid" | "outline" | "rounded";
  borderRadius: string;
}

export default function EditTemplatePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [selectedSections, setSelectedSections] = useState<TemplateSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDefault, setIsDefault] = useState(false);

  const { register, handleSubmit, reset } = useForm<TemplateForm>();

  useEffect(() => {
    async function loadTemplate() {
      try {
        const { data } = await axios.get<DashboardTemplate>(`/api/templates/${params.id}`);
        setIsDefault(data.isDefault);
        setSelectedSections(data.layout.sections ?? ["hero", "event", "rsvp"]);
        reset({
          name: data.name,
          slug: data.slug,
          description: data.description ?? "",
          category: data.category as TemplateForm["category"],
          isPremium: data.isPremium ? "true" : "false",
          primaryColor: data.layout.colors?.primary ?? "#4A3728",
          secondaryColor: data.layout.colors?.secondary ?? "#C9A96E",
          backgroundColor: data.layout.colors?.background ?? "#FAF7F2",
          textColor: data.layout.colors?.text ?? "#2C2420",
          headingFont: data.layout.fonts?.heading ?? "Cormorant Garamond",
          bodyFont: data.layout.fonts?.body ?? "DM Sans",
          buttonStyle: data.styles?.buttonStyle ?? "solid",
          borderRadius: data.styles?.borderRadius ?? "8px",
        });
      } catch {
        toast.error("Gagal memuat template");
        router.push("/dashboard/templates");
      } finally {
        setIsLoading(false);
      }
    }

    loadTemplate();
  }, [params.id, reset, router]);

  const toggleSection = (section: TemplateSection) => {
    setSelectedSections((current) =>
      current.includes(section)
        ? current.filter((item) => item !== section)
        : [...current, section]
    );
  };

  const onSubmit = async (data: TemplateForm) => {
    if (selectedSections.length === 0) {
      toast.error("Pilih minimal satu section");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.put(`/api/templates/${params.id}`, {
        name: data.name,
        slug: data.slug,
        description: data.description,
        category: data.category,
        isPremium: data.isPremium === "true",
        layout: {
          sections: selectedSections.filter((section) => templateSections.includes(section)),
          colors: {
            primary: data.primaryColor,
            secondary: data.secondaryColor,
            background: data.backgroundColor,
            text: data.textColor,
          },
          fonts: {
            heading: data.headingFont,
            body: data.bodyFont,
          },
        },
        styles: {
          borderRadius: data.borderRadius,
          buttonStyle: data.buttonStyle,
        },
      });
      toast.success("Template berhasil diperbarui");
      router.push("/dashboard/templates");
    } catch {
      toast.error("Gagal memperbarui template");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="py-20 text-center">Memuat template...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 font-serif text-3xl text-brown">Edit Template</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-lg border border-gold/20 bg-white p-6">
          <h2 className="mb-4 font-serif text-xl text-brown">Informasi Dasar</h2>
          <div className="space-y-4">
            <input {...register("name", { required: true })} className="w-full rounded-lg border border-gold/20 px-4 py-2" placeholder="Nama template" />
            <input {...register("slug", { required: true })} className="w-full rounded-lg border border-gold/20 px-4 py-2" placeholder="slug-template" disabled={isDefault} />
            <textarea {...register("description")} rows={3} className="w-full rounded-lg border border-gold/20 px-4 py-2" placeholder="Deskripsi" />
            <div className="grid grid-cols-2 gap-4">
              <select {...register("category")} className="rounded-lg border border-gold/20 px-4 py-2">
                <option value="wedding">Wedding / Pernikahan</option>
                <option value="birthday">Birthday / Ulang Tahun</option>
                <option value="graduation">Graduation / Wisuda</option>
              </select>
              <select {...register("isPremium")} className="rounded-lg border border-gold/20 px-4 py-2">
                <option value="false">Free</option>
                <option value="true">Premium</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gold/20 bg-white p-6">
          <h2 className="mb-4 font-serif text-xl text-brown">Tema</h2>
          <div className="grid grid-cols-2 gap-4">
            <input {...register("primaryColor")} type="color" className="h-10 w-full rounded border border-gold/20" />
            <input {...register("secondaryColor")} type="color" className="h-10 w-full rounded border border-gold/20" />
            <input {...register("backgroundColor")} type="color" className="h-10 w-full rounded border border-gold/20" />
            <input {...register("textColor")} type="color" className="h-10 w-full rounded border border-gold/20" />
          </div>
        </div>

        <div className="rounded-lg border border-gold/20 bg-white p-6">
          <h2 className="mb-4 font-serif text-xl text-brown">Section</h2>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {sectionOptions.map((section) => (
              <label key={section.value} className="flex items-center gap-2 text-sm text-brown">
                <input
                  type="checkbox"
                  checked={selectedSections.includes(section.value)}
                  onChange={() => toggleSection(section.value)}
                />
                {section.label}
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gold/20 bg-white p-6">
          <h2 className="mb-4 font-serif text-xl text-brown">Style</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <select {...register("buttonStyle")} className="rounded-lg border border-gold/20 px-4 py-2">
              <option value="solid">Solid</option>
              <option value="outline">Outline</option>
              <option value="rounded">Rounded</option>
            </select>
            <select {...register("borderRadius")} className="rounded-lg border border-gold/20 px-4 py-2">
              <option value="0px">Sharp</option>
              <option value="4px">Default</option>
              <option value="8px">Rounded</option>
              <option value="16px">Extra Rounded</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-brown py-3 text-gold-light transition-colors hover:bg-gold hover:text-brown disabled:opacity-50"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}
