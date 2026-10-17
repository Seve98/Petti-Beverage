import type { Metadata } from "next";

export const SITE_URL = "https://www.pettibeverage.com";
export const SITE_NAME = "Petti Beverage";
export const DEFAULT_TITLE = "Petti Beverage | Ingrosso Bevande Premium a Lucera";

export const DEFAULT_OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Petti Beverage - Ingrosso bevande premium a Lucera",
};

/**
 * Metadata standard per una pagina: title, description, canonical e Open Graph.
 * Il title viene completato dal template del layout ("%s | Petti Beverage").
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title?: string;
  description: string;
  path: string;
  image?: string | null;
}): Metadata {
  const ogTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;

  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "it_IT",
      type: "website",
      images: [image ? { url: image } : DEFAULT_OG_IMAGE],
    },
  };
}

/**
 * Serializza un oggetto JSON-LD evitando che "</script>" nei dati chiuda il tag.
 */
export function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// Allineata al punto 4 di /termini-e-condizioni (recesso 14 giorni, reso a carico del cliente)
export const returnPolicyJsonLd = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: "IT",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 14,
  returnMethod: "https://schema.org/ReturnByMail",
  returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LiquorStore",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: "Petti Pietro & Figli S.r.l.",
  vatID: "IT03511040713",
  url: SITE_URL,
  logo: `${SITE_URL}/logo_petti.png`,
  image: `${SITE_URL}/chisiamo.jpeg`,
  description:
    "Ingrosso e distribuzione di bevande premium a Lucera per privati e Ho.Re.Ca. dal 1960.",
  foundingDate: "1960",
  telephone: "+393886496737",
  email: "pettiordini@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Borgo San Matteo, 18",
    addressLocality: "Lucera",
    addressRegion: "FG",
    postalCode: "71036",
    addressCountry: "IT",
  },
  hasMerchantReturnPolicy: returnPolicyJsonLd,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "13:00",
    },
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "it-IT",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/catalogo?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

// Riconoscimento del brand dal nome prodotto (il DB non ha un campo brand).
// Ordine importante: vince la prima chiave contenuta nel nome.
const BRANDS: [string, string][] = [
  ["AMARO DEL CAPO", "Caffo"],
  ["JEFFERSON", "Amaro Jefferson"],
  ["MONTENEGRO", "Montenegro"],
  ["APEROL", "Aperol"],
  ["CA DEL BOSCO", "Ca' del Bosco"],
  ["CAMPARI", "Campari"],
  ["ARMAND DE BRIGNAC", "Armand de Brignac"],
  ["CRYSTAL", "Louis Roederer"],
  ["KRUG", "Krug"],
  ["LAURENT PERRIER", "Laurent-Perrier"],
  ["MOET", "Moët & Chandon"],
  ["MUMM", "Mumm"],
  ["POMMERY", "Pommery"],
  ["RUINART", "Ruinart"],
  ["VEUVE", "Veuve Clicquot"],
  ["DOM PERIGNON", "Dom Pérignon"],
  ["EL DORADO", "El Dorado"],
  ["ELEPHANT", "Elephant Gin"],
  ["ETSU", "Etsu"],
  ["FERRARI", "Ferrari Trento"],
  ["NORDES", "Nordés"],
  ["ADAMUS", "Adamus"],
  ["AMUERTE", "Amuerte"],
  ["BOMBAY", "Bombay Sapphire"],
  ["CITTADELLE", "Citadelle"],
  ["HENDRICK", "Hendrick's"],
  ["J ROSE", "J.Rose"],
  ["GIN MARE", "Gin Mare"],
  ["PORTOFINO", "Portofino Dry Gin"],
  ["ROKU", "Roku"],
  ["TANQUERAY", "Tanqueray"],
  ["18 LUNE", "Marzadro"],
  ["NARDINI", "Nardini"],
  ["POLI", "Poli"],
  ["SEGNANA", "Segnana"],
  ["ILLUSIONIST", "The Illusionist"],
  ["JACK DANIEL", "Jack Daniel's"],
  ["JAGERM", "Jägermeister"],
  ["LIMONCELLO STOCK", "Stock"],
  ["MACCALLAN", "The Macallan"],
  ["MONKEY", "Monkey 47"],
  ["BERLUCCHI", "Berlucchi"],
  ["PYRAT", "Pyrat"],
  ["ABUELO", "Ron Abuelo"],
  ["BUMBU", "Bumbu"],
  ["DICTADOR", "Dictador"],
  ["DIPLOMATICO", "Diplomático"],
  ["DON PAPA", "Don Papa"],
  ["DOS MADERAS", "Dos Maderas"],
  ["KRAKEN", "Kraken"],
  ["ZACAPA", "Zacapa"],
  ["SASSICAIA", "Tenuta San Guido"],
  ["CLASE AZUL", "Clase Azul"],
  ["TIGNANELLO", "Antinori"],
  ["VECCHIA ROMAGNA", "Vecchia Romagna"],
  ["VINI PETTI", SITE_NAME],
  ["BELVEDERE", "Belvedere"],
  ["GREYGOOSE", "Grey Goose"],
  ["MOSKOSKAYA", "Moskovskaya"],
  ["AKASHI", "Akashi"],
  ["CAOL ILA", "Caol Ila"],
  ["LAGAVULIN", "Lagavulin"],
  ["LAPHROIG", "Laphroaig"],
  ["NIKKA", "Nikka"],
];

export function productBrand(nome: string): string | undefined {
  const normalized = nome.toUpperCase().replace(/[^A-Z0-9]+/g, " ");
  return BRANDS.find(([key]) => normalized.includes(key))?.[1];
}

// Valori allineati a /spedizioni e app/api/checkout/route.ts
const SHIPPING_COST = 6.99;
const FREE_SHIPPING_THRESHOLD = 150;

export function shippingDetailsJsonLd(prezzo: number) {
  return {
    "@type": "OfferShippingDetails",
    shippingRate: {
      "@type": "MonetaryAmount",
      value: prezzo >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST,
      currency: "EUR",
    },
    shippingDestination: {
      "@type": "DefinedRegion",
      addressCountry: "IT",
    },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: {
        "@type": "QuantitativeValue",
        minValue: 0,
        maxValue: 1,
        unitCode: "DAY",
      },
      transitTime: {
        "@type": "QuantitativeValue",
        minValue: 1,
        maxValue: 3,
        unitCode: "DAY",
      },
    },
  };
}
