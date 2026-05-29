import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { InvitationRenderer } from "./InvitationRenderer";

export default async function InvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const invitation = await prisma.invitation.findUnique({
    where: { slug },
    include: {
      gallery: { orderBy: { order: "asc" } },
      rsvps: true,
    },
  });

  if (!invitation || !invitation.isPublished) {
    notFound();
  }

  await prisma.invitation.update({
    where: { id: invitation.id },
    data: { viewCount: { increment: 1 } },
  });

  const invitationData = {
    id: invitation.id,
    slug: invitation.slug,
    brideName: invitation.brideName,
    groomName: invitation.groomName,
    templateId: invitation.templateId,
    eventDate: invitation.eventDate,
    eventTime: invitation.eventTime,
    eventLocation: invitation.eventLocation,
    googleMapsUrl: invitation.googleMapsUrl ?? "",
    story: invitation.story ?? "",
    gallery: invitation.gallery.map((image) => image.url),
    rsvps: invitation.rsvps,
    heroImage: invitation.gallery[0]?.url,
    musicUrl: invitation.musicUrl ?? undefined,
  };

  return <InvitationRenderer invitation={invitationData} />;
}
