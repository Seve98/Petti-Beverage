import { getProductBySlug, getProducts } from "@/lib/api-products";
import ProductClient from "./ProductClient"; // Il tuo codice originale
import { notFound } from "next/navigation";

// QUESTO FA TROVARE I 500 PRODOTTI A NEXT-SITEMAP
export async function generateStaticParams() {
  const products = await getProducts(); // <--- Assicurati di avere questa funzione!
  return products.map((p: any) => ({ slug: p.slug }));
}

// QUESTO FA APPARIRE IL TITOLO CORRETTO SU GOOGLE
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Prodotto non trovato" };
  return {
    title: `${product.nome} | Petti Beverage`,
    description: product.descrizione,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  // Passiamo il prodotto già caricato dal server al tuo componente client
  return <ProductClient initialProduct={product} />;
}
