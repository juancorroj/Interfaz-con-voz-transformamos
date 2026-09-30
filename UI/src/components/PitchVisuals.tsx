import { useEffect, useState } from 'react';
import { AudioLines, ArrowRight, BrainCircuit, HeartHandshake, MessageCircle, UserCheck, Users, Workflow, Building2, Database, ScanLine, Sparkles, Play, Pause, Check } from 'lucide-react';

function useVisualLoop(count: number, duration: number) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => { if (!document.hidden) setStep(value => (value + 1) % count); }, duration);
    return () => window.clearInterval(timer);
  }, [count, duration, playing]);
  return { step, playing, toggle: () => setPlaying(value => !value), select: (value: number) => { setStep(value); setPlaying(false); } };
}
const orbitStages = [
  { Icon: MessageCircle, title: 'Interacción', verb: 'Escuchar', detail: 'Todo empieza con una conversación.' },
  { Icon: AudioLines, title: 'Captura', verb: 'Escuchar', detail: 'La voz conserva su contexto.' },
  { Icon: Database, title: 'Memoria', verb: 'Comprender', detail: 'Una historia que podemos retomar.' },
  { Icon: BrainCircuit, title: 'Analítica', verb: 'Comprender', detail: 'Conocimiento útil para el proceso.' },
  { Icon: UserCheck, title: 'Decisión', verb: 'Realimentar', detail: 'El criterio permanece en la persona.' },
  { Icon: Sparkles, title: 'Activación', verb: 'Realimentar', detail: 'Los acuerdos se convierten en acciones.' },
  { Icon: HeartHandshake, title: 'Resultado', verb: 'Realimentar', detail: 'Revisamos qué cambió para la persona.' },
  { Icon: ScanLine, title: 'Realimentación', verb: 'Realimentar', detail: 'Lo aprendido vuelve al siguiente encuentro.' },
];

export function PitchIntro({ onPanel, recording }: { onPanel: () => void; recording: boolean }) {
  const loop = useVisualLoop(8, 3500);
  const current = orbitStages[loop.step];
  return <div className={`pitch-cosmos ${loop.playing ? '' : 'visual-paused'}`}>
    <div className="pitch-constellation">
      <svg viewBox="0 0 600 600" aria-hidden="true" className="pitch-orbit-lines">
        <circle cx="300" cy="300" r="226"/><circle cx="300" cy="300" r="164"/><circle cx="300" cy="300" r="107"/>
        {orbitStages.map((_,i)=>{const angle=(i*45-90)*Math.PI/180;return <line key={i} x1="300" y1="300" x2={300+226*Math.cos(angle)} y2={300+226*Math.sin(angle)} className={i===loop.step?'lit':''}/>;})}
        <g className="orbit-comet"><circle cx="300" cy="74" r="5"/><circle cx="285" cy="74.5" r="3"/><circle cx="271" cy="76" r="1.5"/></g>
        <g className="orbit-comet inner"><circle cx="300" cy="136" r="3"/></g>
        {Array.from({length:38},(_,i)=><circle className="cosmos-star" key={i} cx={25+(i*137)%550} cy={20+(i*83)%560} r={i%3===0?1.6:.7} style={{animationDelay:`${i*.17}s`}}/>)}
      </svg>
      <div className="pitch-memory-core"><AudioLines size={44}/><strong>ResonancIA</strong><span>MEMORIA VIVA</span></div>
      {orbitStages.map(({Icon,title},i)=>{const angle=(i*45-90)*Math.PI/180;return <button className={`pitch-orbit-node ${i===loop.step?'active':''}`} key={title} style={{left:`${50+37.7*Math.cos(angle)}%`,top:`${50+37.7*Math.sin(angle)}%`}} onClick={()=>loop.select(i)} aria-pressed={i===loop.step}><Icon size={23}/><span>{title}</span></button>;})}
    </div>
    <div className="pitch-cosmos-copy"><span className="eyebrow">DE LA VOZ AL APRENDIZAJE</span><div className="pitch-three-verbs">{['Escuchar','Comprender','Realimentar'].map(v=><span key={v} className={current.verb===v?'active':''}>{v}<i/></span>)}</div><div key={loop.step} className="pitch-orbit-caption"><span>0{loop.step+1} / 08 · {current.title}</span><p>{current.detail}</p></div><div className="pitch-visual-controls"><button className="text-button" onClick={loop.toggle}>{loop.playing?<Pause size={15}/>:<Play size={15}/>} {loop.playing?'Pausar ciclo':'Reanudar ciclo'}</button>{!recording&&<button className="text-button" onClick={onPanel}>Ver el panel <ArrowRight size={15}/></button>}</div></div>
  </div>;
}

export function PitchFlow() {
  const loop=useVisualLoop(4,4200);
  const labels=['La conversación','El contexto','La propuesta','El criterio humano'];
  return <div className={`pitch-live-flow phase-${loop.step} ${loop.playing?'':'visual-paused'}`}>
    <div className="pitch-flow-topline"><span><i/> DEMOSTRACIÓN · {labels[loop.step]}</span><button className="text-button" onClick={loop.toggle}>{loop.playing?<Pause size={15}/>:<Play size={15}/>} {loop.playing?'Pausar':'Reanudar'}</button></div>
    <div className="pitch-flow-stage">
      <div className={`pitch-flow-station voice ${loop.step===0?'active':''}`}><div className="pitch-person-disc"><Users size={44}/></div><h2>Mateo + su asesor</h2><div className="pitch-voice-wave" aria-hidden="true">{Array.from({length:24},(_,i)=><i key={i} style={{animationDelay:`${i*.13}s`,height:`${12+(i*17)%36}px`}}/>)}</div><span className="pitch-speech-fragment">“Me preocupa mi beca…”</span><small>ESCUCHAR</small></div>
      <div className="pitch-packet-lane" aria-hidden="true"><i/><i/><i/></div>
      <div className={`pitch-flow-station intelligence ${loop.step===1?'active':''}`}><div className="pitch-brain-disc"><BrainCircuit size={55}/><span/><span/></div><h2>Contexto conectado</h2><div className="pitch-context-tags"><span>Académico</span><span>Económico</span><span>Seguimiento</span></div><small>COMPRENDER</small></div>
      <div className="pitch-packet-lane" aria-hidden="true"><i/><i/><i/></div>
      <div className={`pitch-flow-station human ${loop.step>=2?'active':''}`}><div className="pitch-person-disc"><UserCheck size={44}/></div><h2>Decisión humana</h2><div className="pitch-human-steps"><span><Check size={13}/> Revisar</span><span><Check size={13}/> Ajustar</span><span><Check size={13}/> Decidir</span></div><small>REALIMENTAR</small></div>
    </div>
    <div className={`pitch-action-preview ${loop.step>=2?'visible':''}`}><span className="pitch-teams-mark">T</span><div><small>PROPUESTA ILUSTRATIVA · MICROSOFT TEAMS</small><strong>Acordar apoyo académico y orientación sobre la beca.</strong></div><span className="pitch-pending-human">{loop.step===3?'El profesional decide':'Pendiente de revisión'}</span></div>
    <div className="pitch-flow-track">{labels.map((label,i)=><button key={label} aria-label={label} aria-pressed={loop.step===i} onClick={()=>loop.select(i)} className={loop.step===i?'active':''}><span/>0{i+1}</button>)}</div>
  </div>;
}

export function PitchBenefits() {
  return <div className="pitch-impact-ripple"><div className="pitch-impact-origin"><AudioLines size={32}/><span>Una conversación.</span></div><div className="pitch-impact-levels">{[
    {Icon:Users,title:'Personas',word:'Continuidad'},
    {Icon:Workflow,title:'Procesos',word:'Trazabilidad'},
    {Icon:Building2,title:'Universidad',word:'Memoria'},
  ].map(({Icon,title,word},i)=><div className="pitch-impact-node" key={title} style={{animationDelay:`${1+i*.45}s`}}><div><Icon size={40}/></div><span>{title}</span><strong>{word}</strong></div>)}</div></div>;
}

export const pitchAudiences = [
  { title: 'Estudiantes', benefit: 'La historia de Mateo continúa.', need: 'Conectar el contexto académico y las inquietudes expresadas durante la asesoría.', output: 'Acordar un acompañamiento y retomar los compromisos en el siguiente encuentro.', owner: 'el profesional responsable del acompañamiento' },
  { title: 'Graduados', benefit: 'Aprender a lo largo de la vida.', need: 'Comprender las necesidades de actualización que aparecen en sus conversaciones.', output: 'Orientar una oferta de aprendizaje más flexible y pertinente.', owner: 'el responsable del proceso con graduados' },
  { title: 'Aliados y empresas', benefit: 'Conectar retos con capacidades.', need: 'Escuchar las necesidades del entorno y relacionarlas con lo que puede aportar la Universidad.', output: 'Explorar conexiones entre necesidades expresadas y capacidades institucionales.', owner: 'el responsable de la relación con el aliado' },
  { title: 'Profesores', benefit: 'Acompañar su desarrollo.', need: 'Comprender las necesidades de acompañamiento y desarrollo que expresan los profesores.', output: 'Orientar apoyos y oportunidades de desarrollo con el contexto de cada proceso.', owner: 'el responsable del proceso con profesores' },
  { title: 'Administrativos', benefit: 'Que el conocimiento tenga continuidad.', need: 'Conservar conversaciones y decisiones relevantes cuando una persona cambia de rol.', output: 'Construir memoria de gestión y facilitar las curvas de aprendizaje.', owner: 'el dueño del proceso' },
];
