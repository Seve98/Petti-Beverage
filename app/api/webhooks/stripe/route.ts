import { createClient } from "@supabase/supabase-js";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// Inizializza Supabase (assicurati di avere le ENV caricate)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Usa la Service Role per bypassare RLS in scrittura
);

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
    const session = event.data.object;

    // Estraiamo i dati dai metadata e dalla sessione
    const items = JSON.parse(session.metadata.cartItems);
    const customerName = session.customer_details?.name;
    const customerEmail = session.customer_details?.email;
    const address = session.shipping_details?.address;

    // INSERIMENTO IN SUPABASE
    const { error } = await supabase.from("orders").insert([
      {
        stripe_session_id: session.id,
        customer_email: customerEmail,
        customer_name: customerName,
        shipping_address: address, // Salva l'intero oggetto indirizzo
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
