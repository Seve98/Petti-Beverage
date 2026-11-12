import type { CSSProperties } from "react";
import { STELLA } from "./Scintilla";
import stili from "./natale.module.css";

/** Filo d'oro sotto i titoli con una stella al centro: le linee si disegnano entrando in vista. */
export default function Fregio({ centrato = false }: { centrato?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`mt-3 flex items-center gap-2 ${centrato ? "justify-center" : ""}`}
    >
      {centrato ? (
        <span
          className={`h-px w-14 bg-linear-to-l from-[#d4af37] to-transparent ${stili.fregioLinea}`}
          style={{ "--origine": "right" } as CSSProperties}
        />
      ) : null}
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" focusable="false">
        <path d={STELLA} fill="#e6c35a" />
      </svg>
      <span
        className={`h-px w-14 bg-linear-to-r from-[#d4af37] to-transparent md:w-24 ${stili.fregioLinea}`}
        style={{ "--origine": "left" } as CSSProperties}
      />
    </div>
  );
}
