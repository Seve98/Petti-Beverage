"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function PromoBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full bg-gold py-5 px-4 overflow-hidden border-b border-black/10"
    >
      {/* Effetto luce (Shimmer) più visibile su oro */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 relative z-10">
        <Sparkles
          size={12}
          className="text-black/60 animate-pulse hidden sm:block"
        />

        <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] text-black text-center leading-none">
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

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </motion.div>
  );
}
