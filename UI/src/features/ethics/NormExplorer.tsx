import { ArrowDown, ArrowRight } from 'lucide-react';
import type { LegalNorm, NormBadge } from '../../content/types';
import { normIcons } from './normIcons';

interface NormExplorerProps {
  groups: readonly { title: string; norms: readonly LegalNorm[] }[];
  badges: Readonly<Record<string, NormBadge>>;
  selectedId: string;
  onSelect: (id: string) => void;
  demandsLabel: string;
  reflectedLabel: string;
}

/** Las normas como lista y detalle: a la izquierda cada norma, a la derecha qué exige y cómo se refleja en el diseño. */
export function NormExplorer({ groups, badges, selectedId, onSelect, demandsLabel, reflectedLabel }: NormExplorerProps) {
  const all = groups.flatMap(g => g.norms);
  const current = all.find(n => n.id === selectedId) ?? all[0];
  const Icon = normIcons[current.id];
  return <div className="nex">
    <nav className="nex-list" aria-label="Normas y estándares">
      {groups.map(g => <div key={g.title}>
        <h3>{g.title}</h3>
        <ul>{g.norms.map(n => { const b = badges[n.id]; const NIcon = normIcons[n.id]; return <li key={n.id}>
          <button className={n.id === current.id ? 'active' : ''} aria-pressed={n.id === current.id} onClick={() => onSelect(n.id)}>
            {NIcon && <NIcon size={18} aria-hidden="true" />}<span><strong>{b?.code ?? n.name}{b?.year ? ` · ${b.year}` : ''}</strong><small>{b?.caption}</small></span>
          </button>
        </li>; })}</ul>
      </div>)}
    </nav>
    <article className="nex-panel" key={current.id} aria-live="polite">
      <header>{Icon && <span className="nex-icon"><Icon size={30} aria-hidden="true" /></span>}<div><small>{current.scope === 'colombia' ? 'Marco colombiano' : 'Estándar internacional'}</small><h3>{current.name}</h3></div></header>
      <div className="nex-flow">
        <section className="demands"><span>{demandsLabel}</span><p>{current.demands}</p></section>
        <span className="nex-arrow" aria-hidden="true"><ArrowRight className="h" size={26} /><ArrowDown className="v" size={26} /></span>
        <section className="reflected"><span>{reflectedLabel}</span><p>{current.reflected}</p></section>
      </div>
    </article>
  </div>;
}
