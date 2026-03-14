import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { type, attivita, piva, email, tel, messaggio } = await req.json();

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    let text = "";

    if (type === "B2B_CONTACT") {
      text =
        `🤝 **NUOVA RICHIESTA BUSINESS**\n` +
        `────────────────────\n` +
        `🏢 **Attività:** ${attivita}\n` +
        `🆔 **P.IVA:** ${piva}\n` +
        `📧 **Email:** ${email}\n` +
        `📞 **Tel:** ${tel}\n` +
        `────────────────────\n` +
        `💬 **Messaggio:**\n_${messaggio}_`;
    }

    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: "Markdown",
        }),
      },
    );

    if (!res.ok) throw new Error("Errore API Telegram");

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
