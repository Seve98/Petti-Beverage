"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "../components/Searchbar"; // Il tuo componente originale

export default function HomeSearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      router.push(`/catalogo?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="relative z-30 max-w-2xl  -mt-10 px-6">
      <form onSubmit={handleSearch}>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Cosa vuoi bere oggi?"
        />
        {/* Trucco: un tasto invisibile per permettere l'invio col tasto Enter */}
        <button type="submit" className="hidden" />
      </form>

      {/* Glow decorativo per richiamare lo stile Petti */}
      <div className="absolute -inset-2 bg-gold/5 blur-2xl -z-10" />
    </section>
  );
}
