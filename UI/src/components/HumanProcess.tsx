import { Users, AudioLines, Network, Database, ChartNoAxesCombined, UserCheck, HeartHandshake, ArrowRight } from 'lucide-react';
const flow = [
  { icon: Users, title: 'Persona y profesional', text: 'Se encuentran en un punto de contacto existente.', who: 'Personas' },
  { icon: AudioLines, title: 'Escucha autorizada', text: 'El registro se explica y se solicita autorización.', who: 'Profesional + persona' },
  { icon: Network, title: 'Estructuración asistida', text: 'Agentes adecuados a las fuentes organizan lo expresado.', who: 'Apoyo tecnológico' },
  { icon: Database, title: 'Información organizada', text: 'Relatos, observaciones y acuerdos con referencias.', who: 'Resultado para revisar' },
  { icon: Users, title: 'Equipo de Analítica', text: 'Construye indicadores y análisis con el área según su necesidad.', who: 'Equipo humano' },
  { icon: ChartNoAxesCombined, title: 'Tablero o análisis', text: 'Hace visible la información útil para la decisión.', who: 'Resultado según necesidad' },
  { icon: UserCheck, title: 'Profesional responsable', text: 'Valora el contexto, revisa las propuestas y decide.', who: 'Decisión humana' },
  { icon: HeartHandshake, title: 'Realimentación', text: 'Acciones acordadas y seguimiento de resultados.', who: 'Personas + apoyo tecnológico' },
];
export function HumanProcess() {
  return <section className="human-process"><div className="section-heading"><div><span className="eyebrow">FUNCIONAMIENTO PROPUESTO</span><h2>Personas, apoyos y resultados.</h2></div></div><ol>{flow.map((item, i) => <li key={item.title}><div><span>0{i + 1}</span><item.icon size={26} /></div><small>{item.who}</small><h3>{item.title}</h3><p>{item.text}</p>{i < flow.length - 1 && <ArrowRight size={17} className="flow-arrow" />}</li>)}</ol><p className="field-help">Diagrama conceptual, sin ejecución de agentes en vivo. La memoria conserva resultados para el siguiente encuentro; los accesos y la infraestructura aún deben definirse.</p></section>;
}
