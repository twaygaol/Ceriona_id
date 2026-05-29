"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { VisualBuilder, type EditableInvitation } from "@/features/dashboard/invitations/VisualBuilder";

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

  return invitation ? (
    <div className="-m-6 md:-m-8" style={{ height: "calc(100vh - 4rem)" }}>
      <VisualBuilder mode="edit" initialInvitation={invitation} />
    </div>
  ) : null;
}
