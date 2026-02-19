"use client";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import AddProductModal from "@/components/admin/AddProductModal";

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Dati finti per mostrare il potenziale
  const stats = [
    {
      label: "Ordini Totali",
      value: "128",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      label: "Entrate Mese",
      value: "€14.250",
      icon: ArrowUpRight,
      color: "text-green-600",
    },
    {
      label: "Prodotti Attivi",
      value: "450",
      icon: Package,
      color: "text-purple-600",
    },
    {
      label: "Nuovi Clienti",
      value: "12",
      icon: Users,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Admin (Finta) */}
      <aside className="w-64 bg-slate-900 text-slate-300 p-6 hidden md:block">
        <div className="mb-10 flex items-center gap-2 text-white font-bold">
          <div className="bg-blue-600 p-1.5 rounded">P</div>
          <span>Admin Panel</span>
        </div>
        <nav className="space-y-4">
          <div className="flex items-center gap-3 text-white bg-slate-800 p-3 rounded-lg cursor-pointer">
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div className="flex items-center gap-3 p-3 hover:text-white transition-colors cursor-not-allowed">
            <Package size={20} /> Prodotti
          </div>
          <div className="flex items-center gap-3 p-3 hover:text-white transition-colors cursor-not-allowed">
            <ShoppingCart size={20} /> Ordini
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Bentornato, Petti Pietro
            </h1>
            <p className="text-slate-500 text-sm">
              Ecco cosa sta succedendo nel tuo ingrosso oggi.
            </p>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-blue-700 transition-all"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={18} /> Nuovo Prodotto
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={stat.color} size={24} />
                <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded">
                  +12%
                </span>
              </div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {stat.value}
              </h3>
            </div>
          ))}
        </div>
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        {/* Mock Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-900">Ultimi Ordini Ricevuti</h2>
            <button className="text-blue-600 text-sm font-semibold hover:underline">
              Vedi tutti
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">ID Ordine</th>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Stato</th>
                  <th className="px-6 py-4">Totale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[1, 2, 3].map((order) => (
                  <tr
                    key={order}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">
                      #ORD-202{order}
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm font-medium">
                      Ristorante Da Mario
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-[10px] font-bold uppercase">
                        In Lavorazione
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      €450,00
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
