import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type CheckoutSessionDelegate = {
  findFirst: (args: unknown) => Promise<unknown>;
};

const checkoutSession = (prisma as unknown as Record<string, CheckoutSessionDelegate>)["checkoutSession"];

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await checkoutSession.findFirst({ where: { id } });
  if (!session) return NextResponse.json({ error: "Checkout session not found" }, { status: 404 });
  return NextResponse.json(session);
}
