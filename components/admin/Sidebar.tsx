// components/admin/Sidebar.tsx
import { LayoutDashboard, Package, ShoppingCart } from "lucide-react";
import Link from "next/link";

export const Sidebar = () => (
  <aside className="w-64 bg-black border-r border-gold/10 text-gray-400 p-6 hidden md:block">
    <div className="mb-10 flex items-center gap-2 text-gold font-bold font-serif text-xl italic">
      Petti Admin
    </div>
    <nav className="space-y-2">
      <Link
        href="/admin"
        className="flex items-center gap-3 text-gold bg-gold/10 p-3 rounded-lg border border-gold/20"
      >
        <LayoutDashboard size={20} /> Dashboard
      </Link>
      <Link
        href="/admin/catalogo"
        className="flex items-center gap-3 p-3 hover:text-white hover:bg-white/5 rounded-lg transition-all"
      >
        <Package size={20} /> Prodotti
      </Link>
      <Link
        href="/admin/orders"
        className="flex items-center gap-3 p-3 hover:text-white hover:bg-white/5 rounded-lg transition-all"
      >
        <ShoppingCart size={20} /> Ordini
      </Link>
    </nav>
  </aside>
);
