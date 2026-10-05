import { UserRound } from 'lucide-react';
import type { Audience } from '../../../data/audiences';
import { Reveal } from '../../../ui/motion/Reveal';
import { byId, stepsOf } from './steps';

/** Estudiantes: la persona habla y, alrededor de lo que dijo, tres actores hacen su parte. */
export function ExampleChat({ audience }: { audience: Audience }) {
  const steps = stepsOf(audience);
  const [need, contact, benefit] = [byId(steps, 'need'), byId(steps, 'contact'), byId(steps, 'benefit')];
  const around = [
    { who: 'Los agentes escuchan', step: byId(steps, 'listening') },
    { who: 'Las personas comprenden', step: byId(steps, 'understanding') },
    { who: 'El profesional realimenta', step: byId(steps, 'feedback') },
  ];
  return <div className="ex-chat">
    <p className="ex-context"><strong>{contact.title}:</strong> {contact.text} <span>{need.text}</span></p>
    <Reveal><div className="ex-bubble"><span className="ex-avatar"><UserRound size={22} aria-hidden="true" /></span><blockquote>{audience.quote}</blockquote></div></Reveal>
    <div className="ex-around" aria-label="Lo que ocurre alrededor de la conversación">
      {around.map((a, i) => <Reveal key={a.who} delay={0.1 + i * 0.12}><article>
        <span className="ex-around-n"><a.step.icon size={20} aria-hidden="true" /></span>
        <small>{a.who}</small>
        <p>{a.step.text}</p>
      </article></Reveal>)}
    </div>
    <p className="ex-benefit"><benefit.icon size={18} aria-hidden="true" /><strong>{benefit.title}:</strong> {benefit.text}</p>
  </div>;
}
