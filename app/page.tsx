import HomeStandard from "@/components/HomeStandard";
import HomeNatale from "@/components/natale/HomeNatale";
import { getOfferte, getProducts } from "@/lib/api-products";
import { isPeriodoNatalizio } from "@/lib/natale";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// Prodotti rigenerati al massimo ogni ora senza bisogno di rebuild
export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  description:
    "Fornitore leader di bevande premium per privati e aziende dal 1960. Ampia selezione di gin, toniche e beverage di alta qualità. Drink Good, Drink Petti",
  path: "/",
});

export default async function Home() {
  const natale = isPeriodoNatalizio();
  const [products, offerte] = await Promise.all([
    getProducts({ limit: 10, orderBy: "creato_il", ascending: false }),
    natale ? getOfferte() : Promise.resolve([]),
  ]);

  return natale ? (
    // Senza offerte impostate nel DB la vetrina mostra gli ultimi arrivi, come prima
    <HomeNatale products={offerte.length > 0 ? offerte : (products ?? [])} />
  ) : (
    <HomeStandard products={products ?? []} />
  );
}
