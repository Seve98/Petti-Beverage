import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover", // Usa una versione stabile se clover ti dà problemi
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    const subtotal = items.reduce((acc: number, item: any) => {
      return acc + Math.round(item.price * 100) * item.quantity;
    }, 0);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // 1. I LINE ITEMS (Solo dati del prodotto, senza spedizione qui!)
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),

      // 2. METADATA (Fondamentali per la tua notifica Telegram!)
      metadata: {
        cartItems: JSON.stringify(
          items.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
          })),
        ),
      },

      // 3. SPEDIZIONE GRATUITA
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: subtotal >= 15000 ? 0 : 699,
              currency: "eur",
            },
            display_name: "Spedizione Petti Beverage",
          },
        },
      ],

      mode: "payment",

      // 4. RACCOLTA INDIRIZZO (Posto corretto: a livello di sessione)
      shipping_address_collection: {
        allowed_countries: ["IT"],
      },

      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Errore Checkout:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
