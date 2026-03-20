"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Tag, Plus } from "lucide-react";
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
    return `${url}?width=400&height=600&resize=contain`; // Ridotto per performance mobile
  };

  const cleanImageUrl = getCleanImageUrl(prodotto.immagine_url ?? undefined);

  return (
    <Link
      href={`/products/${prodotto.slug}`}
      className="group relative flex flex-col bg-[#0a0a0a] border border-gold/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-gold/30 h-full"
    >
      {/* BADGE FORMATO - Più piccolo su mobile */}
      {prodotto.formato && (
        <div className="absolute top-2 right-2 z-30">
          <div className="px-1.5 py-0.5 bg-black/60 backdrop-blur-md border border-gold/20 rounded-md">
            <p className="text-[8px] md:text-[10px] font-bold text-gold uppercase tracking-tighter md:tracking-widest">
              {prodotto.formato}
            </p>
          </div>
        </div>
      )}

      {/* Contenitore Immagine - Padding aggiunto per non far toccare i bordi alla bottiglia */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#111] flex-shrink-0 p-3 md:p-6">
        {prodotto.immagine_url ? (
          <Image
            src={cleanImageUrl}
            alt={prodotto.nome || "prodotto petti"}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            // IMPORTANTE: object-contain evita lo stretch delle bottiglie
            className="object-fill transition-transform duration-1000 group-hover:scale-110"
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gold/20 text-[8px] uppercase">
            n/a
          </div>
        )}
      </div>

      {/* Info Prodotto - Padding ridotto su mobile (p-3) */}
      <div className="p-3 md:p-5 flex flex-col flex-grow bg-gradient-to-b from-[#0a0a0a] to-black">
        {/* BADGE BEST PRICE - Più sottile */}
        <div className="mb-2 inline-flex items-center gap-1 w-fit px-2 py-0.5 rounded-full border border-gold/10 bg-gold/5">
          <Tag size={8} className="text-gold" />
          <span className="text-[7px] md:text-[9px] font-bold text-gold uppercase tracking-widest">
            best price
          </span>
        </div>

        <span className="text-[8px] md:text-[9px] text-gold/40 lowercase tracking-widest mb-1">
          {prodotto.categoria}
        </span>

        {/* Titolo - Line-clamp 2 per evitare buchi bianchi se il nome è lungo */}
        <h3 className="text-white font-serif text-[11px] md:text-base font-bold leading-tight line-clamp-2 h-[2.4em] md:h-[2.8em] uppercase tracking-wide">
          {prodotto.nome}
        </h3>

        {/* Descrizione - Nascondiamola o riduciamola molto su mobile per pulizia */}
        <p className="hidden md:line-clamp-2 text-gray-500 text-[11px] leading-relaxed mt-2 font-light min-h-[2.8rem]">
          {prodotto.descrizione || "Selezione esclusiva Petti Beverage."}
        </p>

        {/* Prezzo e Bottone - Border-t rimosso su mobile per un look più "seamless" */}
        <div className="mt-auto pt-3 flex justify-between items-center md:border-t md:border-white/5">
          <div className="flex flex-col">
            <span className="text-sm md:text-xl font-bold text-gold font-serif">
              €{Number(prodotto.prezzo || 0).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="h-8 w-8 md:h-10 md:w-10 rounded-full border border-gold/20 flex items-center justify-center bg-gold/5 text-gold transition-all duration-300 hover:bg-gold hover:text-black hover:scale-110 z-40"
          >
            <Plus size={16} className="md:hidden" />
            <ShoppingCart size={18} className="hidden md:block" />
          </button>
        </div>
      </div>
    </Link>
  );
}
