import type { InvitationData } from "@/app/invitation/[slug]/InvitationClient";

export const templateCategories = [
  "wedding",
  "birthday",
  "graduation",
  "custom",
  "adat-batak",
  "adat-jawa",
  "adat-sunda",
  "modern",
  "luxury",
  "elegant",
  "minimalist",
  "islami",
  "engagement",
  "baby-shower",
] as const;

export type TemplateCategory = (typeof templateCategories)[number];

export const templateSections = [
  "opening",
  "hero",
  "quote",
  "countdown",
  "story",
  "gallery",
  "event",
  "rsvp",
  "wishes",
  "gift",
  "live-streaming",
  "footer",
] as const;

export type TemplateSection = (typeof templateSections)[number];
export interface TemplateOrnaments {
  headerSvg?: string;
  dividerSvg?: string;
  footerSvg?: string;
  cornerSvg?: string;
  patternClass?: string;
}

export interface TemplateColors {
  primary?: string;
  secondary?: string;
  background?: string;
  text?: string;
}

export interface TemplateFonts {
  heading?: string;
  body?: string;
}
export interface TemplateOpening {
  eyebrow?: string;
  buttonLabel?: string;
  ornament?: string;
  backgroundImage?: string;
}

export interface TemplateLayout {
  sections?: TemplateSection[];
  featured?: boolean;
  visualTheme?: string;
  backgroundGradient?: {
    from?: string;
    to?: string;
  };
  colors?: TemplateColors;
  fonts?: TemplateFonts;
  ornaments?: TemplateOrnaments;
  opening?: TemplateOpening;
}

export interface TemplateStyles {
  borderRadius?: string;
  buttonStyle?: "solid" | "outline" | "rounded";
}

export interface DashboardTemplate {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  thumbnail: string | null;
  previewImage: string | null;
  layout: TemplateLayout;
  styles: TemplateStyles | null;
  isPremium: boolean;
  isActive: boolean;
  isDefault: boolean;
  usageCount: number;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateSectionProps {
  invitation: InvitationData;
  template: DashboardTemplate;
  colors: TemplateColors;
}
