import type { DashboardTemplate } from "@/types/template";
import { getAllThemeManifests, getThemePackage } from "@/features/invitation/renderer/theme-registry";

export function getRegistryAsDashboardTemplates(): DashboardTemplate[] {
  const manifests = getAllThemeManifests();

  return manifests.map((manifest) => {
    const pkg = getThemePackage(manifest.id);
    const colors = pkg?.config?.colors;
    const fonts = pkg?.config?.fonts;
    const layout = pkg?.config?.layout;

    const categoryMap: Record<string, string> = {
      traditional: "wedding",
      modern: "wedding",
      luxury: "wedding",
      islami: "wedding",
      minimal: "wedding",
      custom: "custom",
    };

    return {
      id: manifest.id,
      name: manifest.name,
      slug: manifest.slug,
      description: manifest.description || pkg?.description || "",
      category: (categoryMap[manifest.category] || "wedding") as any,
      thumbnail: manifest.thumbnail,
      previewImage: manifest.preview,
      layout: {
        sections: ["opening", "hero", "couple", "event", "story", "gallery", "rsvp", "gift", "footer"] as any,
        visualTheme: manifest.id,
        colors: {
          primary: colors?.primary ?? "#241A16",
          secondary: colors?.secondary ?? "#C9A96E",
          background: colors?.background ?? "#FAF7F2",
          text: colors?.text ?? "#2C2420",
        },
        backgroundGradient: {
          from: colors?.surface ?? colors?.background ?? "#FAF7F2",
          to: colors?.background ?? "#FAF7F2",
        },
        fonts: {
          heading: fonts?.heading ?? "Playfair Display",
          body: fonts?.body ?? "DM Sans",
        },
        opening: {
          eyebrow: "The Wedding Of",
          buttonLabel: "Buka Undangan",
          ornament: "floral" as const,
        },
      },
      styles: {
        borderRadius: layout?.borderRadius ?? "16px",
        buttonStyle: layout?.buttonStyle === "outline" ? "outline" : "rounded",
      },
      isPremium: pkg?.isPremium ?? false,
      isActive: true,
      isDefault: false,
      usageCount: 0,
      createdBy: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });
}
