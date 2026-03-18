import { getProductBySlug, getProducts } from "@/lib/api-products";
import ProductClient from "./ProductClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// 1. Rendiamo il tutto statico per i 500 prodotti
export async function generateStaticParams() {
  const products = await getProducts();
  if (!products) return [];
  return products.map((p: any) => ({
    slug: p.slug,
  }));
}

// 2. Metadata dinamici (con await su params per Next.js 15)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params; // <--- AGGIUNTO AWAIT
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Prodotto non trovato | Petti Beverage" };
  }

  return {
    title: `${product.nome} | Petti Beverage`,
    description:
      product.descrizione ||
      `Scopri ${product.nome} su Petti Beverage. Ingrosso bevande premium a Lucera.`,
    openGraph: {
      title: `${product.nome} | Petti Beverage`,
      description: product.descrizione,
      images: [product.immagine_url],
    },
  };
}

// 3. Pagina Dettaglio (con await su params)
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // <--- AGGIUNTO AWAIT
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductClient initialProduct={product} />;
}
