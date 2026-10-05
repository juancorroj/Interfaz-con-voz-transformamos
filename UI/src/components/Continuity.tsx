import { useState } from 'react';
import { ArrowDown, ArrowRight, CheckCircle2, Clock3, Eye, Lightbulb, MessageCircle, UserRound } from 'lucide-react';
import { DemoCase } from '../data/demoCases';
import { Reveal } from '../ui/motion/Reveal';
import './continuity.css';

/** Memoria viva: los encuentros de una persona como un hilo en el que cada uno hereda el contexto del anterior. */
export function Continuity({ cases, onPanel }: { cases: DemoCase[]; onPanel?: () => void }) {
  const [selected, setSelected] = useState(cases[0].id);
  const person = cases.find(c => c.id === selected) ?? cases[0];
  return <section className="continuity-view mem">
    <div className="page-heading"><span className="eyebrow">MEMORIA INSTITUCIONAL EN UN EJEMPLO</span><h2>El siguiente encuentro empieza con contexto.</h2><p>Personas y diálogos de una simulación cercana a la realidad. La memoria distingue lo que se dijo, lo observado y lo que todavía requiere valoración.</p></div>

    <div className="mem-people" role="group" aria-label="Persona del ejemplo">
      {cases.map(c => <button key={c.id} className={c.id === person.id ? 'selected' : ''} aria-pressed={c.id === person.id} onClick={() => setSelected(c.id)}>
        <span className="mem-avatar"><UserRound size={20} aria-hidden="true" /></span><strong>{c.name}</strong><small>{c.program}</small>
      </button>)}
    </div>

    <header className="mem-head" key={person.id}>
      <span className="eyebrow">CASO SIMULADO · {person.id}</span>
      <h3>{person.name}: {person.need}</h3>
    </header>

    <ol className="mem-thread" key={`${person.id}-thread`}>
      {person.sessions.map((s, i) => <li key={s.title}>
        <Reveal><article className="mem-encounter">
          <span className="mem-node" aria-hidden="true">{i + 1}</span>
          <div className="mem-card">
            <h4>{s.title}</h4>
            <div className="mem-trio">
              <div className="said"><span><MessageCircle size={15} aria-hidden="true" />Lo expresado por la persona</span><blockquote>“{s.said}”</blockquote></div>
              <div><span><Eye size={15} aria-hidden="true" />Observación del profesional</span><p>{s.observed}</p></div>
              <div><span><Lightbulb size={15} aria-hidden="true" />Acción propuesta</span><p>{s.proposed}</p></div>
            </div>
          </div>
        </article></Reveal>
        <div className={`mem-carry ${i === person.sessions.length - 1 ? 'last' : ''}`}>
          <span className="mem-carry-icon"><ArrowDown size={16} aria-hidden="true" /></span>
          <div><small>{i === person.sessions.length - 1 ? 'Y el próximo encuentro empieza así' : 'Lo que viaja al siguiente encuentro'}</small><p>{s.next}</p></div>
        </div>
      </li>)}
    </ol>

    <div className="signal-note"><strong>Señal pendiente de valoración</strong><p>{person.signal}</p></div>
    <section className="mem-actions"><h3>Acuerdos y pendientes para retomar</h3>
      <ul>{person.actions.map(a => <li key={a.id} className={a.done ? 'done' : ''}>{a.done ? <CheckCircle2 size={20} aria-hidden="true" /> : <Clock3 size={20} aria-hidden="true" />}<p>{a.text}<small>{a.owner} · {a.done ? 'Completado en la simulación' : 'Pendiente'}</small></p></li>)}</ul>
    </section>
    <div className="demo-note">Vista ilustrativa para el profesional autorizado, con propósito de cuidado y apoyo. Si cambia el responsable, el acceso al historial queda sujeto a una política por definir. Este prototipo no implementa autorización de acceso.</div>
    {onPanel && <button className="primary" onClick={onPanel}>Revisar acuerdos en el panel <ArrowRight size={17} /></button>}
  </section>;
}
