"use client";

import type { InvitationEntranceProps } from "../../types";

export function InvitationEntrance({ theme, onComplete, config }: InvitationEntranceProps) {
  const EntranceAnimation = theme.EntranceAnimation;

  return (
    <EntranceAnimation
      onComplete={onComplete}
      config={config}
    />
  );
}
