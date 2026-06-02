"use client";

import { Suspense, useEffect, useState } from "react";
import { ThemeRenderer } from "@/features/invitation/renderer/ThemeRenderer";

function PreviewContent() {
  const [liveData, setLiveData] = useState<any>(null);

  // Listen for postMessage from parent InvitationBuilder
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === "preview-update") {
        setLiveData(event.data.data);
      }
    };
    window.addEventListener("message", handler);

    // Fallback: try sessionStorage
    try {
      const stored = sessionStorage.getItem("preview-data");
      if (stored) {
        const parsed = JSON.parse(stored);
        setLiveData(parsed);
      }
    } catch {}

    return () => window.removeEventListener("message", handler);
  }, []);

  const invitation = liveData;
  const themeId = liveData?.templateId || liveData?.themeId;

  if (!invitation || !themeId) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        <p>Preview tidak tersedia</p>
      </div>
    );
  }

  return (
    <div className="bg-white" suppressHydrationWarning>
      <ThemeRenderer key={themeId} themeId={themeId} invitation={invitation} />
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
