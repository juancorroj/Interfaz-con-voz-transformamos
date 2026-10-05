import type { KeyboardEvent } from 'react';
import './diagrams.css';

export interface CycleNode {
  id: string;
  label: string;
  /** Variable CSS del color de acento del nodo. */
  accent: string;
}

interface CycleDiagramProps {
  nodes: CycleNode[];
  center: string;
  ariaLabel: string;
  /** Si se da `onSelect`, los nodos son botones y el activo se resalta. */
  activeId?: string;
  onSelect?: (id: string) => void;
}

const SIZE = 440;
const C = SIZE / 2;
const R = 150;
const NODE_R = 46;
const GAP = (NODE_R + 10) / R; // margen angular para que las flechas no toquen los nodos

const point = (angle: number): [number, number] => [C + R * Math.cos(angle), C + R * Math.sin(angle)];

/**
 * Ciclo circular: los nodos se reparten desde arriba en sentido horario y cada
 * flecha lleva al siguiente, cerrando el ciclo. Con movimiento reducido el
 * flujo de las flechas queda quieto.
 */
export function CycleDiagram({ nodes, center, ariaLabel, activeId, onSelect }: CycleDiagramProps) {
  const step = (Math.PI * 2) / nodes.length;
  const angleOf = (i: number) => -Math.PI / 2 + i * step;
  return <svg className="cycle-diagram" viewBox={`0 0 ${SIZE} ${SIZE}`} role={onSelect ? 'group' : 'img'} aria-label={ariaLabel}>
    <defs>
      <marker id="cycle-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></marker>
    </defs>
    <circle cx={C} cy={C} r={R} className="cycle-ring" />
    {nodes.map((n, i) => {
      const [x1, y1] = point(angleOf(i) + GAP);
      const [x2, y2] = point(angleOf(i + 1) - GAP);
      return <path key={n.id} className="cycle-arc" d={`M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`} markerEnd="url(#cycle-arrow)" />;
    })}
    <text className="cycle-center" x={C} y={C - 8} textAnchor="middle">{center.split(' ').slice(0, 2).join(' ')}</text>
    <text className="cycle-center" x={C} y={C + 15} textAnchor="middle">{center.split(' ').slice(2).join(' ')}</text>
    {nodes.map((n, i) => {
      const [x, y] = point(angleOf(i));
      const interactive = Boolean(onSelect);
      return <g key={n.id} className={`cycle-node ${interactive ? 'interactive' : ''} ${n.id === activeId ? 'active' : ''}`} style={{ color: `var(${n.accent})` }}
        {...(interactive ? { role: 'button', tabIndex: 0, 'aria-pressed': n.id === activeId, 'aria-label': n.label, onClick: () => onSelect?.(n.id), onKeyDown: (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect?.(n.id); } } } : {})}>
        <circle cx={x} cy={y} r={NODE_R} />
        <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle">{n.label}</text>
      </g>;
    })}
  </svg>;
}
