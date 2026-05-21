import type { TemplateSection } from "@/types/template";

export interface TemplateThemePreset {
  key: string;
  label: string;
  description: string;
  preview: string;
  values: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    gradientFrom: string;
    gradientTo: string;
    headingFont: string;
    bodyFont: string;
    buttonStyle: "solid" | "outline" | "rounded";
    borderRadius: "0px" | "4px" | "8px" | "16px" | "24px";
    isPremium: boolean;
    category: "wedding" | "birthday" | "graduation" | "custom";
  };
  sections: TemplateSection[];
  opening: {
    eyebrow: string;
    buttonLabel: string;
    ornament: "royal" | "floral" | "minimal";
  };
}

export const templateThemePresets: TemplateThemePreset[] = [
  {
    key: "chara-51-inspired",
    label: "Chara 51 Inspired",
    description: "Royal dark wedding theme dengan gold ornament dan opening cinematic.",
    preview: "radial-gradient(circle at 50% 18%,rgba(220,185,105,0.36),transparent 32%),linear-gradient(145deg,#100c0b,#2b1b16 48%,#070605)",
    values: {
      primaryColor: "#120D0B",
      secondaryColor: "#D9B86C",
      backgroundColor: "#100C0B",
      textColor: "#F7EBDD",
      gradientFrom: "#2A1A15",
      gradientTo: "#080605",
      headingFont: "Playfair Display",
      bodyFont: "DM Sans",
      buttonStyle: "rounded",
      borderRadius: "24px",
      isPremium: true,
      category: "wedding",
    },
    sections: ["opening", "hero", "quote", "countdown", "story", "gallery", "event", "rsvp", "wishes", "gift", "footer"],
    opening: {
      eyebrow: "The Wedding Of",
      buttonLabel: "Lihat Undangan",
      ornament: "royal",
    },
  },
  {
    key: "floral-romance",
    label: "Floral Romance",
    description: "Tema romantic soft rose dengan aksen floral dan nuansa intimate.",
    preview: "linear-gradient(145deg,#fff7f5,#f2d7d2)",
    values: {
      primaryColor: "#7E4F52",
      secondaryColor: "#D6A0A5",
      backgroundColor: "#FFF8F5",
      textColor: "#3B2928",
      gradientFrom: "#FFF8F5",
      gradientTo: "#F1D8D3",
      headingFont: "Cormorant Garamond",
      bodyFont: "Poppins",
      buttonStyle: "rounded",
      borderRadius: "24px",
      isPremium: true,
      category: "wedding",
    },
    sections: ["opening", "hero", "quote", "countdown", "story", "gallery", "event", "rsvp", "wishes", "footer"],
    opening: {
      eyebrow: "The Wedding Of",
      buttonLabel: "Buka Undangan",
      ornament: "floral",
    },
  },
  {
    key: "minimal-editorial",
    label: "Minimal Editorial",
    description: "Tema clean editorial dengan typography modern dan layout ringan.",
    preview: "linear-gradient(145deg,#ffffff,#eee7dc)",
    values: {
      primaryColor: "#27211D",
      secondaryColor: "#B99A62",
      backgroundColor: "#FAF7F2",
      textColor: "#2C2420",
      gradientFrom: "#FFFFFF",
      gradientTo: "#EEE7DC",
      headingFont: "Playfair Display",
      bodyFont: "Inter",
      buttonStyle: "outline",
      borderRadius: "16px",
      isPremium: false,
      category: "wedding",
    },
    sections: ["opening", "hero", "quote", "countdown", "gallery", "event", "rsvp", "footer"],
    opening: {
      eyebrow: "Wedding Invitation",
      buttonLabel: "View Invitation",
      ornament: "minimal",
    },
  },
  {
    key: "youtube-premiere",
    label: "YouTube Premiere",
    description: "Tema merah-hitam seperti premiere video, cocok untuk undangan modern dan playful.",
    preview: "radial-gradient(circle at 50% 18%,rgba(255,0,0,0.32),transparent 30%),linear-gradient(145deg,#0f0f0f,#2a0505 52%,#050505)",
    values: {
      primaryColor: "#0F0F0F",
      secondaryColor: "#FF0033",
      backgroundColor: "#0A0A0A",
      textColor: "#FFFFFF",
      gradientFrom: "#250505",
      gradientTo: "#050505",
      headingFont: "Montserrat",
      bodyFont: "Inter",
      buttonStyle: "rounded",
      borderRadius: "24px",
      isPremium: false,
      category: "custom",
    },
    sections: ["opening", "hero", "countdown", "gallery", "event", "rsvp", "wishes", "footer"],
    opening: {
      eyebrow: "Premiere Invitation",
      buttonLabel: "Play Undangan",
      ornament: "minimal",
    },
  },
  {
    key: "facebook-classic",
    label: "Facebook Classic",
    description: "Tema biru sosial yang clean, friendly, dan mudah dibaca untuk semua tamu.",
    preview: "linear-gradient(145deg,#1877F2,#0f4fa8 58%,#082b5c)",
    values: {
      primaryColor: "#0B3D91",
      secondaryColor: "#8EC5FF",
      backgroundColor: "#EEF5FF",
      textColor: "#102033",
      gradientFrom: "#1877F2",
      gradientTo: "#082B5C",
      headingFont: "Poppins",
      bodyFont: "Inter",
      buttonStyle: "rounded",
      borderRadius: "16px",
      isPremium: false,
      category: "custom",
    },
    sections: ["opening", "hero", "quote", "countdown", "gallery", "event", "rsvp", "wishes", "footer"],
    opening: {
      eyebrow: "Social Invitation",
      buttonLabel: "Lihat Undangan",
      ornament: "minimal",
    },
  },
  {
    key: "twitter-x-minimal",
    label: "Twitter / X Minimal",
    description: "Tema minimal hitam-putih dengan aksen biru, modern dan tajam.",
    preview: "radial-gradient(circle at 50% 18%,rgba(29,155,240,0.28),transparent 32%),linear-gradient(145deg,#000000,#111827)",
    values: {
      primaryColor: "#000000",
      secondaryColor: "#1D9BF0",
      backgroundColor: "#060606",
      textColor: "#F8FAFC",
      gradientFrom: "#000000",
      gradientTo: "#111827",
      headingFont: "Inter",
      bodyFont: "Inter",
      buttonStyle: "outline",
      borderRadius: "24px",
      isPremium: false,
      category: "custom",
    },
    sections: ["opening", "hero", "countdown", "event", "rsvp", "wishes", "footer"],
    opening: {
      eyebrow: "Now Live",
      buttonLabel: "Open Invite",
      ornament: "minimal",
    },
  },
  {
    key: "adat-jawa-royal",
    label: "Adat Jawa Royal",
    description: "Tema adat Jawa dengan nuansa sogan, gold, dan rasa klasik keraton.",
    preview: "radial-gradient(circle at 50% 18%,rgba(210,169,89,0.32),transparent 34%),linear-gradient(145deg,#2B160E,#6B3D1F 55%,#140A06)",
    values: {
      primaryColor: "#2B160E",
      secondaryColor: "#D6A94F",
      backgroundColor: "#F8F0E3",
      textColor: "#2A1A12",
      gradientFrom: "#6B3D1F",
      gradientTo: "#140A06",
      headingFont: "Cormorant Garamond",
      bodyFont: "DM Sans",
      buttonStyle: "rounded",
      borderRadius: "24px",
      isPremium: true,
      category: "wedding",
    },
    sections: ["opening", "hero", "quote", "countdown", "story", "gallery", "event", "rsvp", "wishes", "gift", "footer"],
    opening: {
      eyebrow: "Pawiwahan",
      buttonLabel: "Mlebet Undangan",
      ornament: "royal",
    },
  },
  {
    key: "adat-batak-ulos",
    label: "Adat Batak Ulos",
    description: "Tema adat Batak dengan merah, hitam, putih, dan aksen ulos yang tegas.",
    preview: "linear-gradient(145deg,#130707,#8B1E1E 46%,#111111 72%,#F5EFE3)",
    values: {
      primaryColor: "#151010",
      secondaryColor: "#B91C1C",
      backgroundColor: "#F7EFE4",
      textColor: "#211715",
      gradientFrom: "#8B1E1E",
      gradientTo: "#111111",
      headingFont: "Playfair Display",
      bodyFont: "Poppins",
      buttonStyle: "rounded",
      borderRadius: "16px",
      isPremium: true,
      category: "wedding",
    },
    sections: ["opening", "hero", "quote", "countdown", "story", "gallery", "event", "rsvp", "wishes", "gift", "footer"],
    opening: {
      eyebrow: "Horas Invitation",
      buttonLabel: "Buka Undangan",
      ornament: "royal",
    },
  },
];

export function getTemplateTheme(themeKey?: string | null) {
  return templateThemePresets.find((theme) => theme.key === themeKey) ?? templateThemePresets[0];
}
