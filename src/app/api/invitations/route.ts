import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

const eventSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  date: z.coerce.date().optional(),
  time: z.string().optional(),
  location: z.string().optional(),
  address: z.string().optional(),
  googleMapsUrl: z.string().optional(),
  order: z.number().optional(),
});

const loveStorySchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.string().optional(),
  photo: z.string().optional(),
  order: z.number().optional(),
});

const momentSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  photo: z.string().optional(),
  date: z.string().optional(),
  order: z.number().optional(),
});

const videoSchema = z.object({
  id: z.string().optional(),
  type: z.enum(["youtube", "upload"]).default("youtube"),
  url: z.string().optional(),
  title: z.string().optional(),
  thumbnail: z.string().optional(),
  order: z.number().optional(),
});

const galleryImageSchema = z.object({
  url: z.string().optional(),
  caption: z.string().optional(),
  order: z.number().optional(),
});

const bankAccountSchema = z.object({
  id: z.string().optional(),
  type: z.string().default("bank"),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  accountName: z.string().optional(),
  provider: z.string().optional(),
  isActive: z.boolean().optional(),
});

const invitationSchema = z.object({
  title: z.string().optional(),
  brideName: z.string().optional(),
  groomName: z.string().optional(),
  brideFullName: z.string().optional(),
  groomFullName: z.string().optional(),
  brideNickname: z.string().optional(),
  groomNickname: z.string().optional(),
  bridePhoto: z.string().optional(),
  groomPhoto: z.string().optional(),
  couplePhoto: z.string().optional(),
  brideDescription: z.string().optional(),
  groomDescription: z.string().optional(),
  brideInstagram: z.string().optional(),
  groomInstagram: z.string().optional(),
  brideFatherName: z.string().optional(),
  brideMotherName: z.string().optional(),
  groomFatherName: z.string().optional(),
  groomMotherName: z.string().optional(),
  templateId: z.string().optional(),
  coverTitle: z.string().optional(),
  coverGuestName: z.string().optional(),
  coverBackground: z.string().optional(),
  coverPhoto: z.string().optional(),
  coverQuote: z.string().optional(),
  heroImage: z.string().optional(),
  heroBackground: z.string().optional(),
  heroQuote: z.string().optional(),
  countdownTarget: z.coerce.date().optional(),
  musicUrl: z.string().optional(),
  selectedMusic: z.string().optional(),
  musicTitle: z.string().optional(),
  isPublished: z.boolean().optional(),
  slug: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaCoverImage: z.string().optional(),
  themeCustomization: z.record(z.string(), z.any()).optional(),
  events: z.array(eventSchema).optional(),
  loveStories: z.array(loveStorySchema).optional(),
  moments: z.array(momentSchema).optional(),
  videos: z.array(videoSchema).optional(),
  gallery: z.array(galleryImageSchema).optional(),
  bankAccounts: z.array(bankAccountSchema).optional(),
  rsvpSettings: z.object({
    enableRsvp: z.boolean().optional(),
    rsvpDeadline: z.coerce.date().optional(),
    maxGuests: z.number().optional(),
    confirmMessage: z.string().optional(),
  }).optional(),
});

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

function buildCreateData(parsed: z.infer<typeof invitationSchema>, userId: string, slug: string) {
  const {
    events, loveStories, moments, videos, gallery, bankAccounts,
    rsvpSettings, themeCustomization,
    ...flatFields
  } = parsed;

  const firstEvent = events?.[0];

  const data: any = {
    slug,
    title: flatFields.title || `${parsed.groomName || ''} & ${parsed.brideName || ''}`.trim() || 'Undangan Baru',
    brideName: flatFields.brideName || '',
    groomName: flatFields.groomName || '',
    templateId: flatFields.templateId || 'jawa',
    eventDate: firstEvent?.date || new Date(),
    eventTime: firstEvent?.time || '',
    eventLocation: firstEvent?.location || '',
    userId,
    themeCustomization: themeCustomization || undefined,
  };

  // Spread remaining flatFields (overrides defaults above if present)
  Object.assign(data, flatFields);

  if (events) {
    data.events = { create: events.map((e) => ({
      name: e.name || '',
      date: e.date || new Date(),
      time: e.time || '',
      location: e.location || '',
      address: e.address,
      googleMapsUrl: e.googleMapsUrl,
      order: e.order ?? 0,
    }))};
  }
  if (loveStories) {
    data.loveStories = { create: loveStories.map((s) => ({
      title: s.title || '',
      description: s.description || '',
      date: s.date,
      photo: s.photo,
      order: s.order ?? 0,
    }))};
  }
  if (moments) {
    data.moments = { create: moments.map((m) => ({
      title: m.title || '',
      description: m.description,
      photo: m.photo,
      date: m.date,
      order: m.order ?? 0,
    }))};
  }
  if (videos) {
    data.videos = { create: videos.map((v) => ({
      type: v.type || 'youtube',
      url: v.url || '',
      title: v.title,
      thumbnail: v.thumbnail,
      order: v.order ?? 0,
    }))};
  }
  if (gallery) {
    data.gallery = { create: gallery.map((g, i) => ({
      url: g.url || '',
      caption: g.caption,
      order: g.order ?? i,
    }))};
  }
  if (bankAccounts) {
    data.virtualGifts = { create: bankAccounts.map((b) => ({
      type: b.type || 'bank',
      provider: b.provider || b.bankName || '',
      accountNumber: b.accountNumber || '',
      accountName: b.accountName || '',
      isActive: b.isActive ?? true,
    }))};
  }
  if (rsvpSettings) {
    data.isRsvpEnabled = rsvpSettings.enableRsvp ?? true;
    data.rsvpDeadline = rsvpSettings.rsvpDeadline || null;
    data.maxGuests = rsvpSettings.maxGuests ?? 1;
    data.confirmMessage = rsvpSettings.confirmMessage || null;
  }

  return data;
}

const INVITE_INCLUDE = {
  gallery: { orderBy: { order: "asc" as const } },
  events: { orderBy: { order: "asc" as const } },
  loveStories: { orderBy: { order: "asc" as const } },
  moments: { orderBy: { order: "asc" as const } },
  videos: { orderBy: { order: "asc" as const } },
  virtualGifts: true,
  rsvps: { orderBy: { createdAt: "desc" as const } },
} as const;

// GET all invitations for current user
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const invitations = await prisma.invitation.findMany({
      where: { userId: user.id },
      include: INVITE_INCLUDE,
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
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = invitationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Data undangan tidak valid", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const slug = parsed.data.slug || nanoid(10);
    const createData = buildCreateData(parsed.data, user.id, slug);

    const invitation = await prisma.$transaction(async (tx) => {
      const created = await tx.invitation.create({
        data: createData,
        include: INVITE_INCLUDE,
      });

      try {
        await tx.template.update({
          where: { id: parsed.data.templateId! },
          data: { usageCount: { increment: 1 } },
        });
      } catch {
        // templateId is a theme registry key (e.g. "jawa"), not a Prisma Template id
      }

      return created;
    });

    return NextResponse.json(invitation, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
