"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      await axios.post("/api/auth/register", {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      });
      toast.success("Registrasi berhasil! Silakan login.");
      router.push("/login");
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
          <Link href="/" className="font-serif text-2xl text-brown">Kundang<span className="text-gold">an</span></Link>
          <h1 className="font-serif text-2xl text-brown mt-4">Buat Akun Baru</h1>
          <p className="text-brown-light text-sm mt-2">Mulai buat undangan digital impian Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-brown mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-sm text-brown mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-sm text-brown mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-brown text-gold-light rounded-lg hover:bg-gold hover:text-brown transition-colors disabled:opacity-50"
          >
            {isLoading ? "Memproses..." : "Daftar"}
          </button>
        </form>

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
