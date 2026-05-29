import type { ThemePackage } from "../../types";
import { themeConfig } from "./config/theme.config";
import { manifest } from "./manifest";
import { OpeningScreen } from "./opening/OpeningScreen";
import { OpenInvitationButton } from "./opening/OpenInvitationButton";
import { EntranceAnimation } from "./opening/EntranceAnimation";
import { UlosDecoration } from "./decorations/UlosDecoration";
import { GorgaDecoration } from "./decorations/GorgaDecoration";
import { BatakCornerDecoration } from "./decorations/BatakCornerDecoration";
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
export { UlosDecoration };
export { GorgaDecoration };
export { BatakCornerDecoration };
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

export const themeId = "batak" as const;

export const themePackage: ThemePackage = {
  id: "batak",
  name: "Batak Toba",
  description: "Template adat Batak Toba dengan ulos dan gorga",
  isPremium: true,
  config: themeConfig,
  OpeningScreen,
  OpenInvitationButton,
  EntranceAnimation,
  MainLayout,
  SectionWrapper,
  decorations: [UlosDecoration, GorgaDecoration, BatakCornerDecoration],
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
