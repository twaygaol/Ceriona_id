import type { ReactNode } from "react";

// ─── Core Engine Types ────────────────────────────────────
export interface CoreRSVPData {
  id: string;
  name: string;
  attendance: "hadir" | "tidak hadir" | "ragu";
  guestCount: number;
  message?: string;
}

export interface CoreGalleryItem {
  id: string;
  url: string;
  thumbnail?: string;
  caption?: string;
}

export interface CoreGiftBank {
  id: string;
  bank: string;
  accountNumber: string;
  accountName: string;
  logo?: string;
}

export interface CoreWishData {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface CoreEventData {
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  venueName?: string;
  venueAddress?: string;
  googleMapsUrl?: string;
  mapsEmbedUrl?: string;
  akadTime?: string;
  receptionTime?: string;
}

export interface CoreMusicData {
  src: string;
  title?: string;
  artist?: string;
  autoPlay?: boolean;
}

export interface CoreCountdownData {
  targetDate: string;
  labels?: { days: string; hours: string; minutes: string; seconds: string };
}

// ─── Theme Package Types ───────────────────────────────────
export type ThemeId = "jawa" | "batak" | "islami" | "luxury" | "modern";

export interface ThemePackage {
  id: ThemeId;
  name: string;
  description: string;
  isPremium: boolean;
  config: ThemeConfig;
  OpeningScreen: React.ComponentType<OpeningScreenProps>;
  OpenInvitationButton: React.ComponentType<OpenButtonProps>;
  EntranceAnimation: React.ComponentType<EntranceProps>;
  MainLayout: React.ComponentType<MainLayoutProps>;
  SectionWrapper: React.ComponentType<SectionWrapperProps>;
  decorations: React.ComponentType<any>[];
  sections: ThemeSections;
}

export interface ThemeSections {
  CoverSection: React.ComponentType<any>;
  HeroSection: React.ComponentType<any>;
  CoupleSection: React.ComponentType<any>;
  EventSection: React.ComponentType<any>;
  StorySection: React.ComponentType<any>;
  GalleryVariant: React.ComponentType<any>;
  GiftVariant: React.ComponentType<any>;
  RSVPVariant: React.ComponentType<any>;
  FooterSection: React.ComponentType<any>;
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  isPremium: boolean;
  version: string;
  category: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  animations: ThemeAnimations;
  music: ThemeMusic;
  layout: ThemeLayoutConfig;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  accent: string;
  muted: string;
}

export interface ThemeFonts {
  heading: string;
  body: string;
  quote: string;
}

export interface ThemeAnimations {
  opening: string;
  entrance: string;
  content: string;
  gallery: string;
}

export interface ThemeMusic {
  defaultTrack: string;
  autoPlay: boolean;
  showPlayer: boolean;
}

export interface ThemeLayoutConfig {
  borderRadius: string;
  maxWidth: string;
  spacing: string;
  buttonStyle: "rounded" | "solid" | "outline" | "pill";
  containerStyle: "card" | "full" | "framed";
}

// ─── Component Props ──────────────────────────────────────
export interface OpeningScreenProps {
  onOpen: () => void;
  config: ThemeConfig;
}

export interface OpenButtonProps {
  onClick: () => void;
  config: ThemeConfig;
}

export interface EntranceProps {
  onComplete: () => void;
  config: ThemeConfig;
}

export interface MainLayoutProps {
  children: ReactNode;
  config: ThemeConfig;
}

export interface SectionWrapperProps {
  children: ReactNode;
  config: ThemeConfig;
  className?: string;
}

// ─── Section Component Props ──────────────────────────────
export interface SectionBaseProps {
  config: ThemeConfig;
  colors: ThemeColors;
  fonts: ThemeFonts;
  layout: ThemeLayoutConfig;
}

export interface CoverSectionProps extends SectionBaseProps {
  invitation: any;
  onEnter: () => void;
}

export interface HeroSectionProps extends SectionBaseProps {
  invitation: any;
}

export interface CoupleSectionProps extends SectionBaseProps {
  brideName: string;
  groomName: string;
  heroImage?: string;
}

export interface EventSectionProps extends SectionBaseProps {
  event: CoreEventData;
}

export interface StorySectionProps extends SectionBaseProps {
  story: string | Array<{ title?: string; description?: string; date?: string; image?: string }>;
}

export interface GalleryVariantProps extends SectionBaseProps {
  items: CoreGalleryItem[];
  onImageClick?: (item: CoreGalleryItem) => void;
}

export interface GiftVariantProps extends SectionBaseProps {
  banks: CoreGiftBank[];
  onCopy: (text: string) => void;
}

export interface RSVPVariantProps extends SectionBaseProps {
  onSubmit: (data: CoreRSVPData) => Promise<void>;
}

export interface FooterSectionProps extends SectionBaseProps {
  brideName: string;
  groomName: string;
}

// ─── Theme Registry Types ─────────────────────────────────
export interface ThemeRegistryEntry {
  package: ThemePackage;
  assets?: Record<string, string>;
}

// ─── Theme Manifest ────────────────────────────────────────
export type SupportedFeature = "gallery" | "gift" | "rsvp" | "guestbook" | "countdown" | "music" | "maps" | "story" | "video";

export interface ThemeManifest {
  id: ThemeId;
  slug: string;
  name: string;
  description: string;
  category: "traditional" | "modern" | "luxury" | "islami" | "minimal" | "custom";
  version: ThemeVersion;
  author: string;
  preview: string;
  thumbnail: string;
  tags: string[];
  supportedFeatures: SupportedFeature[];
  minEngineVersion: string;
  dependencies?: string[];
}

// ─── Theme Versioning ──────────────────────────────────────
export interface ThemeVersion {
  major: number;
  minor: number;
  patch: number;
}

export function parseVersion(v: string): ThemeVersion {
  const [major = 0, minor = 0, patch = 0] = v.split(".").map(Number);
  return { major, minor, patch };
}

export function versionToString(v: ThemeVersion): string {
  return `${v.major}.${v.minor}.${v.patch}`;
}

export function isThemeCompatible(required: string, current: string): boolean {
  const req = parseVersion(required);
  const cur = parseVersion(current);
  return cur.major >= req.major;
}

// ─── Asset Config ─────────────────────────────────────────
export interface ThemeAssetPaths {
  backgrounds: string[];
  ornaments: string[];
  frames: string[];
  icons: string[];
  music: string[];
  lottie: string[];
  videos: string[];
  preview: string[];
}

// ─── Decoration Config ────────────────────────────────────
export type DecorationId =
  | "flower-engine"
  | "sparkle-engine"
  | "pattern-engine"
  | "floating-object-engine"
  | "batik-pattern"
  | "gunungan"
  | "floral-frame"
  | "ulos-pattern"
  | "gorga-carving"
  | "calligraphy-stroke"
  | "geometric-star"
  | "gold-frame"
  | "minimal-line"
  | "none";

export interface DecorationConfig {
  id: DecorationId;
  intensity: "subtle" | "medium" | "heavy";
  color?: string;
  position?: "top" | "bottom" | "corners" | "fullscreen";
}

// ─── Experience Layer Props ────────────────────────────────
export interface InvitationCoverProps {
  theme: ThemePackage;
  onComplete: () => void;
  invitation: any;
}

export interface InvitationEntranceProps {
  theme: ThemePackage;
  onComplete: () => void;
  config: ThemeConfig;
}

export interface InvitationLoaderProps {
  message?: string;
}

export interface InvitationTransitionProps {
  children: ReactNode;
  direction?: "fade" | "slide-up" | "zoom";
  duration?: number;
}

export interface ScrollControllerProps {
  children: ReactNode;
  smooth?: boolean;
  snap?: boolean;
}

export interface MusicTriggerProps {
  theme: ThemePackage;
  autoPlay: boolean;
}

// ─── Dynamic Theme Import ──────────────────────────────────
export interface DynamicThemeModule {
  manifest: ThemeManifest;
  themePackage: ThemePackage;
  default: ThemePackage;
}

export interface ThemeRegistryEntryV2 {
  manifest: ThemeManifest;
  loader: () => Promise<ThemePackage>;
  loaded?: boolean;
  cached?: ThemePackage;
}
