import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LayoutClientWrapper from "@/components/LayoutClientWrapper";
import SplashScreen from "@/components/SplashScreen";
import AgeModal from "@/components/AgeModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Petti Beverage | Ingrosso Bevande Premium a Lucera",
  description:
    "Fornitore leader di bevande premium per privati e aziende dal 1960. Ampia selezione di gin, toniche e beverage di alta qualità. Drink Good, Drink Petti",
  icons: {
    // Aggiungiamo ?v=1 per forzare il browser a resettare la vecchia icona
    icon: "/favicon.ico?v=1",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Petti Beverage | Ingrosso Bevande Premium a Lucera",
    description:
      "Fornitore leader di bevande premium a Lucera. Drink Good, Drink Petti.",
    url: "https://www.pettibeverage.com",
    siteName: "Petti Beverage",
    images: [
      {
        url: "https://www.pettibeverage.com/logo_petti.png",
        width: 1200,
        height: 630,
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
        {/* QUESTO SCRIPT DICE A GOOGLE DI SCRIVERE "Petti Beverage" INVECE DI "pettibeverage.com" */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Petti Beverage",
              url: "https://www.pettibeverage.com",
            }),
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
