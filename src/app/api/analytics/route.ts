import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

function monthKey(date: Date) {
  return new Intl.DateTimeFormat("id-ID", { month: "short" }).format(date);
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const [invitations, guests, rsvps, templates] = await Promise.all([
      prisma.invitation.findMany({
        where: { userId: user.id },
        include: { template: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
      }),
      prisma.guest.findMany({ where: { invitation: { userId: user.id } } }),
      prisma.rSVP.findMany({ where: { invitation: { userId: user.id } }, orderBy: { createdAt: "desc" } }),
      prisma.template.findMany({ where: { createdBy: user.id }, orderBy: { usageCount: "desc" }, take: 5 }),
    ]);

    const totalViews = invitations.reduce((sum, invitation) => sum + invitation.viewCount, 0);
    const attending = rsvps.filter((rsvp) => rsvp.attending);
    const notAttending = rsvps.filter((rsvp) => !rsvp.attending);
    const totalGuestCount = attending.reduce((sum, rsvp) => sum + rsvp.guestCount, 0);
    const conversionRate = guests.length ? Math.round((rsvps.length / guests.length) * 100) : 0;

    const monthlyMap = new Map<string, { month: string; invitations: number; guests: number; rsvps: number }>();
    for (const invitation of invitations) {
      const key = monthKey(invitation.createdAt);
      const current = monthlyMap.get(key) ?? { month: key, invitations: 0, guests: 0, rsvps: 0 };
      current.invitations += 1;
      monthlyMap.set(key, current);
    }
    for (const guest of guests) {
      const key = monthKey(guest.createdAt);
      const current = monthlyMap.get(key) ?? { month: key, invitations: 0, guests: 0, rsvps: 0 };
      current.guests += 1;
      monthlyMap.set(key, current);
    }
    for (const rsvp of rsvps) {
      const key = monthKey(rsvp.createdAt);
      const current = monthlyMap.get(key) ?? { month: key, invitations: 0, guests: 0, rsvps: 0 };
      current.rsvps += 1;
      monthlyMap.set(key, current);
    }

    const topInvitations = invitations
      .map((invitation) => ({
        id: invitation.id,
        title: invitation.title,
        couple: `${invitation.brideName} & ${invitation.groomName}`,
        views: invitation.viewCount,
        template: invitation.template.name,
        published: invitation.isPublished,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    return NextResponse.json({
      stats: {
        invitations: invitations.length,
        publishedInvitations: invitations.filter((invitation) => invitation.isPublished).length,
        totalViews,
        guests: guests.length,
        rsvps: rsvps.length,
        attending: attending.length,
        notAttending: notAttending.length,
        totalGuestCount,
        conversionRate,
      },
      monthly: Array.from(monthlyMap.values()),
      topInvitations,
      topTemplates: templates.map((template) => ({ id: template.id, name: template.name, usageCount: template.usageCount })),
      recentRsvps: rsvps.slice(0, 6).map((rsvp) => ({
        id: rsvp.id,
        name: rsvp.name,
        attending: rsvp.attending,
        guestCount: rsvp.guestCount,
        session: rsvp.session,
        createdAt: rsvp.createdAt,
      })),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load analytics" }, { status: 500 });
  }
}
