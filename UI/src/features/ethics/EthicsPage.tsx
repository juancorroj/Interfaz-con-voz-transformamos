import { useEffect, useState } from 'react';
import { BellOff, EyeOff, FileSearch, FileWarning, Lock, Scale, ShieldAlert, ShieldCheck, Target, TriangleAlert, type LucideIcon } from 'lucide-react';
import { AnchorTabs } from '../../app/navigation/AnchorTabs';
import {
  colombianNorms, consent, ethicsIndex, ethicsIntro, internationalStandards, normBadgeGroups, normLabels, practiceConsequences, practiceTitle, reviewScope, risk,
} from '../../content/ficha/legal';
import type { NormBadge } from '../../content/types';
import { Callout } from '../../ui/Callout';
import { Reveal } from '../../ui/motion/Reveal';
import { DataMap } from './DataMap';
import { NormBadges } from './NormBadges';
import { NormExplorer } from './NormExplorer';
import './ethics.css';

interface EthicsPageProps {
  /** Bloque al que desplazarse al abrir la página (por ejemplo, `riesgo`). */
  focus?: string;
  onNavigate: (id: string, sub?: string) => void;
}

const scrollToId = (id: string) => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
};

const practiceIcons: Record<string, LucideIcon> = { finalidad: Target, separados: EyeOff, rastreable: FileSearch };
const riskIcons: Record<string, LucideIcon> = { 'nadie-actua': BellOff, prioriza: TriangleAlert, distingue: Scale, 'no-viaja': Lock };
const badgesById: Record<string, NormBadge> = Object.fromEntries(normBadgeGroups.flatMap(g => g.badges).map(b => [b.id, b]));

/** Marco legal y ético: los sellos de lo que se adoptó, cada norma explicada, la señal de riesgo y el consentimiento. */
export function EthicsPage({ focus, onNavigate }: EthicsPageProps) {
  const [normId, setNormId] = useState(colombianNorms[0].id);

  useEffect(() => {
    if (!focus) return;
    const timer = window.setTimeout(() => scrollToId(focus), 80);
    return () => window.clearTimeout(timer);
  }, [focus]);

  const openNorm = (id: string) => { setNormId(id); window.setTimeout(() => scrollToId('normas'), 40); };

  return <div className="ethics">
    <div className="page-heading">
      <span className="eyebrow">{ethicsIntro.eyebrow}</span>
      <h1 className="display-title" aria-label={ethicsIntro.title}>{ethicsIntro.titleLines.map(l => <span key={l}>{l}<br /></span>)}{ethicsIntro.titleTail}<em>{ethicsIntro.titleAccent}</em></h1>
      <p className="eth-hero-lead">{ethicsIntro.lead}</p>
    </div>

    <NormBadges groups={normBadgeGroups} notice={normLabels.notice} onSelect={openNorm} />
    <AnchorTabs items={ethicsIndex.map(i => ({ ...i }))} />

    <Reveal><section id="normas" className="eth-section" aria-labelledby="eth-norms">
      <h2 id="eth-norms">{normLabels.title}</h2>
      <p className="eth-lead">{normLabels.lead}</p>
      <NormExplorer
        groups={[{ title: 'Marco colombiano', norms: colombianNorms }, { title: 'Estándares internacionales', norms: internationalStandards }]}
        badges={badgesById} selectedId={normId} onSelect={setNormId} demandsLabel={normLabels.demands} reflectedLabel={normLabels.reflected} />
    </section></Reveal>

    <Reveal><section id="practica" className="eth-section" aria-labelledby="eth-practice">
      <h2 id="eth-practice">{practiceTitle}</h2>
      <ul className="eth-practice">{practiceConsequences.map((c, i) => { const Icon = practiceIcons[c.id] ?? ShieldCheck; return <li key={c.id}>
        <span className="eth-practice-icon"><Icon size={26} aria-hidden="true" /></span>
        <span className="eth-card-number">0{i + 1}</span>
        <h3>{c.title}</h3>
        <p>{c.text}</p>
      </li>; })}</ul>
    </section></Reveal>

    <Reveal><section id="riesgo" className="eth-section eth-risk" aria-labelledby="eth-risk">
      <h2 id="eth-risk"><ShieldAlert size={22} aria-hidden="true" />{risk.title}</h2>
      <p className="eth-lead">{risk.lead}</p>
      <ol className="eth-protocol">{risk.rules.map((r, i) => { const Icon = riskIcons[r.id] ?? ShieldAlert; return <li key={r.id}>
        <span className="eth-protocol-icon"><Icon size={22} aria-hidden="true" /></span>
        <div><span className="eth-card-number">Regla {i + 1}</span><h3>{r.title}</h3><p>{r.text}</p></div>
      </li>; })}</ol>
      <Callout tone="info">{risk.demoNote}</Callout>
      <button className="text-button" onClick={() => onNavigate('asesoria', 'operacion')}>Ver el panel del profesional</button>
    </section></Reveal>

    <Reveal><section id="consentimiento" className="eth-section" aria-labelledby="eth-consent">
      <h2 id="eth-consent">{consent.title}</h2>
      <p className="eth-lead">{consent.lead}</p>
      <Callout tone="scope" icon={FileWarning} title={consent.statusTitle}>{consent.status}</Callout>

      <div className="eth-two-col">
        <div><h3 className="eth-sub">{consent.principlesTitle}</h3><ul className="eth-checklist">{consent.principles.map(p => <li key={p}><ShieldCheck size={15} aria-hidden="true" />{p}</li>)}</ul></div>
        <div><h3 className="eth-sub">{consent.threeThingsTitle}</h3><ol className="eth-numbered">{consent.threeThings.map((t, i) => <li key={t.id}><span>{i + 1}</span><div><strong>{t.title}</strong><small>{t.text}</small></div></li>)}</ol></div>
      </div>

      <h3 className="eth-sub">{consent.accessTitle}</h3>
      <DataMap items={consent.access} caption={consent.accessCaption} centerLabel={consent.accessCenter} whoLabel={consent.accessWho} />

      <h3 className="eth-sub">{consent.openTitle}</h3>
      <p className="eth-lead">{consent.openIntro}</p>
      <ol className="eth-agenda">{consent.open.map((o, i) => <li key={o.decision}><span>{i + 1}</span><p>{o.decision}</p><em>{o.owner}</em></li>)}</ol>
    </section></Reveal>

    <Reveal><section id="alcance" className="eth-section" aria-labelledby="eth-scope">
      <Callout tone="scope" icon={ShieldCheck} title={reviewScope.title}>{reviewScope.text}</Callout>
      <div className="eth-actions"><button className="secondary" onClick={() => onNavigate('implementacion')}>Ver el plan de implementación</button></div>
    </section></Reveal>
  </div>;
}
