import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import { z } from "zod";
import { authOptions } from "@/lib/auth";

const invitationSchema = z.object({
  title: z.string().min(3),
  brideName: z.string().min(2),
  groomName: z.string().min(2),
  templateId: z.string().min(1),
  eventDate: z.coerce.date(),
  eventTime: z.string().min(1),
  eventLocation: z.string().min(5),
  googleMapsUrl: z.string().url().optional().or(z.literal("")),
  story: z.string().optional(),
  musicUrl: z.string().url().optional().or(z.literal("")),
  gallery: z.array(z.string().url()).optional(),
});

// GET all invitations for current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const invitations = await prisma.invitation.findMany({
      where: { userId: user.id },
      include: {
        rsvps: true,
        gallery: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(invitations);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST create new invitation
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    console.log("SESSION:", JSON.stringify(session, null, 2));
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const parsed = invitationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Data undangan tidak valid", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { gallery = [], googleMapsUrl, musicUrl, ...data } = parsed.data;
    const template = await prisma.template.findFirst({
      where: { id: data.templateId, isActive: true },
      select: { id: true },
    });

    if (!template) {
      return NextResponse.json({ error: "Template tidak ditemukan" }, { status: 404 });
    }

    const slug = nanoid(10);

    const invitation = await prisma.$transaction(async (tx) => {
      const created = await tx.invitation.create({
        data: {
          ...data,
          googleMapsUrl: googleMapsUrl || null,
          musicUrl: musicUrl || null,
          slug,
          userId: user.id,
          gallery: {
            create: gallery.map((url, order) => ({ url, order })),
          },
        },
        include: {
          gallery: true,
          rsvps: true,
        },
      });

      await tx.template.update({
        where: { id: data.templateId },
        data: { usageCount: { increment: 1 } },
      });

      return created;
    });

    return NextResponse.json(invitation, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
