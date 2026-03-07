export const dynamic = "force-dynamic";

import { createClient } from "@supabase/supabase-js";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// Inizializzazione con Service Role Key (Server-side solo)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

export async function POST(req: Request) {
  if (!supabase) {
    console.error(
      "Configurazione Mancante: SUPABASE_SERVICE_ROLE_KEY non trovata su Vercel.",
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
    console.error(`⚠️ Webhook Signature fallita: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Gestione dell'evento di pagamento completato
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    // Estrazione Metadati e Dettagli Cliente
    const rawCartItems = session.metadata?.cartItems || "[]";
    const items = JSON.parse(rawCartItems);

    const customerName = session.customer_details?.name || "Cliente Anonimo";
    const customerEmail = session.customer_details?.email;
    const address = session.shipping_details?.address;

    console.log(`Tentativo di salvataggio ordine per: ${customerEmail}`);

    // INSERIMENTO NEL DATABASE
    const { data, error } = await supabase.from("orders").insert([
      {
        stripe_session_id: session.id,
        customer_email: customerEmail,
        customer_name: customerName,
        // Convertiamo l'indirizzo in stringa se la colonna nel DB è TEXT
        shipping_address: address ? JSON.stringify(address) : null,
        items: items,
        total_amount: session.amount_total / 100,
        currency: session.currency?.toUpperCase() || "EUR", // <--- AGGIUNTO (Fondamentale!)
        status: "PAID",
      },
    ]);

    if (error) {
      console.error("ERRORE CRITICO SUPABASE:", error.message);
      // Restituiamo 500 così Stripe ci segnala il fallimento nei log
      return new NextResponse(`Errore Database: ${error.message}`, {
        status: 500,
      });
    }

    console.log(
      "✅ Ordine Petti Beverage registrato con successo nel Database!",
    );
  }

  return new NextResponse("OK", { status: 200 });
}
