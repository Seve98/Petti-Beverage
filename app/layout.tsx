import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LayoutClientWrapper from "@/components/LayoutClientWrapper";
import SplashScreen from "@/components/SplashScreen";
import { SCRIPT_SPLASH_VISTO, STILE_SPLASH_VISTO } from "@/lib/splash";
import AgeModal from "@/components/AgeModal";
import {
  DEFAULT_OG_IMAGE,
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
    images: [DEFAULT_OG_IMAGE],
    locale: "it_IT",
    type: "website",
  },
  // X/Twitter usa titolo, descrizione e immagine dei tag Open Graph
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: lo script qui sotto aggiunge data-splash-visto a <html> prima di React
    <html lang="it" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_SPLASH_VISTO }} />
        <style dangerouslySetInnerHTML={{ __html: STILE_SPLASH_VISTO }} />
        {/* Senza JavaScript lo splash non si chiuderebbe mai */}
        <noscript>
          <style>{"#splash{display:none}"}</style>
        </noscript>
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
