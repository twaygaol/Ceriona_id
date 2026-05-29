"use client";

import { Heart } from "lucide-react";

interface CoupleSectionProps {
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
  brideName: string;
  groomName: string;
  heroImage?: string;
}

export default function CoupleSection({
  colors,
  fonts,
  layout,
  brideName,
  groomName,
  heroImage,
}: CoupleSectionProps) {
  const containerClass =
    layout.containerStyle === "card"
      ? "shadow-lg"
      : layout.containerStyle === "framed"
        ? "border-2"
        : "";

  return (
    <section
      className="relative px-6 py-20 md:px-12"
      style={{ backgroundColor: colors.background }}
    >
      {heroImage && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <div
        className="relative z-10 mx-auto"
        style={{ maxWidth: layout.maxWidth }}
      >
        <h2
          className="mb-12 text-center text-3xl font-light tracking-wide md:text-4xl"
          style={{ fontFamily: fonts.heading, color: colors.text }}
        >
          Pasangan
        </h2>

        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center">
          <div
            className={`w-full max-w-xs p-8 text-center ${containerClass}`}
            style={{
              backgroundColor: colors.surface,
              borderRadius: layout.borderRadius,
              borderColor: colors.primary,
            }}
          >
            <div
              className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full text-3xl"
              style={{ backgroundColor: colors.primary, color: colors.surface }}
            >
              P
            </div>
            <h3
              className="text-2xl font-light"
              style={{ fontFamily: fonts.heading, color: colors.text }}
            >
              {groomName || "Mempelai Pria"}
            </h3>
            <p
              className="mt-1 text-sm tracking-widest uppercase"
              style={{ fontFamily: fonts.body, color: colors.muted }}
            >
              Pria
            </p>
          </div>

          <div
            className="flex items-center justify-center"
            style={{ color: colors.primary }}
          >
            <Heart size={32} fill="currentColor" />
          </div>

          <div
            className={`w-full max-w-xs p-8 text-center ${containerClass}`}
            style={{
              backgroundColor: colors.surface,
              borderRadius: layout.borderRadius,
              borderColor: colors.primary,
            }}
          >
            <div
              className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full text-3xl"
              style={{ backgroundColor: colors.accent, color: colors.surface }}
            >
              W
            </div>
            <h3
              className="text-2xl font-light"
              style={{ fontFamily: fonts.heading, color: colors.text }}
            >
              {brideName || "Mempelai Wanita"}
            </h3>
            <p
              className="mt-1 text-sm tracking-widest uppercase"
              style={{ fontFamily: fonts.body, color: colors.muted }}
            >
              Wanita
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export { CoupleSection };
