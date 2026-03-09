import { getWeek, getYear } from "date-fns";

export function getWeeklySeed() {
  const ora = new Date();
  // Uniamo l'anno e la settimana (es. 202442) per avere un numero unico
  return parseInt(`${getYear(ora)}${getWeek(ora)}`);
}

// Funzione Pseudo-Random che accetta un seme
export function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
