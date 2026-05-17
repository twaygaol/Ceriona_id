import { create } from "zustand";

export interface RSVP {
  id: string;
  invitationId: string;
  name: string;
  attending: boolean;
  guestCount: number;
  message?: string | null;
  createdAt: string;
}

interface RSVPStore {
  rsvps: RSVP[];
  setRSVPs: (invitationId: string, rsvps: RSVP[]) => void;
  addRSVP: (rsvp: RSVP) => void;
  getRSVPByInvitation: (invitationId: string) => RSVP[];
}

export const useRSVPStore = create<RSVPStore>((set, get) => ({
  rsvps: [],

  setRSVPs: (invitationId, rsvps) =>
    set((state) => ({
      rsvps: [
        ...state.rsvps.filter((rsvp) => rsvp.invitationId !== invitationId),
        ...rsvps,
      ],
    })),
  
  addRSVP: (rsvp) =>
    set((state) => ({ rsvps: [...state.rsvps, rsvp] })),
  
  getRSVPByInvitation: (invitationId) =>
    get().rsvps.filter((rsvp) => rsvp.invitationId === invitationId),
}));
