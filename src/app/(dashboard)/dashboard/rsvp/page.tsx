"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Download, MessageCircle, Upload, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface InvitationOption {
  id: string;
  title: string;
  brideName: string;
  groomName: string;
}

interface GuestRow {
  id: string;
  name: string;
  attending: boolean;
  guestCount: number;
  session?: string | null;
  menuPreference?: string;
  dietaryNote?: string | null;
  companionNames?: string | null;
  message?: string | null;
  createdAt: string;
  invitationId: string;
}

export default function GuestsPage() {
  const [invitations, setInvitations] = useState<InvitationOption[]>([]);
  const [selectedInvitationId, setSelectedInvitationId] = useState("");
  const [guests, setGuests] = useState<GuestRow[]>([]);
  const [selectedGuestIds, setSelectedGuestIds] = useState<string[]>([]);
  const [message, setMessage] = useState("Halo {name}, kami mengundang Anda untuk hadir di acara kami: {url}");
  const [isLoading, setIsLoading] = useState(true);

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
    async function loadGuests() {
      if (!selectedInvitationId) return;
      setIsLoading(true);
      try {
        const { data } = await axios.get<GuestRow[]>(`/api/guests?invitationId=${selectedInvitationId}`);
        setGuests(data);
        setSelectedGuestIds([]);
      } catch {
        toast.error("Gagal memuat tamu");
      } finally {
        setIsLoading(false);
      }
    }

    loadGuests();
  }, [selectedInvitationId]);

  const selectedCount = selectedGuestIds.length;
  const allSelected = useMemo(() => guests.length > 0 && selectedGuestIds.length === guests.length, [guests.length, selectedGuestIds.length]);

  const importGuests = async (file: File) => {
    if (!selectedInvitationId) return;
    const formData = new FormData();
    formData.append("invitationId", selectedInvitationId);
    formData.append("file", file);

    try {
      const { data } = await axios.post<{ imported: number }>("/api/guests/import", formData);
      toast.success(`${data.imported} tamu berhasil diimport`);
      const response = await axios.get<GuestRow[]>(`/api/guests?invitationId=${selectedInvitationId}`);
      setGuests(response.data);
    } catch {
      toast.error("Gagal import tamu. Gunakan CSV dari Excel dengan kolom name, phone, email, group.");
    }
  };

  const exportGuests = () => {
    if (!selectedInvitationId) return;
    window.open(`/api/guests?invitationId=${selectedInvitationId}&export=csv`, "_blank");
  };

  const sendWhatsApp = async () => {
    try {
      const { data } = await axios.post<{ links: Array<{ url: string }> }>("/api/guests/whatsapp", {
        guestIds: selectedGuestIds,
        message,
      });

      data.links.slice(0, 10).forEach((link) => window.open(link.url, "_blank"));
      toast.success(`${data.links.length} link WhatsApp dibuat. Browser mungkin membatasi tab massal.`);
    } catch {
      toast.error("Gagal membuat link WhatsApp");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-brown-light">Guest Management</p>
        <h1 className="font-serif text-3xl text-brown">Data Tamu</h1>
        <p className="mt-1 text-sm text-brown-light">Import/export tamu dari Excel dan kirim undangan massal via WhatsApp.</p>
      </div>

      <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Pilih Undangan</CardTitle>
          <CardDescription>Data tamu dikelompokkan per undangan.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
          <select value={selectedInvitationId} onChange={(event) => setSelectedInvitationId(event.target.value)} className="input-premium">
            {invitations.map((invitation) => (
              <option key={invitation.id} value={invitation.id}>{invitation.title || `${invitation.brideName} & ${invitation.groomName}`}</option>
            ))}
          </select>
          <label className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-gold/20 bg-white px-4 text-sm text-brown transition hover:border-brown">
            <Upload className="size-4" />
            Import CSV/Excel
            <input type="file" accept=".csv,text/csv" className="hidden" onChange={(event) => event.target.files?.[0] && importGuests(event.target.files[0])} />
          </label>
          <Button type="button" variant="outline" onClick={exportGuests}>
            <Download className="size-4" />
            Export CSV
          </Button>
        </CardContent>
      </Card>

      <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>WhatsApp Broadcast</CardTitle>
          <CardDescription>Gunakan placeholder {"{name}"} dan {"{url}"} untuk pesan personal.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={3} className="input-premium py-3" />
          <Button type="button" disabled={selectedCount === 0} onClick={sendWhatsApp} className="bg-brown text-gold-light hover:bg-gold hover:text-brown">
            <MessageCircle className="size-4" />
            Kirim ke {selectedCount} tamu
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
