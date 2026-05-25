import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getBillingPlan } from "@/services/billingPlanService";

type CheckoutSessionDelegate = {
  create: (args: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<unknown>;
  findFirst: (args: unknown) => Promise<unknown>;
};

const checkoutSession = (prisma as unknown as Record<string, CheckoutSessionDelegate>)["checkoutSession"];

const checkoutSchema = z.object({
  sessionId: z.string().optional(),
  themeKey: z.string().min(1),
  groomName: z.string().min(2),
  brideName: z.string().min(2),
  plan: z.enum(["free", "premium", "pro"]),
  email: z.string().email(),
  phone: z.string().min(8),
});

export async function POST(req: Request) {
  try {
    const parsed = checkoutSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Data checkout tidak valid", details: parsed.error.flatten() }, { status: 400 });
    }

    const plan = getBillingPlan(parsed.data.plan);
    const payload = {
      themeKey: parsed.data.themeKey,
      groomName: parsed.data.groomName,
      brideName: parsed.data.brideName,
      plan: parsed.data.plan,
      email: parsed.data.email,
      phone: parsed.data.phone,
      status: parsed.data.plan === "free" ? "paid" : "pending_payment",
    };

    if (parsed.data.sessionId) {
      const updated = await checkoutSession.update({
        where: { id: parsed.data.sessionId },
        data: payload,
      });
      return NextResponse.json({ session: updated, plan });
    }

    const created = await checkoutSession.create({ data: payload });
    return NextResponse.json({ session: created, plan }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save checkout session" }, { status: 500 });
  }
}
