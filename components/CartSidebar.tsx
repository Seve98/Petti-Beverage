"use client";
import { X, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  // Estraiamo tutto ciò che ci serve dal nostro Context
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Pannello */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center bg-slate-50">
            <h2 className="font-bold text-lg text-slate-800">
              Il tuo Carrello ({cart.length})
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Lista Prodotti */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <p className="text-sm text-gray-500">
                  Il tuo carrello è vuoto.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 text-blue-600 font-semibold text-sm hover:underline"
                >
                  Inizia gli acquisti
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-slate-100 pb-4"
                >
                  {/* Miniatura Immagine */}
                  <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info Prodotto */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-blue-600 font-bold text-sm">
                        €{item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Controlli Quantità */}
                      <div className="flex items-center border border-slate-200 rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-slate-50 text-slate-500"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 text-xs font-bold w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-slate-50 text-slate-500"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Tasto Rimuovi */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 p-1 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer con Totale */}
          {cart.length > 0 && (
            <div className="p-6 border-t bg-slate-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-600 font-medium">
                  Totale stimato:
                </span>
                <span className="text-2xl font-black text-slate-900">
                  €{totalPrice.toFixed(2)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={onClose} // CHIUDE la sidebar al click
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg transition-all ${
                  cart.length > 0
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                Vai al Checkout
                <ArrowRight size={20} />
              </Link>
              <p className="text-[10px] text-slate-400 text-center mt-3">
                IVA inclusa • Spedizione calcolata al checkout
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
