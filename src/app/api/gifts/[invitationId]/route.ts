import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { assertFeatureAccess } from "@/services/subscriptionService";

const giftSchema = z.object({
  type: z.enum(["bank", "ewallet", "payment_gateway"]).default("bank"),
  provider: z.string().min(2),
  accountNumber: z.string().optional().or(z.literal("")),
  accountName: z.string().optional().or(z.literal("")),
  qrImageUrl: z.string().url().optional().or(z.literal("")),
  isActive: z.boolean().default(true),
});

export async function GET(_req: Request, { params }: { params: Promise<{ invitationId: string }> }) {
  const { invitationId } = await params;
  const gifts = await prisma.virtualGift.findMany({ where: { invitationId, isActive: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(gifts);
}

export async function POST(req: Request, { params }: { params: Promise<{ invitationId: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const featureAccess = await assertFeatureAccess(user.id, "weddingGift");
    if (!featureAccess.allowed) {
      return NextResponse.json({ error: `Fitur Wedding Gift tersedia mulai paket Premium. Paket aktif Anda: ${featureAccess.plan.label}.` }, { status: 403 });
    }

    const { invitationId } = await params;
    const invitation = await prisma.invitation.findFirst({ where: { id: invitationId, userId: user.id }, select: { id: true } });
    if (!invitation) return NextResponse.json({ error: "Invitation not found" }, { status: 404 });

    const parsed = giftSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "Data gift tidak valid", details: parsed.error.flatten() }, { status: 400 });

    const gift = await prisma.virtualGift.create({
      data: {
        invitationId,
        ...parsed.data,
        accountNumber: parsed.data.accountNumber || null,
        accountName: parsed.data.accountName || null,
        qrImageUrl: parsed.data.qrImageUrl || null,
      },
    });

    return NextResponse.json(gift, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save gift" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ invitationId: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const featureAccess = await assertFeatureAccess(user.id, "weddingGift");
    if (!featureAccess.allowed) {
      return NextResponse.json({ error: `Fitur Wedding Gift tersedia mulai paket Premium. Paket aktif Anda: ${featureAccess.plan.label}.` }, { status: 403 });
    }

    const { invitationId } = await params;
    const { searchParams } = new URL(req.url);
    const giftId = searchParams.get("giftId");
    if (!giftId) return NextResponse.json({ error: "giftId wajib diisi" }, { status: 400 });

    const gift = await prisma.virtualGift.findFirst({
      where: { id: giftId, invitationId, invitation: { userId: user.id } },
      select: { id: true },
    });
    if (!gift) return NextResponse.json({ error: "Gift not found" }, { status: 404 });

    await prisma.virtualGift.update({ where: { id: giftId }, data: { isActive: false } });
    return NextResponse.json({ message: "Gift disabled" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete gift" }, { status: 500 });
  }
}
