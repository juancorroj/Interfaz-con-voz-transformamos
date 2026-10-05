import { motion, useReducedMotion } from 'motion/react';
import './ui.css';

export interface TimelineItem {
  id: number;
  label: string;
  detail: string;
}

interface TimelineProps {
  items: TimelineItem[];
  activeId?: number;
  onSelect: (id: number) => void;
  ariaLabel: string;
}

/** Línea de tiempo horizontal (vertical en pantallas estrechas) cuyos nodos son botones. */
export function Timeline({ items, activeId, onSelect, ariaLabel }: TimelineProps) {
  const reduced = useReducedMotion();
  return <div className="ui-timeline" role="group" aria-label={ariaLabel}>
    <div className="ui-timeline-track" aria-hidden="true">
      {reduced
        ? <span className="ui-timeline-fill" />
        : <motion.span className="ui-timeline-fill" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} style={{ originX: 0 }} />}
    </div>
    <ol>{items.map(item => <li key={item.id}>
      <button className={item.id === activeId ? 'active' : ''} aria-pressed={item.id === activeId} onClick={() => onSelect(item.id)}>
        <span className="ui-timeline-node">{item.id}</span>
        <strong>{item.label}</strong>
        <small>{item.detail}</small>
      </button>
    </li>)}</ol>
  </div>;
}
