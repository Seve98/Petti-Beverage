import { ArrowRight, Truck, Award, Clock } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative w-full bg-slate-900 py-20 md:py-32 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Il tuo browser non supporta il formato video.
      </video>
      <div className=" absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 ">
        <div className="max-w-2xl">
          {/* Badge Anniversario */}
          <div className="inline-flex items-center gap-2 bg-black border-2 border-gold  px-3 py-1 rounded-full mb-6">
            <span className="w-2 h-2 border-2 border-gold bg-black rounded-full animate-pulse" />
            <span className="text-gold  text-xs font-bold uppercase tracking-widest">
              Oltre 60 anni di esperienza
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Il lusso alla{" "}
            <span className="gold-gradient">portata di tutti</span>.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-slate-300 leading-relaxed font-light">
            Esplora la nostra selezione esclusiva dove le migliori etichette sul
            mercato incontrano la convenienza dei prezzi stock. Che tu sia un{" "}
            <strong>privato</strong> alla ricerca della bottiglia perfetta per
            un'occasione speciale o un <strong> rivenditore </strong>
            che vuole offrire il meglio ai propri clienti, qui troverai la
            qualità che cerchi senza compromessi.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/catalogo"
              className="cursor-pointer flex items-center justify-center gap-2 btn-custom px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105"
            >
              Esplora il Catalogo <ArrowRight size={20} />
            </Link>
            <Link
              href="/business"
              className="cursor-pointer flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold transition-all"
            >
              Esplora l&#39;Area Business
            </Link>
          </div>

          {/* Icone Vantaggi */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3 text-white">
              <Truck className="text-gold" size={24} />
              <span className="text-sm font-medium">Consegna Rapida</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Award className="text-gold" size={24} />
              <span className="text-sm font-medium">Qualità Certificata</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Clock className="text-gold" size={24} />
              <span className="text-sm font-medium">Supporto 7/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
