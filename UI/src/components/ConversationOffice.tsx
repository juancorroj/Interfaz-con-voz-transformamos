import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, FileText, Pause, Play, RotateCcw, UserCheck } from 'lucide-react';
import agents from '../data/agents.json';
import './conversation-office.css';
import { OfficeScene } from './OfficeScene';

const desks = [
  { id: 'agente-escuchador-acustico', name: 'Escuchador', role: 'Recibe la conversación', color: '#83d9cf', input: 'Transcripción ficticia de Alex.', task: 'Preparar el diálogo para la extracción, manteniendo quién dijo cada frase.', output: 'Fragmentos atribuidos a Alex y al profesional.' },
  { id: 'orquestador-escucha-psicopedagogica', name: 'Orquestador', role: 'Distribuye las tareas', color: '#bda8f2', input: 'Conversación preparada.', task: 'Coordinar las fichas temáticas y su revisión.', output: 'Tres tareas para los especialistas y una ruta de revisión.' },
  { id: 'sub-ficha-cognitivo-academica', name: 'Académico', role: 'Organiza el estudio', color: '#95bdf3', input: '«Se me juntan las entregas».', task: 'Extraer la dificultad académica expresada y su evidencia.', output: 'Necesidad expresada: organizar las entregas.' },
  { id: 'sub-ficha-socio-vocacional-becas', name: 'Contexto', role: 'Conserva lo expresado', color: '#f0c189', input: '«Tengo preguntas sobre mi beca».', task: 'Registrar la inquietud sin inferir su situación económica ni las condiciones de la beca.', output: 'Pregunta pendiente: aclarar condiciones de la beca.' },
  { id: 'sub-ficha-plan-trabajo-etica', name: 'Acuerdos', role: 'Recoge compromisos', color: '#e3a6c8', input: '«Voy a probar un calendario esta semana».', task: 'Separar el compromiso de Alex de las observaciones del profesional.', output: 'Acuerdo: probar un calendario durante la semana.' },
  { id: 'sub-auditor-forense-escucha', name: 'Auditor', role: 'Vuelve a la fuente', color: '#e3d392', input: 'Las tres fichas y sus fragmentos de origen.', task: 'Contrastar cada afirmación con lo que se dijo.', output: 'Tres extractos sustentados. No hay base para afirmar que Alex perderá la beca.' },
  { id: 'sub-conciliador-percepciones-linaje', name: 'Conciliador', role: 'Conecta perspectivas', color: '#a6c9b2', input: 'Expresión de Alex y observación del profesional.', task: 'Conservar ambas perspectivas y sus fuentes sin convertir una observación en un hecho.', output: 'Lo expresado y lo observado permanecen separados.' },
  { id: 'sub-curador-staging-ranura1', name: 'Curador', role: 'Prepara la memoria', color: '#9ddce6', input: 'Fichas revisadas y acuerdos con sus fuentes.', task: 'Organizar una propuesta de memoria para revisión profesional.', output: 'Borrador estructurado: necesidad, pregunta pendiente, acuerdo y evidencias.' },
];
const steps = [
  { title: 'Llega una conversación', active: [0], message: 'El escuchador recibe el ejemplo y conserva las voces de la conversación.', transfer: 'Conversación → Escuchador', detail: 'Primero importa saber quién dijo qué.' },
  { title: 'El orquestador distribuye', active: [1], message: 'El orquestador entrega una tarea concreta a cada especialista.', transfer: 'Escuchador → Orquestador → Especialistas', detail: 'Una misma conversación puede aportar a distintas fichas.' },
  { title: 'Tres especialistas colaboran', active: [2, 3, 4], message: 'Académico, Contexto y Acuerdos organizan su parte en paralelo.', transfer: 'Especialistas → Orquestador', detail: 'Cada especialista conserva el fragmento que sustenta su extracción.' },
  { title: 'La evidencia se revisa', active: [5], message: 'El auditor contrasta las fichas con la conversación original.', transfer: 'Especialistas → Auditor', detail: 'Preguntar por una beca no significa que se vaya a perder.' },
  { title: 'Las perspectivas se conectan', active: [6], message: 'El conciliador mantiene separadas la voz de Alex y la observación profesional.', transfer: 'Auditor → Conciliador', detail: 'Conectar el contexto no significa borrar sus diferencias.' },
  { title: 'La memoria toma forma', active: [7], message: 'El curador prepara el borrador con los acuerdos y sus fuentes.', transfer: 'Conciliador → Curador', detail: 'La información queda preparada para que una persona la revise.' },
  { title: 'El profesional conserva la decisión', active: [], message: 'El profesional revisa el borrador, corrige lo necesario y decide el siguiente paso.', transfer: 'Curador → Revisión humana', detail: 'La simulación termina con una entrega para revisión; no activa acciones ni contactos.' },
];

function Avatar({ color, human = false }: { color: string; human?: boolean }) {
  return <svg className="co-avatar" viewBox="0 0 40 48" aria-hidden="true"><ellipse cx="20" cy="44" rx="15" ry="3" fill="#0005"/><path d="M10 29h20v12H10z" fill={color}/><path d="M10 29H6v10h4m20-10h4v10h-4" fill={color}/><path d="M13 40h5v5h-5m9-5h5v5h-5" fill="#496071"/><path d="M10 9h20v19H10z" fill={human ? '#e9c4ab' : '#d5e7e0'}/><path d="M10 9h20v6H10zM7 14h4v10H7m22-10h4v10h-4" fill={color}/><path d="M14 18h3v4h-3m9-4h3v4h-3" fill="#18343b"/><path d="M17 25h6" stroke="#18343b" strokeWidth="2"/>{!human&&<path d="M20 4v5m-2-6h4" stroke={color} strokeWidth="2"/>}</svg>;
}

export function ConversationOffice({ onInspect, compact = false }: { onInspect: (id: string) => void; compact?: boolean }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [elapsed, setElapsed] = useState(0);
  const current = steps[step];
  const desk = desks[selected];
  const agent = agents.find(a => a.id === desk.id);
  useEffect(() => {
    if (!playing) return;
    let frame = 0, last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now-last)/1000, .1); last=now;
      if (!document.hidden) setElapsed(t=>Math.min(6.5,t+dt*speed));
      frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(frame);
  }, [playing, speed]);
  useEffect(()=>{
    if(!playing || elapsed<6.5) return;
    const next=(step+1)%steps.length;setStep(next);setElapsed(0);
    if(steps[next].active.length)setSelected(steps[next].active[0]);
  },[elapsed,playing,step]);
  function jump(next: number) {
    setPlaying(false); setStep(next); setElapsed(0);
    if (steps[next].active.length) setSelected(steps[next].active[0]);
  }
  function play() {
    setPlaying(!playing);
  }
  return <section className={`conversation-office ${compact ? 'co-pitch' : ''} ${playing ? 'co-playing' : ''}`} aria-label="Detrás de la conversación">
    <header className="co-intro"><div><span className="eyebrow">DETRÁS DE LA CONVERSACIÓN</span><h2>Una conversación. Todo un equipo.</h2><p>Entra a la oficina de los agentes y sigue el camino del contexto.</p></div><span className="co-demo"><span/>Simulación ilustrativa</span></header>
    <div className="co-source"><FileText size={20}/><div><strong>La voz de Alex · ejemplo ficticio</strong><p>“Se me juntan las entregas. Tengo preguntas sobre mi beca. Voy a probar un calendario esta semana.”</p><small>Observación del profesional: Alex propone una estrategia que se revisará en el próximo encuentro.</small></div></div>
    <div className="co-controls"><div><button className="primary" onClick={play}>{playing ? <Pause size={16}/> : <Play size={16}/>} {playing ? 'Pausar simulación' : 'Reanudar simulación'}</button><button className="secondary" onClick={()=>jump(0)} aria-label="Reiniciar simulación"><RotateCcw size={16}/></button></div><div><button className="secondary" disabled={step===0} onClick={()=>jump(step-1)} aria-label="Paso anterior"><ArrowLeft size={16}/></button><label className="co-speed">Velocidad<select value={speed} onChange={e=>setSpeed(Number(e.target.value))}><option value={.5}>0.5×</option><option value={1}>1×</option><option value={1.5}>1.5×</option></select></label><span>{step+1} / {steps.length}</span><button className="secondary" disabled={step===6} onClick={()=>jump(step+1)} aria-label="Paso siguiente"><ArrowRight size={16}/></button></div></div>
    <div className="co-scene-progress" aria-hidden="true"><span style={{width:`${elapsed/6.5*100}%`}}/></div>
    <div className="co-layout"><OfficeScene key={step} desks={desks} active={current.active} completed={steps.slice(0,step).flatMap(s=>s.active)} selected={selected} step={step} playing={playing} time={elapsed} onSelect={i=>{if(!current.active.includes(i))jump(steps.findIndex(s=>s.active.includes(i)));setSelected(i);setPlaying(false);}}/>
      <aside className="co-inspector" aria-label="Detalle del agente"><span className="eyebrow">EN SU PUESTO DE TRABAJO</span><div className="co-inspector-title"><Avatar color={desk.color}/><h3>{agent?.title ?? desk.name}</h3></div><dl><dt>Recibe</dt><dd>{desk.input}</dd><dt>Su tarea en este ejemplo</dt><dd>{desk.task}</dd><dt>Entrega prevista</dt><dd>{desk.output}</dd></dl><button className="text-button" onClick={()=>{setPlaying(false);onInspect(desk.id);}}>Ver especificación <ArrowRight size={16}/></button><small>Selecciona cualquier puesto para explorar su trabajo. La reproducción se pausa para que puedas leer.</small></aside>
    </div>
    <div className="co-narration" aria-live="polite" aria-atomic="true"><span className="co-step-number">0{step+1}</span><div><h3>{current.title}</h3><p>{current.message}</p><small>{current.detail}</small></div></div>
    <nav className="co-timeline" aria-label="Pasos de la simulación">{steps.map((s,i)=><button key={s.title} aria-current={step===i?'step':undefined} onClick={()=>jump(i)}><span>{i<step?<Check size={13}/>:String(i+1).padStart(2,'0')}</span>{s.title}</button>)}</nav>
    {step===6&&<div className="co-result"><span className="eyebrow">ENTREGA A LA PERSONA RESPONSABLE</span><h3>Un borrador para continuar la conversación.</h3><div><p><strong>Necesidad expresada</strong>Organizar las entregas.</p><p><strong>Pregunta pendiente</strong>Aclarar las condiciones de la beca.</p><p><strong>Acuerdo de Alex</strong>Probar un calendario esta semana.</p></div><small>Revisar con Alex y definir el seguimiento. Ninguna acción se envía automáticamente.</small></div>}
    <p className="co-footnote">Recorrido ilustrativo de los ocho agentes de Escucha, con el orquestador como coordinador de las entregas. Datos y resultados preparados para explicar el modelo; no se ejecutan agentes ni se guardan cambios en el panel profesional.</p>
  </section>;
}
