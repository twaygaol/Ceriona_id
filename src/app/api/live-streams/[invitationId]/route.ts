import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { assertFeatureAccess } from "@/services/subscriptionService";

const liveStreamSchema = z.object({
  provider: z.enum(["youtube", "zoom", "meet", "instagram", "custom"]),
  title: z.string().min(3),
  url: z.string().url(),
  scheduledAt: z.string().optional().or(z.literal("")),
  status: z.enum(["scheduled", "live", "ended"]).default("scheduled"),
  isActive: z.boolean().default(true),
});

async function getUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  return user?.id ?? null;
}

export async function GET(_req: Request, { params }: { params: Promise<{ invitationId: string }> }) {
  const { invitationId } = await params;
  const streams = await prisma.liveStream.findMany({ where: { invitationId, isActive: true }, orderBy: { scheduledAt: "asc" } });
  return NextResponse.json(streams);
}

export async function POST(req: Request, { params }: { params: Promise<{ invitationId: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const featureAccess = await assertFeatureAccess(userId, "liveStreaming");
    if (!featureAccess.allowed) {
      return NextResponse.json({ error: `Fitur Live Streaming tersedia mulai paket Premium. Paket aktif Anda: ${featureAccess.plan.label}.` }, { status: 403 });
    }

    const { invitationId } = await params;
    const invitation = await prisma.invitation.findFirst({ where: { id: invitationId, userId }, select: { id: true } });
    if (!invitation) return NextResponse.json({ error: "Invitation not found" }, { status: 404 });

    const parsed = liveStreamSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "Data live stream tidak valid", details: parsed.error.flatten() }, { status: 400 });

    const stream = await prisma.liveStream.create({
      data: {
        invitationId,
        ...parsed.data,
        scheduledAt: parsed.data.scheduledAt ? new Date(parsed.data.scheduledAt) : null,
      },
    });

    return NextResponse.json(stream, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save live stream" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ invitationId: string }> }) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const featureAccess = await assertFeatureAccess(userId, "liveStreaming");
    if (!featureAccess.allowed) {
      return NextResponse.json({ error: `Fitur Live Streaming tersedia mulai paket Premium. Paket aktif Anda: ${featureAccess.plan.label}.` }, { status: 403 });
    }

    const { invitationId } = await params;
    const { searchParams } = new URL(req.url);
    const streamId = searchParams.get("streamId");
    if (!streamId) return NextResponse.json({ error: "streamId wajib diisi" }, { status: 400 });

    const stream = await prisma.liveStream.findFirst({ where: { id: streamId, invitationId, invitation: { userId } }, select: { id: true } });
    if (!stream) return NextResponse.json({ error: "Live stream not found" }, { status: 404 });

    await prisma.liveStream.update({ where: { id: streamId }, data: { isActive: false } });
    return NextResponse.json({ message: "Live stream disabled" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete live stream" }, { status: 500 });
  }
}
