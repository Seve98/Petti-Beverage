"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { getProductBySlug } from "@/lib/api-products";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import { ArrowLeft, Share2, ShieldCheck } from "lucide-react"; // Per un tocco più pro
import Link from "next/link";

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, setIsCartOpen } = useCart(); // Aggiunto setIsCartOpen

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductBySlug(slug);
        if (!data) return notFound();
        setProduct(data);
      } catch (error) {
        console.error("Errore caricamento:", error);
      } finally {
        setLoading(false);
      }
    }
    if (slug) loadProduct();
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-black" />;
  if (!product) return notFound();

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setIsCartOpen(true); // 👈 Apre la sidebar automaticamente al click
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: product?.nome,
      text: `Guarda questo prodotto su Petti Beverage: ${product?.nome}`,
      url: window.location.href, // Prende l'URL esatto della pagina corrente
    };

    try {
      // Prova a usare la condivisione nativa del sistema (Mobile/Safari)
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copia il link negli appunti se la condivisione nativa non è disponibile
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copiato negli appunti!");
      }
    } catch (err) {
      console.log("Errore nella condivisione:", err);
    }
  };
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Pulsante Torna Indietro */}
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 text-gold/60 hover:text-gold mb-8 transition-colors text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Torna al Catalogo
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* Immagine con Badge Formato */}
          <div className="relative aspect-3/4 bg-black border border-gold/10 rounded-2xl overflow-hidden shadow-2xl group">
            {product.formato && (
              <div className="absolute top-6 left-6 z-10">
                <span className="bg-black/60 backdrop-blur-md text-gold text-xs px-4 py-2 border border-gold/20 rounded-full font-bold tracking-widest uppercase">
                  Formato: {product.formato}
                </span>
              </div>
            )}

            {product.immagine_url && (
              <Image
                src={product.immagine_url}
                alt={product.nome}
                fill
                className="object-contain p-8 transition-transform duration-1000 group-hover:scale-110"
                priority
              />
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-start pt-4">
            <div className="flex justify-between items-start">
              <span className="text-gold uppercase tracking-[0.4em] font-bold text-xs mb-4">
                {product.categoria}
              </span>
              <button
                onClick={handleShare}
                className="text-gold/40 hover:text-gold transition-colors"
                title="Condividi Prodotto"
              >
                <Share2 size={20} />
              </button>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif gold-gradient mb-6 uppercase leading-tight font-black">
              {product.nome}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="text-4xl font-mono text-white font-bold">
                €{Number(product.prezzo).toFixed(2)}
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-widest border-l border-gray-800 pl-4">
                Iva Inclusa
              </span>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light italic border-l-2 border-gold/20 pl-6">
              {product.descrizione ||
                "Un'eccellenza selezionata con cura per garantire un'esperienza sensoriale unica, tipica della tradizione Petti Beverage."}
            </p>

            <button
              onClick={handleAddToCart}
              className="w-full py-5 bg-gold text-black font-bold uppercase tracking-[0.3em] hover:bg-white transition-all shadow-lg active:scale-95 mb-8"
            >
              Aggiungi al Carrello
            </button>

            {/* Garanzie - Tocco Luxury */}
            <div className="grid grid-cols-2 gap-4 border-t border-gold/10 pt-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-gold" size={18} />
                <span className="text-[10px] uppercase tracking-widest text-gray-400">
                  Originalità Garantita
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src="/logo_petti.png"
                  width={25}
                  height={25}
                  alt="Small logo"
                  className=""
                />
                <span className="text-[10px] uppercase tracking-widest text-gray-400">
                  Qualità Petti dal 1960
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
