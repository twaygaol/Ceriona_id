"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { PlayCircle, Radio, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TitleSkeleton, SelectSkeleton, CardSkeleton } from "@/components/ui/dashboard-skeleton";

interface InvitationOption { id: string; title: string; brideName: string; groomName: string }
interface LiveStreamItem { id: string; provider: string; title: string; url: string; scheduledAt?: string | null; status: string }

const liveStreamSchema = z.object({
  provider: z.string().min(1, "Provider wajib dipilih"),
  title: z.string().min(1, "Judul wajib diisi"),
  url: z.string().url("URL tidak valid"),
  scheduledAt: z.string().optional(),
  status: z.string().min(1),
});

type LiveStreamValues = z.input<typeof liveStreamSchema>;
const defaultValues: LiveStreamValues = { provider: "youtube", title: "Live Wedding Ceremony", url: "", scheduledAt: "", status: "scheduled" };

export default function LiveStreamingPage() {
  const [invitations, setInvitations] = useState<InvitationOption[]>([]);
  const [selectedInvitationId, setSelectedInvitationId] = useState("");
  const [streams, setStreams] = useState<LiveStreamItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [featureLocked, setFeatureLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LiveStreamValues>({ resolver: zodResolver(liveStreamSchema), defaultValues });

  useEffect(() => {
    async function loadInvitations() {
      const { data } = await axios.get<InvitationOption[]>("/api/invitations");
      setInvitations(data);
      if (data[0]) setSelectedInvitationId(data[0].id);
    }
    loadInvitations().catch(() => toast.error("Gagal memuat undangan")).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LiveStreamSkeleton />;

  useEffect(() => {
    async function loadStreams() {
      if (!selectedInvitationId) return;
      const { data } = await axios.get<LiveStreamItem[]>(`/api/live-streams/${selectedInvitationId}`);
      setStreams(data);
      setFeatureLocked(false);
    }
    loadStreams().catch(() => setFeatureLocked(true));
  }, [selectedInvitationId]);

  const onSubmit = async (values: LiveStreamValues) => {
    if (!selectedInvitationId) return;
    setIsSaving(true);
    try {
      await axios.post(`/api/live-streams/${selectedInvitationId}`, values);
      toast.success("Live stream ditambahkan");
      reset(defaultValues);
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

  function LiveStreamSkeleton() {
    return <div className="space-y-6"><TitleSkeleton /><SelectSkeleton /><div className="grid gap-6 xl:grid-cols-[420px_1fr]"><CardSkeleton /><CardSkeleton /></div></div>;
  }

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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-brown">Provider</span>
                <select {...register("provider")} className="input-premium">
                  <option value="youtube">YouTube Live</option>
                  <option value="zoom">Zoom</option>
                  <option value="meet">Google Meet</option>
                  <option value="instagram">Instagram Live</option>
                  <option value="custom">Custom URL</option>
                </select>
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-brown">Judul</span>
                <input {...register("title")} className="input-premium" />
                {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-brown">URL Live</span>
                <input {...register("url")} className="input-premium" placeholder="https://..." />
                {errors.url && <p className="text-xs text-red-500">{errors.url.message}</p>}
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-brown">Jadwal</span>
                <input type="datetime-local" {...register("scheduledAt")} className="input-premium" />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-brown">Status</span>
                <select {...register("status")} className="input-premium">
                  <option value="scheduled">Scheduled</option>
                  <option value="live">Live</option>
                  <option value="ended">Ended</option>
                </select>
              </label>
              <Button type="submit" disabled={isSaving || featureLocked} className="w-full bg-brown text-gold-light hover:bg-gold hover:text-brown">
                <PlayCircle className="size-4" /> {isSaving ? "Menyimpan..." : "Simpan Live"}
              </Button>
            </form>
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
