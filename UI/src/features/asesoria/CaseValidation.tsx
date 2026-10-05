import { Boxes, Layers, PencilRuler, PlayCircle, Puzzle, Rocket, ShieldCheck, TrendingUp, Users, X, type LucideIcon } from 'lucide-react';
import { AnchorTabs } from '../../app/navigation/AnchorTabs';
import { maturity, validation, validationFigures, validationIndex, validationMeshes } from '../../content/ficha/asesoria';
import { Callout } from '../../ui/Callout';
import { RangeBar } from '../../ui/charts/RangeBar';
import { MaturityLadder } from './MaturityLadder';
import { StatTile } from '../../ui/StatTile';
import { StatusBadge } from '../../ui/StatusBadge';
import { Reveal } from '../../ui/motion/Reveal';

const stageIcons: LucideIcon[] = [PencilRuler, Boxes, PlayCircle, Users, Rocket];
const indexIcons: LucideIcon[] = [Layers, PlayCircle, ShieldCheck, TrendingUp, Puzzle];

export function CaseValidation({ onOpenSupport }: { onOpenSupport: () => void }) {
  return <>
    <div className="page-heading"><span className="eyebrow">{validation.eyebrow}</span><h2>{validation.title}</h2><p>{validation.intro}</p></div>
    <AnchorTabs items={validationIndex.map((item, i) => ({ ...item, icon: indexIcons[i] }))} />

    <Reveal><section id="val-madurez" className="case-section" aria-labelledby="val-maturity">
      <h2 id="val-maturity">{maturity.title}</h2>
      <p className="case-aside">{maturity.lead}</p>
      <MaturityLadder stages={maturity.stages.map((st, i) => ({ ...st, icon: stageIcons[i] }))} hereLabel={maturity.hereLabel} nextLabel={maturity.nextLabel} />
      <p className="case-aside">{validation.next}</p>
    </section></Reveal>

    <section id="val-corrido" className="case-section" aria-labelledby="val-figures">
      <h2 id="val-figures">{validation.figuresTitle}</h2>
      <div className="case-figures">{validationFigures.map(f => <StatTile key={f.label} {...f} />)}</div>
    </section>

    <Reveal><section id="val-alcance" className="case-section" aria-labelledby="val-scope">
      <Callout tone="scope" title={validation.scopeTitle}>
        <ul className="case-plain">{validation.scope.map(s => <li key={s}>{s}</li>)}</ul>
        <p>{validation.scopeNote}</p>
        <button className="text-button" onClick={onOpenSupport}>Ver el soporte técnico que lo respalda</button>
      </Callout>
    </section></Reveal>

    <Reveal><section id="val-escala" className="case-section" aria-labelledby="val-reuse">
      <h2 id="val-reuse">{validation.reuseTitle}</h2>
      <p className="case-aside">{validation.reuseText}</p>
      <div className="case-bands">{validation.reuseBands.map(b => <div key={b.label} className="case-band">
        <div className="case-band-head"><strong>{b.label}</strong><span>{b.min} % – {b.max} %</span></div>
        <RangeBar min={b.min} max={b.max} />
        <small>{b.note}</small>
      </div>)}</div>
      <p className="case-aside">{validation.reuseClose}</p>
    </section></Reveal>

    <Reveal><section id="val-flex" className="case-section" aria-labelledby="val-flex-title">
      <h2 id="val-flex-title">{validation.flexTitle}</h2>
      <p className="case-aside">{validation.flexText}</p>
      <ul className="case-meshes">{validationMeshes.map(m => <li key={m.id}><span>{m.label}</span><StatusBadge kind={m.status} /></li>)}</ul>
      <p className="case-aside"><X size={14} aria-hidden="true" className="inline-icon" /> {validation.flexWhy}</p>
    </section></Reveal>
  </>;
}
