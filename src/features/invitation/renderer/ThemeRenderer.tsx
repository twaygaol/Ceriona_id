"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ThemeId, CoreEventData, CoreGalleryItem, CoreGiftBank, CoreRSVPData, DecorationId } from "../types";
import { getThemePackage } from "./theme-registry";
import DecorationEngine from "../shared/decorations/DecorationEngine";
import { InvitationCover } from "../shared/experience/InvitationCover";
import { InvitationEntrance } from "../shared/experience/InvitationEntrance";
import { MusicTrigger } from "../shared/experience/MusicTrigger";
import { FloatingMusicPlayer } from "../shared/experience/FloatingMusicPlayer";
import { SplitScreenLayout } from "../shared/SplitScreenLayout";
import { OpeningCover } from "../shared/OpeningCover";
import { QuoteSection } from "../shared/sections/QuoteSection";
import axios from "axios";

interface ThemeRendererProps {
  themeId: ThemeId | string;
  invitation: any;
  customization?: Record<string, any>;
  layout?: "default" | "split";
}

type Phase = "loading" | "cover" | "entrance" | "content";

export function ThemeRenderer({ themeId, invitation, customization, layout = "default" }: ThemeRendererProps) {
  const [phase, setPhase] = useState<Phase>("cover");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themePackage = useMemo(() => getThemePackage(themeId), [themeId]);

  const handleCoverComplete = useCallback(() => {
    setPhase("entrance");
  }, []);

  const handleEntranceComplete = useCallback(() => {
    setPhase("content");
  }, []);

  const handleRSVP = useCallback(async (data: CoreRSVPData) => {
    if (!invitation?.id) return;
    try {
      await axios.post(`/api/rsvp/${invitation.id}`, {
        name: data.name,
        attending: data.attendance === "hadir",
        guestCount: data.guestCount,
        message: data.message,
      });
    } catch (err) {
      console.error("RSVP submit error:", err);
    }
  }, [invitation?.id]);

  const handleCopyGift = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
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

  const isInCover = phase === "cover";
  const isInEntrance = phase === "entrance";
  const isInContent = phase === "content";

  // Build data arrays from invitation
  const galleryItems: CoreGalleryItem[] = useMemo(() => {
    if (invitation?.galleryWithMeta) return invitation.galleryWithMeta;
    if (invitation?.gallery) {
      return invitation.gallery.map((item: any, i: number) => ({
        id: item.id || String(i),
        url: typeof item === 'string' ? item : item.url,
        caption: item.caption,
      }));
    }
    return [];
  }, [invitation?.gallery, invitation?.galleryWithMeta]);

  const giftBanks: CoreGiftBank[] = useMemo(() => {
    if (invitation?.bankAccounts) {
      return invitation.bankAccounts.map((b: any, i: number) => ({
        id: String(i),
        bank: b.bankName,
        accountNumber: b.accountNumber,
        accountName: b.accountName,
      }));
    }
    if (invitation?.virtualGifts) {
      return invitation.virtualGifts.map((g: any, i: number) => ({
        id: g.id || String(i),
        bank: g.provider,
        accountNumber: g.accountNumber,
        accountName: g.accountName,
      }));
    }
    return [];
  }, [invitation?.bankAccounts, invitation?.virtualGifts]);

  const events: CoreEventData[] = useMemo(() => {
    if (invitation?.events && invitation.events.length > 0) {
      return invitation.events.map((e: any) => ({
        eventDate: typeof e.date === "object" ? e.date.toISOString?.() ?? String(e.date) : String(e.date),
        eventTime: e.time,
        eventLocation: e.location,
        venueName: e.name,
        venueAddress: e.address,
        googleMapsUrl: e.googleMapsUrl,
      }));
    }
    if (invitation?.eventDate) {
      return [{
        eventDate: typeof invitation.eventDate === "object" ? invitation.eventDate.toISOString?.() ?? String(invitation.eventDate) : String(invitation.eventDate),
        eventTime: invitation.eventTime ?? "",
        eventLocation: invitation.eventLocation ?? "",
        venueName: invitation.venueName,
        venueAddress: invitation.venueAddress,
        googleMapsUrl: invitation.googleMapsUrl,
      }];
    }
    return [];
  }, [invitation?.events, invitation?.eventDate, invitation?.eventTime, invitation?.eventLocation, invitation?.venueName, invitation?.venueAddress, invitation?.googleMapsUrl]);

  const loveStories: Array<{ title: string; description: string; date?: string; image?: string }> = useMemo(() => {
    if (invitation?.loveStories && invitation.loveStories.length > 0) {
      return invitation.loveStories.map((s: any) => ({
        title: s.title,
        description: s.description,
        date: s.date,
        image: s.photo,
      }));
    }
    if (invitation?.story) {
      return [{ title: "Kisah Kami", description: invitation.story }];
    }
    return [];
  }, [invitation?.loveStories, invitation?.story]);

  const isSplitScreen = layout === "split";

  // Build section components for content phase
  const sectionComponents: Array<{ key: string; Component: React.ComponentType<any>; props: Record<string, any> }> = useMemo(() => {
    const comps: typeof sectionComponents = [];

    // In split mode, always build sections (desktop shows right pane immediately)
    if (!isInContent && !isSplitScreen) return comps;

    const baseProps = {
      config: mergedConfig,
      colors: mergedColors,
      fonts: config.fonts,
      layout: config.layout,
    };

    const scrollToNext = () => {
      const el = document.querySelector("[data-section='hero']");
      el?.scrollIntoView({ behavior: "smooth" });
    };

    comps.push(
      { key: "cover", Component: sections.CoverSection, props: { invitation, onEnter: isSplitScreen ? scrollToNext : () => {} } },
      { key: "hero", Component: sections.HeroSection, props: { invitation } },
      { key: "quote", Component: QuoteSection, props: { quote: invitation?.quote, author: invitation?.quoteAuthor } },
      { key: "couple", Component: sections.CoupleSection, props: { brideName: invitation?.brideName || "", groomName: invitation?.groomName || "", heroImage: invitation?.heroImage || invitation?.couplePhoto } },
    );

    if (events.length > 0) {
      events.forEach((event, i) => {
        comps.push({ key: `event-${i}`, Component: sections.EventSection, props: { event } });
      });
    }

    if (loveStories.length > 0) {
      comps.push({ key: "story", Component: sections.StorySection, props: { story: loveStories } });
    }

    comps.push({ key: "gallery", Component: sections.GalleryVariant, props: { items: galleryItems } });

    const moments = invitation?.moments || [];
    if (moments.length > 0 && sections.MomentSection) {
      comps.push({ key: "moments", Component: sections.MomentSection, props: { moments } });
    }

    const videos = invitation?.videos || [];
    if (videos.length > 0 && sections.VideoSection) {
      comps.push({ key: "videos", Component: sections.VideoSection, props: { videos } });
    }

    comps.push({ key: "gift", Component: sections.GiftVariant, props: { banks: giftBanks, onCopy: handleCopyGift } });
    comps.push({ key: "rsvp", Component: sections.RSVPVariant, props: { onSubmit: handleRSVP } });
    comps.push({ key: "footer", Component: sections.FooterSection, props: { brideName: invitation?.brideName || "", groomName: invitation?.groomName || "" } });

    return comps;
  }, [isInContent, isSplitScreen, mergedConfig, mergedColors, config.fonts, config.layout, sections, invitation, events, loveStories, galleryItems, giftBanks, handleCopyGift, invitation?.id, handleRSVP]);

  const decorationConfig: Array<{ id: DecorationId; intensity: "subtle" | "medium" | "heavy"; color: string }> = [
    { id: "flower-engine", intensity: "medium", color: mergedColors.accent },
    { id: "sparkle-engine", intensity: "subtle", color: mergedColors.accent },
  ];

  return (
    <>
      {mounted && <DecorationEngine decorations={decorationConfig} colors={mergedColors} />}

      {/* Persistent music player (keeps audio alive across all phases) */}
      <MusicTrigger theme={themePackage} autoPlay={false} trackUrl={invitation?.selectedMusic} />
      <FloatingMusicPlayer theme={themePackage} trackUrl={invitation?.selectedMusic} />

      {isSplitScreen ? (
        /* ─── Split Screen Mode ──────────────────────────────── */
        <>
          {/* Desktop: Visual Panel (left) + Invitation Panel (right) */}
          <div className="hidden lg:block">
            <SplitScreenLayout
              visualPanel={
                themePackage.DesktopShowcaseLayout ? (
                  <themePackage.DesktopShowcaseLayout
                    config={mergedConfig}
                    colors={mergedColors}
                    fonts={config.fonts}
                    invitation={invitation}
                  />
                ) : (
                  <OpeningCover
                    config={mergedConfig}
                    colors={mergedColors}
                    fonts={config.fonts}
                    invitation={invitation}
                  />
                )
              }
              invitationPanel={
                <MainLayout config={mergedConfig}>
                  {sectionComponents.map(({ key, Component, props }, idx) => (
                    <div key={key} data-section={key}>
                      {idx > 0 && themePackage.SectionDivider && (
                        <themePackage.SectionDivider color={mergedColors.accent} />
                      )}
                      <SectionWrapper config={mergedConfig}>
                        <Component
                          config={mergedConfig}
                          colors={mergedColors}
                          fonts={config.fonts}
                          layout={config.layout}
                          {...props}
                        />
                      </SectionWrapper>
                    </div>
                  ))}
                </MainLayout>
              }
            />
          </div>

          {/* Mobile: full-screen scrollable content */}
          <div className="lg:hidden w-full min-h-screen">
            <MainLayout config={mergedConfig}>
              {sectionComponents.map(({ key, Component, props }, idx) => (
                <div key={key} data-section={key}>
                  {idx > 0 && themePackage.SectionDivider && (
                    <themePackage.SectionDivider color={mergedColors.accent} />
                  )}
                  <SectionWrapper config={mergedConfig}>
                    <Component
                      config={mergedConfig}
                      colors={mergedColors}
                      fonts={config.fonts}
                      layout={config.layout}
                      {...props}
                    />
                  </SectionWrapper>
                </div>
              ))}
            </MainLayout>
          </div>
        </>
      ) : (
        /* ─── Default Mode ──────────────────────────────────── */
        <>
          {/* Cover Screen */}
          {isInCover && (
            <InvitationCover theme={themePackage} onComplete={handleCoverComplete} invitation={invitation} />
          )}

          {/* Entrance Animation */}
          {isInEntrance && (
            <InvitationEntrance theme={themePackage} onComplete={handleEntranceComplete} config={mergedConfig} />
          )}

          {/* Main Content */}
          {isInContent && (
            <MainLayout config={mergedConfig}>
              {sectionComponents.map(({ key, Component, props }, idx) => (
                <div key={key} data-section={key}>
                  {idx > 0 && themePackage.SectionDivider && (
                    <themePackage.SectionDivider color={mergedColors.accent} />
                  )}
                  <SectionWrapper config={mergedConfig}>
                    <Component
                      config={mergedConfig}
                      colors={mergedColors}
                      fonts={config.fonts}
                      layout={config.layout}
                      {...props}
                    />
                  </SectionWrapper>
                </div>
              ))}
            </MainLayout>
          )}
        </>
      )}
    </>
  );
}

function mergeColors(base: any, override?: any) {
  if (!override) return base;
  return { ...base, ...override };
}
