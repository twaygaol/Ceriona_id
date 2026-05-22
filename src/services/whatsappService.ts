interface WhatsAppPayload {
  phone: string;
  message: string;
}

export interface WhatsAppResult {
  provider: "fonnte" | "wa_link";
  status: "sent" | "failed" | "fallback_link";
  url?: string;
  response?: unknown;
}

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "").replace(/^0/, "62");
}

export async function sendWhatsAppMessage({ phone, message }: WhatsAppPayload): Promise<WhatsAppResult> {
  const normalizedPhone = normalizePhone(phone);
  const token = process.env.FONNTE_TOKEN;

  if (!token) {
    return {
      provider: "wa_link",
      status: "fallback_link",
      url: `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`,
    };
  }

  try {
    const response = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: new URLSearchParams({
        target: normalizedPhone,
        message,
      }),
    });

    const data = await response.json().catch(() => null);
    const accepted = response.ok && (!data || typeof data !== "object" || !("status" in data) || data.status === true);

    return {
      provider: "fonnte",
      status: accepted ? "sent" : "failed",
      response: data,
    };
  } catch (error) {
    return {
      provider: "fonnte",
      status: "failed",
      response: error instanceof Error ? { message: error.message } : { message: "Unknown error" },
    };
  }
}

export function buildWhatsAppMessage(template: string, values: { name: string; url?: string | null }) {
  return template
    .replaceAll("{name}", values.name)
    .replaceAll("{url}", values.url ?? "");
}

export { normalizePhone };
