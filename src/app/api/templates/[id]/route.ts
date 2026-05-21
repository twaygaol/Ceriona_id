import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const templateSections = [
  "opening", "hero", "quote", "countdown", "story", 
  "gallery", "event", "rsvp", "wishes", "gift", "footer"
] as const;

const updateTemplateSchema = z.object({
  name: z.string().min(3).optional(),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  description: z.string().optional().or(z.literal("")),
  category: z.enum(["wedding", "birthday", "graduation", "custom"]).optional(),
  thumbnail: z.string().url().optional().or(z.literal("")),
  previewImage: z.string().url().optional().or(z.literal("")),
  layout: z
    .object({
      sections: z.array(z.enum(templateSections)).min(1),
      featured: z.boolean().optional(),
      visualTheme: z.string().optional(),
      backgroundGradient: z
        .object({
          from: z.string().optional(),
          to: z.string().optional(),
        })
        .optional(),
      colors: z
        .object({
          primary: z.string().optional(),
          secondary: z.string().optional(),
          background: z.string().optional(),
          text: z.string().optional(),
        })
        .optional(),
      fonts: z
        .object({
          heading: z.string().optional(),
          body: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
  styles: z
    .object({
      borderRadius: z.string().optional(),
      buttonStyle: z.enum(["solid", "outline", "rounded"]).optional(),
    })
    .optional(),
  isPremium: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const includeInactive = searchParams.get("includeInactive") === "true";
    
    // Hapus orderBy jika field order tidak ada di database
    const template = await prisma.template.findUnique({
      where: { id },
      include: { components: true },  // Hapus orderBy jika error
    });

    if (!template || (!includeInactive && !template.isActive)) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Failed to fetch template" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const parsed = updateTemplateSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Data template tidak valid", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { description, thumbnail, previewImage, ...data } = parsed.data;
    
    const template = await prisma.template.update({
      where: { id },
      data: {
        ...data,
        ...(description !== undefined ? { description: description || null } : {}),
        ...(thumbnail !== undefined ? { thumbnail: thumbnail || null } : {}),
        ...(previewImage !== undefined ? { previewImage: previewImage || null } : {}),
      },
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error("PUT error:", error);
    
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json({ error: "Slug template sudah digunakan" }, { status: 409 });
    }

    return NextResponse.json({ error: "Failed to update template" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const template = await prisma.template.findUnique({
      where: { id },
      select: {
        isDefault: true,
        _count: {
          select: { invitations: true }
        }
      }
    });

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    if (template.isDefault) {
      return NextResponse.json({ error: "Cannot delete default template" }, { status: 400 });
    }

    if (template._count.invitations > 0) {
      // Soft delete - hanya nonaktifkan
      await prisma.template.update({ 
        where: { id }, 
        data: { isActive: false } 
      });
      return NextResponse.json({ message: "Template disabled (has invitations)" });
    } else {
      // Hard delete - hapus permanen
      await prisma.template.delete({ where: { id } });
      return NextResponse.json({ message: "Template deleted permanently" });
    }
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete template" }, { status: 500 });
  }
}
