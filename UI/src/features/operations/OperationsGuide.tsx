import { Check, Eye, FlaskConical, Minus, Sparkles } from 'lucide-react';
import { operationsGuide } from '../../content/ficha/asesoria';
import { Reveal } from '../../ui/motion/Reveal';
import './operations-guide.css';

const stepIcons = { mira: Eye, prueba: FlaskConical, observa: Sparkles } as const;

/** Antes de la demostración: tres pasos para recorrerla y una aclaración de qué es real y qué simulado. */
export function OperationsGuide() {
  return <Reveal><div className="opg">
    <ol className="opg-steps" aria-label={operationsGuide.stepsTitle}>
      {operationsGuide.steps.map((s, i) => { const Icon = stepIcons[s.id as keyof typeof stepIcons]; return <li key={s.id}>
        <span className="opg-icon"><Icon size={22} aria-hidden="true" /></span>
        <div><small>Paso {i + 1}</small><strong>{s.title}</strong><p>{s.text}</p></div>
      </li>; })}
    </ol>
    <div className="opg-truth">
      <section className="real"><h3><Check size={15} aria-hidden="true" />{operationsGuide.realTitle}</h3><ul>{operationsGuide.real.map(t => <li key={t}>{t}</li>)}</ul></section>
      <section className="sim"><h3><Minus size={15} aria-hidden="true" />{operationsGuide.simulatedTitle}</h3><ul>{operationsGuide.simulated.map(t => <li key={t}>{t}</li>)}</ul></section>
    </div>
  </div></Reveal>;
}
