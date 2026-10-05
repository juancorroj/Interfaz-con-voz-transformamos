import { ArrowRight, ArrowUp, AudioLines, Brain, CornerDownRight, FlaskConical, HeartHandshake, Search, Sprout, type LucideIcon } from 'lucide-react';
import type { TitledText } from '../../content/types';
import { Reveal } from '../../ui/motion/Reveal';

interface EvolutionLoopProps {
  steps: TitledText[];
  /** Texto del arco que cierra el ciclo. */
  loopLabel: string;
  modular: {
    title: string;
    /** Los tres momentos de cada vuelta, en orden. */
    triad: readonly string[];
    turns: readonly { label: string; note: string }[];
    note: string;
  };
}

const triadIcons: LucideIcon[] = [AudioLines, Brain, HeartHandshake];

const icons: Record<string, LucideIcon> = { explorar: Search, experimentar: FlaskConical, evolucionar: Sprout };

/**
 * El marco que no se vuelve rígido en dos piezas: un recorrido de tres etapas con un arco que vuelve al inicio
 * y, debajo, bloques que muestran que una dimensión nueva se suma sin rehacer lo existente.
 */
export function EvolutionLoop({ steps, loopLabel, modular }: EvolutionLoopProps) {
  return <div className="evo">
    <ol className="evo-steps">
      {steps.map((s, i) => {
        const Icon = icons[s.id] ?? Search;
        return <li key={s.id}><Reveal delay={i * 0.1}><div className={`evo-step evo-${s.id}`}>
          <span className="evo-icon"><Icon size={26} aria-hidden="true" /></span>
          <span className="evo-n">0{i + 1}</span>
          <strong>{s.title}</strong>
          <p>{s.text}</p>
        </div></Reveal>{i < steps.length - 1 && <ArrowRight className="evo-arrow" size={22} aria-hidden="true" />}</li>;
      })}
    </ol>
    <div className="evo-return" aria-hidden="true"><ArrowUp size={16} /><span>{loopLabel}</span></div>

    <div className="evo-modular">
      <h3>{modular.title}</h3>
      <ol className="evo-spiral">
        {modular.turns.map((turn, t) => <li key={turn.label} className="evo-turn" style={{ marginLeft: `${t * 7}%` }}>
          {t > 0 && <span className="evo-link" aria-hidden="true"><CornerDownRight size={18} /></span>}
          <Reveal delay={t * 0.45}><div className={`evo-triad turn-${t + 1}`}>
            <span className="evo-turn-label">{turn.label}<em>{turn.note}</em></span>
            <ul>{modular.triad.map((word, k) => {
              const Icon = triadIcons[k] ?? AudioLines;
              return <li key={word}><span className="evo-triad-node"><Icon size={16} aria-hidden="true" />{word}</span>{k < modular.triad.length - 1 && <ArrowRight size={14} aria-hidden="true" />}</li>;
            })}</ul>
          </div></Reveal>
        </li>)}
      </ol>
      <p>{modular.note}</p>
    </div>
  </div>;
}
