// app/promozioni/page.tsx (Server Component)
import PromozioniClient from "./PromozioniClient";
// Importa qui la funzione che usi per prendere i prodotti (es. da Prisma, Firebase o API)
import { getProducts } from "@/lib/api-products";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// Prodotti rigenerati al massimo ogni ora senza bisogno di rebuild
export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Promozioni della Settimana",
  description:
    "Le offerte settimanali di Petti Beverage su gin, champagne, rum, whisky e altre bevande premium. Prezzi speciali a tempo limitato.",
  path: "/promozioni",
});

export default async function PromozioniPage() {
  const products = await getProducts(); // Recupero dati sul server

  return (
    <main className="min-h-screen py-20">
      <PromozioniClient allProducts={products} />
    </main>
  );
}
