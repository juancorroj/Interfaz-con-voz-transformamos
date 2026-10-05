import { Bot, HeartHandshake, Hand, UsersRound, type LucideIcon } from 'lucide-react';
import { Reveal } from '../../ui/motion/Reveal';

export interface BoundaryStage {
  id: string;
  label: string;
  /** Quién actúa en este momento. */
  actor: string;
  note: string;
  /** Cómo participa la IA: trabaja, se detiene o solo propone. */
  ai: 'works' | 'stops' | 'proposes';
}

interface AiBoundaryProps {
  title: string;
  stages: readonly BoundaryStage[];
  groups: readonly string[];
  frontier: string;
  gate: string;
}

const icons: Record<string, LucideIcon> = { escuchar: Bot, comprender: UsersRound, realimentar: HeartHandshake };

/**
 * La tesis de la página en una imagen: la IA trabaja al escuchar, se detiene en una frontera visible
 * y las personas comprenden; al realimentar la IA propone y la persona decide.
 */
export function AiBoundary({ title, stages, groups, frontier, gate }: AiBoundaryProps) {
  return <Reveal><div className="aib">
    <h2 className="aib-title">{title}</h2>
    <div className="aib-groups" aria-hidden="true">{groups.map((g, i) => <span key={g} className={`aib-group g${i + 1}`}>{g}</span>)}</div>
    <ol className="aib-stages">
      <li className="aib-line" aria-hidden="true"><span className="aib-pulse" /></li>
      {stages.map((s, i) => {
        const Icon = icons[s.id] ?? Bot;
        return <li key={s.id} className={`aib-stage ${s.ai}`}>
          {i === 1 && <span className="aib-frontier"><Hand size={16} aria-hidden="true" /><em>{frontier}</em></span>}
          <span className="aib-node"><Icon size={28} aria-hidden="true" /></span>
          <strong>{s.label}</strong>
          <span className="aib-actor">{s.actor}</span>
          <small>{s.note}</small>
        </li>;
      })}
    </ol>
    <p className="aib-gate">{gate}</p>
  </div></Reveal>;
}
