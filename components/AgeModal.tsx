"use client";

import { useState, useEffect } from "react";

export default function AgeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkAge = () => {
      const hasConfirmed = localStorage.getItem("age-confirmed");
      if (!hasConfirmed) {
        setIsOpen(true);
      }
    };
    requestAnimationFrame(checkAge);
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("age-confirmed", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md px-4">
      <div className="max-w-md w-full bg-clay p-10 rounded-xl text-center border border-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
        {/* Logo o Icona Gold */}
        <div className="mb-6">
          <span className="text-5xl font-serif gold-gradient font-bold italic">
            PB
          </span>
        </div>

        <p className="text-2xl font-serif gold-gradient mb-4 uppercase tracking-[0.2em] font-bold">
          Verifica Età
        </p>

        <p className="text-gray-300 mb-10 text-sm leading-relaxed font-light italic">
          Benvenuto nel mondo Petti Beverage. <br />
          L&#39;accesso a questa selezione esclusiva è consentito solo ai
          maggiori di 18 anni.
        </p>

        <div className="flex flex-col gap-5">
          <button
            onClick={handleConfirm}
            className="btn-custom uppercase tracking-widest text-sm"
          >
            Sì, sono maggiorenne
          </button>

          <button
            onClick={() => (window.location.href = "https://www.google.it")}
            className="text-gray-500 hover:text-gold transition-colors text-xs uppercase tracking-widest underline decoration-gold/30 underline-offset-4"
          >
            No, non ho ancora 18 anni
          </button>
        </div>

        <div className="mt-10 pt-6 border-t border-gold/10 text-[9px] text-gray-500 uppercase tracking-[0.3em]">
          Eccellenza Italiana • Bevi Responsabilmente
        </div>
      </div>
    </div>
  );
}
