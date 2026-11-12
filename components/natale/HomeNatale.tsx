import HomeSearchBar from "@/components/HomeSearchBar";
import { Product } from "@/types/product";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { ArrowRight, Snowflake } from "lucide-react";
import Fregio from "./Fregio";
import Scintilla from "./Scintilla";
import stili from "./natale.module.css";
import HeroNatale from "./HeroNatale";
import Neve from "./Neve";
import Ghirlanda from "./Ghirlanda";
import GrigliaNatale from "./GrigliaNatale";

// Sovrascrive --font-serif solo dentro la home natalizia
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export default function HomeNatale({ products }: { products: Product[] }) {
  return (
    <main
      // -mt-10 annulla il margine globale del layout: senza navbar in cima la ghirlanda tocca il bordo
      className={`${playfair.variable} -mt-10 min-h-[100dvh] overflow-x-hidden bg-[#13110d]`}
    >
      <Neve />
      <HeroNatale />

      {/* Ghirlanda capovolta: sale sopra il fondo del video (margine negativo = sua altezza)
          e "appoggia" sulla vetrina offerte */}
      <div className="relative z-10 -mt-[clamp(78px,8.5vw,138px)]">
        <Ghirlanda capovolta />
      </div>

      <section
        id="offerte"
        className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-5 pt-6 md:px-8"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e6c35a]">
              Best seller
            </p>
            <h2 className="relative mt-2 font-serif text-4xl font-bold text-[#f4eee1] md:text-5xl">
              Le offerte di Natale
              <Scintilla className="-right-6 -top-2 h-4 w-4" ritardo="0.8s" durata="3.2s" />
            </h2>
            <Fregio />
          </div>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#e6c35a] underline-offset-4 hover:underline"
          >
            <Snowflake size={16} aria-hidden="true" className={stili.giraSuHover} />
            Tutto il catalogo
          </Link>
        </div>

        {products.length > 0 ? (
          <>
            <GrigliaNatale products={products} />
            <div className="mt-12 flex justify-center">
              <Link
                href="/promozioni"
                className="group inline-flex items-center gap-3 rounded-full border border-[#d4af37]/60 px-7 py-3.5 font-serif text-lg font-bold text-[#f4eee1] transition-colors hover:border-[#f0d77a] hover:bg-[#d4af37]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0d77a]"
              >
                Scopri tutte le altre nostre offerte
                <ArrowRight size={18} aria-hidden="true" className="text-[#e6c35a] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </>
        ) : (
          <p className="mt-10 text-[#cfc5b0]">
            Le offerte stanno arrivando: intanto esplora il catalogo.
          </p>
        )}
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-28 md:px-8">
        <div className="mx-auto mt-20 max-w-xl text-center">
          <h2 className="font-serif text-2xl font-bold text-[#f4eee1] md:text-3xl">
            Cerchi un&#8217;altra bottiglia?
          </h2>
          <Fregio centrato />
          <div className="relative w-full pt-14">
            <HomeSearchBar placeholder="Cerca gin, rum, whisky…" />
          </div>
        </div>
      </section>
    </main>
  );
}
