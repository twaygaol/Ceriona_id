import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const templateSections = [
  "opening", "hero", "quote", "countdown", "story", 
  "gallery", "event", "rsvp", "wishes", "gift", "footer"
] as const;

const colorSchema = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/)
  .optional();

const templateSchema = z.object({
  name: z.string().min(3),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().optional().or(z.literal("")),
  category: z.enum(["wedding", "birthday", "graduation", "custom"]),
  thumbnail: z.string().url().optional().or(z.literal("")),
  previewImage: z.string().url().optional().or(z.literal("")),
  layout: z
    .object({
      sections: z.array(z.enum(templateSections)).min(1),
      featured: z.boolean().optional(),
      visualTheme: z.string().optional(),
      backgroundGradient: z
        .object({
          from: colorSchema,
          to: colorSchema,
        })
        .optional(),
      colors: z
        .object({
          primary: colorSchema,
          secondary: colorSchema,
          background: colorSchema,
          text: colorSchema,
        })
        .optional(),
      fonts: z
        .object({
          heading: z.string().optional(),
          body: z.string().optional(),
        })
        .optional(),
    })
    .default({ sections: ["hero", "event", "rsvp"] }),
  styles: z
    .object({
      borderRadius: z.string().optional(),
      buttonStyle: z.enum(["solid", "outline", "rounded"]).optional(),
    })
    .optional(),
  isPremium: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const isPremium = searchParams.get("isPremium");
    const includeInactive = searchParams.get("includeInactive") === "true";

    const where = {
      ...(includeInactive ? {} : { isActive: true }),
      ...(category ? { category } : {}),
      ...(isPremium ? { isPremium: isPremium === "true" } : {}),
    };

    const templates = await prisma.template.findMany({
      where,
      orderBy: [{ isDefault: "desc" }, { usageCount: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error("GET templates error:", error);
    return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = templateSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Data template tidak valid", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { thumbnail, previewImage, description, ...data } = parsed.data;

    // 🔧 PERBAIKAN: Bangun object secara conditional
    const createData: Prisma.TemplateCreateInput = {
      ...data,
      description: description || null,
      createdBy: session.user.id,
    };

    // Hanya tambahkan jika nilai tidak undefined/null/empty string
    if (thumbnail && thumbnail.trim() !== "") {
      createData.thumbnail = thumbnail;
    }
    
    if (previewImage && previewImage.trim() !== "") {
      createData.previewImage = previewImage;
    }

    // Layout dan styles sudah termasuk di ...data

    const template = await prisma.template.create({
      data: createData,
    });

    return NextResponse.json(template, { status: 201 });
  } catch (error) {
    console.error("POST template error:", error);
    
    // Handle unique constraint error (slug sudah digunakan)
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json({ error: "Slug template sudah digunakan" }, { status: 409 });
    }

    return NextResponse.json({ error: "Failed to create template" }, { status: 500 });
  }
}
