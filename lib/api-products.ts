import { supabase } from "@/lib/supabase";

export interface Product {
  id: string;
  nome: string;
  slug: string;
  prezzo: number;
  immagine_url: string;
  categoria: string;
  descrizione?: string;
  attivo: boolean;
  creato_il: string;
  formato?: string;
  prezzo_offerta?: number | null;
  offerta_ordine?: number | null;
}

/**
 * Recupera i prodotti dal database con filtri opzionali
 */

export async function getProducts(options?: {
  limit?: number;
  category?: string;
  orderBy?: string;
  ascending?: boolean;
  onlyActive?: boolean;
}) {
  let query = supabase
    .from("prodotti")
    .select("*")
    .order("creato_il", { ascending: false });

  if (options?.onlyActive !== false) {
    query = query.eq("attivo", true);
  }

  if (options?.category) {
    query = query.eq("categoria", options.category);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Errore Fetch Prodotti:", error.message);
    return [];
  }

  return data as Product[];
}

/**
 * Recupera un singolo prodotto tramite slug
 */
export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("prodotti")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Product;
}

/**
 * Prodotti della vetrina offerte, nell'ordine scelto (colonna offerta_ordine).
 * Se le colonne non esistono ancora o la query fallisce restituisce [].
 */
export async function getOfferte() {
  const { data, error } = await supabase
    .from("prodotti")
    .select("*")
    .eq("attivo", true)
    .not("offerta_ordine", "is", null)
    .order("offerta_ordine", { ascending: true });

  if (error) {
    console.error("Errore Fetch Offerte:", error.message);
    return [];
  }

  return data as Product[];
}
