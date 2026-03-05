"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassWater, ShieldCheck, History, Users, Star } from "lucide-react";
import Image from "next/image";

export default function ChiSiamoPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 text-white font-sans">
      {/* Hero Section con Gold Gradient */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold font-bold tracking-[0.4em] uppercase text-xs mb-6 block">
            Established 2026
          </span>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase mb-6 gold-gradient leading-tight">
            Petti <br className="md:hidden" /> Beverage
          </h1>
          <p className="text-xl font-serif italic text-gold-light/80 max-w-2xl mx-auto leading-relaxed border-t border-gold/20 pt-8">
            L&#39;eccellenza non è un atto, ma un&#39;abitudine. Selezioniamo
            solo il meglio per chi esige il massimo.
          </p>
        </motion.div>
      </section>

      {/* Sezione Storia con Border Gold */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center mb-32">
        <div className="relative group">
          {/* Cornice dorata decorativa */}
          <div className="absolute -inset-4 border border-gold/30 rounded-sm translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
          <div className="relative overflow-hidden aspect-4/5 bg-clay border border-gold/20">
            <Image
              src="/placeholder.png"
              alt="Storia Petti Beverage"
              fill
              className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute bottom-0 left-0 p-8 bg-linear-to-t from-black to-transparent w-full">
              <p className="text-gold font-serif italic text-2xl">
                La nostra eredità.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <History className="text-gold" size={24} />
              <h3 className="text-2xl font-black italic uppercase tracking-tighter text-gold-light">
                Oltre la Distribuzione
              </h3>
            </div>
            <p className="text-white/60 leading-relaxed font-light">
              Petti Beverage nasce dalla necessità di colmare un vuoto nel
              mercato della distribuzione: la cura maniacale per il dettaglio.
              Non siamo semplici fornitori, ma partner strategici per la
              ristorazione e il collezionismo privato.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Star className="text-gold" size={24} />
              <h3 className="text-2xl font-black italic uppercase tracking-tighter text-gold-light">
                Standard Oro
              </h3>
            </div>
            <p className="text-white/60 leading-relaxed font-light">
              Ogni bottiglia che esce dai nostri magazzini è stata conservata in
              ambienti a temperatura controllata e verificata dai nostri
              sommelier. La qualità non è mai lasciata al caso.
            </p>
          </div>

          <button className="btn-custom uppercase tracking-widest text-xs">
            Scopri la Collezione
          </button>
        </div>
      </section>

      {/* Stats con stile Petti (Nero e Oro) */}
      <section className="bg-clay border-y border-gold/10 py-20 mb-32">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-2">
            <div className="text-5xl font-black italic gold-gradient">100%</div>
            <div className="uppercase tracking-[0.2em] text-[10px] text-gold-light">
              Purezza Garantita
            </div>
          </div>
          <div className="space-y-2 border-y md:border-y-0 md:border-x border-gold/10 py-8 md:py-0">
            <div className="text-5xl font-black italic gold-gradient">24/7</div>
            <div className="uppercase tracking-[0.2em] text-[10px] text-gold-light">
              Logistica Premium
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-black italic gold-gradient">
              TOP 10
            </div>
            <div className="uppercase tracking-[0.2em] text-[10px] text-gold-light">
              Distributori Elite
            </div>
          </div>
        </div>
      </section>

      {/* Griglia Valori Finale */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-1px bg-gold/10 border border-gold/10 overflow-hidden">
          <div className="bg-black p-12 text-center hover:bg-clay transition-colors group">
            <ShieldCheck
              className="mx-auto mb-6 text-gold group-hover:scale-110 transition-transform"
              size={40}
            />
            <h4 className="font-bold uppercase mb-4 italic text-gold-light tracking-widest">
              Integrità
            </h4>
            <p className="text-sm text-white/40 font-light">
              Trasparenza totale su filiera e provenienza di ogni singolo lotto.
            </p>
          </div>

          <div className="bg-black p-12 text-center hover:bg-clay transition-colors group border-x border-gold/10">
            <GlassWater
              className="mx-auto mb-6 text-gold group-hover:scale-110 transition-transform"
              size={40}
            />
            <h4 className="font-bold uppercase mb-4 italic text-gold-light tracking-widest">
              Esclusività
            </h4>
            <p className="text-sm text-white/40 font-light">
              Accesso a referenze rare e tirature limitate non disponibili
              altrove.
            </p>
          </div>

          <div className="bg-black p-12 text-center hover:bg-clay transition-colors group">
            <Users
              className="mx-auto mb-6 text-gold group-hover:scale-110 transition-transform"
              size={40}
            />
            <h4 className="font-bold uppercase mb-4 italic text-gold-light tracking-widest">
              Passione
            </h4>
            <p className="text-sm text-white/40 font-light">
              Un servizio di consulenza dedicato h24 per i nostri clienti VIP.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <div className="mt-40 text-center">
        <p className="text-[10px] uppercase tracking-[0.8em] text-gold/30 font-bold">
          Petti Beverage &bull; L&#39;Eccellenza in Ogni Goccia
        </p>
      </div>
    </div>
  );
}
