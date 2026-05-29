/**
 * Verifikasi template engine — jalankan dengan: npx tsx scripts/verify-template-engine.ts
 */
import { getAllTemplateConfigs, getTemplateConfig, getEnabledSections, isSectionEnabled } from "../src/features/invitation/registry/template-registry";

const allConfigs = getAllTemplateConfigs();
let errors = 0;

console.log(`\n📋 Template Engine Verification`);
console.log(`═══════════════════════════════════`);
console.log(`Total template terdaftar: ${allConfigs.length}\n`);

for (const config of allConfigs) {
  console.log(`\n📁 ${config.name} (${config.id})`);
  console.log(`  ├ Category: ${config.category}`);
  console.log(`  ├ Premium: ${config.isPremium}`);
  console.log(`  ├ Colors: ${Object.keys(config.colors).length} tokens`);
  console.log(`  ├ Fonts: ${Object.keys(config.fonts).length} families`);
  console.log(`  ├ Decorations: ${config.decorations.enabled.length} elements`);
  console.log(`  ├ Sections: ${config.sections.length} total, ${getEnabledSections(config.id).length} enabled`);
  console.log(`  ├ Cover: ${config.sections.some(s => s.type === "cover" && s.enabled) ? "enabled" : "disabled"} (${config.cover.eyebrowText})`);
  console.log(`  └ Animations: cover=${config.animations.cover}, content=${config.animations.content}`);

  const lookup = getTemplateConfig(config.id);
  if (!lookup) {
    console.error(`  ❌ ERROR: getTemplateConfig("${config.id}") returned null`);
    errors++;
  }

  const enabled = getEnabledSections(config.id);
  if (enabled.length === 0) {
    console.error(`  ❌ ERROR: getEnabledSections("${config.id}") returned empty`);
    errors++;
  }

  for (const section of enabled) {
    if (!isSectionEnabled(config.id, section)) {
      console.error(`  ❌ ERROR: isSectionEnabled("${config.id}", "${section}") returned false`);
      errors++;
    }
  }
}

console.log(`\n${"=".repeat(40)}`);
if (errors === 0) {
  console.log(`✅ All ${allConfigs.length} templates verified successfully!`);
} else {
  console.log(`❌ ${errors} error(s) found`);
}
process.exit(errors > 0 ? 1 : 0);
