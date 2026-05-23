import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

async function assertAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { id: true, role: true } });
  return user?.role === "admin" ? user : null;
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await assertAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      invitations: {
        include: {
          template: { select: { name: true } },
          _count: { select: { guests: true, rsvps: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const invitationIds = user.invitations.map((invitation) => invitation.id);
  const [guests, rsvps, whatsappLogs] = await Promise.all([
    prisma.guest.findMany({ where: { invitationId: { in: invitationIds } }, orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.rSVP.findMany({ where: { invitationId: { in: invitationIds } }, orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.whatsAppLog.findMany({ where: { guest: { invitationId: { in: invitationIds } } }, orderBy: { createdAt: "desc" }, take: 20, include: { guest: { select: { name: true } } } }),
  ]);

  return NextResponse.json({
    client: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      invitations: user.invitations,
      summary: {
        invitations: user.invitations.length,
        published: user.invitations.filter((invitation) => invitation.isPublished).length,
        views: user.invitations.reduce((sum, invitation) => sum + invitation.viewCount, 0),
        guests: guests.length,
        rsvps: rsvps.length,
      },
    },
    guests,
    rsvps,
    whatsappLogs,
  });
}
