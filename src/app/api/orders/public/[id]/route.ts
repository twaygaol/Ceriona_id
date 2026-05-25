import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type BillingOrderDelegate = {
  findFirst: (args: unknown) => Promise<{ id: string; plan: string; amount: number; status: string; paymentMethod?: string | null; note?: string | null; createdAt: Date } | null>;
};

const billingOrder = (prisma as unknown as Record<string, BillingOrderDelegate>)["billingOrder"];

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await billingOrder.findFirst({
    where: { id },
    select: { id: true, plan: true, amount: true, status: true, paymentMethod: true, note: true, createdAt: true },
  });
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  return NextResponse.json(order);
}
