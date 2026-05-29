import type { ThemePackage, ThemeManifest, ThemeRegistryEntryV2 } from "../types";
import { isThemeCompatible } from "../types";
import { ThemeAssetManager } from "../core/assets/ThemeAssetManager";

// ─── Bundled theme imports (tree-shakeable) ───────────────
import { themePackage as jawa, manifest as jawaManifest } from "../themes/jawa";
import { themePackage as batak, manifest as batakManifest } from "../themes/batak";
import { themePackage as islami, manifest as islamiManifest } from "../themes/islami";
import { themePackage as luxury, manifest as luxuryManifest } from "../themes/luxury";
import { themePackage as modern, manifest as modernManifest } from "../themes/modern";

const ENGINE_VERSION = "1.0.0";

// ─── Register 5 bundled themes ────────────────────────────
// These are always available sync (tree-shaken if unused)
const bundledThemes = [jawa, batak, islami, luxury, modern];
const bundledManifests: ThemeManifest[] = [jawaManifest, batakManifest, islamiManifest, luxuryManifest, modernManifest];

// ─── Dual Registry: sync (bundled) + async (marketplace) ──
const syncRegistry = new Map<string, ThemePackage>();
bundledThemes.forEach((pkg) => syncRegistry.set(pkg.id, pkg));

const asyncRegistry = new Map<string, ThemeRegistryEntryV2>();

// ─── Register bundled theme (sync, tree-shakeable) ────────
export function registerThemeSync(pkg: ThemePackage) {
  syncRegistry.set(pkg.id, pkg);
}

// ─── Register marketplace theme (async, lazy loaded) ──────
export function registerThemeAsync(
  manifest: ThemeManifest,
  loader: () => Promise<{ themePackage: ThemePackage } | ThemePackage>
) {
  if (!isThemeCompatible(manifest.minEngineVersion, ENGINE_VERSION)) {
    console.warn(`Theme "${manifest.id}" requires v${manifest.minEngineVersion}, engine is v${ENGINE_VERSION}`);
  }
  asyncRegistry.set(manifest.id, { manifest, loader: loader as any });
}

// ─── Get theme (sync - only works for bundled or cached) ──
export function getThemePackage(id: string): ThemePackage | null {
  if (syncRegistry.has(id)) return syncRegistry.get(id)!;
  const entry = asyncRegistry.get(id);
  return entry?.cached ?? null;
}

// ─── Get all available theme packages (sync) ──────────────
export function getAllThemePackages(): ThemePackage[] {
  const synced = Array.from(syncRegistry.values());
  const cached = Array.from(asyncRegistry.values())
    .filter((e) => e.cached)
    .map((e) => e.cached!);
  return [...synced, ...cached];
}

// ─── Get theme manifest (sync) ────────────────────────────
export function getThemeManifest(id: string): ThemeManifest | null {
  const bundled = bundledManifests.find((m) => m.id === id);
  if (bundled) return bundled;
  return asyncRegistry.get(id)?.manifest ?? null;
}

// ─── Get all manifests (for marketplace, dashboard listing)─
export function getAllThemeManifests(): ThemeManifest[] {
  const async = Array.from(asyncRegistry.values()).map((e) => e.manifest);
  return [...bundledManifests, ...async];
}

// ─── Async load (for marketplace themes) ──────────────────
export async function loadThemePackage(id: string): Promise<ThemePackage | null> {
  const synced = syncRegistry.get(id);
  if (synced) return synced;

  const entry = asyncRegistry.get(id);
  if (!entry) return null;
  if (entry.cached) return entry.cached;

  try {
    const mod: any = await entry.loader();
    const pkg = mod.themePackage ?? mod.default ?? mod;
    entry.cached = pkg;
    entry.loaded = true;
    return pkg;
  } catch (err) {
    console.error(`Failed to load theme "${id}":`, err);
    return null;
  }
}

// ─── Check if theme is registered ─────────────────────────
export function isThemeRegistered(id: string): boolean {
  return syncRegistry.has(id) || asyncRegistry.has(id);
}

// ─── Get Asset Manager for a theme ────────────────────────
export function getThemeAssetManager(id: string): ThemeAssetManager | null {
  const pkg = getThemePackage(id);
  if (!pkg) return null;
  return new ThemeAssetManager(id, pkg.config);
}

// ─── Version helpers ──────────────────────────────────────
export function getEngineVersion(): string {
  return ENGINE_VERSION;
}

export function checkThemeCompatibility(manifest: ThemeManifest) {
  if (!isThemeCompatible(manifest.minEngineVersion, ENGINE_VERSION)) {
    return { compatible: false, reason: `Theme requires engine v${manifest.minEngineVersion}, current is v${ENGINE_VERSION}` };
  }
  return { compatible: true };
}
