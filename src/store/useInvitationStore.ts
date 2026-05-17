import { create } from "zustand";

export interface Invitation {
  id: string;
  slug: string;
  title: string;
  brideName: string;
  groomName: string;
  templateId: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  googleMapsUrl?: string;
  story?: string;
  musicUrl?: string;
  isPublished: boolean;
  viewCount: number;
  createdAt: string;
  rsvps?: InvitationRSVP[];
  gallery?: InvitationGallery[];
}

export interface InvitationRSVP {
  id: string;
  name: string;
  attending: boolean;
  guestCount: number;
  message?: string | null;
  createdAt: string;
  invitationId: string;
}

export interface InvitationGallery {
  id: string;
  url: string;
  caption?: string | null;
  order: number;
  createdAt: string;
  invitationId: string;
}

interface InvitationStore {
  invitations: Invitation[];
  fetchInvitations: (invitations: Invitation[]) => void;
  addInvitation: (invitation: Invitation) => void;
  updateInvitation: (id: string, data: Partial<Invitation>) => void;
  deleteInvitation: (id: string) => void;
  publishInvitation: (id: string) => void;
}

export const useInvitationStore = create<InvitationStore>((set) => ({
  invitations: [],
  
  fetchInvitations: (invitations) => set({ invitations }),
  
  addInvitation: (invitation) =>
    set((state) => ({ invitations: [invitation, ...state.invitations] })),
  
  updateInvitation: (id, data) =>
    set((state) => ({
      invitations: state.invitations.map((inv) =>
        inv.id === id ? { ...inv, ...data } : inv
      ),
    })),
  
  deleteInvitation: (id) =>
    set((state) => ({
      invitations: state.invitations.filter((inv) => inv.id !== id),
    })),
  
  publishInvitation: (id) =>
    set((state) => ({
      invitations: state.invitations.map((inv) =>
        inv.id === id ? { ...inv, isPublished: !inv.isPublished } : inv
      ),
    })),
}));
