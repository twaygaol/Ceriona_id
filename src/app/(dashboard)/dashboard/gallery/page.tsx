"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { ImageIcon, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface InvitationOption { id: string; title: string; brideName: string; groomName: string; gallery?: Array<{ url: string }> }

export default function GalleryPage() {
  const [invitations, setInvitations] = useState<InvitationOption[]>([]);
  const [selectedInvitationId, setSelectedInvitationId] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function loadInvitations() {
      const { data } = await axios.get<InvitationOption[]>("/api/invitations");
      setInvitations(data);
      if (data[0]) { setSelectedInvitationId(data[0].id); setImages(data[0].gallery?.map((item) => item.url) ?? []); }
    }
    loadInvitations().catch(() => toast.error("Gagal memuat undangan"));
  }, []);

  const changeInvitation = (id: string) => { setSelectedInvitationId(id); setImages(invitations.find((item) => item.id === id)?.gallery?.map((item) => item.url) ?? []); };
  const saveGallery = async () => { try { await axios.put(`/api/invitations/${selectedInvitationId}`, { gallery: images }); toast.success("Galeri berhasil disimpan"); } catch { toast.error("Gagal menyimpan galeri"); } };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-brown-light">Gallery</p>
        <h1 className="font-serif text-3xl text-brown">Galeri Foto</h1>
        <p className="mt-1 text-sm text-brown-light">Upload dan urutkan foto undangan.</p>
      </div>

      <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Pilih Undangan</CardTitle>
          <CardDescription>Galeri tersimpan per undangan.</CardDescription>
        </CardHeader>
        <CardContent>
          <select value={selectedInvitationId} onChange={(event) => changeInvitation(event.target.value)} className="input-premium">
            {invitations.map((invitation) => (
              <option key={invitation.id} value={invitation.id}>
                {invitation.title || `${invitation.brideName} & ${invitation.groomName}`}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ImageIcon className="size-5" /> Upload Foto</CardTitle>
          <CardDescription>Tambahkan foto prewedding atau momen acara.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <FileUpload type="image" onUploadComplete={(url) => setImages((current) => [...current, url])} />
          
          {images.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {images.map((image) => (
                <div key={image} className="group relative aspect-square overflow-hidden rounded-3xl border border-gold/15 bg-white">
                  <Image src={image} alt="Galeri" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => setImages((current) => current.filter((item) => item !== image))}
                    className="absolute right-3 top-3 rounded-full bg-red-500 p-2 text-white opacity-0 transition group-hover:opacity-100"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-gold/20 p-12 text-center text-brown-light">
              <p>Belum ada foto. Upload gambar untuk ditampilkan di undangan.</p>
            </div>
          )}

          <Button onClick={saveGallery} className="bg-brown text-gold-light hover:bg-gold hover:text-brown">
            <Save className="size-4" /> Simpan Galeri
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
