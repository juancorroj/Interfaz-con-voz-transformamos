import { BadgeCheck, Check, Compass, Ear, GitCompareArrows, HeartHandshake, Info, ListOrdered, MessagesSquare, PencilRuler, Route, ShieldCheck, Target, UserCheck, UserRound, type LucideIcon } from 'lucide-react';
import { AnchorTabs } from '../../app/navigation/AnchorTabs';
import { designDecisions, designDecisionsIntro, designDecisionsTitle, orientingPrinciples, principlesRoofLabel, process, processActs, processCompare, processIndex, processStageMarks, processStages, purposeLead, purposeVerbs } from '../../content/ficha/asesoria';
import { Callout } from '../../ui/Callout';
import { RichText } from '../../ui/markdown/RichText';
import { Reveal } from '../../ui/motion/Reveal';
import { PrinciplePillars } from './PrinciplePillars';
import { ProcessActs } from './ProcessActs';
import { ProcessCompare } from './ProcessCompare';
import { PurposePath } from './PurposePath';

const principleIcons: Record<string, LucideIcon> = { centralidad: UserRound, escucha: Ear, responsabilidad: BadgeCheck, claridad: Compass, accion: Target };
const decisionIcons: Record<string, LucideIcon> = { encuentro: MessagesSquare, dignidad: HeartHandshake, ruta: Route, herramienta: UserCheck };
const indexIcons: LucideIcon[] = [GitCompareArrows, Check, ListOrdered, ShieldCheck, PencilRuler];

export function CaseProcess() {
  return <>
    <div className="page-heading"><span className="eyebrow">{process.eyebrow}</span><h2>{process.title}</h2><p>{process.intro}</p></div>
    <AnchorTabs items={processIndex.map((item, i) => ({ ...item, icon: indexIcons[i] }))} />

    <Reveal><section id="proc-proposito" className="case-section" aria-labelledby="proc-purpose">
      <h2 id="proc-purpose">{process.purposeTitle}</h2>
      <PurposePath lead={purposeLead} items={process.purpose} verbs={purposeVerbs} />
      <p className="case-note"><Info size={16} aria-hidden="true" />{process.purposeNote}</p>
      <Callout tone="scope" title={process.limitsTitle}>{process.limits}</Callout>
    </section></Reveal>

    <Reveal><section id="proc-etapas" className="case-section" aria-labelledby="proc-stages">
      <h2 id="proc-stages">{process.stagesTitle}</h2>
      <ProcessActs acts={processActs} stages={processStages} marks={processStageMarks} />
    </section></Reveal>

    <Reveal><section id="proc-principios" className="case-section" aria-labelledby="proc-principles">
      <h2 id="proc-principles">{process.principlesTitle}</h2>
      <PrinciplePillars roofLabel={principlesRoofLabel} roof={process.idea} principles={orientingPrinciples} icons={principleIcons} />
      <p className="case-source">{process.source}</p>
    </section></Reveal>

    <Reveal><section id="proc-comparar" className="case-section" aria-labelledby="proc-compare-title">
      <h2 id="proc-compare-title">{processCompare.title}</h2>
      <p className="case-aside">{processCompare.lead}</p>
      <ProcessCompare before={processCompare.before} after={processCompare.after} summaryTitle={processCompare.summaryTitle} summary={processCompare.summary} labels={processCompare.labels} />
      <p className="case-source">{processCompare.note}</p>
    </section></Reveal>


    <Reveal><section id="proc-decisiones" className="case-section case-decisions" aria-labelledby="proc-decisions">
      <h2 id="proc-decisions">{designDecisionsTitle}</h2>
      <p className="case-aside">{designDecisionsIntro}</p>
      <div className="case-cards two">{designDecisions.map((d, i) => { const Icon = decisionIcons[d.id] ?? Route; return <article key={d.id} className="case-card accent case-card-icon"><span className="case-decision-icon"><Icon size={24} aria-hidden="true" /></span><div><span className="case-card-number">0{i + 1}</span><h3>{d.title}</h3><p><RichText text={d.text} /></p></div></article>; })}</div>
    </section></Reveal>
  </>;
}
