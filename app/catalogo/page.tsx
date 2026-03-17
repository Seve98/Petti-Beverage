"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import { getProducts } from "@/lib/api-products";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import { SlidersHorizontal, X } from "lucide-react";
import SearchBar from "@/components/Searchbar";

interface PageProps {
  searchParams: Promise<{ search?: string }>;
}

export default function CatalogoPage({ searchParams }: PageProps) {
  // 1. Unwrappa searchParams (Obbligatorio in Next.js 15+)
  const resolvedParams = use(searchParams);
  const initialSearch = resolvedParams.search || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Stato filtri
  const [filters, setFilters] = useState({
    categoria: "Tutti",
    formato: "Tutti",
    prezzo: "Tutti",
    search: initialSearch, // Inizializza con il valore della URL
  });

  // 2. Caricamento iniziale dei prodotti
  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        setProducts(data || []);
      } catch (error) {
        console.error("Errore nel caricamento prodotti:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // 3. Sincronizzazione se searchParams cambia (es. navigazione dalla Home)
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: initialSearch,
    }));
  }, [initialSearch]);

  // 4. Logica di filtro (Client-side)
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const searchTerm = filters.search.toLowerCase();

      const matchSearch =
        !searchTerm ||
        p.nome?.toLowerCase().includes(searchTerm) ||
        p.categoria?.toLowerCase().includes(searchTerm);

      const matchCategoria =
        filters.categoria === "Tutti" || p.categoria === filters.categoria;

      const matchFormato =
        filters.formato === "Tutti" || p.formato === filters.formato;

      let matchPrezzo = true;
      if (filters.prezzo === "Sotto 25€") matchPrezzo = p.prezzo < 25;
      else if (filters.prezzo === "25€ - 50€")
        matchPrezzo = p.prezzo >= 25 && p.prezzo <= 50;
      else if (filters.prezzo === "Oltre 50€") matchPrezzo = p.prezzo > 50;

      return matchSearch && matchCategoria && matchFormato && matchPrezzo;
    });
  }, [products, filters]);

  // Estrazione dinamica categorie/formati
  const categorie = useMemo(
    () => [
      "Tutti",
      ...(Array.from(new Set(products.map((p) => p.categoria))).filter(
        Boolean,
      ) as string[]),
    ],
    [products],
  );

  const formati = useMemo(
    () => [
      "Tutti",
      ...(Array.from(new Set(products.map((p) => p.formato))).filter(
        Boolean,
      ) as string[]),
    ],
    [products],
  );

  const fascePrezzo = ["Tutti", "Sotto 25€", "25€ - 50€", "Oltre 50€"];

  if (loading)
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 text-white">
        <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
        <p className="text-gold italic uppercase tracking-[0.3em] text-xs">
          Inizializzazione Cantina...
        </p>
      </div>
    );

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-serif italic gold-gradient uppercase mb-6 tracking-tighter">
            La Cantina
          </h1>
          <div className="h-px w-24 bg-gold/30 mx-auto mb-4" />
          <p className="text-gold/40 uppercase tracking-[0.4em] text-[10px] font-bold">
            Selezione esclusiva Petti Beverage
          </p>
        </header>

        {/* Pannello Filtri */}
        <div className="bg-[#0a0a0a] border border-gold/10 rounded-2xl p-6 md:p-10 mb-12 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <div className="mb-12">
            <SearchBar
              value={filters.search}
              onChange={(val) =>
                setFilters((prev) => ({ ...prev, search: val }))
              }
              placeholder="Cerca per nome, marca o tipologia..."
            />
          </div>

          <div className="flex items-center gap-3 mb-10 opacity-70">
            <SlidersHorizontal size={16} className="text-gold" />
            <h2 className="text-gold-light uppercase tracking-[0.2em] text-[10px] font-black italic">
              Affina la ricerca
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Categoria */}
            <FilterGroup
              label="Categoria"
              options={categorie}
              active={filters.categoria}
              onSelect={(val) => setFilters((f) => ({ ...f, categoria: val }))}
            />

            {/* Formato */}
            <FilterGroup
              label="Formato"
              options={formati}
              active={filters.formato}
              onSelect={(val) => setFilters((f) => ({ ...f, formato: val }))}
            />

            {/* Prezzo */}
            <FilterGroup
              label="Fascia di Prezzo"
              options={fascePrezzo}
              active={filters.prezzo}
              onSelect={(val) => setFilters((f) => ({ ...f, prezzo: val }))}
            />
          </div>

          {/* Reset button */}
          {(filters.categoria !== "Tutti" ||
            filters.formato !== "Tutti" ||
            filters.prezzo !== "Tutti" ||
            filters.search !== "") && (
            <button
              onClick={() =>
                setFilters({
                  categoria: "Tutti",
                  formato: "Tutti",
                  prezzo: "Tutti",
                  search: "",
                })
              }
              className="mt-12 text-[10px] text-gold/50 hover:text-gold uppercase tracking-[0.2em] flex items-center gap-2 transition-all duration-300"
            >
              <X size={14} /> <span>Resetta tutti i filtri</span>
            </button>
          )}
        </div>

        {/* Header Risultati */}
        <div className="mb-12 flex justify-between items-end border-b border-gold/10 pb-6">
          <p className="text-gold/40 text-[10px] uppercase tracking-[0.3em] font-medium italic">
            {filtered.length}{" "}
            {filtered.length === 1
              ? "Bottiglia selezionata"
              : "Bottiglie selezionate"}
          </p>
          {filters.search && (
            <div className="flex items-center gap-2 text-[10px] text-gold-light/60 font-serif italic">
              <span>Risultati per:</span>
              <span className="text-gold font-sans font-bold not-italic underline decoration-gold/30">
                "{filters.search}"
              </span>
            </div>
          )}
        </div>

        {/* Griglia */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
            {filtered.map((product) => (
              <ProductCard key={product.id} prodotto={product} />
            ))}
          </div>
        ) : (
          <div className="py-48 text-center border border-gold/5 rounded-3xl bg-gold/[0.01]">
            <p className="text-gold/30 italic font-serif text-2xl">
              Nessuna etichetta corrisponde alla selezione.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

// Sub-componente per pulizia codice
function FilterGroup({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: string[];
  active: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="space-y-5">
      <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`px-3 py-2 rounded text-[10px] uppercase transition-all duration-300 border ${
              active === opt
                ? "bg-gold text-black border-gold shadow-[0_0_15px_rgba(212,175,55,0.2)] font-bold scale-105"
                : "bg-transparent text-gray-500 border-white/5 hover:border-gold/30 hover:text-gold/80"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
