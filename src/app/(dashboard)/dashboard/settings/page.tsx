"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Save, Settings, UserCircle } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TitleSkeleton, CardSkeleton } from "@/components/ui/dashboard-skeleton";

interface Profile { id: string; email: string; name?: string | null; avatar?: string | null; role?: string; createdAt?: string }

const profileSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  avatar: z.string().optional(),
});

type ProfileValues = z.input<typeof profileSchema>;

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    async function loadProfile() {
      const { data } = await axios.get<Profile>("/api/settings/profile");
      setProfile(data);
      reset({ name: data.name ?? "", avatar: data.avatar ?? "" });
    }
    loadProfile().catch(() => toast.error("Gagal memuat profil")).finally(() => setIsLoading(false));
  }, [reset]);

  if (isLoading) return <SettingsSkeleton />;

  function SettingsSkeleton() {
    return <div className="space-y-6"><TitleSkeleton /><div className="grid gap-6 xl:grid-cols-[1fr_360px]"><CardSkeleton /><CardSkeleton /></div></div>;
  }

  const onSubmit = async (values: ProfileValues) => {
    setSaving(true);
    try {
      const { data } = await axios.put<Profile>("/api/settings/profile", values);
      setProfile(data);
      toast.success("Profil berhasil disimpan");
    } catch {
      toast.error("Gagal menyimpan profil");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-brown-light">Settings</p>
        <h1 className="font-serif text-3xl text-brown">Pengaturan</h1>
        <p className="mt-1 text-sm text-brown-light">Kelola profil, preferensi akun, dan keamanan dasar.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UserCircle className="size-5" /> Profil</CardTitle>
            <CardDescription>Informasi ini digunakan di dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-brown">Nama</span>
                <input {...register("name")} className="input-premium" />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-brown">Avatar URL</span>
                <input {...register("avatar")} className="input-premium" placeholder="https://..." />
                {errors.avatar && <p className="text-xs text-red-500">{errors.avatar.message}</p>}
              </label>
              <Button type="submit" disabled={saving} className="bg-brown text-gold-light hover:bg-gold hover:text-brown">
                <Save className="size-4" /> {saving ? "Menyimpan..." : "Simpan Profil"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Settings className="size-5" /> Akun</CardTitle>
            <CardDescription>Ringkasan akun aktif.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-brown-light">
            <p><span className="font-medium text-brown">Email:</span> {profile?.email ?? "-"}</p>
            <p><span className="font-medium text-brown">Role:</span> <span className="rounded-full bg-gold/15 px-2 py-1 text-gold-dark">{profile?.role ?? "user"}</span></p>
            <p><span className="font-medium text-brown">User ID:</span> {profile?.id ?? "-"}</p>
            <p><span className="font-medium text-brown">Dibuat:</span> {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("id-ID") : "-"}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
