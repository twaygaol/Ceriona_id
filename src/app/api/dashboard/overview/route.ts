import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getBillingPlan } from "@/services/billingPlanService";
import { getActiveSubscription } from "@/services/subscriptionService";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      invitations: {
        include: {
          template: { select: { name: true } },
          gallery: true,
          virtualGifts: { where: { isActive: true } },
          liveStreams: { where: { isActive: true } },
          _count: { select: { guests: true, rsvps: true } },
        },
        orderBy: { updatedAt: "desc" },
      },
    },
  });

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const orders = await (prisma as unknown as { billingOrder: { findMany: (args: unknown) => Promise<Array<{ id: string; plan: string; status: string; createdAt: Date }>> } }).billingOrder.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const activeSubscription = await getActiveSubscription(user.id);
  const currentPlan = activeSubscription?.plan ?? orders.find((order) => order.status === "paid")?.plan ?? "free";
  const plan = getBillingPlan(currentPlan);
  const invitations = user.invitations.map((invitation) => {
    const checklist = {
      basicInfo: Boolean(invitation.title && invitation.brideName && invitation.groomName && invitation.eventLocation),
      gallery: invitation.gallery.length > 0,
      music: Boolean(invitation.musicUrl),
      guests: invitation._count.guests > 0,
      gift: invitation.virtualGifts.length > 0,
      live: invitation.liveStreams.length > 0,
      published: invitation.isPublished,
    };
    const completedCount = Object.values(checklist).filter(Boolean).length;
    return {
      id: invitation.id,
      title: invitation.title,
      couple: `${invitation.brideName} & ${invitation.groomName}`,
      template: invitation.template.name,
      isPublished: invitation.isPublished,
      views: invitation.viewCount,
      guestCount: invitation._count.guests,
      rsvpCount: invitation._count.rsvps,
      checklist,
      progressPercent: Math.round((completedCount / Object.keys(checklist).length) * 100),
      updatedAt: invitation.updatedAt,
    };
  });

  const totals = {
    invitations: invitations.length,
    published: invitations.filter((item) => item.isPublished).length,
    views: invitations.reduce((sum, item) => sum + item.views, 0),
    guests: invitations.reduce((sum, item) => sum + item.guestCount, 0),
    rsvps: invitations.reduce((sum, item) => sum + item.rsvpCount, 0),
  };

  const recentRsvps = await prisma.rSVP.findMany({
    where: { invitation: { userId: user.id } },
    orderBy: { createdAt: "desc" },
    take: 6,
    select: { id: true, name: true, attending: true, guestCount: true, createdAt: true, invitation: { select: { title: true } } },
  });

  const recentGuestLogs = await prisma.whatsAppLog.findMany({
    where: { guest: { invitation: { userId: user.id } } },
    orderBy: { createdAt: "desc" },
    take: 6,
    include: { guest: { select: { name: true } } },
  });

  return NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    currentPlan,
    plan,
    subscription: activeSubscription,
    orderCount: orders.length,
    totals,
    invitations,
    recentRsvps,
    recentGuestLogs: recentGuestLogs.map((item) => ({
      id: item.id,
      guest: item.guest?.name,
      provider: item.provider,
      status: item.status,
      createdAt: item.createdAt,
    })),
  });
}
