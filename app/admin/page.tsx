import { supabaseAdmin } from "@/lib/supabase"; // CAMBIATO: Usiamo il client Admin
import { getAdminStats } from "@/lib/dal/admin-stats";
import { Sidebar } from "@/components/admin/Sidebar";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { StatCard } from "@/components/admin/StatsCard";
import OrdersList from "@/components/admin/OrderList";

export const revalidate = 0;
export const dynamic = "force-dynamic"; // Forza Next.js a non usare cache statica

export default async function AdminDashboard() {
  // 1. Fetch delle statistiche
  if (!supabaseAdmin) {
    return (
      <div className="p-10 text-white bg-black min-h-screen">
        Errore: Chiave SUPABASE_SERVICE_ROLE_KEY non configurata correttamente.
      </div>
    );
  }
  const stats = await getAdminStats();
  const { data: categorie } = await supabaseAdmin
    .from("categorie")
    .select("*")
    .order("nome");
  // 2. Controllo di sicurezza per la Service Role Key
  if (!supabaseAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gold">
        <p className="border border-gold/20 p-8 rounded-xl bg-clay">
          Errore di configurazione: SUPABASE_SERVICE_ROLE_KEY non trovata.
        </p>
      </div>
    );
  }

  // 3. Fetch degli ultimi ordini usando il client amministrativo
  const { data: recentOrders, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Errore recupero ordini da Supabase:", error.message);
  }

  return (
    <div className="min-h-screen bg-black flex text-white font-sans">
      {/* Sidebar fissa a sinistra */}
      <Sidebar />

      <main className="flex-1 p-4 md:p-10 overflow-y-auto mt-10 md:mt-0">
        {/* Intestazione */}
        <DashboardHeader categorie={categorie || []} />

        {/* Griglia Statistiche */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        {/* Sezione Gestione Ordini */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl text-gold italic">
                Gestione Ordini
              </h2>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">
                Monitora e aggiorna lo stato delle spedizioni in tempo reale
              </p>
            </div>
          </div>

          {/* Lista degli ordini (Client Component per l'interattività) */}
          <OrdersList initialOrders={recentOrders || []} />
        </div>
      </main>
    </div>
  );
}
