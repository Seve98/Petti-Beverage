// app/admin/page.tsx
import { getAdminStats } from "@/lib/dal/admin-stats";
import { supabase } from "@/lib/supabase";
import { Sidebar } from "@/components/admin/Sidebar";
import { StatCard } from "@/components/admin/StatsCard";
import DashboardHeader from "@/components/admin/DashboardHeader";

export default async function AdminDashboard() {
  // Fetch dati in tempo reale dal server
  const stats = await getAdminStats();
  const { data: recentOrders } = await supabase
    .from("ordini")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Passiamo la gestione del modal a un componente client separato */}
        <DashboardHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        {/* Tabella Ordini Reali */}
        <div className="bg-clay border border-gold/10 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gold/10">
            <h2 className="font-serif text-xl text-white">
              Ultimi Ordini Reali
            </h2>
          </div>
          <table className="w-full text-left">
            <tbody className="divide-y divide-white/5">
              {recentOrders?.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-gold-light font-mono text-sm">
                    #{order.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4 text-white font-medium">
                    {order.cliente_nome}
                  </td>
                  <td className="px-6 py-4">
                    <span className="badge badge-outline border-gold/50 text-gold text-[10px]">
                      {order.stato}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-white">
                    €{order.totale}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
