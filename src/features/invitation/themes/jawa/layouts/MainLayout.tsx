"use client";

import type { MainLayoutProps } from "../../../types";

const batikBg = {
  backgroundImage: `
    radial-gradient(circle at 20% 50%, rgba(212,168,75,0.04) 0px, transparent 2px),
    radial-gradient(circle at 80% 50%, rgba(212,168,75,0.04) 0px, transparent 2px)
  `,
  backgroundSize: "60px 60px",
};

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
      <div className="fixed inset-0 pointer-events-none" style={batikBg} />
      <div className="relative z-0">{children}</div>
    </div>
  );
}
