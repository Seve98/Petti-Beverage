"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasSeenSplash = sessionStorage.getItem("petti_splash_seen");

    if (!hasSeenSplash) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("petti_splash_seen", "true");
      }, 3500); // Il tuo tempo originale
      return () => clearTimeout(timer);
    }
  }, []);

  // Se siamo sul server o ha già visto lo splash, non renderizziamo nulla
  if (
    !isMounted ||
    (!isVisible && sessionStorage.getItem("petti_splash_seen"))
  ) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-black"
          exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.5 } }}
        >
          {/* 1. IL VIDEO DELLA VETRATA (Sfondo) */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-50"
            >
              <source src="/videos/video_vetrata.mp4" type="video/mp4" />
            </video>
            {/* Overlay gradiente per dare profondità */}
            <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black opacity-80" />
          </div>

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
            </div>

            <p className="text-white text-5xl md:text-7xl font-serif font-bold tracking-tighter gold-gradient text-center">
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
