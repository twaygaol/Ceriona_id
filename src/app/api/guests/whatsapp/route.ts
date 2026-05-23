import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { buildWhatsAppMessage, normalizePhone, sendWhatsAppMessage } from "@/services/whatsappService";
import { assertFeatureAccess } from "@/services/subscriptionService";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const featureAccess = await assertFeatureAccess(user.id, "whatsappBroadcast");
    if (!featureAccess.allowed) {
      return NextResponse.json({ error: `Fitur WhatsApp Broadcast tersedia mulai paket Premium. Paket aktif Anda: ${featureAccess.plan.label}.` }, { status: 403 });
    }

    const { guestIds, message } = await req.json();
    if (!Array.isArray(guestIds) || guestIds.length === 0) {
      return NextResponse.json({ error: "Pilih minimal satu tamu" }, { status: 400 });
    }

    const guests = await prisma.guest.findMany({
      where: {
        id: { in: Array.isArray(guestIds) ? guestIds : [] },
        invitation: { userId: user.id },
      },
    });

    const template = message || "Halo {name}, kami mengundang Anda untuk hadir di acara kami: {url}";
    const results = [];

    for (const guest of guests.filter((item) => item.phone)) {
      const text = buildWhatsAppMessage(template, { name: guest.name, url: guest.invitationUrl });
      const phone = normalizePhone(String(guest.phone));
      const result = await sendWhatsAppMessage({ phone, message: text });

      try {
        await prisma.whatsAppLog.create({
          data: {
            guestId: guest.id,
            provider: result.provider,
            phone,
            message: text,
            status: result.status,
            response: result.response === undefined ? undefined : JSON.parse(JSON.stringify(result.response)),
          },
        });
      } catch (logError) {
        console.warn("WhatsApp log skipped:", logError);
      }

      try {
        await prisma.guest.update({
          where: { id: guest.id },
          data: { status: result.status === "failed" ? "failed" : "sent" },
        });
      } catch (guestUpdateError) {
        console.warn("Guest status update skipped:", guestUpdateError);
      }

      results.push({ guestId: guest.id, name: guest.name, phone, ...result });
    }

    if (results.length === 0) {
      return NextResponse.json({ error: "Tamu terpilih belum punya nomor WhatsApp" }, { status: 400 });
    }

    return NextResponse.json({ results, links: results.filter((item) => item.url) });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to generate WhatsApp links",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
