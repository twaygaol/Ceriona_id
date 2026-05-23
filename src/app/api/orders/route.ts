import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

type BillingOrderDelegate = {
  findMany: (args: unknown) => Promise<unknown>;
  create: (args: unknown) => Promise<unknown>;
};

type EmailVerificationDelegate = {
  findUnique: (args: unknown) => Promise<{ verified: boolean } | null>;
};

const billingOrder = (prisma as unknown as Record<string, BillingOrderDelegate>)["billingOrder"];
const emailVerification = (prisma as unknown as Record<string, EmailVerificationDelegate>)["emailVerification"];

const orderSchema = z.object({
  plan: z.enum(["free", "premium", "pro"]),
  paymentMethod: z.string().optional(),
  note: z.string().optional(),
});

const planAmount: Record<"free" | "premium" | "pro", number> = {
  free: 0,
  premium: 149000,
  pro: 299000,
};

async function getUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true, email: true, role: true } });
  if (!user) return null;
  try {
    const verification = await emailVerification.findUnique({ where: { email: user.email }, select: { verified: true } });
    return { ...user, emailVerified: verification ? Boolean(verification.verified) : true };
  } catch {
    return { ...user, emailVerified: true };
  }
}

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!user.emailVerified) return NextResponse.json({ error: "Email harus diverifikasi sebelum membuat pesanan paket" }, { status: 403 });

  const orders = await billingOrder.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = orderSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Data order tidak valid", details: parsed.error.flatten() }, { status: 400 });

  const order = await billingOrder.create({
    data: {
      userId: user.id,
      plan: parsed.data.plan,
      amount: planAmount[parsed.data.plan],
      paymentMethod: parsed.data.paymentMethod ?? null,
      note: parsed.data.note ?? null,
      status: parsed.data.plan === "free" ? "paid" : "pending",
    },
  });

  return NextResponse.json(order, { status: 201 });
}
