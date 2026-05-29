export type ThemeId =
  | "elegant-wedding"
  | "batak-toba"
  | "jawa"
  | "islami"
  | "luxury-modern";

export type AnimationKey =
  | "fade-up"
  | "zoom-in"
  | "slide-left"
  | "slide-right"
  | "floating"
  | "sparkle"
  | "falling-petals"
  | "none";

export type DecorationKey =
  | "flower-corner"
  | "falling-petals"
  | "floating-leaf"
  | "butterfly"
  | "sparkle"
  | "ornament"
  | "none";

export type SectionType =
  | "cover"
  | "couple"
  | "event"
  | "countdown"
  | "story"
  | "gallery"
  | "video"
  | "gift"
  | "rsvp"
  | "wish"
  | "footer";

export interface ThemeColorPalette {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  accent: string;
  muted: string;
}

export interface ThemeFontSet {
  heading: string;
  body: string;
  quote: string;
}

export interface ThemeAnimationSet {
  cover: AnimationKey;
  content: AnimationKey;
  gallery: AnimationKey;
  couple: AnimationKey;
}

export interface ThemeDecorationSet {
  enabled: DecorationKey[];
  intensity: "subtle" | "medium" | "heavy";
  color?: string;
}

export interface ThemeSectionConfig {
  type: SectionType;
  enabled: boolean;
  label: string;
  order: number;
}

export interface ThemeMusicConfig {
  defaultTrack?: string;
  autoPlay: boolean;
  showPlayer: boolean;
}

export interface ThemeCoverConfig {
  backgroundType: "image" | "gradient" | "color" | "video";
  backgroundValue: string;
  overlayOpacity: number;
  ornamentPosition: "top" | "center" | "bottom" | "none";
  buttonLabel: string;
  showNames: boolean;
  showDate: boolean;
  showEyebrow: boolean;
  eyebrowText: string;
}

export interface ThemeLayout {
  borderRadius: string;
  maxWidth: string;
  spacing: string;
  buttonStyle: "rounded" | "solid" | "outline" | "pill";
  containerStyle: "card" | "full" | "framed";
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  category: string;
  version: string;
  author?: string;
  previewImage?: string;
  isPremium: boolean;
  colors: ThemeColorPalette;
  fonts: ThemeFontSet;
  animations: ThemeAnimationSet;
  decorations: ThemeDecorationSet;
  sections: ThemeSectionConfig[];
  cover: ThemeCoverConfig;
  music: ThemeMusicConfig;
  layout: ThemeLayout;
}
