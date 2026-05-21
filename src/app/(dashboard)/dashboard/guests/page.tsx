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
  phone?: string | null;
  email?: string | null;
  group?: string | null;
  status: string;
  invitationUrl?: string | null;
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

      <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users className="size-5" /> Daftar Tamu</CardTitle>
          <CardDescription>{guests.length} tamu terdaftar.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-10 text-center text-brown-light">Memuat tamu...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="border-b border-gold/15 text-left text-brown-light">
                    <th className="py-3 pr-3"><input type="checkbox" checked={allSelected} onChange={(event) => setSelectedGuestIds(event.target.checked ? guests.map((guest) => guest.id) : [])} /></th>
                    <th>Nama</th>
                    <th>WhatsApp</th>
                    <th>Email</th>
                    <th>Group</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.map((guest) => (
                    <tr key={guest.id} className="border-b border-gold/10">
                      <td className="py-3 pr-3"><input type="checkbox" checked={selectedGuestIds.includes(guest.id)} onChange={(event) => setSelectedGuestIds((current) => event.target.checked ? [...current, guest.id] : current.filter((id) => id !== guest.id))} /></td>
                      <td className="font-medium text-brown">{guest.name}</td>
                      <td>{guest.phone || "-"}</td>
                      <td>{guest.email || "-"}</td>
                      <td>{guest.group || "-"}</td>
                      <td><span className="rounded-full bg-brown/10 px-2 py-1 text-xs text-brown">{guest.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
