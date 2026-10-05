import { useMemo } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';
// Copia autocontenida del motor Archify para compilar la web sin el repositorio privado.
import { DiagramaProceso, usarSimulacion } from '../../vendor/archify/react';
import { servicioDiagramas } from '../../vendor/archify/aplicacion/ServicioDiagramas';
import { Reveal } from '../../ui/motion/Reveal';
import type { CompareSummaryRow } from '../../content/types';

interface PaneProps {
  /** Id del diagrama en el registro de Archify. */
  diagramId: string;
  tone: 'before' | 'after';
  label: string;
  title: string;
  /** Minutos que se toman como 100 % en la barra de escucha. */
  listenReference: number;
  labels: { clock: string; listening: string; retained: string; idle: string };
}

function Pane({ diagramId, tone, label, title, listenReference, labels }: PaneProps) {
  const sim = usarSimulacion(diagramId);
  const stepIds = useMemo(() => servicioDiagramas.simulacion(diagramId).idsDePasos(), [diagramId]);
  const { estado } = sim;
  const started = estado.indice >= 0;
  return <article className={`pc-pane ${tone}`}>
    <header><span>{label}</span><h3>{title}</h3></header>
    <div className="pc-controls" role="group" aria-label={`Simulación: ${title}`}>
      <button className="pc-main" onClick={sim.alternar} aria-label={sim.reproduciendo ? 'Pausar' : 'Simular'}>{sim.reproduciendo ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}{sim.reproduciendo ? 'Pausar' : started && !estado.terminada ? 'Continuar' : 'Simular'}</button>
      <button onClick={sim.anterior} aria-label="Paso anterior" disabled={estado.indice <= 0}><ChevronLeft size={16} aria-hidden="true" /></button>
      <button onClick={sim.siguiente} aria-label="Paso siguiente" disabled={estado.terminada}><ChevronRight size={16} aria-hidden="true" /></button>
      <button onClick={sim.reiniciar} aria-label="Reiniciar" disabled={!started}><RotateCcw size={15} aria-hidden="true" /></button>
    </div>
    <dl className="pc-meters" aria-live="polite">
      <div><dt>{labels.clock}</dt><dd>{Math.round(estado.minutos)} <small>min</small></dd></div>
      <div><dt>{labels.listening}</dt><dd>{Math.round(estado.escucha)} <small>min</small></dd><span className="pc-bar"><i style={{ width: `${Math.min(100, (estado.escucha / listenReference) * 100)}%` }} /></span></div>
      <div><dt>{labels.retained}</dt><dd>{Math.round(estado.retencion)} <small>%</small></dd><span className="pc-bar"><i style={{ width: `${estado.retencion}%` }} /></span></div>
    </dl>
    <p className="pc-note" aria-live="polite">{estado.paso ? estado.paso.nota : labels.idle}</p>
    <div className="pc-diagram">
      <DiagramaProceso idDiagrama={diagramId} estadoPorNodo={sim.estadoPorNodo} onNodoClick={id => { const index = stepIds.indexOf(id); if (index >= 0) sim.irA(index); }} />
    </div>
  </article>;
}

interface ProcessCompareProps {
  before: { title: string; label: string };
  after: { title: string; label: string };
  summaryTitle: string;
  summary: readonly CompareSummaryRow[];
  labels: PaneProps['labels'];
}

/** El proceso de atención sin y con ResonancIA, lado a lado y con simulación paso a paso. */
export function ProcessCompare({ before, after, summaryTitle, summary, labels }: ProcessCompareProps) {
  return <div className="pc">
    <div className="pc-grid">
      <Pane diagramId="proceso-actual" tone="before" label={before.label} title={before.title} listenReference={30} labels={labels} />
      <Pane diagramId="proceso-resonancia" tone="after" label={after.label} title={after.title} listenReference={30} labels={labels} />
    </div>
    <Reveal><table className="pc-summary">
      <caption>{summaryTitle}</caption>
      <thead><tr><th scope="col" /><th scope="col" className="before">{before.label}</th><th scope="col" className="after">{after.label}</th></tr></thead>
      <tbody>{summary.map(r => <tr key={r.metric}><th scope="row">{r.metric}</th><td className="before">{r.before}</td><td className="after">{r.after}</td></tr>)}</tbody>
    </table></Reveal>
  </div>;
}
