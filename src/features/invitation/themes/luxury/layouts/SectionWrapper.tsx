"use client";

import type { SectionWrapperProps } from "../../../types";

export function SectionWrapper({ children, config, className = "" }: SectionWrapperProps) {
  return (
    <section
      className={`relative w-full ${className}`}
      style={{
        padding: config.layout.spacing,
        maxWidth: config.layout.maxWidth,
        margin: "0 auto",
        borderTop: `1px solid ${config.colors.accent}22`,
      }}
    >
      {children}
    </section>
  );
}
