import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

type PaymentTransactionDelegate = {
  findMany: (args: unknown) => Promise<unknown>;
};

const paymentTransaction = (prisma as unknown as Record<string, PaymentTransactionDelegate>)["paymentTransaction"];

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } });
  if (user?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const transactions = await paymentTransaction.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(transactions);
}
