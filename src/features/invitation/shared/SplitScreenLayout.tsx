"use client";

import { type ReactNode } from "react";

interface SplitScreenLayoutProps {
  visualPanel: ReactNode;
  invitationPanel: ReactNode;
}

export function SplitScreenLayout({
  visualPanel,
  invitationPanel,
}: SplitScreenLayoutProps) {
  return (
    <div className="hidden lg:flex min-h-screen">
    <div className="w-[45%] sticky top-0 h-screen">
      {visualPanel}
    </div>

    <div className="w-[55%] flex justify-center">
      <div className="w-full max-w-[480px]">
        {invitationPanel}
      </div>
    </div>
  </div>
  );
}
