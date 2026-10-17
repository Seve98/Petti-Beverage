import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LayoutClientWrapper from "@/components/LayoutClientWrapper";
import SplashScreen from "@/components/SplashScreen";
import AgeModal from "@/components/AgeModal";
import {
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  jsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Fornitore leader di bevande premium per privati e aziende dal 1960. Ampia selezione di gin, toniche e beverage di alta qualità. Drink Good, Drink Petti",

  // Configurazione icone pulita e completa per Google e dispositivi mobile
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", rel: "icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  // Collegamento al file manifest per Android
  manifest: "/site.webmanifest",

  // Default per le pagine senza Open Graph proprio (niente og:url: lo imposta ogni pagina)
  openGraph: {
    title: DEFAULT_TITLE,
    description:
      "Fornitore leader di bevande premium a Lucera. Drink Good, Drink Petti.",
    siteName: SITE_NAME,
    images: [
      {
        url: "/logo_petti.png",
        width: 585,
        height: 427,
        alt: "Logo Petti Beverage",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd([organizationJsonLd, websiteJsonLd]),
          }}
        />
      </head>
      <body
        className={`${jakarta.variable} ${inter.variable} antialiased bg-white text-slate-900`}
      >
        <SplashScreen />
        <LayoutClientWrapper>
          <div className="min-h-screen mt-10 bg-black">
            <AgeModal />
            {children}
          </div>
        </LayoutClientWrapper>
      </body>
    </html>
  );
}
