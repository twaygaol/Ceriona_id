import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const requestLog = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 10;

function getClientIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const entries = requestLog.get(key) ?? [];
  const recent = entries.filter((timestamp) => now - timestamp < WINDOW_MS);
  recent.push(now);
  requestLog.set(key, recent);
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

const rsvpSchema = z.object({
  name: z.string().min(2),
  attending: z.union([z.boolean(), z.enum(["yes", "no"])]),
  guestCount: z.coerce.number().int().min(1).max(10).default(1),
  session: z.enum(["akad", "reception", "both"]).optional(),
  menuPreference: z.enum(["regular", "vegetarian", "kids", "other"]).optional(),
  dietaryNote: z.string().max(200).optional(),
  companionNames: z.string().max(300).optional(),
  message: z.string().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ invitationId: string }> }
) {
  try {
    const { invitationId } = await params;
    const rateKey = `${invitationId}:${getClientIp(req)}`;
    if (isRateLimited(rateKey)) {
      return NextResponse.json({ error: "Terlalu banyak request RSVP, coba lagi sebentar." }, { status: 429 });
    }

    const body = await req.json();
    const parsed = rsvpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Data RSVP tidak valid", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const invitation = await prisma.invitation.findFirst({
      where: { id: invitationId, isPublished: true },
      select: { id: true },
    });

    if (!invitation) {
      return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
    }

    const { name, attending, guestCount, session, menuPreference, dietaryNote, companionNames, message } = parsed.data;

    const rsvp = await prisma.rSVP.create({
      data: {
        name,
        attending: attending === true || attending === "yes",
        guestCount,
        session,
        menuPreference,
        dietaryNote,
        companionNames,
        message,
        invitationId,
      },
    });

    return NextResponse.json(rsvp, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ invitationId: string }> }
) {
  try {
    const { invitationId } = await params;
    const rsvps = await prisma.rSVP.findMany({
      where: { invitationId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(rsvps);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
