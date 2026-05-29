import type { ThemeConfig } from "../../../types";
import { colors } from "./colors";
import { fonts } from "./fonts";
import { animations } from "./animations";
import { music } from "./music";

export const themeConfig: ThemeConfig = {
  id: "jawa",
  name: "Adat Jawa",
  description: "Template pernikahan adat Jawa dengan nuansa sogan coklat keemasan, batik, dan gamelan",
  isPremium: true,
  version: "1.0.0",
  category: "adat-jawa",
  colors,
  fonts,
  animations,
  music,
  layout: {
    borderRadius: "12px",
    maxWidth: "1200px",
    spacing: "1.5rem",
    buttonStyle: "rounded",
    containerStyle: "framed",
  },
};
