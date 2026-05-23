"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { PlayCircle, Radio, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface InvitationOption { id: string; title: string; brideName: string; groomName: string }
interface LiveStreamItem { id: string; provider: string; title: string; url: string; scheduledAt?: string | null; status: string }

const defaultForm = { provider: "youtube", title: "Live Wedding Ceremony", url: "", scheduledAt: "", status: "scheduled" };

export default function LiveStreamingPage() {
  const [invitations, setInvitations] = useState<InvitationOption[]>([]);
  const [selectedInvitationId, setSelectedInvitationId] = useState("");
  const [streams, setStreams] = useState<LiveStreamItem[]>([]);
  const [form, setForm] = useState(defaultForm);
  const [isSaving, setIsSaving] = useState(false);
  const [featureLocked, setFeatureLocked] = useState(false);

  useEffect(() => {
    async function loadInvitations() {
      const { data } = await axios.get<InvitationOption[]>("/api/invitations");
      setInvitations(data);
      if (data[0]) setSelectedInvitationId(data[0].id);
    }
    loadInvitations().catch(() => toast.error("Gagal memuat undangan"));
  }, []);

  useEffect(() => {
    async function loadStreams() {
      if (!selectedInvitationId) return;
      const { data } = await axios.get<LiveStreamItem[]>(`/api/live-streams/${selectedInvitationId}`);
      setStreams(data);
      setFeatureLocked(false);
    }
    loadStreams().catch(() => setFeatureLocked(true));
  }, [selectedInvitationId]);

  const saveStream = async () => {
    if (!selectedInvitationId) return;
    setIsSaving(true);
    try {
      await axios.post(`/api/live-streams/${selectedInvitationId}`, form);
      toast.success("Live stream ditambahkan");
      setForm(defaultForm);
      const { data } = await axios.get<LiveStreamItem[]>(`/api/live-streams/${selectedInvitationId}`);
      setStreams(data);
    } catch (error) {
      if (axios.isAxiosError(error) && typeof error.response?.data?.error === "string") {
        toast.error(error.response.data.error);
      } else {
        toast.error("Gagal menyimpan live stream");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const deleteStream = async (streamId: string) => {
    try {
      await axios.delete(`/api/live-streams/${selectedInvitationId}?streamId=${streamId}`);
      setStreams((current) => current.filter((stream) => stream.id !== streamId));
      toast.success("Live stream dihapus");
    } catch {
      toast.error("Gagal menghapus live stream");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-brown-light">Live Streaming</p>
        <h1 className="font-serif text-3xl text-brown">Live Streaming</h1>
        <p className="mt-1 text-sm text-brown-light">Tambahkan link YouTube, Zoom, Meet, Instagram Live, atau custom stream ke undangan.</p>
      </div>

      <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
        <CardHeader><CardTitle>Pilih Undangan</CardTitle><CardDescription>Live streaming akan tampil pada undangan yang dipilih.</CardDescription></CardHeader>
        <CardContent>
          <select value={selectedInvitationId} onChange={(event) => setSelectedInvitationId(event.target.value)} className="input-premium">
            {invitations.map((invitation) => <option key={invitation.id} value={invitation.id}>{invitation.title || `${invitation.brideName} & ${invitation.groomName}`}</option>)}
          </select>
        </CardContent>
      </Card>

      {featureLocked && <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">Fitur Live Streaming tersedia mulai paket Premium. Upgrade paket untuk mengaktifkan fitur ini.</div>}
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
          <CardHeader><CardTitle className="flex items-center gap-2"><Radio className="size-5" /> Tambah Live</CardTitle><CardDescription>Isi jadwal dan link live streaming.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <select value={form.provider} onChange={(event) => setForm((current) => ({ ...current, provider: event.target.value }))} className="input-premium">
              <option value="youtube">YouTube Live</option>
              <option value="zoom">Zoom</option>
              <option value="meet">Google Meet</option>
              <option value="instagram">Instagram Live</option>
              <option value="custom">Custom URL</option>
            </select>
            <Input label="Judul" value={form.title} onChange={(title) => setForm((current) => ({ ...current, title }))} />
            <Input label="URL Live" value={form.url} placeholder="https://..." onChange={(url) => setForm((current) => ({ ...current, url }))} />
            <Input label="Jadwal" type="datetime-local" value={form.scheduledAt} onChange={(scheduledAt) => setForm((current) => ({ ...current, scheduledAt }))} />
            <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))} className="input-premium">
              <option value="scheduled">Scheduled</option>
              <option value="live">Live</option>
              <option value="ended">Ended</option>
            </select>
            <Button type="button" disabled={isSaving || featureLocked} onClick={saveStream} className="w-full bg-brown text-gold-light hover:bg-gold hover:text-brown">
              <PlayCircle className="size-4" /> {isSaving ? "Menyimpan..." : "Simpan Live"}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
          <CardHeader><CardTitle>Live Aktif</CardTitle><CardDescription>{streams.length} link live tampil di undangan.</CardDescription></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {streams.map((stream) => (
              <div key={stream.id} className="rounded-3xl border border-gold/15 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-brown">{stream.title}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-brown-light">{stream.provider} · {stream.status}</p>
                  </div>
                  <button type="button" onClick={() => deleteStream(stream.id)} className="rounded-xl p-2 text-brown-light transition hover:bg-red-50 hover:text-red-500"><Trash2 className="size-4" /></button>
                </div>
                <a href={stream.url} target="_blank" rel="noopener noreferrer" className="break-all text-sm text-gold-dark underline">{stream.url}</a>
                {stream.scheduledAt && <p className="mt-3 text-sm text-brown-light">{new Date(stream.scheduledAt).toLocaleString("id-ID")}</p>}
              </div>
            ))}
            {streams.length === 0 && <div className="col-span-full rounded-3xl border border-dashed border-gold/20 p-10 text-center text-brown-light">Belum ada live stream.</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string }) {
  return <label className="block space-y-2"><span className="text-sm font-medium text-brown">{label}</span><input type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="input-premium" /></label>;
}
