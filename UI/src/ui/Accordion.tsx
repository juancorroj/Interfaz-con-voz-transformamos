import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import './ui.css';

export interface AccordionItem {
  id: string;
  title: ReactNode;
  /** Texto breve bajo el título cuando está cerrado (por ejemplo, el tema). */
  meta?: ReactNode;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Id del elemento abierto; solo uno a la vez. */
  openId?: string;
  onToggle: (id: string | undefined) => void;
  /** Prefijo para los ids del DOM, único por página. */
  idPrefix: string;
}

/** Lista de elementos expandibles. Es controlado: quien lo usa decide cuál está abierto. */
export function Accordion({ items, openId, onToggle, idPrefix }: AccordionProps) {
  return <ul className="ui-acc">{items.map(item => {
    const open = item.id === openId;
    const panelId = `${idPrefix}-panel-${item.id}`;
    return <li key={item.id} id={`${idPrefix}-${item.id}`} className={open ? 'ui-acc-item open' : 'ui-acc-item'}>
      <button className="ui-acc-trigger" aria-expanded={open} aria-controls={panelId} onClick={() => onToggle(open ? undefined : item.id)}>
        <span className="ui-acc-title">{item.meta && <small>{item.meta}</small>}<strong>{item.title}</strong></span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
      <div id={panelId} className="ui-acc-panel"><div className="ui-acc-inner">{item.content}</div></div>
    </li>;
  })}</ul>;
}
