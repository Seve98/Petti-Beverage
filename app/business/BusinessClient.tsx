"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Truck,
  Award,
  Loader2,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

export default function BusinessClient() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const payload = {
      type: "B2B_CONTACT",
      attivita: formData.get("attivita"),
      piva: formData.get("piva"),
      email: formData.get("email"),
      tel: formData.get("tel"),
      messaggio: formData.get("messaggio"),
    };

    try {
      const res = await fetch("/api/telegram-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Errore invio:", error);
      setStatus("error");
    }
  }

  return (
    <main className="bg-black text-white min-h-screen pt-10 pb-20 font-sans">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
          >
            <source src="/videos/businesshero.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative flex flex-col items-center z-20 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-32 h-32 mb-8"
          >
            <Image
              src="/logo_petti.png"
              alt="Logo Petti Beverage"
              fill
              className="object-contain"
            />
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-8xl font-serif italic gold-gradient mb-6 tracking-tight"
          >
            Petti Business
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 tracking-[0.4em] uppercase text-[10px] md:text-xs font-bold"
          >
            Eccellenza e Logistica per l&apos;Horeca d&apos;Autore
          </motion.p>
        </div>
      </section>

      {/* --- VANTAGGI GRID --- */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Award size={32} />,
              title: "Listini Personalizzati",
              desc: "Accedi a prezzi riservati e sconti quantità pensati per la rivendita e la somministrazione.",
            },
            {
              icon: <Truck size={32} />,
              title: "Logistica Prioritaria",
              desc: "Spedizioni assicurate e tempi di consegna garantiti per non restare mai senza stock.",
            },
            {
              icon: <Briefcase size={32} />,
              title: "Etichetta per il tuo Locale",
              desc: " Ti aiutiamo a scegliere l'etichetta perfetta per il tuo locale",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="flex flex-col items-center text-center space-y-5 p-10 border border-gold/10 bg-[#0a0a0a]/80 backdrop-blur-xl rounded-3xl"
            >
              <div className="p-4 bg-gold/10 rounded-full text-gold">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold uppercase tracking-widest text-white">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light italic">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FORM SECTION --- */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="bg-[#050505] border border-gold/20 rounded-[2rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-gold">
            <ShieldCheck size={120} />
          </div>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-10 space-y-6"
              >
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto text-gold">
                  <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-serif text-white italic">
                  Richiesta Inviata
                </h2>
                <p className="text-gray-400 max-w-sm mx-auto text-sm font-light leading-relaxed">
                  I tuoi dati sono stati trasmessi al nostro reparto
                  commerciale. Sarai ricontattato entro 24 ore lavorative.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-gold uppercase text-[10px] tracking-[0.2em] font-bold border-b border-gold/30 pb-1 hover:border-gold transition-all"
                >
                  Invia una nuova richiesta
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-serif text-gold italic mb-4">
                    Diventa Partner
                  </h2>
                  <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-medium">
                    Compila il modulo per ricevere cataloghi e listini B2B
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] text-gold/50 uppercase tracking-widest ml-1">
                        Ragione Sociale
                      </label>
                      <input
                        required
                        name="attivita"
                        type="text"
                        placeholder="Nome della tua attività"
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-gold outline-none text-sm transition-all focus:bg-white/[0.08]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-gold/50 uppercase tracking-widest ml-1">
                        Partita IVA
                      </label>
                      <input
                        required
                        name="piva"
                        type="text"
                        placeholder="Inserisci P.IVA"
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-gold outline-none text-sm transition-all focus:bg-white/[0.08]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] text-gold/50 uppercase tracking-widest ml-1">
                        Email Business
                      </label>
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder="email@azienda.it"
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-gold outline-none text-sm transition-all focus:bg-white/[0.08]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-gold/50 uppercase tracking-widest ml-1">
                        Telefono
                      </label>
                      <input
                        required
                        name="tel"
                        type="text"
                        placeholder="+39 000 0000000"
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-gold outline-none text-sm transition-all focus:bg-white/[0.08]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-gold/50 uppercase tracking-widest ml-1">
                      Note o Esigenze Specifiche
                    </label>
                    <textarea
                      required
                      name="messaggio"
                      placeholder="Raccontaci la tua realtà e quali prodotti ti interessano..."
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-gold outline-none text-sm resize-none transition-all focus:bg-white/[0.08]"
                    />
                  </div>

                  <button
                    disabled={status === "loading"}
                    className="w-full py-5 bg-gold text-black font-black uppercase tracking-[0.3em] text-xs rounded-xl hover:bg-white transition-all duration-500 flex items-center justify-center gap-4 shadow-lg shadow-gold/5 disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      "Richiedi Accesso Business"
                    )}
                  </button>

                  {status === "error" && (
                    <p className="text-red-500 text-[10px] text-center uppercase tracking-widest font-bold">
                      Errore durante l&apos;invio. Riprova o contattaci via
                      email.
                    </p>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
