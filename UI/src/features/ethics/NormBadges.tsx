import type { NormBadge } from '../../content/types';
import { Reveal } from '../../ui/motion/Reveal';
import { normIcons } from './normIcons';

interface NormBadgesProps {
  groups: readonly { title: string; badges: readonly NormBadge[] }[];
  /** Aviso que aclara que son el marco adoptado y no certificaciones. */
  notice: string;
  onSelect: (id: string) => void;
}

/** Sellos de las normas y estándares que orientaron el diseño; cada uno lleva a su explicación. */
export function NormBadges({ groups, notice, onSelect }: NormBadgesProps) {
  return <div className="seals">
    <div className="seals-groups">
      {groups.map(g => <section key={g.title} className="seals-group" aria-label={g.title}>
        <h2>{g.title}</h2>
        <ul>{g.badges.map((b, i) => { const Icon = normIcons[b.id]; return <li key={b.id}><Reveal delay={i * 0.06}>
          <button className="seal" onClick={() => onSelect(b.id)} aria-label={`${b.code} ${b.year ?? ''}: ${b.caption}`}>
            <span className="seal-medal"><span className="seal-ring" aria-hidden="true" />{Icon && <Icon size={22} aria-hidden="true" />}<b>{b.code}</b>{b.year && <small>{b.year}</small>}</span>
            <span className="seal-caption">{b.caption}</span>
          </button>
        </Reveal></li>; })}</ul>
      </section>)}
    </div>
    <p className="seals-notice">{notice}</p>
  </div>;
}
