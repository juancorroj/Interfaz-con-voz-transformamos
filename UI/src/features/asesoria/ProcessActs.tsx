import { ArrowRight, Sparkles } from 'lucide-react';
import type { ProcessStage } from '../../content/types';
import { Reveal } from '../../ui/motion/Reveal';

export interface ProcessAct {
  id: string;
  label: string;
  hint: string;
  /** Números de las etapas que pertenecen a este acto. */
  stages: readonly number[];
}

interface ProcessActsProps {
  acts: readonly ProcessAct[];
  stages: readonly ProcessStage[];
  /** Marcas que conectan una etapa con lo que hace ResonancIA, por número de etapa. */
  marks: Readonly<Record<number, string>>;
}

/** Las etapas de una atención agrupadas en tres actos (antes, durante y después), cada uno en su columna. */
export function ProcessActs({ acts, stages, marks }: ProcessActsProps) {
  const byNumber = new Map(stages.map(s => [s.n, s]));
  return <div className="acts">
    {acts.map((act, i) => <Reveal key={act.id} delay={i * 0.1}><section className={`act act-${act.id}`} aria-label={act.label}>
      <header><span className="act-n">0{i + 1}</span><div><h3>{act.label}</h3><small>{act.hint}</small></div>{i < acts.length - 1 && <ArrowRight className="act-arrow" size={20} aria-hidden="true" />}</header>
      <ol>{act.stages.map(n => { const s = byNumber.get(n); if (!s) return null; return <li key={n} className={marks[n] ? 'marked' : ''}>
        <span className="act-stage-n">{n}</span>
        <div><strong>{s.title}</strong><p>{s.text}</p>{marks[n] && <em className="act-mark"><Sparkles size={13} aria-hidden="true" />{marks[n]}</em>}</div>
      </li>; })}</ol>
    </section></Reveal>)}
  </div>;
}
