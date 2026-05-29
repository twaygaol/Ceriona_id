"use client";

import { Suspense, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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
    <div className="min-h-screen flex items-center justify-center bg-cream px-5">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <Link href="/" className="font-serif text-2xl text-brown">Cerio<span className="text-gold">na</span></Link>
          <h1 className="font-serif text-2xl text-brown mt-4">Masuk ke Akun</h1>
          <p className="text-brown-light text-sm mt-2">Selamat datang kembali!</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm text-brown mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="input-premium"
              placeholder="email@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-brown mb-1">Password</label>
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
            className="w-full py-3 bg-brown text-gold-light rounded-lg hover:bg-gold hover:text-brown transition-colors disabled:opacity-50"
          >
            {isLoading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="text-center text-sm text-brown-light mt-6">
          Belum punya akun?{" "}
          <Link href="/register" className="text-gold hover:text-gold-dark">
            Daftar sekarang
          </Link>
        </p>
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
