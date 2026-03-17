"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import AddProductModal from "@/components/admin/AddProductModal";

export default function AdminCatalogo() {
  const [prodotti, setProdotti] = useState<any[]>([]);
  const [categorie, setCategorie] = useState<any[]>([]); // Stato per le categorie dal DB
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Fetch dei prodotti
  const fetchProdotti = useCallback(async () => {
    const { data, error } = await supabase
      .from("prodotti")
      .select("*")
      .order("creato_il", { ascending: false });

    if (!error) setProdotti(data || []);
    setLoading(false);
  }, []);

  // 2. Fetch delle categorie
  const fetchCategorie = useCallback(async () => {
    const { data, error } = await supabase
      .from("categorie")
      .select("*")
      .order("nome", { ascending: true });

    if (!error) setCategorie(data || []);
  }, []);

  // Caricamento iniziale
  useEffect(() => {
    fetchProdotti();
    fetchCategorie();
  }, [fetchProdotti, fetchCategorie]);

  return (
    <div className="min-h-screen mt-20 bg-black p-4 md:p-10">
      {/* Header Sezione */}
      <div className="flex justify-between items-end mb-10 border-b border-gold/20 pb-6">
        <div>
          <span className="text-signature text-white text-2xl">Gestione</span>
          <h1 className="text-5xl font-serif gold-gradient uppercase tracking-tighter">
            Catalogo Prodotti
          </h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-custom cursor-pointer"
        >
          + Aggiungi Bottiglia
        </button>
      </div>

      {/* Tabella Prodotti */}
      <div className="overflow-x-auto rounded-lg border border-gold/10 bg-clay/30 backdrop-blur-sm">
        <table className="table w-full">
          <thead className="text-gold font-serif uppercase tracking-widest text-xs">
            <tr className="border-b border-gold/20">
              <th className="p-4">Immagine</th>
              <th>Prodotto</th>
              <th>Categoria</th>
              <th>Prezzo</th>
              <th>Stock</th>
              <th className="text-right p-4">Azioni</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-10 font-serif animate-pulse"
                >
                  Caricamento prodotti di elite...
                </td>
              </tr>
            ) : prodotti.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-10 text-gold/50 font-serif italic"
                >
                  Nessun prodotto nel catalogo.
                </td>
              </tr>
            ) : (
              prodotti.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4">
                    <div className="w-12 h-16 bg-black rounded border border-gold/10 overflow-hidden relative shadow-lg">
                      {p.immagine_url ? (
                        <Image
                          src={p.immagine_url}
                          alt={p.nome}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gold/40 text-center leading-tight">
                          NO
                          <br />
                          IMG
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="font-bold text-white uppercase tracking-tight">
                    {p.nome}
                  </td>
                  <td>
                    <span className="badge badge-outline border-gold/30 text-gold text-[10px] px-2 py-3 uppercase tracking-wider">
                      {p.categoria}
                    </span>
                  </td>
                  <td className="font-mono text-gold-light">
                    €{p.prezzo?.toFixed(2)}
                  </td>
                  <td>
                    <span
                      className={`text-xs font-bold ${p.stock < 5 ? "text-red-400" : "text-green-400"}`}
                    >
                      {p.stock} unità
                    </span>
                  </td>
                  <td className="text-right p-4">
                    <button className="btn btn-ghost btn-xs text-gold hover:bg-gold/10 transition-all">
                      Modifica
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Il Modal con passaggio categorie dinamiche */}
      <AddProductModal
        isOpen={isModalOpen}
        categorie={categorie}
        onClose={() => {
          setIsModalOpen(false);
          fetchProdotti(); // Refresh automatico dopo l'aggiunta
        }}
      />
    </div>
  );
}
