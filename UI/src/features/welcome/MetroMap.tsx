import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { ResolvedStep, SectionGroup } from '../../app/SectionRegistry';
import { LinkCard } from '../../ui/LinkCard';
import { StatusBadge } from '../../ui/StatusBadge';
import { stepKey } from './guide';

export interface MapStation {
  group: SectionGroup;
  entries: ResolvedStep[];
}

interface MetroMapProps {
  stations: MapStation[];
  onNavigate: (id: string, sub?: string) => void;
}

/** Mapa de la web como un recorrido: una estación por grupo y, al elegirla, sus páginas con una línea de descripción. */
export function MetroMap({ stations, onNavigate }: MetroMapProps) {
  const [activeId, setActiveId] = useState((stations.find(s => s.group.id === 'conocer') ?? stations[0])?.group.id);
  const active = stations.find(s => s.group.id === activeId) ?? stations[0];
  if (!active) return null;

  return <div className="metro">
    <ol className="metro-line" aria-label="Estaciones de la web">
      {stations.map(({ group, entries }, i) => {
        const Icon: LucideIcon | undefined = group.icon;
        const selected = group.id === active.group.id;
        return <li key={group.id} className={`metro-stop ${selected ? 'selected' : ''} ${i < stations.findIndex(s => s.group.id === active.group.id) ? 'passed' : ''}`}>
          <button aria-pressed={selected} aria-controls="metro-panel" onClick={() => setActiveId(group.id)}>
            <span className="metro-node" aria-hidden="true">{Icon ? <Icon size={20} /> : i + 1}</span>
            <span className="metro-label"><small>{String(i + 1).padStart(2, '0')}</small><strong>{group.label}</strong><em>{entries.length} {entries.length === 1 ? 'página' : 'páginas'}</em></span>
          </button>
        </li>;
      })}
    </ol>
    <div id="metro-panel" className="metro-panel" key={active.group.id} aria-live="polite">
      {active.group.description && <p className="metro-lead">{active.group.description}</p>}
      <div className="metro-links">{active.entries.map(s => <LinkCard key={stepKey(s)} title={s.label} text={s.description} icon={s.icon} meta={s.status && <StatusBadge kind={s.status} />} onClick={() => onNavigate(s.id, s.sub)} />)}</div>
    </div>
  </div>;
}
