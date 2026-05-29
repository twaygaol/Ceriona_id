"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { getTemplateConfig, getAllTemplateConfigs } from "../registry/template-registry";
import type { ThemeConfig, ThemeColorPalette, ThemeFontSet } from "../types/template";

interface CustomizationPanelProps {
  templateId: string;
  onChange: (customization: Partial<ThemeConfig>) => void;
}

export function CustomizationPanel({ templateId, onChange }: CustomizationPanelProps) {
  const config = getTemplateConfig(templateId);
  const [activeTab, setActiveTab] = useState<"colors" | "fonts" | "sections">("colors");

  if (!config) return <div className="text-sm text-gray-500">Pilih template terlebih dahulu</div>;

  const handleColorChange = (key: keyof ThemeColorPalette, value: string) => {
    onChange({
      colors: { ...config.colors, [key]: value },
    });
  };

  const handleFontChange = (key: keyof ThemeFontSet, value: string) => {
    onChange({
      fonts: { ...config.fonts, [key]: value },
    });
  };

  const tabs = [
    { key: "colors", label: "Warna" },
    { key: "fonts", label: "Font" },
    { key: "sections", label: "Section" },
  ] as const;

  return (
    <div className="space-y-4">
      <div className="flex gap-1 rounded-xl border border-gold/15 bg-white/50 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition ${
              activeTab === tab.key
                ? "bg-brown text-gold-light"
                : "text-brown hover:bg-white/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "colors" && (
        <div className="space-y-4">
          {(
            [
              ["primary", "Primer"],
              ["secondary", "Sekunder"],
              ["background", "Latar"],
              ["text", "Teks"],
              ["accent", "Aksen"],
            ] as [keyof ThemeColorPalette, string][]
          ).map(([key, label]) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-brown">{label}</span>
                <span className="font-mono text-xs text-brown-light">{config.colors[key]}</span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="h-8 w-8 shrink-0 rounded-full border border-black/10"
                  style={{ backgroundColor: config.colors[key] }}
                />
                <HexColorPicker
                  color={config.colors[key]}
                  onChange={(value) => handleColorChange(key, value)}
                  className="!w-full !h-32"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "fonts" && (
        <div className="space-y-4">
          {(
            [
              ["heading", "Heading", config.fonts.heading],
              ["body", "Body", config.fonts.body],
              ["quote", "Quote", config.fonts.quote],
            ] as [keyof ThemeFontSet, string, string][]
          ).map(([key, label, value]) => (
            <div key={key} className="space-y-2">
              <label className="text-xs font-medium text-brown">{label}</label>
              <select
                value={value}
                onChange={(e) => handleFontChange(key, e.target.value)}
                className="w-full rounded-xl border border-gold/20 bg-white px-3 py-2 text-sm text-brown outline-none"
              >
                {["Cormorant Garamond", "Playfair Display", "DM Sans", "Inter", "Great Vibes", "Montserrat", "Poppins"].map((font) => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
              <p className="rounded-lg bg-white/50 px-3 py-2 text-sm" style={{ fontFamily: value }}>
                Sample text in {value}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "sections" && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-brown">Aktifkan/Nonaktifkan Section</p>
          <div className="space-y-2">
            {config.sections.filter((s) => s.type !== "cover").map((section) => (
              <label key={section.type} className="flex items-center justify-between rounded-xl border border-gold/15 bg-white/50 px-4 py-3">
                <span className="text-sm text-brown">{section.label}</span>
                <div
                  className={`h-5 w-9 rounded-full p-0.5 transition cursor-pointer ${section.enabled ? "bg-gold" : "bg-gray-200"}`}
                  onClick={() => {
                    const updatedSections = config.sections.map((s) =>
                      s.type === section.type ? { ...s, enabled: !s.enabled } : s
                    );
                    onChange({ sections: updatedSections });
                  }}
                >
                  <div className={`h-4 w-4 rounded-full bg-white transition ${section.enabled ? "translate-x-4" : "translate-x-0"}`} />
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function TemplateSwitcher({
  currentId,
  onSelect,
}: {
  currentId: string;
  onSelect: (id: string) => void;
}) {
  const allTemplates = getAllTemplateConfigs();

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-brown">Pilih Template</p>
      <div className="grid gap-2">
        {allTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`w-full rounded-xl border p-3 text-left transition ${
              template.id === currentId
                ? "border-brown bg-brown text-gold-light"
                : "border-gold/15 bg-white/50 text-brown hover:border-gold/40"
            }`}
          >
            <p className="text-sm font-medium">{template.name}</p>
            <p className="mt-0.5 text-xs opacity-70">{template.category}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
