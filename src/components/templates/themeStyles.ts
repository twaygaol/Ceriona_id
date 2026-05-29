import type { TemplateSectionProps } from "@/types/template";

export interface ThemeStyleSet {
  sectionBg: string;
  sectionBgAlt: string;
  cardBg: string;
  cardBorder: string;
  cardBorderTop: string;
  headingColor: string;
  bodyColor: string;
  bodyColorLight: string;
  accentColor: string;
  goldColor: string;
  mutedColor: string;
  iconBg: string;
  iconColor: string;
  iconBorder: string;
  iconRadius: string;
  buttonBg: string;
  buttonColor: string;
  buttonBorder: string;
  buttonRadius: string;
  radiusCard: string;
  radiusImage: string;
  eyebrowColor: string;
  openingQuote: string;
  heroQuote: string;
  isThemed: boolean;
}

type VisualTheme = NonNullable<TemplateSectionProps["template"]>["layout"]["visualTheme"];

const THEME_STYLES: Record<string, Omit<ThemeStyleSet, "openingQuote" | "heroQuote" | "isThemed">> = {
  "sunda-priangan": {
    sectionBg: "#F5EFE0",
    sectionBgAlt: "#EDE7D3",
    cardBg: "rgba(245,239,224,0.65)",
    cardBorder: "1px solid rgba(122,155,94,0.35)",
    cardBorderTop: "2px solid #C9A84C",
    headingColor: "#2A3D2E",
    bodyColor: "rgba(42,61,46,0.8)",
    bodyColorLight: "rgba(42,61,46,0.7)",
    accentColor: "#7A9B5E",
    goldColor: "#C9A84C",
    mutedColor: "rgba(42,61,46,0.55)",
    iconBg: "#2A3D2E",
    iconColor: "#F5EFE0",
    iconBorder: "1px solid #C9A84C",
    iconRadius: "0",
    buttonBg: "#2A3D2E",
    buttonColor: "#F5EFE0",
    buttonBorder: "1px solid #C9A84C",
    buttonRadius: "8px",
    radiusCard: "14px",
    radiusImage: "14px",
    eyebrowColor: "#7A9B5E",
  },
  "adat-jawa-classic-luxury": {
    sectionBg: "#F8F1DE",
    sectionBgAlt: "#F8F1DE",
    cardBg: "rgba(255,255,255,0.55)",
    cardBorder: "1px solid rgba(201,166,70,0.3)",
    cardBorderTop: "2px solid #C9A646",
    headingColor: "#5B4A2D",
    bodyColor: "rgba(91,74,45,0.75)",
    bodyColorLight: "rgba(91,74,45,0.7)",
    accentColor: "#4F845E",
    goldColor: "#C9A646",
    mutedColor: "rgba(91,74,45,0.6)",
    iconBg: "#4F845E",
    iconColor: "#F8F1DE",
    iconBorder: "1px solid #C9A646",
    iconRadius: "9999px",
    buttonBg: "#C9A646",
    buttonColor: "#F8F1DE",
    buttonBorder: "1px solid #4F845E",
    buttonRadius: "9999px",
    radiusCard: "16px",
    radiusImage: "16px",
    eyebrowColor: "#C9A646",
  },
  "adat-jawa-royal": {
    sectionBg: "#140A06",
    sectionBgAlt: "#140A06",
    cardBg: "rgba(43,22,14,0.92)",
    cardBorder: "1px solid rgba(214,169,79,0.35)",
    cardBorderTop: "2px solid #D6A94F",
    headingColor: "#F8F0E3",
    bodyColor: "rgba(248,240,227,0.8)",
    bodyColorLight: "rgba(248,240,227,0.7)",
    accentColor: "#D6A94F",
    goldColor: "#D6A94F",
    mutedColor: "rgba(248,240,227,0.6)",
    iconBg: "#D6A94F",
    iconColor: "#2B160E",
    iconBorder: "1px solid #D6A94F",
    iconRadius: "0",
    buttonBg: "#D6A94F",
    buttonColor: "#2B160E",
    buttonBorder: "1px solid #D6A94F",
    buttonRadius: "2px",
    radiusCard: "4px",
    radiusImage: "2px",
    eyebrowColor: "#D6A94F",
  },
  "adat-batak-ulos": {
    sectionBg: "#1A0A0B",
    sectionBgAlt: "#120606",
    cardBg: "rgba(92,26,27,0.65)",
    cardBorder: "1px solid rgba(201,168,76,0.4)",
    cardBorderTop: "2px solid #C9A84C",
    headingColor: "#F7EBDD",
    bodyColor: "rgba(247,235,221,0.8)",
    bodyColorLight: "rgba(247,235,221,0.65)",
    accentColor: "#C9A84C",
    goldColor: "#C9A84C",
    mutedColor: "rgba(247,235,221,0.55)",
    iconBg: "#5C1A1B",
    iconColor: "#C9A84C",
    iconBorder: "1px solid #C9A84C",
    iconRadius: "9999px",
    buttonBg: "linear-gradient(135deg, #5C1A1B, #800020)",
    buttonColor: "#F7EBDD",
    buttonBorder: "1px solid #C9A84C",
    buttonRadius: "9999px",
    radiusCard: "16px",
    radiusImage: "14px",
    eyebrowColor: "#C9A84C",
  },
};

const QUOTES: Record<string, { openingQuote: string; heroQuote: string }> = {
  "sunda-priangan": {
    openingQuote: "Kalayan muji syukur ka Gusti Allah SWT, kami ngahaturkeun uleman kanggo rawuh dina pesta pernikahan kami.",
    heroQuote: "Kalayan rahmat sareng ridho Allah SWT, kami ngiring ngundang Bapak/Ibu/Saudara/i pikeun rawuh dina acara pernikahan kami.",
  },
  "adat-jawa-classic-luxury": {
    openingQuote: "Kawula saha keluarga ngaturaken sugeng rawuh dhumateng para tamu ingkang tansah kulo hormati.",
    heroQuote: "Kawula saha keluarga ngaturaken sugeng rawuh dhumateng para tamu ingkang tansah kulo hormati.",
  },
  "adat-jawa-royal": {
    openingQuote: "Kawula mugi sami binuka manah, tansah ndedonga, lan ngaturaken sugeng rawuh ing pawiwahan kawula.",
    heroQuote: "Kawula saha keluarga ngaturaken sugeng rawuh dhumateng para tamu ingkang tansah kulo hormati.",
  },
  "adat-batak-ulos": {
    openingQuote: "Horas! Marhite asi ni roha ni Debata, umbahen hami mangundang Bapak/Inong/Saudara/i tu pesta pernikahan hami.",
    heroQuote: "Dengan memohon rahmat dan ridho Allah SWT, serta restu para Raja dan Dongan Tubu, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam pesta pernikahan kami.",
  },
};

function getDefaultStyles(template?: TemplateSectionProps["template"]): ThemeStyleSet {
  const c = template?.layout?.colors ?? {};
  const primary = c.primary ?? "#4A3728";
  const secondary = c.secondary ?? "#C9A96E";
  const text = c.text ?? "#1a1a1a";
  return {
    sectionBg: c.background ?? "",
    sectionBgAlt: c.background ?? "",
    cardBg: "rgba(255,255,255,0.55)",
    cardBorder: "1px solid rgba(255,255,255,0.35)",
    cardBorderTop: `2px solid ${secondary}`,
    headingColor: primary,
    bodyColor: text,
    bodyColorLight: text,
    accentColor: secondary,
    goldColor: secondary,
    mutedColor: text,
    iconBg: primary,
    iconColor: "#ffffff",
    iconBorder: "none",
    iconRadius: "9999px",
    buttonBg: primary,
    buttonColor: "#ffffff",
    buttonBorder: "none",
    buttonRadius: "9999px",
    radiusCard: "2rem",
    radiusImage: "1.75rem",
    eyebrowColor: secondary,
    openingQuote: "Sebuah undangan hangat untuk menjadi bagian dari hari yang penuh cinta dan doa.",
    heroQuote: "Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami.",
    isThemed: false,
  };
}

export function getThemeStyles(template?: TemplateSectionProps["template"]): ThemeStyleSet {
  const theme = template?.layout?.visualTheme;
  if (!theme || !THEME_STYLES[theme]) return getDefaultStyles(template);
  const base = THEME_STYLES[theme];
  const quotes = QUOTES[theme] ?? QUOTES["adat-batak-ulos"];
  return { ...base, ...quotes, isThemed: true };
}

export function getThemeEyebrowText(template?: TemplateSectionProps["template"]): string {
  const theme = template?.layout?.visualTheme;
  switch (theme) {
    case "sunda-priangan": return "Wilujeng Sumping — Assalamualaikum Wr. Wb.";
    case "adat-jawa-classic-luxury":
    case "adat-jawa-royal": return "Pawiwahan — Assalamualaikum Wr. Wb.";
    case "adat-batak-ulos": return "Horas — Assalamualaikum Wr. Wb.";
    default: return "Assalamualaikum Wr. Wb.";
  }
}
