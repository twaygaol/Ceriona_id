import { NextResponse } from "next/server";
import { expireDueSubscriptions } from "@/services/subscriptionService";

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized cron" }, { status: 401 });
  }

  const result = await expireDueSubscriptions();
  return NextResponse.json({ message: "Subscription expiry job executed", ...result });
}
