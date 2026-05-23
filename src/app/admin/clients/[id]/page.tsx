"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Mail, MessageCircle, Users } from "lucide-react";

interface ClientDetailResponse {
  client: {
    id: string;
    name?: string | null;
    email: string;
    role: string;
    createdAt: string;
    summary: { invitations: number; published: number; views: number; guests: number; rsvps: number };
    invitations: Array<{ id: string; title: string; brideName: string; groomName: string; isPublished: boolean; viewCount: number; template: { name: string }; _count: { guests: number; rsvps: number } }>;
  };
  guests: Array<{ id: string; name: string; phone?: string | null; status: string }>;
  rsvps: Array<{ id: string; name: string; attending: boolean; guestCount: number; createdAt: string }>;
  whatsappLogs: Array<{ id: string; provider: string; phone: string; status: string; guest?: { name: string } | null }>;
}

export default function AdminClientDetailPage() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<ClientDetailResponse | null>(null);

  useEffect(() => {
    axios.get<ClientDetailResponse>(`/api/admin/clients/${params.id}`).then((response) => setData(response.data)).catch(() => null);
  }, [params.id]);

  if (!data) return <div className="text-white/55">Memuat client...</div>;

  return (
    <div className="space-y-8 text-white">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-[#D9B86C]">Client Detail</p>
        <h1 className="mt-2 font-serif text-5xl">{data.client.name || data.client.email}</h1>
        <p className="mt-3 text-sm text-white/55">{data.client.email} · role: {data.client.role}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Stat label="Invitations" value={data.client.summary.invitations} />
        <Stat label="Published" value={data.client.summary.published} />
        <Stat label="Views" value={data.client.summary.views} />
        <Stat label="Guests" value={data.client.summary.guests} />
        <Stat label="RSVP" value={data.client.summary.rsvps} />
      </div>

      <Section title="Undangan Client" icon={Mail}>
        {data.client.invitations.map((invitation) => (
          <div key={invitation.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="font-medium text-white">{invitation.brideName} & {invitation.groomName}</p>
            <p className="mt-1 text-xs text-white/45">{invitation.template.name} · {invitation.isPublished ? "published" : "draft"}</p>
            <p className="mt-2 text-xs text-[#D9B86C]">{invitation._count.guests} tamu · {invitation._count.rsvps} RSVP · {invitation.viewCount} views</p>
          </div>
        ))}
      </Section>

      <div className="grid gap-6 xl:grid-cols-3">
        <Section title="Guest Activity" icon={Users}>
          {data.guests.map((guest) => (
            <div key={guest.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-medium text-white">{guest.name}</p>
              <p className="mt-1 text-xs text-white/45">{guest.phone || "no phone"}</p>
              <p className="mt-2 text-xs text-[#D9B86C]">{guest.status}</p>
            </div>
          ))}
        </Section>
        <Section title="Recent RSVP" icon={MessageCircle}>
          {data.rsvps.map((rsvp) => (
            <div key={rsvp.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-medium text-white">{rsvp.name}</p>
              <p className="mt-1 text-xs text-white/45">{rsvp.guestCount} orang</p>
              <p className="mt-2 text-xs text-[#D9B86C]">{rsvp.attending ? "Hadir" : "Tidak Hadir"}</p>
            </div>
          ))}
        </Section>
        <Section title="WhatsApp Logs" icon={MessageCircle}>
          {data.whatsappLogs.map((log) => (
            <div key={log.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-medium text-white">{log.guest?.name || log.phone}</p>
              <p className="mt-1 text-xs text-white/45">{log.provider}</p>
              <p className="mt-2 text-xs text-[#D9B86C]">{log.status}</p>
            </div>
          ))}
        </Section>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5"><p className="text-xs uppercase tracking-[0.2em] text-white/45">{label}</p><p className="mt-4 font-serif text-4xl">{value}</p></div>;
}

function Section({ title, icon: Icon, children }: { title: string; icon: typeof Mail; children: React.ReactNode }) {
  return <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-5"><div className="flex items-center gap-2 text-white"><Icon className="size-4 text-[#D9B86C]" /><h2 className="font-serif text-2xl">{title}</h2></div><div className="space-y-3">{children}</div></div>;
}
