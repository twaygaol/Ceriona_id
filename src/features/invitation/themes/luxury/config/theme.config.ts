import type { ThemeConfig } from "../../../types";
import { colors } from "./colors";
import { fonts } from "./fonts";
import { animations } from "./animations";
import { music } from "./music";

export const themeConfig: ThemeConfig = {
  id: "luxury",
  name: "Black Gold Luxury",
  description: "Template premium black gold dengan efek sparkle",
  isPremium: true,
  version: "1.0.0",
  category: "luxury",
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
