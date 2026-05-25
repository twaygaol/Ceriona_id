"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { CheckCircle2, CreditCard, XCircle } from "lucide-react";
import { toast } from "sonner";

interface OrderDetail {
  id: string;
  plan: string;
  amount: number;
  status: string;
  paymentMethod?: string | null;
  note?: string | null;
  createdAt: string;
}

interface SimulationResult {
  status: string;
  next?: string;
  accountEmail?: string;
  invitationId?: string;
}

export default function CheckoutOrderPage() {
  const params = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<SimulationResult | null>(null);

  useEffect(() => {
    axios.get<OrderDetail>(`/api/orders/public/${params.orderId}`).then((response) => {
      setOrder(response.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [params.orderId]);

  const simulate = async (result: "paid" | "failed" | "expired") => {
    try {
      const { data } = await axios.post<SimulationResult>("/api/payments/simulate", { orderId: params.orderId, result });
      setResult(data);
      toast.success(`Simulasi pembayaran: ${result}`);
      const response = await axios.get<OrderDetail>(`/api/orders/public/${params.orderId}`);
      setOrder(response.data);
    } catch {
      toast.error("Gagal menjalankan simulasi pembayaran");
    }
  };

  if (loading) return <div className="min-h-screen bg-cream p-10 text-center text-brown-light">Memuat checkout...</div>;
  if (!order) return <div className="min-h-screen bg-cream p-10 text-center text-brown-light">Order tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-[#f8f2ea] px-5 py-14">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-brown-light">Payment Demo</p>
          <h1 className="mt-3 font-serif text-5xl text-brown">Checkout Pembayaran</h1>
          <p className="mt-3 text-sm leading-7 text-brown-light">Halaman ini untuk simulasi alur pembayaran. Nanti bisa diganti ke sandbox/production gateway seperti Midtrans atau Xendit.</p>
        </div>

        <div className="rounded-[2rem] border border-gold/15 bg-white/85 p-6 shadow-xl backdrop-blur-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-brown-light">Order ID</p>
              <p className="mt-1 font-mono text-sm text-brown">{order.id}</p>
            </div>
            <div className="rounded-full bg-brown px-3 py-1 text-xs uppercase tracking-[0.18em] text-gold-light">{order.status}</div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Info label="Plan" value={order.plan.toUpperCase()} />
            <Info label="Nominal" value={`Rp${order.amount.toLocaleString("id-ID")}`} />
            <Info label="Metode" value={order.paymentMethod ?? "gateway"} />
          </div>

          <div className="mt-6 rounded-2xl border border-gold/15 bg-cream px-4 py-4 text-sm text-brown-light">
            Setelah status pembayaran berubah menjadi <span className="font-medium text-brown">paid</span>, sistem akan otomatis:
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>mengaktifkan subscription</li>
              <li>membuat akun jika belum ada</li>
              <li>mengirim email verifikasi dan detail akun</li>
              <li>membuat draft undangan dengan tema yang dipilih</li>
            </ul>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <button onClick={() => simulate("paid")} className="inline-flex items-center justify-center gap-2 rounded-full bg-brown px-5 py-3 text-sm font-semibold text-gold-light hover:bg-gold hover:text-brown"><CheckCircle2 className="size-4" /> Simulasi Berhasil</button>
            <button onClick={() => simulate("failed")} className="inline-flex items-center justify-center gap-2 rounded-full border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"><XCircle className="size-4" /> Simulasi Gagal</button>
            <button onClick={() => simulate("expired")} className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-200 bg-white px-5 py-3 text-sm font-semibold text-amber-700 hover:bg-amber-50"><CreditCard className="size-4" /> Simulasi Expired</button>
          </div>

          {result?.status === "paid" && (
            <div className="mt-6 rounded-[1.7rem] border border-green-200 bg-gradient-to-br from-green-50 to-white p-5 text-green-900 shadow-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-green-700/70">Payment Success</p>
              <h2 className="mt-2 font-serif text-3xl">Pembayaran berhasil</h2>
              <p className="mt-3 text-sm leading-7">Akun dan draft undangan sudah disiapkan. Silakan cek email untuk verifikasi dan detail akses portal.</p>
              {result.accountEmail && <p className="mt-3 text-sm">Email akun: <span className="font-medium">{result.accountEmail}</span></p>}
              <div className="mt-5 flex flex-wrap gap-3">
                {result.next && <a href={result.next} className="inline-flex rounded-full bg-brown px-5 py-3 text-sm font-semibold text-gold-light">Verifikasi / Lanjut</a>}
                <a href="/login" className="inline-flex rounded-full border border-green-200 bg-white px-5 py-3 text-sm font-semibold text-green-900">Masuk ke Portal</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-gold/15 bg-white p-4"><p className="text-xs uppercase tracking-[0.2em] text-brown-light">{label}</p><p className="mt-2 font-medium text-brown">{value}</p></div>;
}
