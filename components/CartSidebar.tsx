"use client";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; // Aggiungiamo animazioni fluide
import Image from "next/image";

export default function CartSidebar() {
  // Prendiamo lo stato globale dal Context
  const {
    cart,
    updateQuantity,
    removeFromCart,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-150"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-151 h-full w-full max-w-sm bg-black border-l border-gold/20 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-gold/20 flex justify-between items-center bg-black">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={20} className="text-gold" />
                  <h2 className="font-serif text-lg text-white uppercase tracking-widest">
                    Il tuo Carrello ({cart.length})
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-gold hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Lista Prodotti */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="text-gold/40 italic font-serif">
                      Il tuo carrello è vuoto.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 text-gold text-xs uppercase tracking-widest hover:underline"
                    >
                      Esplora la collezione
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-gold/10 pb-6 group"
                    >
                      {/* Miniatura Immagine */}
                      <div className="w-20 h-20 bg-white/5 rounded overflow-hidden shrink-0 border border-gold/5">
                        <Image
                          src={item.image || "/placeholder.png"}
                          alt={item.name}
                          width={80} // 👈 Aggiungi questo
                          height={96} // 👈 Aggiungi questo
                          className="object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Info Prodotto */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xs font-bold text-white uppercase tracking-tighter line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-gold font-mono text-sm mt-1">
                            €{item.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Controlli Quantità - Black & Gold Style */}
                          <div className="flex items-center border border-gold/30 rounded bg-transparent">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 px-2 text-gold hover:bg-gold/10 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-2 text-xs font-bold text-white w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 px-2 text-gold hover:bg-gold/10 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-600 hover:text-red-500 p-1 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer con Totale */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-gold/20 bg-black">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-400 uppercase text-[10px] tracking-widest">
                      Subtotale
                    </span>
                    <span className="text-2xl font-serif text-white">
                      €{totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-gold text-black font-bold uppercase tracking-[0.2em] text-sm hover:bg-gold-light transition-all shadow-[0_10px_20px_rgba(212,175,55,0.2)]"
                  >
                    Procedi al Checkout
                    <ArrowRight size={18} />
                  </Link>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
