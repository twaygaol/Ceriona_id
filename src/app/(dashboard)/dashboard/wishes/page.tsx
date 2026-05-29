"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { MessageSquareQuote } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TitleSkeleton, ListSkeleton } from "@/components/ui/dashboard-skeleton";

interface OverviewResponse {
  recentRsvps: Array<{ id: string; name: string; attending: boolean; guestCount: number; createdAt: string; invitation: { title: string }; message?: string | null }>;
}

export default function WishesPage() {
  const [overview, setOverview] = useState<OverviewResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get<OverviewResponse>("/api/dashboard/overview").then((response) => setOverview(response.data)).catch(() => null).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <WishesSkeleton />;

  function WishesSkeleton() {
    return <div className="space-y-8"><TitleSkeleton /><ListSkeleton count={4} /></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Ucapan Tamu</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">Baca ucapan tanpa dashboard yang ramai</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">Client dapat melihat interaksi tamu secara lebih fokus: siapa yang mengirim ucapan, dari undangan mana, dan bagaimana engagement berjalan.</p>
      </div>

      <Card className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900"><MessageSquareQuote className="size-5" /> Ucapan terbaru</CardTitle>
          <CardDescription>Semua ucapan terbaru yang tertangkap dari alur RSVP dan buku tamu.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {overview?.recentRsvps.map((item) => (
            <div key={item.id} className="rounded-[1.25rem] border border-slate-100 bg-slate-50/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.invitation.title}</p>
                </div>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-white">{item.guestCount} orang</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-500">{item.message || "Ucapan dan doa terbaru akan tampil di sini ketika tamu mengisi form publik."}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
