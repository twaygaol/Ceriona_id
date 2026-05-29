import type { ThemePackage } from "../../types";
import { themeConfig } from "./config/theme.config";
import { manifest } from "./manifest";
import { OpeningScreen } from "./opening/OpeningScreen";
import { OpenInvitationButton } from "./opening/OpenInvitationButton";
import { EntranceAnimation } from "./opening/EntranceAnimation";
import { CalligraphyDecoration } from "./decorations/CalligraphyDecoration";
import { GeometricIslami } from "./decorations/GeometricIslami";
import { LanternDecoration } from "./decorations/LanternDecoration";
import { CoverSection } from "./sections/CoverSection";
import { HeroSection } from "./sections/HeroSection";
import { CoupleSection } from "./sections/CoupleSection";
import { EventSection } from "./sections/EventSection";
import { StorySection } from "./sections/StorySection";
import { GalleryVariant } from "./sections/GalleryVariant";
import { GiftVariant } from "./sections/GiftVariant";
import { RSVPVariant } from "./sections/RSVPVariant";
import { FooterSection } from "./sections/FooterSection";
import { MainLayout } from "./layouts/MainLayout";
import { SectionWrapper } from "./layouts/SectionWrapper";

export { manifest };
export { themeConfig };
export { OpeningScreen };
export { OpenInvitationButton };
export { EntranceAnimation };
export { CalligraphyDecoration };
export { GeometricIslami };
export { LanternDecoration };
export { CoverSection };
export { HeroSection };
export { CoupleSection };
export { EventSection };
export { StorySection };
export { GalleryVariant };
export { GiftVariant };
export { RSVPVariant };
export { FooterSection };
export { MainLayout };
export { SectionWrapper };

export const themeId = "islami" as const;

export const themePackage: ThemePackage = {
  id: "islami",
  name: "Islami Elegance",
  description: "Template Islami dengan nuansa hijau emerald dan emas yang elegan dan spiritual",
  isPremium: false,
  config: themeConfig,
  OpeningScreen,
  OpenInvitationButton,
  EntranceAnimation,
  MainLayout,
  SectionWrapper,
  decorations: [CalligraphyDecoration, GeometricIslami, LanternDecoration],
  sections: {
    CoverSection,
    HeroSection,
    CoupleSection,
    EventSection,
    StorySection,
    GalleryVariant,
    GiftVariant,
    RSVPVariant,
    FooterSection,
  },
};
