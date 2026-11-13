import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { prezzoEffettivo } from "@/types/product";
import { costoSpedizione } from "@/lib/spedizione";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover", // Usa una versione stabile se clover ti dà problemi
});

type ArticoloRichiesto = { id?: unknown; quantity?: unknown };

export async function POST(req: Request) {
  try {
    const { items: richiesti } = await req.json();
    if (!Array.isArray(richiesti) || richiesti.length === 0) {
      return NextResponse.json({ error: "Carrello vuoto" }, { status: 400 });
    }

    // Prezzi e nomi letti dal database, mai dal browser: il client manda solo id e quantità.
    const ids = (richiesti as ArticoloRichiesto[]).map((item) => String(item.id));
    const { data: prodotti, error } = await supabase
      .from("prodotti")
      .select("*") // "*": funziona anche prima che esista la colonna prezzo_offerta
      .in("id", ids)
      .eq("attivo", true);
    if (error) throw new Error(error.message);

    const items = (richiesti as ArticoloRichiesto[]).map((item) => {
      const prodotto = prodotti?.find((p) => p.id === String(item.id));
      if (!prodotto) throw new Error("Prodotto non disponibile");
      const quantity = Math.min(99, Math.max(1, Math.floor(Number(item.quantity) || 1)));
      return {
        name: prodotto.nome as string,
        price: prezzoEffettivo(prodotto),
        image: prodotto.immagine_url as string | null,
        quantity,
      };
    });

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
              amount: Math.round(costoSpedizione(subtotal / 100) * 100),
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
