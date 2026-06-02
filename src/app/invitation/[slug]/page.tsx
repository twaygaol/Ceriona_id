import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { InvitationRenderer } from "./InvitationRenderer";

export default async function InvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const invitation = await prisma.invitation.findUnique({
    where: { slug },
    include: {
      gallery: { orderBy: { order: "asc" } },
      events: { orderBy: { order: "asc" } },
      loveStories: { orderBy: { order: "asc" } },
      moments: { orderBy: { order: "asc" } },
      videos: { orderBy: { order: "asc" } },
      virtualGifts: true,
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
    title: invitation.title,
    brideName: invitation.brideName,
    groomName: invitation.groomName,
    brideFullName: invitation.brideFullName ?? "",
    groomFullName: invitation.groomFullName ?? "",
    brideNickname: invitation.brideNickname ?? "",
    groomNickname: invitation.groomNickname ?? "",
    bridePhoto: invitation.bridePhoto ?? "",
    groomPhoto: invitation.groomPhoto ?? "",
    couplePhoto: invitation.couplePhoto ?? "",
    brideDescription: invitation.brideDescription ?? "",
    groomDescription: invitation.groomDescription ?? "",
    brideInstagram: invitation.brideInstagram ?? "",
    groomInstagram: invitation.groomInstagram ?? "",
    brideFatherName: invitation.brideFatherName ?? "",
    brideMotherName: invitation.brideMotherName ?? "",
    groomFatherName: invitation.groomFatherName ?? "",
    groomMotherName: invitation.groomMotherName ?? "",
    templateId: invitation.templateId,
    coverTitle: invitation.coverTitle ?? "",
    coverGuestName: invitation.coverGuestName ?? "",
    coverBackground: invitation.coverBackground ?? "",
    coverPhoto: invitation.coverPhoto ?? "",
    coverQuote: invitation.coverQuote ?? "",
    heroImage: invitation.heroImage ?? invitation.gallery[0]?.url ?? "",
    heroBackground: invitation.heroBackground ?? "",
    heroQuote: invitation.heroQuote ?? "",
    countdownTarget: invitation.countdownTarget ?? invitation.events[0]?.date ?? null,
    musicUrl: invitation.musicUrl ?? undefined,
    selectedMusic: invitation.selectedMusic ?? undefined,
    metaTitle: invitation.metaTitle ?? undefined,
    metaDescription: invitation.metaDescription ?? undefined,
    metaCoverImage: invitation.metaCoverImage ?? undefined,
    themeCustomization: invitation.themeCustomization as Record<string, any> | undefined,
    events: invitation.events.map((e) => ({
      id: e.id,
      name: e.name,
      date: new Date(e.date).toISOString(),
      time: e.time,
      location: e.location,
      address: e.address ?? "",
      googleMapsUrl: e.googleMapsUrl ?? "",
      order: e.order,
    })),
    loveStories: invitation.loveStories.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      date: s.date ? new Date(s.date).toISOString() : "",
      photo: s.photo ?? "",
      order: s.order,
    })),
    moments: invitation.moments.map((m) => ({
      id: m.id,
      title: m.title ?? "",
      description: m.description ?? "",
      photo: m.photo ?? "",
      order: m.order,
    })),
    videos: invitation.videos.map((v) => ({
      id: v.id,
      type: v.type as "youtube" | "upload",
      url: v.url,
      title: v.title ?? "",
      thumbnail: v.thumbnail ?? "",
      order: v.order,
    })),
    gallery: invitation.gallery.map((g) => g.url),
    galleryWithMeta: invitation.gallery.map((g) => ({
      id: g.id,
      url: g.url,
      caption: g.caption ?? "",
      order: g.order,
    })),
    bankAccounts: invitation.virtualGifts.map((g) => ({
      bankName: g.provider,
      accountNumber: g.accountNumber,
      accountName: g.accountName,
    })),
    rsvps: invitation.rsvps,
  };

  return <InvitationRenderer invitation={invitationData as any} />;
}
