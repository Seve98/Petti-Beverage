"use client";

import React, { useState, useEffect, useMemo } from "react";
import { getProducts } from "@/lib/api-products";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import { SlidersHorizontal, X } from "lucide-react";

export default function CatalogoPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Stato con tipi espliciti per evitare "undefined"
  const [filters, setFilters] = useState({
    categoria: "Tutti" as string,
    formato: "Tutti" as string,
    prezzo: "Tutti" as string,
  });

  useEffect(() => {
    async function load() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategoria =
        filters.categoria === "Tutti" || p.categoria === filters.categoria;
      const matchFormato =
        filters.formato === "Tutti" || p.formato === filters.formato;

      let matchPrezzo = true;
      if (filters.prezzo === "Sotto 25€") matchPrezzo = p.prezzo < 25;
      if (filters.prezzo === "25€ - 50€")
        matchPrezzo = p.prezzo >= 25 && p.prezzo <= 50;
      if (filters.prezzo === "Oltre 50€") matchPrezzo = p.prezzo > 50;

      return matchCategoria && matchFormato && matchPrezzo;
    });
  }, [products, filters]);

  // CORREZIONE QUI: Assicuriamo che gli array siano di tipo string[]
  const categorie: string[] = [
    "Tutti",
    ...Array.from(new Set(products.map((p) => p.categoria))).filter(
      (c): c is string => Boolean(c),
    ),
  ];

  const formati: string[] = [
    "Tutti",
    ...Array.from(new Set(products.map((p) => p.formato))).filter(
      (f): f is string => Boolean(f),
    ),
  ];

  const fascePrezzo = ["Tutti", "Sotto 25€", "25€ - 50€", "Oltre 50€"];

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gold italic uppercase tracking-widest">
        Inizializzazione Cantina...
      </div>
    );

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-serif gold-gradient uppercase mb-6 italic">
            La Cantina
          </h1>
          <p className="text-gold/40 uppercase tracking-[0.3em] text-xs">
            Selezione esclusiva Petti Beverage
          </p>
        </header>

        <div className="bg-[#0a0a0a] border border-gold/10 rounded-2xl p-6 md:p-8 mb-12 shadow-2xl">
          <div className="flex items-center gap-2 mb-8 border-b border-gold/10 pb-4">
            <SlidersHorizontal size={18} className="text-gold" />
            <h2 className="text-gold uppercase tracking-widest text-xs font-bold">
              Affina la ricerca
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Filtro Categoria */}
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 block font-bold">
                Categoria
              </label>
              <div className="flex flex-wrap gap-2">
                {categorie.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilters({ ...filters, categoria: cat })}
                    className={`px-3 py-1.5 rounded-md text-[10px] uppercase transition-all border ${
                      filters.categoria === cat
                        ? "bg-gold text-black border-gold"
                        : "bg-transparent text-gray-400 border-white/10 hover:border-gold/30"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro Formato */}
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 block font-bold">
                Formato Bottiglia
              </label>
              <div className="flex flex-wrap gap-2">
                {formati.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilters({ ...filters, formato: f })}
                    className={`px-3 py-1.5 rounded-md text-[10px] uppercase transition-all border ${
                      filters.formato === f
                        ? "bg-gold text-black border-gold"
                        : "bg-transparent text-gray-400 border-white/10 hover:border-gold/30"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro Prezzo */}
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 block font-bold">
                Fascia di Prezzo
              </label>
              <div className="flex flex-wrap gap-2">
                {fascePrezzo.map((p) => (
                  <button
                    key={p}
                    onClick={() => setFilters({ ...filters, prezzo: p })}
                    className={`px-3 py-1.5 rounded-md text-[10px] uppercase transition-all border ${
                      filters.prezzo === p
                        ? "bg-gold text-black border-gold"
                        : "bg-transparent text-gray-400 border-white/10 hover:border-gold/30"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reset Filtri */}
          {(filters.categoria !== "Tutti" ||
            filters.formato !== "Tutti" ||
            filters.prezzo !== "Tutti") && (
            <button
              onClick={() =>
                setFilters({
                  categoria: "Tutti",
                  formato: "Tutti",
                  prezzo: "Tutti",
                })
              }
              className="mt-8 text-[9px] text-gold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"
            >
              <X size={12} /> Rimuovi tutti i filtri
            </button>
          )}
        </div>

        {/* Risultati */}
        <div className="mb-10 flex justify-between items-end border-b border-gold/5 pb-4">
          <p className="text-gold/40 text-[10px] uppercase tracking-widest">
            {filtered.length} Risultati trovati
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {filtered.map((product) => (
              <ProductCard key={product.id} prodotto={product} />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center border border-gold/10 rounded-3xl bg-white/[0.02]">
            <p className="text-gold/40 italic font-serif text-xl">
              Nessun prodotto corrisponde ai criteri selezionati.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
