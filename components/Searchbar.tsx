"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: () => void; // Aggiungiamo questa prop opzionale
}

export default function SearchBar({
  value,
  onChange,
  placeholder,
  onSearch,
}: SearchBarProps) {
  // Gestiamo il tasto INVIO manualmente senza bisogno del tag <form>
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  return (
    <div className="relative w-full group">
      {" "}
      {/* <--- CAMBIATO DA FORM A DIV */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search
          size={18}
          className="text-gold/40 group-focus-within:text-gold transition-colors"
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown} // <--- Intercettiamo l'invio qui
        placeholder={placeholder || "Cerca tra le nostre etichette..."}
        className="w-full bg-black/40 border border-gold/10 rounded-xl py-4 pl-12 pr-12 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-gold/40 transition-all shadow-inner"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
