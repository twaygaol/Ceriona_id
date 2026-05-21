"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Palette, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { FloatingMusicButton } from "@/components/ui/FloatingMusicButton";
import { SectionRenderer } from "./SectionRenderer";
import { getTemplateTheme, templateThemePresets } from "@/services/templateThemeService";
import type { InvitationData } from "@/app/invitation/[slug]/InvitationClient";
import type { DashboardTemplate, TemplateSection } from "@/types/template";

interface DynamicTemplateProps {
  templateId: string;
  invitation: InvitationData;
}

export function DynamicTemplate({ templateId, invitation }: DynamicTemplateProps) {
  const [template, setTemplate] = useState<DashboardTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [activeThemeKey, setActiveThemeKey] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTemplate() {
      try {
        const response = await fetch(`/api/templates/${templateId}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          setTemplate(null);
          return;
        }

        setTemplate(await response.json());
      } catch {
        if (!controller.signal.aborted) setTemplate(null);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadTemplate();
    return () => controller.abort();
  }, [templateId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleShare = async () => {
    if (!navigator.share) return handleCopyLink();

    await navigator.share({
      title: `Undangan ${invitation.brideName} & ${invitation.groomName}`,
      text: "Kami mengundang Anda untuk hadir di hari bahagia kami.",
      url: window.location.href,
    });
  };

  if (isLoading) return <TemplateLoading />;

  if (!template) {
    return <div className="p-10 text-center">Template tidak ditemukan</div>;
  }

  const activeTheme = getTemplateTheme(activeThemeKey ?? template.layout.visualTheme);
  const colors = activeThemeKey
    ? {
        primary: activeTheme.values.primaryColor,
        secondary: activeTheme.values.secondaryColor,
        background: activeTheme.values.backgroundColor,
        text: activeTheme.values.textColor,
      }
    : template.layout.colors ?? {};
  const styles = template.styles ?? {};
  const gradient = activeThemeKey
    ? { from: activeTheme.values.gradientFrom, to: activeTheme.values.gradientTo }
    : template.layout.backgroundGradient;
  const themedTemplate: DashboardTemplate = activeThemeKey
    ? {
        ...template,
        layout: {
          ...template.layout,
          visualTheme: activeTheme.key,
          colors,
          backgroundGradient: gradient,
          fonts: {
            heading: activeTheme.values.headingFont,
            body: activeTheme.values.bodyFont,
          },
        },
        styles: {
          ...(template.styles ?? {}),
          buttonStyle: activeTheme.values.buttonStyle,
          borderRadius: activeTheme.values.borderRadius,
        },
      }
    : template;
  const sections = template.layout.sections?.length
    ? template.layout.sections
    : (["hero", "event", "rsvp"] satisfies TemplateSection[]);
  const hasOpeningGate = sections.includes("opening");
  const visibleSections = hasOpeningGate ? sections.filter((section) => section !== "opening") : sections;

  if (hasOpeningGate && !isOpened) {
    return <OpeningGate invitation={invitation} template={themedTemplate} onOpen={() => setIsOpened(true)} />;
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden selection:bg-current/15"
      style={{
        background: gradient?.from && gradient?.to
          ? `linear-gradient(160deg, ${gradient.from}, ${gradient.to})`
          : colors.background || "#FAF7F2",
        color: colors.text || "#2C2420",
        fontFamily: themedTemplate.layout.fonts?.body,
      }}
    >
      <Particles colors={colors} />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-80">
        <div className="absolute -left-28 top-20 h-80 w-80 rounded-full blur-3xl" style={{ backgroundColor: `${colors.secondary || "#C9A96E"}33` }} />
        <div className="absolute -right-28 top-1/2 h-96 w-96 rounded-full blur-3xl" style={{ backgroundColor: `${colors.primary || "#4A3728"}22` }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <FloatingMusicButton musicUrl={invitation.musicUrl} />

      <div className="relative z-10" style={{ borderRadius: styles.borderRadius || "0px" }}>
        {visibleSections.map((section, idx) => (
          <motion.div
            key={`${section}-${idx}`}
            id={`section-${section}`}
            initial={{ opacity: 0, y: 42, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: Math.min(idx * 0.03, 0.18) }}
            viewport={{ once: true, margin: "-120px" }}
          >
            <SectionRenderer type={section} invitation={invitation} template={themedTemplate} colors={colors} />
          </motion.div>
        ))}
      </div>

      <FloatingNavigation sections={visibleSections} colors={colors} />
      <ThemeSwitcher activeThemeKey={activeTheme.key} onChange={setActiveThemeKey} />

      <div className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/25 bg-black/25 p-2 text-white shadow-2xl backdrop-blur-2xl">
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm transition hover:bg-white/15"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          <span className="hidden sm:inline">{copied ? "Tersalin" : "Salin Link"}</span>
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm transition hover:bg-white/15"
        >
          <Share2 className="size-4" />
          <span className="hidden sm:inline">Bagikan</span>
        </button>
      </div>
    </main>
  );
}

function Particles({ colors }: { colors: DashboardTemplate["layout"]["colors"] }) {
  const safeColors = colors ?? {};

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {Array.from({ length: 18 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full opacity-40 blur-[0.5px]"
          style={{
            backgroundColor: index % 2 ? safeColors.secondary || "#D9B86C" : safeColors.primary || "#FFFFFF",
            left: `${(index * 37) % 100}%`,
            top: `${(index * 19) % 100}%`,
          }}
          animate={{ y: [0, -28, 0], opacity: [0.18, 0.55, 0.18], scale: [1, 1.35, 1] }}
          transition={{ duration: 5 + (index % 5), repeat: Infinity, delay: index * 0.18, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function FloatingNavigation({ sections, colors }: { sections: TemplateSection[]; colors: DashboardTemplate["layout"]["colors"] }) {
  const safeColors = colors ?? {};

  return (
    <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
      {sections.slice(0, 8).map((section) => (
        <a
          key={section}
          href={`#section-${section}`}
          className="group flex items-center justify-end gap-2 text-xs capitalize text-white/60"
        >
          <span className="rounded-full border border-white/15 bg-black/25 px-2 py-1 opacity-0 backdrop-blur-xl transition group-hover:opacity-100">{section}</span>
          <span className="h-2.5 w-2.5 rounded-full border border-white/25 bg-white/25 transition group-hover:scale-125" style={{ boxShadow: `0 0 18px ${safeColors.secondary || "#D9B86C"}` }} />
        </a>
      ))}
    </div>
  );
}

function ThemeSwitcher({ activeThemeKey, onChange }: { activeThemeKey: string; onChange: (key: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed left-4 top-4 z-40">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 text-sm text-white shadow-2xl backdrop-blur-2xl transition hover:bg-black/35"
      >
        <Palette className="size-4" />
        Theme
      </button>
      {open && (
        <div className="mt-3 w-72 rounded-3xl border border-white/15 bg-black/45 p-3 text-white shadow-2xl backdrop-blur-2xl">
          <p className="mb-2 px-2 text-xs uppercase tracking-[0.24em] text-white/45">Switch Visual Theme</p>
          <div className="space-y-2">
            {templateThemePresets.map((theme) => (
              <button
                key={theme.key}
                type="button"
                onClick={() => {
                  onChange(theme.key);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-2xl p-2 text-left transition hover:bg-white/10 ${activeThemeKey === theme.key ? "bg-white/10" : ""}`}
              >
                <span className="h-10 w-10 rounded-xl border border-white/15" style={{ background: theme.preview }} />
                <span>
                  <span className="block text-sm font-medium">{theme.label}</span>
                  <span className="line-clamp-1 text-xs text-white/45">{theme.description}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OpeningGate({ invitation, template, onOpen }: { invitation: InvitationData; template: DashboardTemplate; onOpen: () => void }) {
  const colors = template.layout.colors ?? {};
  const theme = getTemplateTheme(template.layout.visualTheme);
  const gradient = template.layout.backgroundGradient;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-5 text-center"
      style={{
        background: gradient?.from && gradient?.to
          ? `radial-gradient(circle at 50% 18%, ${colors.secondary || "#D9B86C"}40, transparent 34%), linear-gradient(155deg, ${gradient.from}, ${gradient.to})`
          : `linear-gradient(155deg, ${colors.primary || "#120D0B"}, #070605)`,
        color: colors.text || "#F7EBDD",
      }}
    >
      <div className="absolute inset-6 rounded-[2.5rem] border border-white/10" />
      <div className="absolute inset-10 rounded-[2rem] border border-[#D9B86C]/20" />
      {theme.opening.ornament === "royal" && (
        <>
          <div className="absolute left-8 top-8 h-24 w-24 rounded-tl-[3rem] border-l border-t border-[#D9B86C]/35" />
          <div className="absolute right-8 top-8 h-24 w-24 rounded-tr-[3rem] border-r border-t border-[#D9B86C]/35" />
          <div className="absolute bottom-8 left-8 h-24 w-24 rounded-bl-[3rem] border-b border-l border-[#D9B86C]/25" />
          <div className="absolute bottom-8 right-8 h-24 w-24 rounded-br-[3rem] border-b border-r border-[#D9B86C]/25" />
        </>
      )}

      <div className="relative mx-auto max-w-3xl">
        <p className="mb-5 text-xs uppercase tracking-[0.45em] text-white/55">{theme.opening.eyebrow}</p>
        <h1 className="font-serif text-6xl leading-none sm:text-7xl lg:text-8xl" style={{ color: colors.secondary || "#D9B86C" }}>
          {invitation.brideName} & {invitation.groomName}
        </h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/65">
          Dengan penuh cinta, kami mengundang Anda untuk menjadi bagian dari hari bahagia kami.
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="mt-10 rounded-full border border-[#D9B86C]/50 bg-[#D9B86C] px-8 py-3 text-sm font-semibold text-[#120D0B] shadow-2xl shadow-black/30 transition hover:-translate-y-0.5 hover:bg-[#F0D28B]"
        >
          {theme.opening.buttonLabel}
        </button>
      </div>
    </div>
  );
}

function TemplateLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#17110f] text-[#F8EFE4]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(201,169,110,0.24),transparent_38%),linear-gradient(160deg,#17110f,#3c2b22)]" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative text-center"
      >
        <div className="mx-auto mb-6 h-16 w-16 rounded-full border border-[#C9A96E]/30 p-2">
          <div className="h-full w-full animate-spin rounded-full border-2 border-[#C9A96E] border-t-transparent" />
        </div>
        <p className="text-xs uppercase tracking-[0.42em] text-[#C9A96E]">Digital Invitation</p>
        <p className="mt-3 font-serif text-3xl">Membuka Momen</p>
      </motion.div>
    </div>
  );
}
