// Unica fonte per costi e soglia di spedizione: la usano checkout (client e server),
// pagina /spedizioni, dati strutturati SEO e la home di Natale.
export const COSTO_SPEDIZIONE = 6.99;
export const SOGLIA_SPEDIZIONE_GRATIS = 150;

/** Costo di spedizione per un ordine di questo importo (in euro). */
export function costoSpedizione(totale: number) {
  return totale >= SOGLIA_SPEDIZIONE_GRATIS ? 0 : COSTO_SPEDIZIONE;
}
