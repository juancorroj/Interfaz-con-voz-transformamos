import './charts.css';

export interface BarItem {
  id: string;
  label: string;
  value: number;
  /** Texto del valor ya formateado. */
  valueLabel: string;
  /** `selected` es lo que la persona está mirando; `reference` marca una cifra que aparece en la ficha. */
  mark?: 'selected' | 'reference';
  note?: string;
}

interface BarChartProps {
  items: BarItem[];
  ariaLabel: string;
}

/**
 * Barras horizontales con el texto siempre visible. Todas comparten la misma escala, que va de 0 al
 * valor máximo, para que la longitud sea comparable entre sí.
 */
export function BarChart({ items, ariaLabel }: BarChartProps) {
  const max = Math.max(...items.map(i => i.value), 0);
  return <ul className="bar-chart" aria-label={ariaLabel}>
    {items.map(i => <li key={i.id} className={i.mark ? `mark-${i.mark}` : undefined}>
      <span className="bar-label">{i.label}{i.note && <small>{i.note}</small>}</span>
      <span className="bar-track"><span className="bar-fill" style={{ width: max === 0 ? '0%' : `${Math.max((i.value / max) * 100, i.value > 0 ? 1.5 : 0)}%` }} /></span>
      <span className="bar-value">{i.valueLabel}</span>
    </li>)}
  </ul>;
}
