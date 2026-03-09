// app/promozioni/page.tsx (Server Component)
import PromozioniClient from "./PromozioniClient";
// Importa qui la funzione che usi per prendere i prodotti (es. da Prisma, Firebase o API)
import { getProducts } from "@/lib/api-products";

export default async function PromozioniPage() {
  const products = await getProducts(); // Recupero dati sul server

  return (
    <main className="min-h-screen py-20">
      {" "}
      {/* Spazio per la Navbar */}
      <PromozioniClient allProducts={products} />
    </main>
  );
}
