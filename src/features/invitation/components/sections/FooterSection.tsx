"use client";

import { Heart, Share2 } from "lucide-react";
import { toast } from "sonner";

interface FooterSectionProps {
  invitation: any;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    accent: string;
    muted: string;
  };
  fonts: { heading: string; body: string; quote: string };
  layout: {
    borderRadius: string;
    maxWidth: string;
    spacing: string;
    buttonStyle: string;
    containerStyle: string;
  };
  brideName?: string;
  groomName?: string;
  closingMessage?: string;
}

export default function FooterSection({
  colors,
  fonts,
  layout,
  brideName,
  groomName,
  closingMessage,
}: FooterSectionProps) {
  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Undangan ${groomName} & ${brideName}`,
          url,
        });
      } catch {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link undangan berhasil disalin");
      } catch {
        toast.error("Gagal menyalin link");
      }
    }
  };

  return (
    <section
      className="relative px-6 py-20 text-center md:px-12"
      style={{ backgroundColor: colors.primary }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: layout.maxWidth }}
      >
        <div
          className="mx-auto mb-8 h-px w-24"
          style={{ backgroundColor: colors.accent }}
        />

        <p
          className="mx-auto mb-6 max-w-md text-lg leading-relaxed"
          style={{
            fontFamily: fonts.quote,
            color: colors.surface,
          }}
        >
          {closingMessage ||
            `Merupakan suatu kehormatan dan kebahagiaan apabila
Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.
Terima kasih atas segala doa dan dukungannya.`}
        </p>

        <Heart
          size={24}
          className="mx-auto mb-4"
          style={{ color: colors.accent }}
        />

        <p
          className="mb-2 text-2xl font-light"
          style={{ fontFamily: fonts.heading, color: colors.surface }}
        >
          {groomName || "Mempelai Pria"} & {brideName || "Mempelai Wanita"}
        </p>

        <div
          className="mx-auto mb-8 h-px w-24"
          style={{ backgroundColor: colors.accent }}
        />

        <button
          onClick={handleShare}
          className={`mx-auto mb-8 flex items-center gap-2 px-6 py-3 text-sm font-medium uppercase tracking-wider transition-all hover:opacity-90 ${
            layout.buttonStyle === "pill"
              ? "rounded-full"
              : layout.buttonStyle === "rounded"
                ? "rounded-lg"
                : "rounded-md"
          }`}
          style={{
            backgroundColor: colors.surface,
            color: colors.primary,
          }}
        >
          <Share2 size={16} />
          Bagikan Undangan
        </button>

        <p
          className="mt-12 text-xs tracking-wider"
          style={{
            fontFamily: fonts.body,
            color: colors.surface,
            opacity: 0.6,
          }}
        >
          Powered by Ceriona
        </p>
      </div>
    </section>
  );
}

export { FooterSection };
