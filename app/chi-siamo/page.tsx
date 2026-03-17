"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GlassWater,
  ShieldCheck,
  History,
  Users,
  Star,
  ArrowDown,
} from "lucide-react";
import Image from "next/image";

export default function ChiSiamoPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* --- HERO SECTION CINEMATICA --- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 scale-105"
          >
            <source src="/videos/videochisiamo.mp4" type="video/mp4" />
            {/* Fallback per browser che non supportano il video */}
            Your browser does not support the video tag.
          </video>
          {/* Overlay gradiente nero per profondità e leggibilità */}
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-transparent to-black" />
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
        </div>

        {/* Contenuto Hero */}
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <span className="text-gold font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block">
              Established 2026
            </span>
            <h1 className="text-7xl md:text-[11rem] font-black italic tracking-tighter uppercase mb-4 gold-gradient leading-[0.8] drop-shadow-2xl">
              Petti <br /> Beverage
            </h1>
            <div className="w-20 h-[1px] bg-gold/40 mx-auto my-12" />
            <p className="text-xl md:text-2xl font-serif italic text-gold-light/90 max-w-2xl mx-auto leading-relaxed">
              &ldquo;L&#39;eccellenza non è un atto, ma un&#39;abitudine.&rdquo;
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator Animato */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] uppercase tracking-[0.4em] text-gold/50">
            Scroll
          </span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* --- SEZIONE STORIA & EREDITÀ --- */}
      <section className="max-w-7xl mx-auto px-6 py-40 grid md:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Cornice decorativa minimalista */}
          <div className="absolute -inset-4 border border-gold/20 rounded-sm translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
          <div className="relative overflow-hidden aspect-[4/5] bg-clay border border-gold/10">
            <Image
              src="/chisiamo.jpeg"
              alt="Storia Petti Beverage"
              fill
              className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
            />
          </div>
        </motion.div>

        <div className="space-y-16">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gold/5 rounded-full border border-gold/10">
                <History className="text-gold" size={24} />
              </div>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-gold-light leading-none">
                Oltre la Distribuzione
              </h3>
            </div>
            <p className="text-white/50 text-lg leading-relaxed font-light pl-14 italic border-l border-gold/10">
              Petti Beverage nasce dalla necessità di colmare un vuoto nel
              mercato della distribuzione: la cura maniacale per il dettaglio.
              Non siamo semplici fornitori, ma partner strategici per la
              ristorazione e il collezionismo privato.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gold/5 rounded-full border border-gold/10">
                <Star className="text-gold" size={24} />
              </div>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-gold-light leading-none">
                Standard Oro
              </h3>
            </div>
            <p className="text-white/50 text-lg leading-relaxed font-light pl-14 italic border-l border-gold/10">
              Ogni bottiglia che esce dai nostri magazzini è stata conservata in
              ambienti a temperatura controllata e verificata dai nostri
              sommelier. La qualità non è mai lasciata al caso.
            </p>
          </div>

          <div className="pl-14 pt-4">
            <button className="btn-custom py-4 px-10 uppercase tracking-[0.3em] text-[10px] font-bold">
              Esplora la Cantina
            </button>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION (STILE CLAY) --- */}
      <section className="bg-clay/50 border-y border-gold/10 py-24 mb-40">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div className="group">
            <div className="text-6xl font-black italic gold-gradient mb-2 group-hover:scale-110 transition-transform duration-500">
              100%
            </div>
            <div className="uppercase tracking-[0.3em] text-[10px] text-gold/60 font-bold">
              Purezza Garantita
            </div>
          </div>
          <div className="group border-y md:border-y-0 md:border-x border-gold/10 py-12 md:py-0">
            <div className="text-6xl font-black italic gold-gradient mb-2 group-hover:scale-110 transition-transform duration-500">
              24/7
            </div>
            <div className="uppercase tracking-[0.3em] text-[10px] text-gold/60 font-bold">
              Logistica Premium
            </div>
          </div>
          <div className="group">
            <div className="text-6xl font-black italic gold-gradient mb-2 group-hover:scale-110 transition-transform duration-500">
              TOP 10
            </div>
            <div className="uppercase tracking-[0.3em] text-[10px] text-gold/60 font-bold">
              Distributori Elite
            </div>
          </div>
        </div>
      </section>

      {/* --- GRIGLIA VALORI FONDANTI --- */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <div className="grid md:grid-cols-3 gap-px bg-gold/20 border border-gold/20 overflow-hidden shadow-2xl">
          <div className="bg-black p-16 text-center hover:bg-clay transition-all duration-500 group">
            <ShieldCheck
              className="mx-auto mb-8 text-gold group-hover:scale-110 transition-transform"
              size={48}
            />
            <h4 className="font-bold uppercase mb-6 italic text-gold-light tracking-widest text-xl">
              Integrità
            </h4>
            <p className="text-sm text-white/40 font-light leading-loose">
              Trasparenza totale su filiera e provenienza di ogni singolo lotto.
              Ogni etichetta racconta una storia certificata.
            </p>
          </div>

          <div className="bg-black p-16 text-center hover:bg-clay transition-all duration-500 group border-x border-gold/10">
            <GlassWater
              className="mx-auto mb-8 text-gold group-hover:scale-110 transition-transform"
              size={48}
            />
            <h4 className="font-bold uppercase mb-6 italic text-gold-light tracking-widest text-xl">
              Esclusività
            </h4>
            <p className="text-sm text-white/40 font-light leading-loose">
              Accesso a referenze rare, edizioni limitate e vintage introvabili,
              riservate alla nostra cerchia più ristretta.
            </p>
          </div>

          <div className="bg-black p-16 text-center hover:bg-clay transition-all duration-500 group">
            <Users
              className="mx-auto mb-8 text-gold group-hover:scale-110 transition-transform"
              size={48}
            />
            <h4 className="font-bold uppercase mb-6 italic text-gold-light tracking-widest text-xl">
              Passione
            </h4>
            <p className="text-sm text-white/40 font-light leading-loose">
              Consulenza su misura per la creazione di cantine private e
              investimenti nel mondo degli spirit di lusso.
            </p>
          </div>
        </div>
      </section>

      {/* --- FOOTER BRANDING --- */}
      <footer className="pb-20 text-center">
        <div className="w-16 h-[1px] bg-gold/20 mx-auto mb-10" />
        <p className="text-[10px] uppercase tracking-[1em] text-gold/40 font-bold">
          Petti Beverage &bull; L&#39;Eccellenza in Ogni Goccia
        </p>
      </footer>
    </div>
  );
}
