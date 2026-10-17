import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/api-products";
import { SITE_URL } from "@/lib/seo";

// Rigenerata al massimo ogni ora: i prodotti nuovi entrano senza rebuild
export const revalidate = 3600;

const STATIC_PAGES: { path: string; priority: number }[] = [
  { path: "", priority: 1.0 },
  { path: "/catalogo", priority: 0.9 },
  { path: "/promozioni", priority: 0.7 },
  { path: "/chi-siamo", priority: 0.6 },
  { path: "/business", priority: 0.6 },
  { path: "/spedizioni", priority: 0.4 },
  { path: "/privacy-policy", priority: 0.2 },
  { path: "/termini-e-condizioni", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  return [
    ...STATIC_PAGES.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      priority,
    })),
    ...products.map((p) => ({
      url: `${SITE_URL}/products/${p.slug}`,
      lastModified: p.creato_il,
      priority: 0.8,
    })),
  ];
}
