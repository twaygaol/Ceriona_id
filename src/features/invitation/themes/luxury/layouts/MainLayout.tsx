"use client";

import type { MainLayoutProps } from "../../../types";

export function MainLayout({ children, config }: MainLayoutProps) {
  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        fontFamily: config.fonts.body,
        color: config.colors.text,
        background: `linear-gradient(180deg, ${config.colors.background}, ${config.colors.surface}, ${config.colors.background})`,
      }}
    >
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, ${config.colors.accent}04 0%, transparent 60%),
            radial-gradient(ellipse at 80% 50%, ${config.colors.primary}04 0%, transparent 60%)
          `,
        }}
      />
      <div className="relative z-0">{children}</div>
    </div>
  );
}
