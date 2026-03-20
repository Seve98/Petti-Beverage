"use client";
import React from "react";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone, MapPin, Truck } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t-2 border-gold text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Colonna 1: Brand & Bio */}
          <div className="space-y-6">
            <Image
              src="/logo_petti.png"
              alt="Logo"
              width={150}
              height={50}
              className="object-contain"
            />

            <p className="text-sm leading-relaxed opacity-80 font-inter">
              Leader nella distribuzione di bevande premium per il settore
              Ho.Re.Ca. Dal 1960 portiamo la freschezza dei migliori brand nel
              cuore della tua attività.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Colonna 2: Link Rapidi */}
          <div>
            <h4 className="text-white font-jakarta font-bold mb-6 text-lg">
              Navigazione
            </h4>
            <ul className="space-y-4 font-inter text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="/catalogo"
                  className="hover:text-white transition-colors"
                >
                  Catalogo Prodotti
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Offerte Speciali
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Chi Siamo
                </a>
              </li>
            </ul>
          </div>

          {/* Colonna 3: Contatti Diretti */}
          <div>
            <h4 className="text-white font-jakarta font-bold mb-6 text-lg">
              Contattaci
            </h4>
            <ul className="space-y-4 font-inter text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold shrink-0" />
                <span>
                  Via Borgo San Matteo,18 <br />
                  71036 Lucera (FG)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold shrink-0" />
                <span>+39 3886496737</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold shrink-0" />
                <span>pettiordini@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Colonna 4: Servizi & Orari */}
          <div>
            <h4 className="text-white font-jakarta font-bold mb-6 text-lg">
              Consegne
            </h4>
            <div className="bg-black p-4 rounded-xl border border-gold">
              <div className="flex items-center gap-2 mb-2 text-gold">
                <Truck size={18} />
                <span className="font-bold text-xs uppercase tracking-wider">
                  Logistica Rapida
                </span>
              </div>
              <p className="text-xs opacity-70 mb-4">Spediamo in 24/48h.</p>
              <p className="text-xs text-white">Lun - Ven: 08:00 - 18:00</p>
              <p className="text-xs text-white">Sab: 08:00 - 13:00</p>
            </div>
          </div>
        </div>

        <hr className="border-gold mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-50 font-inter">
          <p>© {currentYear} Petti Pietro & Figli S.r.l. - P.IVA 03511040713</p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-gold hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/spedizioni"
              className="hover:text-gold hover:underline"
            >
              Spedizioni
            </Link>
            <Link
              href="/termini-e-condizioni"
              className="hover:text-gold hover:underline"
            >
              Termini e Condizioni
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
