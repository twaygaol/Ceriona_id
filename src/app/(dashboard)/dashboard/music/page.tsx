"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Music, Save, X } from "lucide-react";
import { toast } from "sonner";
import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface InvitationOption { id: string; title: string; brideName: string; groomName: string; musicUrl?: string | null }

export default function MusicPage() {
  const [invitations, setInvitations] = useState<InvitationOption[]>([]);
  const [selectedInvitationId, setSelectedInvitationId] = useState("");
  const [musicUrl, setMusicUrl] = useState("");

  useEffect(() => {
    async function loadInvitations() {
      const { data } = await axios.get<InvitationOption[]>("/api/invitations");
      setInvitations(data);
      if (data[0]) {
        setSelectedInvitationId(data[0].id);
        setMusicUrl(data[0].musicUrl ?? "");
      }
    }
    loadInvitations().catch(() => toast.error("Gagal memuat undangan"));
  }, []);

  const changeInvitation = (id: string) => {
    setSelectedInvitationId(id);
    setMusicUrl(invitations.find((item) => item.id === id)?.musicUrl ?? "");
  };

  const saveMusic = async () => {
    try {
      await axios.put(`/api/invitations/${selectedInvitationId}`, { musicUrl });
      toast.success("Musik berhasil disimpan");
    } catch {
      toast.error("Gagal menyimpan musik");
    }
  };

  return (
    <div className="space-y-6">
      <div><p className="text-sm uppercase tracking-[0.28em] text-brown-light">Music</p><h1 className="font-serif text-3xl text-brown">Background Music</h1><p className="mt-1 text-sm text-brown-light">Upload dan atur musik latar untuk undangan.</p></div>
      <Card className="border-gold/15 bg-white/80 backdrop-blur-xl"><CardHeader><CardTitle>Pilih Undangan</CardTitle><CardDescription>Musik tersimpan per undangan.</CardDescription></CardHeader><CardContent><select value={selectedInvitationId} onChange={(event) => changeInvitation(event.target.value)} className="input-premium">{invitations.map((invitation) => <option key={invitation.id} value={invitation.id}>{invitation.title || `${invitation.brideName} & ${invitation.groomName}`}</option>)}</select></CardContent></Card>
      <Card className="border-gold/15 bg-white/80 backdrop-blur-xl"><CardHeader><CardTitle className="flex items-center gap-2"><Music className="size-5" /> Upload Musik</CardTitle><CardDescription>File audio sampai 16MB.</CardDescription></CardHeader><CardContent className="space-y-5"><FileUpload type="music" existingUrl={musicUrl} onUploadComplete={setMusicUrl} onRemove={() => setMusicUrl("")} /><div className="flex gap-3"><Button onClick={saveMusic} className="bg-brown text-gold-light hover:bg-gold hover:text-brown"><Save className="size-4" /> Simpan Musik</Button><Button variant="outline" onClick={() => setMusicUrl("")}><X className="size-4" /> Hapus</Button></div></CardContent></Card>
    </div>
  );
}
