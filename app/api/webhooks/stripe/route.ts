export const dynamic = "force-dynamic"; // Forza Next.js a non pre-renderizzare questa rotta

import { createClient } from "@supabase/supabase-js";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// Inizializzazione sicura: evita il crash se le chiavi mancano durante il build
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

export async function POST(req: Request) {
  // Verifica se Supabase è stato inizializzato correttamente
  if (!supabase) {
    console.error(
      "Ambiente non configurato: Supabase URL o Service Key mancanti.",
    );
    return new NextResponse("Configuration Error", { status: 500 });
  }

  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("Stripe-Signature") as string;
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

    const rawCartItems = session.metadata?.cartItems || "[]";
    const items = JSON.parse(rawCartItems);

    const customerName = session.customer_details?.name;
    const customerEmail = session.customer_details?.email;
    const address = session.shipping_details?.address;

    const { error } = await supabase.from("orders").insert([
      {
        stripe_session_id: session.id,
        customer_email: customerEmail,
        customer_name: customerName,
        shipping_address: address,
        items: items,
        total_amount: session.amount_total / 100,
        status: "PAID",
      },
    ]);

    if (error) {
      console.error("Errore salvataggio Supabase:", error.message);
      return new NextResponse("DB Error", { status: 500 });
    }

    console.log("Ordine Petti Beverage registrato con successo!");
  }

  return new NextResponse("OK", { status: 200 });
}
