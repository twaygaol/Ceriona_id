"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { BarChart3, LayoutTemplate, Mail, RadioTower, Users } from "lucide-react";

interface AdminOverview {
  stats: {
    users: number;
    clients: number;
    admins: number;
    invitations: number;
    publishedInvitations: number;
    templates: number;
    activeTemplates: number;
    guests: number;
    rsvps: number;
    views: number;
  };
  clients: Array<{ id: string; name?: string | null; email: string; role: string; invitations: number; publishedInvitations: number; views: number; guests: number; rsvps: number }>;
  recentInvitations: Array<{ id: string; couple: string; template: string; user: string; views: number; isPublished: boolean }>;
  recentRsvps: Array<{ id: string; name: string; attending: boolean; guestCount: number }>;
  whatsappLogs: Array<{ id: string; provider: string; phone: string; status: string; guest?: string | null }>;
}

const cards = [
  { title: "Template Builder", desc: "Kelola tema visual dan template undangan.", href: "/admin/templates", icon: LayoutTemplate },
  { title: "Semua Undangan", desc: "Pantau undangan yang dibuat client.", href: "/admin/invitations", icon: Mail },
  { title: "Users", desc: "Kelola role, client, dan akun platform.", href: "/admin/users", icon: Users },
  { title: "Analytics", desc: "Insight performa platform secara keseluruhan.", href: "/admin/analytics", icon: BarChart3 },
];

export default function AdminPage() {
  const [overview, setOverview] = useState<AdminOverview | null>(null);

  useEffect(() => {
    axios.get<AdminOverview>("/api/admin/overview").then((response) => setOverview(response.data)).catch(() => null);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-[#D9B86C]">Admin Console</p>
        <h1 className="mt-2 font-serif text-5xl text-white">Platform Management</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/55">Dari template, client, undangan, tamu, RSVP, WhatsApp, sampai monitoring aktivitas platform dikelola dari satu dashboard admin.</p>
      </div>

      {overview && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <StatCard label="Clients" value={overview.stats.clients} />
          <StatCard label="Admins" value={overview.stats.admins} />
          <StatCard label="Undangan" value={overview.stats.invitations} />
          <StatCard label="Templates" value={overview.stats.templates} />
          <StatCard label="Views" value={overview.stats.views} />
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10">
            <card.icon className="mb-6 size-8 text-[#D9B86C]" />
            <h2 className="font-serif text-2xl text-white">{card.title}</h2>
            <p className="mt-2 text-sm leading-6 text-white/55">{card.desc}</p>
          </Link>
        ))}
      </div>

      {overview && (
        <div className="grid gap-6 xl:grid-cols-3">
          <Panel title="Recent Invitations">
            {overview.recentInvitations.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">{item.couple}</p>
                <p className="mt-1 text-xs text-white/45">{item.template} · {item.user}</p>
                <p className="mt-2 text-xs text-[#D9B86C]">{item.views} views · {item.isPublished ? "published" : "draft"}</p>
              </div>
            ))}
          </Panel>
          <Panel title="Recent RSVP">
            {overview.recentRsvps.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">{item.name}</p>
                <p className="mt-1 text-xs text-white/45">{item.guestCount} orang</p>
                <p className="mt-2 text-xs text-[#D9B86C]">{item.attending ? "Hadir" : "Tidak Hadir"}</p>
              </div>
            ))}
          </Panel>
          <Panel title="WhatsApp Activity">
            {overview.whatsappLogs.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">{item.guest || item.phone}</p>
                <p className="mt-1 text-xs text-white/45">{item.provider}</p>
                <p className="mt-2 text-xs text-[#D9B86C]">{item.status}</p>
              </div>
            ))}
          </Panel>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5"><p className="text-xs uppercase tracking-[0.22em] text-white/45">{label}</p><p className="mt-4 font-serif text-4xl text-white">{value}</p></div>;
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-5"><div className="flex items-center gap-2 text-white"><RadioTower className="size-4 text-[#D9B86C]" /><h2 className="font-serif text-2xl">{title}</h2></div><div className="space-y-3">{children}</div></div>;
}
