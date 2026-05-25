import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { provisionAccountAndInvitationFromCheckout } from "@/services/checkoutProvisioningService";
import { activateSubscriptionFromOrder } from "@/services/subscriptionService";

type BillingOrderDelegate = {
  findFirst: (args: unknown) => Promise<{ id: string; userId: string | null; plan: string; status: string; checkoutSessionId?: string | null } | null>;
  update: (args: unknown) => Promise<unknown>;
};

const billingOrder = (prisma as unknown as Record<string, BillingOrderDelegate>)["billingOrder"];

export async function POST(req: Request) {
  try {
    const { orderId, result } = await req.json();
    if (!orderId || !result) {
      return NextResponse.json({ error: "orderId dan result wajib diisi" }, { status: 400 });
    }

    const order = await billingOrder.findFirst({
      where: { id: orderId },
      select: { id: true, userId: true, plan: true, status: true, checkoutSessionId: true },
    });

    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    if (result === "paid") {
      let userId = order.userId;
      let provisioned: Awaited<ReturnType<typeof provisionAccountAndInvitationFromCheckout>> | null = null;
      if (order.checkoutSessionId) {
        provisioned = await provisionAccountAndInvitationFromCheckout(order.checkoutSessionId);
        userId = provisioned.user.id;
        await billingOrder.update({ where: { id: order.id }, data: { userId } });
      }
      await billingOrder.update({ where: { id: order.id }, data: { status: "paid" } });
      if (userId) await activateSubscriptionFromOrder(userId, order.id, order.plan);
      return NextResponse.json({
        message: "Payment simulated: paid",
        status: "paid",
        next: provisioned?.verificationUrl ? provisioned.verificationUrl : "/login",
        accountEmail: provisioned?.user.email,
        invitationId: provisioned?.invitation?.id,
      });
    }

    if (result === "failed") {
      await billingOrder.update({ where: { id: order.id }, data: { status: "cancelled" } });
      return NextResponse.json({ message: "Payment simulated: failed", status: "cancelled" });
    }

    if (result === "expired") {
      await billingOrder.update({ where: { id: order.id }, data: { status: "cancelled" } });
      return NextResponse.json({ message: "Payment simulated: expired", status: "cancelled" });
    }

    return NextResponse.json({ error: "Result tidak dikenal" }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to simulate payment" }, { status: 500 });
  }
}
