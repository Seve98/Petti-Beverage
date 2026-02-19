"use client";
import { useCart } from "@/context/CartContext";
import { CreditCard, Truck, ChevronLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart } = useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 15; // Spedizione gratuita sopra i 100€
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Torna al Carrello */}
        <Link
          href="/"
          className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors group"
        >
          <ChevronLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium">Torna allo shopping</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* COLONNA SINISTRA: Form Dati */}
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Truck className="text-blue-600" /> Dati di Consegna
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nome Attività / Nome"
                  className="col-span-2 w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Partita IVA (Opzionale)"
                  className="col-span-2 w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="col-span-2 w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Indirizzo"
                  className="col-span-2 w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Città"
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="CAP"
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </section>

            <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CreditCard className="text-blue-600" /> Metodo di Pagamento
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-4 p-4 rounded-xl border-2 border-blue-600 bg-blue-50 cursor-pointer">
                  <input
                    type="radio"
                    name="pay"
                    defaultChecked
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="font-bold text-slate-800">
                    Bonifico Bancario / Alla Consegna
                  </span>
                </label>
                <label className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="pay"
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="font-medium text-slate-600">
                    Carta di Credito / PayPal
                  </span>
                </label>
              </div>
            </section>
          </div>

          {/* COLONNA DESTRA: Recap Ordine */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white p-8 rounded-3xl sticky top-28 shadow-2xl">
              <h2 className="text-xl font-bold mb-6">Riepilogo Ordine</h2>

              <div className="max-h-60 overflow-y-auto mb-6 space-y-4 pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-sm border-b border-slate-800 pb-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="bg-slate-800 px-2 py-1 rounded text-xs font-bold text-blue-400">
                        {item.quantity}x
                      </span>
                      <p className="font-medium truncate w-40">{item.name}</p>
                    </div>
                    <p className="font-bold">
                      €{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm border-b border-slate-800 pb-6 mb-6">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotale</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Spedizione</span>
                  <span>
                    {shipping === 0 ? "Gratis" : `€${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold mb-8">
                <span>Totale</span>
                <span className="text-blue-400">€{total.toFixed(2)}</span>
              </div>

              <button
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-900/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                onClick={() =>
                  alert("Ordine ricevuto! Grazie da Petti Pietro & Figli.")
                }
              >
                Conferma Ordine
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs">
                <ShieldCheck size={16} />
                <span>Pagamento Sicuro & Cifrato</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
