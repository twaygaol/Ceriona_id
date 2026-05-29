import type { ThemeConfig } from "../../types";

export class ThemeAssetManager {
  private themeId: string;
  private config: ThemeConfig;

  constructor(themeId: string, config: ThemeConfig) {
    this.themeId = themeId;
    this.config = config;
  }

  assetPath(type: string, filename: string): string {
    return `/themes/${this.themeId}/assets/${type}/${filename}`;
  }

  getBackground(index?: number): string {
    const bg = (this.config as any).background;
    if (typeof bg === "string" && (bg.startsWith("http") || bg.startsWith("/"))) {
      return bg;
    }
    if (index !== undefined) {
      return this.assetPath("backgrounds", `bg-${index}.jpg`);
    }
    return `/themes/${this.themeId}/assets/backgrounds/bg-1.jpg`;
  }

  getOrnament(name: string): string {
    if (name.includes(".")) {
      return this.assetPath("ornaments", name);
    }
    return `/ornament/${name}.svg`;
  }

  getMusic(): string {
    return this.config.music.defaultTrack ?? this.assetPath("music", "theme.mp3");
  }

  getLottie(name: string): string {
    return this.assetPath("lottie", name);
  }

  getPreview(): string {
    return `/themes/${this.themeId}/assets/preview/preview.webp`;
  }

  getFrame(name: string): string {
    return this.assetPath("frames", name);
  }

  getIcon(name: string): string {
    return this.assetPath("icons", name);
  }
}

export function getThemeAssetPath(themeId: string, type: string, filename: string): string {
  return `/themes/${themeId}/assets/${type}/${filename}`;
}
