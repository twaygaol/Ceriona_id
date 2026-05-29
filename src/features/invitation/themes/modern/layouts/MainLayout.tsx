"use client";

import type { MainLayoutProps } from "../../../types";

export function MainLayout({ children, config }: MainLayoutProps) {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        fontFamily: config.fonts.body,
        color: config.colors.text,
        background: config.colors.background,
      }}
    >
      <div className="relative z-0">{children}</div>
    </div>
  );
}
