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

  // 1. SELEZIONE DETERMINISTICA DEI PRODOTTI
  const promoProducts = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];

    const seed = getWeeklySeed();
    const shuffled = [...allProducts];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom(seed + i) * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, 4);
  }, [allProducts]);

  // 2. LOGICA DEL TIMER
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
      <div className="flex justify-between items-end border-b border-gold/20 pb-6 mb-12">
        <div>
          <h1 className="text-5xl font-serif italic gold-gradient uppercase">
            Offerte della Settimana
          </h1>
          <p className="text-gray-400 text-xs tracking-widest uppercase mt-2">
            Selezione automatica a tempo limitato
          </p>
        </div>

        <div className="text-right bg-white/5 p-4 rounded-lg border border-gold/10">
          <p className="text-[10px] text-gold uppercase tracking-tighter">
            Scade tra circa
          </p>
          <p className="text-2xl font-mono font-bold">{timeLeft}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {promoProducts.map((product) => (
          <div key={product.id} className="relative group">
            <div className="absolute top-4 left-4 z-20 bg-gold text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
              -20% PROMO
            </div>
            <ProductCard prodotto={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
