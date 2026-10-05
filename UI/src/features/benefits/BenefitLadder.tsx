import { ArrowUpRight, type LucideIcon } from 'lucide-react';

export interface BenefitLevel {
  id: string;
  title: string;
  /** Una línea que dice a quién beneficia el nivel. */
  summary: string;
  count: number;
  icon: LucideIcon;
}

interface BenefitLadderProps {
  levels: readonly BenefitLevel[];
  activeId?: string;
  growthLabel: string;
  onSelect: (id: string) => void;
}

/** Los tres niveles de beneficio como una escalera: cada peldaño es mayor que el anterior y lleva a su pestaña. */
export function BenefitLadder({ levels, activeId, growthLabel, onSelect }: BenefitLadderProps) {
  return <div className="ladder">
    <ol className="ladder-steps" aria-label="Niveles de beneficio">
      {levels.map((l, i) => <li key={l.id} className={`ladder-step step-${i + 1} ${l.id === activeId ? 'active' : ''}`}>
        <button onClick={() => onSelect(l.id)} aria-current={l.id === activeId ? 'page' : undefined}>
          <span className="ladder-icon"><l.icon size={i === 2 ? 30 : 26} aria-hidden="true" /></span>
          <span className="ladder-level">Nivel {i + 1}</span>
          <strong>{l.title}</strong>
          <small>{l.summary}</small>
          <span className="ladder-count">{l.count} beneficios<ArrowUpRight size={14} aria-hidden="true" /></span>
        </button>
      </li>)}
    </ol>
    <p className="ladder-growth" aria-hidden="true"><span />{growthLabel}</p>
  </div>;
}
