export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-12 text-slate-400 text-sm">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-serif text-gold uppercase italic">
          Privacy Policy
        </h1>
        <div className="prose prose-invert max-w-none space-y-6">
          <p>
            Questa informativa descrive come vengono raccolti e trattati i tuoi
            dati personali su questo sito.
          </p>

          <h3 className="text-white uppercase tracking-widest text-lg">
            Titolare del Trattamento
          </h3>
          <p>
            <strong>Petti Pietro e Figli Soc Coop</strong>, P.IVA: 03511040713,
            Sede: VIA BORGO SAN MATTEO 18 . Email: andreapetti92@gmail.com.
          </p>

          <h3 className="text-white uppercase tracking-widest text-lg">
            Dati raccolti per il pagamento
          </h3>
          <p>
            Per l&#39;elaborazione dei pagamenti utilizziamo{" "}
            <strong>Stripe</strong>. I dati della tua carta non vengono salvati
            sui nostri server ma gestiti direttamente da Stripe in modo
            criptato.
          </p>

          <h3 className="text-white uppercase tracking-widest text-lg">
            Diritti dell&#39;utente
          </h3>
          <p>
            Puoi richiedere in qualsiasi momento la cancellazione o la modifica
            dei tuoi dati scrivendo alla nostra email di contatto.
          </p>
        </div>
      </div>
    </main>
  );
}
