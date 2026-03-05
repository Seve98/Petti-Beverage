"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  Truck,
  ChevronLeft,
  Loader2,
  ShieldCheck,
  AlertCircle,
  Lock,
} from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shipping = 0;
  const finalTotal = totalPrice;

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(
          data.error || "Errore durante la creazione della sessione",
        );
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("URL di pagamento non ricevuto dal server.");
      }
    } catch (err: any) {
      console.error("CHECKOUT_ERROR:", err);
      setError(err.message || "Si è verificato un errore imprevisto.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-12 font-sans text-white">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-12 gap-12">
        {/* Colonna Sinistra: Form */}
        <div className="lg:col-span-7 space-y-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-gold/60 hover:text-gold transition-colors uppercase tracking-widest text-xs font-bold"
          >
            <ChevronLeft size={16} /> Torna alla Selezione
          </Link>

          <div className="border border-gold/20 bg-clay p-8 rounded-sm">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter gold-gradient mb-8 flex items-center gap-3">
              <Truck className="text-gold" /> Spedizione Premium
            </h2>

            {error && (
              <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-sm mb-6 flex items-center gap-3 text-red-200 text-sm">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gold/70 font-bold">
                  Nome e Cognome
                </label>
                <input
                  type="text"
                  placeholder="Enea Petti"
                  className="input-petti w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gold/70 font-bold">
                  Email di Contatto
                </label>
                <input
                  type="email"
                  placeholder="enea@petti.it"
                  className="input-petti w-full"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gold/70 font-bold">
                  Indirizzo di Consegna
                </label>
                <input
                  type="text"
                  placeholder="Via dell'Eccellenza 1, Milano (MI)"
                  className="input-petti w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Colonna Destra: Riepilogo */}
        <div className="lg:col-span-5">
          <div className="border-t-2 border-gold bg-clay shadow-2xl sticky top-32">
            <div className="p-8">
              <h2 className="text-xl font-serif italic text-gold-light border-b border-gold/10 pb-4 mb-6 uppercase tracking-widest">
                Il Tuo Ordine
              </h2>

              <div className="max-h-64 overflow-y-auto space-y-6 mb-8 pr-2">
                {cart.length === 0 ? (
                  <p className="text-center text-white/40 py-4 italic font-serif">
                    Il carrello è vuoto
                  </p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center group"
                    >
                      <div className="flex-1">
                        <p className="font-bold text-sm text-white uppercase tracking-tight group-hover:text-gold transition-colors">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-white/40 uppercase">
                          Quantità: {item.quantity}
                        </p>
                      </div>
                      <span className="font-serif text-gold-light">
                        €{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-4 border-t border-gold/10 pt-6">
                <div className="flex justify-between text-xs uppercase tracking-widest text-white/60">
                  <span>Subtotale</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs uppercase tracking-widest text-white/60">
                  <span>Spedizione</span>
                  <span className="text-gold font-bold underline decoration-gold/30">
                    GRATUITA
                  </span>
                </div>

                <div className="flex justify-between items-end pt-4">
                  <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold/50">
                    Totale Investimento
                  </span>
                  <span className="text-4xl font-black italic gold-gradient tracking-tighter">
                    €{finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-10">
                <button
                  disabled={isProcessing || cart.length === 0}
                  onClick={handlePayment}
                  className="btn-custom w-full flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs h-14"
                >
                  {isProcessing ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <Lock size={16} /> Conferma e Paga con Stripe
                    </>
                  )}
                </button>
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 opacity-40">
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-bold text-gold-light">
                  <ShieldCheck size={12} /> Secure encrypted transaction
                </div>
                <p className="text-[8px] uppercase tracking-[0.4em] text-center">
                  Petti Beverage &copy; 2026 <br />
                  All rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
