import { CountUp } from '../../ui/CountUp';

export interface CostScenario {
  id: string;
  value: number;
  label: string;
  perSession: string;
  annual: string;
}

interface CostScaleProps {
  scenarios: readonly CostScenario[];
  tag: string;
  unit: string;
  note: string;
}

const MIN = 30;
const MAX = 6000;
const position = (value: number) => ((Math.log10(value) - Math.log10(MIN)) / (Math.log10(MAX) - Math.log10(MIN))) * 100;

/** Las configuraciones evaluadas sobre una escala logarítmica: de la más costosa a la más económica, con el anual al lado. */
export function CostScale({ scenarios, tag, unit, note }: CostScaleProps) {
  return <figure className="cscale">
    <ol aria-label="Costo por sesión de cada configuración">{scenarios.map(s => <li key={s.id} className={s.id}>
      <div className="cscale-head"><span>{s.label}</span>{s.id === 'validacion' && <em>{tag}</em>}</div>
      <div className="cscale-track"><span className="cscale-bar" style={{ width: `${position(s.value)}%` }} /></div>
      <div className="cscale-figs"><strong>$<CountUp value={s.value} /> <small>COP {unit}</small></strong><b>{s.annual}</b><small>al año con 14.000 sesiones</small></div>
    </li>)}</ol>
    <figcaption>{note}</figcaption>
  </figure>;
}
