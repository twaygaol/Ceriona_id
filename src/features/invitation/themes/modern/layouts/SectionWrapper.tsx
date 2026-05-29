"use client";

import type { SectionWrapperProps } from "../../../types";

export function SectionWrapper({ children, config, className = "" }: SectionWrapperProps) {
  return (
    <section
      className={`relative w-full mx-auto ${className}`}
      style={{
        padding: config.layout.spacing,
        maxWidth: config.layout.maxWidth,
      }}
    >
      {children}
    </section>
  );
}
