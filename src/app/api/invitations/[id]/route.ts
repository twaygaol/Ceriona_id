import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { canPublishInvitation } from "@/services/subscriptionService";

const INVITE_INCLUDE = {
  gallery: { orderBy: { order: "asc" as const } },
  events: { orderBy: { order: "asc" as const } },
  loveStories: { orderBy: { order: "asc" as const } },
  moments: { orderBy: { order: "asc" as const } },
  videos: { orderBy: { order: "asc" as const } },
  virtualGifts: true,
  rsvps: { orderBy: { createdAt: "desc" as const } },
} as const;

async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    if (user) return user;
    // Session exists but user not found — recreate
    const hashed = await bcrypt.hash("dev123", 10);
    return prisma.user.create({
      data: {
        email: session.user.email,
        name: session.user.name || "User",
        password: hashed,
      },
      select: { id: true },
    });
  }
  // Dev fallback: create or find first user
  let firstUser = await prisma.user.findFirst({ select: { id: true } });
  if (!firstUser) {
    const hashed = await bcrypt.hash("dev123", 10);
    firstUser = await prisma.user.create({
      data: {
        email: "dev@kundangan.com",
        name: "Dev User",
        password: hashed,
      },
      select: { id: true },
    });
  }
  return firstUser;
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
      include: INVITE_INCLUDE,
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

    const existing = await prisma.invitation.findFirst({
      where: { id, userId: user.id },
      select: { id: true, templateId: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
    }

    if (body.isPublished === true) {
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

    const invitation = await prisma.$transaction(async (tx) => {
      if (body.events !== undefined) {
        await tx.event.deleteMany({ where: { invitationId: id } });
      }
      if (body.loveStories !== undefined) {
        await tx.loveStory.deleteMany({ where: { invitationId: id } });
      }
      if (body.moments !== undefined) {
        await tx.moment.deleteMany({ where: { invitationId: id } });
      }
      if (body.videos !== undefined) {
        await tx.video.deleteMany({ where: { invitationId: id } });
      }
      if (body.gallery !== undefined) {
        await tx.gallery.deleteMany({ where: { invitationId: id } });
      }
      if (body.bankAccounts !== undefined) {
        await tx.virtualGift.deleteMany({ where: { invitationId: id } });
      }

      const updateData: any = {};

      const flatFields = [
        "title", "brideName", "groomName", "brideFullName", "groomFullName",
        "brideNickname", "groomNickname", "bridePhoto", "groomPhoto", "couplePhoto",
        "brideDescription", "groomDescription", "brideInstagram", "groomInstagram",
        "brideFatherName", "brideMotherName", "groomFatherName", "groomMotherName",
        "templateId", "coverTitle", "coverGuestName", "coverBackground", "coverPhoto",
        "coverQuote", "heroImage", "heroBackground", "heroQuote", "musicUrl",
        "selectedMusic", "metaTitle", "metaDescription", "metaCoverImage",
        "googleMapsUrl", "story", "eventDate", "eventTime", "eventLocation",
        "isPublished", "slug",
      ];

      for (const field of flatFields) {
        if (body[field] !== undefined) {
          updateData[field] = body[field];
        }
      }
      if (body.countdownTarget !== undefined) {
        updateData.countdownTarget = new Date(body.countdownTarget);
      }
      if (body.themeCustomization !== undefined) {
        updateData.themeCustomization = body.themeCustomization;
      }
      if (body.rsvpSettings !== undefined) {
        if (body.rsvpSettings.enableRsvp !== undefined) updateData.isRsvpEnabled = body.rsvpSettings.enableRsvp;
        if (body.rsvpSettings.rsvpDeadline !== undefined) updateData.rsvpDeadline = new Date(body.rsvpSettings.rsvpDeadline);
        if (body.rsvpSettings.maxGuests !== undefined) updateData.maxGuests = body.rsvpSettings.maxGuests;
        if (body.rsvpSettings.confirmMessage !== undefined) updateData.confirmMessage = body.rsvpSettings.confirmMessage;
      }

      // Create related data
      if (body.events) {
        updateData.events = {
          create: body.events.map((e: any) => ({
            name: e.name, date: new Date(e.date), time: e.time,
            location: e.location, address: e.address,
            googleMapsUrl: e.googleMapsUrl, order: e.order,
          })),
        };
      }
      if (body.loveStories) {
        updateData.loveStories = {
          create: body.loveStories.map((s: any) => ({
            title: s.title || '', 
            description: s.description || '',
            date: s.date || null,
            photo: s.photo, 
            order: s.order ?? 0,
          })),
        };
      }
      if (body.moments) {
        updateData.moments = {
          create: body.moments.map((m: any) => ({
            title: m.title || '', 
            description: m.description,
            photo: m.photo,
            date: m.date || null,
            order: m.order ?? 0,
          })),
        };
      }
      if (body.videos) {
        updateData.videos = {
          create: body.videos.map((v: any) => ({
            type: v.type || "youtube", url: v.url,
            title: v.title, thumbnail: v.thumbnail, order: v.order,
          })),
        };
      }
      if (body.gallery) {
        updateData.gallery = {
          create: body.gallery.map((g: any, i: number) => ({
            url: g.url, caption: g.caption, order: g.order ?? i,
          })),
        };
      }
      if (body.bankAccounts) {
        updateData.virtualGifts = {
          create: body.bankAccounts.map((b: any) => ({
            type: "bank" as const, provider: b.bankName,
            accountNumber: b.accountNumber, accountName: b.accountName,
            isActive: true,
          })),
        };
      }

      const updated = await tx.invitation.update({
        where: { id },
        data: updateData,
        include: INVITE_INCLUDE,
      });

      if (body.templateId && body.templateId !== existing.templateId) {
        await tx.template.update({
          where: { id: body.templateId },
          data: { usageCount: { increment: 1 } },
        });
      }

      return updated;
    });

    return NextResponse.json(invitation);
  } catch (error) {
    console.error(error);
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

    await prisma.invitation.delete({ where: { id } });

    return NextResponse.json({ message: "Invitation deleted" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
