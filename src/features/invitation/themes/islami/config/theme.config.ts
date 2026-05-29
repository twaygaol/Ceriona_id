import type { ThemeConfig } from "../../../types";
import { colors } from "./colors";
import { fonts } from "./fonts";
import { animations } from "./animations";
import { music } from "./music";

export const themeConfig: ThemeConfig = {
  id: "islami",
  name: "Islami Elegance",
  description: "Template Islami dengan nuansa hijau emerald dan emas yang elegan dan spiritual",
  isPremium: false,
  version: "1.0.0",
  category: "islami",
  colors,
  fonts,
  animations,
  music,
  layout: {
    borderRadius: "8px",
    maxWidth: "1200px",
    spacing: "1.5rem",
    buttonStyle: "rounded",
    containerStyle: "framed",
  },
};
