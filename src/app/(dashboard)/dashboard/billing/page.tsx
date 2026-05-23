"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { CheckCircle2, CreditCard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBillingPlan } from "@/services/billingPlanService";

const plans = [
  { name: "Free", price: "Rp0", desc: "Untuk mulai membuat undangan sederhana.", features: ["1 undangan", "Template basic", "RSVP basic", "Link share"] },
  { name: "Premium", price: "Rp149K", desc: "Untuk wedding digital yang terlihat premium.", features: ["5 undangan", "Premium template", "Guest management", "WhatsApp broadcast", "Wedding gift"] },
  { name: "Pro", price: "Rp299K", desc: "Untuk kebutuhan lengkap dan high-end.", features: ["Unlimited undangan", "Live streaming", "Analytics advanced", "Custom theme", "Priority support"] },
];

export default function BillingPage() {
  const [orders, setOrders] = useState<Array<{ id: string; plan: string; amount: number; status: string; paymentMethod?: string | null; createdAt: string }>>([]);
  const [subscription, setSubscription] = useState<{ plan: string; status: string; expiresAt?: string | null } | null>(null);

  useEffect(() => {
    axios.get("/api/orders").then((response) => setOrders(response.data)).catch(() => null);
    axios.get("/api/dashboard/overview").then((response) => setSubscription(response.data.subscription ?? null)).catch(() => null);
  }, []);

  const currentPaidOrder = orders.find((order) => order.status === "paid") ?? null;
  const activePlan = getBillingPlan(subscription?.plan ?? currentPaidOrder?.plan ?? "free");

  const createOrder = async (plan: "free" | "premium" | "pro") => {
    try {
      const { data } = await axios.post("/api/orders", { plan, paymentMethod: plan === "free" ? "system" : "manual" });
      setOrders((current) => [data, ...current]);
      toast.success(plan === "free" ? "Plan Free langsung aktif." : `Pesanan ${plan.toUpperCase()} berhasil dibuat dan masuk ke riwayat.`);
    } catch (error) {
      if (axios.isAxiosError(error) && typeof error.response?.data?.error === "string") {
        toast.error(error.response.data.error);
      } else {
        toast.error("Gagal membuat pesanan paket");
      }
    }
  };

  return <div className="space-y-6"><div><p className="text-sm uppercase tracking-[0.28em] text-brown-light">Billing</p><h1 className="font-serif text-3xl text-brown">Paket & Billing</h1><p className="mt-1 text-sm text-brown-light">Pilih paket sesuai kebutuhan undangan digital Anda. Saat klik pilih paket, sistem membuat order baru dan order itu muncul di Riwayat Pesanan.</p></div><Card className="border-gold/15 bg-white/80 backdrop-blur-xl"><CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="size-5" /> Paket Aktif</CardTitle><CardDescription>Plan aktif sekarang dibaca dari subscription yang benar-benar aktif, bukan sekadar order terakhir.</CardDescription></CardHeader><CardContent><div className="rounded-3xl bg-brown p-6 text-gold-light"><p className="text-sm uppercase tracking-[0.24em] opacity-70">Current Plan</p><h2 className="mt-2 font-serif text-4xl uppercase">{activePlan.label}</h2><p className="mt-2 text-sm opacity-70">{subscription ? `Status subscription: ${subscription.status}` : "Belum ada subscription aktif, jadi plan Anda masih Free."}</p><div className="mt-4 flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-white/10 px-3 py-1">Limit undangan: {activePlan.invitationLimit}</span><span className="rounded-full bg-white/10 px-3 py-1">Tier template: {activePlan.templateTier}</span>{subscription?.expiresAt && <span className="rounded-full bg-white/10 px-3 py-1">Berakhir: {new Date(subscription.expiresAt).toLocaleDateString("id-ID")}</span>}</div></div></CardContent></Card><div className="grid gap-6 lg:grid-cols-3">{plans.map((plan) => <Card key={plan.name} className={`border-gold/15 bg-white/80 backdrop-blur-xl ${plan.name === "Premium" ? "ring-2 ring-gold/30" : ""}`}><CardHeader><div className="mb-3 flex items-center justify-between"><CardTitle className="font-serif text-3xl text-brown">{plan.name}</CardTitle>{plan.name === "Premium" && <Sparkles className="size-5 text-gold" />}</div><p className="text-3xl font-bold text-brown">{plan.price}</p><CardDescription>{plan.desc}</CardDescription></CardHeader><CardContent className="space-y-5"><ul className="space-y-3">{plan.features.map((feature) => <li key={feature} className="flex items-center gap-2 text-sm text-brown-light"><CheckCircle2 className="size-4 text-gold" /> {feature}</li>)}</ul><Button onClick={() => createOrder(plan.name.toLowerCase() as "free" | "premium" | "pro")} className="w-full bg-brown text-gold-light hover:bg-gold hover:text-brown">Pilih {plan.name}</Button></CardContent></Card>)}</div><Card className="border-gold/15 bg-white/80 backdrop-blur-xl"><CardHeader><CardTitle>Riwayat Pesanan</CardTitle><CardDescription>Pesanan muncul dari klik tombol paket di halaman Billing. Setelah admin atau webhook menandai order menjadi paid, sistem akan mengaktifkan subscription user.</CardDescription></CardHeader><CardContent className="space-y-3">{orders.length === 0 ? <div className="rounded-2xl border border-dashed border-gold/20 bg-cream/50 px-4 py-6 text-sm text-brown-light">Belum ada pesanan. Pilih salah satu paket di atas untuk membuat order pertama Anda.</div> : orders.map((order) => <div key={order.id} className="flex items-center justify-between rounded-2xl border border-gold/15 bg-white px-4 py-3"><div><p className="font-medium text-brown uppercase">{order.plan}</p><p className="text-xs text-brown-light">{new Date(order.createdAt).toLocaleDateString("id-ID")} · {order.paymentMethod ?? "manual"} · Rp{order.amount.toLocaleString("id-ID")}</p></div><span className="rounded-full bg-brown/10 px-3 py-1 text-xs text-brown">{order.status}</span></div>)}</CardContent></Card></div>;
}
