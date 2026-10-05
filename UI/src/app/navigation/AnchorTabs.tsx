import type { LucideIcon } from 'lucide-react';
import { useActiveBlock } from './useActiveBlock';

export interface AnchorTab {
  /** Id del elemento al que lleva. */
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface AnchorTabsProps {
  items: readonly AnchorTab[];
  label?: string;
}

const goTo = (id: string) => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
};

/**
 * Barra de botones numerados que lleva a los bloques de una misma página, con el aspecto de las pestañas
 * de las secciones. Se queda fija al desplazarse y marca el bloque que se está viendo.
 */
export function AnchorTabs({ items, label = 'En esta página' }: AnchorTabsProps) {
  const active = useActiveBlock(items.map(i => i.id));
  return <nav className="section-tabs anchor-tabs" aria-label={label}>
    {items.map((item, i) => <button key={item.id} className={active === item.id ? 'active' : ''} aria-current={active === item.id ? 'location' : undefined} onClick={() => goTo(item.id)}>
      <span className="section-tab-number">{i + 1}</span>{item.icon && <item.icon size={16} aria-hidden="true" />}<span>{item.label}</span>
    </button>)}
  </nav>;
}
