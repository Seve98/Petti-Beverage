"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Tag } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ prodotto }: { prodotto: Product }) {
  const { addToCart, setIsCartOpen } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(prodotto);
    setIsCartOpen(true);
  };

  const getCleanImageUrl = (url: string | undefined) => {
    if (!url) return "/placeholder.png";
    if (!url.includes("supabase.co")) return url;
    return `${url}?width=600&height=800&resize=contain`;
  };

  const cleanImageUrl = getCleanImageUrl(prodotto.immagine_url ?? undefined);

  return (
    <Link
      href={`/products/${prodotto.slug}`}
      // h-full è fondamentale per far sì che tutte le card nella riga siano alte uguali
      className="group relative flex flex-col bg-[#111] border border-gold/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-gold/40 h-full"
    >
      {/* BADGE FORMATO */}
      {prodotto.formato && (
        <div className="absolute top-3 right-3 z-30">
          <div className="px-2 py-1 bg-black/60 backdrop-blur-md border border-gold/30 rounded-md">
            <p className="text-[10px] font-bold text-gold uppercase tracking-widest">
              {prodotto.formato}
            </p>
          </div>
        </div>
      )}

      {/* Contenitore Immagine */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1a1a1a] flex-shrink-0">
        {prodotto.immagine_url ? (
          <Image
            src={cleanImageUrl}
            alt={prodotto.nome || "prodotto petti"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            // Cambiato object-fill in object-contain per non stretchare le bottiglie
            className="object-fill transition-transform duration-700 group-hover:scale-110 object-center"
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gold/20 text-[10px] uppercase tracking-tighter">
            immagine non disponibile
          </div>
        )}
      </div>

      {/* Info Prodotto */}
      <div className="p-5 flex flex-col flex-grow">
        {/* BADGE BEST PRICE */}
        <div className="mb-3 inline-flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-full border border-gold/20 bg-gold/5">
          <Tag size={10} className="text-gold" />
          <span className="text-[9px] font-bold text-gold uppercase tracking-[0.1em]">
            best price
          </span>
        </div>

        <span className="text-[9px] text-gold/60 lowercase tracking-[0.2em] mb-1">
          {prodotto.categoria}
        </span>

        {/* Titolo - Forzato su 1 riga per mantenere l'allineamento */}
        <h3 className="text-white font-serif text-sm md:text-base font-bold normal-case line-clamp-1 h-[1.5em]">
          {prodotto.nome?.toUpperCase()}
        </h3>

        {/* Descrizione - Forzata su esattamente 2 righe con altezza minima */}
        <p className="text-gray-500 text-[11px] leading-relaxed mt-2 line-clamp-2 normal-case font-light min-h-[2.8rem]">
          {prodotto.descrizione?.toLowerCase() ||
            "scopri la selezione esclusiva petti beverage."}
        </p>

        {/* Prezzo e Bottone - Spinti sempre in fondo con mt-auto */}
        <div className="mt-auto pt-4 flex justify-between items-center border-t border-white/5">
          <span className="text-xl font-bold text-gold font-serif">
            €{Number(prodotto.prezzo || 0).toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            className="h-10 w-10 rounded-full border border-gold/20 flex items-center justify-center bg-black/40 text-gold transition-all duration-300 hover:bg-gold hover:text-black hover:cursor-pointer hover:scale-110 z-40"
            title="aggiungi al carrello"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
}
