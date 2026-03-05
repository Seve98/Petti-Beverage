"use client";

import { useEffect, useState } from "react";
import { useCart, CartItem } from "@/context/CartContext";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, Printer, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import OrderReceipt from "@/components/checkout/OrderRecipt"; // Importiamo il nuovo componente

export default function SuccessPage() {
  const { cart, totalPrice, clearCart } = useCart();

  // Usiamo uno stato per "congelare" i dati del carrello prima che venga svuotato
  const [snapshot, setSnapshot] = useState<{
    items: CartItem[];
    total: number;
  } | null>(null);

  useEffect(() => {
    if (cart.length > 0) {
      setSnapshot({ items: [...cart], total: totalPrice });

      // Svuotiamo dopo un piccolo delay per sicurezza
      const timer = setTimeout(() => clearCart(), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden">
      {/* UI Visibile a schermo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-clay border border-gold/20 p-12 text-center print:hidden z-10"
      >
        <CheckCircle2
          size={48}
          className="text-gold mx-auto mb-6"
          strokeWidth={1.5}
        />
        <h1 className="text-4xl font-black italic uppercase gold-gradient mb-2">
          Successo
        </h1>
        <p className="font-serif italic text-gold-light/50 mb-10 text-sm">
          Il tuo ordine è stato elaborato con cura.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => window.print()}
            className="btn-custom w-full flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] h-14"
          >
            <Printer size={16} /> Scarica Riepilogo Ordine
          </button>

          <Link
            href="/"
            className="text-[9px] uppercase tracking-[0.4em] text-white/30 hover:text-gold transition-colors flex items-center justify-center gap-2 pt-4"
          >
            Continua lo shopping <ArrowRight size={12} />
          </Link>
        </div>
      </motion.div>

      {/* Componente di Stampa (Renderizzato solo se abbiamo i dati) */}
      {snapshot && (
        <OrderReceipt items={snapshot.items} total={snapshot.total} />
      )}

      {/* Background Decorativo opzionale */}
      <div className="absolute inset-0 opacity-20 pointer-events-none print:hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
