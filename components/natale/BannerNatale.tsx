import { Gift } from "lucide-react";
import { ULTIMO_ORDINE_NATALE } from "@/lib/natale";

// Striscia sotto la navbar, su tutte le pagine finché si fa in tempo per Natale.
// Alta 32px fissi. Sulla home di Natale sparisce con la navbar finché non si scorre.
export default function BannerNatale() {
  return (
    <div className="flex h-8 items-center justify-center gap-2 border-t border-gold/15 bg-[linear-gradient(90deg,#4a0c14,#7d1622_50%,#4a0c14)] px-4 text-[#f1dfa8]">
      <Gift size={13} aria-hidden="true" className="shrink-0" />
      <p className="truncate text-[10.5px] font-bold uppercase tracking-[0.1em] sm:text-[11px] sm:tracking-[0.16em] md:text-xs md:tracking-[0.24em]">
        Ordina entro il {ULTIMO_ORDINE_NATALE}
        <span className="mx-2 opacity-50">·</span>
        <span className="font-medium normal-case italic tracking-normal">
          <span className="sm:hidden">arriva per Natale</span>
          <span className="hidden sm:inline">arriva in tempo per Natale</span>
        </span>
      </p>
    </div>
  );
}
