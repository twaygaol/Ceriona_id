"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TitleSkeleton, CardSkeleton, ListSkeleton } from "@/components/ui/dashboard-skeleton";

const initialTemplates = [
  { title: "Undangan Utama", body: "Halo {name}, kami mengundang Anda untuk hadir di acara kami: {url}" },
  { title: "Reminder RSVP", body: "Halo {name}, kami belum menerima RSVP Anda. Mohon bantu konfirmasi di sini: {url}" },
  { title: "Reminder H-1", body: "Halo {name}, ini pengingat acara kami besok. Sampai bertemu di: {url}" },
];

interface WhatsAppLogRow {
  id: string;
  guest?: { name: string; invitation: { title: string } } | null;
  provider: string;
  status: string;
  createdAt: string;
}

export default function WhatsAppTemplatesPage() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [logs, setLogs] = useState<WhatsAppLogRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get<WhatsAppLogRow[]>("/api/guests/whatsapp/logs").then((response) => setLogs(response.data)).catch(() => null).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <WhatsAppSkeleton />;

  function WhatsAppSkeleton() {
    return <div className="space-y-8"><TitleSkeleton /><div className="grid gap-6 xl:grid-cols-[1fr_360px]"><div className="grid gap-4 xl:grid-cols-3">{Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}</div><CardSkeleton /></div></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Template WhatsApp</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">Kelola pesan broadcast dengan lebih rapi</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">Client dapat menyesuaikan beberapa template penting sekaligus melihat jejak broadcast terbaru tanpa berpindah-pindah halaman.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-4 xl:grid-cols-3">
          {templates.map((item, index) => (
            <Card key={index} className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900"><MessageCircle className="size-5" /> {item.title}</CardTitle>
                <CardDescription>Gunakan placeholder seperti {"{name}"} dan {"{url}"}.</CardDescription>
              </CardHeader>
              <CardContent>
                <textarea value={item.body} onChange={(event) => setTemplates((current) => current.map((template, templateIndex) => templateIndex === index ? { ...template, body: event.target.value } : template))} rows={6} className="input-premium py-3" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900">Aktivitas Broadcast</CardTitle>
            <CardDescription>Riwayat singkat pengiriman WhatsApp terbaru.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {logs.slice(0, 8).map((log) => (
              <div key={log.id} className="rounded-[1.2rem] border border-slate-100 bg-slate-50/70 p-4">
                <p className="font-medium text-slate-900">{log.guest?.name || "Guest"}</p>
                <p className="mt-1 text-sm text-slate-500">{log.guest?.invitation.title || "Undangan"}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">{log.provider} · {log.status}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
