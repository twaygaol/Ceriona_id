import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

type EmailVerificationDelegate = {
  findUnique: (args: unknown) => Promise<{ verified: boolean } | null>;
};

const emailVerification = (prisma as unknown as Record<string, EmailVerificationDelegate>)["emailVerification"];

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("User tidak ditemukan");
        }

        try {
          const verification = await emailVerification.findUnique({
            where: { email: user.email },
            select: { verified: true },
          });

          if (verification && !verification.verified) {
            throw new Error("Email belum diverifikasi");
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "";
          if (message.includes("Email belum diverifikasi")) {
            throw error;
          }
          console.warn("Email verification table unavailable, skipping verification check.");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Password salah");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
        session.user.role = token.role ?? "user";
      }
      return session;
    },
  },
};
