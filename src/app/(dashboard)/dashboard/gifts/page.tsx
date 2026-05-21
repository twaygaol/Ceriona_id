"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Gift, Plus, QrCode, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

type GiftForm = Pick<VirtualGiftItem, "type"> & {
  provider: string;
  accountNumber: string;
  accountName: string;
  qrImageUrl: string;
};

const defaultForm: GiftForm = {
  type: "bank" as const,
  provider: "",
  accountNumber: "",
  accountName: "",
  qrImageUrl: "",
};

export default function GiftsPage() {
  const [invitations, setInvitations] = useState<InvitationOption[]>([]);
  const [selectedInvitationId, setSelectedInvitationId] = useState("");
  const [gifts, setGifts] = useState<VirtualGiftItem[]>([]);
  const [form, setForm] = useState(defaultForm);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadInvitations() {
      try {
        const { data } = await axios.get<InvitationOption[]>("/api/invitations");
        setInvitations(data);
        if (data[0]) setSelectedInvitationId(data[0].id);
      } catch {
        toast.error("Gagal memuat undangan");
      }
    }

    loadInvitations();
  }, []);

  useEffect(() => {
    async function loadGifts() {
      if (!selectedInvitationId) return;
      try {
        const { data } = await axios.get<VirtualGiftItem[]>(`/api/gifts/${selectedInvitationId}`);
        setGifts(data);
      } catch {
        toast.error("Gagal memuat wedding gift");
      }
    }

    loadGifts();
  }, [selectedInvitationId]);

  const saveGift = async () => {
    if (!selectedInvitationId) return;
    setIsSaving(true);
    try {
      await axios.post(`/api/gifts/${selectedInvitationId}`, form);
      toast.success("Wedding gift berhasil ditambahkan");
      setForm(defaultForm);
      const { data } = await axios.get<VirtualGiftItem[]>(`/api/gifts/${selectedInvitationId}`);
      setGifts(data);
    } catch {
      toast.error("Gagal menyimpan wedding gift");
    } finally {
      setIsSaving(false);
    }
  };

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

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Plus className="size-5" /> Tambah Gift</CardTitle>
            <CardDescription>Untuk payment gateway, isi provider misalnya Midtrans/Xendit dan gunakan QR/link dari provider.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-brown">Tipe</span>
              <select value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as VirtualGiftItem["type"] }))} className="input-premium">
                <option value="bank">Bank Transfer</option>
                <option value="ewallet">E-Wallet</option>
                <option value="payment_gateway">Payment Gateway</option>
              </select>
            </label>
            <Input label="Provider" value={form.provider} placeholder="BCA / Mandiri / DANA / Midtrans" onChange={(provider) => setForm((current) => ({ ...current, provider }))} />
            <Input label="Nomor Akun" value={form.accountNumber} placeholder="Nomor rekening / wallet" onChange={(accountNumber) => setForm((current) => ({ ...current, accountNumber }))} />
            <Input label="Nama Pemilik" value={form.accountName} placeholder="a.n. Nama Pemilik" onChange={(accountName) => setForm((current) => ({ ...current, accountName }))} />
            <Input label="QR Image URL" value={form.qrImageUrl} placeholder="https://..." onChange={(qrImageUrl) => setForm((current) => ({ ...current, qrImageUrl }))} />
            <Button type="button" disabled={isSaving} onClick={saveGift} className="w-full bg-brown text-gold-light hover:bg-gold hover:text-brown">
              <Gift className="size-4" />
              {isSaving ? "Menyimpan..." : "Simpan Gift"}
            </Button>
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

function Input({ label, value, placeholder, onChange }: { label: string; value: string; placeholder?: string; onChange: (value: string) => void }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-brown">{label}</span>
      <input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="input-premium" />
    </label>
  );
}
