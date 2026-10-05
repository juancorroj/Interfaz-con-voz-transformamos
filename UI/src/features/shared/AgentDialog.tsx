import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { phases, type Agent } from './phases';

export function AgentDialog({ agent, close }: { agent: Agent; close: () => void }) {
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
