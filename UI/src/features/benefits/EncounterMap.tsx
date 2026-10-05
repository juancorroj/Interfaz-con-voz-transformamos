import { useState } from 'react';
import { ChevronDown, Clock, Ear, MessagesSquare, Route, UserRound, type LucideIcon } from 'lucide-react';
import type { Benefit } from '../../content/types';
import { Reveal } from '../../ui/motion/Reveal';
import { benefitIcons } from './benefitIcons';

export interface EncounterStage {
  id: string;
  label: string;
  hint: string;
  heard: readonly string[];
  listener: readonly string[];
}

interface EncounterMapProps {
  heardTitle: string;
  listenerTitle: string;
  heard: readonly Benefit[];
  listener: readonly Benefit[];
  stages: readonly EncounterStage[];
  keywords: Readonly<Record<string, string>>;
  hint: string;
}

const stageIcons: Record<string, LucideIcon> = { antes: Clock, durante: MessagesSquare, despues: Route };

/**
 * El encuentro entre dos personas como un recorrido en el tiempo: a un lado quien es escuchado, al otro quien escucha
 * y, en el centro, el antes, el durante y el después. Cada beneficio cuelga del lado que lo recibe y se abre al tocarlo.
 */
export function EncounterMap({ heardTitle, listenerTitle, heard, listener, stages, keywords, hint }: EncounterMapProps) {
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set());
  const all = [...heard, ...listener];
  const byId = new Map(all.map(b => [b.id, b]));
  const toggle = (id: string) => setOpen(prev => { const next = new Set(prev); if (!next.delete(id)) next.add(id); return next; });
  const allOpen = open.size === all.length;

  const bubble = (id: string, side: 'heard' | 'listener') => {
    const b = byId.get(id);
    if (!b) return null;
    const Icon = benefitIcons[id] ?? Ear;
    const isOpen = open.has(id);
    return <li key={id} className={`enc-bubble ${side} ${isOpen ? 'open' : ''}`}>
      <button aria-expanded={isOpen} aria-controls={`enc-${id}`} onClick={() => toggle(id)}>
        <span className="enc-icon"><Icon size={20} aria-hidden="true" /></span>
        <span className="enc-head"><small>{keywords[id]}</small><strong>{b.title}</strong></span>
        <ChevronDown className="enc-chevron" size={16} aria-hidden="true" />
      </button>
      <div id={`enc-${id}`} className="enc-body" role="region" aria-hidden={!isOpen}><div><p>{b.text}</p></div></div>
    </li>;
  };

  return <div className="enc">
    <div className="enc-top">
      <p>{hint}</p>
      <button className="text-button" onClick={() => setOpen(allOpen ? new Set() : new Set(all.map(b => b.id)))}>{allOpen ? 'Contraer todos' : 'Abrir todos'}</button>
    </div>
    <div className="enc-heads" aria-hidden="true">
      <span className="enc-side heard"><UserRound size={18} />{heardTitle}</span>
      <span />
      <span className="enc-side listener"><Ear size={18} />{listenerTitle}</span>
    </div>
    <ol className="enc-stages">
      {stages.map((st, i) => {
        const StageIcon = stageIcons[st.id] ?? Clock;
        return <li key={st.id} className="enc-stage"><Reveal delay={i * 0.08}><div className="enc-row">
          <ul className="enc-col heard" aria-label={`${heardTitle}: ${st.label}`}>{st.heard.map(id => bubble(id, 'heard'))}</ul>
          <div className="enc-axis"><span className="enc-node"><StageIcon size={22} aria-hidden="true" /></span><strong>{st.label}</strong><small>{st.hint}</small></div>
          <ul className="enc-col listener" aria-label={`${listenerTitle}: ${st.label}`}>{st.listener.map(id => bubble(id, 'listener'))}</ul>
        </div></Reveal></li>;
      })}
    </ol>
  </div>;
}
