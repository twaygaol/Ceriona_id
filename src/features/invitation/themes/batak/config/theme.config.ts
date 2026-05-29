import type { ThemeConfig } from "../../../types";
import { colors } from "./colors";
import { fonts } from "./fonts";
import { animations } from "./animations";
import { music } from "./music";

export const themeConfig: ThemeConfig = {
  id: "batak",
  name: "Batak Toba",
  description: "Template adat Batak Toba dengan ulos dan gorga",
  isPremium: true,
  version: "1.0.0",
  category: "adat-batak",
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
