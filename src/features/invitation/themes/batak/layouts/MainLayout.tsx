"use client";

import type { MainLayoutProps } from "../../../types";

const ulosBg = {
  backgroundImage: `
    linear-gradient(45deg, rgba(212,168,75,0.04) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(212,168,75,0.04) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(212,168,75,0.04) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(212,168,75,0.04) 75%)
  `,
  backgroundSize: "60px 60px",
  backgroundPosition: "0 0, 0 30px, 30px -30px, -30px 0px",
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
      <div className="fixed inset-0 pointer-events-none" style={ulosBg} />
      <div className="relative z-0">{children}</div>
    </div>
  );
}
