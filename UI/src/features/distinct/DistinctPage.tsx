import { useState } from 'react';
import { GitCompareArrows, Hand, History, Layers, Puzzle, Quote, Ruler, Sparkles, type LucideIcon } from 'lucide-react';
import {
  alternatives, alternativesLead, alternativesTitle, boundary, distinctClose, distinctIntro, elementsTitle, innovationHighlights, innovationItems, resonanciaLabel, usualLabel,
} from '../../content/ficha/innovacion';
import { AnchorTabs } from '../../app/navigation/AnchorTabs';
import { Reveal } from '../../ui/motion/Reveal';
import { RichText } from '../../ui/markdown/RichText';
import { AiBoundary } from './AiBoundary';
import { AltFlow } from './AltFlow';
import { ContrastExplorer } from './ContrastExplorer';
import './distinct.css';

interface DistinctPageProps {
  onOpenValidation: () => void;
  onOpenFaq: () => void;
}

const highlightIcons: Record<number, LucideIcon> = { 1: Hand, 2: Quote, 3: Layers, 4: History, 5: Ruler, 6: Puzzle };

const blocks = [
  { id: 'distintos-elementos', label: elementsTitle, icon: Sparkles },
  { id: 'distintos-alternativas', label: alternativesTitle, icon: GitCompareArrows },
] as const;

/** Lo que distingue a la propuesta: dónde se detiene la IA, seis elementos de innovación y la comparación con alternativas. */
export function DistinctPage({ onOpenValidation, onOpenFaq }: DistinctPageProps) {
  const [altId, setAltId] = useState(alternatives[0].id);
  const alt = alternatives.find(a => a.id === altId) ?? alternatives[0];

  return <div className="distinct">
    <div className="page-heading"><span className="eyebrow">{distinctIntro.eyebrow}</span><h1 className="display-title" aria-label={distinctIntro.title}>{distinctIntro.titleLines.map(l => <span key={l}>{l}<br /></span>)}<em>{distinctIntro.titleAccent}</em></h1><p className="distinct-lead-big"><RichText text={distinctIntro.lead} /></p></div>

    <Reveal><p className="distinct-thesis"><RichText text={distinctIntro.thesis} /></p></Reveal>
    <AiBoundary title={boundary.title} stages={boundary.stages} groups={boundary.groups} frontier={boundary.frontier} gate={boundary.gate} />

    <AnchorTabs items={blocks} />

    <section id="distintos-elementos" className="distinct-section" aria-labelledby="dist-elements">
      <h2 id="dist-elements">{elementsTitle}</h2>
      <ContrastExplorer items={innovationItems} highlights={innovationHighlights} icons={highlightIcons} usualLabel={usualLabel} oursLabel={resonanciaLabel} />
    </section>

    <Reveal><section id="distintos-alternativas" className="distinct-section" aria-labelledby="dist-alt">
      <h2 id="dist-alt">{alternativesTitle}</h2>
      <p className="distinct-lead">{alternativesLead}</p>
      <div className="alt-picker" role="group" aria-label="Elige una alternativa">
        {alternatives.map(a => <button key={a.id} className={a.id === alt.id ? 'selected' : ''} aria-pressed={a.id === alt.id} onClick={() => setAltId(a.id)}>{a.label}</button>)}
      </div>
      <div className="alt-detail" aria-live="polite" key={alt.id}>
        <AltFlow flow={alt.flow} usualTitle={alt.label} difference={alt.difference} usualLabel="Podría confundirse con" doesLabel="Lo que hace" differenceLabel="La diferencia" />
      </div>
      <p className="distinct-close">{distinctClose}</p>
    </section></Reveal>

    <div className="distinct-actions">
      <button className="secondary" onClick={onOpenValidation}>Ver la validación</button>
      <button className="text-button" onClick={onOpenFaq}>Resolver dudas en las preguntas frecuentes</button>
    </div>
  </div>;
}
