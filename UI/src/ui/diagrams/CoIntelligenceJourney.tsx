import { Bot, Landmark, LayoutList, UserRound, type LucideIcon } from 'lucide-react';
import type { ChainStep } from '../../content/types';
import './diagrams.css';

interface CoIntelligenceJourneyProps {
  steps: ChainStep[];
  machineLabel: string;
  humanLabel: string;
  /** Rótulo de la frontera entre lo que prepara la tecnología y lo que decide la persona. */
  frontier: string;
}

const icons: Record<string, LucideIcon> = { ia: Bot, marco: LayoutList, persona: UserRound, institucion: Landmark };

/**
 * Recorrido de la co-inteligencia: la tecnología prepara los primeros eslabones y, tras una frontera visible,
 * el criterio humano interpreta, decide y actúa. Un pulso recorre la línea; con movimiento reducido queda quieto.
 */
export function CoIntelligenceJourney({ steps, machineLabel, humanLabel, frontier }: CoIntelligenceJourneyProps) {
  const split = steps.findIndex(s => s.human);
  const machine = steps.slice(0, split);
  const human = steps.slice(split);
  return <div className="journey">
    <div className="journey-groups" aria-hidden="true">
      <span className="journey-group machine" style={{ flexGrow: machine.length }}>{machineLabel}</span>
      <span className="journey-group human" style={{ flexGrow: human.length }}>{humanLabel}</span>
    </div>
    <ol className="journey-steps" aria-label="Cadena de co-inteligencia">
      <li className="journey-line" aria-hidden="true"><span className="journey-pulse" /></li>
      {steps.map((s, i) => {
        const Icon = icons[s.id] ?? Bot;
        return <li key={s.id} className={`journey-step ${s.human ? 'human' : 'machine'} ${i === split ? 'after-frontier' : ''}`}>
          {i === split && <span className="journey-frontier" aria-label={frontier}><em>{frontier}</em></span>}
          <span className="journey-node"><Icon size={26} aria-hidden="true" /></span>
          <strong>{s.actor}</strong>
          <span>{s.action}</span>
        </li>;
      })}
    </ol>
  </div>;
}
