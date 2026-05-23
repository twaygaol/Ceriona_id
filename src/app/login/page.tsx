"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { getSession } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-brown mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-brown mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold"
              placeholder="••••••••"
            />
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
