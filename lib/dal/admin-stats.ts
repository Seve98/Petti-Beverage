import { ShoppingCart, Euro, Package, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

export async function getAdminStats() {
  const [orders, products, revenue] = await Promise.all([
    supabase.from("ordini").select("id", { count: "exact" }),
    supabase.from("prodotti").select("id", { count: "exact" }),
    supabase.from("ordini").select("totale"),
  ]);

  const totalRevenue =
    revenue.data?.reduce((acc, curr) => acc + Number(curr.totale), 0) || 0;

  // Restituiamo un array che rispetta esattamente l'interfaccia StatCardProps
  return [
    {
      label: "Ordini Totali",
      value: orders.count?.toString() || "0",
      icon: ShoppingCart,
      color: "text-blue-400",
    },
    {
      label: "Entrate Totali",
      value: `€${totalRevenue.toLocaleString()}`,
      icon: Euro,
      color: "text-gold",
    },
    {
      label: "Prodotti Attivi",
      value: products.count?.toString() || "0",
      icon: Package,
      color: "text-purple-400",
    },
    {
      label: "Clienti",
      value: "12",
      icon: Users,
      color: "text-orange-400",
    },
  ];
}
