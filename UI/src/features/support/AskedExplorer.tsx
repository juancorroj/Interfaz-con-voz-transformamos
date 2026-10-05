import { useState } from 'react';
import { MessageCircleQuestion } from 'lucide-react';

export interface AskedItem {
  question: string;
  answer: string;
  docId?: string;
  where?: string;
}

interface AskedExplorerProps {
  items: readonly AskedItem[];
  /** Nombre del documento donde está la respuesta, si se puede leer en la web. */
  docTitle: (docId?: string) => string | undefined;
  canOpen: (docId?: string) => boolean;
  onOpenDoc: (docId: string) => void;
}

/** Las preguntas previsibles a la izquierda; al elegir una, su respuesta y dónde está la evidencia. */
export function AskedExplorer({ items, docTitle, canOpen, onOpenDoc }: AskedExplorerProps) {
  const [selected, setSelected] = useState(0);
  const item = items[selected];
  return <div className="sx-asked">
    <ul className="sx-asked-list" aria-label="Preguntas previsibles">{items.map((a, i) => <li key={a.question}>
      <button className={i === selected ? 'active' : ''} aria-pressed={i === selected} onClick={() => setSelected(i)}>{a.question}</button>
    </li>)}</ul>
    <div className="sx-asked-answer" key={selected} aria-live="polite">
      <span className="sx-asked-icon"><MessageCircleQuestion size={24} aria-hidden="true" /></span>
      <h3>{item.question}</h3>
      <p>{item.answer}</p>
      {item.docId && canOpen(item.docId)
        ? <button className="secondary" onClick={() => onOpenDoc(item.docId as string)}>{docTitle(item.docId)}</button>
        : <small>{item.where ?? docTitle(item.docId)}</small>}
    </div>
  </div>;
}
