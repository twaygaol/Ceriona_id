import { prisma } from "@/lib/prisma";
import { getBillingPlan } from "@/services/billingPlanService";

type SubscriptionDelegate = {
  findFirst: (args: unknown) => Promise<{ id: string; plan: string; status: string; startsAt: Date; expiresAt: Date | null } | null>;
  updateMany: (args: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<unknown>;
  findMany: (args: unknown) => Promise<Array<{ id: string; plan: string; status: string; expiresAt: Date | null; userId: string }>>;
  create: (args: unknown) => Promise<unknown>;
};

const subscription = (prisma as unknown as Record<string, SubscriptionDelegate>)["subscription"];

export function getSubscriptionDurationDays(plan: string) {
  if (plan === "premium") return 30;
  if (plan === "pro") return 30;
  return 0;
}

export async function getActiveSubscription(userId: string) {
  try {
    return await subscription.findFirst({
      where: { userId, status: "active" },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return null;
  }
}

export async function activateSubscriptionFromOrder(userId: string, orderId: string, plan: string) {
  const durationDays = getSubscriptionDurationDays(plan);
  const startsAt = new Date();
  const expiresAt = durationDays > 0 ? new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000) : null;

  await subscription.updateMany({
    where: { userId, status: "active" },
    data: { status: "inactive" },
  });

  await subscription.create({
    data: {
      userId,
      plan,
      status: plan === "free" ? "inactive" : "active",
      startsAt,
      expiresAt,
      sourceOrderId: orderId,
    },
  });
}

export async function getEffectivePlan(userId: string) {
  const activeSubscription = await getActiveSubscription(userId);
  return getBillingPlan(activeSubscription?.plan ?? "free");
}

export async function assertFeatureAccess(userId: string, feature: keyof ReturnType<typeof getBillingPlan>["features"]) {
  const plan = await getEffectivePlan(userId);
  return {
    allowed: Boolean(plan.features[feature]),
    plan,
  };
}

export async function canPublishInvitation(userId: string) {
  const activeSubscription = await getActiveSubscription(userId);
  const plan = getBillingPlan(activeSubscription?.plan ?? "free");
  return {
    allowed: activeSubscription?.status === "active",
    plan,
    subscription: activeSubscription,
  };
}

export async function expireDueSubscriptions() {
  const now = new Date();
  const dueSubscriptions = await subscription.findMany({
    where: {
      status: "active",
      expiresAt: { lte: now },
    },
  });

  for (const item of dueSubscriptions) {
    await subscription.update({
      where: { id: item.id },
      data: { status: "expired" },
    });
  }

  return { expired: dueSubscriptions.length };
}
