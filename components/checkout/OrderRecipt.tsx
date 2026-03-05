"use client";
import { useEffect, useState } from "react";
import { CartItem } from "@/context/CartContext";

interface OrderReceiptProps {
  items: CartItem[];
  total: number;
}

export default function OrderReceipt({ items, total }: OrderReceiptProps) {
  // Usiamo lo stato per generare questi valori SOLO una volta al montaggio
  const [orderInfo, setOrderInfo] = useState<{
    id: string;
    date: string;
  } | null>(null);

  useEffect(() => {
    // Questo codice gira solo sul client e solo una volta
    setOrderInfo({
      id: Math.random().toString(36).toUpperCase().substring(2, 9),
      date: new Date().toLocaleDateString("it-IT"),
    });
  }, []);

  // Se i dati non sono ancora pronti (primo mini-render), non mostriamo l'ID instabile
  if (!orderInfo) return null;

  return (
    <div className="hidden print:block p-12 bg-white text-black font-serif min-h-screen">
      <div className="border-b-4 border-black pb-6 mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">
            PETTI BEVERAGE
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mt-2 font-sans">
            Ricevuta d&#39;acquisto ufficiale &bull; Shop Online
          </p>
        </div>
        <div className="text-right text-[10px] uppercase tracking-widest leading-relaxed font-sans">
          <p>Data: {orderInfo.date}</p>
          <p className="font-bold">ID: #PB-{orderInfo.id}</p>
        </div>
      </div>

      <table className="w-full mb-10 text-sm">
        <thead className="border-b border-black">
          <tr className="text-left uppercase text-[9px] tracking-widest font-sans">
            <th className="py-4">Selezione Prodotto</th>
            <th className="py-4 text-center">Qtà</th>
            <th className="py-4 text-right">Prezzo</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-black/5">
              <td className="py-5 font-bold uppercase italic text-lg">
                {item.name}
              </td>
              <td className="py-5 text-center font-sans">{item.quantity}</td>
              <td className="py-5 text-right font-sans font-medium">
                €{(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end pt-6">
        <div className="w-72 space-y-3 font-sans">
          <div className="flex justify-between text-[10px] uppercase tracking-widest opacity-60">
            <span>Spedizione Petti Premium</span>
            <span className="font-bold">GRATUITA</span>
          </div>
          <div className="flex justify-between text-2xl font-black pt-4 border-t-2 border-black uppercase italic font-serif">
            <span>Totale</span>
            <span>€{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-40 text-center border-t border-black/10 pt-8 font-sans">
        <p className="text-[8px] uppercase tracking-[0.4em] opacity-40 leading-loose">
          Grazie per aver scelto l&#39;eccellenza Petti Beverage. <br />
          Documento di riepilogo non valido ai fini fiscali. <br />
          La fattura elettronica verrà inviata tramite i canali ufficiali.
        </p>
      </div>
    </div>
  );
}
