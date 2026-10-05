import { ArrowRight, Users } from 'lucide-react';
import type { Audience } from '../../../data/audiences';
import { Reveal } from '../../../ui/motion/Reveal';
import { byId, stepsOf } from './steps';

/** Administrativos: dos equipos llegan por separado, sus señales coinciden en un tema compartido y de ahí sale una acción conjunta. */
export function ExampleConverge({ audience }: { audience: Audience }) {
  const steps = stepsOf(audience);
  const [need, contact, listening, understanding, feedback, benefit] = steps;
  return <div className="ex-converge">
    <div className="ex-teams">
      {['Equipo A', 'Equipo B'].map((team, i) => <Reveal key={team} delay={i * 0.12}><article>
        <span className="ex-team-icon"><Users size={20} aria-hidden="true" /></span>
        <small>{team}</small>
        <p>{contact.text}</p>
        <em>{listening.text}</em>
      </article></Reveal>)}
    </div>
    <div className="ex-merge" aria-hidden="true"><ArrowRight size={22} /></div>
    <Reveal delay={0.25}><div className="ex-shared">
      <span className="ex-shared-icon"><understanding.icon size={26} aria-hidden="true" /></span>
      <small>{need.title} compartida</small>
      <strong>{need.text}</strong>
      <p>{understanding.text}</p>
    </div></Reveal>
    <div className="ex-merge" aria-hidden="true"><ArrowRight size={22} /></div>
    <Reveal delay={0.4}><div className="ex-outcome">
      <span className="ex-shared-icon"><feedback.icon size={24} aria-hidden="true" /></span>
      <small>{feedback.title}</small>
      <p>{feedback.text}</p>
      <em>{byId(steps, 'benefit').title}: {benefit.text}</em>
    </div></Reveal>
  </div>;
}
