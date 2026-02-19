"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Link as ChainIcon } from "lucide-react";

// Deve esserci "export default"
export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Contenuto della pagina che abbiamo scritto prima... */}
      <motion.div
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="flex flex-col items-center origin-top mb-8"
      >
        <ChainIcon className="text-slate-400 -mb-2" size={40} />
        <div className="w-1 h-8 bg-slate-300" />
        <motion.div className="bg-amber-400 text-slate-900 font-jakarta font-black px-6 py-3 rounded-lg shadow-2xl border-4 border-slate-900">
          LAVORI IN CORSO
        </motion.div>
      </motion.div>

      <div className="text-center">
        <h2 className="text-3xl font-jakarta font-bold text-slate-800 mb-6">
          Sezione in allestimento
        </h2>
        <Link
          href="/"
          className="bg-blue-600 text-white font-jakarta font-bold px-8 py-4 rounded-xl inline-block"
        >
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}
