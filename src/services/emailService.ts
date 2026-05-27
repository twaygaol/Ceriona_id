interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

export interface EmailSendResult {
  delivered: boolean;
  provider: "resend" | "dev" | "smtp";
  messageId?: string;
}

async function sendViaSmtp({ to, subject, html }: SendEmailInput): Promise<EmailSendResult | null> {
  const provider = process.env.EMAIL_PROVIDER;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;

  if (provider !== "smtp" || !smtpHost || !smtpPort) {
    return null;
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: false,
    auth:
      process.env.SMTP_USER || process.env.SMTP_PASS
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
  });

  const from = process.env.EMAIL_FROM ?? "Ceriona <no-reply@ceriona.local>";
  const info = await transporter.sendMail({ from, to, subject, html });
  return { delivered: true, provider: "resend", messageId: info.messageId };
}

async function sendViaResend({ to, subject, html }: SendEmailInput): Promise<EmailSendResult | null> {
  const provider = process.env.EMAIL_PROVIDER;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "Ceriona <no-reply@ceriona.local>";

  if (provider !== "resend" || !apiKey) {
    return null;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("Resend error:", body);
      return { delivered: false, provider: "resend" };
    }

    const data = (await response.json()) as { id?: string };
    return { delivered: true, provider: "resend", messageId: data.id };
  } catch (error) {
    console.error("Resend fallback:", error);
    return { delivered: false, provider: "resend" };
  } finally {
    clearTimeout(timer);
  }
}

export async function sendEmail({ to, subject, html }: SendEmailInput): Promise<EmailSendResult> {
  try {
    const smtpResult = await sendViaSmtp({ to, subject, html });
    if (smtpResult) return smtpResult;

    const resendResult = await sendViaResend({ to, subject, html });
    if (resendResult) return resendResult;

    console.info("[DEV EMAIL]", { to, subject, html });
    return { delivered: false, provider: "resend" };
  } catch (error) {
    console.error("Email send fallback:", error);
    return { delivered: false, provider: "resend" };
  }
}

export function buildVerificationEmail(name: string | null | undefined, verificationUrl: string) {
  return {
    subject: "Verifikasi Email Akun Ceriona",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#241A16">
        <h2>Halo ${name || "Pengguna Ceriona"},</h2>
        <p>Terima kasih sudah membuat akun. Silakan verifikasi email Anda untuk melanjutkan setup undangan.</p>
        <p><a href="${verificationUrl}" style="display:inline-block;background:#241A16;color:#F6E7C8;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:600">Verifikasi Email</a></p>
        <p>Jika tombol di atas tidak berfungsi, buka link berikut:</p>
        <p>${verificationUrl}</p>
      </div>
    `,
  };
}

export function buildAccountEmail(name: string | null | undefined, email: string, username: string, temporaryPassword: string) {
  return {
    subject: "Detail Akun Dashboard Ceriona",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#241A16">
        <h2>Halo ${name || "Pengguna Ceriona"},</h2>
        <p>Akun Anda berhasil dibuat. Berikut detail login sementara:</p>
        <ul>
          <li><strong>Username:</strong> ${username}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Password Sementara:</strong> ${temporaryPassword}</li>
        </ul>
        <p>Silakan verifikasi email terlebih dahulu sebelum login.</p>
      </div>
    `,
  };
}

export function buildExistingAccountEmail(name: string | null | undefined, loginUrl: string) {
  return {
    subject: "Akun Ceriona Anda Sudah Ada",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#241A16">
        <h2>Halo ${name || "Pengguna Ceriona"},</h2>
        <p>Kami mendeteksi bahwa email ini sudah pernah terdaftar di Ceriona.</p>
        <p>Silakan lanjut login ke portal Anda melalui link berikut:</p>
        <p><a href="${loginUrl}" style="display:inline-block;background:#241A16;color:#F6E7C8;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:600">Masuk ke Dashboard</a></p>
        <p>Jika Anda belum memverifikasi email, silakan gunakan link verifikasi terbaru yang kami kirim.</p>
      </div>
    `,
  };
}
