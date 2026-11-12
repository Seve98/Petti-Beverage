import type { CSSProperties } from "react";
import stili from "./natale.module.css";

// Cartellino "Idea regalo" per le card del catalogo: stessa carta e forma di quello della home.
// Ondeggia attorno al forellino; `seme` (es. lo slug) sfasa le card vicine.
export default function CartellinoRegalo({ className = "", seme = "" }: { className?: string; seme?: string }) {
  const ritardo = -([...seme].reduce((somma, c) => somma + c.charCodeAt(0), 0) % 46) / 10;
  return (
    <span
      style={{ "--perno": "7px 50%", "--ritardo": `${ritardo}s` } as CSSProperties}
      className={`pointer-events-none ${className}`}
    >
      <span
        className={`relative inline-flex -rotate-[5deg] items-center gap-1.5 bg-[linear-gradient(170deg,#fbf6e8,#e9dcbc)] py-1 pl-4 pr-2.5 font-serif text-[10px] italic leading-none text-[#7d1622] shadow-[0_4px_8px_rgba(0,0,0,0.45)] [clip-path:polygon(12%_0,100%_0,100%_100%,12%_100%,0_50%)] md:text-xs ${stili.ondeggia}`}
      >
        <span aria-hidden="true" className="absolute left-[7px] h-1 w-1 rounded-full bg-[#5c4a2e]/60" />
        Idea regalo
      </span>
    </span>
  );
}
