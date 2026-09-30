import { audiences } from '../data/audiences';
import { ArrowUpRight } from 'lucide-react';
export function FeedbackExamples({ onPanel }: { onPanel: () => void }) {
  return <section className="feedback-examples"><div className="section-heading"><div><span className="eyebrow">REALIMENTACIÓN SEGÚN LA NECESIDAD</span><h2>La respuesta puede tomar distintas formas.</h2></div></div><div className="feedback-grid">{audiences.map(a => <article key={a.id}><span className="eyebrow">{a.title}</span><h3>{a.output}</h3><p>{a.feedback}</p><small>Revisa y decide: {a.owner}</small><span className="output-status">Propuesta ilustrativa · Sin envío</span>{a.id === 'estudiantes' && <button className="text-button" onClick={onPanel}>Revisar el borrador ficticio <ArrowUpRight size={17} /></button>}</article>)}</div></section>;
}
