"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { TemplateEditor } from "@/features/dashboard/templates/template-editor";
import type { DashboardTemplate } from "@/types/template";

export default function EditTemplatePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [template, setTemplate] = useState<DashboardTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTemplate() {
      try {
        const { data } = await axios.get<DashboardTemplate>(`/api/templates/${params.id}?includeInactive=true`);
        setTemplate(data);
      } catch {
        toast.error("Gagal memuat template");
        router.push("/dashboard/templates");
      } finally {
        setIsLoading(false);
      }
    }

    loadTemplate();
  }, [params.id, router]);

  if (isLoading) {
    return <div className="py-20 text-center">Memuat template...</div>;
    return <div className="py-20 text-center"></div>;
  }

  return template ? <TemplateEditor mode="edit" initialTemplate={template} /> : null;
}
