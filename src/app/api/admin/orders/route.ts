import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { activateSubscriptionFromOrder } from "@/services/subscriptionService";

type BillingOrderDelegate = {
  findMany: (args: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<{ id: string; plan: string; user: { id: string; name?: string | null; email: string } }>;
};

const billingOrder = (prisma as unknown as Record<string, BillingOrderDelegate>)["billingOrder"];

const updateSchema = z.object({
  orderId: z.string().min(1),
  status: z.enum(["pending", "paid", "cancelled"]),
});

async function assertAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { id: true, role: true } });
  return user?.role === "admin" ? user : null;
}

export async function GET() {
  const admin = await assertAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const orders = await billingOrder.findMany({
    include: { user: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}

export async function PUT(req: Request) {
  const admin = await assertAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const parsed = updateSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Data status order tidak valid", details: parsed.error.flatten() }, { status: 400 });

  const order = await billingOrder.update({
    where: { id: parsed.data.orderId },
    data: { status: parsed.data.status },
    include: { user: { select: { id: true, name: true, email: true } } },
  });

  if (parsed.data.status === "paid") {
    await activateSubscriptionFromOrder(order.user.id, order.id, order.plan);
  }

  return NextResponse.json(order);
}
