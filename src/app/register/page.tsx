"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
});

type RegisterValues = z.infer<typeof registerSchema>;

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationUrl, setVerificationUrl] = useState<string | null>(null);
  const [accountInfo, setAccountInfo] = useState<{ username: string; email: string; temporaryPassword: string } | null>(null);
  const [emailDelivery, setEmailDelivery] = useState<{ verification?: { delivered?: boolean; provider?: string }; account?: { delivered?: boolean; provider?: string } } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterValues) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/auth/register", data);
      setVerificationUrl(response.data.verificationUrl ?? null);
      setAccountInfo(response.data.account ?? null);
      setEmailDelivery(response.data.emailDelivery ?? null);

      if (response.data.account) {
        localStorage.setItem(
          "pendingAuth",
          JSON.stringify({
            email: response.data.account.email,
            password: response.data.account.temporaryPassword,
            next: searchParams.get("next") || "/dashboard",
          })
        );
      }

      toast.success("Registrasi berhasil! Verifikasi email dulu untuk lanjut ke dashboard.");
    } catch (error) {
      const message =
        error instanceof AxiosError && typeof error.response?.data?.error === "string"
          ? error.response.data.error
          : "Registrasi gagal";
      toast.error(message);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-5">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <Link href="/" className="font-serif text-2xl text-brown">Cerio<span className="text-gold">na</span></Link>
          <h1 className="font-serif text-2xl text-brown mt-4">Buat Akun Baru</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm text-brown mb-1">Nama Lengkap</label>
            <input
              type="text"
              {...register("name")}
              className="input-premium"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-brown mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="input-premium"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-brown text-gold-light rounded-lg hover:bg-gold hover:text-brown transition-colors disabled:opacity-50"
          >
            {isLoading ? "Memproses..." : "Daftar"}
          </button>
        </form>

        <p className="mt-4 text-xs">Akun anda sementara akan dikirim lewat verifikasi email setelah registrasi berhasil.</p>

        {verificationUrl && (
          <div className="mt-6 rounded-2xl border border-gold/20 bg-cream p-4 text-sm text-brown-light">
            <p className="font-medium text-brown">Verifikasi email terlebih dahulu</p>
            {accountInfo && (
              <div className="mt-4 rounded-xl bg-white p-3 text-left">
                <p className="font-medium text-brown">Detail akun sementara</p>
                <p className="mt-2 text-xs">Username: <span className="font-medium text-brown">{accountInfo.username}</span></p>
                <p className="mt-1 text-xs">Email login: <span className="font-medium text-brown">{accountInfo.email}</span></p>
                <p className="mt-1 text-xs">Password sementara: <span className="font-medium text-brown">{accountInfo.temporaryPassword}</span></p>
              </div>
            )}
            {emailDelivery && (
              <div className="mt-4 rounded-xl border border-gold/15 bg-white p-3 text-left text-xs text-brown-light">
                <p>Email verifikasi: {emailDelivery.verification?.delivered ? `terkirim via ${emailDelivery.verification.provider}` : "mode dev / belum terkirim"}</p>
                <p className="mt-1">Email detail akun: {emailDelivery.account?.delivered ? `terkirim via ${emailDelivery.account.provider}` : "mode dev / belum terkirim"}</p>
              </div>
            )}
            {emailDelivery?.verification?.delivered ? (
              <p className="mt-4 text-xs text-brown-light">Silakan buka inbox email Anda untuk verifikasi akun dan lanjut ke dashboard.</p>
            ) : (
              <>
                <p className="mt-2 break-all">Link verifikasi: <a className="text-gold underline" href={verificationUrl}>{verificationUrl}</a></p>
                <button onClick={() => router.push(verificationUrl)} className="mt-4 rounded-full bg-brown px-4 py-2 text-xs font-semibold text-gold-light">Buka Link Verifikasi</button>
              </>
            )}
          </div>
        )}

        <p className="text-center text-sm text-brown-light mt-6">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-gold hover:text-gold-dark">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-brown-light">Memuat...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
