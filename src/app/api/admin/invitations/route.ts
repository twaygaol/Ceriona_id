import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

async function assertAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { id: true, role: true } });
  return user?.role === "admin" ? user : null;
}

export async function GET(req: Request) {
  const admin = await assertAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const query = (searchParams.get("query") ?? "").trim();
  const status = searchParams.get("status") ?? "all";
  const userId = searchParams.get("userId") ?? "all";

  const invitations = await prisma.invitation.findMany({
    where: {
      ...(query
        ? {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { brideName: { contains: query, mode: "insensitive" } },
              { groomName: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(status === "all" ? {} : { isPublished: status === "published" }),
      ...(userId === "all" ? {} : { userId }),
    },
    include: {
      user: { select: { id: true, name: true, email: true } },
      template: { select: { id: true, name: true } },
      _count: { select: { guests: true, rsvps: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(invitations);
}
