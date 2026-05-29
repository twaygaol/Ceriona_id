"use client";

import type { CSSProperties, ReactNode } from "react";

interface ScrollControllerProps {
  children: ReactNode;
  smooth?: boolean;
  snap?: boolean;
  style?: CSSProperties;
}

export function ScrollController({ children, smooth, snap, style }: ScrollControllerProps) {
  const scrollStyle: CSSProperties = {
    overflowY: "auto",
    ...(smooth ? { scrollBehavior: "smooth" as const } : {}),
    ...(snap ? { scrollSnapType: "y mandatory" as const } : {}),
    ...style,
  };

  return (
    <div style={scrollStyle} className="h-full w-full">
      {children}
    </div>
  );
}
