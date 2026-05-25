import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { provisionAccountAndInvitationFromCheckout } from "@/services/checkoutProvisioningService";
import { activateSubscriptionFromOrder } from "@/services/subscriptionService";

type BillingOrderDelegate = {
  findFirst: (args: unknown) => Promise<{ id: string; userId: string | null; plan: string; amount: number; status: string; checkoutSessionId?: string | null } | null>;
  update: (args: unknown) => Promise<unknown>;
};

type PaymentTransactionDelegate = {
  findFirst: (args: unknown) => Promise<{ id: string; status: string } | null>;
  create: (args: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<unknown>;
};

const billingOrder = (prisma as unknown as Record<string, BillingOrderDelegate>)["billingOrder"];
const paymentTransaction = (prisma as unknown as Record<string, PaymentTransactionDelegate>)["paymentTransaction"];

function verifyMidtransSignature(payload: { order_id: string; status_code: string; gross_amount: string; signature_key: string }) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) return false;
  const expected = crypto
    .createHash("sha512")
    .update(`${payload.order_id}${payload.status_code}${payload.gross_amount}${serverKey}`)
    .digest("hex");
  return expected === payload.signature_key;
}

function mapMidtransStatus(transactionStatus: string, fraudStatus?: string) {
  if (transactionStatus === "settlement") return "paid";
  if (transactionStatus === "capture" && fraudStatus === "accept") return "paid";
  if (transactionStatus === "deny" || transactionStatus === "cancel" || transactionStatus === "failure") return "failed";
  if (transactionStatus === "expire") return "expired";
  return "pending";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const signatureVerified = verifyMidtransSignature(body);

    if (!signatureVerified) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    const order = await billingOrder.findFirst({
      where: { id: body.order_id },
      select: { id: true, userId: true, plan: true, amount: true, status: true, checkoutSessionId: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const externalId = String(body.transaction_id || body.order_id);
    const normalizedStatus = mapMidtransStatus(body.transaction_status, body.fraud_status);

    const existingTx = await paymentTransaction.findFirst({
      where: { externalId },
      select: { id: true, status: true },
    });

    if (existingTx) {
      await paymentTransaction.update({
        where: { id: existingTx.id },
        data: {
          status: normalizedStatus,
          signatureVerified: true,
          rawPayload: JSON.parse(JSON.stringify(body)),
        },
      });
    } else {
      await paymentTransaction.create({
        data: {
          provider: "midtrans",
          externalId,
          orderId: order.id,
          amount: order.amount,
          status: normalizedStatus,
          signatureVerified: true,
          rawPayload: JSON.parse(JSON.stringify(body)),
          userId: order.userId,
          billingOrderId: order.id,
        },
      });
    }

    if (normalizedStatus === "paid" && order.status !== "paid") {
      let userId = order.userId;
      if (order.checkoutSessionId) {
        const provisioned = await provisionAccountAndInvitationFromCheckout(order.checkoutSessionId);
        userId = provisioned.user.id;
        if (!order.userId) {
          await billingOrder.update({ where: { id: order.id }, data: { userId } });
        }
      }

      await billingOrder.update({ where: { id: order.id }, data: { status: "paid" } });
      if (userId) {
        await activateSubscriptionFromOrder(userId, order.id, order.plan);
      }
    }

    if (normalizedStatus === "failed" || normalizedStatus === "expired") {
      await billingOrder.update({ where: { id: order.id }, data: { status: normalizedStatus === "expired" ? "cancelled" : "cancelled" } });
    }

    return NextResponse.json({ received: true, status: normalizedStatus });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
