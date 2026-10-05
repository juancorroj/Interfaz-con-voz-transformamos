import { ArrowRight, Check, Clock, DoorClosed, DoorOpen } from 'lucide-react';
import type { ImplementationPhase } from '../../content/types';

interface PhaseGatesProps {
  phases: readonly ImplementationPhase[];
  selectedId: number;
  onSelect: (id: number) => void;
  gateLabel: string;
  questionLabel: string;
  lastGateNote: string;
}

/**
 * Las fases como un recorrido por compuertas: entre una fase y la siguiente hay una compuerta y, al abrirla, la
 * Universidad decide con evidencia si continúa. El panel de abajo cuenta la fase elegida y la pregunta de su compuerta.
 */
export function PhaseGates({ phases, selectedId, onSelect, gateLabel, questionLabel, lastGateNote }: PhaseGatesProps) {
  const index = Math.max(0, phases.findIndex(p => p.id === selectedId));
  const phase = phases[index];
  const next = phases[index + 1];
  return <div className="gates">
    <ol className="gates-track" aria-label="Fases del plan y sus compuertas">
      {phases.map((p, i) => <li key={p.id} className={p.id === phase.id ? 'current' : i < index ? 'passed' : ''}>
        <button onClick={() => onSelect(p.id)} aria-pressed={p.id === phase.id} aria-label={`Fase ${p.id}: ${p.name}, ${p.duration}`}>
          <span className="gates-node">{p.id}</span>
          <strong>{p.name}</strong>
          <small>{p.duration}</small>
        </button>
        {i < phases.length - 1 && <span className={`gates-gate ${i < index ? 'open' : ''}`} title={`${gateLabel} ${i + 1}`}>
          {i < index ? <DoorOpen size={20} aria-hidden="true" /> : <DoorClosed size={20} aria-hidden="true" />}<em>{gateLabel} {i + 1}</em>
        </span>}
      </li>)}
    </ol>

    <article className="gates-panel" key={phase.id} aria-live="polite">
      <header>
        <span className="gates-panel-n">Fase {phase.id}</span>
        <h3>{phase.name}</h3>
        <span className="gates-panel-time"><Clock size={14} aria-hidden="true" />{phase.duration}</span>
      </header>
      <p className="gates-focus">{phase.focus}</p>
      <div className="gates-body">
        <div>
          <h4>Qué se hace</h4>
          <ul>{phase.actions.map(a => <li key={a}><Check size={15} aria-hidden="true" />{a}</li>)}</ul>
          {phase.note && <p className="gates-note">{phase.note}</p>}
        </div>
        <aside className="gates-door">
          <span className="gates-door-icon">{next ? <DoorClosed size={28} aria-hidden="true" /> : <DoorOpen size={28} aria-hidden="true" />}</span>
          <small>{next ? `${gateLabel} ${index + 1} · ${questionLabel}` : gateLabel}</small>
          <p>{phase.question ?? lastGateNote}</p>
          {next && <button className="secondary" onClick={() => onSelect(next.id)}>Si se abre: Fase {next.id}<ArrowRight size={15} aria-hidden="true" /></button>}
        </aside>
      </div>
    </article>
  </div>;
}
