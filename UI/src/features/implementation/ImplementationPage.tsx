import { useState } from 'react';
import { ArrowRight, Bot, ChartNoAxesCombined, Check, ClipboardCheck, Ear, Flag, Landmark, Repeat, ShieldCheck, ThumbsUp, Timer, Gauge, Hourglass, ListOrdered, MapPin, TriangleAlert, UsersRound, type LucideIcon } from 'lucide-react';
import { AnchorTabs } from '../../app/navigation/AnchorTabs';
import {
  conditions, gantt, gates, implIndex, implIntro, keyMilestones, measures, order, phases, phasesTitle, precisions, precisionsTitle, responsibility, schedule, startingPoint, timesTitle,
} from '../../content/ficha/implementacion';
import { Callout } from '../../ui/Callout';
import { DataTable } from '../../ui/DataTable';
import { Reveal } from '../../ui/motion/Reveal';
import { ConditionMap } from './ConditionMap';
import { PhaseGates } from './PhaseGates';
import { PlanGantt } from './PlanGantt';
import './implementation.css';

interface ImplementationPageProps {
  onNavigate: (id: string, sub?: string) => void;
}

const indexIcons: LucideIcon[] = [MapPin, ListOrdered, Hourglass, Gauge, UsersRound, Flag, TriangleAlert];

const measureIcons: LucideIcon[] = [Timer, Repeat, ThumbsUp, Ear, ShieldCheck];
const roleIcons: LucideIcon[] = [Bot, ChartNoAxesCombined, ClipboardCheck];

/** Plan de implementación por fases, tiempos, medición, responsabilidades y dependencias. */
export function ImplementationPage({ onNavigate }: ImplementationPageProps) {
  const [selectedPhase, setSelectedPhase] = useState(1);

  return <div className="impl">
    <div className="page-heading"><span className="eyebrow">{implIntro.eyebrow}</span><h1 className="display-title" aria-label={implIntro.title}>{implIntro.titleLines.map(l => <span key={l}>{l}<br /></span>)}<em>{implIntro.titleAccent}</em></h1><p className="impl-hero-lead">{implIntro.lead}</p></div>
    <AnchorTabs items={implIndex.map((i, k) => ({ ...i, icon: indexIcons[k] }))} />

    <Reveal><section id="punto-de-partida" className="impl-section" aria-labelledby="impl-start">
      <h2 id="impl-start">{startingPoint.title}</h2>
      <div className="impl-ba">
        <div className="impl-panel built"><span className="impl-ba-tag"><Check size={13} aria-hidden="true" />Hoy</span><h3>{startingPoint.builtTitle}</h3><ul>{startingPoint.built.map(b => <li key={b}><Check size={15} aria-hidden="true" />{b}</li>)}</ul></div>
        <div className="impl-bridge" aria-hidden="true"><span><ArrowRight size={22} /></span><small>Fase 1</small></div>
        <div className="impl-panel pending"><span className="impl-ba-tag"><Flag size={13} aria-hidden="true" />Falta</span><h3>{startingPoint.pendingTitle}</h3><ul>{startingPoint.pending.map(b => <li key={b}><ArrowRight size={15} aria-hidden="true" />{b}</li>)}</ul></div>
      </div>
      <p className="impl-lead">{startingPoint.close}</p>
    </section></Reveal>

    <Reveal><section id="fases" className="impl-section" aria-labelledby="impl-phases">
      <h2 id="impl-phases">{phasesTitle}</h2>
      <PhaseGates phases={phases} selectedId={selectedPhase} onSelect={setSelectedPhase} gateLabel={gates.label} questionLabel={gates.question} lastGateNote={gates.last} />
    </section></Reveal>

    <Reveal><section id="tiempos" className="impl-section" aria-labelledby="impl-times">
      <h2 id="impl-times">{timesTitle}</h2>
      <div className="impl-milestones">{keyMilestones.map(m => <article key={m.label} className="milestone"><strong>{m.value}</strong><span>{m.label}</span><small>{m.detail}</small></article>)}</div>
      <PlanGantt {...gantt} />
      <details className="impl-table-alt"><summary>Ver los tiempos en una tabla</summary>
        <DataTable caption={timesTitle} columns={[{ key: 'phase', label: 'Fase' }, { key: 'duration', label: 'Duración' }, { key: 'milestone', label: 'Hito' }]} rows={schedule} />
      </details>
      <h3 className="impl-sub">{precisionsTitle}</h3>
      <div className="impl-cards three">{precisions.map((p, i) => <article key={p.id} className="impl-card"><span className="impl-card-number">0{i + 1}</span><h3>{p.title}</h3><p>{p.text}</p></article>)}</div>
    </section></Reveal>

    <Reveal><section id="medicion" className="impl-section" aria-labelledby="impl-measures">
      <h2 id="impl-measures">{measures.title}</h2>
      <p className="impl-lead">{measures.lead}</p>
      <ul className="impl-gauges">{measures.rows.map((r, i) => { const Icon = measureIcons[i] ?? Gauge; return <li key={r.what}>
        <span className="impl-gauge-icon"><Icon size={22} aria-hidden="true" /></span>
        <div><strong>{r.what}</strong><small><b>Cómo:</b> {r.how}</small></div>
      </li>; })}</ul>
    </section></Reveal>

    <Reveal><section id="responsabilidad" className="impl-section" aria-labelledby="impl-resp">
      <h2 id="impl-resp">{responsibility.title}</h2>
      <div className="impl-gov">
        <span className="impl-gov-icon" aria-hidden="true"><Landmark size={54} strokeWidth={1.2} /></span>
        <p className="impl-lead">{responsibility.lead}</p>
      </div>
      <div className="impl-cards three">{responsibility.roles.map((r, i) => { const Icon = roleIcons[i] ?? UsersRound; return <article key={r.id} className="impl-card accent"><span className="impl-role-icon"><Icon size={22} aria-hidden="true" /></span><h3>{r.title}</h3><p>{r.text}</p></article>; })}</div>
    </section></Reveal>

    <Reveal><section id="orden" className="impl-section" aria-labelledby="impl-order">
      <h2 id="impl-order">{order.title}</h2>
      <p className="impl-lead">{order.text}</p>
      <p className="impl-recommend">{order.recommendation}</p>
      <ol className="impl-steps">{order.steps.map((s, i) => <li key={s.id}><span>{i + 1}</span><div><strong>{s.title}</strong><small>{s.text}</small></div>{i < order.steps.length - 1 && <ArrowRight className="step-arrow" size={18} aria-hidden="true" />}</li>)}</ol>
      <p className="impl-lead">{order.close}</p>
    </section></Reveal>

    <Reveal><section id="condiciones" className="impl-section" aria-labelledby="impl-cond">
      <h2 id="impl-cond">{conditions.title}</h2>
      <p className="impl-lead">{conditions.lead}</p>
      <ConditionMap items={conditions.items} phaseCount={phases.length} affectsLabel={conditions.affectsLabel} />
      <Callout tone="info" title="Cada fase termina en una decisión">La Universidad habilita una fase, evalúa el resultado y decide con evidencia si continúa.</Callout>
      <div className="impl-actions">
        <button className="secondary" onClick={() => onNavigate('etica')}>Ver el marco ético y legal</button>
        <button className="text-button" onClick={() => onNavigate('preguntas')}>Resolver dudas en las preguntas frecuentes</button>
      </div>
    </section></Reveal>
  </div>;
}
