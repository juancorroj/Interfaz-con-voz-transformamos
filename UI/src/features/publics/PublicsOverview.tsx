import { Callout } from '../../ui/Callout';
import { DataTable } from '../../ui/DataTable';
import { StatusBadge } from '../../ui/StatusBadge';
import { BarChart } from '../../ui/charts/BarChart';
import { Reveal } from '../../ui/motion/Reveal';
import { order } from '../../content/ficha/implementacion';
import { codesignLead, codesignQuestions, codesignTitle, impactCopy, inventoryNote, publics, publicsIntro, reuseLead, reuseTitle } from '../../content/ficha/publicos';
import { CountUp } from '../../ui/CountUp';

interface PublicsOverviewProps {
  onOpenPublic: (id: string) => void;
  onNavigate: (id: string, sub?: string) => void;
}

/** Los cinco públicos de un vistazo: estado, tamaño de cada malla y cuánto se reutiliza. */
export function PublicsOverview({ onOpenPublic, onNavigate }: PublicsOverviewProps) {
  const reuse = publics.filter(p => p.reusePct !== null);
  const withImpact = publics.filter(p => p.impact);
  const total = withImpact.reduce((n, p) => n + p.impact!.value, 0);
  return <>
    <Callout tone="scope" title={publicsIntro.principleTitle}>{publicsIntro.principle}</Callout>

    <Reveal><section className="pub-impact" aria-label={impactCopy.label}>
      <div><small>{impactCopy.label}</small><p>{impactCopy.totalLead}</p><strong><CountUp value={total} /><span>personas</span></strong><em>{impactCopy.totalNote}</em></div>
      <ul>{withImpact.map(p => <li key={p.id}><button onClick={() => onOpenPublic(p.id)}><span>{p.title}</span><b>{p.impact!.value.toLocaleString('es-CO')}</b><i style={{ width: `${(p.impact!.value / total) * 100}%` }} /></button></li>)}</ul>
    </section></Reveal>

    <Reveal><div className="pub-cards">{publics.map(p => <button key={p.id} className={`pub-card ${p.status}`} onClick={() => onOpenPublic(p.id)}>
      <StatusBadge kind={p.status} />
      <h2>{p.title}</h2>
      <p>{p.unit}</p>
      <dl>
        <div><dt>Agentes</dt><dd>{p.agents.listening + p.agents.feedback}</dd></div>
        <div><dt>Fichas temáticas</dt><dd>{p.thematic.length}</dd></div>
        <div><dt>Reutilizado</dt><dd>{p.reusePct === null ? 'origen' : `${p.reusePct} %`}</dd></div>
        {p.impact && <div className="impact-row"><dt>Impacto potencial</dt><dd>{p.impact.value.toLocaleString('es-CO')}</dd></div>}
      </dl>
      <span className="pub-card-cta">Ver el caso</span>
    </button>)}</div></Reveal>

    <p className="pub-proof">{publicsIntro.proof}</p>

    <Reveal><section className="pub-section" aria-labelledby="pub-reuse">
      <h2 id="pub-reuse">{reuseTitle}</h2>
      <p className="pub-lead">{reuseLead}</p>
      <BarChart ariaLabel="Porcentaje de cada malla nueva que no se construyó desde cero"
        items={[...reuse].sort((a, b) => b.reusePct! - a.reusePct!).map(p => ({ id: p.id, label: p.title, value: p.reusePct!, valueLabel: `${p.reusePct} %`, mark: 'reference' as const, note: `${p.thematic.length} fichas temáticas nuevas` }))} />
      <p className="pub-foot">Estudiantes es el origen: la única malla probada de punta a punta.</p>
    </section></Reveal>

    <Reveal><section className="pub-section" aria-labelledby="pub-inventory">
      <h2 id="pub-inventory">Las cinco mallas en números</h2>
      <DataTable caption="Agentes y fichas temáticas por público"
        columns={[{ key: 'public', label: 'Público' }, { key: 'listening', label: 'Agentes de escucha' }, { key: 'feedback', label: 'Agentes de realimentación' }, { key: 'thematic', label: 'Fichas temáticas' }, { key: 'status', label: 'Estado' }]}
        rows={publics.map(p => ({ public: p.title, listening: String(p.agents.listening), feedback: String(p.agents.feedback), thematic: String(p.thematic.length), status: p.status === 'ejecutado' ? 'Ejecutado y validado' : 'Diseñado, no ejecutado' }))} />
      <p className="pub-foot">{inventoryNote}</p>
    </section></Reveal>

    <Reveal><section className="pub-section" aria-labelledby="pub-codesign">
      <h2 id="pub-codesign">{codesignTitle}</h2>
      <p className="pub-lead">{codesignLead}</p>
      <ol className="pub-questions">{codesignQuestions.map((q, i) => <li key={q}><span>{i + 1}</span>{q}</li>)}</ol>
    </section></Reveal>

    <Reveal><section className="pub-section" aria-labelledby="pub-order">
      <h2 id="pub-order">Por dónde se sugiere empezar</h2>
      <p className="pub-lead">{order.recommendation} Es una sugerencia, no una decisión: la priorización estratégica corresponde a la Universidad.</p>
      <ol className="pub-order">{order.steps.map((s, i) => <li key={s.id}><span>{i + 1}</span><div><strong>{s.title}</strong><small>{s.text}</small></div></li>)}</ol>
      <div className="pub-actions">
        <button className="secondary" onClick={() => onNavigate('beneficios', 'publicos')}>Ver qué se espera para cada público</button>
        <button className="text-button" onClick={() => onNavigate('implementacion')}>Ver el plan de implementación</button>
      </div>
    </section></Reveal>
  </>;
}
