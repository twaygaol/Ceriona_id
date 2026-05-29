"use client";

import type { MainLayoutProps } from "../../../types";

const geometricBg = {
  backgroundImage: `
    url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,4 39,21 57,21 43,33 49,52 30,41 11,52 17,33 3,21 21,21' fill='none' stroke='%2381C784' stroke-width='0.3' opacity='0.08'/%3E%3C/svg%3E"),
    radial-gradient(ellipse at 20% 50%, rgba(129,199,132,0.03) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 50%, rgba(212,168,75,0.03) 0%, transparent 50%)
  `,
  backgroundSize: "60px 60px, 100% 100%, 100% 100%",
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
      <div className="fixed inset-0 pointer-events-none" style={geometricBg} />
      <div className="relative z-0">{children}</div>
    </div>
  );
}
