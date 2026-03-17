"use client";

import { useState } from "react";
import { OrderRow } from "./OrderRow";
import { supabase } from "@/lib/supabase";

export default function OrdersList({
  initialOrders,
}: {
  initialOrders: any[];
}) {
  const [orders, setOrders] = useState(initialOrders);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      // Trova l'ordine per avere i dati necessari per Telegram
      const targetOrder = orders.find((o) => o.id === orderId);
      if (!targetOrder) return;

      // 1. Aggiorna Supabase
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      // 2. Aggiorna lo stato locale per riflettere il cambio nel menu a tendina
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
      );

      // 3. Notifica Telegram dell'aggiornamento
      await fetch("/api/telegram-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "STATUS_UPDATE",
          orderId: orderId.slice(0, 8),
          customer: targetOrder.customer_name,
          newStatus: newStatus,
        }),
      });
    } catch (err) {
      console.error("Errore aggiornamento:", err);
      alert("Impossibile aggiornare lo stato dell'ordine.");
    }
  };

  return (
    <div className="space-y-4">
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderRow
            key={order.id}
            order={order}
            onStatusChange={handleStatusChange}
          />
        ))
      ) : (
        <div className="p-20 text-center border border-dashed border-gold/10 rounded-3xl">
          <p className="text-gray-500 italic">
            Nessun ordine trovato nel database.
          </p>
        </div>
      )}
    </div>
  );
}
