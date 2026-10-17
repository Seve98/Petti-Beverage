import type { Metadata } from "next";
import CatalogoClient from "./CatalogoClient";
import { getProducts } from "@/lib/api-products";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Catalogo Bevande Premium",
  description:
    "Sfoglia il catalogo Petti Beverage: gin, rum, whisky, vodka, champagne, prosecco, grappe e amari. Ingrosso bevande premium a Lucera con spedizione in 24/48h.",
  path: "/catalogo",
});

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const [{ search }, products] = await Promise.all([
    searchParams,
    getProducts(),
  ]);

  return <CatalogoClient products={products} initialSearch={search || ""} />;
}
