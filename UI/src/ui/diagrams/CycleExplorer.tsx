import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { CycleDiagram, type CycleNode } from './CycleDiagram';
import './diagrams.css';

interface CycleExplorerProps {
  nodes: CycleNode[];
  center: string;
  ariaLabel: string;
  selectedId: string;
  onSelect: (id: string) => void;
  /** Contenido del panel del nodo elegido. */
  renderPanel: (id: string, index: number) => ReactNode;
  /** Texto del botón que pasa al nodo siguiente. */
  nextLabel: (nextTitle: string) => string;
  /** Texto del botón del último nodo, que vuelve al primero. */
  restartLabel: string;
}

/** Un ciclo en el que cada nodo abre su propio panel en el mismo lugar, con un botón para seguir al siguiente. */
export function CycleExplorer({ nodes, center, ariaLabel, selectedId, onSelect, renderPanel, nextLabel, restartLabel }: CycleExplorerProps) {
  const index = Math.max(0, nodes.findIndex(n => n.id === selectedId));
  const next = nodes[(index + 1) % nodes.length];
  const last = index === nodes.length - 1;
  return <div className="explorer">
    <CycleDiagram ariaLabel={ariaLabel} center={center} nodes={nodes} activeId={nodes[index].id} onSelect={onSelect} />
    <div className="explorer-panel" key={nodes[index].id} aria-live="polite">
      {renderPanel(nodes[index].id, index)}
      <button className="text-button explorer-next" onClick={() => onSelect(next.id)}>{last ? restartLabel : nextLabel(next.label)}<ArrowRight size={16} aria-hidden="true" /></button>
    </div>
  </div>;
}
