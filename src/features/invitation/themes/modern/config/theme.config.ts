import type { ThemeConfig } from "../../../types";
import { colors } from "./colors";
import { fonts } from "./fonts";
import { animations } from "./animations";
import { music } from "./music";

export const themeConfig: ThemeConfig = {
  id: "modern",
  name: "Modern Minimalist",
  description: "Template modern minimalis dengan clean design",
  isPremium: true,
  version: "1.0.0",
  category: "modern",
  colors,
  fonts,
  animations,
  music,
  layout: {
    borderRadius: "0px",
    maxWidth: "1024px",
    spacing: "2rem",
    buttonStyle: "outline",
    containerStyle: "full",
  },
};
