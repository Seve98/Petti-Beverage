"use client";

import { useOrders } from "@/hooks/useOrders";
import { OrderRow } from "@/components/admin/OrderRow";

export default function OrdersPage() {
  const { orders, loading, updateOrderStatus } = useOrders();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="gold-gradient animate-pulse font-black italic uppercase tracking-[0.3em]">
          Accesso Caveau Petti...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8 pt-24 mx-auto">
      <header className="mb-12 flex justify-between items-end border-b border-gold/20 pb-8">
        <div>
          <h1 className="text-5xl font-black italic gold-gradient uppercase tracking-tighter">
            Ordini
          </h1>
          <p className="text-gold-light/40 text-xs uppercase tracking-[0.2em] mt-2">
            Gestione Logistica Real-Time
          </p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-light text-white">
            {orders.length}
          </span>
          <p className="text-[9px] uppercase text-gold/50 font-bold">
            Totale Transazioni
          </p>
        </div>
      </header>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-center text-white/20 italic py-20 border border-dashed border-white/10">
            Nessun ordine presente in archivio.
          </p>
        ) : (
          orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              onStatusChange={updateOrderStatus}
            />
          ))
        )}
      </div>
    </div>
  );
}
