import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { canPublishInvitation } from "@/services/subscriptionService";

const updateInvitationSchema = z.object({
  title: z.string().min(3).optional(),
  brideName: z.string().min(2).optional(),
  groomName: z.string().min(2).optional(),
  templateId: z.string().min(1).optional(),
  eventDate: z.coerce.date().optional(),
  eventTime: z.string().min(1).optional(),
  eventLocation: z.string().min(5).optional(),
  googleMapsUrl: z.string().url().optional().or(z.literal("")),
  story: z.string().optional(),
  musicUrl: z.string().url().optional().or(z.literal("")),
  isPublished: z.boolean().optional(),
  gallery: z.array(z.string().url()).optional(),
});

async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  return prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
}

// GET single invitation
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const invitation = await prisma.invitation.findFirst({
      where: { id, userId: user.id },
      include: {
        gallery: true,
        rsvps: true,
      },
    });

    if (!invitation) {
      return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
    }

    return NextResponse.json(invitation);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT update invitation
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const parsed = updateInvitationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Data undangan tidak valid", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const existing = await prisma.invitation.findFirst({
      where: { id, userId: user.id },
      select: { id: true, templateId: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
    }

    const { gallery, googleMapsUrl, musicUrl, ...data } = parsed.data;

    if (data.isPublished === true) {
      const publishAccess = await canPublishInvitation(user.id);
      if (!publishAccess.allowed) {
        return NextResponse.json(
          {
            error: `Publish undangan membutuhkan subscription aktif. Paket Anda saat ini: ${publishAccess.plan.label}.`,
          },
          { status: 403 }
        );
      }
    }

    if (data.templateId) {
      const template = await prisma.template.findFirst({
        where: { id: data.templateId, isActive: true },
        select: { id: true },
      });

      if (!template) {
        return NextResponse.json({ error: "Template tidak ditemukan" }, { status: 404 });
      }
    }

    const updateData = {
      ...data,
      ...(googleMapsUrl !== undefined ? { googleMapsUrl: googleMapsUrl || null } : {}),
      ...(musicUrl !== undefined ? { musicUrl: musicUrl || null } : {}),
    };

    const invitation = await prisma.$transaction(async (tx) => {
      if (gallery) {
        await tx.gallery.deleteMany({ where: { invitationId: id } });
      }

      const invitation = await tx.invitation.update({
        where: { id },
        data: {
          ...updateData,
          ...(gallery
            ? { gallery: { create: gallery.map((url, order) => ({ url, order })) } }
            : {}),
        },
        include: {
          gallery: true,
          rsvps: true,
        },
      });

      if (data.templateId && data.templateId !== existing.templateId) {
        await tx.template.update({
          where: { id: data.templateId },
          data: { usageCount: { increment: 1 } },
        });
      }

      return invitation;
    });

    return NextResponse.json(invitation);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE invitation
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const invitation = await prisma.invitation.findFirst({
      where: { id, userId: user.id },
      select: { id: true },
    });

    if (!invitation) {
      return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.rSVP.deleteMany({ where: { invitationId: id } }),
      prisma.gallery.deleteMany({ where: { invitationId: id } }),
      prisma.invitation.delete({ where: { id } }),
    ]);

    return NextResponse.json({ message: "Invitation deleted" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
