import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Invitation {
  id: string
  template: string
  title?: string
  slug?: string
  coupleNames?: string
  eventDate?: string
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown
}

interface InvitationStore {
  invitations: Invitation[]
  activeTemplate: string
  setActiveTemplate: (t: string) => void
  addInvitation: (inv: Invitation) => void
}

export const useInvitationStore = create<InvitationStore>()(
  persist(
    (set) => ({
      invitations: [],
      activeTemplate: "elegant",
      setActiveTemplate: (t) => set({ activeTemplate: t }),
      addInvitation: (inv) =>
        set((s) => ({ invitations: [...s.invitations, inv] })),
    }),
    { name: "ceriona-store" }
  )
)
