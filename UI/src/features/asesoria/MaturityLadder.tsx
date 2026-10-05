import type { CSSProperties } from 'react';
import { Check, Circle, CircleDot, type LucideIcon } from 'lucide-react';
import { Reveal } from '../../ui/motion/Reveal';

export interface MaturityStage {
  id: string;
  title: string;
  text: string;
  /** `done` ya ocurrió, `here` es donde está el caso hoy, `next` falta. */
  state: 'done' | 'here' | 'next';
  icon: LucideIcon;
}

interface MaturityLadderProps {
  stages: readonly MaturityStage[];
  hereLabel: string;
  nextLabel: string;
}

/** La madurez del caso como una escalera: cada peldaño es una etapa, y una marca dice dónde está hoy. */
export function MaturityLadder({ stages, hereLabel, nextLabel }: MaturityLadderProps) {
  return <ol className="mat">
    {stages.map((s, i) => <li key={s.id} className={`mat-step ${s.state}`} style={{ '--lift': `${(stages.length - 1 - i) * 14}px` } as CSSProperties}>
      <Reveal delay={i * 0.08}><div className="mat-card">
        <span className="mat-icon"><s.icon size={22} aria-hidden="true" /></span>
        <span className="mat-state">{s.state === 'done' ? <><Check size={13} aria-hidden="true" />Listo</> : s.state === 'here' ? <><CircleDot size={13} aria-hidden="true" />{hereLabel}</> : <><Circle size={13} aria-hidden="true" />{nextLabel}</>}</span>
        <strong>{s.title}</strong>
        <p>{s.text}</p>
      </div></Reveal>
    </li>)}
  </ol>;
}
