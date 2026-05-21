import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

function parseCsv(content: string) {
  const lines = content.split(/\r?\n/).filter(Boolean);
  const [headerLine, ...rows] = lines;
  const headers = headerLine.split(",").map((item) => item.trim().replace(/^"|"$/g, ""));

  return rows.map((line) => {
    const values = line.split(",").map((item) => item.trim().replace(/^"|"$/g, ""));
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const invitationId = String(formData.get("invitationId") ?? "");
    const file = formData.get("file");

    if (!invitationId || !(file instanceof File)) {
      return NextResponse.json({ error: "File dan invitationId wajib diisi" }, { status: 400 });
    }

    const invitation = await prisma.invitation.findFirst({ where: { id: invitationId, userId: user.id }, select: { id: true, slug: true } });
    if (!invitation) return NextResponse.json({ error: "Invitation not found" }, { status: 404 });

    const text = await file.text();
    const rows = parseCsv(text);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const created = await prisma.guest.createMany({
      data: rows
        .filter((row) => row.name || row.nama)
        .map((row) => ({
          invitationId,
          name: row.name || row.nama || "Tamu",
          phone: row.phone || row.telepon || row.whatsapp || null,
          email: row.email || null,
          group: row.group || row.grup || null,
          invitationUrl: `${appUrl}/invitation/${invitation.slug}`,
        })),
    });

    return NextResponse.json({ imported: created.count });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to import guests" }, { status: 500 });
  }
}
