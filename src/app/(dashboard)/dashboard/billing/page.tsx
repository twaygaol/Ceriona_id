"use client";

import { CheckCircle2, CreditCard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  { name: "Free", price: "Rp0", desc: "Untuk mulai membuat undangan sederhana.", features: ["1 undangan", "Template basic", "RSVP basic", "Link share"] },
  { name: "Premium", price: "Rp149K", desc: "Untuk wedding digital yang terlihat premium.", features: ["5 undangan", "Premium template", "Guest management", "WhatsApp broadcast", "Wedding gift"] },
  { name: "Pro", price: "Rp299K", desc: "Untuk kebutuhan lengkap dan high-end.", features: ["Unlimited undangan", "Live streaming", "Analytics advanced", "Custom theme", "Priority support"] },
];

export default function BillingPage() {
  return <div className="space-y-6"><div><p className="text-sm uppercase tracking-[0.28em] text-brown-light">Billing</p><h1 className="font-serif text-3xl text-brown">Paket & Billing</h1><p className="mt-1 text-sm text-brown-light">Pilih paket sesuai kebutuhan undangan digital Anda.</p></div><Card className="border-gold/15 bg-white/80 backdrop-blur-xl"><CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="size-5" /> Paket Aktif</CardTitle><CardDescription>Integrasi payment gateway belum diaktifkan. Saat ini halaman berfungsi sebagai plan selector UI.</CardDescription></CardHeader><CardContent><div className="rounded-3xl bg-brown p-6 text-gold-light"><p className="text-sm uppercase tracking-[0.24em] opacity-70">Current Plan</p><h2 className="mt-2 font-serif text-4xl">Free</h2><p className="mt-2 text-sm opacity-70">Upgrade untuk membuka fitur premium seperti broadcast, live streaming, dan template eksklusif.</p></div></CardContent></Card><div className="grid gap-6 lg:grid-cols-3">{plans.map((plan) => <Card key={plan.name} className={`border-gold/15 bg-white/80 backdrop-blur-xl ${plan.name === "Premium" ? "ring-2 ring-gold/30" : ""}`}><CardHeader><div className="mb-3 flex items-center justify-between"><CardTitle className="font-serif text-3xl text-brown">{plan.name}</CardTitle>{plan.name === "Premium" && <Sparkles className="size-5 text-gold" />}</div><p className="text-3xl font-bold text-brown">{plan.price}</p><CardDescription>{plan.desc}</CardDescription></CardHeader><CardContent className="space-y-5"><ul className="space-y-3">{plan.features.map((feature) => <li key={feature} className="flex items-center gap-2 text-sm text-brown-light"><CheckCircle2 className="size-4 text-gold" /> {feature}</li>)}</ul><Button className="w-full bg-brown text-gold-light hover:bg-gold hover:text-brown">Pilih {plan.name}</Button></CardContent></Card>)}</div></div>;
}
