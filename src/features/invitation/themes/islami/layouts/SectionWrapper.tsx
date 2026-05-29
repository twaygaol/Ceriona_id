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
      }}
    >
      {children}
    </section>
  );
}
