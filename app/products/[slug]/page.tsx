import { getProductBySlug, getProducts } from "@/lib/api-products";
import ProductClient from "./ProductClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SITE_NAME, SITE_URL, jsonLd, pageMetadata } from "@/lib/seo";

// 1. Rendiamo il tutto statico per i 500 prodotti, rigenerato ogni ora (prezzi aggiornati)
export const revalidate = 3600;

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
    return { title: "Prodotto non trovato" };
  }

  return pageMetadata({
    title: product.nome,
    description:
      product.descrizione ||
      `Scopri ${product.nome} su Petti Beverage. Ingrosso bevande premium a Lucera.`,
    path: `/products/${product.slug}`,
    image: product.immagine_url,
  });
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

  const url = `${SITE_URL}/products/${product.slug}`;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.nome,
    url,
    ...(product.immagine_url && { image: product.immagine_url }),
    ...(product.descrizione && { description: product.descrizione }),
    ...(product.categoria && { category: product.categoria }),
    sku: product.id,
    offers: {
      "@type": "Offer",
      url,
      price: product.prezzo,
      priceCurrency: "EUR",
      availability: product.attivo
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${SITE_URL}/#organization`, name: SITE_NAME },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(productJsonLd) }}
      />
      <ProductClient initialProduct={product} />
    </>
  );
}
