"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function PromoBanner() {
  const [mounted, setMounted] = useState(false);

  // Evitiamo il mismatch caricando l'animazione solo dopo il mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-10 bg-gold w-full" />; // Placeholder invisibile per il server

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full bg-[#C5A059] py-2 px-4 overflow-hidden border-b border-black/10"
    >
      {/* Animazione Shimmer usando classi Tailwind arbitrarie */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
        style={{
          animation: "shimmer 3s infinite",
        }}
      />

      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 relative z-10">
        <Sparkles
          size={12}
          className="text-black/60 animate-pulse hidden sm:block"
        />

        <p className="text-[11px] md:text-[13px] font-black uppercase tracking-[0.4em] text-black text-center leading-none">
          Grand Opening Event <span className="mx-2 opacity-20">|</span>
          <span className="italic">
            15% di sconto già applicato a tutto il catalogo
          </span>
          <span className="mx-2 opacity-20">|</span> Solo per il periodo di
          lancio
        </p>

        <Sparkles
          size={12}
          className="text-black/60 animate-pulse hidden sm:block"
        />
      </div>

      {/* Inject dei keyframes senza styled-jsx per evitare il mismatch dei nomi classi */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `,
        }}
      />
    </motion.div>
  );
}
