import type { CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import Ghirlanda from "./Ghirlanda";
import Scintilla from "./Scintilla";
import VideoNatale from "./VideoNatale";
import stili from "./natale.module.css";

const ritardo = (ms: number) => ({ "--ritardo": `${ms}ms` }) as CSSProperties;

// Testi forniti dal cliente. La percentuale va dimostrata dai prezzi in offerta prima di pubblicare.

export default function HeroNatale() {
  // A tutto schermo: la ghirlanda capovolta che segue si sovrappone al bordo basso (vedi HomeNatale).
  return (
    <div className="relative overflow-hidden bg-[#13110d]">
      <VideoNatale />

      {/* Il video sfuma nel nero del sito: a sinistra per il testo, sotto verso le offerte */}
      <div className="absolute inset-0 bg-[#13110d]/60 lg:bg-transparent lg:bg-linear-to-r lg:from-[#13110d] lg:from-25% lg:via-[#13110d]/70 lg:via-50% lg:to-transparent lg:to-80%" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#13110d] to-transparent" />

      {/* In cima la navbar è nascosta (compare allo scroll): la ghirlanda pende dal bordo della pagina */}
      <div className="absolute inset-x-0 top-0 z-10">
        <Ghirlanda />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center px-5 pb-24 pt-24 md:px-8 lg:pb-28">
        <p className="relative self-start font-serif text-[2.6rem] italic leading-none text-[#e6c35a] sm:text-5xl md:text-7xl">
          <span className={`inline-block pr-2 ${stili.scrittura}`}>Merry Christmas</span>
          <Scintilla className="-left-5 -top-4 h-5 w-5 md:h-7 md:w-7" ritardo="1.9s" />
          <Scintilla className="-right-4 top-0 h-4 w-4 md:h-6 md:w-6" ritardo="2.6s" durata="3.4s" />
          <Scintilla className="-bottom-3 right-[30%] h-3 w-3 md:h-4 md:w-4" ritardo="3.2s" durata="2.4s" />
          <Scintilla className="left-[42%] -top-5 h-2.5 w-2.5 md:h-3.5 md:w-3.5" ritardo="2.2s" durata="3.8s" />
        </p>

        <h1 style={ritardo(1300)} className={`mt-5 ${stili.entra}  font-serif text-4xl font-bold leading-tight tracking-tight text-[#f4eee1] md:text-6xl`}>
          Offerte Natale 2026
        </h1>

        <p style={ritardo(1550)} className={`mt-6 ${stili.entra} text-sm font-bold uppercase tracking-[0.18em] text-[#e6c35a] md:text-base`}>
          Le migliori bottiglie
        </p>

        <p style={ritardo(1700)} className={`mt-2 max-w-[38ch] ${stili.entra} text-lg leading-relaxed text-[#ddd4c2] md:text-xl`}>
          Champagne, rum, whisky, gin ai prezzi più bassi del web. Approfittane ora.
        </p>

        <p style={ritardo(1850)} className={`mt-6 self-start ${stili.entra} flex items-baseline gap-3 text-[#e6c35a]`}>
          <span className="font-serif text-5xl font-bold leading-none tracking-tight md:text-6xl">50/60%</span>
          <span className="text-sm font-bold uppercase tracking-[0.22em] text-[#d8c79d] md:text-base">ribassi</span>
        </p>

        <span style={ritardo(2050)} className={`mt-8 self-start ${stili.entra}`}>
        <a
          href="#offerte"
          className={`${stili.lucido} inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-b from-[#f0d886] via-[#d9b444] to-[#b98f22] shadow-[inset_0_1px_0_rgba(255,250,225,0.8),0_6px_14px_-6px_rgba(0,0,0,0.7)] px-7 py-3.5 font-bold text-[#13110d] transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0d77a]`}
        >
          Vedi le offerte{" "}
          <ArrowDown size={20} aria-hidden="true" className={stili.invito} />
        </a>
        </span>
      </div>
    </div>
  );
}
