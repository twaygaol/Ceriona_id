import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { assertGuestQuota, normalizeGuestPhone } from "@/services/guestPolicyService";

function parseCsv(content: string) {
  const rows: string[][] = [];
  let current = "";
  let inQuotes = false;
  let row: string[] = [];

  for (let i = 0; i < content.length; i += 1) {
    const char = content[i];
    const next = content[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(current.trim());
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(current.trim());
      current = "";
      if (row.some((cell) => cell !== "")) rows.push(row);
      row = [];
      continue;
    }

    current += char;
  }

  if (current || row.length) {
    row.push(current.trim());
    if (row.some((cell) => cell !== "")) rows.push(row);
  }

  const [headerRow, ...dataRows] = rows;
  const headers = (headerRow ?? []).map((item) => item.replace(/^"|"$/g, ""));
  return dataRows.map((items) => Object.fromEntries(headers.map((header, index) => [header, (items[index] ?? "").replace(/^"|"$/g, "")])));
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
    if (rows.length > 1000) {
      return NextResponse.json({ error: "Maksimal 1000 tamu per sekali import" }, { status: 400 });
    }

    const quota = await assertGuestQuota(user.id, rows.length);
    if (!quota.allowed) {
      return NextResponse.json(
        { error: `Kuota tamu paket ${quota.plan.label} habis. Limit ${quota.limit} tamu, saat ini ${quota.currentGuests}.` },
        { status: 403 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const existingGuests = await prisma.guest.findMany({
      where: { invitationId },
      select: { phone: true, email: true },
    });
    const existingPhones = new Set(existingGuests.map((guest) => normalizeGuestPhone(guest.phone)).filter(Boolean));
    const existingEmails = new Set(existingGuests.map((guest) => guest.email?.toLowerCase()).filter(Boolean));
    const seenPhones = new Set<string>();
    const seenEmails = new Set<string>();
    const cleanRows = rows
      .filter((row) => row.name || row.nama)
      .map((row) => ({
        name: row.name || row.nama || "Tamu",
        phone: normalizeGuestPhone(row.phone || row.telepon || row.whatsapp || null),
        email: (row.email || "").toLowerCase().trim() || null,
        group: row.group || row.grup || null,
      }))
      .filter((row) => {
        const duplicatePhone = row.phone && (existingPhones.has(row.phone) || seenPhones.has(row.phone));
        const duplicateEmail = row.email && (existingEmails.has(row.email) || seenEmails.has(row.email));
        if (duplicatePhone || duplicateEmail) return false;
        if (row.phone) seenPhones.add(row.phone);
        if (row.email) seenEmails.add(row.email);
        return true;
      });

    const created = await prisma.guest.createMany({
      data: cleanRows.map((row) => ({
          invitationId,
          name: row.name,
          phone: row.phone || null,
          email: row.email,
          group: row.group,
          invitationUrl: `${appUrl}/invitation/${invitation.slug}`,
        })),
    });

    return NextResponse.json({ imported: created.count, skipped: rows.length - cleanRows.length });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to import guests" }, { status: 500 });
  }
}
