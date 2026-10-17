import type { Metadata } from "next";

export const SITE_URL = "https://www.pettibeverage.com";
export const SITE_NAME = "Petti Beverage";
export const DEFAULT_TITLE = "Petti Beverage | Ingrosso Bevande Premium a Lucera";

const DEFAULT_OG_IMAGE = {
  url: "/logo_petti.png",
  width: 585,
  height: 427,
  alt: "Logo Petti Beverage",
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
