import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, Maximize2, Minimize2, UserRound, HeartHandshake, History } from 'lucide-react';
import { ProcessComparison } from './ProcessComparison';
import { RecordingConsent } from './RecordingConsent';
import { HumanProcess } from './HumanProcess';
import { FeedbackExamples } from './FeedbackExamples';
import { AudienceCards } from './Audiences';
import { DemoCase } from '../data/demoCases';
const chapters = [
  { label: 'Una persona', title: 'Alex quiere encontrar una forma de organizarse.', time: '0:40' },
  { label: 'El proceso actual', title: '¿Qué pasa con el contexto después del encuentro?', time: '0:45' },
  { label: 'La propuesta', title: 'La tecnología apoya. El equipo humano comprende y decide.', time: '1:30' },
  { label: 'El beneficio', title: 'La próxima conversación no empieza de cero.', time: '1:15' },
  { label: 'Otros públicos', title: 'Una metodología que se adapta a distintas necesidades.', time: '0:50' },
];
export function GuidedExperience({ cases, onAudience, onMemory, onPanel }: { cases: DemoCase[]; onAudience: (id: string) => void; onMemory: () => void; onPanel: () => void }) {
  const [step, setStep] = useState(0); const [full, setFull] = useState(false); const [error, setError] = useState('');
  const alex = cases[0];
  useEffect(() => { const sync = () => setFull(!!document.fullscreenElement); document.addEventListener('fullscreenchange', sync); return () => document.removeEventListener('fullscreenchange', sync); }, []);
  async function toggleFull() { try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); setError(''); } catch { setError('No se pudo abrir pantalla completa. Puedes continuar con el mismo recorrido en esta ventana.'); } }
  const move = (i: number) => { setStep(i); window.scrollTo({ top: 0, behavior: 'instant' }); };
  return <div className="guided-experience"><div className="page-heading"><div className="tour-kicker"><span className="eyebrow">RECORRIDO PARA PRESENTAR · DATOS SIMULADOS</span><button className="secondary" onClick={toggleFull}>{full ? <Minimize2 size={16} /> : <Maximize2 size={16} />}{full ? 'Salir de pantalla completa' : 'Pantalla completa'}</button></div><h1>{chapters[step].title}</h1><p>Guion sugerido de cinco minutos. Los tiempos son una pauta de exposición, no resultados medidos ni una duración validada con público.</p>{error && <p role="status">{error}</p>}</div>
    <nav className="steps" aria-label="Pasos de la presentación">{chapters.map((c, i) => <button key={c.label} className={step === i ? 'selected' : ''} aria-current={step === i ? 'step' : undefined} onClick={() => move(i)}><span>0{i + 1}</span>{c.label}<small>{c.time}</small></button>)}</nav>
    <section className="chapter-content" aria-label={chapters[step].label}>
      {step === 0 && <div className="person-story"><div className="story-portrait"><UserRound size={90} /><span>Alex</span><small>Persona simulada · Estudiante</small></div><div><span className="eyebrow">UNA NECESIDAD, UN ENCUENTRO EXISTENTE</span><h2>“{alex.sessions[0].said}”</h2><p>Alex acude a una asesoría psicopedagógica programada. El profesional quiere dedicar atención a escuchar y acordar apoyos, sin perder el contexto al terminar.</p><div className="decision-box"><strong>Lo que importa</strong><p>Comprender lo que Alex necesita, conservar los acuerdos y retomar lo pendiente. El criterio del profesional guía el acompañamiento.</p></div></div></div>}
      {step === 1 && <ProcessComparison />}
      <div hidden={step !== 2}><RecordingConsent /><HumanProcess /></div>
      {step === 3 && <><div className="benefit-pair"><article><HeartHandshake size={27} /><h2>Para la persona</h2><p>Puede retomar sus acuerdos sin volver a explicar toda su historia.</p></article><article><History size={27} /><h2>Para el profesional</h2><p>Encuentra el contexto y los pendientes para orientar el siguiente encuentro. Beneficio esperado, todavía por evaluar.</p></article></div><div className="continuity-snapshot"><span className="eyebrow">MEMORIA VISIBLE · ALEX · SIMULACIÓN CERCANA A LA REALIDAD</span><div><article><h3>Se había identificado</h3><p>{alex.sessions[0].observed}</p></article><article><h3>Se había propuesto</h3><p>{alex.sessions[0].proposed}</p></article><article><h3>Para retomar</h3><p>{alex.actions.filter(a => !a.done).map(a => a.text).join(' ') || 'Los acuerdos del ejemplo están completados; conversar sobre los próximos pasos.'}</p></article></div><p className="field-help">El acceso de un nuevo responsable depende de una política por definir.</p><button className="text-button" onClick={onMemory}>Abrir la memoria completa <ArrowRight size={17} /></button></div><details className="technical-detail"><summary>Ver ejemplos de acciones de realimentación</summary><FeedbackExamples onPanel={onPanel} /></details></>}
      {step === 4 && <><p className="section-intro">La propuesta aprovecha puntos de contacto existentes y adapta el análisis y las acciones a cada público.</p><AudienceCards onChoose={onAudience} /><div className="decision-box"><strong>Una propuesta abierta a otros procesos.</strong><p>El caso psicopedagógico se demuestra con información simulada. Profesores tiene un caso documentado en el repositorio; los demás escenarios son exploratorios. Cada aplicación requiere trabajo con sus responsables.</p></div><button className="secondary" onClick={onPanel}>Explorar el panel del profesional <ArrowRight size={17} /></button></>}
    </section><div className="journey-controls tour-controls"><button className="text-button" disabled={step === 0} onClick={() => move(step - 1)}><ChevronLeft size={17} />Anterior</button><span className="muted">{step + 1} de 5 · {chapters[step].time} sugeridos</span><button className="primary" onClick={() => move(step === 4 ? 0 : step + 1)}>{step === 4 ? 'Volver al inicio del recorrido' : 'Siguiente'}<ArrowRight size={17} /></button></div>
  </div>;
}
