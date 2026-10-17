import type { Metadata } from "next";
import BusinessClient from "./BusinessClient";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Fornitura Ho.Re.Ca. per Aziende",
  description:
    "Fornitura di bevande premium per bar, ristoranti, hotel ed eventi. Listini dedicati, consegne rapide e assistenza per partite IVA da Petti Beverage, Lucera.",
  path: "/business",
});

export default function BusinessPage() {
  return <BusinessClient />;
}
