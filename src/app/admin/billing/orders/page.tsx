"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";

interface AdminOrder {
  id: string;
  plan: string;
  amount: number;
  status: string;
  paymentMethod?: string | null;
  createdAt: string;
  user: { id: string; name?: string | null; email: string };
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [transactions, setTransactions] = useState<Array<{ id: string; provider: string; externalId: string; status: string; signatureVerified: boolean }>>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const { data } = await axios.get<AdminOrder[]>("/api/admin/orders");
      setOrders(data);
      const tx = await axios.get<Array<{ id: string; provider: string; externalId: string; status: string; signatureVerified: boolean }>>("/api/admin/payments/transactions");
      setTransactions(tx.data);
    } catch {
      toast.error("Gagal memuat data order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadOrders(); }, []);

  const updateStatus = async (orderId: string, status: string) => {
    try {
      await axios.put("/api/admin/orders", { orderId, status });
      toast.success("Status order diperbarui");
      loadOrders();
    } catch {
      toast.error("Gagal update status order");
    }
  };

  return (
    <div className="space-y-8 text-white">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-gold-accent">Order Management</p>
        <h1 className="mt-2 font-serif text-5xl">Billing Orders</h1>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/45">
              <th className="px-5 py-4">Client</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="p-8 text-center text-white/45">Memuat data order...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={7} className="p-8 text-center text-white/45">Belum ada order</td></tr>
            ) : orders.map((order) => (
              <tr key={order.id} className="border-b border-white/10 text-white/75">
                <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-accent text-[#15100e]"><CreditCard className="size-4" /></div><div><p>{order.user.name || order.user.email}</p><p className="text-xs text-white/45">{order.user.email}</p></div></div></td>
                <td className="uppercase">{order.plan}</td>
                <td>Rp{order.amount.toLocaleString("id-ID")}</td>
                <td>{order.paymentMethod ?? "-"}</td>
                <td><span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em]">{order.status}</span></td>
                <td>{new Date(order.createdAt).toLocaleDateString("id-ID")}</td>
                <td><select value={order.status} onChange={(event) => updateStatus(order.id, event.target.value)} className="rounded-xl border border-white/10 bg-[#15100e] px-3 py-2 text-white outline-none"><option value="pending">pending</option><option value="paid">paid</option><option value="cancelled">cancelled</option></select></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-5">
        <h2 className="font-serif text-3xl">Payment Transactions</h2>
        {loading ? (
          <p className="text-sm text-white/45">Memuat transaksi...</p>
        ) : transactions.length === 0 ? (
          <p className="text-sm text-white/45">Belum ada transaksi</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">{tx.provider}</p>
                <p className="mt-1 break-all text-xs text-white/45">{tx.externalId}</p>
                <p className="mt-2 text-xs text-gold-accent">{tx.status} · signature {tx.signatureVerified ? "ok" : "invalid"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
