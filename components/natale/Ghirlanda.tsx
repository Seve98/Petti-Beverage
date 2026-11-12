// Ghirlanda di abete con bacche, appesa sotto la navbar: un ramo vero (foto Unsplash 5jeRBN4-ZLE)
// scontornato, ruotato e alternato dritto/specchiato in public/natale/oggetti/ghirlanda.png.
// Si ripete in orizzontale, quindi copre qualsiasi larghezza senza deformarsi.
// `capovolta`: specchiata in verticale, col bordo dritto in basso e i rami verso l'alto,
// per chiudere una sezione appoggiata su quella successiva. I fiocchi restano dritti.
export default function Ghirlanda({ capovolta = false }: { capovolta?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none relative">
      <div
        className={`h-[clamp(78px,8.5vw,138px)] w-full bg-[url(/natale/oggetti/ghirlanda.png)] bg-[length:auto_100%] bg-top bg-repeat-x drop-shadow-[0_10px_12px_rgba(0,0,0,0.55)] ${capovolta ? "-scale-y-100" : ""}`}
      />
      {/* Fiocchi di raso dove la ghirlanda è "legata" */}
      {["left-[18%]", "left-[82%]"].map((posizione) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={posizione}
          src="/natale/oggetti/fiocco.png"
          alt=""
          className={`absolute ${capovolta ? "bottom-[2%]" : "top-[2%]"} w-[clamp(46px,5.2vw,86px)] -translate-x-1/2 drop-shadow-[0_8px_10px_rgba(0,0,0,0.5)] ${posizione}`}
        />
      ))}
    </div>
  );
}
