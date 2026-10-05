import { RotateCcw } from 'lucide-react';
import { asrLabels, architectures, priceBook, SESSIONS_BUDGET, SESSIONS_INSTITUTIONAL, SESSIONS_REAL, TRM_OBSERVED, TRM_PLANNING } from '../../domain/cost/pricing2026';
import type { SimulationInput } from '../../domain/cost/types';
import { formatInt } from '../../domain/cost/format';
import { simulator as copy } from '../../content/ficha/costos';
import { fichaNames, hasIntroTariff } from './costModel';

interface SimulatorControlsProps {
  input: SimulationInput;
  onChange: (patch: Partial<SimulationInput>) => void;
  onReset: () => void;
}

const optionalNumber = (raw: string): number | null => (raw.trim() === '' ? null : Math.max(0, Number(raw) || 0));

/** Los supuestos que se pueden mover. Cada control explica qué cambia. */
export function SimulatorControls({ input, onChange, onReset }: SimulatorControlsProps) {
  const arch = architectures.find(a => a.id === input.architectureId)!;
  const external = arch.asrKey !== null;
  const introApplies = hasIntroTariff(arch.id);

  return <div className="sim-controls">
    <div className="sim-head"><h3>Supuestos</h3><button className="text-button" onClick={onReset}><RotateCcw size={14} aria-hidden="true" /> Restablecer a la base de la ficha</button></div>

    <label className="sim-field">
      <span>Configuración de modelos</span>
      <select value={input.architectureId} onChange={e => onChange({ architectureId: e.target.value, asrOverride: null })}>
        {architectures.map(a => <option key={a.id} value={a.id}>{a.name}{a.ficha ? ` · ${fichaNames[a.ficha]}` : ''}</option>)}
      </select>
    </label>

    <div className="sim-field">
      <label htmlFor="sim-sessions">Sesiones al año</label>
      <div className="sim-row">
        <input type="range" aria-label="Sesiones al año (deslizador)" min={1000} max={SESSIONS_INSTITUTIONAL} step={500} value={Math.min(Math.max(input.sessionsPerYear, 1000), SESSIONS_INSTITUTIONAL)} onChange={e => onChange({ sessionsPerYear: Number(e.target.value) })} />
        <input id="sim-sessions" className="sim-number" type="number" min={0} step={100} value={input.sessionsPerYear} onChange={e => onChange({ sessionsPerYear: Math.max(0, Math.round(Number(e.target.value) || 0)) })} />
      </div>
      <div className="sim-quick">
        <button className={input.sessionsPerYear === SESSIONS_REAL ? 'on' : ''} onClick={() => onChange({ sessionsPerYear: SESSIONS_REAL })}>{formatInt(SESSIONS_REAL)} · reales</button>
        <button className={input.sessionsPerYear === SESSIONS_BUDGET ? 'on' : ''} onClick={() => onChange({ sessionsPerYear: SESSIONS_BUDGET })}>{formatInt(SESSIONS_BUDGET)} · presupuestadas</button>
        <button className={input.sessionsPerYear === SESSIONS_INSTITUTIONAL ? 'on' : ''} onClick={() => onChange({ sessionsPerYear: SESSIONS_INSTITUTIONAL })}>{formatInt(SESSIONS_INSTITUTIONAL)} · escala institucional</button>
      </div>
    </div>

    <div className="sim-field">
      <label htmlFor="sim-minutes">Duración del audio de una sesión</label>
      <div className="sim-row">
        <input type="range" aria-label="Duración de la sesión (deslizador)" min={10} max={60} step={5} value={Math.min(Math.max(input.audioMinutes, 10), 60)} onChange={e => onChange({ audioMinutes: Number(e.target.value) })} />
        <span className="sim-readout" id="sim-minutes">{input.audioMinutes} min</span>
      </div>
      <small>El estudio modela 40 minutos, el caso superior. Las dos sesiones procesadas duraron 16 y 12 minutos.</small>
    </div>

    <div className="sim-field">
      <label htmlFor="sim-trm">Tasa de cambio (pesos por dólar)</label>
      <div className="sim-row">
        <input id="sim-trm" className="sim-number" type="number" min={1} step={10} value={input.trm} onChange={e => onChange({ trm: Math.max(1, Number(e.target.value) || 1) })} />
      </div>
      <div className="sim-quick">
        <button className={input.trm === TRM_PLANNING ? 'on' : ''} onClick={() => onChange({ trm: TRM_PLANNING })}>${formatInt(TRM_PLANNING)} · planeación</button>
        <button className={input.trm === TRM_OBSERVED ? 'on' : ''} onClick={() => onChange({ trm: TRM_OBSERVED })}>${formatInt(TRM_OBSERVED)} · observada el 27 de septiembre</button>
      </div>
    </div>

    <fieldset className="sim-field" disabled={!introApplies}>
      <legend>Tarifa del modelo</legend>
      <div className="sim-choice">
        <label><input type="radio" name="tariff" checked={input.tariff === 'plena'} onChange={() => onChange({ tariff: 'plena' })} /> Plena (desde 2027)</label>
        <label><input type="radio" name="tariff" checked={input.tariff === 'introductoria'} onChange={() => onChange({ tariff: 'introductoria' })} /> Introductoria (hasta 2026)</label>
      </div>
      <small>{introApplies ? copy.tariffNote : `${copy.tariffNote} Esta configuración no la tiene, así que no cambia nada.`}</small>
    </fieldset>

    <label className="sim-field">
      <span>Transcripción</span>
      <select disabled={!external} value={external ? input.asrOverride ?? arch.asrKey! : ''} onChange={e => onChange({ asrOverride: e.target.value === arch.asrKey ? null : e.target.value })}>
        {!external && <option value="">Incluida en el modelo (audio nativo)</option>}
        {Object.keys(priceBook.asr).map(k => <option key={k} value={k}>{asrLabels[k] ?? k}</option>)}
      </select>
      <small>{copy.asrNote}</small>
    </label>

    <fieldset className="sim-field">
      <legend>Alcance del cálculo</legend>
      <div className="sim-choice">
        <label><input type="radio" name="scope" checked={input.scope === 'malla'} onChange={() => onChange({ scope: 'malla' })} /> Malla de escucha completa</label>
        <label><input type="radio" name="scope" checked={input.scope === 'acustico'} onChange={() => onChange({ scope: 'acustico' })} /> Solo el agente acústico</label>
      </div>
      <small>{copy.meshNote}</small>
    </fieldset>

    <fieldset className="sim-field sim-people">
      <legend>Horas de las personas (opcional)</legend>
      <div className="sim-row two">
        <label><span>Horas al año</span><input className="sim-number" type="number" min={0} placeholder="Por acordar" value={input.peopleHours ?? ''} onChange={e => onChange({ peopleHours: optionalNumber(e.target.value) })} /></label>
        <label><span>Costo por hora (pesos)</span><input className="sim-number" type="number" min={0} placeholder="Por acordar" value={input.hourlyCop ?? ''} onChange={e => onChange({ hourlyCop: optionalNumber(e.target.value) })} /></label>
      </div>
      <small>{copy.hoursNote}</small>
    </fieldset>
  </div>;
}
