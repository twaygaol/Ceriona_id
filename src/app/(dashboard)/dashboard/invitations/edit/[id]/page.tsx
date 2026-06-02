"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { InvitationBuilder } from "@/features/dashboard/invitations/InvitationBuilder";

export default function EditInvitationPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [invitationId, setInvitationId] = useState<string | null>(null);

  useEffect(() => {
    async function loadInvitation() {
      try {
        const id = params.id as string;
        const { data } = await axios.get(`/api/invitations/${id}`);
        setInvitationId(data.id);
      } catch (error) {
        toast.error("Gagal memuat undangan");
        router.push("/dashboard/invitations");
      } finally {
        setLoading(false);
      }
    }

    loadInvitation();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-brown border-t-transparent" />
          <p className="text-brown-light">Memuat undangan...</p>
        </div>
      </div>
    );
  }

  if (!invitationId) {
    return null;
  }

  return <InvitationBuilder mode="edit" invitationId={invitationId} />;
}

