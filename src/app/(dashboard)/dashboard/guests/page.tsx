"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Download, MessageCircle, Plus, Search, Upload, Users } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface InvitationOption { id: string; title: string; brideName: string; groomName: string }
interface GuestRow { id: string; name: string; phone?: string | null; email?: string | null; group?: string | null; status: string; invitationUrl?: string | null }
interface WhatsAppSendResult { guestId: string; name: string; phone: string; provider: "fonnte" | "wa_link"; status: "sent" | "failed" | "fallback_link"; url?: string }

const guestSchema = z.object({
  name: z.string().min(1, "Nama tamu wajib diisi"),
  phone: z.string().optional(),
  email: z.string().optional(),
  group: z.string().optional(),
});

type GuestValues = z.input<typeof guestSchema>;
const defaultGuestValues: GuestValues = { name: "", phone: "", email: "", group: "" };

export default function GuestsPage() {
  const [invitations, setInvitations] = useState<InvitationOption[]>([]);
  const [selectedInvitationId, setSelectedInvitationId] = useState("");
  const [guests, setGuests] = useState<GuestRow[]>([]);
  const [selectedGuestIds, setSelectedGuestIds] = useState<string[]>([]);
  const [message, setMessage] = useState("Halo {name}, kami mengundang Anda untuk hadir di acara kami: {url}");
  const [lastResults, setLastResults] = useState<WhatsAppSendResult[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GuestValues>({ resolver: zodResolver(guestSchema), defaultValues: defaultGuestValues });

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

  const filteredGuests = guests.filter((guest) => guest.name.toLowerCase().includes(query.toLowerCase()) || guest.phone?.includes(query) || guest.email?.toLowerCase().includes(query.toLowerCase()));
  const selectedCount = selectedGuestIds.length;
  const allSelected = useMemo(() => filteredGuests.length > 0 && selectedGuestIds.length === filteredGuests.length, [filteredGuests, selectedGuestIds]);

  const importGuests = async (file: File) => {
    if (!selectedInvitationId) return;
    const formData = new FormData();
    formData.append("invitationId", selectedInvitationId);
    formData.append("file", file);
    try {
      const { data } = await axios.post<{ imported: number; skipped?: number }>("/api/guests/import", formData);
      toast.success(`${data.imported} tamu berhasil diimport${data.skipped ? `, ${data.skipped} dilewati` : ""}`);
      const response = await axios.get<GuestRow[]>(`/api/guests?invitationId=${selectedInvitationId}`);
      setGuests(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && typeof error.response?.data?.error === "string") {
        toast.error(error.response.data.error);
      } else {
        toast.error("Gagal import tamu. Gunakan CSV dari Excel dengan kolom name, phone, email, group.");
      }
    }
  };

  const exportGuests = () => {
    if (!selectedInvitationId) return;
    window.open(`/api/guests?invitationId=${selectedInvitationId}&export=csv`, "_blank");
  };

  const createGuest = async (values: GuestValues) => {
    if (!selectedInvitationId) return;
    try {
      const { data } = await axios.post<GuestRow>("/api/guests", { invitationId: selectedInvitationId, ...values });
      setGuests((current) => [data, ...current]);
      reset(defaultGuestValues);
      toast.success("Tamu berhasil ditambahkan");
    } catch (error) {
      if (axios.isAxiosError(error) && typeof error.response?.data?.error === "string") {
        toast.error(error.response.data.error);
      } else {
        toast.error("Gagal menambahkan tamu");
      }
    }
  };

  const sendWhatsApp = async () => {
    try {
      const { data } = await axios.post<{ results: WhatsAppSendResult[]; links: Array<{ url: string }> }>("/api/guests/whatsapp", { guestIds: selectedGuestIds, message });
      setLastResults(data.results);
      data.links.slice(0, 10).forEach((link) => window.open(link.url, "_blank"));
      const sent = data.results.filter((item) => item.status === "sent").length;
      const fallback = data.results.filter((item) => item.status === "fallback_link").length;
      const failed = data.results.filter((item) => item.status === "failed").length;
      toast.success(`${sent} terkirim via API, ${fallback} fallback link, ${failed} gagal.`);
    } catch (error) {
      if (axios.isAxiosError(error) && typeof error.response?.data?.error === "string") {
        toast.error(error.response.data.error);
      } else {
        toast.error("Gagal membuat link WhatsApp");
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Daftar Tamu</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">Kelola tamu undangan dengan rapi</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">Semua kebutuhan tamu, import CSV, create manual, dan broadcast WhatsApp difokuskan di satu halaman yang lebih ringan dan profesional.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Tamu" value={guests.length} />
        <StatCard label="Tamu Dipilih" value={selectedCount} tone="emerald" />
        <StatCard label="Group Terdeteksi" value={new Set(guests.map((guest) => guest.group).filter(Boolean)).size} tone="amber" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <Card className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">Pilih Undangan</CardTitle>
              <CardDescription>Semua tamu dikelompokkan berdasarkan undangan aktif.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
              <select value={selectedInvitationId} onChange={(event) => setSelectedInvitationId(event.target.value)} className="input-premium">
                {invitations.map((invitation) => <option key={invitation.id} value={invitation.id}>{invitation.title || `${invitation.brideName} & ${invitation.groomName}`}</option>)}
              </select>
              <label className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-slate-300">
                <Upload className="size-4" /> Import CSV
                <input type="file" accept=".csv,text/csv" className="hidden" onChange={(event) => event.target.files?.[0] && importGuests(event.target.files[0])} />
              </label>
              <Button type="button" variant="outline" onClick={exportGuests}><Download className="size-4" /> Export</Button>
            </CardContent>
          </Card>

          <Card className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900"><Plus className="size-5" /> Tambah Tamu Manual</CardTitle>
              <CardDescription>Tambah tamu satu per satu tanpa harus import file.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(createGuest)} className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_auto]">
                <div>
                  <input {...register("name")} className="input-premium" placeholder="Nama tamu" />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <input {...register("phone")} className="input-premium" placeholder="WhatsApp / Telepon" />
                <div>
                  <input {...register("email")} className="input-premium" placeholder="Email opsional" />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>
                <input {...register("group")} className="input-premium" placeholder="Group, mis. keluarga" />
                <Button type="submit" className="bg-[#0f172a] text-white hover:bg-slate-800"><Plus className="size-4" /> Simpan</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900"><Users className="size-5" /> Daftar Tamu</CardTitle>
              <CardDescription>Data tamu yang aktif untuk undangan terpilih.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama, nomor, atau email tamu..." className="input-premium pl-10" />
              </div>
              {isLoading ? (
                <div className="py-10 text-center text-slate-500">Memuat tamu...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-left text-slate-400">
                        <th className="py-3 pr-3"><input type="checkbox" checked={allSelected} onChange={(event) => setSelectedGuestIds(event.target.checked ? filteredGuests.map((guest) => guest.id) : [])} /></th>
                        <th>Nama</th>
                        <th>WhatsApp</th>
                        <th>Email</th>
                        <th>Group</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGuests.map((guest) => (
                        <tr key={guest.id} className="border-b border-slate-100">
                          <td className="py-3 pr-3"><input type="checkbox" checked={selectedGuestIds.includes(guest.id)} onChange={(event) => setSelectedGuestIds((current) => event.target.checked ? [...current, guest.id] : current.filter((id) => id !== guest.id))} /></td>
                          <td className="font-medium text-slate-900">{guest.name}</td>
                          <td className="text-slate-600">{guest.phone || "-"}</td>
                          <td className="text-slate-600">{guest.email || "-"}</td>
                          <td className="text-slate-600">{guest.group || "-"}</td>
                          <td><span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">{guest.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">WhatsApp Broadcast</CardTitle>
              <CardDescription>Gunakan placeholder {"{name}"} dan {"{url}"} untuk pesan personal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={4} className="input-premium py-3" />
              <Button type="button" disabled={selectedCount === 0} onClick={sendWhatsApp} className="w-full bg-[#0f172a] text-white hover:bg-slate-800"><MessageCircle className="size-4" /> Kirim ke {selectedCount} tamu</Button>
              <p className="text-xs text-slate-400">Jika `FONNTE_TOKEN` tersedia, pesan dikirim via API. Jika belum, sistem membuat link WhatsApp sebagai fallback.</p>
            </CardContent>
          </Card>

          {lastResults.length > 0 && (
            <Card className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-900">Hasil Broadcast Terakhir</CardTitle>
                <CardDescription>Ringkasan pengiriman paling baru.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {lastResults.slice(0, 8).map((result) => (
                  <div key={result.guestId} className="flex items-center justify-between rounded-[1.2rem] border border-slate-100 bg-slate-50/70 px-4 py-3 text-sm">
                    <span className="font-medium text-slate-900">{result.name}</span>
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-white">{result.provider} · {result.status}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, tone = "slate" }: { label: string; value: number; tone?: "slate" | "emerald" | "amber" }) {
  const toneClass = { slate: "text-slate-900", emerald: "text-emerald-600", amber: "text-amber-500" }[tone];
  return <Card className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm"><CardContent className="p-6"><p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p><p className={`mt-4 text-4xl font-semibold ${toneClass}`}>{value}</p></CardContent></Card>;
}
