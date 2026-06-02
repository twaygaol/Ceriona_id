"use client";

import type { ReactNode } from "react";

interface SecondaryPaneProps {
  children: ReactNode;
}

export function SecondaryPane({ children }: SecondaryPaneProps) {
  return (
    <div className="batak-secondary-pane">
      {children}
    </div>
  );
}
