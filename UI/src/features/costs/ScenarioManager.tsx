import { useMemo, useState } from 'react';
import { Copy, Link2, Save, Trash2, Upload } from 'lucide-react';
import { copyText } from '../../app/clipboard';
import { simulator as copy } from '../../content/ficha/costos';
import { formatCop, formatCopCompact, formatDelta } from '../../domain/cost/format';
import type { Scenario, SimulationInput } from '../../domain/cost/types';
import { BarChart } from '../../ui/charts/BarChart';
import { DataTable } from '../../ui/DataTable';
import { baseResult, costSimulator, describeInput } from './costModel';

const MAX_COMPARE = 3;

interface ScenarioManagerProps {
  input: SimulationInput;
  scenarios: Scenario[];
  persistent: boolean;
  onSave: (name: string, input: SimulationInput, id?: string) => Scenario;
  onRemove: (id: string) => void;
  /** Carga un escenario en los controles. */
  onLoad: (scenario: Scenario) => void;
  linkFor: (input: SimulationInput) => string;
}

type CopyState = 'idle' | 'ok' | 'fail';

/** Guardar escenarios con nombre, volver a ellos y compararlos entre sí y con la base. */
export function ScenarioManager({ input, scenarios, persistent, onSave, onRemove, onLoad, linkFor }: ScenarioManagerProps) {
  const [name, setName] = useState('');
  const [loaded, setLoaded] = useState<Scenario>();
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [copyState, setCopyState] = useState<CopyState>('idle');

  const nameTaken = (n: string) => scenarios.some(s => s.name.trim().toLowerCase() === n.trim().toLowerCase() && s.id !== loaded?.id);

  const saveNew = () => {
    const finalName = name.trim() || `Escenario ${scenarios.length + 1}`;
    const saved = onSave(nameTaken(finalName) ? `${finalName} (2)` : finalName, input);
    setLoaded(saved);
    setName('');
  };
  const update = () => { if (loaded) setLoaded(onSave(name.trim() || loaded.name, input, loaded.id)); setName(''); };
  const duplicate = (s: Scenario) => onSave(`${s.name} (copia)`, s.input);
  const toggleCompare = (id: string) => setCompareIds(ids => ids.includes(id) ? ids.filter(i => i !== id) : ids.length < MAX_COMPARE ? [...ids, id] : ids);
  const remove = (id: string) => { onRemove(id); setCompareIds(ids => ids.filter(i => i !== id)); if (loaded?.id === id) setLoaded(undefined); };
  const load = (s: Scenario) => { onLoad(s); setLoaded(s); setName(s.name); };

  const share = async () => {
    setCopyState((await copyText(linkFor(input))) ? 'ok' : 'fail');
    window.setTimeout(() => setCopyState('idle'), 2200);
  };

  const compared = useMemo(() => compareIds.map(id => scenarios.find(s => s.id === id)).filter((s): s is Scenario => Boolean(s)), [compareIds, scenarios]);
  const rows = useMemo(() => [
    { label: 'Base de la ficha', input: costSimulator.reset(), result: baseResult },
    ...compared.map(s => ({ label: s.name, input: s.input, result: costSimulator.run(s.input) })),
  ], [compared]);

  return <div className="sim-scenarios">
    <div className="sim-head"><h3>Tus escenarios</h3></div>
    <div className="sim-save">
      <label className="sim-field"><span>Nombre del escenario</span><input type="text" maxLength={60} placeholder="Por ejemplo: Pilot con transcripción propia" value={name} onChange={e => setName(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') saveNew(); }} /></label>
      <div className="sim-save-actions">
        <button className="primary" onClick={saveNew}><Save size={15} aria-hidden="true" /> Guardar escenario</button>
        {loaded && <button className="secondary" onClick={update}>Actualizar «{loaded.name}»</button>}
        <button className="text-button" onClick={share}><Link2 size={14} aria-hidden="true" /> {copyState === 'ok' ? 'Enlace copiado' : copyState === 'fail' ? 'No se pudo copiar' : 'Copiar enlace de este escenario'}</button>
      </div>
      {!persistent && <p className="sim-warning" role="status">{copy.notPersistent}</p>}
    </div>

    {scenarios.length === 0
      ? <p className="sim-empty">{copy.savedEmpty}</p>
      : <ul className="sim-list">{scenarios.map(s => {
        const r = costSimulator.run(s.input);
        const checked = compareIds.includes(s.id);
        const blocked = !checked && compareIds.length >= MAX_COMPARE;
        return <li key={s.id} className={loaded?.id === s.id ? 'loaded' : undefined}>
          <label className="sim-compare"><input type="checkbox" checked={checked} disabled={blocked} onChange={() => toggleCompare(s.id)} /><span>Comparar</span></label>
          <div className="sim-item">
            <strong>{s.name}</strong>
            <small>{r.architecture.name}</small>
            <small>{describeInput(s.input)}</small>
          </div>
          <div className="sim-figure"><b>{formatCopCompact(r.annualAiCop)}</b><small>{formatCop(r.perSessionCop)} por sesión · {formatDelta(r.vsBaselinePct)}</small></div>
          <div className="sim-item-actions">
            <button title="Cargar en los controles" aria-label={`Cargar ${s.name}`} onClick={() => load(s)}><Upload size={15} /></button>
            <button title="Duplicar" aria-label={`Duplicar ${s.name}`} onClick={() => duplicate(s)}><Copy size={15} /></button>
            <button title="Eliminar" aria-label={`Eliminar ${s.name}`} onClick={() => remove(s.id)}><Trash2 size={15} /></button>
          </div>
        </li>;
      })}</ul>}
    {scenarios.length > 0 && compareIds.length === 0 && <p className="sim-hint">Marca hasta {MAX_COMPARE} escenarios con «Comparar» para verlos lado a lado con la base de la ficha.</p>}

    {compared.length > 0 && <div className="sim-compare-view">
      <h3>Comparación</h3>
      <DataTable
        caption="Comparación de escenarios"
        columns={[
          { key: 'name', label: 'Escenario' }, { key: 'config', label: 'Configuración y supuestos' }, { key: 'perSession', label: 'Por sesión' },
          { key: 'annual', label: 'Costo anual de IA' }, { key: 'delta', label: 'Frente a la base' },
        ]}
        rows={rows.map(r => ({
          name: r.label,
          config: `${r.result.architecture.name} — ${describeInput(r.input)}`,
          perSession: `${formatCop(r.result.perSessionCop)} COP`,
          annual: `${formatCopCompact(r.result.annualAiCop)} COP`,
          delta: r.result.vsBaselineCop === 0 ? 'Es la base' : formatDelta(r.result.vsBaselinePct),
        }))} />
      <BarChart ariaLabel="Costo anual de IA de los escenarios comparados"
        items={rows.map((r, i) => ({ id: `${r.label}-${i}`, label: r.label, value: r.result.annualAiCop, valueLabel: formatCopCompact(r.result.annualAiCop), mark: i === 0 ? 'reference' : 'selected', note: i === 0 ? 'Base' : undefined }))} />
    </div>}
  </div>;
}
