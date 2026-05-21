import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug")?.trim();
    const excludeId = searchParams.get("excludeId")?.trim();

    if (!slug) {
      return NextResponse.json({ available: false, error: "Slug wajib diisi" }, { status: 400 });
    }

    const template = await prisma.template.findFirst({
      where: {
        slug,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });

    return NextResponse.json({ available: !template });
  } catch {
    return NextResponse.json({ available: false, error: "Failed to check slug" }, { status: 500 });
  }
}
