"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useInvitationStore } from "@/store/useInvitationStore";
import { Copy, Edit, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function InvitationsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const routeBase = pathname.startsWith("/admin") ? "/admin/invitations" : "/dashboard/invitations";
  const { invitations, fetchInvitations, deleteInvitation, publishInvitation } = useInvitationStore();
  const [isLoading, setIsLoading] = useState(true);

  const loadInvitations = useCallback(async () => {
    try {
      const response = await axios.get("/api/invitations");
      fetchInvitations(response.data);
    } catch {
      toast.error("Gagal memuat undangan");
    } finally {
      setIsLoading(false);
    }
  }, [fetchInvitations]);

  useEffect(() => {
    loadInvitations();
  }, [loadInvitations]);

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus undangan ini?")) {
      try {
        await axios.delete(`/api/invitations/${id}`);
        deleteInvitation(id);
        toast.success("Undangan berhasil dihapus");
      } catch {
        toast.error("Gagal menghapus undangan");
      }
    }
  };

  const handlePublish = async (id: string, isPublished: boolean) => {
    try {
      await axios.put(`/api/invitations/${id}`, { isPublished: !isPublished });
      publishInvitation(id);
      toast.success(!isPublished ? "Undangan dipublikasikan" : "Undangan ditutup");
    } catch (error) {
      if (axios.isAxiosError(error) && typeof error.response?.data?.error === "string") {
        toast.error(error.response.data.error);
        if (error.response.status === 403) {
          router.push("/dashboard/billing");
        }
      } else {
        toast.error("Gagal mengubah status");
      }
    }
  };

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/invitation/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Link undangan disalin!");
  };

  if (isLoading) {
    return <div className="py-20 text-center text-slate-500">Memuat undangan...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Undangan Saya</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">Kelola undangan digital dengan lebih rapi</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">Buat, edit, publish, dan pantau progress undangan dari satu halaman yang lebih clean dan profesional.</p>
        </div>
        <Link href={`${routeBase}/create`} className="inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
          <Plus className="size-4" /> Buat Undangan
        </Link>
      </div>

      {invitations.length === 0 ? (
        <Card className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
          <CardContent className="py-20 text-center">
            <p className="text-sm text-slate-500">Belum ada undangan aktif di akun Anda.</p>
            <Link href={`${routeBase}/create`} className="mt-5 inline-flex rounded-full bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">Buat Undangan Pertama</Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {invitations.map((invitation) => (
            <Card key={invitation.id} className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <h2 className="font-serif text-3xl text-slate-900">{invitation.brideName} & {invitation.groomName}</h2>
                    <p className="mt-2 text-sm text-slate-500">Tanggal acara: {new Date(invitation.eventDate).toLocaleDateString("id-ID")} · Template ID: {invitation.templateId}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${invitation.isPublished ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{invitation.isPublished ? "Published" : "Draft"}</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{invitation.rsvps?.length || 0} RSVP</span>
                      {!invitation.isPublished && <span className="rounded-full bg-[#D9B86C]/15 px-3 py-1 text-xs font-medium text-[#8A672D]">Publish butuh paket aktif</span>}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => copyLink(invitation.slug)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300"><Copy className="size-4" /> Copy Link</button>
                    <button onClick={() => router.push(`${routeBase}/edit/${invitation.id}`)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300"><Edit className="size-4" /> Edit</button>
                    <button onClick={() => handlePublish(invitation.id, invitation.isPublished)} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${invitation.isPublished ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-[#0f172a] text-white hover:bg-slate-800"}`}>
                      {invitation.isPublished ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      {invitation.isPublished ? "Unpublish" : "Publish"}
                    </button>
                    <button onClick={() => handleDelete(invitation.id)} className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"><Trash2 className="size-4" /> Hapus</button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
