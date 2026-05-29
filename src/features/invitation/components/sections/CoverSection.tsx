"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { DecorationKey } from "../../types/template";
import { DecorationRenderer } from "../decorations";

interface CoverSectionProps {
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
  cover: {
    backgroundType: "image" | "gradient" | "color" | "video";
    backgroundValue: string;
    overlayOpacity: number;
    ornamentPosition: "top" | "center" | "bottom" | "none";
    buttonLabel: string;
    showNames: boolean;
    showDate: boolean;
    showEyebrow: boolean;
    eyebrowText: string;
  };
  decorations: {
    enabled: DecorationKey[];
    intensity: "subtle" | "medium" | "heavy";
    color?: string;
  };
}

export default function CoverSection({
  invitation,
  colors,
  fonts,
  layout,
  cover,
  decorations,
}: CoverSectionProps) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (entered) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [entered]);

  const getBackgroundStyle = () => {
    switch (cover.backgroundType) {
      case "image":
        return {
          backgroundImage: `url(${cover.backgroundValue})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };
      case "gradient":
        return { backgroundImage: cover.backgroundValue };
      case "color":
        return { backgroundColor: cover.backgroundValue };
      default:
        return { backgroundColor: colors.primary };
    }
  };

  const buttonClass =
    layout.buttonStyle === "pill"
      ? "rounded-full"
      : layout.buttonStyle === "rounded"
        ? "rounded-lg"
        : layout.buttonStyle === "outline"
          ? "rounded-md border-2 bg-transparent"
          : "rounded-md";

  return (
    <>
      {decorations.enabled.length > 0 && decorations.enabled[0] !== "none" && (
        <DecorationRenderer
          keys={decorations.enabled}
          intensity={decorations.intensity}
          color={decorations.color}
        />
      )}

      {!entered && (
        <section
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{
            ...getBackgroundStyle(),
            fontFamily: fonts.body,
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "#000", opacity: cover.overlayOpacity }}
          />
          <div
            className="relative z-10 flex flex-col items-center px-6 text-center"
            style={{ maxWidth: layout.maxWidth }}
          >
            {cover.showEyebrow && (
              <span
                className="mb-3 text-sm tracking-[0.3em] uppercase"
                style={{ color: colors.accent }}
              >
                {cover.eyebrowText}
              </span>
            )}

            {cover.showNames && (
              <>
                <h1
                  className="text-4xl font-light md:text-6xl"
                  style={{
                    fontFamily: fonts.heading,
                    color: colors.surface,
                  }}
                >
                  {invitation?.groomName ?? "Mempelai Pria"}
                  <span
                    className="mx-3 inline-block"
                    style={{ color: colors.accent }}
                  >
                    &
                  </span>
                  {invitation?.brideName ?? "Mempelai Wanita"}
                </h1>
              </>
            )}

            {cover.showDate && (
              <p
                className="mt-4 text-lg md:text-xl"
                style={{ color: colors.muted }}
              >
                {invitation?.weddingDate
                  ? new Date(invitation.weddingDate).toLocaleDateString(
                      "id-ID",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )
                  : "Tanggal Pernikahan"}
              </p>
            )}

            <button
              onClick={() => setEntered(true)}
              className={`mt-10 px-8 py-3 text-sm font-medium uppercase tracking-widest transition-all hover:opacity-90 ${buttonClass}`}
              style={{
                backgroundColor: colors.primary,
                color: colors.surface,
                borderColor: colors.primary,
              }}
            >
              {cover.buttonLabel || "Buka Undangan"}
            </button>

            <ChevronDown
              className="mt-8 animate-bounce"
              size={24}
              style={{ color: colors.accent }}
            />
          </div>
        </section>
      )}
    </>
  );
}

export { CoverSection };
