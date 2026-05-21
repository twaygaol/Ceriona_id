"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { InvitationForm, type EditableInvitation } from "@/features/dashboard/invitations/invitation-form";

export default function EditInvitationPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [invitation, setInvitation] = useState<EditableInvitation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInvitation() {
      try {
        const { data } = await axios.get<EditableInvitation>(`/api/invitations/${params.id}`);
        setInvitation(data);
      } catch {
        toast.error("Gagal memuat undangan");
        router.push("/dashboard/invitations");
      } finally {
        setIsLoading(false);
      }
    }

    loadInvitation();
  }, [params.id, router]);

  if (isLoading) {
    return <div className="py-20 text-center text-brown-light">Memuat undangan...</div>;
  }

  return invitation ? <InvitationForm mode="edit" initialInvitation={invitation} /> : null;
}
