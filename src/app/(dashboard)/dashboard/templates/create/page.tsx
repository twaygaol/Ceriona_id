import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";

function TemplateEditorFallback() {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-3">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-4 w-96" />
      </div>
      <Skeleton className="h-[600px] w-full rounded-xl" />
    </div>
  );
}

const TemplateEditor = dynamic(() => import("@/features/dashboard/templates/template-editor").then((mod) => ({ default: mod.TemplateEditor })), {
  loading: () => <TemplateEditorFallback />,
});

function TemplateEditorPage() {
  return <TemplateEditor mode="create" />;
}

export default function CreateTemplatePage() {
  return (
    <Suspense fallback={<TemplateEditorFallback />}>
      <TemplateEditorPage />
    </Suspense>
  );
}
