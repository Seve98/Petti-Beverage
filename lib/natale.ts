// Finestra in cui la home natalizia sostituisce quella standard.
// Fuori da queste date il sito torna da solo alla home di sempre (al massimo entro un'ora, per l'ISR).
const INIZIO = new Date("2026-11-01T00:00:00+01:00");
const FINE = new Date("2027-01-07T00:00:00+01:00");

export function isPeriodoNatalizio(ora: Date = new Date()) {
  return ora >= INIZIO && ora < FINE;
}

// Ultimo giorno utile per ordinare e ricevere prima di Natale.
// DA CONFERMARE col cliente: data di esempio.
export const ULTIMO_ORDINE_NATALE = "18 dicembre";
const SCADENZA_ORDINI = new Date("2026-12-19T00:00:00+01:00");

/** Vero finché un ordine fatto adesso arriva in tempo per Natale. */
export function consegnaPerNatale(ora: Date = new Date()) {
  return isPeriodoNatalizio(ora) && ora < SCADENZA_ORDINI;
}

// Prodotti col cartellino "Idea regalo" in catalogo e promozioni.
// Le stesse 10 offerte della vetrina in home (lista del cliente, novembre 2026).
const IDEE_REGALO = new Set([
  "rum-barcelo-imperial-cl70",
  "champagne-cristal-cl75-astuccio",
  "champagne-moet-imperial-magnum-lt-15",
  "rum-diplomatico-mantuano-cl70",
  "gin-mare-070",
  "chmapgne-moet-ice-cl-75",
  "rum-zacapa-23-solera-cl70",
  "rum-diplomatico-reserva-exclusiva-confezione-2-bicchieri",
  "champagne-moet-e-chandon-cl70",
  "rum-diplomatico-reserva-exclusiva-07",
]);

export function isIdeaRegalo(slug: string, ora: Date = new Date()) {
  return isPeriodoNatalizio(ora) && IDEE_REGALO.has(slug);
}
