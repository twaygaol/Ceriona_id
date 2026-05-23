import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { buildVerificationEmail, sendEmail } from "@/services/emailService";

type EmailVerificationDelegate = {
  findFirst: (args: unknown) => Promise<{ id: string; email: string; verified: boolean } | null>;
  update: (args: unknown) => Promise<unknown>;
};

const emailVerification = (prisma as unknown as Record<string, EmailVerificationDelegate>)["emailVerification"];

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email wajib diisi" }, { status: 400 });

  const verification = await emailVerification.findFirst({ where: { email }, select: { id: true, email: true, verified: true } });
  if (!verification) return NextResponse.json({ error: "Data verifikasi tidak ditemukan" }, { status: 404 });
  if (verification.verified) return NextResponse.json({ message: "Email sudah diverifikasi" });

  const token = randomUUID();
  await emailVerification.update({ where: { id: verification.id }, data: { token } });
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const verificationUrl = `${appUrl}/verify-email?token=${token}`;
  const emailContent = buildVerificationEmail(undefined, verificationUrl);
  const result = await sendEmail({ to: email, subject: emailContent.subject, html: emailContent.html });

  return NextResponse.json({ verificationUrl, emailDelivery: result });
}
