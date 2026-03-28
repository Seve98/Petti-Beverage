  "use client";

  import { useState } from "react";
  import { useCart } from "@/context/CartContext";
  import {
    ChevronLeft,
    Loader2,
    ShieldCheck,
    AlertCircle,
    Lock,
    Truck,
  } from "lucide-react";
  import Link from "next/link";

  export default function CheckoutPage() {
    const { cart, totalPrice } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // LOGICA SPEDIZIONI
    const sogliaGratis = 150;
    const costoSpedizione = 6.99;
    const isSpedizioneGratis = totalPrice >= sogliaGratis;
    const shippingCost = isSpedizioneGratis ? 0 : costoSpedizione;
    const finalTotal = totalPrice + shippingCost;

    const handlePayment = async () => {
      if (cart.length === 0) return;
      setIsProcessing(true);
      setError(null);

      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // Passiamo totalPrice o la logica di spedizione al backend
          body: JSON.stringify({ items: cart }),
        });

        const data = await res.json();
        if (!res.ok || data.error)
          throw new Error(data.error || "Errore di connessione");
        if (data.url) window.location.href = data.url;
      } catch (err: any) {
        setError(err.message);
        setIsProcessing(false);
      }
    };

    return (
      <div className="min-h-screen bg-black pt-32 pb-12 font-sans text-white">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gold/60 hover:text-gold transition-colors uppercase tracking-widest text-xs font-bold mb-8"
          >
            <ChevronLeft size={16} /> Torna allo Store
          </Link>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Parte Sinistra */}
            <div className="space-y-6">
              <h1 className="text-4xl font-black italic gold-gradient uppercase tracking-tighter leading-none">
                Quasi <br /> Prossimo <br /> All&#39;Eccellenza
              </h1>

              {/* PROGRESS BAR SPEDIZIONE */}
              {!isSpedizioneGratis && cart.length > 0 && (
                <div className="bg-gold/5 border border-gold/10 p-4 rounded-xl">
                  <p className="text-[10px] uppercase tracking-widest text-gold mb-2">
                    Mancano{" "}
                    <span className="font-bold">
                      €{(sogliaGratis - totalPrice).toFixed(2)}
                    </span>{" "}
                    alla spedizione gratuita
                  </p>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-gold h-full transition-all duration-700"
                      style={{ width: `${(totalPrice / sogliaGratis) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <p className="text-gray-400 text-sm font-light italic leading-relaxed">
                Stai per completare il tuo ordine. La transazione è gestita dai
                sistemi crittografati di Stripe per garantirti la massima
                sicurezza.
              </p>

              <div className="flex items-center gap-4 py-4 border-y border-gold/10">
                <div className="p-3 bg-gold/10 rounded-full text-gold">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gold">
                    Pagamento Protetto
                  </p>
                  <p className="text-[9px] text-gray-500 uppercase">
                    SSL Encrypted / PCI DSS Compliant
                  </p>
                </div>
              </div>
            </div>

            {/* Parte Destra */}
            <div className="border-t-2 border-gold bg-clay p-8 shadow-2xl">
              <h2 className="text-lg font-serif italic text-gold-light border-b border-gold/10 pb-4 mb-6 uppercase tracking-[0.2em]">
                Riepilogo Selezione
              </h2>

              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-300 font-light italic">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-gold-light">
                      €{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-gold/10 mb-8">
                <div className="flex justify-between text-[10px] uppercase tracking-widest">
                  <span className="text-gray-500">Subtotale</span>
                  <span className="text-gray-300">€{totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-[10px] uppercase tracking-widest">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Truck size={12} />
                    <span>Spedizione</span>
                  </div>
                  <span
                    className={
                      isSpedizioneGratis
                        ? "text-green-500 font-bold"
                        : "text-gold"
                    }
                  >
                    {isSpedizioneGratis ? "Gratuita" : `€ ${costoSpedizione}`}
                  </span>
                </div>

                <div className="flex justify-between items-end pt-2">
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-gold/50">
                    Totale
                  </span>
                  <span className="text-3xl font-black italic gold-gradient">
                    €{finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-[10px] uppercase mb-4 flex items-center gap-2">
                  <AlertCircle size={12} /> {error}
                </div>
              )}

              <button
                disabled={isProcessing || cart.length === 0}
                onClick={handlePayment}
                className="btn-custom w-full h-14 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[10px]"
              >
                {isProcessing ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Lock size={14} /> Procedi al pagamento sicuro
                  </>
                )}
              </button>
              <div className="mt-6 space-y-2 opacity-40 hover:opacity-100 transition-opacity duration-500">
    <p className="text-[8px] leading-relaxed uppercase tracking-[0.1em] font-light text-center">
      * Nota sulla Logistica: Ai sensi dell&apos;art. 1510 c.c., la merce viaggia a rischio e 
      pericolo del committente. Eventuali danni occorsi durante il trasporto 
      sono a carico del destinatario.
    </p>
  </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
