"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [email, setEmail] = useState<string | null>(null);
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      const timer = window.setTimeout(() => setStatus("error"), 0);
      return () => window.clearTimeout(timer);
    }

    axios.post("/api/auth/verify-email", { token }).then(async () => {
      setStatus("success");
      const pendingAuth = localStorage.getItem("pendingAuth");
      if (!pendingAuth) return;
      const parsed = JSON.parse(pendingAuth) as { email: string; password: string; next: string };
      setEmail(parsed.email);
      const result = await signIn("credentials", {
        email: parsed.email,
        password: parsed.password,
        redirect: false,
      });
      if (!result?.error) {
        localStorage.removeItem("pendingAuth");
        window.location.href = parsed.next || "/dashboard";
      }
    }).catch(() => setStatus("error"));
  }, [token]);

  const resendVerification = async () => {
    if (!email) return;
    await axios.post("/api/auth/resend-verification", { email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-5">
      <div className="max-w-md w-full rounded-3xl bg-white p-8 text-center shadow-lg">
        <h1 className="font-serif text-3xl text-brown">Verifikasi Email</h1>
        {status === "loading" && <p className="mt-4 text-brown-light">Memverifikasi email Anda...</p>}
        {status === "success" && <p className="mt-4 text-green-700">Email berhasil diverifikasi. Sistem sedang menyiapkan login otomatis ke dashboard Anda.</p>}
        {status === "error" && <p className="mt-4 text-red-600">Link verifikasi tidak valid atau sudah digunakan.</p>}
        {status !== "loading" && email && <button onClick={resendVerification} className="mt-4 rounded-full border border-gold/20 px-4 py-2 text-xs font-semibold text-brown">Kirim Ulang Verifikasi</button>}
        <Link href="/login" className="mt-6 inline-flex rounded-full bg-brown px-6 py-3 text-sm font-semibold text-gold-light">Masuk ke Akun</Link>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-brown-light">Memverifikasi...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
