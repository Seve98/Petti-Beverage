"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export function useOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Usiamo useCallback per stabilizzare la funzione
  // Questo evita che la funzione venga ricreata a ogni render
  const fetchOrders = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setOrders(data || []);
    } catch (err) {
      console.error("Errore fetch:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrderStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", id);

    return { error };
  };

  useEffect(() => {
    // 2. Chiamiamo la funzione. Essendo async e definita con useCallback,
    // React gestisce meglio il ciclo di vita del rendering.
    fetchOrders();

    const channel = supabase
      .channel("realtime_orders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setOrders((prev) => [payload.new, ...prev]);
            // Audio opzionale
          }
          if (payload.eventType === "UPDATE") {
            setOrders((prev) =>
              prev.map((o) => (o.id === payload.new.id ? payload.new : o)),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchOrders]); // 3. Aggiungiamo fetchOrders alle dipendenze

  return { orders, loading, updateOrderStatus };
}
