// components/admin/DashboardHeader.tsx
"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import AddProductModal from "./AddProductModal";

interface Props {
  categorie: any[]; // Definiamo che le categorie devono essere passate qui
}

export default function DashboardHeader({ categorie }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center my-10">
        <div>
          <h1 className="text-3xl font-serif text-white gold-gradient uppercase">
            Bentornato Admin
          </h1>
          <p className="text-gray-500 text-sm">
            Monitoraggio vendite Petti Beverage
          </p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="btn-custom flex items-center gap-2"
        >
          <Plus size={18} /> Nuovo Prodotto
        </button>
      </header>

      {/* Ora 'categorie' è disponibile perché arriva dalle props */}
      <AddProductModal
        categorie={categorie}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
