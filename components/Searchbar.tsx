"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder,
}: SearchBarProps) {
  return (
    <div className="relative w-full group">
      {/* Icona Lente */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search
          size={18}
          className="text-gold/40 group-focus-within:text-gold transition-colors"
        />
      </div>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Cerca tra le nostre etichette..."}
        className="w-full bg-black/40 border border-gold/10 rounded-xl py-4 pl-12 pr-12 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all shadow-inner"
      />

      {/* Tasto Clear (appare solo se c'è testo) */}
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white transition-colors"
          title="Cancella ricerca"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
