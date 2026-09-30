import { useState } from 'react';
import { GraduationCap, BriefcaseBusiness, Presentation, Building2, Handshake, ArrowRight } from 'lucide-react';
import { audiences } from '../data/audiences';
const icons = [GraduationCap, BriefcaseBusiness, Presentation, Building2, Handshake];

export function AudienceCards({ onChoose }: { onChoose: (id: string) => void }) {
  return <div className="audience-grid">{audiences.map((a, i) => { const Icon = icons[i]; return <button className="audience-card" key={a.id} onClick={() => onChoose(a.id)}><Icon size={25} /><h3>{a.title}</h3><p>{a.benefit}</p><small>{a.status}</small><ArrowRight size={17} /></button>; })}</div>;
}

export function Audiences({ initial = 'estudiantes', onMemory, onPanel }: { initial?: string; onMemory: () => void; onPanel: () => void }) {
  const [selected, setSelected] = useState(initial);
  const a = audiences.find(item => item.id === selected) ?? audiences[0];
  const items = [['Necesidad', a.need], ['Punto de contacto', a.contact], ['Escucha', a.listening], ['Comprensión', a.understanding], ['Realimentación', a.feedback], ['Beneficio esperado', a.benefit]];
  return <><div className="page-heading"><span className="eyebrow">DISTINTAS PERSONAS, UNA MISMA INTENCIÓN</span><h1>¿A quién podemos acompañar?</h1><p>La metodología se adapta al proceso y a sus fuentes. Todos los ejemplos son ficticios; las aplicaciones exploratorias requieren validación con sus responsables.</p></div>
    <AudienceCards onChoose={setSelected} />
    <section className="audience-detail" aria-label="Caso por público" aria-live="polite"><span className="eyebrow">{a.status}</span><h2>{a.title}: {a.benefit}</h2><blockquote>{a.quote}</blockquote><ol className="case-sequence">{items.map(([title, text], i) => <li key={title}><span className="sequence-number">0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol><div className="decision-box"><strong>{a.output}</strong><p>Revisa y decide: {a.owner}. Ninguna propuesta implica una decisión automática o un envío real.</p></div>{a.source && <details className="technical-detail"><summary>Origen del caso de profesores</summary><p>Adaptado del caso de formación docente documentado en el repositorio; no se trasladan sus cifras ni sus afirmaciones de validación.</p><code>{a.source}</code></details>}{a.id === 'estudiantes' && <div className="hero-actions"><button className="primary" onClick={onMemory}>Ver continuidad entre sesiones <ArrowRight size={17} /></button><button className="secondary" onClick={onPanel}>Abrir panel del profesional</button></div>}</section></>;
}
