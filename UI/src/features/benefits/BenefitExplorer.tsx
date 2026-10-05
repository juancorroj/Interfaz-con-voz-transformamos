import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Benefit } from '../../content/types';
import { benefitIcons } from './benefitIcons';

interface BenefitExplorerProps {
  items: readonly Benefit[];
  keywords: Readonly<Record<string, string>>;
  ariaLabel: string;
}

/** Los beneficios de un nivel como lista y detalle: a la izquierda los titulares, a la derecha el elegido en grande. */
export function BenefitExplorer({ items, keywords, ariaLabel }: BenefitExplorerProps) {
  const [selectedId, setSelectedId] = useState(items[0]?.id);
  const index = Math.max(0, items.findIndex(b => b.id === selectedId));
  const current = items[index];
  if (!current) return null;
  const Icon = benefitIcons[current.id];
  const next = items[(index + 1) % items.length];

  return <div className="bex">
    <ol className="bex-list" aria-label={ariaLabel}>
      {items.map((b, i) => {
        const ItemIcon = benefitIcons[b.id];
        return <li key={b.id}><button className={b.id === current.id ? 'active' : ''} aria-pressed={b.id === current.id} onClick={() => setSelectedId(b.id)}>
          <span className="bex-n">{String(i + 1).padStart(2, '0')}</span>
          {ItemIcon && <ItemIcon size={18} aria-hidden="true" />}
          <span className="bex-title">{b.title}</span>
        </button></li>;
      })}
    </ol>
    <article className="bex-panel" key={current.id} aria-live="polite">
      <header>
        {Icon && <span className="bex-icon"><Icon size={30} aria-hidden="true" /></span>}
        <div><span className="bex-keyword">{keywords[current.id]}</span><span className="bex-count">{String(index + 1).padStart(2, '0')} de {String(items.length).padStart(2, '0')}</span></div>
      </header>
      <h2>{current.title}</h2>
      <p>{current.text}</p>
      <button className="text-button bex-next" onClick={() => setSelectedId(next.id)}>Siguiente: {next.title}<ArrowRight size={16} aria-hidden="true" /></button>
    </article>
  </div>;
}
