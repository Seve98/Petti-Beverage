"use client";
import { upsertProduct } from "@/app/action/admin-action";

export default function AddProductModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  async function handleAction(formData: FormData) {
    const result = await upsertProduct(formData);
    if (result.success) {
      onClose();
      // Qui potresti aggiungere un toast invece di un alert per un'esperienza più luxury
    } else {
      alert("Errore: " + result.error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-clay border border-gold/20 p-8 rounded-xl w-full max-w-lg shadow-2xl">
        <h3 className="font-serif text-3xl gold-gradient mb-8 uppercase tracking-tighter">
          Nuovo Prodotto di Elite
        </h3>

        <form action={handleAction} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gold uppercase tracking-widest ml-1 font-bold">
              Nome Bottiglia
            </label>
            <input
              name="nome"
              type="text"
              placeholder="Es. Grappa Riserva Petti"
              className="input-petti"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-gold uppercase tracking-widest ml-1 font-bold">
                Prezzo (€)
              </label>
              <input
                name="prezzo"
                type="number"
                step="0.01"
                className="input-petti"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-gold uppercase tracking-widest ml-1 font-bold">
                Stock
              </label>
              <input
                name="stock"
                type="number"
                className="input-petti"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gold uppercase tracking-widest ml-1 font-bold">
              Categoria
            </label>
            <select name="categoria" className="select-petti">
              <option value="Whisky">Whisky</option>
              <option value="Grappa">Grappa</option>
              <option value="Gin">Gin</option>
              <option value="Rum">Rum</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gold uppercase tracking-widest ml-1 font-bold">
              Descrizione
            </label>
            <textarea
              name="descrizione"
              className="textarea-petti"
              placeholder="Note sensoriali..."
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gold uppercase tracking-widest ml-1 font-bold">
              Foto Bottiglia
            </label>
            {/* Input file stilizzato */}
            <input
              name="immagine"
              type="file"
              accept="image/*"
              className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gold file:text-black hover:file:bg-gold-light cursor-pointer text-gray-500 text-sm"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              Annulla
            </button>
            <button type="submit" className="btn-custom flex-1">
              Salva Prodotto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
