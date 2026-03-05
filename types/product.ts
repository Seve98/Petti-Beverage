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
}
