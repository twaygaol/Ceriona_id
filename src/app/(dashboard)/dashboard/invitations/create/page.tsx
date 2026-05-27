"use client";

import { Suspense } from "react";
import { InvitationForm } from "@/features/dashboard/invitations/invitation-form";

export default function CreateInvitationPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-500">Memuat form...</div>}>
      <InvitationForm mode="create" />
    </Suspense>
  );
}
