"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product, prezzoEffettivo } from "@/types/product";
import { STELLA } from "./Scintilla";
import stili from "./natale.module.css";

function urlImmagine(url: string | null | undefined) {
  if (!url) return null;
  if (!url.includes("supabase.co")) return url;
  return `${url}?width=600&height=800&resize=contain`;
}

/** Ritardo stabile per prodotto, così i riflessi non passano su tutti i pulsanti insieme. */
function ritardoRiflesso(id: string) {
  let somma = 0;
  for (const c of id) somma = (somma * 31 + c.charCodeAt(0)) % 997;
  return `${1.5 + (somma % 40) / 10}s`;
}

// Sfondi fatti in EffectCraft (oro, abete, bordeaux, notte): luci fuori fuoco col centro libero
// Fiocco: foto Unsplash NrAv5nwdIrw scontornata (scripts/scontorna.swift) e ripulita dalla scatola.
const SFONDI = [
  "/natale/sfondo-1.jpg",
  "/natale/sfondo-2.jpg",
  "/natale/sfondo-3.jpg",
  "/natale/sfondo-4.jpg",
];

type Scintilla = { id: number; dx: string; dy: string; giro: string; lato: number };

/** Otto stelline che schizzano fuori dal pulsante in direzioni sparse. */
function nuovoScoppio(base: number): Scintilla[] {
  return Array.from({ length: 8 }, (_, i) => {
    const angolo = (i / 8) * Math.PI * 2 + Math.random() * 0.5;
    const distanza = 34 + Math.random() * 26;
    return {
      id: base + i,
      dx: `${Math.cos(angolo) * distanza}px`,
      dy: `${Math.sin(angolo) * distanza}px`,
      giro: `${Math.round(Math.random() * 180)}deg`,
      lato: 8 + Math.round(Math.random() * 6),
    };
  });
}

export default function OffertaCard({
  prodotto,
  sfondo = 0,
  scontornata = null,
}: {
  prodotto: Product;
  /** PNG trasparente della bottiglia: se c'è, la bottiglia sta in piedi sul tavolo del set. */
  scontornata?: string | null;
  /** Indice dello sfondo natalizio, ciclico. */
  sfondo?: number;
}) {
  const { addToCart, setIsCartOpen } = useCart();
  const immagine = urlImmagine(prodotto.immagine_url);
  // Solo il prezzo d'offerta, senza prezzo pieno barrato (scelta del cliente)
  const prezzo = prezzoEffettivo(prodotto).toFixed(2);
  const [scoppio, setScoppio] = useState<Scintilla[]>([]);
  const [aggiunto, setAggiunto] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const aggiungi = () => {
    addToCart(prodotto);
    setIsCartOpen(true);
    setScoppio(nuovoScoppio(Date.now()));
    setAggiunto(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setScoppio([]);
      setAggiunto(false);
    }, 1500);
  };

  return (
    <article className={`group relative flex h-full flex-col rounded-2xl ${stili.pacco} bg-[#1b1813] ring-1 ring-[#d4af37]/30 @container hover:shadow-[0_22px_40px_-18px_rgba(212,175,55,0.35)] hover:ring-[#d4af37]/70`}>
      <div className="relative isolate aspect-[3/4] overflow-hidden rounded-t-2xl bg-[#13110d]">
        <Image
          src={SFONDI[sfondo % SFONDI.length]}
          alt=""
          fill
          sizes="(min-width: 1024px) 380px, 50vw"
          className="-z-10 object-cover"
        />
        {/* Nastro di raso che taglia l'angolo, come una confezione regalo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[84%] top-[13%] z-10 h-[clamp(14px,6.5%,26px)] w-[95%] -translate-x-1/2 -translate-y-1/2 rotate-[37deg] bg-[linear-gradient(to_bottom,#6f0b16_0%,#b8172a_18%,#e2394a_42%,#f7707a_50%,#d42638_60%,#9b1022_86%,#5e0912_100%)] shadow-[0_3px_6px_rgba(0,0,0,0.35)]"
        />
        {scontornata ? (
          <>
            {/* Piano scuro in basso su cui poggia la bottiglia, poi l'ombra di contatto */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_62%,rgba(8,7,5,0.55)_78%,rgba(8,7,5,0.85)_100%)]"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-[10.5%] left-1/2 h-[4%] w-[44%] -translate-x-1/2 rounded-[50%] bg-black/55 blur-[6px]"
            />
            <div className="absolute inset-x-[14%] bottom-[11.5%] top-[9%] transition-transform duration-700 ease-out group-hover:-translate-y-1">
              <Image
                src={scontornata}
                alt={prodotto.nome}
                fill
                sizes="(min-width: 1024px) 280px, 36vw"
                className="object-contain object-bottom drop-shadow-[0_10px_14px_rgba(0,0,0,0.35)]"
              />
            </div>
          </>
        ) : (
          <>
            {/* Foto con il fondo nero: piano scuro in basso e bordi sfumati nello sfondo */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_55%,rgba(8,7,5,0.9)_82%)]"
            />
            {immagine ? (
              <Image
                src={immagine}
                alt={prodotto.nome}
                fill
                sizes="(min-width: 1024px) 380px, 50vw"
                className="object-contain transition-transform duration-700 ease-out [mask-image:radial-gradient(ellipse_44%_56%_at_50%_46%,#000_62%,transparent_100%),linear-gradient(to_bottom,#000_76%,transparent_90%)] [mask-composite:intersect] group-hover:scale-[1.03]"
              />
            ) : null}
          </>
        )}
      </div>

      {/* Stessa area dell'immagine ma senza overflow hidden: il fiocco può uscire dalla scheda */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-20 aspect-[3/4]">
        <div className="absolute left-[84%] top-[13%] w-[30%] max-w-[118px] -translate-x-1/2 -translate-y-1/2">
          {/* Cartellino legato al nodo: il filo parte da dietro il fiocco (47% = nodo) e scende
              oltre i nastri; le misure in % seguono la grandezza del fiocco */}
          {/* Filo e cartellino ondeggiano insieme attorno al nodo del fiocco */}
          <span
            className={`absolute inset-0 ${stili.ondeggia}`}
            style={{ "--perno": "41% 47%", "--ritardo": `${-(sfondo * 1.3) % 4.6}s` } as CSSProperties}
          >
            <span className="absolute left-[41%] top-[47%] h-[66%] w-[1.5px] -translate-x-1/2 bg-[#eadbb5] shadow-[0_0_1px_rgba(0,0,0,0.6)]" />
            <span className="absolute left-[41%] top-[110%] -translate-x-1/2">
              <span className="relative flex origin-top -rotate-[6deg] flex-col items-center bg-[linear-gradient(170deg,#fbf6e8,#e9dcbc)] px-2.5 pb-1.5 pt-3.5 text-center font-serif text-[10px] italic leading-tight text-[#7d1622] shadow-[0_5px_10px_rgba(0,0,0,0.4)] [clip-path:polygon(50%_0,100%_16%,100%_100%,0_100%,0_16%)] @[16rem]:px-3 @[16rem]:text-[12px]">
                <span className="absolute left-1/2 top-[6px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#5c4a2e]/60" />
                Idea
                <br />
                regalo
              </span>
            </span>
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/natale/oggetti/fiocco.png"
            alt=""
            loading="lazy"
            className="relative h-auto w-full drop-shadow-[0_8px_10px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-3 pb-4 pt-4 @[16rem]:px-5 @[16rem]:pb-5 @[16rem]:pt-6">
        <p className="text-xs text-[#b9ad94] @[16rem]:text-sm">
          {prodotto.categoria}
          {prodotto.formato ? `, ${prodotto.formato.toLowerCase()}` : ""}
        </p>
        <h3 className="mt-1 font-serif text-base font-bold leading-tight text-[#f4eee1] @[16rem]:text-xl">
          <Link
            href={`/products/${prodotto.slug}`}
            className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-[#f0d77a]"
          >
            {prodotto.nome}
          </Link>
        </h3>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-3 pt-4 @[16rem]:pt-6">
          <span className="font-serif text-xl font-bold text-[#e6c35a] @[16rem]:text-2xl">
            €{prezzo}
          </span>
          <span className="relative z-20 w-full shrink-0 @[16rem]:w-auto">
          <button
            type="button"
            onClick={aggiungi}
            style={{ "--ritardo": ritardoRiflesso(String(prodotto.id)) } as CSSProperties}
            aria-label={`Aggiungi ${prodotto.nome} al carrello`}
            className={`${stili.lucido} relative inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full @[16rem]:w-auto bg-linear-to-b from-[#f0d886] via-[#d9b444] to-[#b98f22] shadow-[inset_0_1px_0_rgba(255,250,225,0.8),0_6px_14px_-6px_rgba(0,0,0,0.7)] px-4 py-2.5 text-sm font-bold text-[#13110d] transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0d77a]`}
          >
            {aggiunto ? (
              <Check size={16} aria-hidden="true" className={stili.salto} />
            ) : (
              <ShoppingCart size={16} aria-hidden="true" />
            )}
            {aggiunto ? "Aggiunto" : "Aggiungi"}
          </button>
          {scoppio.map((s) => (
            <svg
              key={s.id}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className={`pointer-events-none absolute left-1/2 top-1/2 ${stili.scoppio}`}
              style={
                {
                  width: s.lato,
                  height: s.lato,
                  "--dx": s.dx,
                  "--dy": s.dy,
                  "--giro": s.giro,
                } as CSSProperties
              }
            >
              <path d={STELLA} fill="#f3d77c" />
            </svg>
          ))}
          </span>
        </div>
      </div>
    </article>
  );
}
