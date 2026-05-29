import type { TemplateThemePreset } from "@/services/templateThemeService";
import { getAllThemeManifests, getThemePackage } from "@/features/invitation/renderer/theme-registry";

export function getRegistryPresets(): TemplateThemePreset[] {
  const manifests = getAllThemeManifests();

  return manifests.map((manifest) => {
    const pkg = getThemePackage(manifest.id);
    const colors = pkg?.config?.colors;
    const fonts = pkg?.config?.fonts;
    const layout = pkg?.config?.layout;

    const primaryColor = colors?.primary ?? "#241A16";
    const secondaryColor = colors?.accent ?? colors?.secondary ?? "#C9A96E";
    const backgroundColor = colors?.background ?? "#FAF7F2";
    const textColor = colors?.text ?? "#2C2420";
    const gradientFrom = colors?.surface ?? colors?.background ?? "#FAF7F2";
    const gradientTo = backgroundColor;

    const categoryMap: Record<string, string> = {
      traditional: "elegant",
      modern: "modern",
      luxury: "luxury",
      islami: "islami",
      minimal: "minimalist",
      custom: "custom",
    };

    const borderRadius = (() => {
      if (!layout?.borderRadius) return "16px" as const;
      const num = parseInt(layout.borderRadius);
      if (num <= 4) return "4px";
      if (num <= 8) return "8px";
      if (num <= 16) return "16px";
      return "24px";
    })() as "0px" | "4px" | "8px" | "16px" | "24px";

    const buttonStyle = (layout?.buttonStyle === "outline" ? "outline" : "rounded") as "solid" | "outline" | "rounded";

    return {
      key: manifest.id,
      label: manifest.name,
      description: manifest.description || pkg?.description || "",
      preview: `radial-gradient(circle at 50% 18%,${secondaryColor}44,transparent 34%),linear-gradient(135deg,${gradientFrom},${gradientTo})`,
      values: {
        primaryColor,
        secondaryColor,
        backgroundColor,
        textColor,
        gradientFrom,
        gradientTo,
        headingFont: fonts?.heading ?? "Playfair Display",
        bodyFont: fonts?.body ?? "DM Sans",
        buttonStyle,
        borderRadius,
        isPremium: pkg?.isPremium ?? manifest.tags?.includes("premium") ?? false,
        category: (categoryMap[manifest.category] || "elegant") as any,
      },
      sections: ["opening", "hero", "couple", "event", "story", "gallery", "rsvp", "gift", "footer"] as any,
      opening: {
        eyebrow: "The Wedding Of",
        buttonLabel: "Buka Undangan",
        ornament: "floral" as const,
      },
    };
  });
}
