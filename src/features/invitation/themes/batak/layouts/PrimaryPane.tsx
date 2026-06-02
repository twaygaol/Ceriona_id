"use client";

import type { ReactNode } from "react";

interface PrimaryPaneProps {
  children: ReactNode;
}

export function PrimaryPane({ children }: PrimaryPaneProps) {
  return (
    <div className="batak-primary-pane">
      {children}
    </div>
  );
}
