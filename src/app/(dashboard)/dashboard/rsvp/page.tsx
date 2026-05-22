"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { CheckCircle2, Download, Search, Utensils, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface InvitationOption {
  id: string;
  title: string;
  brideName: string;
  groomName: string;
}

interface RSVPRow {
  id: string;
  name: string;
  attending: boolean;
  guestCount: number;
  session?: string | null;
  menuPreference?: string | null;
  dietaryNote?: string | null;
  companionNames?: string | null;
  message?: string | null;
  createdAt: string;
}

const sessionLabels: Record<string, string> = {
  akad: "Akad",
  reception: "Resepsi",
  both: "Akad & Resepsi",
};

const menuLabels: Record<string, string> = {
  regular: "Regular",
  vegetarian: "Vegetarian",
  kids: "Kids Meal",
  other: "Lainnya",
};

export default function RSVPPage() {
  const [invitations, setInvitations] = useState<InvitationOption[]>([]);
  const [selectedInvitationId, setSelectedInvitationId] = useState("");
  const [rsvps, setRsvps] = useState<RSVPRow[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "attending" | "not-attending">("all");
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
    async function loadRsvps() {
      if (!selectedInvitationId) return;
      setIsLoading(true);
      try {
        const { data } = await axios.get<RSVPRow[]>(`/api/rsvp/${selectedInvitationId}`);
        setRsvps(data);
      } catch {
        toast.error("Gagal memuat RSVP");
      } finally {
        setIsLoading(false);
      }
    }

    loadRsvps();
  }, [selectedInvitationId]);

  const filteredRsvps = rsvps.filter((rsvp) => {
    const matchesQuery = rsvp.name.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "attending" ? rsvp.attending : !rsvp.attending);

    return matchesQuery && matchesStatus;
  });

  const summary = useMemo(() => {
    const attending = rsvps.filter((rsvp) => rsvp.attending);
    return {
      total: rsvps.length,
      attending: attending.length,
      notAttending: rsvps.filter((rsvp) => !rsvp.attending).length,
      guestCount: attending.reduce((sum, rsvp) => sum + rsvp.guestCount, 0),
      dietary: rsvps.filter((rsvp) => rsvp.dietaryNote).length,
    };
  }, [rsvps]);

  const exportCsv = () => {
    const header = ["name", "attending", "guestCount", "session", "menu", "dietary", "companions", "message"];
    const rows = filteredRsvps.map((rsvp) => [
      rsvp.name,
      rsvp.attending ? "yes" : "no",
      rsvp.guestCount,
      rsvp.session ?? "",
      rsvp.menuPreference ?? "",
      rsvp.dietaryNote ?? "",
      rsvp.companionNames ?? "",
      rsvp.message ?? "",
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rsvp-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-brown-light">RSVP Management</p>
        <h1 className="font-serif text-3xl text-brown">Data RSVP</h1>
        <p className="mt-1 text-sm text-brown-light">Pantau konfirmasi hadir, sesi, menu, dietary, dan pendamping tamu.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <SummaryCard label="Total RSVP" value={summary.total} />
        <SummaryCard label="Hadir" value={summary.attending} tone="green" />
        <SummaryCard label="Tidak Hadir" value={summary.notAttending} tone="red" />
        <SummaryCard label="Total Orang" value={summary.guestCount} />
        <SummaryCard label="Dietary Note" value={summary.dietary} tone="gold" />
      </div>

      <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Filter RSVP</CardTitle>
          <CardDescription>Pilih undangan dan filter data RSVP yang masuk.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-[1fr_220px_1fr_auto]">
          <select value={selectedInvitationId} onChange={(event) => setSelectedInvitationId(event.target.value)} className="input-premium">
            {invitations.map((invitation) => (
              <option key={invitation.id} value={invitation.id}>{invitation.title || `${invitation.brideName} & ${invitation.groomName}`}</option>
            ))}
          </select>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)} className="input-premium">
            <option value="all">Semua Status</option>
            <option value="attending">Hadir</option>
            <option value="not-attending">Tidak Hadir</option>
          </select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brown-light" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama tamu..." className="input-premium pl-10" />
          </div>
          <Button type="button" variant="outline" onClick={exportCsv}>
            <Download className="size-4" />
            Export
          </Button>
        </CardContent>
      </Card>

      <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>RSVP Masuk</CardTitle>
          <CardDescription>{filteredRsvps.length} data sesuai filter.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-12 text-center text-brown-light">Memuat RSVP...</div>
          ) : (
            <div className="grid gap-4">
              {filteredRsvps.map((rsvp) => (
                <div key={rsvp.id} className="rounded-[1.5rem] border border-gold/15 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex gap-3">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${rsvp.attending ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {rsvp.attending ? <CheckCircle2 className="size-5" /> : <XCircle className="size-5" />}
                      </div>
                      <div>
                        <p className="font-medium text-brown">{rsvp.name}</p>
                        <p className="text-sm text-brown-light">
                          {rsvp.attending ? `${rsvp.guestCount} orang · ${sessionLabels[rsvp.session ?? "both"] ?? "Semua sesi"}` : "Tidak hadir"}
                        </p>
                        {rsvp.companionNames && <p className="mt-1 text-xs text-brown-light">Pendamping: {rsvp.companionNames}</p>}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {rsvp.menuPreference && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-3 py-1 text-xs text-brown">
                          <Utensils className="size-3" />
                          {menuLabels[rsvp.menuPreference] ?? rsvp.menuPreference}
                        </span>
                      )}
                      {rsvp.dietaryNote && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800">Dietary: {rsvp.dietaryNote}</span>}
                    </div>
                  </div>
                  {rsvp.message && <p className="mt-4 rounded-2xl bg-cream px-4 py-3 text-sm italic leading-6 text-brown-light">&ldquo;{rsvp.message}&rdquo;</p>}
                </div>
              ))}
              {filteredRsvps.length === 0 && <div className="rounded-3xl border border-dashed border-gold/20 p-10 text-center text-brown-light">Belum ada RSVP.</div>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryCard({ label, value, tone = "brown" }: { label: string; value: number; tone?: "brown" | "green" | "red" | "gold" }) {
  const toneClass = {
    brown: "text-brown bg-brown/10",
    green: "text-green-700 bg-green-100",
    red: "text-red-700 bg-red-100",
    gold: "text-gold-dark bg-gold/15",
  }[tone];

  return (
    <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
      <CardContent className="p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-brown-light">{label}</p>
        <div className={`mt-4 inline-flex rounded-2xl px-4 py-2 text-2xl font-bold ${toneClass}`}>{value}</div>
      </CardContent>
    </Card>
  );
}
