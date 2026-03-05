"use client"; // Necessario per gestire il click e il context

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react"; // Icona più pulita
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ prodotto }: { prodotto: Product }) {
  const { addToCart, setIsCartOpen } = useCart();

  // Funzione per aggiungere al carrello senza attivare il Link della card
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Impedisce la navigazione alla pagina prodotto
    e.stopPropagation(); // Evita conflitti di eventi
    addToCart(prodotto);
    setIsCartOpen(true); // Opzionale: apre la sidebar per feedback immediato
  };

  return (
    <Link
      href={`../products/${prodotto.slug}`}
      className="group relative flex flex-col bg-[#111] border border-gold/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-gold/40"
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
      <div className="relative aspect-3/4 w-full overflow-hidden bg-[#1a1a1a]">
        {prodotto.immagine_url ? (
          <Image
            src={prodotto.immagine_url}
            alt={prodotto.nome}
            fill
            className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gold/20 text-xs">
            NO IMAGE
          </div>
        )}
      </div>

      {/* Info Prodotto */}
      <div className="p-5 flex flex-col flex-1">
        <span className="text-[9px] text-gold/60 uppercase tracking-[0.3em] mb-1">
          {prodotto.categoria}
        </span>
        <h3 className="text-white font-serif text-sm md:text-base font-bold uppercase line-clamp-2 min-h-12">
          {prodotto.nome}
        </h3>

        <div className="mt-auto pt-4 flex justify-between items-center">
          <span className="text-lg font-mono text-gold font-bold">
            €{Number(prodotto.prezzo).toFixed(2)}
          </span>

          {/* BOTTONE AGGIUNGI AL CARRELLO */}
          <button
            onClick={handleAddToCart}
            className="h-10 w-10 rounded-full border border-gold/20 flex items-center justify-center bg-black/40 text-gold transition-all duration-300 hover:bg-gold hover:text-black hover:cursor-pointer hover:scale-110 z-40"
            title="Aggiungi al carrello"
          >
            <ShoppingCart size={18} className="" />
          </button>
        </div>
      </div>
    </Link>
  );
}
