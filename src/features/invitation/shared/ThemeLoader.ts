import type { ThemeConfig, ThemeId } from "../types/template";
import { getTemplateConfig } from "../registry/template-registry";
import CoverSection from "../components/sections/CoverSection";
import CoupleSection from "../components/sections/CoupleSection";
import EventSection from "../components/sections/EventSection";
import CountdownSection from "../components/sections/CountdownSection";
import StorySection from "../components/sections/StorySection";
import GallerySection from "../components/sections/GallerySection";
import VideoSection from "../components/sections/VideoSection";
import GiftSection from "../components/sections/GiftSection";
import RSVPSection from "../components/sections/RSVPSection";
import WishSection from "../components/sections/WishSection";
import FooterSection from "../components/sections/FooterSection";

const sectionComponentMap: Record<string, React.ComponentType<any>> = {
  cover: CoverSection,
  couple: CoupleSection,
  event: EventSection,
  countdown: CountdownSection,
  story: StorySection,
  gallery: GallerySection,
  video: VideoSection,
  gift: GiftSection,
  rsvp: RSVPSection,
  wish: WishSection,
  footer: FooterSection,
};

export function loadThemeConfig(id: string): ThemeConfig | null {
  return getTemplateConfig(id) as ThemeConfig | null;
}

export function preloadThemeAssets(config: ThemeConfig): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }
    const images: string[] = [];
    if (config.previewImage) {
      images.push(config.previewImage);
    }
    if (config.cover.backgroundType === "image") {
      images.push(config.cover.backgroundValue);
    }
    if (images.length === 0) {
      resolve();
      return;
    }
    let loaded = 0;
    const onLoad = () => {
      loaded++;
      if (loaded === images.length) {
        resolve();
      }
    };
    for (const src of images) {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = onLoad;
      img.src = src;
    }
  });
}

export function getSectionComponent(type: string): React.ComponentType<any> | null {
  return sectionComponentMap[type] ?? null;
}
