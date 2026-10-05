import { useState } from 'react';
import { BarChart3, ClipboardList, HeartPulse, Lock, Mic, UserRound, type LucideIcon } from 'lucide-react';

export interface AccessItem {
  content: string;
  who: string;
}

interface DataMapProps {
  items: readonly AccessItem[];
  /** Frase que explica cómo leer los anillos. */
  caption: string;
  centerLabel: string;
  whoLabel: string;
}

const icons: LucideIcon[] = [Mic, HeartPulse, ClipboardList, BarChart3];
const CENTER = 170;
const RADII = [58, 92, 126, 160];

/**
 * Quién puede ver qué, como anillos: en el centro la persona y, de adentro hacia afuera, la información cada vez
 * menos identificable. Al elegir un anillo (o su fila) se lee quién accede a él.
 */
export function DataMap({ items, caption, centerLabel, whoLabel }: DataMapProps) {
  const [selected, setSelected] = useState(0);
  const current = items[selected];
  const Icon = icons[selected] ?? Lock;
  return <div className="dmap">
    <figure className="dmap-figure">
      <svg viewBox="0 0 340 340" role="img" aria-label={`Anillos de acceso: ${items.map(i => i.content).join('; ')}`}>
        {[...items].map((_, i) => items.length - 1 - i).map(i => <g key={i} className={`dmap-ring ${i === selected ? 'active' : ''}`} onClick={() => setSelected(i)}>
          <circle cx={CENTER} cy={CENTER} r={RADII[i]} />
          <circle className="dmap-hit" cx={CENTER} cy={CENTER} r={RADII[i]} />
        </g>)}
        {items.map((_, i) => <g key={`n${i}`} className={`dmap-num ${i === selected ? 'active' : ''}`} transform={`translate(${CENTER} ${CENTER - RADII[i] + 17})`} onClick={() => setSelected(i)}>
          <circle r="12" /><text textAnchor="middle" dominantBaseline="central">{i + 1}</text>
        </g>)}
        <circle className="dmap-core" cx={CENTER} cy={CENTER} r="26" />
      </svg>
      <span className="dmap-center"><UserRound size={22} aria-hidden="true" /><small>{centerLabel}</small></span>
      <figcaption>{caption}</figcaption>
    </figure>
    <div className="dmap-side">
      <ul className="dmap-list">{items.map((it, i) => { const ItemIcon = icons[i] ?? Lock; return <li key={it.content}>
        <button className={i === selected ? 'active' : ''} aria-pressed={i === selected} onClick={() => setSelected(i)}>
          <span className="dmap-n">{i + 1}</span><ItemIcon size={18} aria-hidden="true" /><span>{it.content}</span>
        </button>
      </li>; })}</ul>
      <div className="dmap-who" key={selected} aria-live="polite">
        <span className="dmap-who-icon"><Icon size={22} aria-hidden="true" /></span>
        <div><small>{whoLabel}</small><p>{current.who}</p></div>
      </div>
    </div>
  </div>;
}
