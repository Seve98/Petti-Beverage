"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Il tempo totale prima che lo splash screen venga rimosso
    const timer = setTimeout(() => setIsVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          exit={{ pointerEvents: "none" }}
        >
          {/* Porta Sinistra */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1, ease: [0.45, 0, 0.55, 1], delay: 1.2 }}
            className="absolute inset-y-0 left-0 w-1/2 bg-slate-900 border-r border-blue-500/20"
          />

          {/* Porta Destra */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 1, ease: [0.45, 0, 0.55, 1], delay: 1.2 }}
            className="absolute inset-y-0 right-0 w-1/2 bg-slate-900 border-l border-blue-500/20"
          />

          {/* Logo Centrale che appare e scompare */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="relative z-[101] flex flex-col items-center"
          >
            <div className="bg-blue-600 p-4 rounded-2xl shadow-2xl mb-4">
              <ShoppingBag size={48} className="text-white" />
            </div>
            <h2 className="text-white text-2xl font-bold tracking-tighter">
              PETTI BEVERAGE
            </h2>
            <p className="text-blue-400 text-xs tracking-[0.3em] uppercase mt-2">
              Dal 1960
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
