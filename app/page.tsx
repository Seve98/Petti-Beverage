import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";
import Link from "next/link";

export default function Home() {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  return (
    <main className="min-h-screen bg-slate-100">
      <Hero />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
                Novità
              </span>
              <h2 className="text-4xl font-jakarta font-black mt-2">
                Ultimi Arrivi in Magazzino
              </h2>
            </div>
            <Link
              href="/catalogo"
              className="text-blue-600 font-bold hover:underline"
            >
              Vedi tutto →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
