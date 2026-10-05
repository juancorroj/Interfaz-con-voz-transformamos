const nf = (digits: number) => new Intl.NumberFormat('es-CO', { maximumFractionDigits: digits, minimumFractionDigits: 0 });

/** Pesos colombianos enteros, con punto de miles: «$4.584». */
export const formatCop = (value: number): string => `$${nf(0).format(Math.round(value))}`;

/**
 * Pesos en la forma en que los escribe la ficha: millones con coma decimal («$30,1 millones») y,
 * por debajo del millón, pesos enteros («$800.000»).
 */
export function formatCopCompact(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1e6) {
    const millions = nf(1).format(value / 1e6);
    return `$${millions} ${millions === '1' ? 'millón' : 'millones'}`;
  }
  if (abs >= 1e5) return formatCop(Math.round(value / 1e4) * 1e4);
  return formatCop(value);
}

export const formatUsd = (value: number): string => `US$ ${new Intl.NumberFormat('es-CO', { maximumFractionDigits: 3, minimumFractionDigits: 2 }).format(value)}`;

export const formatInt = (value: number): string => nf(0).format(Math.round(value));

/** Variación porcentual con signo: «+12 %», «−50 %». */
export function formatDelta(pct: number): string {
  const rounded = Math.round(pct);
  if (rounded === 0) return '0 %';
  return `${rounded > 0 ? '+' : '−'}${nf(0).format(Math.abs(rounded))} %`;
}
