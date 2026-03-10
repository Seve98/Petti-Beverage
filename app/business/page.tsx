"use client";
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Truck, Award, MessageSquare } from "lucide-react";

export default function BusinessPage() {
  return (
    <main className=" bg-black text-white min-h-screen pt-10 pb-20">
      {/* HERO B2B */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/videos/businesshero.mp4" type="video/mp4" />
            Il tuo browser non supporta il formato video.
          </video>
        </div>

        <div className="relative z-20 text-center px-6">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-serif italic gold-gradient mb-4"
          >
            Petti Business
          </motion.h1>
          <p className="text-gray-300 tracking-[0.3em] uppercase text-sm">
            Soluzioni su misura per Horeca e Professionisti
          </p>
        </div>
      </section>

      {/* VANTAGGI */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col items-center text-center space-y-4 p-8 border border-gold/10 bg-white/5 rounded-2xl">
          <div className="p-4 bg-gold/10 rounded-full text-gold">
            <Award size={32} />
          </div>
          <h3 className="text-xl font-bold uppercase tracking-tight">
            Listini Personalizzati
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Accedi a prezzi riservati e sconti quantità pensati per la rivendita
            e la somministrazione.
          </p>
        </div>

        <div className="flex flex-col items-center text-center space-y-4 p-8 border border-gold/10 bg-white/5 rounded-2xl">
          <div className="p-4 bg-gold/10 rounded-full text-gold">
            <Truck size={32} />
          </div>
          <h3 className="text-xl font-bold uppercase tracking-tight">
            Logistica Prioritaria
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Spedizioni assicurate e tempi di consegna garantiti per non restare
            mai senza stock.
          </p>
        </div>

        <div className="flex flex-col items-center text-center space-y-4 p-8 border border-gold/10 bg-white/5 rounded-2xl">
          <div className="p-4 bg-gold/10 rounded-full text-gold">
            <Briefcase size={32} />
          </div>
          <h3 className="text-xl font-bold uppercase tracking-tight">
            Consulenza Sommelier
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Ti aiutiamo a comporre la tua carta dei vini per esaltare l'offerta
            del tuo locale.
          </p>
        </div>
      </section>

      {/* FORM DI CONTATTO B2B */}
      <section className="max-w-3xl mx-auto px-6 py-12 bg-[#0a0a0a] border border-gold/20 rounded-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif text-gold italic mb-2">
            Diventa Partner
          </h2>
          <p className="text-gray-500 text-xs uppercase tracking-widest">
            Compila il form per ricevere il catalogo e i listini destinati alla
            tua attività
          </p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Nome Attività"
              className="bg-black border border-white/10 p-4 rounded-xl focus:border-gold outline-none transition-all"
            />
            <input
              type="text"
              placeholder="Partita IVA"
              className="bg-black border border-white/10 p-4 rounded-xl focus:border-gold outline-none transition-all"
            />
          </div>
          <input
            type="email"
            placeholder="Email Aziendale"
            className="w-full bg-black border border-white/10 p-4 rounded-xl focus:border-gold outline-none transition-all"
          />
          <textarea
            placeholder="Raccontaci le tue esigenze..."
            rows={4}
            className="w-full bg-black border border-white/10 p-4 rounded-xl focus:border-gold outline-none transition-all"
          />

          <button className="w-full py-5 bg-gold text-black font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all duration-500">
            Richiedi Accesso Business
          </button>
        </form>
      </section>
    </main>
  );
}
