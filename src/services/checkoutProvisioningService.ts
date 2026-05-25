import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { buildAccountEmail, buildVerificationEmail, sendEmail } from "@/services/emailService";
import { getTemplateTheme } from "@/services/templateThemeService";

type CheckoutSessionDelegate = {
  findFirst: (args: unknown) => Promise<{ id: string; themeKey: string; groomName: string; brideName: string; plan: string; email: string; phone: string; status: string; userId?: string | null; note?: string | null } | null>;
  update: (args: unknown) => Promise<unknown>;
};

type EmailVerificationDelegate = {
  create: (args: unknown) => Promise<unknown>;
  findFirst: (args: unknown) => Promise<{ id: string } | null>;
  update: (args: unknown) => Promise<unknown>;
};

const checkoutSession = (prisma as unknown as Record<string, CheckoutSessionDelegate>)["checkoutSession"];
const emailVerification = (prisma as unknown as Record<string, EmailVerificationDelegate>)["emailVerification"];

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

async function getOrCreateTemplateByTheme(themeKey: string) {
  const existing = await prisma.template.findFirst({
    where: { isActive: true, layout: { path: ["visualTheme"], equals: themeKey } } as never,
  });

  if (existing) return existing;

  const theme = getTemplateTheme(themeKey);
  return prisma.template.create({
    data: {
      name: theme.label,
      slug: `${slugify(theme.key)}-${Math.random().toString(36).slice(2, 7)}`,
      description: theme.description,
      category: theme.values.category,
      layout: {
        visualTheme: theme.key,
        sections: theme.sections,
        colors: {
          primary: theme.values.primaryColor,
          secondary: theme.values.secondaryColor,
          background: theme.values.backgroundColor,
          text: theme.values.textColor,
        },
        backgroundGradient: {
          from: theme.values.gradientFrom,
          to: theme.values.gradientTo,
        },
        fonts: {
          heading: theme.values.headingFont,
          body: theme.values.bodyFont,
        },
      },
      styles: {
        borderRadius: theme.values.borderRadius,
        buttonStyle: theme.values.buttonStyle,
      },
      isPremium: theme.values.isPremium,
      isActive: true,
      isDefault: false,
      usageCount: 0,
      createdBy: null,
    },
  });
}

export async function provisionAccountAndInvitationFromCheckout(checkoutSessionId: string) {
  const session = await checkoutSession.findFirst({ where: { id: checkoutSessionId } });
  if (!session) throw new Error("Checkout session not found");

  let user = await prisma.user.findUnique({ where: { email: session.email } });
  let temporaryPassword: string | null = null;
  let verificationUrl: string | null = null;
  const notePayload = (() => {
    try {
      return session.note ? (JSON.parse(session.note) as { temporaryPassword?: string; token?: string }) : null;
    } catch {
      return null;
    }
  })();

  if (!user) {
    temporaryPassword = Math.random().toString(36).slice(-10) + "A1!";
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);
    const userCount = await prisma.user.count();
    user = await prisma.user.create({
      data: {
        name: `${session.groomName} & ${session.brideName}`,
        email: session.email,
        password: hashedPassword,
        role: userCount === 0 ? "admin" : "user",
      },
    });

    const token = randomUUID();
    await emailVerification.create({ data: { email: session.email, token, verified: false } });
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    verificationUrl = `${appUrl}/verify-email?token=${token}`;

    const verificationEmail = buildVerificationEmail(user.name, verificationUrl);
    const accountEmail = buildAccountEmail(user.name, user.email, user.email.split("@")[0], temporaryPassword);
    await Promise.all([
      sendEmail({ to: user.email, subject: verificationEmail.subject, html: verificationEmail.html }),
      sendEmail({ to: user.email, subject: accountEmail.subject, html: accountEmail.html }),
    ]);
  } else if (notePayload?.temporaryPassword && notePayload?.token) {
    temporaryPassword = notePayload.temporaryPassword;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    verificationUrl = `${appUrl}/verify-email?token=${notePayload.token}`;
    const verificationEmail = buildVerificationEmail(user.name, verificationUrl);
    const accountEmail = buildAccountEmail(user.name, user.email, user.email.split("@")[0], temporaryPassword);
    await Promise.all([
      sendEmail({ to: user.email, subject: verificationEmail.subject, html: verificationEmail.html }),
      sendEmail({ to: user.email, subject: accountEmail.subject, html: accountEmail.html }),
    ]);
  }

  const template = await getOrCreateTemplateByTheme(session.themeKey);

  const existingInvitation = await prisma.invitation.findFirst({
    where: {
      userId: user.id,
      title: `Wedding ${session.groomName} & ${session.brideName}`,
    },
    select: { id: true },
  });

  const invitation = existingInvitation
    ? await prisma.invitation.findUnique({ where: { id: existingInvitation.id } })
    : await prisma.invitation.create({
        data: {
          slug: `${slugify(`${session.groomName}-${session.brideName}`)}-${Math.random().toString(36).slice(2, 7)}`,
          title: `Wedding ${session.groomName} & ${session.brideName}`,
          brideName: session.brideName,
          groomName: session.groomName,
          templateId: template.id,
          eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          eventTime: "10:00",
          eventLocation: "Segera diisi oleh user",
          userId: user.id,
          isPublished: false,
        },
      });

  await checkoutSession.update({ where: { id: session.id }, data: { userId: user.id, status: "completed" } });

  return { user, invitation, temporaryPassword, verificationUrl };
}
