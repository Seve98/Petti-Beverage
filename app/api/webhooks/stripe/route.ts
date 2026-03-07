export const dynamic = "force-dynamic";

import { createClient } from "@supabase/supabase-js";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// Funzione per inviare la notifica a Telegram
async function sendTelegramNotification(orderData: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return;

  const message =
    `🍾 *NUOVO ORDINE PETTI BEVERAGE*\n\n` +
    `👤 *Cliente:* ${orderData.name}\n` +
    `💰 *Totale:* €${orderData.amount.toFixed(2)}\n` +
    `📧 *Email:* ${orderData.email}\n` +
    `📍 *Indirizzo:* ${orderData.address || "Non fornito"}\n\n` +
    `🛒 _Controlla il pannello Supabase per i dettagli._`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });
  } catch (err) {
    console.error("Errore invio Telegram:", err);
  }
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const customerName = session.customer_details?.name || "Cliente";
    const customerEmail = session.customer_details?.email;
    const amount = session.amount_total / 100;
    const addressObj = session.shipping_details?.address;
    const formattedAddress = addressObj
      ? `${addressObj.line1}, ${addressObj.city}`
      : null;

    // 1. Salvataggio su Supabase
    const { error } = await supabase.from("orders").insert([
      {
        stripe_session_id: session.id,
        customer_email: customerEmail,
        customer_name: customerName,
        shipping_address: formattedAddress,
        items: JSON.parse(session.metadata?.cartItems || "[]"),
        total_amount: amount,
        currency: session.currency?.toUpperCase() || "EUR",
        status: "PAID",
      },
    ]);

    // 2. Se il salvataggio è ok, invia la notifica Telegram
    if (!error) {
      await sendTelegramNotification({
        name: customerName,
        amount: amount,
        email: customerEmail,
        address: formattedAddress,
      });
    } else {
      console.error("Errore DB:", error.message);
      return new NextResponse("DB Error", { status: 500 });
    }
  }

  return new NextResponse("OK", { status: 200 });
}
