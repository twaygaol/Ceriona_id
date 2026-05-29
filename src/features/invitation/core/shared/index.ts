import type { CoreEventData } from "../../types";

export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}

export function id(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  ms: number
): T {
  let timer: ReturnType<typeof setTimeout>;
  const debounced = (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
  return debounced as unknown as T;
}

export function invitationToCoreEvent(invitation: any): CoreEventData {
  const rawDate = invitation.weddingDate ?? invitation.eventDate ?? "";
  return {
    eventDate: typeof rawDate === "object" && rawDate instanceof Date ? rawDate.toISOString() : String(rawDate),
    eventTime: invitation.eventTime ?? invitation.akadTime ?? "",
    eventLocation: invitation.venueAddress ?? invitation.eventLocation ?? "",
    venueName: invitation.venueName ?? undefined,
    googleMapsUrl: invitation.googleMapsUrl ?? undefined,
    akadTime: invitation.akadTime ?? undefined,
    receptionTime: invitation.receptionTime ?? undefined,
  };
}
