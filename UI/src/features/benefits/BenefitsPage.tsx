import { Landmark, Cog, UserRound } from 'lucide-react';
import type { SectionRegistry } from '../../app/SectionRegistry';
import { SectionTabs } from '../../app/navigation/SectionTabs';
import {
  audienceVisions, audiencesIntro, benefitGrowth, benefitKeywords, benefitLevels, benefitsIntro, encounterHint, encounterStages, heardBenefits, heardTitle, listenerBenefits, listenerTitle, peopleIntro, processBenefits, universityBenefits,
} from '../../content/ficha/beneficios';
import { Callout } from '../../ui/Callout';
import { AudienceExplorer } from './AudienceExplorer';
import { BenefitExplorer } from './BenefitExplorer';
import { BenefitLadder } from './BenefitLadder';
import { EncounterMap } from './EncounterMap';
import './benefits.css';

export const BENEFITS_SECTION_ID = 'beneficios';

const levelIcons = { personas: UserRound, procesos: Cog, universidad: Landmark } as Record<string, typeof UserRound>;
const levelCounts: Record<string, number> = { personas: heardBenefits.length + listenerBenefits.length, procesos: processBenefits.length, universidad: universityBenefits.length };

interface BenefitsPageProps {
  registry: SectionRegistry;
  sub?: string;
  onNavigate: (id: string, sub?: string) => void;
  onOpenAudience: (id: string) => void;
}

/** Beneficios en tres niveles (personas, procesos, Universidad) y la visión por público. */
export function BenefitsPage({ registry, sub, onNavigate, onOpenAudience }: BenefitsPageProps) {
  const tabs = registry.byId(BENEFITS_SECTION_ID)?.subsections ?? [];
  const active = tabs.find(t => t.id === sub)?.id ?? tabs[0]?.id;

  return <div className="benefits-view">
    <div className="page-heading"><span className="eyebrow">{benefitsIntro.eyebrow}</span><h1 className="display-title" aria-label={benefitsIntro.title}>{benefitsIntro.titleLines.map(l => <span key={l}>{l}<br /></span>)}<em>{benefitsIntro.titleAccent}</em></h1><p>{benefitsIntro.lead}</p></div>
    <BenefitLadder levels={benefitLevels.map(l => ({ ...l, icon: levelIcons[l.id], count: levelCounts[l.id] }))} activeId={active} growthLabel={benefitGrowth} onSelect={id => onNavigate(BENEFITS_SECTION_ID, id)} />
    <SectionTabs registry={registry} sectionId={BENEFITS_SECTION_ID} sub={sub} label="Niveles de beneficio" onNavigate={onNavigate} />
    <div className="benefits-content" key={active}>
      {active === 'personas' && <>
        <p className="benefit-intro">{peopleIntro}</p>
        <EncounterMap heardTitle={heardTitle} listenerTitle={listenerTitle} heard={heardBenefits} listener={listenerBenefits} stages={encounterStages} keywords={benefitKeywords} hint={encounterHint} />
      </>}
      {active === 'procesos' && <BenefitExplorer items={processBenefits} keywords={benefitKeywords} ariaLabel="Beneficios para los procesos" />}
      {active === 'universidad' && <BenefitExplorer items={universityBenefits} keywords={benefitKeywords} ariaLabel="Beneficios para la Universidad" />}
      {active === 'publicos' && <>
        <Callout tone="scope" title="Qué está validado y qué no">{audiencesIntro}</Callout>
        <AudienceExplorer visions={audienceVisions} onOpenAudience={onOpenAudience} />
      </>}
    </div>
  </div>;
}
