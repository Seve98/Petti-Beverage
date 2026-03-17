import ProductCarousel from "@/components/CarouselProduct";
import Hero from "@/components/Hero";
import HomeSearchBar from "@/components/HomeSearchBar";
import ProductCard from "@/components/ProductCard";
import PromoBanner from "@/components/PromoBanner";
import { getProducts } from "@/lib/api-products";
import Link from "next/link";

export default async function Home() {
  const products = await getProducts({
    limit: 10,
    orderBy: "creato_il",
    ascending: false,
  });

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <div className="mt-10">
        <PromoBanner />
      </div>
      <Hero />

      {/* --- BANNER DI LANCIO FAKE (Solo Estetico) --- */}

      {/* --- SEZIONE RICERCA DEDICATA --- */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-2">
              <h3 className="text-gold-light font-serif italic text-2xl md:text-3xl">
                Trova la Bottiglia ideale
              </h3>
              <p className="text-gray-500 text-[15px] uppercase tracking-[0.4em]">
                Ricerca tra le etichette più prestigiose della nostra cantina
              </p>
            </div>

            <div className="w-full max-w-xl mt-10">
              <HomeSearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* --- SEZIONE ULTIMI ARRIVI --- */}
      <section className="py-24 bg-black relative">
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
              <p>Esplora l&#8217;intera cantina</p>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>

          {products && products.length > 0 ? (
            <ProductCarousel products={products} />
          ) : (
            <p className="text-gray-500 italic">In aggiornamento...</p>
          )}
        </div>
      </section>
    </main>
  );
}
