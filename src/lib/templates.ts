import type { ReactNode } from "react";
import { InvitationClient, type InvitationData } from "@/app/invitation/[slug]/InvitationClient";

export type TemplateComponent = (props: { invitation: InvitationData }) => ReactNode;

export const templates = {
  elegant: InvitationClient,
  minimalist: InvitationClient,
  floral: InvitationClient,
  dark: InvitationClient,
  traditional: InvitationClient,
} satisfies Record<string, TemplateComponent>;
