"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { QrCode, Search, UserRoundCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TitleSkeleton, StatsCardSkeleton, CardSkeleton } from "@/components/ui/dashboard-skeleton";

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
  group?: string | null;
  status: string;
}

export default function CheckinPage() {
  const [invitations, setInvitations] = useState<InvitationOption[]>([]);
  const [selectedInvitationId, setSelectedInvitationId] = useState("");
  const [guests, setGuests] = useState<GuestRow[]>([]);
  const [checkedInIds, setCheckedInIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("checkinState");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInvitations() {
      const { data } = await axios.get<InvitationOption[]>("/api/invitations");
      setInvitations(data);
      if (data[0]) setSelectedInvitationId(data[0].id);
    }
    loadInvitations().catch(() => null).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <CheckinSkeleton />;

  useEffect(() => {
    async function loadGuests() {
      if (!selectedInvitationId) return;
      const { data } = await axios.get<GuestRow[]>(`/api/guests?invitationId=${selectedInvitationId}`);
      setGuests(data);
    }
    loadGuests().catch(() => null);
  }, [selectedInvitationId]);

  const filteredGuests = useMemo(
    () => guests.filter((guest) => guest.name.toLowerCase().includes(query.toLowerCase()) || guest.phone?.includes(query) || guest.group?.toLowerCase().includes(query.toLowerCase())),
    [guests, query]
  );

  const checkedInCount = filteredGuests.filter((guest) => checkedInIds.includes(guest.id)).length;

  function CheckinSkeleton() {
    return <div className="space-y-8"><TitleSkeleton /><div className="grid gap-4 md:grid-cols-3">{Array.from({ length: 3 }).map((_, i) => <StatsCardSkeleton key={i} />)}</div><div className="grid gap-6 xl:grid-cols-[360px_1fr]"><CardSkeleton /><CardSkeleton /></div></div>;
  }

  const toggleCheckin = (guestId: string) => {
    setCheckedInIds((current) => {
      const next = current.includes(guestId) ? current.filter((id) => id !== guestId) : [...current, guestId];
      localStorage.setItem("checkinState", JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Check-in QR</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">Operasional tamu saat hari-H</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">Halaman ini menghubungkan daftar tamu dengan flow check-in yang cepat, simpel, dan rapi untuk tim penerima tamu.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Tamu" value={filteredGuests.length} />
        <StatCard label="Sudah Check-in" value={checkedInCount} tone="emerald" />
        <StatCard label="Belum Check-in" value={Math.max(filteredGuests.length - checkedInCount, 0)} tone="amber" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <Card className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900"><QrCode className="size-5" /> Scanner Area</CardTitle>
            <CardDescription>Placeholder scanner QR untuk implementasi kamera atau input kode tamu.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <select value={selectedInvitationId} onChange={(event) => setSelectedInvitationId(event.target.value)} className="input-premium">
              {invitations.map((invitation) => <option key={invitation.id} value={invitation.id}>{invitation.title || `${invitation.brideName} & ${invitation.groomName}`}</option>)}
            </select>
            <div className="flex aspect-square items-center justify-center rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 text-center text-slate-500">
              Area scan QR / input manual guest code
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900">Daftar check-in tamu</CardTitle>
            <CardDescription>Pilih tamu untuk simulasi validasi check-in dan pantau status kedatangan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama tamu, grup, atau nomor HP..." className="input-premium pl-10" />
            </div>
            <div className="grid gap-3">
              {filteredGuests.map((guest) => {
                const checkedIn = checkedInIds.includes(guest.id);
                return (
                  <button key={guest.id} type="button" onClick={() => toggleCheckin(guest.id)} className="flex items-center justify-between rounded-[1.25rem] border border-slate-100 bg-slate-50/70 px-4 py-3 text-left transition hover:bg-white">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-2xl p-2 ${checkedIn ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-500"}`}><UserRoundCheck className="size-4" /></div>
                      <div>
                        <p className="font-medium text-slate-900">{guest.name}</p>
                        <p className="text-sm text-slate-500">{guest.group || "Tanpa grup"} · {guest.phone || "no phone"}</p>
                      </div>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${checkedIn ? "bg-emerald-600 text-white" : "bg-slate-900 text-white"}`}>{checkedIn ? "Checked-in" : "Tap to check-in"}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ label, value, tone = "slate" }: { label: string; value: number; tone?: "slate" | "emerald" | "amber" }) {
  const toneClass = { slate: "text-slate-900", emerald: "text-emerald-600", amber: "text-amber-500" }[tone];
  return <Card className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm"><CardContent className="p-6"><p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p><p className={`mt-4 text-4xl font-semibold ${toneClass}`}>{value}</p></CardContent></Card>;
}
