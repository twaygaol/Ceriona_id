"use client";

import { useCallback, useMemo, useState } from "react";
import type { ThemeId, CoreEventData, CoreGalleryItem, CoreGiftBank, DecorationId } from "../types";
import { getThemePackage } from "./theme-registry";
import { invitationToCoreEvent } from "../core/shared";
import DecorationEngine from "../shared/decorations/DecorationEngine";
import { InvitationCover } from "../shared/experience/InvitationCover";
import { InvitationEntrance } from "../shared/experience/InvitationEntrance";
import { MusicTrigger } from "../shared/experience/MusicTrigger";

interface ThemeRendererProps {
  themeId: ThemeId | string;
  invitation: any;
  customization?: Record<string, any>;
}

type Phase = "loading" | "cover" | "entrance" | "content";

export function ThemeRenderer({ themeId, invitation, customization }: ThemeRendererProps) {
  const [phase, setPhase] = useState<Phase>("cover");
  const [musicStarted, setMusicStarted] = useState(false);

  const themePackage = useMemo(() => getThemePackage(themeId), [themeId]);

  const handleCoverComplete = useCallback(() => {
    setMusicStarted(true);
    setPhase("entrance");
  }, []);

  const handleEntranceComplete = useCallback(() => {
    setPhase("content");
  }, []);

  if (!themePackage) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        Theme &quot;{themeId}&quot; tidak ditemukan
      </div>
    );
  }

  const { config, sections, MainLayout, SectionWrapper } = themePackage;
  const mergedColors = useMemo(() => mergeColors(config.colors, customization?.colors), [config.colors, customization?.colors]);
  const mergedConfig = useMemo(() => ({ ...config, colors: mergedColors }), [config, mergedColors]);

  const eventData = useMemo(() => invitationToCoreEvent(invitation), [invitation]);

  // Phase: Cover Screen
  if (phase === "cover") {
    return (
      <>
        <MusicTrigger theme={themePackage} autoPlay={false} />
        <InvitationCover theme={themePackage} onComplete={handleCoverComplete} invitation={invitation} />
      </>
    );
  }

  // Phase: Entrance Animation
  if (phase === "entrance") {
    return (
      <>
        {musicStarted && <MusicTrigger theme={themePackage} autoPlay={true} />}
        <InvitationEntrance theme={themePackage} onComplete={handleEntranceComplete} config={mergedConfig} />
      </>
    );
  }

  // Phase: Main Content
  const baseProps = {
    config: mergedConfig,
    colors: mergedColors,
    fonts: config.fonts,
    layout: config.layout,
  };

  const sectionComponents = [
    { key: "cover", Component: sections.CoverSection, props: { invitation, onEnter: () => {} } },
    { key: "hero", Component: sections.HeroSection, props: { invitation } },
    { key: "couple", Component: sections.CoupleSection, props: { brideName: invitation?.brideName || "", groomName: invitation?.groomName || "" } },
    { key: "event", Component: sections.EventSection, props: { event: eventData } },
    { key: "story", Component: sections.StorySection, props: { story: invitation?.story || "" } },
    { key: "gallery", Component: sections.GalleryVariant, props: { items: [] as CoreGalleryItem[] } },
    { key: "gift", Component: sections.GiftVariant, props: { banks: [] as CoreGiftBank[], onCopy: async (text: string) => { try { await navigator.clipboard.writeText(text); } catch {} } } },
    { key: "rsvp", Component: sections.RSVPVariant, props: { onSubmit: async () => {} } },
    { key: "footer", Component: sections.FooterSection, props: { brideName: invitation?.brideName || "", groomName: invitation?.groomName || "" } },
  ];

  // Decoration config from theme (inline for now, could come from config.decorations)
  const decorationConfig: Array<{ id: DecorationId; intensity: "subtle" | "medium" | "heavy"; color: string }> = [
    { id: "flower-engine", intensity: "medium", color: mergedColors.accent },
    { id: "sparkle-engine", intensity: "subtle", color: mergedColors.accent },
  ];

  return (
    <>
      <DecorationEngine decorations={decorationConfig} colors={mergedColors} />
      <MainLayout config={mergedConfig}>
        {sectionComponents.map(({ key, Component, props }) => (
          <SectionWrapper key={key} config={mergedConfig}>
            <Component {...baseProps} {...props} />
          </SectionWrapper>
        ))}
      </MainLayout>
    </>
  );
}

function mergeColors(base: any, override?: any) {
  if (!override) return base;
  return { ...base, ...override };
}
