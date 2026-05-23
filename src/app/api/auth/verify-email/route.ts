import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type EmailVerificationDelegate = {
  findFirst: (args: unknown) => Promise<{ id: string } | null>;
  update: (args: unknown) => Promise<unknown>;
};

const emailVerification = (prisma as unknown as Record<string, EmailVerificationDelegate>)["emailVerification"];

export async function POST(req: Request) {
  const { token } = await req.json();
  if (!token) return NextResponse.json({ error: "Token wajib diisi" }, { status: 400 });

  const verification = await emailVerification.findFirst({ where: { token }, select: { id: true } });
  if (!verification) return NextResponse.json({ error: "Token verifikasi tidak valid" }, { status: 404 });

  await emailVerification.update({ where: { id: verification.id }, data: { verified: true } });
  return NextResponse.json({ message: "Email berhasil diverifikasi" });
}
