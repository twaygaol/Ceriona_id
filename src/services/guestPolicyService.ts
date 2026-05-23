import { prisma } from "@/lib/prisma";
import { getBillingPlan } from "@/services/billingPlanService";

type BillingOrderDelegate = {
  findMany: (args: unknown) => Promise<Array<{ plan: string; status: string }>>;
};

const billingOrder = (prisma as unknown as Record<string, BillingOrderDelegate>)["billingOrder"];

export async function getUserPlan(userId: string) {
  try {
    const orders = await billingOrder.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
    const currentPlan = orders.find((order) => order.status === "paid")?.plan ?? "free";
    return getBillingPlan(currentPlan);
  } catch {
    return getBillingPlan("free");
  }
}

export async function assertGuestQuota(userId: string, incomingGuests: number) {
  const plan = await getUserPlan(userId);
  if (plan.invitationLimit === "unlimited") {
    return { allowed: true as const, plan };
  }

  const currentGuests = await prisma.guest.count({ where: { invitation: { userId } } });
  const limitByPlan = {
    free: 50,
    premium: 500,
    pro: 5000,
  }[plan.key];

  if (currentGuests + incomingGuests > limitByPlan) {
    return {
      allowed: false as const,
      plan,
      limit: limitByPlan,
      currentGuests,
    };
  }

  return { allowed: true as const, plan, limit: limitByPlan, currentGuests };
}

export function normalizeGuestPhone(phone?: string | null) {
  return (phone ?? "").replace(/\D/g, "").trim();
}
