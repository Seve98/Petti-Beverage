import { createClient } from "@supabase/supabase-js";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// Inizializza Supabase con Service Role
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
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

  // Usiamo "as any" sulla sessione per evitare errori di tipo profondi con Stripe
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    // ESTRAZIONE SICURA PER TYPESCRIPT
    // Se metadata o cartItems mancano, restituiamo un array vuoto stringato per il parse
    const rawCartItems = session.metadata?.cartItems || "[]";
    const items = JSON.parse(rawCartItems);

    const customerName = session.customer_details?.name;
    const customerEmail = session.customer_details?.email;
    const address = session.shipping_details?.address;

    // INSERIMENTO IN SUPABASE
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
