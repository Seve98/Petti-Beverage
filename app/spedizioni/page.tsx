import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { COSTO_SPEDIZIONE, SOGLIA_SPEDIZIONE_GRATIS } from "@/lib/spedizione";

export const metadata: Metadata = pageMetadata({
  title: "Spedizioni e Consegne",
  description:
    "Tempi, costi e modalità di spedizione degli ordini Petti Beverage: consegna in 24/48h in tutta Italia.",
  path: "/spedizioni",
});

export default function SpedizioniPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-12 text-slate-300">
      <div className="max-w-4xl mx-auto space-y-12">
        <header>
          <h1 className="text-4xl md:text-5xl font-serif text-gold uppercase italic mb-4">
            Politica di Spedizione
          </h1>
          <div className="h-1 w-20 bg-gold/50"></div>
        </header>

        <section className="grid gap-8">
          <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-gold/10">
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              Tempi di Elaborazione
            </h2>
            <p className="leading-relaxed">
              Tutti gli ordini vengono elaborati entro 24 ore lavorative dalla
              ricezione del pagamento. Gli ordini effettuati durante il fine
              settimana o i giorni festivi verranno gestiti il primo giorno
              lavorativo utile.
            </p>
          </div>

          <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-gold/10">
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              Tariffe e Tempi di Consegna
            </h2>
            <ul className="space-y-4">
              <li className="flex justify-between border-b border-gold/5 pb-2">
                <span>Spedizione Standard (Italia)</span>
                <span className="text-gold font-bold">€ {COSTO_SPEDIZIONE.toFixed(2)}</span>
              </li>
              <li className="flex justify-between border-b border-gold/5 pb-2">
                <span>Spedizione Gratuita</span>
                <span className="text-gold font-bold">Sopra i € {SOGLIA_SPEDIZIONE_GRATIS}</span>
              </li>
              <li className="flex justify-between border-b border-gold/5 pb-2">
                <span>Tempi stimati</span>
                <span className="text-white">
                  24/48 ore (72h per isole e zone remote)
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-gold/10">
            <h2 className="text-xl font-bold  mb-4 uppercase tracking-wider text-red-500">
              Verifica dell&#39;età
            </h2>
            <p className="leading-relaxed italic">
              Importante: La consegna di prodotti alcolici è riservata ai
              maggiori di 18 anni. Il corriere è autorizzato a richiedere un
              documento d&#39;identità valido al momento della consegna. In caso
              di mancata prova della maggiore età, il pacco non verrà
              consegnato.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
