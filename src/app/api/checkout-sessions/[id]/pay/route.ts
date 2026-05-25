import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { buildExistingAccountEmail, buildVerificationEmail, sendEmail } from "@/services/emailService";

type CheckoutSessionDelegate = {
  findFirst: (args: unknown) => Promise<{
    id: string;
    themeKey: string;
    groomName: string;
    brideName: string;
    plan: string;
    email: string;
    phone: string;
      status: string;
      userId?: string | null;
      note?: string | null;
    } | null>;
  update: (args: unknown) => Promise<unknown>;
};

type BillingOrderDelegate = {
  create: (args: unknown) => Promise<{ id: string; plan: string; amount: number; status: string }>;
};

type EmailVerificationDelegate = {
  create: (args: unknown) => Promise<unknown>;
  findFirst: (args: unknown) => Promise<{ id: string } | null>;
  update: (args: unknown) => Promise<unknown>;
};

const checkoutSession = (prisma as unknown as Record<string, CheckoutSessionDelegate>)["checkoutSession"];
const billingOrder = (prisma as unknown as Record<string, BillingOrderDelegate>)["billingOrder"];
const emailVerification = (prisma as unknown as Record<string, EmailVerificationDelegate>)["emailVerification"];

const planAmount: Record<string, number> = {
  free: 0,
  premium: 149000,
  pro: 299000,
};

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await checkoutSession.findFirst({ where: { id } });

    if (!session) {
      return NextResponse.json({ error: "Checkout session not found" }, { status: 404 });
    }

    let userId = session.userId ?? null;
    let verificationUrl: string | null = null;
    let emailDelivery: { verification?: unknown; account?: unknown } | null = null;
    let existingAccount = false;

    if (!userId) {
      const existingUser = await prisma.user.findUnique({ where: { email: session.email } });

      if (existingUser) {
        userId = existingUser.id;
        existingAccount = true;

        const token = randomUUID();
        const existingVerification = await emailVerification.findFirst({ where: { email: session.email }, select: { id: true } });
        if (existingVerification) {
          await emailVerification.update({ where: { id: existingVerification.id }, data: { token, verified: false } });
        } else {
          await emailVerification.create({ data: { email: session.email, token, verified: false } });
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
        verificationUrl = `${appUrl}/verify-email?token=${token}`;
        const verificationEmail = buildVerificationEmail(existingUser.name, verificationUrl);
        const existingAccountEmail = buildExistingAccountEmail(existingUser.name, `${appUrl}/login`);
        const [verificationResult, accountResult] = await Promise.all([
          sendEmail({ to: existingUser.email, subject: verificationEmail.subject, html: verificationEmail.html }),
          sendEmail({ to: existingUser.email, subject: existingAccountEmail.subject, html: existingAccountEmail.html }),
        ]);
        emailDelivery = {
          verification: verificationResult,
          account: accountResult,
        };
      } else {
        const temporaryPassword = Math.random().toString(36).slice(-10) + "A1!";
        const hashedPassword = await bcrypt.hash(temporaryPassword, 10);
        const userCount = await prisma.user.count();
        const pendingUser = await prisma.user.create({
          data: {
            name: `${session.groomName} & ${session.brideName}`,
            email: session.email,
            password: hashedPassword,
            role: userCount === 0 ? "admin" : "user",
          },
        });
        userId = pendingUser.id;

        const token = randomUUID();
        const existingVerification = await emailVerification.findFirst({ where: { email: session.email }, select: { id: true } });
        if (existingVerification) {
          await emailVerification.update({ where: { id: existingVerification.id }, data: { token, verified: false } });
        } else {
          await emailVerification.create({ data: { email: session.email, token, verified: false } });
        }

        await checkoutSession.update({
          where: { id: session.id },
          data: {
            note: JSON.stringify({ temporaryPassword, token }),
          },
        });
      }
    }

    const order = await billingOrder.create({
      data: {
        userId,
        plan: session.plan,
        amount: planAmount[session.plan] ?? 0,
        paymentMethod: session.plan === "free" ? "system" : "gateway",
        note: `Checkout theme ${session.themeKey} for ${session.groomName} & ${session.brideName}`,
        status: session.plan === "free" ? "paid" : "pending",
        checkoutSessionId: session.id,
      },
    });

    await checkoutSession.update({
      where: { id: session.id },
      data: {
        userId,
        status: session.plan === "free" ? "completed" : "pending_payment",
      },
    });

    return NextResponse.json({
      checkoutSessionId: session.id,
      order,
      account: {
        email: session.email,
        temporaryPassword: null,
        verificationUrl,
        existingAccount,
      },
      emailDelivery,
      nextStep: existingAccount ? "login_existing_account_after_verification" : session.plan === "free" ? "activate_account" : "redirect_to_payment_gateway",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to prepare payment handoff" }, { status: 500 });
  }
}
