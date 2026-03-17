import { ShoppingCart, Euro, Package, Users } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase"; // USA IL CLIENT ADMIN!

export async function getAdminStats() {
  // Eseguiamo le chiamate in parallelo con supabaseAdmin per scavalcare le RLS
  if (!supabaseAdmin) {
    throw new Error(
      "Servizio Admin non disponibile: verifica le chiavi nel file .env",
    );
  }
  const [ordersRes, productsRes, revenueRes] = await Promise.all([
    // Conta tutti gli ordini nella tabella "orders"
    supabaseAdmin.from("orders").select("id", { count: "exact", head: true }),

    // Conta i prodotti attivi
    supabaseAdmin
      .from("prodotti")
      .select("id", { count: "exact", head: true })
      .eq("attivo", true),

    // Prende i totali e le email per fatturato e numero clienti
    supabaseAdmin.from("orders").select("total_amount, customer_email"),
  ]);

  // Calcolo fatturato totale
  const totalRevenue =
    revenueRes.data?.reduce(
      (acc, curr) => acc + Number(curr.total_amount),
      0,
    ) || 0;

  // Calcolo clienti unici basato sull'email
  const uniqueCustomers = new Set(revenueRes.data?.map((o) => o.customer_email))
    .size;

  return [
    {
      label: "Ordini Totali",
      value: ordersRes.count?.toString() || "0",
      icon: ShoppingCart,
      color: "text-blue-400",
    },
    {
      label: "Entrate Totali",
      value: `€${totalRevenue.toLocaleString("it-IT", { minimumFractionDigits: 2 })}`,
      icon: Euro,
      color: "text-gold",
    },
    {
      label: "Prodotti Attivi",
      value: productsRes.count?.toString() || "0",
      icon: Package,
      color: "text-purple-400",
    },
    {
      label: "Clienti Unici",
      value: uniqueCustomers.toString(),
      icon: Users,
      color: "text-orange-400",
    },
  ];
}
