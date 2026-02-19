"use client";

import { Plus } from "lucide-react";
import { useCart, Product } from "@/context/CartContext"; // Importiamo il necessario
import Image from "next/image";
export default function ProductCard({ product }: { product: Product }) {
  // Estraiamo la funzione addToCart dal "cervello" del carrello
  const { addToCart } = useCart();

  return (
    <div className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Immagine */}
      <div className="relative aspect-[4/5] bg-slate-50 p-4">
        <Image
          src={product.image}
          alt={product.name}
          fill // Fa sì che l'immagine riempia il contenitore padre
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          priority={product.id <= 4} // Carica subito le prime 4 immagini per ottimizzare l'LCP
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded border border-slate-100 uppercase tracking-wider">
          {product.category}
        </span>
      </div>

      {/* Dettagli */}
      <div className="p-4">
        <p className="text-xs text-blue-600 font-bold uppercase tracking-tight">
          {product.brand}
        </p>
        <h3 className="text-slate-800 font-semibold truncate mt-1">
          {product.name}
        </h3>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-slate-400 line-through">
              €{(product.price * 1.2).toFixed(2)}
            </span>
            <span className="text-lg font-bold text-slate-900">
              €{product.price.toFixed(2)}
            </span>
          </div>

          {/* COLLEGAMELLO QUI: Aggiungiamo l'evento onClick */}
          <button
            onClick={() => addToCart(product)}
            className="bg-slate-900 text-white p-2.5 rounded-lg hover:bg-blue-600 transition-colors active:scale-95"
            aria-label="Aggiungi al carrello"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
