"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

// 1. Definiamo le Props per rendere felice TypeScript
interface NavbarProps {
  onCartClick?: () => void;
}

export default function Navbar({ onCartClick }: NavbarProps) {
  const { cart, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Gestore del click: usa la prop se passata, altrimenti usa il context interno
  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    } else {
      setIsCartOpen(true);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Catalogo", href: "/catalogo" },
    { name: "Promozioni", href: "/promozioni", highlight: true },
    { name: "Business", href: "/business" },
    { name: "Chi Siamo", href: "/chi-siamo" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <Image
            src="/logo_petti.png"
            alt="Logo Petti Beverage"
            width={50}
            height={50}
            className="object-contain"
          />
          <div className="flex flex-col">
            <span className="gold-gradient text-xl md:text-2xl font-black leading-none tracking-tighter uppercase">
              PETTI BEVERAGE
            </span>
            <span className="text-[9px] text-gold/80 font-bold uppercase tracking-[0.3em] leading-tight">
              DRINK GOOD, DRINK PETTI
            </span>
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
                link.highlight
                  ? "text-gold hover:text-white"
                  : "text-gray-400 hover:text-gold"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCartClick} // Ora usa la logica sicura
            className="relative p-3 rounded-full hover:bg-gold/10 transition-all active:scale-90 group"
          >
            <ShoppingCart
              size={22}
              className="text-gold group-hover:scale-110 transition-transform"
            />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-gold text-black text-[9px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-black animate-in zoom-in duration-300">
                {totalItems}
              </span>
            )}
          </button>

          {/* Hamburger Menu (Mobile) */}
          <button
            className="md:hidden p-3 text-gold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-gold/10 p-6 space-y-6 animate-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-lg font-serif italic ${
                link.highlight ? "text-gold" : "text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
