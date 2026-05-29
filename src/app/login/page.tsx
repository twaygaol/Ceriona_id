"use client";

import { Suspense, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { getSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
});

type LoginValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginValues) => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      toast.error(result.error);
    } else {
      const session = await getSession();
      const defaultRoute = session?.user?.role === "admin" ? "/admin" : "/dashboard";
      toast.success("Login berhasil!");
      router.push(searchParams.get("next") || defaultRoute);
    }
    setIsLoading(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-cream via-white to-cream px-4">
      {/* Ornament frame */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
        <div className="relative aspect-[736/1308] w-full max-w-[500px] opacity-[0.15]">
          <Image
            src="/ornament/header-11.svg"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Decorative top ornament */}
      <div className="pointer-events-none fixed left-1/2 top-8 -translate-x-1/2 select-none opacity-[0.06]">
        <svg width="240" height="28" viewBox="0 0 320 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12 C50 2 90 22 140 12 C190 2 230 22 320 12" stroke="#C9A96E" strokeWidth="1" />
          <circle cx="160" cy="12" r="3" fill="#C9A96E" />
        </svg>
      </div>

      <div className="relative w-full max-w-md">
        <div className="rounded-[2rem] border border-gold/10 bg-white/80 px-8 py-10 shadow-[0_30px_80px_-40px_rgba(74,55,40,0.3)] backdrop-blur-xl">
          {/* Brand */}
          <div className="mb-8 text-center">
            <Link href="/" className="font-serif text-3xl text-brown">
              Cerio<span className="text-gold">na</span>
            </Link>
            <h1 className="mt-6 font-serif text-2xl text-brown">Masuk ke Akun</h1>
            <p className="mt-2 text-sm text-brown-light">Selamat datang kembali!</p>
          </div>

          <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />

          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm text-brown mb-1.5">Email</label>
              <input
                type="email"
                {...register("email")}
                className="input-premium"
                placeholder="email@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm text-brown mb-1.5">Password</label>
              <input
                type="password"
                {...register("password")}
                className="input-premium"
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full overflow-hidden rounded-2xl bg-brown py-3 text-sm font-medium text-gold-light transition hover:bg-gold hover:text-brown disabled:opacity-50"
            >
              <span className="relative z-10">{isLoading ? "Memproses..." : "Masuk"}</span>
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-brown-light">
            Belum punya akun?{" "}
            <Link href="/register" className="font-medium text-gold hover:text-gold-dark transition-colors">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>

      {/* Decorative bottom ornament */}
      <div className="pointer-events-none fixed bottom-8 left-1/2 -translate-x-1/2 select-none opacity-[0.06]">
        <svg width="240" height="28" viewBox="0 0 320 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12 C50 22 90 2 140 12 C190 22 230 2 320 12" stroke="#C9A96E" strokeWidth="1" />
          <circle cx="160" cy="12" r="3" fill="#C9A96E" />
        </svg>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-brown-light">Memuat...</div>}>
      <LoginForm />
    </Suspense>
  );
}
