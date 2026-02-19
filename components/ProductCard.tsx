"use client";

import { Plus } from "lucide-react";
import { useCart, Product } from "@/context/CartContext";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  // Convertiamo il prezzo in numero per le operazioni grafiche (sconto e decimali)
  const numericPrice = parseFloat(product.price);

  return (
    <div className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Immagine */}
      <div className="relative aspect-[4/5] bg-slate-50 p-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          // Convertiamo l'id in numero solo per il controllo priority
          priority={parseInt(product.id) <= 4}
        />

        {/* Badge dinamici */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded border border-slate-100 uppercase tracking-wider text-slate-600">
            {product.category}
          </span>
          {product.isNew && (
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              Nuovo
            </span>
          )}
        </div>
      </div>

      {/* Dettagli */}
      <div className="p-4">
        <h3 className="text-slate-800 font-jakarta font-bold truncate">
          {product.name}
        </h3>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            {/* Mostriamo il prezzo barrato solo se è in promo */}
            {product.isPromo && (
              <span className="text-xs text-slate-400 line-through">
                €{(numericPrice * 1.2).toFixed(2)}
              </span>
            )}
            <span className="text-lg font-black text-slate-900 font-jakarta">
              €{numericPrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="bg-slate-900 text-white p-2.5 rounded-lg hover:bg-blue-600 transition-colors active:scale-95 shadow-sm"
            aria-label="Aggiungi al carrello"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
