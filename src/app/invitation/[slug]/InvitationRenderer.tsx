"use client";

import { ThemeRenderer } from "@/features/invitation/renderer/ThemeRenderer";
import type { InvitationData } from "./InvitationClient";

interface Props {
  invitation: InvitationData;
}

export function InvitationRenderer({ invitation }: Props) {
  const themeId = invitation.templateId;

  return (
    <ThemeRenderer
      themeId={themeId}
      invitation={{
        id: invitation.id,
        brideName: invitation.brideName,
        groomName: invitation.groomName,
        eventDate: invitation.eventDate,
        eventTime: invitation.eventTime,
        eventLocation: invitation.eventLocation,
        googleMapsUrl: invitation.googleMapsUrl,
        story: invitation.story,
        gallery: invitation.gallery,
        heroImage: invitation.heroImage,
        musicUrl: invitation.musicUrl,
      }}
    />
  );
}
