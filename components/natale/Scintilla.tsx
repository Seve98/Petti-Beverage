import type { CSSProperties } from "react";
import stili from "./natale.module.css";

const STELLA =
  "M12 0C12.9 7.6 16.4 11.1 24 12C16.4 12.9 12.9 16.4 12 24C11.1 16.4 7.6 12.9 0 12C7.6 11.1 11.1 7.6 12 0Z";

type Props = {
  className?: string;
  ritardo?: string;
  durata?: string;
};

/** Stellina dorata a quattro punte che brilla a intermittenza. */
export default function Scintilla({ className = "", ritardo, durata }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute ${stili.scintilla} ${className}`}
      style={{ "--ritardo": ritardo, "--durata": durata } as CSSProperties}
    >
      <path d={STELLA} fill="#f3d77c" />
    </svg>
  );
}

export { STELLA };
