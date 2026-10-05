import type { TitledText } from '../../content/types';
import { Reveal } from '../../ui/motion/Reveal';

export interface ConditionItem extends TitledText {
  /** Fases del plan a las que afecta la condición. */
  affects: readonly number[];
  /** Cuánto gobierna el equipo la condición. */
  control: string;
}

interface ConditionMapProps {
  items: readonly ConditionItem[];
  phaseCount: number;
  affectsLabel: string;
}

/** Las condiciones que pueden alterar el plan, cada una con una mini línea de fases que marca a cuáles afecta. */
export function ConditionMap({ items, phaseCount, affectsLabel }: ConditionMapProps) {
  return <ul className="conds">{items.map((c, i) => <li key={c.id}><Reveal delay={i * 0.07}><article>
    <header><span className="conds-n">{String(i + 1).padStart(2, '0')}</span><em>{c.control}</em></header>
    <h3>{c.title}</h3>
    <p>{c.text}</p>
    <div className="conds-phases" role="img" aria-label={`${affectsLabel}: ${c.affects.map(a => `fase ${a}`).join(', ')}`}>
      <small>{affectsLabel}</small>
      <span>{Array.from({ length: phaseCount }, (_, k) => k + 1).map(n => <i key={n} className={c.affects.includes(n) ? 'on' : ''}>{n}</i>)}</span>
    </div>
  </article></Reveal></li>)}</ul>;
}
