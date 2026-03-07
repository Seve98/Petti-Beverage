import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "Manca la STRIPE_SECRET_KEY nelle variabili d'ambiente (.env)",
  );
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-02-25.clover", // Usa l'ultima versione stabile disponibile nel 2026
  typescript: true,
});
