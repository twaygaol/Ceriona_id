import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const profileSchema = z.object({
  name: z.string().min(2).optional(),
  avatar: z.string().url().optional().or(z.literal("")),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true, email: true, name: true, avatar: true, role: true, createdAt: true } });
  return NextResponse.json(user);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = profileSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Data profil tidak valid", details: parsed.error.flatten() }, { status: 400 });
  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: { name: parsed.data.name, avatar: parsed.data.avatar || null },
    select: { id: true, email: true, name: true, avatar: true, role: true },
  });
  return NextResponse.json(user);
}
