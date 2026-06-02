"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Globe, Send, Eye, Copy, Check, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useAutoSaveForm } from "@/hooks/useAutoSaveForm";

const publishFormSchema = z.object({
  status: z.enum(["draft", "published", "archived"]),
  notifyGuests: z.boolean(),
  sendWABlast: z.boolean(),
});

type PublishFormData = z.infer<typeof publishFormSchema>;

interface PublishFormProps {
  defaultValues?: Partial<PublishFormData>;
  onSave: (data: PublishFormData) => void;
  onPrev?: () => void;
  invitationSlug?: string;
  isComplete?: boolean;
  onChange?: (data: PublishFormData) => void;
}

export function PublishForm({
  defaultValues,
  onSave,
  onPrev,
  invitationSlug,
  isComplete = false,
  onChange,
}: PublishFormProps) {
  const {
    handleSubmit,
    watch,
    setValue,
  } = useForm<PublishFormData>({
    resolver: zodResolver(publishFormSchema),
    defaultValues: defaultValues || {
      status: "draft",
      notifyGuests: false,
      sendWABlast: false,
    },
  });

  useAutoSaveForm(watch, onChange);

  const [copied, setCopied] = useState(false);
  const status = watch("status");

  const onSubmit = (data: PublishFormData) => {
    onSave(data);
  };

  const copyLink = () => {
    if (invitationSlug) {
      navigator.clipboard.writeText(
        `${window.location.origin}/invitation/${invitationSlug}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const invitationUrl = invitationSlug
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/invitation/${invitationSlug}`
    : "";

  const checklist = [
    { label: "Data Mempelai", done: true },
    { label: "Data Orang Tua", done: true },
    { label: "Cover Screen", done: true },
    { label: "Hero Section", done: true },
    { label: "Acara (min. 1)", done: true },
    { label: "Hitung Mundur", done: true },
    { label: "Love Story", done: false },
    { label: "Galeri Foto", done: false },
    { label: "Momen", done: false },
    { label: "Video", done: false },
    { label: "Rekening Hadiah", done: false },
    { label: "RSVP", done: false },
    { label: "Musik", done: false },
    { label: "Tema Dipilih", done: true },
    { label: "SEO", done: false },
  ];

  const completedCount = checklist.filter((item) => item.done).length;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Status Banner */}
      <div
        className={`rounded-2xl border p-6 ${
          status === "published"
            ? "border-green-200 bg-green-50"
            : status === "draft"
              ? "border-yellow-200 bg-yellow-50"
              : "border-gray-200 bg-gray-50"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {status === "published" ? (
              <Globe className="size-8 text-green-600" />
            ) : status === "draft" ? (
              <AlertTriangle className="size-8 text-yellow-600" />
            ) : (
              <Globe className="size-8 text-gray-400" />
            )}
            <div>
              <h3 className="font-serif text-xl text-brown">
                {status === "published"
                  ? "Undangan Sudah Publik"
                  : status === "draft"
                    ? "Undangan dalam Mode Draft"
                    : "Undangan Diarsipkan"}
              </h3>
              <p className="text-sm text-brown-light">
                {status === "published"
                  ? "Undangan dapat diakses oleh tamu melalui link"
                  : status === "draft"
                    ? "Hanya Anda yang bisa melihat undangan ini"
                    : "Undangan tidak aktif"}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {status !== "published" && (
              <Button
                type="button"
                onClick={() => setValue("status", "published")}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                <Globe className="mr-2 size-4" />
                Publikasikan
              </Button>
            )}
            {status === "published" && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setValue("status", "draft")}
              >
                Tarik ke Draft
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Link & Share */}
      {invitationSlug && (
        <div className="rounded-2xl border border-gold/15 bg-white p-6">
          <h3 className="mb-4 font-serif text-xl text-brown">Link Undangan</h3>
          
          <div className="flex items-center gap-3">
            <input
              readOnly
              value={invitationUrl}
              className="flex-1 rounded-xl border border-gold/20 bg-ivory px-4 py-3 text-brown"
            />
            <Button
              type="button"
              variant="outline"
              onClick={copyLink}
              className="gap-2"
            >
              {copied ? (
                <>
                  <Check className="size-4 text-green-600" />
                  Tersalin
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  Salin
                </>
              )}
            </Button>
            <Button
              type="button"
              onClick={() =>
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(
                    `Yuk lihat undangan kami: ${invitationUrl}`
                  )}`,
                  "_blank"
                )
              }
              className="bg-green-600 text-white hover:bg-green-700"
            >
              <Send className="mr-2 size-4" />
              WA
            </Button>
          </div>

          {/* Quick Share */}
          <div className="mt-4 flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(invitationUrl)}`,
                  "_blank"
                )
              }
            >
              Facebook
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(invitationUrl)}`,
                  "_blank"
                )
              }
            >
              Twitter
            </Button>
          </div>
        </div>
      )}

      {/* Preparation Checklist */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <h3 className="mb-4 font-serif text-xl text-brown">
          Persiapan Publikasi
        </h3>
        
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-brown-light">Progress</span>
            <span className="text-sm font-medium text-brown">
              {completedCount}/{checklist.length} selesai
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-gold transition-all"
              style={{
                width: `${(completedCount / checklist.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          {checklist.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                  item.done ? "bg-green-500" : "border-2 border-gray-300"
                }`}
              >
                {item.done && <Check className="size-3 text-white" />}
              </div>
              <span
                className={`text-sm ${
                  item.done ? "text-green-700" : "text-brown-light"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Button */}
      <div className="rounded-2xl border border-gold/15 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl text-brown">Preview Undangan</h3>
            <p className="text-sm text-brown-light">
              Lihat tampilan undangan sebelum dipublikasikan
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              window.open(`/preview/builder?slug=${invitationSlug || ""}`, "_blank")
            }
            className="gap-2"
          >
            <Eye className="size-4" />
            Buka Preview
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {onPrev && (
            <Button type="button" variant="outline" onClick={onPrev}>
              Kembali
            </Button>
          )}
          <Button type="button" variant="outline">
            Simpan Draft
          </Button>
        </div>
        <Button
          type="submit"
          className="bg-brown text-gold-light hover:bg-gold hover:text-brown"
        >
          {status === "published" ? "Update Publikasi" : "Simpan Pengaturan"}
        </Button>
      </div>
    </form>
  );
}
