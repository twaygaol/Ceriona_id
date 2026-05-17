import { create } from "zustand";

export interface RSVP {
  id: string;
  invitationId: string;
  name: string;
  attending: "yes" | "no";
  guestCount: number;
  message: string;
  createdAt: Date;
}

interface RSVPStore {
  rsvps: RSVP[];
  addRSVP: (rsvp: RSVP) => void;
  getRSVPByInvitation: (invitationId: string) => RSVP[];
}

export const useRSVPStore = create<RSVPStore>((set, get) => ({
  rsvps: [],
  
  addRSVP: (rsvp) =>
    set((state) => ({ rsvps: [...state.rsvps, rsvp] })),
  
  getRSVPByInvitation: (invitationId) =>
    get().rsvps.filter((rsvp) => rsvp.invitationId === invitationId),
}));