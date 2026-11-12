"use client";

import { useEffect, useRef } from "react";

type Fiocco = {
  x: number;
  y: number;
  raggio: number;
  velocita: number;
  oscillazione: number;
  fase: number;
  alfa: number;
};

const FIOCCHI_PER_PIXEL = 1 / 16000;
const MAX_FIOCCHI = 130;

function nuovoFiocco(larghezza: number, altezza: number, scala: number): Fiocco {
  // La profondità lega dimensione, velocità e luminosità: i fiocchi vicini sono grandi e veloci
  const profondita = Math.random();
  return {
    x: Math.random() * larghezza,
    y: Math.random() * altezza,
    raggio: (0.7 + profondita * 1.9) * scala,
    velocita: (14 + profondita * 34) * (0.75 + scala * 0.25),
    oscillazione: 6 + Math.random() * 16,
    fase: Math.random() * Math.PI * 2,
    alfa: 0.25 + profondita * 0.55,
  };
}

export default function Neve({
  className = "fixed inset-0 z-[5]",
  densita = 1,
  scala = 1,
}: {
  className?: string;
  /** Moltiplica il numero di fiocchi (1 = neve leggera della home). */
  densita?: number;
  /** Moltiplica la dimensione dei fiocchi. */
  scala?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const preferenzaMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let larghezza = 0;
    let altezza = 0;
    let fiocchi: Fiocco[] = [];
    let raf = 0;
    let ultimo = 0;

    const ridimensiona = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      larghezza = window.innerWidth;
      altezza = window.innerHeight;
      canvas.width = larghezza * dpr;
      canvas.height = altezza * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const numero = Math.min(
        Math.round(MAX_FIOCCHI * densita),
        Math.round(larghezza * altezza * FIOCCHI_PER_PIXEL * densita),
      );
      while (fiocchi.length < numero) {
        fiocchi.push(nuovoFiocco(larghezza, altezza, scala));
      }
      fiocchi = fiocchi.slice(0, numero);
    };

    const disegna = (ora: number) => {
      const dt = Math.min((ora - ultimo) / 1000, 0.05);
      ultimo = ora;
      ctx.clearRect(0, 0, larghezza, altezza);

      for (const f of fiocchi) {
        f.y += f.velocita * dt;
        f.fase += dt * 0.7;
        if (f.y > altezza + f.raggio * 2) {
          f.y = -f.raggio * 2;
          f.x = Math.random() * larghezza;
        }
        const x = f.x + Math.sin(f.fase) * f.oscillazione;
        ctx.globalAlpha = f.alfa;
        if (f.raggio > 3) {
          // Fiocchi grandi: bordo morbido, come neve vicina fuori fuoco
          const g = ctx.createRadialGradient(x, f.y, 0, x, f.y, f.raggio);
          g.addColorStop(0, "rgba(255,250,236,1)");
          g.addColorStop(0.55, "rgba(255,250,236,0.85)");
          g.addColorStop(1, "rgba(255,250,236,0)");
          ctx.fillStyle = g;
        } else {
          ctx.fillStyle = "#fff8e7";
        }
        ctx.beginPath();
        ctx.arc(x, f.y, f.raggio, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(disegna);
    };

    const avvia = () => {
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, larghezza, altezza);
      if (preferenzaMovimento.matches || document.hidden) return;
      ultimo = performance.now();
      raf = requestAnimationFrame(disegna);
    };

    ridimensiona();
    avvia();

    window.addEventListener("resize", ridimensiona);
    document.addEventListener("visibilitychange", avvia);
    preferenzaMovimento.addEventListener("change", avvia);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", ridimensiona);
      document.removeEventListener("visibilitychange", avvia);
      preferenzaMovimento.removeEventListener("change", avvia);
    };
  }, [densita, scala]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`${className} h-full w-full pointer-events-none`}
    />
  );
}
