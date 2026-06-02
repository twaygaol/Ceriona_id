"use client";

import { Suspense } from "react";
import { InvitationBuilder } from "@/features/dashboard/invitations/InvitationBuilder";

export default function CreateInvitationPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Memuat...</div>}>
      <InvitationBuilder mode="create" />
    </Suspense>
  );
}
