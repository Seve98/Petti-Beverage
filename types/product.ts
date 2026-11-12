export interface Product {
  id: string;
  nome: string;
  prezzo: number;
  immagine_url: string | null;
  slug: string;
  categoria: string;
  descrizione?: string;
  isNew?: boolean;
  isPromo?: boolean;
  attivo?: boolean;
  formato?: string;
  /** Prezzo scontato; null = nessuno sconto. */
  prezzo_offerta?: number | null;
  /** Posizione nella vetrina offerte della home; null = non in offerta. */
  offerta_ordine?: number | null;
}

/** Prezzo da far pagare: l'offerta se c'è ed è più bassa del prezzo pieno. */
export function prezzoEffettivo(p: Pick<Product, "prezzo" | "prezzo_offerta">) {
  const offerta = p.prezzo_offerta == null ? null : Number(p.prezzo_offerta);
  const pieno = Number(p.prezzo);
  return offerta != null && offerta > 0 && offerta < pieno ? offerta : pieno;
}

/** Vero se il prodotto è nella vetrina offerte (colonna offerta_ordine valorizzata). */
export function inOfferta(p: Pick<Product, "offerta_ordine">) {
  return p.offerta_ordine != null;
}

/**
 * Vero se c'è un prezzo pieno da barrare. Il barrato si mostra solo in catalogo e nella
 * scheda prodotto: nella vetrina offerte della home il cliente vuole solo il prezzo finale.
 */
export function haSconto(p: Pick<Product, "prezzo" | "prezzo_offerta">) {
  return prezzoEffettivo(p) < Number(p.prezzo);
}
