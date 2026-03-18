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

  const itemsList =
    orderData.items && orderData.items.length > 0
      ? orderData.items
          .map((item: any) => `📦 ${item.quantity}x *${item.name}*`)
          .join("\n")
      : "Dettagli prodotti non disponibili";

  const message =
    `🍾 *NUOVO ORDINE PETTI BEVERAGE*\n` +
    `────────────────────\n` +
    `👤 *Cliente:* ${orderData.name}\n` +
    `💰 *Totale:* €${orderData.amount.toFixed(2)}\n` +
    `📧 *Email:* ${orderData.email}\n` +
    `📍 *Indirizzo di Spedizione:*\n${orderData.address || "Non fornito"}\n\n` +
    `🛒 *PRODOTTI ACQUISTATI:*\n${itemsList}\n` +
    `────────────────────\n` +
    `✅ _Ordine confermato e pagato_`;

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

  // 1. Validazione dell'evento Stripe
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error(`Webhook Signature Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // 2. Gestione dell'evento di pagamento completato
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const shipping = session.shipping_details;
    const addressObj = shipping?.address;

    // Oggetto completo per il campo JSONB di Supabase
    const fullShippingAddress = shipping
      ? {
          name: shipping.name,
          line1: addressObj?.line1,
          line2: addressObj?.line2,
          city: addressObj?.city,
          state: addressObj?.state,
          postal_code: addressObj?.postal_code,
          country: addressObj?.country,
        }
      : null;

    // Stringa formattata per la leggibilità su Telegram
    const telegramAddress = shipping
      ? `${shipping.name}\n${addressObj?.line1}${addressObj?.line2 ? " " + addressObj.line2 : ""}\n${addressObj?.postal_code} ${addressObj?.city} (${addressObj?.state})`
      : "Indirizzo non fornito";

    const customerEmail = session.customer_details?.email;
    const amount = session.amount_total / 100;

    // Parsing sicuro dei metadati del carrello
    let cartItems = [];
    try {
      cartItems = JSON.parse(session.metadata?.cartItems || "[]");
    } catch (e) {
      console.error("Errore parsing cartItems:", e);
    }

    // Salvataggio nel database
    const { error } = await supabase.from("orders").insert([
      {
        stripe_session_id: session.id,
        customer_email: customerEmail,
        customer_name:
          shipping?.name || session.customer_details?.name || "Cliente",
        shipping_address: fullShippingAddress,
        items: cartItems,
        total_amount: amount,
        currency: session.currency?.toUpperCase() || "EUR",
        status: "PAID",
      },
    ]);

    if (!error) {
      // Invio notifica solo se il salvataggio DB è riuscito
      await sendTelegramNotification({
        name: shipping?.name || session.customer_details?.name || "Cliente",
        amount: amount,
        email: customerEmail,
        address: telegramAddress,
        items: cartItems,
      });
      return new NextResponse("Successo", { status: 200 });
    } else {
      console.error("Errore salvataggio Supabase:", error.message);
      // Rispondiamo 500 così Stripe riproverà l'invio tra poco
      return new NextResponse("Errore Database", { status: 500 });
    }
  }

  // 3. Risposta di default per eventi che non ci interessano (es. session.expired)
  return new NextResponse("Evento ricevuto", { status: 200 });
}
