"use client";

import { useEffect, useRef } from "react";

// Montato in EffectCraft: il brindisi ("A Glass of Champagne on the Table", Pexels 6396238,
// licenza Pexels) con luci fuori fuoco e neve. 12 s, la coda sfuma nell'inizio per un loop senza stacco.
// Lo splash usa un video diverso: la vetrina di bottiglie (splash-natale.mp4).
export default function VideoNatale() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const preferenza = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applica = () => {
      if (preferenza.matches) {
        video.pause();
      } else {
        video.play().catch(() => {
          // Autoplay negato dal browser: resta il poster
        });
      }
    };

    applica();
    preferenza.addEventListener("change", applica);
    return () => preferenza.removeEventListener("change", applica);
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      poster="/hero-natale-poster.jpg"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover object-[74%_center] lg:object-center"
    >
      <source src="/videos/hero-natale.mp4" type="video/mp4" />
    </video>
  );
}
