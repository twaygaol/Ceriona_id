"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface OverviewResponse {
  invitations: Array<{ id: string; couple: string; progressPercent: number; isPublished: boolean; template: string }>;
}

export default function PlannerPage() {
  const [overview, setOverview] = useState<OverviewResponse | null>(null);

  useEffect(() => {
    axios.get<OverviewResponse>("/api/dashboard/overview").then((response) => setOverview(response.data)).catch(() => null);
  }, []);

  const firstInvitation = overview?.invitations[0];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Wedding Planner</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">Planner yang terhubung dengan progres undangan</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">Client dapat melihat tugas penting dan progres undangan dari satu tempat tanpa membuka terlalu banyak halaman sekaligus.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900"><CalendarDays className="size-5" /> Timeline Tugas</CardTitle>
            <CardDescription>Tugas operasional yang paling relevan untuk undangan digital dan koordinasi acara.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ["Kunci tema undangan final", "Hari ini", "done"],
              ["Lengkapi data tamu & grup", "H-14", "progress"],
              ["Setup QR check-in", "H-7", "todo"],
              ["Reminder acara via WhatsApp", "H-1", "todo"],
            ].map(([title, due, status]) => (
              <div key={title} className="flex items-start gap-4 rounded-[1.25rem] border border-slate-100 bg-slate-50/70 p-4">
                <div className={`mt-0.5 rounded-2xl p-2 ${status === "done" ? "bg-emerald-100 text-emerald-600" : status === "progress" ? "bg-amber-100 text-amber-600" : "bg-slate-200 text-slate-500"}`}><CheckCircle2 className="size-4" /></div>
                <div>
                  <p className="font-medium text-slate-900">{title}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">{due}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900">Progress Undangan Aktif</CardTitle>
            <CardDescription>Planner sekarang dikaitkan dengan progres undangan yang sedang dikerjakan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {firstInvitation ? (
              <>
                <div className="rounded-[1.25rem] border border-slate-100 bg-slate-50/70 p-4">
                  <p className="font-serif text-2xl text-slate-900">{firstInvitation.couple}</p>
                  <p className="mt-2 text-sm text-slate-500">{firstInvitation.template}</p>
                  <div className="mt-4 h-3 rounded-full bg-slate-200"><div className="h-3 rounded-full bg-slate-900" style={{ width: `${firstInvitation.progressPercent}%` }} /></div>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">Progress {firstInvitation.progressPercent}%</p>
                </div>
                <div className="grid gap-3">
                  <QuickLink href="/dashboard/invitations/create" title="Buat Undangan Baru" desc="Mulai undangan baru dari tema yang sudah dipilih." />
                  <QuickLink href="/dashboard/invitations" title="Edit Undangan Saya" desc="Lengkapi foto, cerita, lokasi, dan konten utama." />
                  <QuickLink href="/dashboard/guests" title="Kelola Daftar Tamu" desc="Pastikan data tamu siap sebelum reminder dikirim." />
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-500">Belum ada undangan aktif untuk ditampilkan di planner.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function QuickLink({ href, title, desc }: { href: string; title: string; desc: string }) {
  return <Link href={href} className="rounded-[1.25rem] border border-slate-100 bg-slate-50/70 p-4 transition hover:-translate-y-0.5 hover:bg-white"><p className="font-medium text-slate-900">{title}</p><p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p></Link>;
}
