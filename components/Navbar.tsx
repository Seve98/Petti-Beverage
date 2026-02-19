"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar({ onCartClick }: { onCartClick: () => void }) {
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Catalogo", href: "/catalogo" },
    { name: "Promozioni", href: "/promozioni", highlight: true },
    { name: "Chi Siamo", href: "/chi-siamo" },
    { name: "Contatti", href: "/contatti" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-3 transition-transform">
            <span className="text-white font-black text-xl">P</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-900 font-bold leading-none tracking-tight">
              PETTI PIETRO
            </span>
            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-[0.2em]">
              Distribuzione
            </span>
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold transition-colors ${
                link.highlight
                  ? "text-red-500 hover:text-red-600"
                  : "text-slate-600 hover:text-blue-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* AZIONI: CARRELLO + MENU MOBILE */}
        <div className="flex items-center gap-4">
          <button
            onClick={onCartClick}
            className="relative p-2.5 bg-slate-100 rounded-full hover:bg-slate-200 transition-all active:scale-95 group"
          >
            <ShoppingCart
              size={20}
              className="text-slate-700 group-hover:text-blue-600"
            />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                {totalItems}
              </span>
            )}
          </button>

          {/* Hamburger Menu (Mobile) */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 p-4 space-y-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-bold text-slate-700 p-2"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/admin"
            className="block text-xs font-bold text-slate-400 p-2 uppercase tracking-widest border-t pt-4"
          >
            Area Admin
          </Link>
        </div>
      )}
    </nav>
  );
}
