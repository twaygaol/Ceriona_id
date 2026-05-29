import type { ThemeConfig } from "../types/template";

export function resolveAssetPath(config: ThemeConfig, relativePath: string): string {
  return relativePath;
}

export function getBackgroundStyle(config: ThemeConfig): React.CSSProperties {
  const { backgroundType, backgroundValue } = config.cover;
  switch (backgroundType) {
    case "gradient":
      return { backgroundImage: backgroundValue };
    case "image":
      return {
        backgroundImage: `url(${backgroundValue})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    case "color":
      return { backgroundColor: backgroundValue };
    case "video":
      return { backgroundColor: "#000" };
    default:
      return {};
  }
}

export function fontFamilyString(fonts: { heading: string; body: string; quote: string }): string {
  return "";
}
