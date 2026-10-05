import { useEffect, useState } from 'react';
import { ArrowRight, AudioLines, Brain, Building2, BriefcaseBusiness, Check, Compass, GraduationCap, Handshake, HeartHandshake, Landmark, LayoutList, Lightbulb, Mic, MessagesSquare, PencilRuler, Presentation, Repeat2, Sprout, Users, Heart, Home, Globe } from 'lucide-react';
import { Route, ShieldCheck, UserCheck } from 'lucide-react';
import { coIntelligence, cycle, decisions, evolution, moments, momentsCycle, premise, premiseDiagram, solutionIndex, solutionIntro } from '../../content/ficha/solucion';
import { AnchorTabs } from '../../app/navigation/AnchorTabs';
import { designDecisions } from '../../content/ficha/asesoria';
import { Callout } from '../../ui/Callout';
import { RichText } from '../../ui/markdown/RichText';
import { EvolutionLoop } from './EvolutionLoop';
import { CoIntelligenceJourney } from '../../ui/diagrams/CoIntelligenceJourney';
import { CycleExplorer } from '../../ui/diagrams/CycleExplorer';
import { Reveal } from '../../ui/motion/Reveal';
import { ChannelsDiagram, type DiagramItem } from './ChannelsDiagram';
import './solution.css';
import './channels.css';

interface SolutionPageProps {
  /** Momento al que desplazarse al abrir la página (`escuchar`, `comprender` o `realimentar`). */
  focus?: string;
  onOpenCase: () => void;
}

const scrollToId = (id: string) => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
};

const tabIcons = { premisa: Lightbulb, ciclo: Repeat2, decisiones: PencilRuler, cointeligencia: Handshake, evolucion: Sprout } as const;
const withIcons = (items: readonly { id: string; label: string }[], icons: Record<string, DiagramItem['icon']>): DiagramItem[] => items.map(i => ({ ...i, icon: icons[i.id] ?? Compass }));
const verbIcons = { escucha: AudioLines, estructura: LayoutList, comprende: Brain, devuelve: HeartHandshake };
const contactIcons = { asesorias: MessagesSquare, entrevistas: Mic, reuniones: Users, comites: Landmark, acompanamiento: Heart };
const accents: Record<string, string> = { escuchar: '--accent-escucha', comprender: '--accent-comprension', realimentar: '--accent-realimentacion', explorar: '--accent-escucha', experimentar: '--accent-comprension', evolucionar: '--accent-realimentacion' };
const decisionIcons: Record<string, typeof Route> = { encuentro: MessagesSquare, dignidad: HeartHandshake, ruta: Route, herramienta: UserCheck };
const peopleIcons = { estudiantes: GraduationCap, graduados: BriefcaseBusiness, profesores: Presentation, administrativos: Building2, aliados: Handshake, padres: Home, externos: Globe, familiares: Users };

/** Cómo funciona ResonancIA, de la premisa al marco que evoluciona. */
export function SolutionPage({ focus, onOpenCase }: SolutionPageProps) {
  const [selected, setSelected] = useState(focus && moments.some(m => m.id === focus) ? focus : moments[0].id);
  useEffect(() => {
    if (!focus) return;
    if (moments.some(m => m.id === focus)) setSelected(focus);
    const timer = window.setTimeout(() => scrollToId('ciclo'), 80);
    return () => window.clearTimeout(timer);
  }, [focus]);

  return <div className="solution">
    <div className="page-heading"><span className="eyebrow">{solutionIntro.eyebrow}</span><h1 className="display-title" aria-label={solutionIntro.title}>{solutionIntro.titleLines.map(l => <span key={l}>{l}<br /></span>)}{solutionIntro.titleTail}<em>{solutionIntro.titleAccent}</em></h1><p className="solution-lead">{solutionIntro.lead}</p></div>
    <AnchorTabs items={solutionIndex.map(i => ({ ...i, icon: tabIcons[i.id as keyof typeof tabIcons] }))} />

    <Reveal><section id="premisa" className="sol-section" aria-labelledby="sol-premise">
      <h2 id="sol-premise">{premise.title}</h2>
      <ChannelsDiagram notNew={premiseDiagram.notNew} layerName={premiseDiagram.layerName} verbs={withIcons(premiseDiagram.verbs, verbIcons)}
        contactTitle={premiseDiagram.contactTitle} contacts={withIcons(premiseDiagram.contacts, contactIcons)}
        peopleTitle={premiseDiagram.peopleTitle} people={withIcons(premiseDiagram.people, peopleIcons)}
        morePeople={withIcons(premiseDiagram.morePeople, peopleIcons)} />
      <div className="sol-premise-cards">{premise.paragraphs.map((p, i) => <article key={p} className={`sol-premise-card ${i === 1 ? 'accent' : ''}`}><span>{premiseDiagram.cardLabels[i]}</span><p>{p}</p></article>)}</div>
    </section></Reveal>

    <Reveal><section id="ciclo" className="sol-section sol-moments" aria-labelledby="sol-cycle">
      <h2 id="sol-cycle">{momentsCycle.title}</h2>
      <p className="sol-lead">{cycle.text} {momentsCycle.hint}</p>
      <CycleExplorer
        ariaLabel="Ciclo: escuchar, comprender y realimentar, y vuelta a escuchar"
        center={cycle.center}
        selectedId={selected}
        onSelect={setSelected}
        nextLabel={t => `${momentsCycle.next}: ${t}`}
        restartLabel={momentsCycle.restart}
        nodes={moments.map(m => ({ id: m.id, label: m.title, accent: accents[m.id] }))}
        renderPanel={(id, i) => {
          const m = moments[i];
          return <article id={`momento-${id}`} className={`moment-card moment-${id}`}>
            <header><span className="moment-card-number">0{i + 1}</span><h3>{m.title}</h3></header>
            <p className="moment-summary">{m.summary}</p>
            {m.framework && <div className="moment-framework">
              <h4>{m.framework.intro}</h4>
              <ol>{m.framework.steps.map((st, k) => <li key={st.label}><span>{st.label}</span><p><RichText text={st.text} /></p>{k < m.framework!.steps.length - 1 && <ArrowRight className="fw-arrow" size={16} aria-hidden="true" />}</li>)}</ol>
            </div>}
            <div className="moment-body">
              <div><h4>{m.listTitle}</h4><ul>{m.points.map(p => <li key={p}><Check size={14} aria-hidden="true" />{p}</li>)}</ul>{m.note && <p className="moment-note">{m.note}</p>}</div>
              <dl><div><dt>Quién lo hace</dt><dd>{m.actor}</dd></div><div><dt>Qué garantiza</dt><dd>{m.guarantee}</dd></div></dl>
            </div>
          </article>;
        }} />
    </section></Reveal>

    <Reveal><section id="decisiones" className="sol-section" aria-labelledby="sol-decisions">
      <h2 id="sol-decisions">{decisions.title}</h2>
      <p className="sol-lead sol-lead-big"><RichText text={decisions.intro} /></p>
      <div className="sol-cards">{designDecisions.map((d, i) => { const Icon = decisionIcons[d.id] ?? Route; return <article key={d.id} className="sol-card"><span className="sol-card-icon"><Icon size={24} aria-hidden="true" /></span><div><span className="sol-card-number">0{i + 1}</span><h3>{d.title}</h3><p><RichText text={d.text} /></p></div></article>; })}</div>
      <button className="secondary" onClick={onOpenCase}>Ver el caso de Asesoría</button>
    </section></Reveal>

    <Reveal><section id="cointeligencia" className="sol-section" aria-labelledby="sol-co">
      <h2 id="sol-co">{coIntelligence.title}</h2>
      <p className="sol-lead sol-lead-big"><RichText text={coIntelligence.lead} /></p>
      <CoIntelligenceJourney steps={coIntelligence.chain} machineLabel={coIntelligence.groups.machine} humanLabel={coIntelligence.groups.human} frontier={coIntelligence.frontier} />
      <p className="sol-benefit">{coIntelligence.benefit}</p>
      <Callout tone="scope" icon={ShieldCheck} title="Lo que nunca se hace"><RichText text={coIntelligence.limit} /></Callout>
      <ul className="sol-chips">{coIntelligence.safeguards.map(s => <li key={s}>{s}</li>)}</ul>
    </section></Reveal>

    <Reveal><section id="evolucion" className="sol-section" aria-labelledby="sol-evo">
      <h2 id="sol-evo">{evolution.title}</h2>
      <p className="sol-lead">{evolution.text}</p>
      <EvolutionLoop steps={evolution.steps} loopLabel={evolution.loopLabel} modular={evolution.modular} />
      <ul className="sol-traits" aria-label="Qué lo hace sostenible">{evolution.traits.map(t => <li key={t}><Check size={14} aria-hidden="true" />{t}</li>)}</ul>
    </section></Reveal>
  </div>;
}
