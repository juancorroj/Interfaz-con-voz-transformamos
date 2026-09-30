import { useEffect, useRef, useState } from 'react';
import { AudioLines, Orbit, Network, GitBranch, BookOpen, Users, ArrowUpRight, ArrowRight, Play, Search, X, Brain, HeartHandshake, ChevronLeft, ChevronRight, Sparkles, Video } from 'lucide-react';
import agents from './data/agents.json';
import { useDemoCases } from './services/useDemoCases';
import { Continuity } from './components/Continuity';
import OperationalApp from './OperationalApp';
import './resonancia.css';
import './meeting.css';
import { GuidedExperience } from './components/GuidedExperience';
import { PitchStage } from './components/PitchStage';
import { MeshWorkspace } from './components/MeshWorkspace';
import './pitch.css';
import './sidebar.css';
import { ProcessComparison } from './components/ProcessComparison';
import { Audiences, AudienceCards } from './components/Audiences';

const phases = [
  { id: 'escucha', title: 'Escucha', method: 'MAPEA-IA', icon: AudioLines, description: 'Captura y estructuración asistida, con autorización y agentes adecuados al proceso y a sus fuentes.' },
  { id: 'analitica', title: 'Comprensión', method: 'MAPECI / RADAR', icon: Brain, description: 'El equipo humano de Analítica construye indicadores y análisis junto al área, según su necesidad.' },
  { id: 'respuesta', title: 'Realimentación', method: 'MARCA-IA', icon: HeartHandshake, description: 'El responsable del proceso define las acciones, con apoyo de agentes o automatizaciones cuando corresponda.' },
];
const navigation = [
  { id: 'pitch', label: 'Pitch', icon: Video },
  { id: 'inicio', label: 'Panorama', icon: Orbit },
  { id: 'malla', label: 'Malla de agentes', icon: Network },
  { id: 'agentes', label: 'Catálogo de agentes', icon: BookOpen },
  { id: 'recorrido', label: 'Recorrido del caso', icon: GitBranch, hidden: true },
  { id: 'memoria', label: 'Memoria viva', icon: BookOpen },
  { id: 'publicos', label: 'Personas y públicos', icon: Users },
  { id: 'operacion', label: 'Panel del profesional', icon: HeartHandshake },
];

type Agent = typeof agents[number];

function Galaxy() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!; const ctx = canvas.getContext('2d'); if (!ctx) return;
    let w = 0, h = 0, frame = 0, seed = 42;
    const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    const stars = Array.from({ length: 1500 }, (_, i) => ({ r: Math.pow(random(), .63), a: i % 3 * Math.PI * 2 / 3, jitter: (random() - .5) * .8, size: .35 + random() * 1.5, alpha: .2 + random() * .8, blue: random() > .6 }));
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h); const radius = Math.min(w * .48, h * .48);
      const glow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, radius * .6);
      glow.addColorStop(0, '#bfffea40'); glow.addColorStop(.14, '#94dec522'); glow.addColorStop(1, '#76c9c000');
      ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);
      stars.forEach(s => {
        const a = s.a + s.r * 6.6 + s.jitter + time * .000015;
        const x = w / 2 + Math.cos(a) * s.r * radius; const y = h / 2 + Math.sin(a) * s.r * radius * .73;
        ctx.beginPath(); ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.blue ? `rgba(174,173,234,${s.alpha})` : `rgba(185,238,221,${s.alpha})`;
        ctx.shadowBlur = s.size > 1.5 ? 8 : 0; ctx.shadowColor = '#a1e9d3'; ctx.fill();
      }); ctx.shadowBlur = 0;
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    const observer = new ResizeObserver(() => {
      const box = canvas.getBoundingClientRect(); w = box.width; h = box.height;
      const dpr = Math.min(devicePixelRatio, 2); canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(0);
    }); observer.observe(canvas); if (!reduced) frame = requestAnimationFrame(draw);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  return <canvas ref={ref} className="galaxy" aria-hidden="true" />;
}

function AgentDialog({ agent, close }: { agent: Agent; close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null); const [source, setSource] = useState(false);
  useEffect(() => { ref.current?.showModal(); }, []);
  const phase = phases.find(p => p.id === agent.phase)!;
  return <dialog ref={ref} className="agent-dialog" aria-labelledby="agent-title" onCancel={close} onClick={e => { if (e.target === ref.current) close(); }}>
    <button className="close-dialog" onClick={close} aria-label="Cerrar ficha"><X size={22} /></button>
    <span className="eyebrow">{phase.method} · {agent.kind}</span><phase.icon className="dialog-icon" size={36} />
    <h2 id="agent-title">{agent.title}</h2><p>{agent.description}</p>
    <div className="demo-note">{agent.phase === 'analitica' ? 'Apoyo metodológico al equipo humano de Analítica · No decide el modelo' : 'Especificación del caso psicopedagógico · Ejecución en vivo por conectar'}</div>
    <h3>Su lugar en el ecosistema</h3><p>{phase.description}</p>
    <h3>Documento de origen</h3><code>{agent.source}</code>
    <button className="secondary" onClick={() => setSource(!source)} aria-expanded={source}>{source ? 'Ocultar' : 'Leer'} especificación original</button>
    {source && <><p className="source-note">Documento del proyecto. Describe el comportamiento previsto; sus afirmaciones requieren validación en una implementación real.</p><pre>{agent.document}</pre></>}
  </dialog>;
}

export function App() {
  const { cases, update, reset, storageError } = useDemoCases();
  const [collapsed, setCollapsed] = useState(true);
  const [recording, setRecording] = useState(false);
  const [audience, setAudience] = useState('estudiantes');
  const [page, setPage] = useState('inicio'); const [filter, setFilter] = useState('todos'); const [query, setQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const go = (next: string) => { setRecording(false); setPage(next); window.scrollTo({ top: 0, behavior: 'instant' }); };
  const explore = (phase = 'todos') => { setFilter(phase); setQuery(''); go('agentes'); };
  const visible = agents.filter(a => (filter === 'todos' || a.phase === filter) && `${a.title} ${a.description} ${a.id}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  const card = (agent: Agent) => {
    const phase = phases.find(p => p.id === agent.phase)!;
    return <button key={agent.id} className={`agent-card ${agent.phase}`} onClick={() => setSelectedAgent(agent)}>
      <div className="card-top"><phase.icon size={23} /><span>{phase.method}</span><ArrowUpRight size={17} /></div>
      <h3>{agent.title}</h3><p>{agent.description}</p><div className="card-bottom"><span className="tiny-dot" />{agent.kind}<span>Ver ficha</span></div>
    </button>;
  };
  return <div className={`resonancia-shell page-${page} ${collapsed ? 'sidebar-collapsed' : ''} ${recording ? 'video-mode' : ''}`}>
    <aside className="sidebar"
      onPointerEnter={e => { if (e.pointerType === 'mouse') setCollapsed(false); }}
      onPointerLeave={e => { if (!e.currentTarget.querySelector(':focus-visible')) setCollapsed(true); }}
      onFocus={e => { if (e.target.matches(':focus-visible')) setCollapsed(false); }}
      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget) && !e.currentTarget.matches(':hover')) setCollapsed(true); }}
    ><button className="brand" aria-label="ResonancIA · Ir al panorama" title="ResonancIA" onClick={() => go('inicio')}><AudioLines size={34} /><span>ResonancIA<small>MEMORIA INSTITUCIONAL VIVA</small></span></button>
      <div className="workspace-label">ESPACIO DE EXPLORACIÓN</div><nav aria-label="Principal">{navigation.filter(n => !n.hidden).map(n => <button key={n.id} aria-label={n.label} title={collapsed ? n.label : undefined} onClick={() => go(n.id)} className={page === n.id ? 'active' : ''} aria-current={page === n.id ? 'page' : undefined}><n.icon size={19} /><span className="nav-label">{n.label}</span>{page === n.id && <span className="nav-dot" />}</button>)}</nav>
      <div className="sidebar-bottom"><Orbit size={26} /><p>Inteligencia que acompaña.<br /><strong>Decisiones humanas.</strong></p><div className="team"><span>R</span><div>Equipo ResonancIA<small>Laboratorio de innovación</small></div></div></div>
    </aside>
    <div className="workspace"><header className="topbar"><span>ResonancIA <span className="slash">/</span> {navigation.find(n => n.id === page)?.label}</span><span className="simulation"><i />Prototipo · Datos de simulación</span></header>
      <main className="res-main">{storageError && <p role="alert" className="demo-note">No se pudieron guardar los cambios en este navegador. Se conservarán solo mientras la página permanezca abierta.</p>}
        {page === 'inicio' && <>
          <section className="hero"><Galaxy /><div className="hero-copy"><div className="eyebrow"><Sparkles size={14} /> CONECTA · ANALIZA · ACTIVA · TRANSFORMA</div><h1>Las voces conectan.<br />La memoria<br /><em>transforma.</em></h1><p>Un ecosistema de inteligencia que convierte cada conversación en una oportunidad de comprender y acompañar.</p><div className="hero-actions"><button className="primary" onClick={() => go('pitch')}>Abrir el pitch <ArrowUpRight size={18} /></button><button className="text-button" onClick={() => explore()}><Network size={15} /> Explorar agentes</button></div></div><div className="galaxy-caption"><span>R E S O N A N C I A</span><small>El conocimiento encuentra sus conexiones.</small></div></section>
          <div className="stats"><div><strong>{agents.filter(a => a.kind === 'Agente definido').length} <span>+ {agents.filter(a => a.kind === 'Rol metodológico').length}</span></strong><p>Especificaciones de agentes y roles</p></div><div><strong>03</strong><p>Metodologías conectadas</p></div><div><strong>05</strong><p>Públicos en el modelo</p></div><div><strong>01</strong><p>Caso demostrativo en la interfaz</p></div></div>
          <section className="capabilities"><div className="section-heading"><div><span className="eyebrow">UN CICLO, TRES CAPACIDADES</span><h2>De escuchar a transformar.</h2></div><span className="muted">La tecnología conecta. Las personas deciden.</span></div><div className="phase-grid">{phases.map((p, i) => <button key={p.id} className={`phase-card ${p.id}`} onClick={() => explore(p.id)}><div className="card-top"><p.icon size={28} /><span>0{i + 1}</span></div><small>{p.method}</small><h3>{p.title}</h3><p>{p.description}</p><div className="phase-bottom">{p.id === 'analitica' ? 'Equipo de Analítica · Apoyo metodológico' : 'Ver aplicación y especificaciones'}<ArrowRight size={18} /></div></button>)}</div></section>
          <section className="story"><div className="story-icon"><Orbit size={36} /></div><div><span className="eyebrow">PRIMER CASO DE USO · ASESORÍA PSICOPEDAGÓGICA</span><h2>Una historia que no empieza de cero.</h2><p>Cada encuentro conserva el contexto para el siguiente. Explora la memoria de los estudiantes de la simulación.</p></div><button className="secondary" onClick={() => go('memoria')}>Explorar la memoria <ArrowUpRight size={17} /></button></section>
        </>}
        {page === 'pitch' && <PitchStage recording={recording} onRecording={setRecording} onInspect={id => setSelectedAgent(agents.find(a => a.id === id) ?? null)} onPanel={() => go('operacion')} />}
        {page === 'malla' && <><div className="page-heading"><span className="eyebrow">TOPOLOGÍA DEL CASO PSICOPEDAGÓGICO</span><h1>Una orquesta de capacidades.</h1><p>Explora cómo se distribuye el trabajo entre el orquestador y los especialistas. Los nodos corresponden a las especificaciones actualizadas del repositorio.</p></div><MeshWorkspace onInspect={id => setSelectedAgent(agents.find(a => a.id === id) ?? null)} /></>}
        {page === 'agentes' && <><div className="page-heading"><span className="eyebrow">EL ECOSISTEMA RESONANCIA</span><h1>Cada agente tiene un propósito.</h1><p>Este catálogo reúne 16 especificaciones de agentes del caso psicopedagógico y 5 roles de apoyo metodológico. No es una cantidad universal: cada proceso requiere su propio diseño. En comprensión, el equipo humano de Analítica construye y valida el análisis.</p></div><div className="catalog-tools"><div className="filters">{[{ id: 'todos', title: 'Todos' }, ...phases].map(p => <button key={p.id} className={filter === p.id ? 'selected' : ''} onClick={() => setFilter(p.id)} aria-pressed={filter === p.id}>{p.title}</button>)}</div><label className="search"><Search size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar un agente…" aria-label="Buscar un agente" /></label></div><div className="results-count" aria-live="polite">{visible.length} funciones en este recorrido · Especificaciones del proyecto</div><div className="agent-grid">{visible.map(card)}</div>{visible.length === 0 && <div className="empty-state">No encontramos agentes con ese nombre. Prueba otra búsqueda.</div>}</>}
        {page === 'recorrido' && <GuidedExperience cases={cases} onAudience={id => { setAudience(id); go('publicos'); }} onMemory={() => go('memoria')} onPanel={() => go('operacion')} />}
        {page === 'memoria' && <Continuity cases={cases} onPanel={() => go('operacion')} />}
        {page === 'publicos' && <Audiences key={audience} initial={audience} onMemory={() => go('memoria')} onPanel={() => go('operacion')} />}
        {page === 'operacion' && <><div className="page-heading"><span className="eyebrow">ESPACIO DE ACOMPAÑAMIENTO</span><h1>El contexto al servicio de las personas.</h1><p>Personas ficticias para revisar acuerdos y propuestas de contacto. El profesional conserva la decisión; las otras vistas muestran ejemplos para responsables de programa o área.</p></div><div className="demo-note">Simulación local: los cambios se guardan en este navegador. Los roles son demostrativos; no hay envío a Teams ni certificación real.</div><div className="operational-container"><OperationalApp cases={cases} update={update} reset={reset} /></div></>}
        <footer className="res-footer"><span>ResonancIA <span>· Con Voz Transformamos</span></span><span>Exploramos. Experimentamos. Evolucionamos.</span></footer>
      </main>
    </div>{selectedAgent && <AgentDialog key={selectedAgent.id} agent={selectedAgent} close={() => setSelectedAgent(null)} />}
  </div>;
}
export default App;
