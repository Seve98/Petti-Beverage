"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import CappelloNatale from "@/components/natale/CappelloNatale";
import Neve from "@/components/natale/Neve";
import { isPeriodoNatalizio } from "@/lib/natale";
import { CHIAVE_SPLASH_VISTO as CHIAVE_VISTO } from "@/lib/splash";

const nessunaIscrizione = () => () => {};

export default function SplashScreen() {
  // Il server disegna sempre lo splash, così copre la pagina dal primo istante (niente home
  // che lampeggia prima). A chi l'ha già visto in questa sessione lo nasconde subito lo script
  // SCRIPT_SPLASH_VISTO in <head>, prima che la pagina venga mostrata; dopo l'idratazione qui
  // si legge sessionStorage e il componente sparisce.
  const giaVisto = useSyncExternalStore(
    nessunaIscrizione,
    () => sessionStorage.getItem(CHIAVE_VISTO) !== null,
    () => false
  );
  const [chiuso, setChiuso] = useState(false);
  const [natale] = useState(isPeriodoNatalizio);

  useEffect(() => {
    if (giaVisto) return;
    const timer = setTimeout(() => setChiuso(true), 3500);
    return () => clearTimeout(timer);
  }, [giaVisto]);

  if (giaVisto) return null;

  return (
    // Segnato come visto solo a uscita finita, così l'animazione di chiusura arriva in fondo
    <AnimatePresence onExitComplete={() => sessionStorage.setItem(CHIAVE_VISTO, "true")}>
      {!chiuso && (
        <motion.div
          id="splash"
          className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-black"
          exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.5 } }}
        >
          {/* 1. IL VIDEO DELLA VETRATA (Sfondo) */}
          <div className="absolute inset-0 z-0">
            <video
              key={natale ? "natale" : "standard"}
              autoPlay
              muted
              loop
              playsInline
              poster={natale ? "/splash-natale-poster.jpg" : undefined}
              className={`w-full h-full object-cover ${natale ? "opacity-60" : "opacity-50"}`}
            >
              <source
                src={natale ? "/videos/splash-natale.mp4" : "/videos/video_vetrata.mp4"}
                type="video/mp4"
              />
            </video>
            {/* Overlay gradiente per dare profondità */}
            <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black opacity-80" />
          </div>

          {/* Nevicata fitta e a fiocchi grandi: è il primo colpo d'occhio sul sito */}
          {natale && <Neve className="absolute inset-0 z-104" densita={3.5} scala={3.2} />}

          {/* 2. PORTA SINISTRA */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1], delay: 2 }}
            className="absolute inset-y-0 left-0 w-1/2 bg-black/60 z-102 "
          />

          {/* 3. PORTA DESTRA */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1], delay: 2 }}
            className="absolute inset-y-0 right-0 w-1/2 bg-black/60 z-102 "
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="relative z-103 flex flex-col items-center"
          >
            <div className="relative w-40 h-40 mb-6">
              <Image
                src="/logo_petti.png"
                alt="Logo Petti Beverage"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-contain"
              />
              {natale && (
                <CappelloNatale className="absolute right-1 -top-3 w-20 rotate-16 drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)]" />
              )}
            </div>

            <p className="text-5xl md:text-7xl font-serif font-bold tracking-tighter gold-gradient text-center">
              PETTI BEVERAGE
            </p>

            <div className="flex items-center gap-4 mt-4 w-full justify-center">
              <div className="h-px w-12 bg-gold/50" />
              <p className="text-gold-light text-xs tracking-[0.4em] uppercase font-light">
                DRINK GOOD, DRINK PETTI
              </p>
              <div className="h-px w-12 bg-gold/50" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
