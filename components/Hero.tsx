import { ArrowRight, Truck, Award, Clock } from "lucide-react";

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
        <source src="/videos/champagne.mp4" type="video/mp4" />
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
            La distribuzione di{" "}
            <span className="gold-gradient">bevande premium</span> per il tuo
            business.
          </h1>

          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            Forniamo bar, ristoranti e hotel con i migliori brand sul mercato.
            Logistica impeccabile e prezzi competitivi direttamente alla tua
            porta.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button className="cursor-pointer flex items-center justify-center gap-2 btn-custom px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105">
              Esplora il Catalogo <ArrowRight size={20} />
            </button>
            <button className="cursor-pointer flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold transition-all">
              Richiedi Listino
            </button>
          </div>

          {/* Icone Vantaggi */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3 text-white">
              <Truck className="text-gold" size={24} />
              <span className="text-sm font-medium">Consegna in 24h</span>
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
