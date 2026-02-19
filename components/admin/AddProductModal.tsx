"use client";
import { X, ImageIcon, Save } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProductModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900">Nuovo Prodotto</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={24} />
          </button>
        </div>

        <form className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase">
                Nome Prodotto
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Prezzo (€)
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Categoria
              </label>
              <select className="w-full p-3 rounded-lg border border-slate-200 bg-white">
                <option>Bevande</option>
                <option>Vini</option>
                <option>Alcolici</option>
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              alert("Salvato!");
              onClose();
            }}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
          >
            <Save size={20} /> Salva nel Database
          </button>
        </form>
      </div>
    </div>
  );
}
