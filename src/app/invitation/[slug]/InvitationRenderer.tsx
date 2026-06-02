"use client";

import { ThemeRenderer } from "@/features/invitation/renderer/ThemeRenderer";

interface Props {
  invitation: any;
}

export function InvitationRenderer({ invitation }: Props) {
  const themeId = invitation.templateId;

  return (
    <ThemeRenderer
      themeId={themeId}
      invitation={invitation}
      customization={invitation.themeCustomization}
    />
  );
}
