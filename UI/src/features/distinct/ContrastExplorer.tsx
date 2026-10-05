import { useState } from 'react';
import { ArrowDown, ArrowRight, Check, X, type LucideIcon } from 'lucide-react';
import type { InnovationItem } from '../../content/types';

interface ContrastExplorerProps {
  items: readonly InnovationItem[];
  /** Titular corto de cada elemento, para la lista. */
  highlights: Readonly<Record<number, string>>;
  icons: Readonly<Record<number, LucideIcon>>;
  usualLabel: string;
  oursLabel: string;
}

/** Los elementos de innovación como lista y detalle: el contraste entre lo habitual y ResonancIA ocupa el centro. */
export function ContrastExplorer({ items, highlights, icons, usualLabel, oursLabel }: ContrastExplorerProps) {
  const [selected, setSelected] = useState(items[0].id);
  const index = Math.max(0, items.findIndex(i => i.id === selected));
  const current = items[index];
  const Icon = icons[current.id];
  const next = items[(index + 1) % items.length];

  return <div className="cex">
    <ol className="cex-list" aria-label="Los seis elementos de innovación">
      {items.map(item => {
        const ItemIcon = icons[item.id];
        return <li key={item.id}><button className={item.id === current.id ? 'active' : ''} aria-pressed={item.id === current.id} onClick={() => setSelected(item.id)}>
          <span className="cex-n">{String(item.id).padStart(2, '0')}</span><ItemIcon size={18} aria-hidden="true" /><span>{highlights[item.id]}</span>
        </button></li>;
      })}
    </ol>
    <article className="cex-panel" key={current.id} aria-live="polite">
      <header>
        <span className="cex-icon"><Icon size={28} aria-hidden="true" /></span>
        <div><span className="cex-count">{String(index + 1).padStart(2, '0')} de {String(items.length).padStart(2, '0')}</span><h3>{current.title}</h3></div>
      </header>
      <div className="cex-versus">
        <div className="usual"><span><X size={14} aria-hidden="true" />{usualLabel}</span><p>{current.usual}</p></div>
        <span className="cex-arrow" aria-hidden="true"><ArrowRight className="h" size={26} /><ArrowDown className="v" size={26} /></span>
        <div className="ours"><span><Check size={14} aria-hidden="true" />{oursLabel}</span><p>{current.resonancia}</p>
          {current.figures && <ul className="cex-figures">{current.figures.map(f => <li key={f.label}><strong>{f.value}</strong><span>{f.label}</span></li>)}</ul>}
        </div>
      </div>
      <button className="text-button cex-next" onClick={() => setSelected(next.id)}>Siguiente: {highlights[next.id]}<ArrowRight size={16} aria-hidden="true" /></button>
    </article>
  </div>;
}
