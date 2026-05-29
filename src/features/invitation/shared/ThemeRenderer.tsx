"use client";

import { useMemo } from "react";
import type { ThemeConfig } from "../types/template";
import { getSectionComponent, loadThemeConfig } from "../shared/ThemeLoader";
import { getBackgroundStyle } from "../shared/AssetLoader";
import { AnimationWrapper, getAnimation } from "../animations";
import { DecorationRenderer } from "../components/decorations";

interface ThemeRendererProps {
  themeId: string;
  invitation: any;
  customization?: Partial<ThemeConfig>;
}

export function ThemeRenderer({ themeId, invitation, customization }: ThemeRendererProps) {
  const config = useMemo((): ThemeConfig | null => {
    const base = loadThemeConfig(themeId);
    if (!base) return null;
    return customization ? deepMerge(base, customization) : base;
  }, [themeId, customization]);

  if (!config) {
    return <div className="flex min-h-screen items-center justify-center text-gray-500">Template tidak ditemukan</div>;
  }

  const enabledSections = (config.sections as Array<{ type: string; enabled: boolean; order: number; label: string }>)
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order)
    .map((s) => s.type);

  const contentAnimation = getAnimation(config.animations.content);
  const coupleAnimation = getAnimation(config.animations.couple);
  const galleryAnimation = getAnimation(config.animations.gallery);

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundColor: config.colors.background,
        color: config.colors.text,
      }}
    >
      {/* Decoration Layer */}
      {config.decorations.enabled.length > 0 && (
        <DecorationRenderer
          keys={config.decorations.enabled}
          intensity={config.decorations.intensity}
          color={config.decorations.color || config.colors.accent}
        />
      )}

      {/* Cover Section — Full Screen */}
      {enabledSections.includes("cover") && (
        <CoverSection config={config} invitation={invitation} />
      )}

      {/* Content Sections with Animations */}
      <div className="relative z-10" style={{ maxWidth: config.layout.maxWidth, margin: "0 auto" }}>
        {enabledSections.filter((s) => s !== "cover").map((type, idx) => {
          const SectionComponent = getSectionComponent(type);
          if (!SectionComponent) return null;

          let animation = contentAnimation;
          if (type === "couple") animation = coupleAnimation;
          if (type === "gallery") animation = galleryAnimation;

          return (
            <AnimationWrapper key={type} animation={animation} delay={idx * 0.1}>
              <SectionComponent
                section={type}
                invitation={invitation}
                colors={config.colors}
                fonts={config.fonts}
                layout={config.layout}
                {...getSectionProps(type, invitation, config)}
              />
            </AnimationWrapper>
          );
        })}
      </div>
    </div>
  );
}

function CoverSection({ config, invitation }: { config: ThemeConfig; invitation: any }) {
  const bgStyle = getBackgroundStyle(config);
  const coverAnimation = getAnimation(config.animations.cover);

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={bgStyle} />
      <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${config.cover.overlayOpacity})` }} />

      {/* Decorative elements on cover */}
      <DecorationRenderer
        keys={config.decorations.enabled}
        intensity={config.decorations.intensity}
        color={config.decorations.color || config.colors.accent}
      />

      {/* Content */}
      <div className="relative z-10 px-6 text-center">
        <AnimationWrapper animation={coverAnimation}>
          {config.cover.showEyebrow && (
            <p className="mb-4 text-sm uppercase tracking-[0.35em]" style={{ color: config.colors.accent, fontFamily: config.fonts.body }}>
              {config.cover.eyebrowText}
            </p>
          )}
          {config.cover.showNames && (
            <h1 className="text-5xl md:text-7xl" style={{ fontFamily: config.fonts.heading, color: config.colors.surface }}>
              {invitation?.brideName || "Nama"} & {invitation?.groomName || "Pasangan"}
            </h1>
          )}
          {config.cover.showDate && (
            <p className="mt-4 text-lg" style={{ fontFamily: config.fonts.body, color: config.colors.accent }}>
              {invitation?.eventDate ? new Date(invitation.eventDate).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "Tanggal"}
            </p>
          )}
          <button
            className="mt-8 px-8 py-3 text-sm font-medium transition hover:opacity-80"
            style={{
              backgroundColor: config.colors.primary,
              color: config.colors.surface,
              borderRadius: config.layout.borderRadius,
              fontFamily: config.fonts.body,
            }}
            onClick={() => {
              const cover = document.getElementById("invitation-content");
              if (cover) cover.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {config.cover.buttonLabel}
          </button>
        </AnimationWrapper>
      </div>
    </section>
  );
}

function getSectionProps(type: string, invitation: any, config: ThemeConfig) {
  const base = {
    brideName: invitation?.brideName || "",
    groomName: invitation?.groomName || "",
    eventDate: invitation?.eventDate,
    eventTime: invitation?.eventTime || "",
    eventLocation: invitation?.eventLocation || "",
    googleMapsUrl: invitation?.googleMapsUrl || "",
    story: invitation?.story || "",
    images: invitation?.gallery?.map((g: any) => typeof g === "string" ? g : g.url) || [],
    heroImage: invitation?.heroImage || invitation?.gallery?.[0]?.url,
    targetDate: invitation?.eventDate,
    banks: invitation?.giftBanks || [],
    videos: invitation?.videos || [],
  };
  return base;
}

function deepMerge(base: any, override: any): any {
  const result = { ...base };
  for (const key of Object.keys(override)) {
    const val = override[key];
    if (val && typeof val === "object" && !Array.isArray(val)) {
      result[key] = deepMerge(result[key], val);
    } else if (val !== undefined) {
      result[key] = val;
    }
  }
  return result;
}
