"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// 1. Importiamo i dati dal JSON e il componente card
import productsData from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/context/CartContext";

// Tipizziamo i dati per TypeScript
const products = productsData as Product[];
const categories = ["Tutti", "Birre", "Acque", "Vini", "Soft Drinks"];

export default function CatalogoPage() {
  const [filter, setFilter] = useState("Tutti");

  const filteredProducts =
    filter === "Tutti"
      ? products
      : products.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-slate-50 pt-32">
      {" "}
      {/* Aumentato il pt per la Navbar */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Intestazione */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-5xl font-jakarta font-black mb-4 text-slate-900">
            Il Nostro Catalogo
          </h1>
          <p className="text-slate-500 font-inter text-lg max-w-2xl">
            Esplora la nostra selezione premium di bevande per il tuo business.
            Qualità garantita e consegna rapida.
          </p>
        </div>

        {/* Filtri - Resi più eleganti */}
        <div className="flex flex-wrap gap-3 mb-16 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full font-jakarta font-bold text-sm transition-all duration-300 ${
                filter === cat
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-200 scale-105"
                  : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Griglia Prodotti - Ora usa ProductCard */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "circOut" }}
              >
                {/* Usiamo il componente centralizzato */}
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stato Vuoto: se non ci sono prodotti in una categoria */}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-jakarta italic">
              Nessun prodotto trovato in questa categoria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
