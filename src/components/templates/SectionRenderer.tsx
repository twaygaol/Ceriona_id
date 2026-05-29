"use client";

import { memo, useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, Copy, Gift, Heart, MapPin, MessageCircleHeart, Navigation, PlayCircle, Quote, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { RSVPForm } from "@/features/rsvp/RSVPForm";
import type { TemplateSection, TemplateSectionProps } from "@/types/template";
import { getThemeStyles, getThemeEyebrowText, type ThemeStyleSet } from "./themeStyles";
import { DynamicDivider, DynamicCorner, DynamicFlower, DynamicHeader, DynamicFooterBar, SundaFooterBar, SundaMelati, getPatternClass } from "./ornaments";

const fallbackGallery = ["/images/gallery-1.jpg", "/images/gallery-2.jpg", "/images/gallery-3.jpg"];

function themeName(template?: TemplateSectionProps["template"]): string | undefined {
  return template?.layout?.visualTheme;
}

// ─── Shell & Card ─────────────────────────────────────────────────────────────

function SectionShell({ eyebrow, title, children, className = "", template, style }: {
  eyebrow: string; title: string; children: React.ReactNode; className?: string; style?: React.CSSProperties;
  template?: TemplateSectionProps["template"];
}) {
  const s = getThemeStyles(template);
  if (s.isThemed) {
    const patternClass = getPatternClass(template);
    return (
      <section className={`relative px-4 py-0 sm:px-8 lg:px-16 ${patternClass ?? ""} ${className}`} style={{ background: s.sectionBg, ...style }}>
        <DynamicDivider template={template} />
        <div className="relative px-4 py-14 sm:py-18 lg:py-20">
          <DynamicCorner className="left-0 top-0" template={template} />
          <DynamicCorner className="right-0 top-0 scale-x-[-1]" template={template} />
          <div className="pointer-events-none absolute inset-x-4 top-6 h-px" style={{ background: `linear-gradient(90deg,transparent,${s.goldColor} 30%,${s.goldColor} 50%,${s.goldColor} 70%,transparent)` }} />
          <div className="pointer-events-none absolute inset-x-4 bottom-6 h-px" style={{ background: `linear-gradient(90deg,transparent,${s.goldColor} 30%,${s.goldColor} 50%,${s.goldColor} 70%,transparent)` }} />
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <DynamicFlower className="mx-auto mb-3" template={template} />
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.42em]" style={{ color: s.eyebrowColor }}>{eyebrow}</p>
              <div className="mx-auto mb-5 h-px w-24" style={{ background: `linear-gradient(90deg,transparent,${s.goldColor},transparent)` }} />
              <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl" style={{ color: s.headingColor }}>{title}</h2>
            </div>
            {children}
          </div>
        </div>
        <DynamicDivider template={template} />
      </section>
    );
  }
  return (
    <section className={`relative px-4 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24 ${className}`} style={style}>
      <div className="pointer-events-none absolute inset-x-6 top-8 h-px bg-gradient-to-r from-transparent via-[#D9B86C]/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-6 bottom-8 h-px bg-gradient-to-r from-transparent via-[#D9B86C]/25 to-transparent" />
      <div className="pointer-events-none absolute left-4 top-10 h-20 w-20 rounded-tl-[3rem] border-l border-t border-[#D9B86C]/25" />
      <div className="pointer-events-none absolute right-4 top-10 h-20 w-20 rounded-tr-[3rem] border-r border-t border-[#D9B86C]/25" />
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em]" style={{ color: s.eyebrowColor }}>{eyebrow}</p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl" style={{ color: s.headingColor }}>{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function GlassCard({ children, className = "", template }: {
  children: React.ReactNode; className?: string; template?: TemplateSectionProps["template"];
}) {
  const s = getThemeStyles(template);
  if (s.isThemed) {
    return (
      <div className={`relative overflow-hidden backdrop-blur-sm ${className}`}
        style={{
          background: s.cardBg, border: s.cardBorder, borderTop: s.cardBorderTop,
          borderRadius: s.radiusCard,
          boxShadow: s.radiusCard === "14px" ? "0 2px 28px rgba(42,61,46,0.08), 0 1px 4px rgba(201,168,76,0.06)"
            : s.radiusCard === "16px" ? "0 2px 24px rgba(79,132,94,0.08), 0 1px 4px rgba(201,166,70,0.06)"
            : s.radiusCard === "4px" ? `0 0 0 1px ${s.goldColor}1e, inset 0 1px 0 ${s.goldColor}14`
            : "none",
        }}
      >
        {children}
      </div>
    );
  }
  return (
    <div className={`rounded-[2rem] border border-white/35 bg-white/55 shadow-[0_30px_90px_-55px_rgba(44,36,32,0.75)] backdrop-blur-2xl ${className}`}>
      {children}
    </div>
  );
}

// ─── Opening Section ──────────────────────────────────────────────────────────

const OpeningSection = memo(function OpeningSection({ invitation, template }: TemplateSectionProps) {
  const t = themeName(template);
  const isThemed = t === "sunda-priangan" || t === "adat-jawa-royal" || t === "adat-batak-ulos" || t === "adat-jawa-classic-luxury";
  const s = getThemeStyles(template);
  const bgImage = template?.layout?.opening?.backgroundImage;

  if (isThemed) {
    // Use theme-specific backgrounds from themeStyles
    const bgColor = t === "sunda-priangan" ? "#1E2E20" 
      : t === "adat-batak-ulos" ? "#1A0A0B" 
      : t === "adat-jawa-classic-luxury" ? s.sectionBg 
      : "#140A06";
    
    const frameColor = `${s.goldColor}33`; // 20% opacity
    const frameColor2 = `${s.accentColor}1a`; // 10% opacity

    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 text-center" style={{ background: bgColor }} aria-label="Opening section">
        {bgImage && <Image src={bgImage} alt="" fill priority sizes="100vw" className="scale-105 object-cover opacity-35" aria-hidden="true" />}
        <div className="absolute inset-0" aria-hidden="true" style={{
          background: bgImage ? `linear-gradient(to bottom, ${bgColor}80, ${bgColor}a0, ${bgColor}e6)` : s.isThemed
            ? `radial-gradient(ellipse 80% 60% at 50% 30%, ${t === "sunda-priangan" ? "rgba(122,155,94,0.3)" : t === "adat-batak-ulos" ? "rgba(139,30,30,0.45)" : t === "adat-jawa-classic-luxury" ? "rgba(201,166,70,0.25)" : "rgba(214,169,79,0.35)"} 0%, transparent 70%)`
            : "",
        }} />
        {!bgImage && t === "sunda-priangan" && (
          <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true" style={{ backgroundImage: `repeating-linear-gradient(-45deg,${s.goldColor} 0px,transparent 1px,transparent 20px,${s.goldColor} 21px,transparent 22px)` }} />
        )}
        {!bgImage && t === "adat-jawa-royal" && (
          <div className="absolute inset-0 opacity-8" aria-hidden="true" style={{ backgroundImage: `repeating-linear-gradient(-30deg,${s.goldColor} 0px,transparent 1px,transparent 16px,${s.goldColor} 17px,transparent 18px),repeating-linear-gradient(30deg,${s.goldColor} 0px,transparent 1px,transparent 16px,${s.goldColor} 17px,transparent 18px)` }} />
        )}
        {!bgImage && t === "adat-batak-ulos" && (
          <div className="absolute inset-0 opacity-15" aria-hidden="true" style={{ backgroundImage: `repeating-linear-gradient(0deg,rgba(201,168,76,0.4) 0px,rgba(201,168,76,0.4) 2px,transparent 2px,transparent 16px),repeating-linear-gradient(90deg,rgba(92,26,27,0.5) 0px,rgba(92,26,27,0.5) 2px,transparent 2px,transparent 28px)` }} />
        )}
        <DynamicHeader template={template} />
        {t !== "adat-jawa-classic-luxury" && (
          <>
            <div className="absolute inset-6" aria-hidden="true" style={{ border: `1px solid ${frameColor}` }} />
            <div className="absolute inset-10" aria-hidden="true" style={{ border: `1px solid ${frameColor2}` }} />
          </>
        )}
        <DynamicCorner className="left-0 top-0" template={template} />
        <DynamicCorner className="right-0 top-0 scale-x-[-1]" template={template} />
        <DynamicCorner className="bottom-0 left-0 scale-y-[-1]" template={template} />
        <DynamicCorner className="bottom-0 right-0 scale-[-1]" template={template} />
        {t === "sunda-priangan" && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 overflow-hidden" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 64" preserveAspectRatio="none" className="h-full w-full">
              <g fill={s.goldColor} opacity="0.35">
                {Array.from({ length: 50 }, (_, i) => {
                  const x = i * 16;
                  return <polygon key={i} points={`${x + 8},64 ${x + 24},64 ${x + 16},48`} />;
                })}
              </g>
            </svg>
          </div>
        )}

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative z-10 max-w-3xl">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center" style={{ border: `1px solid ${s.goldColor}`, background: `${s.goldColor}14` }}>
            <DynamicFlower template={template} className="size-8" />
          </div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.55em]" style={{ color: s.goldColor }}>
            {template?.layout?.opening?.eyebrow || s.openingQuote.split('.')[0]}
          </p>
          <div className="relative mx-auto mb-6 h-px w-40" aria-hidden="true">
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg,transparent,${s.goldColor},transparent)` }} />
            <div style={{ position: "absolute", left: "50%", top: "-3px", width: "6px", height: "6px", background: s.accentColor, transform: "translateX(-50%) rotate(45deg)" }} />
          </div>
          <h1 className="font-serif text-5xl leading-none sm:text-7xl lg:text-8xl" style={{ color: s.headingColor }}>
            {invitation.brideName}
          </h1>
          <p className="my-4 font-serif text-3xl" style={{ color: s.goldColor }}>&amp;</p>
          <h1 className="font-serif text-5xl leading-none sm:text-7xl lg:text-8xl" style={{ color: s.headingColor }}>
            {invitation.groomName}
          </h1>
          <div className="relative mx-auto mt-6 h-px w-40" aria-hidden="true">
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg,transparent,${s.goldColor},transparent)` }} />
            <div style={{ position: "absolute", left: "50%", top: "-3px", width: "6px", height: "6px", background: s.accentColor, transform: "translateX(-50%) rotate(45deg)" }} />
          </div>
          <p className="mx-auto mt-6 max-w-md text-sm leading-7" style={{ color: s.bodyColorLight }}>{s.openingQuote}</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 text-center">
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 18%, ${s.goldColor}33, transparent 34%), linear-gradient(145deg, ${s.headingColor}, #120f0d)` }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(201,169,110,0.28),transparent_42%)]" />
      <div className="absolute inset-6 rounded-[2.5rem] border border-white/10" />
      <div className="absolute inset-10 rounded-[2rem] border border-[#D9B86C]/20" />
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative z-10 max-w-3xl text-white">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
          <Heart className="size-7" style={{ color: s.goldColor }} />
        </div>
        <p className="mb-5 text-xs uppercase tracking-[0.45em] text-white/60">The Wedding Of</p>
        <h1 className="font-serif text-6xl leading-none sm:text-7xl lg:text-8xl" style={{ color: s.goldColor }}>
          {invitation.brideName} & {invitation.groomName}
        </h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/70">{s.openingQuote}</p>
      </motion.div>
    </section>
  );
});

// ─── Hero Section ─────────────────────────────────────────────────────────────

const HeroSection = memo(function HeroSection({ invitation, template }: TemplateSectionProps) {
  const heroImage = invitation.heroImage ?? invitation.gallery?.[0];
  const t = themeName(template);
  const s = getThemeStyles(template);
  const goldColor = s.goldColor;
  const headingColor = s.headingColor;
  const bodyColor = s.bodyColor;
  const eyebrowText = getThemeEyebrowText(template);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-14 pt-5 text-center" style={{ background: t === "sunda-priangan" ? s.sectionBg : "none" }} aria-label="Hero section">
      {heroImage && (
        <Image src={heroImage} alt={`Foto ${invitation.brideName} dan ${invitation.groomName}`} fill priority sizes="100vw" className="scale-105 object-cover" />
      )}

      {t === "sunda-priangan" && (
        <>
          <div className="absolute inset-0" aria-hidden="true" style={{ background: "linear-gradient(to bottom, rgba(30,46,32,0.45), rgba(42,61,46,0.5), rgba(30,46,32,0.88))" }} />
          <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true" style={{ backgroundImage: `repeating-linear-gradient(-30deg,${s.goldColor} 0px,transparent 1px,transparent 18px,${s.goldColor} 19px,transparent 20px),repeating-linear-gradient(30deg,${s.accentColor} 0px,transparent 1px,transparent 18px,${s.accentColor} 19px,transparent 20px)` }} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 overflow-hidden" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 32" preserveAspectRatio="none" className="h-full w-full">
              {Array.from({ length: 50 }, (_, i) => {
                const x = i * 16;
                return <polygon key={i} points={`${x + 8},32 ${x + 24},32 ${x + 16},16`} fill={s.goldColor} opacity={i % 2 === 0 ? "0.45" : "0.2"} />;
              })}
            </svg>
          </div>
        </>
      )}
      {t === "adat-jawa-classic-luxury" && (
        <>
        <div
        className="absolute inset-0 opacity-90"
        aria-hidden="true"
        style={{
          background: "url('/ornament/header-04.svg') center/cover no-repeat",
        }}
      />

      {/* ivory wash */}
      <div className="absolute inset-0 -z-20 bg-[#F8F1DE]/40" aria-hidden="true" />

      {/* soft vignette */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_28%,rgba(245, 0, 0, 0.58),transparent_34%),linear-gradient(to_bottom,rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.96)_78%,#F8F1DE)]" aria-hidden="true" />

      {/* frame */}
      <div className="pointer-events-none absolute inset-4 border border-[#C9A646]/20 sm:inset-6" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-7 border border-[#C9A646]/10 sm:inset-10" aria-hidden="true" />

      {/* corners */}
      <DynamicCorner className="left-0 top-0 opacity-50" template={template} />
      <DynamicCorner className="right-0 top-0 scale-x-[-1] opacity-50" template={template} />
      <DynamicCorner className="bottom-0 left-0 scale-y-[-1] opacity-30" template={template} />
      <DynamicCorner className="bottom-0 right-0 scale-[-1] opacity-30" template={template} />

      {/* top divider */}
      <div className="relative z-10 mx-auto mb-8 max-w-xs">
        <div className="h-px bg-gradient-to-r from-transparent via-[#C9A646]/70 to-transparent" />
        <div className="mx-auto mt-2 h-1.5 w-1.5 rotate-45 bg-[#C9A646]" />
      </div>
        </>
      )}
      {t === "adat-jawa-royal" && (
        <>
          <div
        className="absolute inset-0 -z-30 opacity-80"
        style={{
          background: "url('/ornament/header-03.svg') center/cover no-repeat",
        }}
      />

      {/* ivory wash */}
      <div className="absolute inset-0 -z-20 bg-[#F8F1DE]/40" />

      {/* soft vignette */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_28%,rgba(245, 0, 0, 0.58),transparent_34%),linear-gradient(to_bottom,rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.96)_78%,#F8F1DE)]" />

      {/* frame */}
      <div className="pointer-events-none absolute inset-4 border border-[#C9A646]/20 sm:inset-6" />
      <div className="pointer-events-none absolute inset-7 border border-[#C9A646]/10 sm:inset-10" />

      {/* corners */}
      <DynamicCorner className="left-0 top-0 opacity-50" template={template} />
      <DynamicCorner className="right-0 top-0 scale-x-[-1] opacity-50" template={template} />
      <DynamicCorner className="bottom-0 left-0 scale-y-[-1] opacity-30" template={template} />
      <DynamicCorner className="bottom-0 right-0 scale-[-1] opacity-30" template={template} />

      {/* top divider */}
      <div className="relative z-10 mx-auto mb-8 max-w-xs">
        <div className="h-px bg-gradient-to-r from-transparent via-[#C9A646]/70 to-transparent" />
        <div className="mx-auto mt-2 h-1.5 w-1.5 rotate-45 bg-[#C9A646]" />
      </div>
        </>
      )}
      {t === "adat-batak-ulos" && (
        <>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,10,11,0.5), rgba(92,26,27,0.45), rgba(26,10,11,0.88))" }} />
          <div className="absolute inset-0 opacity-15" style={{ backgroundImage: `repeating-linear-gradient(0deg, #C9A84C 0px, #C9A84C 2px, transparent 2px, transparent 20px), repeating-linear-gradient(90deg, #5C1A1B 0px, #5C1A1B 2px, transparent 2px, transparent 28px)` }} />
        </>
      )}
      {(t === "sunda-priangan" || t === "adat-jawa-classic-luxury") && (
        <>
          <div className="absolute inset-x-6 bottom-8 h-px" aria-hidden="true" style={{ background: `linear-gradient(90deg,transparent,${goldColor} 40%,${goldColor} 60%,transparent)` }} />
          <div className="absolute inset-x-6 top-8 h-px" aria-hidden="true" style={{ background: `linear-gradient(90deg,transparent,${goldColor} 40%,${goldColor} 60%,transparent)` }} />
        </>
      )}
      {t === "adat-jawa-royal" && (
        <>
          <div className="absolute inset-x-6 bottom-8 h-px" aria-hidden="true" style={{ background: `linear-gradient(90deg,transparent,${goldColor} 40%,${goldColor} 60%,transparent)` }} />
          <div className="absolute inset-x-6 top-8 h-px" aria-hidden="true" style={{ background: `linear-gradient(90deg,transparent,${goldColor} 40%,${goldColor} 60%,transparent)` }} />
        </>
      )}
      {t === "adat-batak-ulos" && (
        <>
          <div className="absolute inset-x-6 bottom-8 h-px" aria-hidden="true" style={{ background: `linear-gradient(90deg,transparent,${s.accentColor} 40%,${s.accentColor} 60%,transparent)` }} />
          <div className="absolute inset-x-6 top-8 h-px" aria-hidden="true" style={{ background: `linear-gradient(90deg,transparent,${s.buttonBg} 40%,${s.buttonBg} 60%,transparent)` }} />
        </>
      )}
      {(t === "sunda-priangan" || t === "adat-jawa-classic-luxury") && (
        <div className="absolute inset-x-6 top-8 h-px" style={{ background: `linear-gradient(90deg,transparent,${goldColor} 40%,${goldColor} 60%,transparent)` }} />
      )}
      {t === "adat-jawa-royal" && (
        <>
          <div className="absolute inset-0" aria-hidden="true" style={{ background: "linear-gradient(to bottom, rgba(20,10,6,0.5), rgba(43,22,14,0.55), rgba(20,10,6,0.85))" }} />
          <div className="absolute inset-0 opacity-12" aria-hidden="true" style={{ backgroundImage: `repeating-linear-gradient(-25deg, transparent 0px, transparent 12px, ${s.goldColor} 12px, ${s.goldColor} 13px, transparent 13px, transparent 24px)` }} />
        </>
      )}
      {t === "adat-batak-ulos" && (
        <>
          <div className="absolute inset-0" aria-hidden="true" style={{ background: "linear-gradient(to bottom, rgba(26,10,11,0.5), rgba(92,26,27,0.45), rgba(26,10,11,0.88))" }} />
          <div className="absolute inset-0 opacity-15" aria-hidden="true" style={{ backgroundImage: `repeating-linear-gradient(0deg, #C9A84C 0px, #C9A84C 2px, transparent 2px, transparent 20px), repeating-linear-gradient(90deg, #5C1A1B 0px, #5C1A1B 2px, transparent 2px, transparent 28px)` }} />
        </>
      )}
      {t === "adat-batak-ulos" && (
        <>
          <div className="absolute inset-x-6 bottom-8 h-px" style={{ background: "linear-gradient(90deg,transparent,#C9A84C 40%,#C9A84C 60%,transparent)" }} />
          <div className="absolute inset-x-6 top-8 h-px" style={{ background: "linear-gradient(90deg,transparent,#5C1A1B 40%,#5C1A1B 60%,transparent)" }} />
        </>
      )}
      {t !== "sunda-priangan" && t !== "adat-jawa-classic-luxury" && t !== "adat-jawa-royal" && t !== "adat-batak-ulos" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/50 to-black/80" />
          <div className="absolute inset-4 rounded-[2rem] border border-white/10" />
          <div className="absolute inset-x-10 bottom-10 h-px bg-gradient-to-r from-transparent via-[#D9B86C]/45 to-transparent" />
          <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        </>
      )}

      {(t === "sunda-priangan" || t === "adat-jawa-royal" || t === "adat-batak-ulos") && (
        <>
          <DynamicCorner className="left-0 top-0" template={template} />
          <DynamicCorner className="right-0 top-0 scale-x-[-1]" template={template} />
        </>
      )}

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:text-left">
        {/* photo */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative mx-auto w-full max-w-[360px] lg:max-w-[430px]"
        >
          <div className="absolute -inset-3 rounded-t-full border border-[#C9A646]/25" />
          <div className="absolute -inset-6 rounded-t-full bg-[#C9A646]/10 blur-2xl" />

          <div className="relative aspect-[3/4.15] overflow-hidden rounded-t-full rounded-b-[2rem] border border-[#C9A646]/40 bg-[#F5EBD3] shadow-[0_28px_80px_rgba(91,74,45,0.18)]">
           <Image
              src="/ornament/pengantin.jpg"
              alt={`Foto ${invitation.brideName} dan ${invitation.groomName}`}
              fill
              priority
              sizes="(max-width: 768px) 86vw, 430px"
              className="object-cover"
            />

            {/* {heroImage ? (
              <Image
                src={heroImage}
                alt={`Foto ${invitation.brideName} dan ${invitation.groomName}`}
                fill
                priority
                sizes="(max-width: 768px) 86vw, 430px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-8">
                <DynamicFlower className="size-20 opacity-60" template={template} />
              </div>
            )} */}

            {/* ornament svg overlay */}
            <div
              className="pointer-events-none absolute inset-0 z-30 opacity-70"
              // style={{
              //   background: "url('/ornament/header-07.svg') center/cover no-repeat",
              //   mixBlendMode: "multiply",
              // }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-[#F8F1DE]/70" />
          </div>
        </motion.div>

        {/* text */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mx-auto max-w-2xl lg:mx-0"
        >
          <DynamicFlower className="mx-auto mb-4 size-10 lg:mx-0" template={template} />

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.5em] text-[#4F845E]">
            Pawiwahan
          </p>

          <div className="mb-7 flex items-center justify-center gap-3 lg:justify-start">
            <div className="h-px w-14 bg-[#C9A646]/45" />
            <div className="h-1.5 w-1.5 rotate-45 bg-[#C9A646]" />
            <div className="h-px w-14 bg-[#C9A646]/45" />
          </div>

          <h1 className="font-serif text-5xl leading-[0.95] text-[#5B4A2D] sm:text-7xl lg:text-8xl">
            {invitation.brideName}
          </h1>

          <div className="my-5 flex items-center justify-center gap-4 lg:justify-start">
            <div className="h-px w-16 bg-[#C9A646]/45" />
            <span className="font-serif text-3xl text-[#C9A646]">&amp;</span>
            <div className="h-px w-16 bg-[#C9A646]/45" />
          </div>

          <h1 className="font-serif text-5xl leading-[0.95] text-[#5B4A2D] sm:text-7xl lg:text-8xl">
            {invitation.groomName}
          </h1>

          <p className="mx-auto mt-8 max-w-md text-sm leading-7 text-[#6A5A43] lg:mx-0">
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i
            untuk hadir dalam acara pernikahan kami.
          </p>

          <div className="mx-auto mt-8 h-px w-44 bg-gradient-to-r from-transparent via-[#C9A646]/70 to-transparent lg:mx-0" />
        </motion.div>
      </div>

      {/* bottom divider */}
      <div className="relative z-10 mx-auto mt-8 max-w-xs">
        <div className="mx-auto mb-2 h-1.5 w-1.5 rotate-45 bg-[#C9A646]" />
        <div className="h-px bg-gradient-to-r from-transparent via-[#C9A646]/70 to-transparent" />
      </div>
    </section>
  );
});

// ─── Quote Section ────────────────────────────────────────────────────────────

const QuoteSection = memo(function QuoteSection({ template }: TemplateSectionProps) {
  const s = getThemeStyles(template);
  return (
    <SectionShell eyebrow="Firman Ilahi" title="Tentang Cinta" template={template}
      className={s.isThemed ? "" : ""}
      style={s.isThemed ? { background: s.sectionBg } : undefined}
    >
      <GlassCard className="mx-auto max-w-3xl p-8 text-center sm:p-12" template={template}>
        <Quote className="mx-auto mb-6 size-10" style={{ color: s.accentColor, opacity: 0.7 }} />
        <p className="font-serif text-2xl italic leading-relaxed sm:text-3xl" style={{ color: s.headingColor }}>
          &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya.&rdquo;
        </p>
        <p className="mt-6 text-sm uppercase tracking-[0.24em]" style={{ color: s.accentColor }}>
          QS. Ar-Rum: 21
        </p>
      </GlassCard>
    </SectionShell>
  );
});

// ─── Countdown Section ────────────────────────────────────────────────────────

const CountdownSection = memo(function CountdownSection({ invitation, template }: TemplateSectionProps) {
  const target = new Date(invitation.eventDate).getTime();
  const [diff, setDiff] = useState(0);
  const s = getThemeStyles(template);

  useEffect(() => {
    const update = () => setDiff(Math.max(target - Date.now(), 0));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  const items: [number, string][] = [[days, "Hari"], [hours, "Jam"], [minutes, "Menit"], [seconds, "Detik"]];

  return (
    <SectionShell eyebrow="Menghitung Hari" title="Menuju Hari Bahagia" template={template}
      style={s.isThemed ? { background: s.sectionBgAlt } : undefined}
    >
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
        {items.map(([value, label]) =>
          s.isThemed ? (
            <div key={label} className="relative p-6 text-center" style={{
              background: s.radiusCard === "14px" ? "#2A3D2E" : s.radiusCard === "16px" ? "rgba(255,255,255,0.55)" : s.radiusCard === "4px" && s.sectionBg === "#140A06" ? "#2B160E" : "#151010",
              border: `1px solid ${s.goldColor}66`,
              borderTop: `3px solid ${s.goldColor}`,
              borderRadius: s.radiusCard,
              boxShadow: s.radiusCard === "14px" ? "0 2px 20px rgba(42,61,46,0.15)" : s.radiusCard === "16px" ? "0 2px 24px rgba(79,132,94,0.08), 0 1px 4px rgba(201,166,70,0.06)" : `inset 0 1px 0 ${s.goldColor}1e`,
            }}>
              <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${s.goldColor},transparent)` }} />
              <p className="font-serif text-5xl sm:text-6xl" style={{ color: s.radiusCard === "16px" ? "#5B4A2D" : "#F5EFE0" }}>{value}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: s.accentColor }}>{label}</p>
            </div>
          ) : (
            <GlassCard key={label} className="relative overflow-hidden p-6 text-center" template={template}>
              <div className="absolute inset-x-6 top-0 h-px" style={{ backgroundColor: s.goldColor }} />
              <p className="font-serif text-5xl sm:text-6xl" style={{ color: s.headingColor }}>{value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] opacity-55">{label}</p>
            </GlassCard>
          )
        )}
      </div>
    </SectionShell>
  );
});

// ─── Story Section ────────────────────────────────────────────────────────────

const StorySection = memo(function StorySection({ invitation, template }: TemplateSectionProps) {
  const s = getThemeStyles(template);
  if (!invitation.story) return null;
  return (
    <SectionShell eyebrow="Our Journey" title="Kisah Cinta Kami" template={template}
      style={s.isThemed ? { background: s.sectionBg } : undefined}
    >
      <div className="mx-auto max-w-4xl">
        <GlassCard className="relative overflow-hidden p-8 sm:p-12" template={template}>
          <div className="absolute left-10 top-0 h-full w-px" style={{ background: s.isThemed
            ? `linear-gradient(to bottom, transparent, ${s.goldColor} 30%, ${s.accentColor} 70%, transparent)`
            : "linear-gradient(to bottom, transparent, rgba(0,0,0,0.2), transparent)"
          }} />
          <div className="relative flex gap-6">
            <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center shadow-lg"
              style={{
                backgroundColor: s.iconBg, color: s.iconColor,
                borderRadius: s.iconRadius,
                border: s.iconBorder,
              }}
            >
              <Heart className="size-5" />
            </div>
            <p className="text-base leading-8 sm:text-lg" style={{ color: s.bodyColor }}>{invitation.story}</p>
          </div>
        </GlassCard>
      </div>
    </SectionShell>
  );
});

// ─── Gallery Section ──────────────────────────────────────────────────────────

const GallerySection = memo(function GallerySection({ invitation, template }: TemplateSectionProps) {
  const images = invitation.gallery?.length ? invitation.gallery : fallbackGallery;
  const s = getThemeStyles(template);
  return (
    <SectionShell eyebrow="Mémori Kami" title="Galeri Bahagia" template={template}
      style={s.isThemed ? { background: s.sectionBgAlt } : undefined}
    >
      <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image, index) => (
          <motion.div key={`${image}-${index}`} whileHover={{ scale: 1.025 }}
            className={`relative overflow-hidden bg-black/10 shadow-2xl ${index === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
            style={{
              borderRadius: s.radiusImage,
              border: s.isThemed ? `1px solid ${s.cardBorder.split(")")[0]})` : "none",
            }}
          >
            <Image src={image} alt={`Galeri ${index + 1}`} fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover transition duration-700 hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-80" />
            {s.isThemed && (
              <div className="absolute inset-x-0 bottom-0 h-1" style={{ background: `linear-gradient(90deg,transparent,${s.goldColor} 40%,${s.accentColor} 50%,${s.goldColor} 60%,transparent)` }} />
            )}
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
});

// ─── Event Section ────────────────────────────────────────────────────────────

const EventSection = memo(function EventSection({ invitation, template }: TemplateSectionProps) {
  const s = getThemeStyles(template);
  return (
    <SectionShell eyebrow="Save The Date" title="Detail Acara" template={template}
      style={s.isThemed ? { background: s.sectionBg } : undefined}
    >
      <GlassCard className="mx-auto max-w-4xl p-6 sm:p-8" template={template}>
        <div className="grid gap-4 md:grid-cols-3">
          <Detail icon={Calendar} label="Tanggal" value={new Date(invitation.eventDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} template={template} />
          <Detail icon={Clock} label="Waktu" value={invitation.eventTime} template={template} />
          <Detail icon={MapPin} label="Tempat" value={invitation.eventLocation} template={template} />
        </div>
        {invitation.googleMapsUrl && (
          <a href={invitation.googleMapsUrl} target="_blank" rel="noopener noreferrer"
            className="mx-auto mt-8 inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-sm transition hover:scale-[1.01] sm:w-auto"
            style={{ backgroundColor: s.buttonBg, color: s.buttonColor, borderRadius: s.buttonRadius, border: s.buttonBorder }}
          >
            <Navigation className="size-4" /> Buka Google Maps
          </a>
        )}
      </GlassCard>
    </SectionShell>
  );
});

function Detail({ icon: Icon, label, value, template }: {
  icon: typeof Calendar; label: string; value: string; template?: TemplateSectionProps["template"];
}) {
  const s = getThemeStyles(template);
  if (s.isThemed) {
    return (
      <div className="p-5 text-center" style={{
        background: s.cardBg, border: s.cardBorder, borderTop: `2px solid ${s.goldColor}`,
        borderRadius: s.radiusCard === "14px" ? "12px" : s.radiusCard === "16px" ? "16px" : s.radiusCard,
        boxShadow: s.radiusCard === "14px" ? "0 2px 16px rgba(42,61,46,0.06)" : s.radiusCard === "16px" ? "0 2px 24px rgba(79,132,94,0.08), 0 1px 4px rgba(201,166,70,0.06)" : "none",
      }}>
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center"
          style={{ backgroundColor: s.iconBg, color: s.iconColor, borderRadius: s.iconRadius, border: s.iconBorder }}
        >
          <Icon className="size-5" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: s.accentColor }}>{label}</p>
        <p className="mt-2 font-medium leading-6" style={{ color: s.headingColor }}>{value}</p>
      </div>
    );
  }
  return (
    <div className="rounded-[1.5rem] border border-white/40 bg-white/55 p-5 text-center backdrop-blur-xl">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-white" style={{ backgroundColor: s.iconBg }}>
        <Icon className="size-5" />
      </div>
      <p className="text-xs uppercase tracking-[0.26em] opacity-50">{label}</p>
      <p className="mt-2 font-medium leading-6">{value}</p>
    </div>
  );
}

// ─── RSVP Section ─────────────────────────────────────────────────────────────

const RSVPSection = memo(function RSVPSection({ invitation, template }: TemplateSectionProps) {
  const s = getThemeStyles(template);
  return (
    <SectionShell eyebrow="Be Our Guest" title="RSVP & Pangéstu" template={template}
      style={s.isThemed ? { background: s.sectionBgAlt } : undefined}
    >
      <GlassCard className="mx-auto max-w-xl p-5 sm:p-8" template={template}>
        <RSVPForm invitationId={invitation.id} />
      </GlassCard>
    </SectionShell>
  );
});

// ─── Wishes Section ───────────────────────────────────────────────────────────

const WishesSection = memo(function WishesSection({ invitation, template }: TemplateSectionProps) {
  const s = getThemeStyles(template);
  const [wishes, setWishes] = useState(invitation.rsvps?.filter((rsvp) => rsvp.attending && rsvp.message) ?? []);
  useEffect(() => {
    const loadWishes = async () => {
      try {
        const response = await fetch(`/api/rsvp/${invitation.id}`, { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        setWishes(data.filter((rsvp: { attending: boolean; message?: string | null }) => rsvp.attending && rsvp.message));
      } catch { /* keep existing */ }
    };
    const timer = window.setInterval(loadWishes, 5000);
    return () => window.clearInterval(timer);
  }, [invitation.id]);

  return (
    <SectionShell eyebrow="Doa & Harapan" title="Ucapan & Doa" template={template}
      style={s.isThemed ? { background: s.sectionBg } : undefined}
    >
      <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
        {wishes.length === 0 ? (
          <GlassCard className="col-span-full p-8 text-center text-sm" template={template}>
            <span style={{ color: s.mutedColor }}>Belum ada ucapan. Jadilah yang pertama memberi doa terbaik.</span>
          </GlassCard>
        ) : (
          wishes.map((wish) => (
            <GlassCard key={wish.id} className="p-5" template={template}>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center"
                  style={{ backgroundColor: s.iconBg, color: s.iconColor, borderRadius: s.iconRadius, border: s.iconBorder }}
                >
                  <MessageCircleHeart className="size-4" />
                </div>
                <p className="font-medium" style={{ color: s.headingColor }}>{wish.name}</p>
              </div>
              <p className="text-sm italic leading-7" style={{ color: s.bodyColor }}>&ldquo;{wish.message}&rdquo;</p>
            </GlassCard>
          ))
        )}
      </div>
    </SectionShell>
  );
});

// ─── Gift Section ─────────────────────────────────────────────────────────────

interface VirtualGiftItem { id: string; type: string; provider: string; accountNumber?: string | null; accountName?: string | null; qrImageUrl?: string | null; }

const GiftSection = memo(function GiftSection({ invitation, template }: TemplateSectionProps) {
  const s = getThemeStyles(template);
  const [gifts, setGifts] = useState<VirtualGiftItem[]>([]);
  useEffect(() => {
    async function loadGifts() {
      try { const response = await fetch(`/api/gifts/${invitation.id}`, { cache: "no-store" }); if (response.ok) setGifts(await response.json()); }
      catch { setGifts([]); }
    }
    loadGifts();
  }, [invitation.id]);

  return (
    <SectionShell eyebrow="With Love" title="Wedding Gift" template={template}
      style={s.isThemed ? { background: s.sectionBgAlt } : undefined}
    >
      <GlassCard className="mx-auto max-w-2xl p-8 text-center" template={template}>
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center"
          style={{ backgroundColor: s.iconBg, color: s.iconColor, borderRadius: s.iconRadius, border: s.iconBorder }}
        >
          <Gift className="size-6" />
        </div>
        <p className="text-sm leading-7" style={{ color: s.bodyColor }}>
          Doa restu Anda adalah hadiah terbaik bagi kami. Terima kasih atas cinta dan perhatian yang diberikan.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {gifts.map((gift) => (
            <div key={gift.id} className="p-4 text-left" style={{
              background: s.cardBg, border: s.cardBorder, borderRadius: s.radiusCard === "14px" ? "10px" : s.radiusCard,
              backdropFilter: "blur(8px)",
            }}>
              <p className="text-xs font-semibold uppercase tracking-[0.26em]" style={{ color: s.accentColor }}>{gift.type}</p>
              <p className="mt-1 font-semibold" style={{ color: s.headingColor }}>{gift.provider}</p>
              {gift.accountNumber && <p className="mt-2 font-mono text-sm" style={{ color: s.bodyColor }}>{gift.accountNumber}</p>}
              {gift.accountName && <p className="text-sm" style={{ color: s.bodyColorLight }}>a.n. {gift.accountName}</p>}
              {gift.accountNumber && (
                <button type="button" onClick={() => navigator.clipboard.writeText(gift.accountNumber ?? "")}
                  className="mt-3 px-3 py-1 text-xs" style={{ borderRadius: s.buttonRadius, border: `1px solid ${s.accentColor}`, color: s.accentColor }}
                >Salin Nomor</button>
              )}
            </div>
          ))}
        </div>
      </GlassCard>
    </SectionShell>
  );
});

// ─── Live Streaming Section ───────────────────────────────────────────────────

interface LiveStreamItem { id: string; provider: string; title: string; url: string; scheduledAt?: string | null; status: string; }

const LiveStreamingSection = memo(function LiveStreamingSection({ invitation, template }: TemplateSectionProps) {
  const s = getThemeStyles(template);
  const [streams, setStreams] = useState<LiveStreamItem[]>([]);
  useEffect(() => {
    async function loadStreams() {
      try { const response = await fetch(`/api/live-streams/${invitation.id}`, { cache: "no-store" }); if (response.ok) setStreams(await response.json()); }
      catch { setStreams([]); }
    }
    loadStreams();
  }, [invitation.id]);
  if (streams.length === 0) return null;

  return (
    <SectionShell eyebrow="Watch Online" title="Live Streaming" template={template}
      style={s.isThemed ? { background: s.sectionBg } : undefined}
    >
      <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
        {streams.map((stream) => (
          <GlassCard key={stream.id} className="p-6" template={template}>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center"
                style={{ backgroundColor: s.iconBg, color: s.iconColor, borderRadius: s.iconRadius, border: s.iconBorder }}
              >
                <PlayCircle className="size-5" />
              </div>
              <div>
                <p className="font-medium" style={{ color: s.headingColor }}>{stream.title}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: s.accentColor }}>
                  {stream.provider} · {stream.status}
                </p>
              </div>
            </div>
            {stream.scheduledAt && (
              <p className="mb-5 text-sm" style={{ color: s.bodyColorLight }}>
                {new Date(stream.scheduledAt).toLocaleString("id-ID")}
              </p>
            )}
            <a href={stream.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-sm font-medium transition hover:scale-[1.01]"
              style={{ backgroundColor: s.buttonBg, color: s.buttonColor, borderRadius: s.buttonRadius, border: s.buttonBorder }}
            >
              <PlayCircle className="size-4" /> Tonton Live
            </a>
          </GlassCard>
        ))}
      </div>
    </SectionShell>
  );
});

// ─── Footer Section ───────────────────────────────────────────────────────────

const FooterSection = memo(function FooterSection({ invitation, template }: TemplateSectionProps) {
  const t = themeName(template);
  const s = getThemeStyles(template);

  if (t === "sunda-priangan") {
    return (
      <footer className="relative overflow-hidden text-center" style={{ background: "#F5EFE0" }}>
        <SundaFooterBar />
        <div className="relative px-4 py-16" style={{ background: "linear-gradient(to bottom, #2A3D2E, #1E2E20)", borderTop: "2px solid #C9A84C" }}>
          <div className="absolute inset-x-0 top-0 h-10 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(-30deg,#C9A84C 0px,transparent 1px,transparent 16px,#C9A84C 17px,transparent 18px),repeating-linear-gradient(30deg,#7A9B5E 0px,transparent 1px,transparent 16px,#7A9B5E 17px,transparent 18px)` }} />
          <DynamicCorner className="left-0 top-0" template={template} />
          <DynamicCorner className="right-0 top-0 scale-x-[-1]" template={template} />
          <div className="pointer-events-none absolute inset-6" style={{ border: "1px solid rgba(201,168,76,0.15)" }} />
          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center" style={{ border: "1px solid #C9A84C", background: "rgba(201,168,76,0.1)" }}>
              <SundaMelati className="size-6" />
            </div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.48em]" style={{ color: "#C9A84C" }}>Hatur Nuhun — Terima Kasih</p>
            <div className="relative mx-auto mb-5 h-px w-24">
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,#C9A84C,transparent)" }} />
              <div style={{ position: "absolute", left: "50%", top: "-3px", width: "6px", height: "6px", background: "#7A9B5E", transform: "translateX(-50%) rotate(45deg)" }} />
            </div>
            <p className="font-serif text-5xl" style={{ color: "#F5EFE0" }}>{invitation.brideName} <span style={{ color: "#C9A84C" }}>&</span> {invitation.groomName}</p>
            <button type="button" onClick={() => navigator.clipboard.writeText(window.location.href)} className="mt-8 inline-flex items-center gap-2 px-5 py-3 text-sm transition hover:opacity-90" style={{ border: "1px solid rgba(201,168,76,0.5)", background: "rgba(201,168,76,0.1)", color: "#C9A84C", borderRadius: "8px" }}>
              <Copy className="size-4" /> Salin Link Undangan
            </button>
          </div>
        </div>
        <div className="h-5 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 20" preserveAspectRatio="none" className="h-full w-full">
            <rect width="800" height="20" fill="#1E2E20" />
            {Array.from({ length: 50 }, (_, i) => {
              const x = i * 16;
              return <polygon key={i} points={`${x},20 ${x + 16},20 ${x + 8},4`} fill="#C9A84C" opacity={i % 2 === 0 ? "0.5" : "0.2"} />;
            })}
          </svg>
        </div>
      </footer>
    );
  }

  if (s.isThemed) {
    const footerBgGrad = t === "adat-jawa-classic-luxury"
      ? "linear-gradient(to bottom, #F8F1DE, #F5EBD3)"
      : t === "adat-jawa-royal"
      ? "linear-gradient(to bottom, #2B160E, #140A06)"
      : t === "adat-batak-ulos"
      ? "linear-gradient(to bottom, #1A0A0B, #0D0606)"
      : "linear-gradient(to bottom, #151010, #0E0808)";
    const borderColor = t === "adat-jawa-classic-luxury" ? "#C9A646" : t === "adat-jawa-royal" ? "#D6A94F" : t === "adat-batak-ulos" ? "#C9A84C" : "#B91C1C";
    const bgColor = t === "adat-jawa-classic-luxury" ? "#F8F1DE" : t === "adat-jawa-royal" ? "#140A06" : t === "adat-batak-ulos" ? "#1A0A0B" : "#0E0808";

    return (
      <footer className="relative overflow-hidden text-center" style={{ background: bgColor }}>
        <DynamicFooterBar template={template} />
        <div className="relative px-4 py-16" style={{ background: footerBgGrad, borderTop: `2px solid ${borderColor}` }}>
          <DynamicCorner className="left-0 top-0" template={template} />
          <DynamicCorner className="right-0 top-0 scale-x-[-1]" template={template} />
          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center" style={{ border: `1px solid ${s.goldColor}`, background: `rgba(${t === "adat-jawa-classic-luxury" ? "201,166,70" : t === "adat-jawa-royal" ? "214,169,79" : t === "adat-batak-ulos" ? "92,26,27" : "185,28,28"},0.15)` }}>
              <DynamicFlower template={template} className="size-6" />
            </div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.48em]" style={{ color: s.accentColor }}>
              {t === "adat-jawa-classic-luxury" ? "Matur Nuwun" : t === "adat-jawa-royal" ? "Pawiwahan — Matur Nuwun" : t === "adat-batak-ulos" ? "Horas — Mauliate" : "Horas — Terima Kasih"}
            </p>
            <div className="mx-auto mb-5 h-px w-24" style={{ background: `linear-gradient(90deg,transparent,${s.goldColor},transparent)` }} />
            <p className="font-serif text-5xl" style={{ color: s.headingColor }}>{invitation.brideName} <span style={{ color: s.goldColor }}>&</span> {invitation.groomName}</p>
            <button type="button" onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="mt-8 inline-flex items-center gap-2 px-5 py-3 text-sm transition hover:opacity-90"
              style={{ border: `1px solid ${s.goldColor}99`, background: `${s.goldColor}1a`, color: s.goldColor, borderRadius: s.buttonRadius }}
            >
              <Copy className="size-4" /> Salin Link Undangan
            </button>
          </div>
        </div>
        {t !== "adat-jawa-classic-luxury" && <div className="h-4 w-full" style={{ background: s.isThemed ? `repeating-linear-gradient(90deg, ${borderColor} 0px, ${borderColor} 4px, transparent 4px, transparent 12px)` : "" }} />}
        {t === "adat-jawa-classic-luxury" && <div className="h-4 w-full" style={{ background: `repeating-linear-gradient(90deg, #C9A646 0px, #C9A646 4px, #F5EBD3 4px, #F5EBD3 12px)` }} />}
      </footer>
    );
  }

  return (
    <footer className="relative overflow-hidden px-4 py-20 text-center text-white" style={{ backgroundColor: s.headingColor }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18),transparent_38%)]" />
      <div className="relative mx-auto max-w-3xl">
        <Sparkles className="mx-auto mb-6 size-8" style={{ color: s.goldColor }} />
        <p className="mb-3 text-xs uppercase tracking-[0.38em] text-white/55">Terima Kasih</p>
        <p className="font-serif text-5xl" style={{ color: s.goldColor }}>{invitation.brideName} & {invitation.groomName}</p>
        <button type="button" onClick={() => navigator.clipboard.writeText(window.location.href)} className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm backdrop-blur-xl transition hover:bg-white/20">
          <Copy className="size-4" /> Salin Link Undangan
        </button>
      </div>
    </footer>
  );
});



// ─── Registry ─────────────────────────────────────────────────────────────────

const sectionComponents: Record<TemplateSection, React.ComponentType<TemplateSectionProps>> = {
  opening: OpeningSection,
  hero: HeroSection,
  quote: QuoteSection,
  countdown: CountdownSection,
  story: StorySection,
  gallery: GallerySection,
  event: EventSection,
  rsvp: RSVPSection,
  wishes: WishesSection,
  gift: GiftSection,
  "live-streaming": LiveStreamingSection,
  footer: FooterSection,
};

export function SectionRenderer({ type, invitation, template }: TemplateSectionProps & { type: TemplateSection }) {
  const Component = sectionComponents[type];
  return <Component invitation={invitation} template={template} colors={template.layout.colors ?? {}} />;
}
