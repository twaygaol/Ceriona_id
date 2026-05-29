"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { SectionRenderer } from "@/components/templates/SectionRenderer";
import type { DashboardTemplate, TemplateSection } from "@/types/template";

function PreviewContent() {
  const searchParams = useSearchParams();
  const device = searchParams.get("device") || "mobile";
  const dataParam = searchParams.get("data");

  const { invitation, template, sections } = useMemo(() => {
    if (!dataParam) return { invitation: null, template: null, sections: [] };
    try {
      const parsed = JSON.parse(decodeURIComponent(dataParam));
      return {
        invitation: parsed,
        template: parsed.template as DashboardTemplate,
        sections: parsed.sections as TemplateSection[],
      };
    } catch {
      return { invitation: null, template: null, sections: [] };
    }
  }, [dataParam]);

  if (!invitation || !template) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        <p>Preview tidak tersedia</p>
      </div>
    );
  }

  return (
    <div className="bg-white" suppressHydrationWarning>
      {sections.map((section, idx) => (
        <SectionRenderer
          key={`${section}-${idx}`}
          type={section}
          invitation={invitation}
          template={template}
          colors={template.layout.colors ?? {}}
        />
      ))}
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
