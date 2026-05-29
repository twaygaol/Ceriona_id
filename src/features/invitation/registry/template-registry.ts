import type { ThemeConfig, ThemeId } from "../types/template";
import { elegantWeddingV2Config } from "../templates/elegant-wedding/v2-config";
import { batakTobaV2Config } from "../templates/batak-toba/v2-config";
import { luxuryModernV2Config } from "../templates/luxury-modern/v2-config";
import { islamiV2Config } from "../templates/islami/v2-config";
import { jawaV2Config } from "../templates/jawa/v2-config";

const registry = new Map<ThemeId, ThemeConfig>();

function register(config: ThemeConfig) {
  registry.set(config.id, config);
}

register(elegantWeddingV2Config);
register(batakTobaV2Config);
register(luxuryModernV2Config);
register(islamiV2Config);
register(jawaV2Config);

export function getTemplateConfig(templateId: string): ThemeConfig | null {
  return registry.get(templateId as ThemeId) ?? null;
}

export function getAllTemplateConfigs(): ThemeConfig[] {
  return Array.from(registry.values());
}

export function getEnabledSections(templateId: string): string[] {
  const config = getTemplateConfig(templateId);
  if (!config) return [];
  return config.sections.filter((s) => s.enabled).sort((a, b) => a.order - b.order).map((s) => s.type);
}

export function getSectionConfig(templateId: string, sectionType: string) {
  const config = getTemplateConfig(templateId);
  if (!config) return null;
  return config.sections.find((s) => s.type === sectionType) ?? null;
}

export function isSectionEnabled(templateId: string, sectionType: string): boolean {
  return getSectionConfig(templateId, sectionType)?.enabled ?? false;
}
