import { MessageCircle, FilePenLine, Unplug, History, AudioLines, Database, Users, HeartHandshake, ArrowRight } from 'lucide-react';
const current = [
  { icon: MessageCircle, title: 'Conversación', text: 'La persona comparte su experiencia.' },
  { icon: FilePenLine, title: 'Registro manual o disperso', text: 'El profesional dedica atención a registrar.' },
  { icon: Unplug, title: 'El contexto puede perderse', text: 'Parte de lo conversado puede quedar fuera del registro.' },
  { icon: History, title: 'Continuidad limitada', text: 'Retomar puede exigir reconstruir la historia.' },
];
const proposed = [
  { icon: MessageCircle, title: 'Conversación existente', text: 'La persona y el profesional se encuentran.' },
  { icon: AudioLines, title: 'Captura asistida', text: 'Con autorización; estructuración con agentes.' },
  { icon: Database, title: 'Contexto conservado', text: 'Información organizada con referencias.' },
  { icon: Users, title: 'Análisis según necesidad', text: 'El equipo de Analítica trabaja con el área.' },
  { icon: HeartHandshake, title: 'Acción del profesional', text: 'Revisa y define la respuesta.' },
  { icon: History, title: 'Seguimiento', text: 'Acuerdos y pendientes para dar continuidad.' },
];
export function ProcessComparison() {
  return <section className="process-comparison"><div className="section-heading"><div><span className="eyebrow">MEJORAR LOS ENCUENTROS QUE YA EXISTEN</span><h2>Menos esfuerzo en reconstruir. Más contexto para acompañar.</h2></div></div><p className="section-intro">Situación ilustrativa: algunos procesos ya tienen buenos registros. La propuesta busca apoyar el registro y la continuidad donde haga falta; no mide ahorros de tiempo.</p>{[{ name: 'Situación actual posible', items: current, kind: 'current' }, { name: 'Proceso propuesto', items: proposed, kind: 'proposed' }].map(row => <div className={`process-row ${row.kind}`} key={row.kind}><h3>{row.name}</h3><ol>{row.items.map((item, i) => <li key={item.title}><item.icon size={24} /><strong>{item.title}</strong><p>{item.text}</p>{i < row.items.length - 1 && <ArrowRight className="flow-arrow" size={17} />}</li>)}</ol></div>)}<p className="decision-box">Beneficio esperado: menos carga de registro y referencias para reconstruir qué se escuchó, qué se acordó y qué falta revisar.</p></section>;
}
