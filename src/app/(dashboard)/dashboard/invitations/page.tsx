"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useInvitationStore } from "@/store/useInvitationStore";
import { Plus, Edit, Trash2, Copy, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";

export default function InvitationsPage() {
  const router = useRouter();
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
    } catch {
      toast.error("Gagal mengubah status");
    }
  };

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/invitation/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Link undangan disalin!");
  };

  if (isLoading) {
    return <div className="text-center py-20">Memuat data...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl text-brown">Kelola Undangan</h1>
          <p className="text-brown-light mt-1">Buat dan kelola semua undangan digital Anda</p>
        </div>
        <Link
          href="/dashboard/invitations/create"
          className="flex items-center gap-2 px-4 py-2 bg-brown text-gold-light rounded-lg hover:bg-gold hover:text-brown transition-colors"
        >
          <Plus size={18} />
          <span>Buat Undangan</span>
        </Link>
      </div>

      {invitations.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-gold/20">
          <p className="text-brown-light mb-4">Belum ada undangan</p>
          <Link href="/dashboard/invitations/create" className="text-gold hover:text-gold-dark">
            Buat undangan pertama Anda →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {invitations.map((invitation) => (
            <div
              key={invitation.id}
              className="bg-white rounded-lg border border-gold/20 p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="font-serif text-xl text-brown">
                    {invitation.brideName} & {invitation.groomName}
                  </h3>
                  <p className="text-sm text-brown-light mt-1">
                    Template: {invitation.templateId} | 
                    Tanggal: {new Date(invitation.eventDate).toLocaleDateString("id-ID")}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${invitation.isPublished ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {invitation.isPublished ? "Published" : "Draft"}
                    </span>
                    <span className="text-xs text-brown-light">
                      {invitation.rsvps?.length || 0} RSVP
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyLink(invitation.slug)}
                    className="p-2 text-brown-light hover:text-gold transition-colors"
                    title="Salin link"
                  >
                    <Copy size={18} />
                  </button>
                  <button
                    onClick={() => router.push(`/dashboard/invitations/edit/${invitation.id}`)}
                    className="p-2 text-brown-light hover:text-gold transition-colors"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handlePublish(invitation.id, invitation.isPublished)}
                    className="p-2 text-brown-light hover:text-gold transition-colors"
                    title={invitation.isPublished ? "Tutup" : "Publikasikan"}
                  >
                    {invitation.isPublished ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button
                    onClick={() => handleDelete(invitation.id)}
                    className="p-2 text-brown-light hover:text-red-500 transition-colors"
                    title="Hapus"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
