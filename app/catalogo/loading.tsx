export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 text-white">
      <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
      <p className="text-gold italic uppercase tracking-[0.3em] text-xs">
        Inizializzazione Cantina...
      </p>
    </div>
  );
}
