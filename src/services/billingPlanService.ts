export type BillingPlanKey = "free" | "premium" | "pro";

export interface BillingPlanEntitlement {
  key: BillingPlanKey;
  label: string;
  invitationLimit: number | "unlimited";
  templateTier: "basic" | "premium" | "pro";
  features: {
    whatsappBroadcast: boolean;
    weddingGift: boolean;
    liveStreaming: boolean;
    analyticsAdvanced: boolean;
    customTheme: boolean;
    prioritySupport: boolean;
  };
}

export const billingPlans: Record<BillingPlanKey, BillingPlanEntitlement> = {
  free: {
    key: "free",
    label: "Free",
    invitationLimit: 1,
    templateTier: "basic",
    features: {
      whatsappBroadcast: false,
      weddingGift: false,
      liveStreaming: false,
      analyticsAdvanced: false,
      customTheme: false,
      prioritySupport: false,
    },
  },
  premium: {
    key: "premium",
    label: "Premium",
    invitationLimit: 5,
    templateTier: "premium",
    features: {
      whatsappBroadcast: true,
      weddingGift: true,
      liveStreaming: true,
      analyticsAdvanced: false,
      customTheme: false,
      prioritySupport: false,
    },
  },
  pro: {
    key: "pro",
    label: "Pro",
    invitationLimit: "unlimited",
    templateTier: "pro",
    features: {
      whatsappBroadcast: true,
      weddingGift: true,
      liveStreaming: true,
      analyticsAdvanced: true,
      customTheme: true,
      prioritySupport: true,
    },
  },
};

export function getBillingPlan(plan?: string | null): BillingPlanEntitlement {
  if (!plan) return billingPlans.free;
  return billingPlans[(plan as BillingPlanKey) in billingPlans ? (plan as BillingPlanKey) : "free"];
}
