"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionRenderer } from "./SectionRenderer";
import type { InvitationData } from "@/app/invitation/[slug]/InvitationClient";
import type { DashboardTemplate, TemplateSection } from "@/types/template";

interface DynamicTemplateProps {
  templateId: string;
  invitation: InvitationData;
}

export function DynamicTemplate({ templateId, invitation }: DynamicTemplateProps) {
  const [template, setTemplate] = useState<DashboardTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTemplate() {
      try {
        const response = await fetch(`/api/templates/${templateId}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          setTemplate(null);
          return;
        }

        setTemplate(await response.json());
      } catch {
        if (!controller.signal.aborted) setTemplate(null);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadTemplate();
    return () => controller.abort();
  }, [templateId]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          <p className="text-brown">Memuat template...</p>
        </div>
      </div>
    );
  }

  if (!template) {
    return <div className="p-10 text-center">Template tidak ditemukan</div>;
  }

  const colors = template.layout.colors ?? {};
  const styles = template.styles ?? {};
  const sections = template.layout.sections?.length
    ? template.layout.sections
    : (["hero", "event", "rsvp"] satisfies TemplateSection[]);

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: colors.background || "#FAF7F2",
        color: colors.text || "#2C2420",
        fontFamily: template.layout.fonts?.body,
      }}
    >
      <div style={{ borderRadius: styles.borderRadius || "0px" }}>
        {sections.map((section, idx) => (
          <motion.div
            key={`${section}-${idx}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
            viewport={{ once: true }}
          >
            <SectionRenderer type={section} invitation={invitation} template={template} colors={colors} />
          </motion.div>
        ))}
      </div>
    </main>
  );
}
