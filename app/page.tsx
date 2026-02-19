import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    id: 1,
    name: "Acqua Panna 1L Vetro (12bt)",
    brand: "San Pellegrino",
    price: 12.5,
    category: "Acque",
    image: "/products/acquapanna.png",
  },
  {
    id: 2,
    name: "Birra Ichnusa Non Filtrata 33cl",
    brand: "Ichnusa",
    price: 28.8,
    category: "Birre",
    image: "/products/ichnusa.jpg",
  },
  {
    id: 3,
    name: "Coca Cola Zero 33cl Lattina",
    brand: "Coca Cola",
    price: 18.0,
    category: "Bibite",
    image: "/products/cocacola.png",
  },
  {
    id: 4,
    name: "Vino Rosso Aglianico DOC",
    brand: "Cantine Locali",
    price: 45.0,
    category: "Vini",
    image: "/products/vinorosso.webp",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <Hero />
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
              Il Nostro Catalogo
            </h1>
            <p className="text-slate-500 mt-2">
              Forniture premium per il tuo locale.
            </p>
          </div>

          {/* Filtri Rapidi */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {["Tutti", "Birre", "Acque", "Vini"].map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-full border border-slate-200 text-sm font-medium hover:border-blue-600 hover:text-blue-600 whitespace-nowrap transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Griglia Responsiva */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
