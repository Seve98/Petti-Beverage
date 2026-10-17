import type { Metadata } from "next";
import ChiSiamoClient from "./ChiSiamoClient";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Chi Siamo",
  description:
    "Dal 1960 Petti Beverage distribuisce bevande premium a Lucera: la nostra storia, il magazzino e il servizio per privati e Ho.Re.Ca.",
  path: "/chi-siamo",
  image: "/chisiamo.jpeg",
});

export default function ChiSiamoPage() {
  return <ChiSiamoClient />;
}
