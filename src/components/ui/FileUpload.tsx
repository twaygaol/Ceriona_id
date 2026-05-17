"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";
import NextImage from "next/image";
import { ImageIcon, Music, UploadCloud, X } from "lucide-react";

interface FileUploadProps {
  type: "image" | "music" | "thumbnail";
  onUploadComplete: (url: string) => void;
  onRemove?: () => void;
  existingUrl?: string;
}

export function FileUpload({ type, onUploadComplete, onRemove, existingUrl }: FileUploadProps) {
  const endpoint = type === "image" ? "galleryImage" : type === "music" ? "music" : "thumbnail";
  const isAudio = type === "music";
  
  if (existingUrl) {
    return (
      <div className="relative inline-block">
        {type === "image" ? (
          <NextImage
            src={existingUrl}
            alt="File terunggah"
            width={128}
            height={128}
            className="h-32 w-32 rounded-lg object-cover"
          />
        ) : (
          <audio src={existingUrl} controls className="h-10" />
        )}
        <button
          onClick={onRemove}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        const uploadedUrl = res[0]?.ufsUrl ?? res[0]?.url ?? res[0]?.serverData?.url;
        if (!uploadedUrl) {
          toast.error("Upload selesai, tetapi URL file tidak ditemukan");
          return;
        }

        onUploadComplete(uploadedUrl);
        toast.success("Upload berhasil!");
      }}
      onUploadError={(error: Error) => {
        toast.error(`Upload gagal: ${error.message}`);
      }}
      appearance={{
        container:
          "border-2 border-dashed border-gold/30 rounded-lg bg-cream px-6 py-8 transition-colors hover:bg-gold/5",
        button:
          "bg-brown text-gold-light hover:bg-gold hover:text-brown rounded-md px-4 py-2 text-sm",
        label: "text-brown text-sm",
        allowedContent: "text-xs text-brown-light",
        uploadIcon: "text-gold",
      }}
      content={{
        uploadIcon: () =>
          isAudio ? (
            <Music className="h-8 w-8" />
          ) : (
            <ImageIcon className="h-8 w-8" />
          ),
        label: () => (isAudio ? "Upload musik background" : "Upload foto undangan"),
        button: ({ ready, isUploading }) => {
          if (!ready) return "Menyiapkan...";
          if (isUploading) return "Mengunggah...";

          return (
            <span className="inline-flex items-center gap-2">
              <UploadCloud size={16} />
              Pilih file
            </span>
          );
        },
        allowedContent: () =>
          isAudio ? "Audio sampai 16MB" : type === "thumbnail" ? "Gambar sampai 2MB" : "Gambar sampai 4MB",
      }}
    />
  );
}
