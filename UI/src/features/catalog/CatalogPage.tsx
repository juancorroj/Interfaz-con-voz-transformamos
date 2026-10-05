import { useState } from 'react';
import { ArrowUpRight, BookOpen, Search } from 'lucide-react';
import agents from '../../data/agents.json';
import { phases, type Agent } from '../shared/phases';
import './catalog.css';

interface CatalogPageProps {
  query: string;
  onQuery: (query: string) => void;
  /** Abre la especificación original del agente. */
  onSelect: (agent: Agent) => void;
}

const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Los 21 agentes y roles del caso, agrupados por momento del ciclo, con el detalle del elegido debajo. */
export function CatalogPage({ query, onQuery, onSelect }: CatalogPageProps) {
  const [selectedId, setSelectedId] = useState(agents[0].id);
  const selected = agents.find(a => a.id === selectedId) ?? agents[0];
  const selectedPhase = phases.find(p => p.id === selected.phase)!;
  const term = normalize(query.trim());
  const matches = (a: Agent) => !term || normalize(`${a.title} ${a.description} ${a.id}`).includes(term);
  const found = agents.filter(matches).length;

  return <>
    <div className="page-heading"><span className="eyebrow">EL ECOSISTEMA RESONANCIA</span><h2>Cada agente tiene un propósito.</h2><p>Este catálogo reúne 16 especificaciones de agentes del caso psicopedagógico y 5 roles de apoyo metodológico. No es una cantidad universal: cada proceso requiere su propio diseño. En comprensión, el equipo humano de Analítica construye y valida el análisis.</p></div>

    <label className="cat-search"><Search size={19} aria-hidden="true" /><input value={query} onChange={e => onQuery(e.target.value)} placeholder="Buscar un agente: verificador, curador, escuchador…" aria-label="Buscar un agente" /></label>
    <p className="results-count" aria-live="polite">{term ? `${found} de ${agents.length} coinciden` : `${agents.length} funciones en tres momentos del ciclo`}</p>

    <div className="cat-lanes">
      {phases.map((phase, i) => {
        const list = agents.filter(a => a.phase === phase.id);
        return <section key={phase.id} className={`cat-lane ${phase.id}`} aria-label={phase.title}>
          <header>
            <span className="cat-lane-icon"><phase.icon size={24} aria-hidden="true" /></span>
            <div><small>0{i + 1} · {phase.method}</small><h3>{phase.title}</h3></div>
            <span className="cat-count">{list.length}</span>
          </header>
          <p className="cat-lane-text">{phase.id === 'analitica' ? 'Roles de apoyo metodológico al equipo humano de Analítica.' : phase.id === 'escucha' ? 'Agentes que escuchan, estructuran y verifican.' : 'Agentes que preparan la realimentación para la persona responsable.'}</p>
          <ul>{list.map(a => <li key={a.id}><button className={`${a.id === selected.id ? 'active' : ''} ${matches(a) ? '' : 'dim'}`} aria-pressed={a.id === selected.id} onClick={() => setSelectedId(a.id)}>{a.title}</button></li>)}</ul>
        </section>;
      })}
    </div>

    <article className={`cat-detail ${selected.phase}`} key={selected.id} aria-live="polite">
      <header>
        <span className="cat-detail-icon"><selectedPhase.icon size={30} aria-hidden="true" /></span>
        <div><small>{selectedPhase.title} · {selected.kind}</small><h3>{selected.title}</h3></div>
      </header>
      <p className="cat-detail-text">{selected.description}</p>
      <dl>
        <div><dt>Su lugar en el ecosistema</dt><dd>{selectedPhase.description}</dd></div>
        <div><dt>Documento de origen</dt><dd><code>{selected.source}</code></dd></div>
      </dl>
      <div className="cat-detail-actions">
        <button className="secondary" onClick={() => onSelect(selected)}><BookOpen size={15} aria-hidden="true" />Leer la especificación original<ArrowUpRight size={14} aria-hidden="true" /></button>
        <span>{selected.phase === 'analitica' ? 'Apoyo metodológico · no decide el modelo' : 'Especificación del caso · ejecución en vivo por conectar'}</span>
      </div>
    </article>
    {found === 0 && <div className="empty-state">No encontramos agentes con ese nombre. Prueba otra búsqueda.</div>}
  </>;
}
