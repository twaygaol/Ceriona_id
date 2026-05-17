import { notFound } from "next/navigation";
import { templates } from "@/lib/templates";
import { getTemplateInvitation } from "@/lib/template-data";

// Generate metadata dinamis
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const invitation = getTemplateInvitation(slug);

  if (!invitation) {
    return {
      title: "Template tidak ditemukan",
    };
  }
  
  return {
    title: `Undangan Pernikahan ${invitation.brideName} & ${invitation.groomName}`,
    description: "Kami mengundang Anda untuk hadir di pernikahan kami",
    openGraph: {
      images: ["/og-invitation.jpg"],
    },
  };
}

export default async function InvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const invitationData = getTemplateInvitation(slug);

  if (!invitationData) return notFound();
  
  const TemplateComponent = templates[invitationData.templateId as keyof typeof templates];
  
  if (!TemplateComponent) return notFound();
  
  return <TemplateComponent invitation={invitationData} />;
}
