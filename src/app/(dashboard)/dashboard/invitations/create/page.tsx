"use client";

import { Suspense } from "react";
import { VisualBuilder } from "@/features/dashboard/invitations/VisualBuilder";

export default function CreateInvitationPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-500">Memuat editor...</div>}>
      <VisualBuilder mode="create" />
    </Suspense>
  );
}
