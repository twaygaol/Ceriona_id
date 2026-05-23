import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

type SubscriptionDelegate = {
  findMany: (args: unknown) => Promise<Array<{ id: string; plan: string; status: string; expiresAt: Date | null }>>;
};

const subscription = (prisma as unknown as Record<string, SubscriptionDelegate>)["subscription"];

async function assertAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { id: true, role: true } });
  return user?.role === "admin" ? user : null;
}

export async function GET() {
  const admin = await assertAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const [users, invitations, templates, guests, rsvps, logs, subscriptions] = await Promise.all([
    prisma.user.findMany({ include: { invitations: true }, orderBy: { createdAt: "desc" } }),
    prisma.invitation.findMany({ include: { user: { select: { name: true, email: true } }, template: { select: { name: true } } }, orderBy: { createdAt: "desc" } }),
    prisma.template.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.guest.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.rSVP.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.whatsAppLog.findMany({ orderBy: { createdAt: "desc" }, take: 20, include: { guest: { select: { name: true } } } }),
    subscription.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const totalViews = invitations.reduce((sum, item) => sum + item.viewCount, 0);

  const clientSummary = users.map((user) => {
    const userInvitations = invitations.filter((invitation) => invitation.userId === user.id);
    const invitationIds = userInvitations.map((invitation) => invitation.id);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      invitations: userInvitations.length,
      publishedInvitations: userInvitations.filter((invitation) => invitation.isPublished).length,
      views: userInvitations.reduce((sum, invitation) => sum + invitation.viewCount, 0),
      guests: guests.filter((guest) => invitationIds.includes(guest.invitationId)).length,
      rsvps: rsvps.filter((rsvp) => invitationIds.includes(rsvp.invitationId)).length,
    };
  });

  return NextResponse.json({
    stats: {
      users: users.length,
      clients: users.filter((user) => user.role === "user").length,
      admins: users.filter((user) => user.role === "admin").length,
      invitations: invitations.length,
      publishedInvitations: invitations.filter((item) => item.isPublished).length,
      templates: templates.length,
      activeTemplates: templates.filter((item) => item.isActive).length,
      guests: guests.length,
      rsvps: rsvps.length,
      views: totalViews,
      activeSubscriptions: subscriptions.filter((item) => item.status === "active").length,
      expiredSubscriptions: subscriptions.filter((item) => item.status === "expired").length,
    },
    clients: clientSummary,
    recentInvitations: invitations.slice(0, 8).map((item) => ({
      id: item.id,
      title: item.title,
      couple: `${item.brideName} & ${item.groomName}`,
      template: item.template.name,
      user: item.user.name || item.user.email,
      views: item.viewCount,
      isPublished: item.isPublished,
      createdAt: item.createdAt,
    })),
    recentRsvps: rsvps.slice(0, 8).map((item) => ({
      id: item.id,
      name: item.name,
      attending: item.attending,
      guestCount: item.guestCount,
      createdAt: item.createdAt,
    })),
    whatsappLogs: logs.map((item) => ({
      id: item.id,
      provider: item.provider,
      phone: item.phone,
      status: item.status,
      guest: item.guest?.name,
      createdAt: item.createdAt,
    })),
  });
}
