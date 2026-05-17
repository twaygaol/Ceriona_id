"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import type { TemplateSection } from "@/types/template";

const sectionOptions: { value: TemplateSection; label: string }[] = [
  { value: "hero", label: "Hero / Cover" },
  { value: "opening", label: "Opening Screen" },
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

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function CreateTemplatePage() {
  const router = useRouter();
  const [selectedSections, setSelectedSections] = useState<TemplateSection[]>(["hero", "event", "rsvp"]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit } = useForm<TemplateForm>({
    defaultValues: {
      category: "wedding",
      isPremium: "false",
      primaryColor: "#4A3728",
      secondaryColor: "#C9A96E",
      backgroundColor: "#FAF7F2",
      textColor: "#2C2420",
      headingFont: "Cormorant Garamond",
      bodyFont: "DM Sans",
      buttonStyle: "solid",
      borderRadius: "8px",
    },
  });

  const toggleSection = (section: TemplateSection) => {
    if (selectedSections.includes(section)) {
      setSelectedSections(selectedSections.filter((s) => s !== section));
    } else {
      setSelectedSections([...selectedSections, section]);
    }
  };

  const onSubmit = async (data: TemplateForm) => {
    if (selectedSections.length === 0) {
      toast.error("Pilih minimal satu section");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post("/api/templates", {
        name: data.name,
        slug: slugify(data.name),
        description: data.description,
        category: data.category,
        isPremium: data.isPremium === "true",
        layout: {
          sections: selectedSections,
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
      toast.success("Template berhasil dibuat!");
      router.push("/dashboard/templates");
    } catch {
      toast.error("Gagal membuat template");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-serif text-3xl text-brown mb-6">Buat Template Baru</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-lg border border-gold/20 p-6">
          <h2 className="font-serif text-xl text-brown mb-4">Informasi Dasar</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-brown mb-1">Nama Template</label>
              <input
                {...register("name", { required: true })}
                className="w-full px-4 py-2 border border-gold/20 rounded-lg"
                placeholder="Contoh: Elegant Wedding v2"
              />
            </div>

            <div>
              <label className="block text-sm text-brown mb-1">Deskripsi</label>
              <textarea
                {...register("description")}
                rows={3}
                className="w-full px-4 py-2 border border-gold/20 rounded-lg"
                placeholder="Deskripsi singkat tentang template ini"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-brown mb-1">Kategori</label>
                <select {...register("category")} className="w-full px-4 py-2 border border-gold/20 rounded-lg">
                  <option value="wedding">Wedding / Pernikahan</option>
                  <option value="birthday">Birthday / Ulang Tahun</option>
                  <option value="graduation">Graduation / Wisuda</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-brown mb-1">Status</label>
                <select {...register("isPremium")} className="w-full px-4 py-2 border border-gold/20 rounded-lg">
                  <option value="false">Free (Semua user)</option>
                  <option value="true">Premium (Berbayar)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Color Theme */}
        <div className="bg-white rounded-lg border border-gold/20 p-6">
          <h2 className="font-serif text-xl text-brown mb-4">Tema Warna</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-brown mb-1">Primary Color</label>
              <input {...register("primaryColor")} type="color" className="w-full h-10 rounded border border-gold/20" />
            </div>
            <div>
              <label className="block text-sm text-brown mb-1">Secondary Color</label>
              <input {...register("secondaryColor")} type="color" className="w-full h-10 rounded border border-gold/20" />
            </div>
            <div>
              <label className="block text-sm text-brown mb-1">Background Color</label>
              <input {...register("backgroundColor")} type="color" className="w-full h-10 rounded border border-gold/20" />
            </div>
            <div>
              <label className="block text-sm text-brown mb-1">Text Color</label>
              <input {...register("textColor")} type="color" className="w-full h-10 rounded border border-gold/20" />
            </div>
          </div>
        </div>

        {/* Font Selection */}
        <div className="bg-white rounded-lg border border-gold/20 p-6">
          <h2 className="font-serif text-xl text-brown mb-4">Pilihan Font</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-brown mb-1">Heading Font</label>
              <select {...register("headingFont")} className="w-full px-4 py-2 border border-gold/20 rounded-lg">
                <option value="Cormorant Garamond">Cormorant Garamond</option>
                <option value="Playfair Display">Playfair Display</option>
                <option value="DM Serif Display">DM Serif Display</option>
                <option value="Montserrat">Montserrat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-brown mb-1">Body Font</label>
              <select {...register("bodyFont")} className="w-full px-4 py-2 border border-gold/20 rounded-lg">
                <option value="DM Sans">DM Sans</option>
                <option value="Inter">Inter</option>
                <option value="Poppins">Poppins</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sections Selection */}
        <div className="bg-white rounded-lg border border-gold/20 p-6">
          <h2 className="font-serif text-xl text-brown mb-4">Konten yang Ditampilkan</h2>
          <p className="text-sm text-brown-light mb-4">Pilih section yang akan muncul di template ini</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {sectionOptions.map((section) => (
              <label key={section.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedSections.includes(section.value)}
                  onChange={() => toggleSection(section.value)}
                  className="text-gold focus:ring-gold"
                />
                <span className="text-sm text-brown">{section.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Button Style */}
        <div className="bg-white rounded-lg border border-gold/20 p-6">
          <h2 className="font-serif text-xl text-brown mb-4">Style Tombol</h2>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input {...register("buttonStyle")} type="radio" value="solid" />
              <span className="text-sm">Solid</span>
            </label>
            <label className="flex items-center gap-2">
              <input {...register("buttonStyle")} type="radio" value="outline" />
              <span className="text-sm">Outline</span>
            </label>
            <label className="flex items-center gap-2">
              <input {...register("buttonStyle")} type="radio" value="rounded" />
              <span className="text-sm">Rounded</span>
            </label>
          </div>
          <div className="mt-4">
            <label className="block text-sm text-brown mb-1">Border Radius</label>
            <select {...register("borderRadius")} className="w-full px-4 py-2 border border-gold/20 rounded-lg">
              <option value="0px">Sharp (0px)</option>
              <option value="4px">Default (4px)</option>
              <option value="8px">Rounded (8px)</option>
              <option value="16px">Extra Rounded (16px)</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-brown text-gold-light rounded-lg hover:bg-gold hover:text-brown transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Menyimpan..." : "Buat Template"}
        </button>
      </form>
    </div>
  );
}
