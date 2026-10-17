"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GlassWater,
  ShieldCheck,
  History,
  Users,
  Star,
  Truck,
  Box,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

export default function ChiSiamoClient() {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 scale-105"
          >
            <source src="/videos/video_chi-siamo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        </div>

        <div className="relative z-10 text-center px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <span className="text-gold font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase text-[9px] md:text-[10px] mb-4 md:mb-6 block">
              Established 2026
            </span>
            {/* Font size ridotto su mobile per evitare overflow */}
            <h1 className="text-5xl sm:text-7xl md:text-[11rem] font-black italic tracking-tighter uppercase mb-4 gold-gradient leading-[0.9] md:leading-[0.8] drop-shadow-2xl">
              Petti <br className="md:hidden" /> Beverage
            </h1>
            <div className="w-12 md:w-20 h-[1px] bg-gold/40 mx-auto my-8 md:my-12" />
            <p className="text-lg md:text-2xl font-serif italic text-gold-light/90 max-w-2xl mx-auto leading-relaxed px-4">
              &ldquo;L&#39;eccellenza non è un atto, ma un&#39;abitudine.&rdquo;
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator: Nascosto su mobile molto piccoli per pulizia */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] uppercase tracking-[0.4em] text-gold/50">
            Scroll
          </span>
          <div className="w-[1px] h-10 md:h-16 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* --- STORIA & EREDITÀ --- */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-40 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group order-2 md:order-1"
        >
          <div className="absolute -inset-2 md:-inset-4 border border-gold/20 rounded-sm translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
          <div className="relative overflow-hidden aspect-[4/5] bg-[#111] border border-gold/10">
            <Image
              src="/chisiamo.jpeg"
              alt="La storia di Petti Beverage, ingrosso bevande a Lucera dal 1960"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        <div className="space-y-12 md:space-y-16 order-1 md:order-2">
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-gold/5 rounded-full border border-gold/10">
                <History className="text-gold" size={20} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-gold-light leading-none">
                Oltre la Distribuzione
              </h3>
            </div>
            <p className="text-white/50 text-base md:text-lg leading-relaxed font-light md:pl-14 italic border-l md:border-l border-gold/10 pl-6">
              Petti Beverage nasce dalla necessità di colmare un vuoto nel
              mercato della distribuzione: la cura maniacale per il dettaglio.
            </p>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-gold/5 rounded-full border border-gold/10">
                <Star className="text-gold" size={20} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-gold-light leading-none">
                Standard Oro
              </h3>
            </div>
            <p className="text-white/50 text-base md:text-lg leading-relaxed font-light md:pl-14 italic border-l md:border-l border-gold/10 pl-6">
              Ogni referenza è gestita secondo protocolli rigorosi per garantire
              l&apos;integrità assoluta del prodotto.
            </p>
          </div>
        </div>
      </section>

      {/* --- IL CAVEAU (BENTO GRID RESPONSIVE) --- */}
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-gold font-bold tracking-[0.3em] uppercase text-[10px] mb-2 md:mb-4 block">
              Logistica d&apos;Elite
            </span>
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-gold-light leading-tight md:leading-none">
              Infrastruttura <br className="hidden md:block" /> di Valore
            </h2>
          </div>
          <div className="flex gap-6 md:gap-8 border-l border-gold/20 pl-6 md:pl-8">
            <div className="text-left md:text-center">
              <p className="text-gold font-bold text-xl md:text-2xl">1000+</p>
              <p className="text-[8px] uppercase tracking-widest text-white/40">
                MQ Coperti
              </p>
            </div>
            <div className="text-left md:text-center">
              <p className="text-gold font-bold text-xl md:text-2xl">24h</p>
              <p className="text-[8px] uppercase tracking-widest text-white/40">
                Monitoraggio
              </p>
            </div>
          </div>
        </div>

        {/* Grid: h-auto su mobile per permettere alle foto di impilarsi */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[900px]">
          {/* FOTO 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7 md:row-span-1 relative min-h-[300px] md:min-h-full overflow-hidden rounded-2xl border border-white/5 group"
          >
            <Image
              src="/magazzino/magazzino4.jpg"
              alt="Ingresso del magazzino Petti Beverage a Lucera"
              fill
              className="object-cover transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
            <div className="absolute bottom-6 left-6">
              <p className="text-gold font-bold uppercase tracking-[0.2em] text-[10px]">
                Punto di Carico
              </p>
              <h4 className="text-white font-serif italic text-lg">
                Hub Strategico
              </h4>
            </div>
          </motion.div>

          {/* FOTO 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 md:row-span-2 relative min-h-[400px] md:min-h-full overflow-hidden rounded-2xl border border-white/5 group"
          >
            <Image
              src="/magazzino/magazzino1.jpg"
              alt="Interno del magazzino Petti Beverage con scaffalature di bevande"
              fill
              className="object-cover transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md p-3 md:p-4 rounded-full border border-gold/20">
              <Truck className="text-gold" size={18} />
            </div>
          </motion.div>

          {/* FOTO 3 */}
          <motion.div className="md:col-span-4 md:row-span-1 relative min-h-[250px] md:min-h-full overflow-hidden rounded-2xl border border-white/5 group">
            <Image
              src="/magazzino/magazzino5.jpg"
              alt="Scorte di bottiglie e casse nel magazzino Petti Beverage"
              fill
              className="object-cover transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="px-4 py-2 bg-gold/10 backdrop-blur-sm border border-gold/20 text-gold text-[9px] font-bold uppercase tracking-widest">
                Qualità Controllata
              </span>
            </div>
          </motion.div>

          {/* FOTO 4 */}
          <motion.div className="md:col-span-3 md:row-span-1 relative min-h-[250px] md:min-h-full overflow-hidden rounded-2xl border border-white/5 group">
            <Image
              src="/magazzino/magazzino3.jpg"
              alt="Preparazione degli ordini nel magazzino Petti Beverage"
              fill
              className="object-cover transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute bottom-4 right-4 text-right">
              <CheckCircle2 className="text-gold ml-auto mb-2" size={18} />
              <p className="text-[8px] text-white/60 uppercase tracking-widest">
                Rapidità
              </p>
            </div>
          </motion.div>
        </div>

        {/* FOTO 5 - FULL WIDTH */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 relative min-h-[300px] md:h-[400px] overflow-hidden rounded-2xl border border-white/5 group"
        >
          <Image
            src="/magazzino/magazzino2.jpg"
            alt="Vista del magazzino Petti Beverage a Lucera"
            fill
            className="object-cover transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/40 to-transparent flex items-center px-8 md:px-12">
            <div className="max-w-md pt-20 md:pt-0">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <Box className="text-gold" size={20} />
                <h4 className="text-gold font-serif italic text-xl md:text-2xl">
                  Pronti a tutto.
                </h4>
              </div>
              <p className="text-white/80 md:text-white text-[10px] md:text-xs leading-relaxed uppercase tracking-widest font-light">
                Gestione dello stock automatizzata e precisa per i brand più
                richiesti.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="bg-[#050505] border-y border-gold/10 py-16 md:py-24 my-10 md:my-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center">
          <div className="group">
            <div className="text-5xl md:text-6xl font-black italic gold-gradient mb-2 transition-transform duration-500 group-hover:scale-110">
              100%
            </div>
            <div className="uppercase tracking-[0.3em] text-[9px] text-gold/60 font-bold">
              Purezza Garantita
            </div>
          </div>
          <div className="group border-y border-gold/10 md:border-y-0 md:border-x py-10 md:py-0">
            <div className="text-5xl md:text-6xl font-black italic gold-gradient mb-2 transition-transform duration-500 group-hover:scale-110">
              24/7
            </div>
            <div className="uppercase tracking-[0.3em] text-[9px] text-gold/60 font-bold">
              Logistica Premium
            </div>
          </div>
          <div className="group">
            <div className="text-5xl md:text-6xl font-black italic gold-gradient mb-2 transition-transform duration-500 group-hover:scale-110">
              TOP 10
            </div>
            <div className="uppercase tracking-[0.3em] text-[9px] text-gold/60 font-bold">
              Distributori Elite
            </div>
          </div>
        </div>
      </section>

      {/* --- VALORI --- */}
      {/* --- GRIGLIA VALORI CORRETTA --- */}
      <section className="max-w-7xl mx-auto px-6 mb-20 md:mb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/20 border border-gold/20 overflow-hidden shadow-2xl">
          {[
            {
              icon: ShieldCheck,
              title: "Integrità",
              desc: "Trasparenza totale su ogni lotto.",
            },
            {
              icon: GlassWater,
              title: "Esclusività",
              desc: "Accesso a referenze rare e vintage.",
            },
            {
              icon: Users,
              title: "Passione",
              desc: "Consulenza su misura per la tua attività.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-black p-10 md:p-16 text-center hover:bg-[#0a0a0a] transition-all duration-500 group"
            >
              {/* Usiamo w- e h- di Tailwind per il responsive invece della prop size */}
              <item.icon className="mx-auto mb-6 md:mb-8 text-gold group-hover:scale-110 transition-transform w-10 h-10 md:w-12 md:h-12" />
              <h4 className="font-bold uppercase mb-4 md:mb-6 italic text-gold-light tracking-widest text-lg md:text-xl">
                {item.title}
              </h4>
              <p className="text-sm text-white/40 font-light leading-loose">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="pb-10 md:pb-20 text-center px-6">
        <div className="w-12 md:w-16 h-[1px] bg-gold/20 mx-auto mb-8 md:mb-10" />
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] md:tracking-[1em] text-gold/40 font-bold leading-loose">
          Petti Beverage &bull; L&apos;Eccellenza in Ogni Goccia
        </p>
      </footer>
    </div>
  );
}
