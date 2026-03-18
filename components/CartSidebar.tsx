"use client";
import React from "react";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

// 1. Definiamo l'interfaccia per le Props
interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  // Se non è aperto, non renderizziamo nulla per performance
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Overlay scuro */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-[#0a0a0a] border-l border-gold/10 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-6 border-b border-gold/10 flex items-center justify-between">
            <h2 className="text-xl font-serif italic text-gold flex items-center gap-2">
              <ShoppingBag size={20} /> Il Tuo Ordine
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gold transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Lista Prodotti */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 italic">Il carrello è vuoto.</p>
                <button
                  onClick={onClose}
                  className="mt-4 text-gold text-xs uppercase tracking-widest border-b border-gold/20 pb-1"
                >
                  Torna allo shop
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="relative h-20 w-20 bg-white/5 rounded-lg overflow-hidden border border-white/10">
                    <Image
                      src={item.image || "/placeholder-bottle.png"}
                      alt={item.name}
                      fill
                      className="object-cover object-center scale-100"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gold/60 mb-2">
                      {item.price.toFixed(2)}€
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border text-white border-white/10 rounded-md">
                        {/* Pulsante MENO */}
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQuantity(item.id, -1); // <-- Passa solo -1
                            }
                          }}
                          className="p-1 hover:text-gold transition-colors"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="text-xs w-6 text-center">
                          {item.quantity}
                        </span>

                        {/* Pulsante PIÙ */}
                        <button
                          onClick={() => updateQuantity(item.id, 1)} // <-- Passa solo 1
                          className="p-1 hover:text-gold transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-600 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer con Totale e Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gold/10 bg-black/50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 uppercase text-[10px] tracking-widest font-bold">
                  Totale parziale
                </span>
                <span className="text-xl font-serif text-gold">
                  {totalPrice.toFixed(2)}€
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full bg-gold text-black text-center py-4 rounded-xl font-bold uppercase text-xs tracking-[0.2em] hover:bg-white transition-all duration-500"
              >
                Procedi al pagamento
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
