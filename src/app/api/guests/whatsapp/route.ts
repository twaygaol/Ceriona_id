import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { guestIds, message } = await req.json();
    const guests = await prisma.guest.findMany({
      where: {
        id: { in: Array.isArray(guestIds) ? guestIds : [] },
        invitation: { userId: user.id },
      },
    });

    const links = guests
      .filter((guest) => guest.phone)
      .map((guest) => {
        const phone = String(guest.phone).replace(/\D/g, "").replace(/^0/, "62");
        const text = encodeURIComponent(
          (message || "Halo {name}, kami mengundang Anda untuk hadir di acara kami: {url}")
            .replaceAll("{name}", guest.name)
            .replaceAll("{url}", guest.invitationUrl ?? "")
        );

        return { guestId: guest.id, name: guest.name, phone, url: `https://wa.me/${phone}?text=${text}` };
      });

    await prisma.guest.updateMany({ where: { id: { in: links.map((link) => link.guestId) } }, data: { status: "sent" } });

    return NextResponse.json({ links });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate WhatsApp links" }, { status: 500 });
  }
}
