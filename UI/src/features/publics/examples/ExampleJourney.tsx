import { Flag } from 'lucide-react';
import type { Audience } from '../../../data/audiences';
import { Reveal } from '../../../ui/motion/Reveal';
import { stepsOf } from './steps';

/** Graduados: un camino en zigzag, de la necesidad al destino, con cada paso como un hito. */
export function ExampleJourney({ audience }: { audience: Audience }) {
  const steps = stepsOf(audience);
  return <div className="ex-journey">
    <ol>
      {steps.map((s, i) => <li key={s.id} className={i % 2 === 0 ? 'up' : 'down'}>
        <Reveal delay={i * 0.1}><div className="ex-milestone">
          <span className="ex-milestone-icon"><s.icon size={20} aria-hidden="true" /></span>
          <div className="ex-milestone-text"><small>{String(i + 1).padStart(2, '0')} · {s.title}</small><p>{s.text}</p></div>
        </div></Reveal>
      </li>)}
    </ol>
    <div className="ex-road" aria-hidden="true"><span /><Flag size={20} /></div>
  </div>;
}
