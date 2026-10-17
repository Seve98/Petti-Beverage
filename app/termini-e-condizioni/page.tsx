import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Termini e Condizioni di Vendita",
  description:
    "Condizioni generali di vendita del negozio online Petti Beverage di Petti Pietro & Figli S.r.l.",
  path: "/termini-e-condizioni",
});

export default function TerminiPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-12 text-slate-400 text-sm">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-serif text-gold uppercase italic">
          Condizioni Generali di Vendita
        </h1>

        <div className="prose prose-invert max-w-none">
          <h3 className="text-white uppercase tracking-widest text-lg">
            1. Informazioni Legali
          </h3>
          <p>
            Il presente sito è di proprietà di{" "}
            <strong>Petti Pietro e Figli Soc Coop</strong>, con sede legale in
            VIA BORGO SAN MATTEO 18 , P.IVA: 03511040713. E-mail:
            andreapetti92@gmail.com .
          </p>

          <h3 className="text-white uppercase tracking-widest text-lg mt-8">
            2. Divieto d&#39;Acquisto ai Minori
          </h3>
          <p>
            In conformità alle leggi vigenti in materia di alcolici,
            l&#39;acquisto sul sito è riservato esclusivamente ad utenti che
            abbiano compiuto il 18° anno di età. Effettuando un ordine,
            l&#39;utente dichiara di essere maggiorenne.
          </p>

          <h3 className="text-white uppercase tracking-widest text-lg mt-8">
            3. Prezzi e Pagamenti
          </h3>
          <p>
            Tutti i prezzi indicati sono comprensivi di IVA. Il pagamento può
            essere effettuato tramite i circuiti sicuri Stripe (Carte di
            Credito/Debito). I prezzi possono subire variazioni, ma non
            influiranno sugli ordini già confermati.
          </p>

          <h3 className="text-white uppercase tracking-widest text-lg mt-8">
            4. Diritto di Recesso
          </h3>
          <p>
            Ai sensi del D.Lgs. 206/2005, il cliente ha diritto di recedere dal
            contratto entro 14 giorni dalla ricezione della merce. Il diritto si
            applica solo a prodotti integri, non aperti e con i sigilli
            originali. Le spese di spedizione per il reso sono a carico del
            cliente.
          </p>

          <h3 className="text-white uppercase tracking-widest text-lg mt-8">
            5. Garanzie
          </h3>
          <p>
            Garantiamo l&#39;originalità e la perfetta conservazione di tutte le
            bottiglie presenti nel catalogo. In caso di difetti evidenti (es.
            odore di tappo accertato), il cliente è invitato a contattare
            l&#39;assistenza entro 48h dalla consegna.
          </p>
        </div>
      </div>
    </main>
  );
}
