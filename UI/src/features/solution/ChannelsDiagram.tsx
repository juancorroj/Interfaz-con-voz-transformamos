import { ArrowUp, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Reveal } from '../../ui/motion/Reveal';

export interface DiagramItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface ChannelsDiagramProps {
  /** Lo que ResonancIA no hace: agregar un canal o una encuesta más. */
  notNew: readonly string[];
  layerName: string;
  /** Los cuatro verbos de la capa. */
  verbs: readonly DiagramItem[];
  contactTitle: string;
  contacts: readonly DiagramItem[];
  peopleTitle: string;
  people: readonly DiagramItem[];
  /** Otros públicos, con un trazo distinto para mostrar que el alcance es más amplio. */
  morePeople?: readonly DiagramItem[];
  morePeopleLabel?: string;
}

/** La premisa como capas: las personas, los puntos de contacto que ya existen y, encima, la capa de ResonancIA. */
export function ChannelsDiagram({ notNew, layerName, verbs, contactTitle, contacts, peopleTitle, people, morePeople = [], morePeopleLabel = 'y también' }: ChannelsDiagramProps) {
  return <div className="chan">
    <ul className="chan-not" aria-label="Lo que no se agrega">{notNew.map(t => <li key={t}><X size={14} aria-hidden="true" /><s>{t}</s></li>)}</ul>

    <Reveal><div className="chan-layer">
      <span className="chan-tag">{layerName}</span>
      <ul>{verbs.map((v, i) => <li key={v.id}><span className="chan-verb-icon"><v.icon size={20} aria-hidden="true" /></span><strong>{v.label}</strong>{i < verbs.length - 1 && <span className="chan-dash" aria-hidden="true" />}</li>)}</ul>
    </div></Reveal>

    <div className="chan-flow" aria-hidden="true">{contacts.map(c => <span key={c.id}><ArrowUp size={16} /></span>)}</div>

    <Reveal delay={0.1}><div className="chan-tier">
      <h3>{contactTitle}</h3>
      <ul className="chan-contacts">{contacts.map(c => <li key={c.id}><c.icon size={22} aria-hidden="true" /><span>{c.label}</span></li>)}</ul>
    </div></Reveal>

    <div className="chan-flow soft" aria-hidden="true">{people.map(p => <span key={p.id} />)}</div>

    <Reveal delay={0.2}><div className="chan-people">
      <h3>{peopleTitle}</h3>
      <ul>{people.map(p => <li key={p.id}><p.icon size={16} aria-hidden="true" />{p.label}</li>)}{morePeople.length > 0 && <li className="chan-more-label" aria-hidden="true">{morePeopleLabel}</li>}{morePeople.map(p => <li key={p.id} className="chan-more"><p.icon size={16} aria-hidden="true" />{p.label}</li>)}</ul>
    </div></Reveal>
  </div>;
}
