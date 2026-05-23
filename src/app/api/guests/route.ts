import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { assertGuestQuota, normalizeGuestPhone } from "@/services/guestPolicyService";

const guestSchema = z.object({
  invitationId: z.string().min(1),
  name: z.string().min(2),
  phone: z.string().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  group: z.string().optional().or(z.literal("")),
});

async function getUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  return user?.id ?? null;
}

export async function GET(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const invitationId = searchParams.get("invitationId") ?? undefined;
    const exportCsv = searchParams.get("export") === "csv";

    const guests = await prisma.guest.findMany({
      where: {
        invitation: { userId },
        ...(invitationId ? { invitationId } : {}),
      },
      include: { invitation: { select: { slug: true, title: true } } },
      orderBy: { createdAt: "desc" },
    });

    if (exportCsv) {
      const header = ["name", "phone", "email", "group", "status", "invitationUrl"];
      const rows = guests.map((guest) => [
        guest.name,
        guest.phone ?? "",
        guest.email ?? "",
        guest.group ?? "",
        guest.status,
        guest.invitationUrl ?? "",
      ]);
      const csv = [header, ...rows]
        .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
        .join("\n");

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": "attachment; filename=guests.csv",
        },
      });
    }

    return NextResponse.json(guests);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load guests" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = guestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Data tamu tidak valid", details: parsed.error.flatten() }, { status: 400 });
    }

    const invitation = await prisma.invitation.findFirst({
      where: { id: parsed.data.invitationId, userId },
      select: { id: true, slug: true },
    });
    if (!invitation) return NextResponse.json({ error: "Invitation not found" }, { status: 404 });

    const quota = await assertGuestQuota(userId, 1);
    if (!quota.allowed) {
      return NextResponse.json(
        { error: `Kuota tamu paket ${quota.plan.label} habis. Limit ${quota.limit} tamu, saat ini ${quota.currentGuests}.` },
        { status: 403 }
      );
    }

    const normalizedPhone = normalizeGuestPhone(parsed.data.phone);
    if (normalizedPhone) {
      const duplicateGuest = await prisma.guest.findFirst({
        where: {
          invitationId: parsed.data.invitationId,
          phone: normalizedPhone,
        },
        select: { id: true },
      });

      if (duplicateGuest) {
        return NextResponse.json({ error: "Nomor WhatsApp tamu sudah terdaftar pada undangan ini" }, { status: 409 });
      }
    }

    if (parsed.data.email) {
      const duplicateEmailGuest = await prisma.guest.findFirst({
        where: {
          invitationId: parsed.data.invitationId,
          email: parsed.data.email,
        },
        select: { id: true },
      });

      if (duplicateEmailGuest) {
        return NextResponse.json({ error: "Email tamu sudah terdaftar pada undangan ini" }, { status: 409 });
      }
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const guest = await prisma.guest.create({
      data: {
        ...parsed.data,
        phone: normalizedPhone || null,
        email: parsed.data.email || null,
        group: parsed.data.group || null,
        invitationUrl: `${appUrl}/invitation/${invitation.slug}`,
      },
    });

    return NextResponse.json(guest, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create guest" }, { status: 500 });
  }
}
