import { Building2, Landmark } from 'lucide-react';
import type { Audience } from '../../../data/audiences';
import { Reveal } from '../../../ui/motion/Reveal';
import { stepsOf } from './steps';

/** Aliados: la empresa a un lado, la Universidad al otro y los pasos como tramos del puente que los une. */
export function ExampleBridge({ audience }: { audience: Audience }) {
  const [need, contact, listening, understanding, feedback, benefit] = stepsOf(audience);
  return <div className="ex-bridge">
    <Reveal><section className="ex-bank company">
      <span className="ex-bank-icon"><Building2 size={26} aria-hidden="true" /></span>
      <small>La empresa</small>
      <h4>{need.title}</h4>
      <p>{need.text}</p>
      <h4>{listening.title}</h4>
      <p>{listening.text}</p>
    </section></Reveal>

    <div className="ex-spans" aria-label="El puente entre la empresa y la Universidad">
      {[contact, understanding].map((s, i) => <Reveal key={s.id} delay={0.15 + i * 0.15}><div className="ex-span">
        <span className="ex-span-icon"><s.icon size={20} aria-hidden="true" /></span>
        <small>{s.title}</small>
        <p>{s.text}</p>
      </div></Reveal>)}
    </div>

    <Reveal delay={0.3}><section className="ex-bank university">
      <span className="ex-bank-icon"><Landmark size={26} aria-hidden="true" /></span>
      <small>La Universidad</small>
      <h4>{feedback.title}</h4>
      <p>{feedback.text}</p>
      <h4>{benefit.title}</h4>
      <p>{benefit.text}</p>
    </section></Reveal>
  </div>;
}
