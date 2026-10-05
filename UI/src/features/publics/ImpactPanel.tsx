import { Users } from 'lucide-react';
import type { PublicImpact } from '../../content/types';
import { CountUp } from '../../ui/CountUp';
import { Reveal } from '../../ui/motion/Reveal';

interface ImpactPanelProps {
  impact: PublicImpact;
  /** Texto fijo que explica qué significa la cifra. */
  label: string;
  caveat: string;
}

/** La población del público como impacto potencial: una cifra grande y qué significa. */
export function ImpactPanel({ impact, label, caveat }: ImpactPanelProps) {
  return <Reveal><aside className="impact" aria-label={label}>
    <span className="impact-icon"><Users size={26} aria-hidden="true" /></span>
    <div className="impact-main">
      <small>{label}</small>
      <strong><CountUp value={impact.value} /><span>{impact.unit}</span></strong>
      {impact.note && <em>{impact.note}</em>}
    </div>
    <p>{caveat}</p>
  </aside></Reveal>;
}
