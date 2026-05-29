"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Gift, Plus, QrCode, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TitleSkeleton, SelectSkeleton, CardSkeleton } from "@/components/ui/dashboard-skeleton";

interface InvitationOption {
  id: string;
  title: string;
  brideName: string;
  groomName: string;
}

interface VirtualGiftItem {
  id: string;
  type: "bank" | "ewallet" | "payment_gateway";
  provider: string;
  accountNumber?: string | null;
  accountName?: string | null;
  qrImageUrl?: string | null;
}

const giftSchema = z.object({
  type: z.enum(["bank", "ewallet", "payment_gateway"]),
  provider: z.string().min(1, "Provider wajib diisi"),
  accountNumber: z.string().optional(),
  accountName: z.string().optional(),
  qrImageUrl: z.string().optional(),
});

type GiftValues = z.input<typeof giftSchema>;
const defaultValues: GiftValues = { type: "bank", provider: "", accountNumber: "", accountName: "", qrImageUrl: "" };

export default function GiftsPage() {
  const [invitations, setInvitations] = useState<InvitationOption[]>([]);
  const [selectedInvitationId, setSelectedInvitationId] = useState("");
  const [gifts, setGifts] = useState<VirtualGiftItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [featureLocked, setFeatureLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GiftValues>({ resolver: zodResolver(giftSchema), defaultValues });

  useEffect(() => {
    async function loadInvitations() {
      try {
        const { data } = await axios.get<InvitationOption[]>("/api/invitations");
        setInvitations(data);
        if (data[0]) setSelectedInvitationId(data[0].id);
      } catch {
        toast.error("Gagal memuat undangan");
      } finally {
        setIsLoading(false);
      }
    }
    loadInvitations();
  }, []);

  if (isLoading) return <GiftsSkeleton />;

  useEffect(() => {
    async function loadGifts() {
      if (!selectedInvitationId) return;
      try {
        const { data } = await axios.get<VirtualGiftItem[]>(`/api/gifts/${selectedInvitationId}`);
        setGifts(data);
        setFeatureLocked(false);
      } catch {
        setFeatureLocked(true);
      }
    }
    loadGifts();
  }, [selectedInvitationId]);

  const onSubmit = async (values: GiftValues) => {
    if (!selectedInvitationId) return;
    setIsSaving(true);
    try {
      await axios.post(`/api/gifts/${selectedInvitationId}`, values);
      toast.success("Wedding gift berhasil ditambahkan");
      reset(defaultValues);
      const { data } = await axios.get<VirtualGiftItem[]>(`/api/gifts/${selectedInvitationId}`);
      setGifts(data);
    } catch {
      toast.error("Gagal menyimpan wedding gift");
    } finally {
      setIsSaving(false);
    }
  };

  function GiftsSkeleton() {
    return <div className="space-y-6"><TitleSkeleton /><SelectSkeleton /><div className="grid gap-6 xl:grid-cols-[420px_1fr]"><CardSkeleton /><CardSkeleton /></div></div>;
  }

  const deleteGift = async (giftId: string) => {
    try {
      await axios.delete(`/api/gifts/${selectedInvitationId}?giftId=${giftId}`);
      setGifts((current) => current.filter((gift) => gift.id !== giftId));
      toast.success("Wedding gift dihapus");
    } catch {
      toast.error("Gagal menghapus wedding gift");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-brown-light">Virtual Wedding Gift</p>
        <h1 className="font-serif text-3xl text-brown">Wedding Gift</h1>
        <p className="mt-1 text-sm text-brown-light">Kelola rekening, e-wallet, QR, dan konfigurasi payment gateway untuk undangan.</p>
      </div>

      <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Pilih Undangan</CardTitle>
          <CardDescription>Wedding gift akan tampil di undangan publik yang dipilih.</CardDescription>
        </CardHeader>
        <CardContent>
          <select value={selectedInvitationId} onChange={(event) => setSelectedInvitationId(event.target.value)} className="input-premium">
            {invitations.map((invitation) => (
              <option key={invitation.id} value={invitation.id}>{invitation.title || `${invitation.brideName} & ${invitation.groomName}`}</option>
            ))}
          </select>
        </CardContent>
      </Card>

      {featureLocked && <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">Fitur Wedding Gift tersedia mulai paket Premium. Upgrade paket untuk mengaktifkan fitur ini.</div>}
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Plus className="size-5" /> Tambah Gift</CardTitle>
            <CardDescription>Untuk payment gateway, isi provider misalnya Midtrans/Xendit dan gunakan QR/link dari provider.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-brown">Tipe</span>
                <select {...register("type")} className="input-premium">
                  <option value="bank">Bank Transfer</option>
                  <option value="ewallet">E-Wallet</option>
                  <option value="payment_gateway">Payment Gateway</option>
                </select>
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-brown">Provider</span>
                <input {...register("provider")} className="input-premium" placeholder="BCA / Mandiri / DANA / Midtrans" />
                {errors.provider && <p className="text-xs text-red-500">{errors.provider.message}</p>}
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-brown">Nomor Akun</span>
                <input {...register("accountNumber")} className="input-premium" placeholder="Nomor rekening / wallet" />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-brown">Nama Pemilik</span>
                <input {...register("accountName")} className="input-premium" placeholder="a.n. Nama Pemilik" />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-brown">QR Image URL</span>
                <input {...register("qrImageUrl")} className="input-premium" placeholder="https://..." />
                {errors.qrImageUrl && <p className="text-xs text-red-500">{errors.qrImageUrl.message}</p>}
              </label>
              <Button type="submit" disabled={isSaving || featureLocked} className="w-full bg-brown text-gold-light hover:bg-gold hover:text-brown">
                <Gift className="size-4" /> {isSaving ? "Menyimpan..." : "Simpan Gift"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Gift Aktif</CardTitle>
            <CardDescription>{gifts.length} metode gift tampil di undangan publik.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {gifts.map((gift) => (
              <div key={gift.id} className="rounded-3xl border border-gold/15 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brown text-gold-light">
                      <QrCode className="size-5" />
                    </div>
                    <div>
                      <p className="font-medium text-brown">{gift.provider}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-brown-light">{gift.type}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => deleteGift(gift.id)} className="rounded-xl p-2 text-brown-light transition hover:bg-red-50 hover:text-red-500">
                    <Trash2 className="size-4" />
                  </button>
                </div>
                {gift.accountNumber && <p className="font-mono text-lg text-brown">{gift.accountNumber}</p>}
                {gift.accountName && <p className="mt-1 text-sm text-brown-light">a.n. {gift.accountName}</p>}
                {gift.qrImageUrl && <p className="mt-3 break-all text-xs text-brown-light">QR: {gift.qrImageUrl}</p>}
              </div>
            ))}
            {gifts.length === 0 && <div className="col-span-full rounded-3xl border border-dashed border-gold/20 p-10 text-center text-brown-light">Belum ada wedding gift.</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
