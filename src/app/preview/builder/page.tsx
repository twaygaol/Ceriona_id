"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { ThemeRenderer } from "@/features/invitation/renderer/ThemeRenderer";

function PreviewContent() {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get("data");

  const { invitation, themeId } = useMemo(() => {
    if (!dataParam) return { invitation: null, themeId: null };
    try {
      const parsed = JSON.parse(decodeURIComponent(dataParam));
      return {
        invitation: parsed,
        themeId: parsed.templateId || parsed.themeId,
      };
    } catch {
      return { invitation: null, themeId: null };
    }
  }, [dataParam]);

  // Fallback: try sessionStorage (for old landing page preview flow)
  const sessionData = useMemo(() => {
    if (invitation && themeId) return { invitation, themeId };
    
    if (typeof window === "undefined") return { invitation: null, themeId: null };
    
    try {
      const stored = sessionStorage.getItem("preview-data");
      if (!stored) return { invitation: null, themeId: null };
      const parsed = JSON.parse(stored);
      return {
        invitation: parsed,
        themeId: parsed.templateId || parsed.themeId,
      };
    } catch {
      return { invitation: null, themeId: null };
    }
  }, [invitation, themeId]);

  const finalInvitation = invitation || sessionData.invitation;
  const finalThemeId = themeId || sessionData.themeId;

  if (!finalInvitation || !finalThemeId) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        <p>Preview tidak tersedia</p>
      </div>
    );
  }

  return (
    <div className="bg-white" suppressHydrationWarning>
      <ThemeRenderer themeId={finalThemeId} invitation={finalInvitation} />
    </div>
  );
}

export default function PreviewBuilderPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Memuat preview...</div>}>
      <PreviewContent />
    </Suspense>
  );
}
