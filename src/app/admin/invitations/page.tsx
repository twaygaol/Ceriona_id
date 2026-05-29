"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Eye, Search } from "lucide-react";

interface AdminInvitation {
  id: string;
  title: string;
  brideName: string;
  groomName: string;
  isPublished: boolean;
  viewCount: number;
  createdAt: string;
  userId: string;
  user: { id: string; name?: string | null; email: string };
  template: { id: string; name: string };
  _count: { guests: number; rsvps: number };
}

export default function AdminInvitationsPage() {
  const [invitations, setInvitations] = useState<AdminInvitation[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "published" | "draft">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (status !== "all") params.set("status", status);

    axios.get<AdminInvitation[]>(`/api/admin/invitations?${params.toString()}`)
      .then((response) => setInvitations(response.data))
      .catch(() => null)
      .finally(() => setLoading(false));
  }, [query, status]);

  const totals = useMemo(() => ({ total: invitations.length, published: invitations.filter((item) => item.isPublished).length, views: invitations.reduce((sum, item) => sum + item.viewCount, 0) }), [invitations]);

  return (
    <div className="space-y-8 text-white">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-gold-accent">Invitation Management</p>
        <h1 className="mt-2 font-serif text-5xl">All Invitations</h1>
        <p className="mt-3 text-sm text-white/55">Admin bisa memantau undangan dari semua client dalam satu layar.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat value={totals.total} label="Total Invitations" />
        <Stat value={totals.published} label="Published" />
        <Stat value={totals.views} label="Total Views" />
      </div>

      <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 md:grid-cols-[1fr_220px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/45" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari judul atau nama pasangan..." className="w-full rounded-2xl border border-white/10 bg-[#15100e] py-3 pl-10 pr-4 text-white outline-none" />
        </div>
        <select value={status} onChange={(event) => setStatus(event.target.value as typeof status)} className="rounded-2xl border border-white/10 bg-[#15100e] px-4 py-3 text-white outline-none">
          <option value="all">Semua Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
        <table className="w-full min-w-[980px] text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/45">
              <th className="px-5 py-4">Undangan</th>
              <th>Client</th>
              <th>Template</th>
              <th>Tamu / RSVP</th>
              <th>Views</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="p-8 text-center text-white/45">Memuat data undangan...</td></tr>
            ) : invitations.length === 0 ? (
              <tr><td colSpan={7} className="p-8 text-center text-white/45">Tidak ada undangan ditemukan</td></tr>
            ) : invitations.map((item) => (
              <tr key={item.id} className="border-b border-white/10 text-white/75">
                <td className="px-5 py-4">
                  <p className="font-medium text-white">{item.brideName} & {item.groomName}</p>
                  <p className="text-xs text-white/45">{item.title}</p>
                </td>
                <td>
                  <Link href={`/admin/clients/${item.user.id}`} className="hover:text-gold-accent">{item.user.name || item.user.email}</Link>
                </td>
                <td>{item.template.name}</td>
                <td>{item._count.guests} / {item._count.rsvps}</td>
                <td>{item.viewCount}</td>
                <td><span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em]">{item.isPublished ? "published" : "draft"}</span></td>
                <td>
                  <Link href={`/admin/invitations/edit/${item.id}`} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 hover:bg-white/10">
                    <Eye className="size-4" /> Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5"><p className="text-xs uppercase tracking-[0.2em] text-white/45">{label}</p><p className="mt-4 font-serif text-4xl">{value}</p></div>;
}
