"use client";

import type { DesktopShowcaseLayoutProps } from "../../../types";

export function DesktopShowcaseLayout({ config, colors, fonts, invitation }: DesktopShowcaseLayoutProps) {
  const groomName = invitation?.groomName || "Groom";
  const brideName = invitation?.brideName || "Bride";
  const weddingDate = invitation?.weddingDate
    ? new Date(invitation.weddingDate).toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric",
      })
    : "";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between overflow-hidden px-16 py-12"
      style={{
        background: colors.background,
        fontFamily: fonts.heading,
        color: colors.text,
      }}
    >
      {/* ── TOP AREA ─────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs tracking-[0.3em] uppercase" style={{ color: colors.muted, fontFamily: fonts.body }}>
          Batak Tradition
        </p>
        <p className="text-base tracking-[0.35em] uppercase" style={{ color: colors.accent, fontFamily: fonts.body }}>
          Horas
        </p>
        <div className="w-12 h-px" style={{ background: colors.accent }} />
      </div>

      {/* ── CENTER AREA — focal point ────────────────────────── */}
      <div className="flex flex-col items-center gap-6">
        {/* Hero Image — main visual anchor */}
        {invitation?.heroImage && (
          <div
            className="w-56 h-72 overflow-hidden"
            style={{
              border: `2px solid ${colors.accent}33`,
              boxShadow: `0 12px 48px ${colors.primary}22`,
            }}
          >
            <img
              src={invitation.heroImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Names */}
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-5xl font-bold leading-tight text-center">
            {groomName}
          </h1>
          <p className="text-2xl tracking-widest" style={{ color: colors.accent }}>&</p>
          <h1 className="text-5xl font-bold leading-tight text-center">
            {brideName}
          </h1>
        </div>

        {/* Wedding date */}
        {weddingDate && (
          <p className="text-sm tracking-[0.25em] uppercase" style={{ color: colors.muted, fontFamily: fonts.body }}>
            {weddingDate}
          </p>
        )}
      </div>

      {/* ── BOTTOM AREA ──────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs leading-relaxed text-center max-w-xs" style={{ color: colors.muted, fontFamily: fonts.body }}>
          Merupakan suatu kehormatan dan kebahagiaan apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu
        </p>
      </div>
    </div>
  );
}
