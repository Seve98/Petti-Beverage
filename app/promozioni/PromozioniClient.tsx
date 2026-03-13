"use client";
import { useState, useEffect, useMemo } from "react";
import { endOfWeek, formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";
import ProductCard from "@/components/ProductCard";
import { getWeeklySeed, seededRandom } from "@/utils/promoLogic";
import { Product } from "@/types/product";

export default function PromozioniClient({
  allProducts,
}: {
  allProducts: Product[];
}) {
  const [timeLeft, setTimeLeft] = useState("");

  const promoProducts = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];

    const seed = getWeeklySeed();

    // 1. Definiamo le categorie che vogliamo mostrare
    const categorieTarget = [
      "whiskey",
      "rum",
      "gin",
      "champagne",
      "vodka",
      "tequila",
      "grappe",
    ];

    const selezioneFinale: Product[] = [];

    // 2. Per ogni categoria, estraiamo un prodotto in modo deterministico
    categorieTarget.forEach((cat, index) => {
      // Filtriamo i prodotti che appartengono a questa categoria
      // Nota: assicurati che cat.category nel tuo DB corrisponda (es. tutto minuscolo)
      const prodottiCategoria = allProducts.filter(
        (p) => p.categoria?.toLowerCase() === cat.toLowerCase(),
      );

      if (prodottiCategoria.length > 0) {
        // Usiamo il seed + l'indice della categoria per variare la scelta
        const randomIndex = Math.floor(
          seededRandom(seed + index) * prodottiCategoria.length,
        );
        selezioneFinale.push(prodottiCategoria[randomIndex]);
      }
    });

    return selezioneFinale;
  }, [allProducts]);

  useEffect(() => {
    const updateTimer = () => {
      const fineSettimana = endOfWeek(new Date(), { weekStartsOn: 1 });
      setTimeLeft(formatDistanceToNow(fineSettimana, { locale: it }));
    };
    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-black text-white p-8">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-gold/20 pb-6 mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-serif italic gold-gradient uppercase">
            Prodotti Stock della Settimana
          </h1>
          <p className="text-gray-400 text-xs tracking-widest uppercase mt-2">
            Un&#39;eccellenza selezionata per ogni categoria
          </p>
        </div>

        <div className="text-right bg-white/5 p-4 rounded-lg border border-gold/10 min-w-[200px]">
          <p className="text-[10px] text-gold uppercase tracking-tighter">
            Offerte valide per ancora
          </p>
          <p className="text-2xl font-mono font-bold">{timeLeft}</p>
        </div>
      </div>

      {/* Grid dinamica: si adatta al numero di categorie trovate */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {promoProducts.map((product) => (
          <div key={product.id} className="relative group">
            {/* Badge categoria sopra il prodotto */}

            <div className="absolute top-4 left-4 z-20 bg-gold text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
              -20% PROMO
            </div>
            <ProductCard prodotto={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
