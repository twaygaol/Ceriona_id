import type { ThemePackage } from "../../types";
import { themeConfig } from "./config/theme.config";
import { manifest } from "./manifest";
import { OpeningScreen } from "./opening/OpeningScreen";
import { OpenInvitationButton } from "./opening/OpenInvitationButton";
import { EntranceAnimation } from "./opening/EntranceAnimation";
import { BatikDecoration } from "./decorations/BatikDecoration";
import { GununganDecoration } from "./decorations/GununganDecoration";
import { FloralDecoration } from "./decorations/FloralDecoration";
import { CoverSection } from "./sections/CoverSection";
import { HeroSection } from "./sections/HeroSection";
import { CoupleSection } from "./sections/CoupleSection";
import { EventSection } from "./sections/EventSection";
import { StorySection } from "./sections/StorySection";
import { GalleryVariant } from "./sections/GalleryVariant";
import { GiftVariant } from "./sections/GiftVariant";
import { RSVPVariant } from "./sections/RSVPVariant";
import { FooterSection } from "./sections/FooterSection";
import { MomentSection } from "./sections/MomentSection";
import { VideoSection } from "./sections/VideoSection";
import { MainLayout } from "./layouts/MainLayout";
import { SectionWrapper } from "./layouts/SectionWrapper";
import { DesktopShowcaseLayout } from "./layouts/DesktopShowcaseLayout";

export { manifest };
export { themeConfig };
export { OpeningScreen };
export { OpenInvitationButton };
export { EntranceAnimation };
export { BatikDecoration };
export { GununganDecoration };
export { FloralDecoration };
export { CoverSection };
export { HeroSection };
export { CoupleSection };
export { EventSection };
export { StorySection };
export { GalleryVariant };
export { GiftVariant };
export { RSVPVariant };
export { FooterSection };
export { MomentSection };
export { VideoSection };
export { MainLayout };
export { SectionWrapper };
export { DesktopShowcaseLayout };

export const themeId = "jawa" as const;

export const themePackage: ThemePackage = {
  id: "jawa",
  name: "Adat Jawa",
  description: "Template pernikahan adat Jawa dengan nuansa sogan coklat keemasan",
  isPremium: true,
  config: themeConfig,
  OpeningScreen,
  OpenInvitationButton,
  EntranceAnimation,
  MainLayout,
  SectionWrapper,
  DesktopShowcaseLayout,
  decorations: [BatikDecoration, GununganDecoration, FloralDecoration],
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
    MomentSection,
    VideoSection,
  },
};
