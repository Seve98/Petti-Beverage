import { supabase } from "@/lib/supabase";
import { upsertProduct } from "@/app/action/admin-action";
import Link from "next/link";
import Image from "next/image";

export default async function AdminCatalogo() {
  // 1. Fetch dei dati direttamente dal server
  const { data: prodotti, error } = await supabase
    .from("prodotti")
    .select("*")
    .order("creato_at", { ascending: false });

  if (error)
    return (
      <div className="text-red-500">
        Errore nel caricamento: {error.message}
      </div>
    );

  return (
    <div className="min-h-screen bg-black p-4 md:p-10">
      {/* Header Sezione */}
      <div className="flex justify-between items-end mb-10 border-b border-gold/20 pb-6">
        <div>
          <span className="text-signature text-2xl">Gestione</span>
          <h1 className="text-5xl font-serif gold-gradient uppercase tracking-tighter">
            Catalogo Prodotti
          </h1>
        </div>

        {/* Bottone che apre il modal (DaisyUI) */}
        <label htmlFor="modal-prodotto" className="btn-petti cursor-pointer">
          + Aggiungi Bottiglia
        </label>
      </div>

      {/* Tabella Prodotti */}
      <div className="overflow-x-auto rounded-lg border border-gold/10 bg-clay/30 backdrop-blur-sm">
        <table className="table w-full">
          <thead className="text-gold font-serif uppercase tracking-widest text-xs">
            <tr className="border-b border-gold/20">
              <th>Immagine</th>
              <th>Prodotto</th>
              <th>Categoria</th>
              <th>Prezzo</th>
              <th>Stock</th>
              <th className="text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {prodotti?.map((p) => (
              <tr
                key={p.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td>
                  <div className="w-12 h-16 bg-black rounded border border-gold/10 overflow-hidden">
                    {p.immagine_url ? (
                      <Image
                        src={p.immagine_url}
                        alt={p.nome}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-gold/40">
                        NO IMG
                      </div>
                    )}
                  </div>
                </td>
                <td className="font-bold text-white">{p.nome}</td>
                <td>
                  <span className="badge badge-outline border-gold/30 text-gold text-xs">
                    {p.categoria}
                  </span>
                </td>
                <td className="font-mono text-gold-light">
                  €{p.prezzo.toFixed(2)}
                </td>
                <td>
                  <span
                    className={`text-xs ${p.stock < 5 ? "text-red-400" : "text-green-400"}`}
                  >
                    {p.stock} unità
                  </span>
                </td>
                <td className="text-right">
                  <button className="btn btn-ghost btn-xs text-gold">
                    Modifica
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal per Inserimento (Logica DaisyUI) */}
      <input type="checkbox" id="modal-prodotto" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-clay border border-gold/30">
          <h3 className="font-serif text-2xl gold-gradient mb-6">
            Nuovo Prodotto
          </h3>

          <form
            action={async (formData) => {
              "use server"; // Obbligatorio se siamo in un server component
              await upsertProduct(formData);
            }}
            className="space-y-4"
          >
            <div className="form-control">
              <label className="label text-xs text-gold uppercase">
                Nome Bottiglia
              </label>
              <input
                name="nome"
                type="text"
                placeholder="Es. Grappa Riserva Petti"
                className="input input-bordered bg-black border-gold/20 text-white focus:border-gold"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label text-xs text-gold uppercase">
                  Prezzo (€)
                </label>
                <input
                  name="prezzo"
                  type="number"
                  step="0.01"
                  className="input input-bordered bg-black border-gold/20 text-white focus:border-gold"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label text-xs text-gold uppercase">
                  Stock iniziale
                </label>
                <input
                  name="stock"
                  type="number"
                  className="input input-bordered bg-black border-gold/20 text-white focus:border-gold"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label text-xs text-gold uppercase">
                Categoria
              </label>
              <select
                name="categoria"
                className="select select-bordered bg-black border-gold/20 text-white focus:border-gold"
              >
                <option>Whisky</option>
                <option>Grappa</option>
                <option>Gin</option>
                <option>Vino</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label text-xs text-gold uppercase">
                URL Immagine
              </label>
              <input
                name="immagine_url"
                type="text"
                placeholder="https://..."
                className="input input-bordered bg-black border-gold/20 text-white focus:border-gold"
              />
            </div>

            <div className="modal-action">
              <label
                htmlFor="modal-prodotto"
                className="btn btn-ghost text-white"
              >
                Annulla
              </label>
              <button type="submit" className="btn-petti">
                Salva Prodotto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
