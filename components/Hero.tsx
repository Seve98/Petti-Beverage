import { ArrowRight, Truck, Award, Clock } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative w-full bg-slate-900 py-20 md:py-32 overflow-hidden">
      {/* Immagine di Sfondo (Placeholder - puoi sostituirla con una tua foto reale) */}
      <div className="absolute inset-0 opacity-40">
        <img
          src="https://images.unsplash.com/photo-1563229284-8758bc664836?auto=format&fit=crop&q=80&w=2000"
          alt="Magazzino bevande"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="max-w-2xl">
          {/* Badge Anniversario */}
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 backdrop-blur-md px-3 py-1 rounded-full mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">
              Oltre 60 anni di esperienza
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            La distribuzione di{" "}
            <span className="text-blue-500">bevande premium</span> per il tuo
            business.
          </h1>

          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            Forniamo bar, ristoranti e hotel con i migliori brand sul mercato.
            Logistica impeccabile e prezzi competitivi direttamente alla tua
            porta.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105">
              Esplora il Catalogo <ArrowRight size={20} />
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold transition-all">
              Richiedi Listino
            </button>
          </div>

          {/* Icone Vantaggi */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3 text-white/80">
              <Truck className="text-blue-500" size={24} />
              <span className="text-sm font-medium">Consegna in 24h</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <Award className="text-blue-500" size={24} />
              <span className="text-sm font-medium">Qualità Certificata</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <Clock className="text-blue-500" size={24} />
              <span className="text-sm font-medium">Supporto 7/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
