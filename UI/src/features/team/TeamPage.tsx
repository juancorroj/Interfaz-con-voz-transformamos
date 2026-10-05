import { HeartHandshake } from 'lucide-react';
import { methodLead, methodNote, methodTitle, teamIntro, teamLinks, teamMembers, thanks, threeE } from '../../content/ficha/equipo';
import { Callout } from '../../ui/Callout';
import { LinkCard } from '../../ui/LinkCard';
import { Reveal } from '../../ui/motion/Reveal';
import './team.css';

interface TeamPageProps {
  onNavigate: (id: string, sub?: string) => void;
}

/** El equipo, su método de trabajo y el agradecimiento a quienes co-construyeron el caso. */
export function TeamPage({ onNavigate }: TeamPageProps) {
  return <div className="team-page">
    <div className="page-heading"><span className="eyebrow">{teamIntro.eyebrow}</span><h1>{teamIntro.title}</h1><p>{teamIntro.lead}</p></div>
    <p className="team-motto">{teamIntro.motto}</p>

    <Reveal><section className="team-section" aria-labelledby="team-members">
      <h2 id="team-members">Integrantes</h2>
      <ul className="team-grid">{teamMembers.map(m => <li key={m.id} className="team-card">
        <span className="team-avatar" aria-hidden="true">{m.initials}</span>
        <h3>{m.name}</h3>
        <p>{m.role}</p>
      </li>)}</ul>
    </section></Reveal>

    <Reveal><section className="team-section" aria-labelledby="team-method">
      <h2 id="team-method">{methodTitle}</h2>
      <p className="team-lead">{methodLead}</p>
      <ol className="team-cycle">{threeE.map((s, i) => <li key={s.id}><span>{i + 1}</span><strong>{s.title}</strong><small>{s.text}</small></li>)}</ol>
      <p className="team-foot">{methodNote}</p>
    </section></Reveal>

    <Reveal><section className="team-section" aria-labelledby="team-thanks">
      <h2 id="team-thanks">{thanks.title}</h2>
      <Callout tone="info"><span className="team-thanks"><HeartHandshake size={22} aria-hidden="true" /><span>{thanks.text}</span></span></Callout>
    </section></Reveal>

    <Reveal><section className="team-section" aria-label="Seguir explorando">
      <div className="team-links">{teamLinks.map(l => <LinkCard key={l.id} title={l.label} text={l.text} onClick={() => onNavigate(l.id)} />)}</div>
    </section></Reveal>
  </div>;
}
