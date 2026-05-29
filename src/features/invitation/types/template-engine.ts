export type TemplateId =
  | "elegant-wedding"
  | "batak-toba"
  | "luxury-modern"
  | "islami"
  | "jawa";

export interface TemplateColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent?: string;
  surface?: string;
  muted?: string;
}

export interface TemplateFonts {
  heading: string;
  body: string;
  quote?: string;
}

export interface TemplateOrnament {
  id: string;
  type: "svg" | "pattern" | "image";
  src?: string;
  svg?: string;
  position: "header" | "footer" | "divider" | "corner" | "background" | "frame";
  className?: string;
}

export interface TemplateAnimation {
  sectionEntrance: "fade-up" | "fade-in" | "slide-up" | "zoom-in" | "none";
  staggerDelay: number;
  duration: number;
  parallax?: boolean;
}

export interface TemplateSectionConfig {
  type: string;
  enabled: boolean;
  label: string;
  icon?: string;
  customizable: boolean;
  fields: string[];
}

export interface TemplateOpeningConfig {
  enabled: boolean;
  backgroundType: "image" | "gradient" | "color" | "video";
  backgroundValue: string;
  overlayOpacity: number;
  ornamentPosition: "top" | "center" | "bottom" | "none";
  buttonLabel: string;
  buttonStyle: "solid" | "outline" | "ghost" | "rounded";
  showNames: boolean;
  showDate: boolean;
  showEyebrow: boolean;
  eyebrowText: string;
}

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  category: string;
  previewImage?: string;
  isPremium: boolean;
  colors: TemplateColors;
  fonts: TemplateFonts;
  ornaments: TemplateOrnament[];
  animation: TemplateAnimation;
  sections: TemplateSectionConfig[];
  opening: TemplateOpeningConfig;
  border?: {
    radius: string;
    style?: "rounded" | "sharp" | "pill";
  };
  buttonStyle?: "rounded" | "solid" | "outline";
  gradientFrom?: string;
  gradientTo?: string;
}

export interface TemplateRegistry {
  config: TemplateConfig;
  sectionOverrides?: Record<string, React.ComponentType<any>>;
  ornamentComponents?: Record<string, React.ComponentType<any>>;
}

export interface CustomizationState {
  colors: TemplateColors;
  fonts: TemplateFonts;
  sections: string[];
  opening: TemplateOpeningConfig;
  ornaments: TemplateOrnament[];
  animation: TemplateAnimation;
}
