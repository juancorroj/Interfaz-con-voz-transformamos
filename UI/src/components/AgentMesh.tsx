import { useEffect, useRef, useState } from 'react';
import { AudioLines, Network, FileText, Database, ScanLine, Play, Pause, ArrowRight, UserCheck } from 'lucide-react';
import agents from '../data/agents.json';
import './mesh-guide.css';
const listening = [
  { id: 'agente-escuchador-acustico', cat: 'work', x: 9, y: 49, icon: AudioLines },
  { id: 'orquestador-escucha-psicopedagogica', cat: 'orchestrator', x: 28, y: 49, icon: Network },
  { id: 'sub-ficha-cognitivo-academica', cat: 'work', x: 49, y: 15, icon: FileText },
  { id: 'sub-ficha-socio-vocacional-becas', cat: 'work', x: 49, y: 49, icon: FileText },
  { id: 'sub-ficha-plan-trabajo-etica', cat: 'work', x: 49, y: 83, icon: FileText },
  { id: 'sub-auditor-forense-escucha', cat: 'verify', x: 70, y: 30, icon: ScanLine },
  { id: 'sub-conciliador-percepciones-linaje', cat: 'verify', x: 70, y: 69, icon: Network },
  { id: 'sub-curador-staging-ranura1', cat: 'deliver', x: 91, y: 49, icon: Database },
];
const response = [
  { id: 'orquestador-realimentacion-asesoria', cat: 'orchestrator', x: 10, y: 49, icon: Network },
  { id: 'sub-centinela-crisis', cat: 'verify', x: 35, y: 15, icon: ScanLine },
  { id: 'sub-gestor-cooldown', cat: 'work', x: 35, y: 49, icon: Network },
  { id: 'sub-recomendador-app', cat: 'work', x: 35, y: 83, icon: FileText },
  { id: 'sub-disenador-tono-compasivo', cat: 'work', x: 63, y: 15, icon: FileText },
  { id: 'sub-sincronizador-teams', cat: 'deliver', x: 90, y: 15, icon: Network },
  { id: 'sub-auditor-contestabilidad', cat: 'verify', x: 63, y: 49, icon: ScanLine },
  { id: 'sub-certificador-desescalamiento-meco', cat: 'verify', x: 63, y: 83, icon: FileText },
];
const listenEdges = [[0,1],[1,2],[1,3],[1,4],[2,5],[3,5],[4,5],[5,6],[6,7]];
const responseEdges = [[0,1],[0,2],[0,3],[0,4],[4,5],[0,6],[0,7]];
export function AgentMesh({ onInspect }: { onInspect?: (id: string) => void }) {
  const [phase, setPhase] = useState('escucha'); const [active, setActive] = useState(0); const [playing, setPlaying] = useState(true);
  const elapsed = useRef(0);
  const nodes = phase === 'escucha' ? listening : response; const edges = phase === 'escucha' ? listenEdges : responseEdges;
  const current = agents.find(a => a.id === nodes[active].id);
  useEffect(() => {
    if (!playing) return;
    let frame = 0, last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now-last, 100); last = now;
      if (!document.hidden) {
        elapsed.current += dt;
        if (elapsed.current >= 1800) {
          elapsed.current = 0;
          setActive(value => (value + 1) % nodes.length);
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, phase, nodes.length]);
  return <section className="agent-mesh"><div className="mesh-toolbar"><div className="filters">{[['escucha','Escucha'],['respuesta','Realimentación']].map(([id, text]) => <button key={id} className={phase === id ? 'selected' : ''} aria-pressed={phase === id} onClick={() => { setPhase(id); setActive(0); elapsed.current = 0; }}>{text}</button>)}</div><button className="secondary" onClick={() => setPlaying(!playing)}>{playing ? <Pause size={15} /> : <Play size={15} />}{playing ? 'Pausar flujo' : 'Reanudar flujo'}</button></div>
    <div className="mesh-canvas" aria-label={`Malla de ${phase === 'escucha' ? 'escucha' : 'realimentación'}`}><svg viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true">{edges.map(([from,to]) => { const a=nodes[from], b=nodes[to];return <path key={`${from}-${to}`} style={{animationPlayState:playing?'running':'paused'}} className={to === active || from === active ? 'lit' : ''} d={`M ${a.x*10} ${a.y*4.2} C ${(a.x+b.x)*5} ${a.y*4.2}, ${(a.x+b.x)*5} ${b.y*4.2}, ${b.x*10} ${b.y*4.2}`} />; })}</svg>{nodes.map((node,i) => {const agent=agents.find(a=>a.id===node.id);return <button key={node.id} className={`mesh-node cat-${node.cat} ${i === active ? 'active' : ''} ${node.id.startsWith('orquestador') ? 'orchestrator' : ''}`} style={{left:`${node.x}%`,top:`${node.y}%`}} onClick={() => {setActive(i);elapsed.current=0;setPlaying(false);}} aria-pressed={i===active}><node.icon size={22}/><span>{agent?.title ?? node.id}</span><small>{node.id.startsWith('orquestador') ? 'ORQUESTADOR' : 'ESPECIALISTA'}</small></button>;})}</div>
    <ul className="mesh-legend" aria-label="Cómo leer los colores">
      <li className="cat-orchestrator"><i />Orquesta</li><li className="cat-work"><i />Especialistas</li><li className="cat-verify"><i />Verifican y cuidan</li><li className="cat-deliver"><i />Entregan o guardan</li>
    </ul>
    <div className="mesh-inspector" aria-live="polite"><div><span className="eyebrow">{phase === 'escucha' ? 'MAPEA-IA' : 'MARCA-IA'} · {active+1} / {nodes.length}</span><h3>{current?.title}</h3><p>{current?.description}</p></div>{onInspect && current && <button className="text-button" onClick={()=>{setPlaying(false);onInspect(current.id);}}>Ver especificación <ArrowRight size={17}/></button>}</div>
    <div className="mesh-human"><UserCheck size={18}/><span>{phase === 'escucha' ? 'Información estructurada → equipo humano de Analítica → responsable del proceso.' : 'Propuestas de realimentación → revisión y decisión del profesional.'}</span></div><p className="mesh-caption">Topología simplificada de las especificaciones del repositorio · Animación explicativa, sin ejecutar agentes ni enviar datos.</p>
  </section>;
}
