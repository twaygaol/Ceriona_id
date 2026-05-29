import type { SectionType } from "./template";

export interface SectionProps {
  section: SectionType;
  theme: import("./template").ThemeConfig;
  invitation: any;
  customization?: Partial<import("./template").ThemeColorPalette>;
}

export interface SectionComponentProps {
  invitation: any;
  colors: import("./template").ThemeColorPalette;
  fonts: import("./template").ThemeFontSet;
  layout: import("./template").ThemeLayout;
}

export interface CoverSectionProps extends SectionComponentProps {
  cover: import("./template").ThemeCoverConfig;
  decorations: import("./template").ThemeDecorationSet;
}

export interface CoupleSectionProps extends SectionComponentProps {
  brideName: string;
  groomName: string;
  heroImage?: string;
}

export interface EventSectionProps extends SectionComponentProps {
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  googleMapsUrl?: string;
  mapsEmbedUrl?: string;
}

export interface CountdownSectionProps extends SectionComponentProps {
  targetDate: string;
  labels?: { days: string; hours: string; minutes: string; seconds: string };
}

export interface StorySectionProps extends SectionComponentProps {
  story: string;
  images?: string[];
}

export interface GallerySectionProps extends SectionComponentProps {
  images: string[];
  columns?: 2 | 3 | 4;
  lightbox?: boolean;
}

export interface VideoSectionProps extends SectionComponentProps {
  videos: Array<{ url: string; thumbnail?: string; title?: string }>;
}

export interface GiftSectionProps extends SectionComponentProps {
  banks: Array<{ bank: string; accountNumber: string; accountName: string }>;
}

export interface FooterSectionProps extends SectionComponentProps {
  brideName: string;
  groomName: string;
  closingMessage?: string;
}
