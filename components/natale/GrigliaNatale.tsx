import fs from "node:fs";
import path from "node:path";
import { Product } from "@/types/product";
import OffertaCard from "./OffertaCard";

/**
 * Bottiglia scontornata (PNG trasparente) preparata con scripts/scontorna.swift e salvata in
 * public/natale/bottiglie/ con il nome della foto originale (spazi -> trattini).
 * Se manca, la card usa la foto originale sfumata ai bordi.
 */
function bottigliaScontornata(url: string | null | undefined) {
  if (!url) return null;
  const file = decodeURIComponent(url.split("?")[0].split("/").pop() ?? "");
  const nome = file.replace(/\.[a-z0-9]+$/i, "").replace(/\s+/g, "-");
  if (!nome) return null;
  const relativo = `/natale/bottiglie/${nome}.png`;
  return fs.existsSync(path.join(process.cwd(), "public", relativo)) ? relativo : null;
}

// Come nello schizzo del cliente: griglia ferma, ogni bottiglia sul suo sfondo natalizio.
// 2 colonne su mobile, 5 da desktop: le 10 offerte fanno righe piene in entrambi i casi.
export const PRODOTTI_IN_GRIGLIA = 10;

export default function GrigliaNatale({ products }: { products: Product[] }) {
  return (
    <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-5 lg:gap-5">
      {products.slice(0, PRODOTTI_IN_GRIGLIA).map((prodotto, indice) => (
        <li key={prodotto.id}>
          <OffertaCard
            prodotto={prodotto}
            scontornata={bottigliaScontornata(prodotto.immagine_url)}
            // 4 sfondi su righe da 3 (o 2): righe vicine non ripetono la stessa sequenza
            sfondo={indice}
          />
        </li>
      ))}
    </ul>
  );
}
