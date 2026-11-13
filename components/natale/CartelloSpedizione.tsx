import type { CSSProperties } from "react";
import { Truck } from "lucide-react";
import { SOGLIA_SPEDIZIONE_GRATIS } from "@/lib/spedizione";
import stili from "./natale.module.css";

// Cartello "Spedizione gratuita" appeso alla ghirlanda capovolta: due cordini partono da un
// punto fra i rami e reggono un cartoncino come i cartellini "Idea regalo". Ondeggia piano
// attorno al punto in alto, così fa parte della decorazione invece di tagliarla.
export default function CartelloSpedizione() {
  return (
    <div className="pointer-events-none relative z-20 -mt-10 flex justify-center px-5 md:-mt-14">
      <div
        style={{ "--perno": "50% 0", "--ritardo": "-1.2s" } as CSSProperties}
        className={`flex flex-col items-center ${stili.ondeggia}`}
      >
        {/* Cordini a V dal chiodo fra i rami ai due forellini del cartello */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          className="h-16 w-[min(78vw,340px)] md:h-20 md:w-[420px]"
        >
          <path
            d="M50 0 L16 40 M50 0 L84 40"
            fill="none"
            stroke="#eadbb5"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="50" cy="1.5" r="1.6" fill="#b98f22" vectorEffect="non-scaling-stroke" />
        </svg>

        <p className="relative -mt-1 flex w-[min(86vw,380px)] items-center justify-center gap-3 rounded-md bg-[linear-gradient(170deg,#fbf6e8,#e9dcbc)] px-5 pb-3.5 pt-4 shadow-[0_14px_26px_-8px_rgba(0,0,0,0.7)] ring-1 ring-[#b98f22]/40 md:w-[470px] md:gap-4 md:px-8 md:pb-4 md:pt-5">
          {/* Forellini dove passano i cordini */}
          <span aria-hidden="true" className="absolute left-[16%] top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#5c4a2e]/60" />
          <span aria-hidden="true" className="absolute left-[84%] top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#5c4a2e]/60" />

          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#7d1622] text-[#f1dfa8] md:h-12 md:w-12">
            <Truck aria-hidden="true" className="h-5 w-5 md:h-6 md:w-6" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold uppercase tracking-[0.16em] text-[#7d1622] md:text-lg">
              Spedizione gratuita
            </span>
            <span className="font-serif text-base italic text-[#5c4a2e] md:text-xl">
              sopra i <strong className="font-bold not-italic text-[#7d1622]">{SOGLIA_SPEDIZIONE_GRATIS} €</strong> di spesa
            </span>
          </span>
        </p>
      </div>
    </div>
  );
}
