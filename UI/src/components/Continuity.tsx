import { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock3, UserRound } from 'lucide-react';
import { DemoCase } from '../data/demoCases';
export function Continuity({ cases, compact = false, onPanel }: { cases: DemoCase[]; compact?: boolean; onPanel?: () => void }) {
  const [selected, setSelected] = useState(cases[0].id);
  const person = cases.find(c => c.id === selected) ?? cases[0];
  return <section className="continuity-view">{!compact && <><div className="page-heading"><span className="eyebrow">MEMORIA INSTITUCIONAL EN UN EJEMPLO</span><h1>El siguiente encuentro empieza con contexto.</h1><p>Personas y diálogos ficticios. La memoria distingue lo que se dijo, lo observado y lo que todavía requiere valoración.</p></div><div className="filters" aria-label="Persona del ejemplo">{cases.map(c => <button key={c.id} aria-pressed={selected === c.id} className={selected === c.id ? 'selected' : ''} onClick={() => setSelected(c.id)}>{c.name} · {c.id}</button>)}</div></>}
    <div className="continuity-heading"><UserRound size={27} /><div><span className="eyebrow">CASO FICTICIO · {person.id}</span><h2>{person.name}: {person.need}</h2></div></div>
    <div className="encounter-grid">{person.sessions.map((s, i) => <article className="encounter-card" key={s.title}><span className="eyebrow">0{i + 1} · {s.title}</span><h3>Lo expresado por la persona</h3><blockquote>“{s.said}”</blockquote><h3>Observación del profesional</h3><p>{s.observed}</p><h3>Acción propuesta</h3><p>{s.proposed}</p><div className="next-context"><ArrowRight size={17} /><p>{s.next}</p></div></article>)}</div>
    <div className="signal-note"><strong>Señal pendiente de valoración</strong><p>{person.signal}</p></div>
    <section className="continuity-actions"><h3>Acuerdos y pendientes para retomar</h3>{person.actions.map(a => <div key={a.id}>{a.done ? <CheckCircle2 size={19} /> : <Clock3 size={19} />}<p>{a.text}<small>{a.owner} · {a.done ? 'Completado en la simulación' : 'Pendiente'}</small></p></div>)}</section>
    <div className="demo-note">Vista ilustrativa para el profesional autorizado, con propósito de cuidado y apoyo. Si cambia el responsable, el acceso al historial queda sujeto a una política por definir. Este prototipo no implementa autorización de acceso.</div>
    {onPanel && <button className="primary" onClick={onPanel}>Revisar acuerdos en el panel <ArrowRight size={17} /></button>}
  </section>;
}
