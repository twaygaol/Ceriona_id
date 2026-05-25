"use client";

import Link from "next/link";
import { useMemo } from "react";
import { CheckCircle2, Clock3, Edit3, QrCode, UserRoundCheck, Users, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const activityFeed = [
  { name: "Rina Setia", action: "baru RSVP hadir untuk resepsi", time: "2 menit lalu" },
  { name: "Budi Santoso", action: "baru check-in lewat QR", time: "8 menit lalu" },
  { name: "Tina Keluarga", action: "mengirim ucapan tamu", time: "15 menit lalu" },
  { name: "Doni Pratama", action: "mengubah status menjadi tidak hadir", time: "24 menit lalu" },
];

const checkins = [
  { name: "Rina Setia", group: "Teman", time: "18:45" },
  { name: "Keluarga Bapak Andi", group: "Keluarga", time: "18:39" },
  { name: "Budi Santoso", group: "Kantor", time: "18:32" },
  { name: "Nadia Putri", group: "Teman", time: "18:21" },
];

function DonutProgress({ value, label, color }: { value: number; label: string; color: string }) {
  const circumference = 2 * Math.PI * 44;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
          <circle cx="60" cy="60" r="44" stroke="#e2e8f0" strokeWidth="10" fill="none" />
          <circle cx="60" cy="60" r="44" stroke={color} strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <p className="text-3xl font-semibold text-[#0f172a]">{value}%</p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const stats = useMemo(
    () => [
      { label: "Total Tamu", value: 248, icon: Users, tone: "text-slate-900" },
      { label: "Hadir", value: 162, icon: UserRoundCheck, tone: "text-emerald-600" },
      { label: "Tidak Hadir", value: 34, icon: XCircle, tone: "text-rose-500" },
      { label: "Belum Konfirmasi", value: 52, icon: Clock3, tone: "text-amber-500" },
    ],
    []
  );

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Client Dashboard</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[#0f172a]">Ringkasan pengelolaan undangan</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">Dashboard ini difokuskan untuk operasional tamu, RSVP, check-in QR, ucapan tamu, analytics ringkas, dan wedding planner tanpa elemen visual yang mengganggu.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/dashboard/invitations/create" className="inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">Buat Undangan Baru</Link>
          <Link href="/dashboard/invitations" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300"><Edit3 className="size-4" /> Edit Undangan Saya</Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.label} className="rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_12px_30px_-22px_rgba(15,23,42,0.2)]">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                  <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">{item.value}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <item.icon className={`size-5 ${item.tone}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_12px_30px_-22px_rgba(15,23,42,0.2)]">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">Activity Feed</CardTitle>
            <CardDescription>Aktivitas terbaru dari tamu dan undangan Anda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {activityFeed.map((item) => (
              <div key={`${item.name}-${item.time}`} className="flex items-start gap-4 rounded-[1.2rem] border border-slate-100 bg-slate-50/70 p-4">
                <div className="mt-0.5 rounded-full bg-slate-900 p-2 text-white"><CheckCircle2 className="size-4" /></div>
                <div>
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{item.action}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">{item.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_12px_30px_-22px_rgba(15,23,42,0.2)]">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">Status RSVP</CardTitle>
            <CardDescription>Ringkasan konfirmasi kehadiran dalam bentuk visual sederhana.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <DonutProgress value={65} label="Hadir" color="#10b981" />
            <DonutProgress value={21} label="Belum" color="#f59e0b" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_12px_30px_-22px_rgba(15,23,42,0.2)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-slate-900"><QrCode className="size-5 text-slate-900" /> Check-in Terbaru</CardTitle>
            <CardDescription>Monitoring tamu yang baru saja hadir di venue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {checkins.map((item) => (
              <div key={`${item.name}-${item.time}`} className="flex items-center justify-between rounded-[1.2rem] border border-slate-100 bg-slate-50/70 px-4 py-3">
                <div>
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.group}</p>
                </div>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">{item.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_12px_30px_-22px_rgba(15,23,42,0.2)]">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">Wedding Planner Snapshot</CardTitle>
            <CardDescription>Ringkasan agenda dan tugas penting tanpa dashboard yang terlalu ramai.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {[
              ["Meeting Vendor", "Besok 10:00", "Konfirmasi rundown akhir dan kebutuhan acara."],
              ["Follow-up RSVP", "Hari ini", "Hubungi tamu yang belum memberikan konfirmasi kehadiran."],
              ["Final Check Venue", "H-2", "Pastikan QR check-in dan welcome desk siap."],
              ["Distribusi Reminder", "H-1", "Kirim reminder WhatsApp ke tamu utama dan keluarga."],
            ].map(([title, time, desc]) => (
              <div key={title} className="rounded-[1.25rem] border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{time}</p>
                <p className="mt-2 font-medium text-slate-900">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
