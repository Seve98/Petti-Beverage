import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api-products";
import Link from "next/link";

export default async function Home() {
  // Recuperiamo i prodotti più recenti
  const products = await getProducts({
    limit: 4,
    orderBy: "creato_il",
    ascending: false,
  });

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Hero />

      <section className="py-24 bg-black relative">
        {/* Decorazione di sfondo sottile */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-8 bg-gold" />
                <span className="text-gold-light font-bold uppercase tracking-[0.3em] text-[10px]">
                  Nuova Collezione
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif text-white font-bold italic">
                Ultimi Arrivi <span className="text-gold">in Magazzino</span>
              </h2>
            </div>

            <Link
              href="/catalogo"
              className="group flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-bold hover:text-white transition-all duration-300"
            >
              <p>Esplora l&#8217; intera cantina</p>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>

          {/* Griglia Prodotti: 2 colonne su mobile, 4 su desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} prodotto={product} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-500 font-serif italic text-lg">
                  Stiamo aggiornando le nostre riserve. Torna presto.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
