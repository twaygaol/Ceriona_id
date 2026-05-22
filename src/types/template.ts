import type { InvitationData } from "@/app/invitation/[slug]/InvitationClient";

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
