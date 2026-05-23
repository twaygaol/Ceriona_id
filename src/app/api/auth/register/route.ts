import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { buildAccountEmail, buildVerificationEmail, sendEmail } from "@/services/emailService";

type EmailVerificationDelegate = {
  create: (args: unknown) => Promise<unknown>;
  findFirst: (args: unknown) => Promise<{ id: string; verified: boolean } | null>;
  update: (args: unknown) => Promise<unknown>;
};

const emailVerification = (prisma as unknown as Record<string, EmailVerificationDelegate>)["emailVerification"];

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email wajib diisi" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    const generatedPassword = Math.random().toString(36).slice(-10) + "A1!";
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);
    const verificationToken = randomUUID();
    const generatedUsername = `${String(email).split("@")[0]}-${Math.random().toString(36).slice(2, 6)}`;
    let user = existingUser;

    if (existingUser) {
      const verification = await emailVerification.findFirst({
        where: { email },
        select: { id: true, verified: true },
      });

      if (verification?.verified) {
        return NextResponse.json(
          { error: "Email sudah terdaftar dan sudah diverifikasi. Silakan login." },
          { status: 400 }
        );
      }

      user = await prisma.user.update({
        where: { email },
        data: {
          name,
          password: hashedPassword,
        },
      });

      if (verification) {
        await emailVerification.update({
          where: { id: verification.id },
          data: { token: verificationToken, verified: false },
        });
      } else {
        await emailVerification.create({
          data: {
            email,
            token: verificationToken,
            verified: false,
          },
        });
      }
    } else {
      const userCount = await prisma.user.count();
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: userCount === 0 ? "admin" : "user",
        },
      });

      await emailVerification.create({
        data: {
          email,
          token: verificationToken,
          verified: false,
        },
      });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const verificationUrl = `${appUrl}/verify-email?token=${verificationToken}`;

    const verificationEmail = buildVerificationEmail(name, verificationUrl);
    const accountEmail = buildAccountEmail(name, user.email, generatedUsername, generatedPassword);
    const [verificationResult, accountResult] = await Promise.all([
      sendEmail({ to: user.email, subject: verificationEmail.subject, html: verificationEmail.html }),
      sendEmail({ to: user.email, subject: accountEmail.subject, html: accountEmail.html }),
    ]);

    return NextResponse.json(
      {
        message: existingUser ? "Akun belum diverifikasi, detail akun dan link verifikasi diperbarui." : "User created",
        user: { id: user.id, email: user.email, name: user.name },
        account: {
          username: generatedUsername,
          email: user.email,
          temporaryPassword: generatedPassword,
        },
        verificationUrl,
        emailDelivery: {
          verification: verificationResult,
          account: accountResult,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
