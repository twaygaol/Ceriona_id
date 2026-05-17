import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Invitation {
  id: string;
  slug: string;
  title: string;
  brideName: string;
  groomName: string;
  templateId: string;
  eventDate: Date;
  eventTime: string;
  eventLocation: string;
  googleMapsUrl: string;
  story: string;
  gallery: string[];
  musicUrl?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface InvitationStore {
  invitations: Invitation[];
  activeInvitation: Invitation | null;
  setActiveInvitation: (invitation: Invitation | null) => void;
  addInvitation: (invitation: Invitation) => void;
  updateInvitation: (id: string, data: Partial<Invitation>) => void;
  deleteInvitation: (id: string) => void;
  publishInvitation: (id: string) => void;
}

export const useInvitationStore = create<InvitationStore>()(
  persist(
    (set) => ({
      invitations: [],
      activeInvitation: null,
      
      setActiveInvitation: (invitation) => set({ activeInvitation: invitation }),
      
      addInvitation: (invitation) =>
        set((state) => ({ invitations: [...state.invitations, invitation] })),
      
      updateInvitation: (id, data) =>
        set((state) => ({
          invitations: state.invitations.map((inv) =>
            inv.id === id ? { ...inv, ...data, updatedAt: new Date() } : inv
          ),
        })),
      
      deleteInvitation: (id) =>
        set((state) => ({
          invitations: state.invitations.filter((inv) => inv.id !== id),
        })),
      
      publishInvitation: (id) =>
        set((state) => ({
          invitations: state.invitations.map((inv) =>
            inv.id === id ? { ...inv, isPublished: true, updatedAt: new Date() } : inv
          ),
        })),
    }),
    {
      name: "kundangan-storage",
    }
  )
);