import { useMemo } from 'react';
import { Calculator, HandCoins, Layers, Receipt, type LucideIcon } from 'lucide-react';
import { AnchorTabs } from '../../app/navigation/AnchorTabs';
import { base, costsIndex, costsIntro, financing, structure } from '../../content/ficha/costos';
import type { SimulationInput } from '../../domain/cost/types';
import { Callout } from '../../ui/Callout';
import { DataTable } from '../../ui/DataTable';
import { Reveal } from '../../ui/motion/Reveal';
import { scenarioCodec } from './costModel';
import { CostScale } from './CostScale';
import { CostStructure } from './CostStructure';
import { FinancingPath } from './FinancingPath';
import { SafetyMargin } from './SafetyMargin';
import { SimulatorSection } from './SimulatorSection';
import './costs.css';
import './costs-visuals.css';

interface CostsPageProps {
  /** Parámetros de la URL: un enlace compartido abre el simulador con ese escenario. */
  params: Record<string, string>;
  /** Enlace completo a un escenario, para copiarlo. */
  linkFor: (input: SimulationInput) => string;
  onNavigate: (id: string, sub?: string) => void;
}

const indexIcons: LucideIcon[] = [Receipt, Calculator, Layers, HandCoins];

/** Costos: la base de la ficha, un simulador de escenarios, la estructura completa y cómo financiarlo. */
export function CostsPage({ params, linkFor, onNavigate }: CostsPageProps) {
  const initial = useMemo(() => scenarioCodec.decode(params), [params]);
  const shared = Object.keys(scenarioCodec.encode(initial)).length > 0;
  const t = base.tableLabels;

  return <div className="costs">
    <div className="page-heading"><span className="eyebrow">{costsIntro.eyebrow}</span><h1 className="display-title" aria-label={costsIntro.title}>{costsIntro.titleLines.map(l => <span key={l}>{l}<br /></span>)}<em>{costsIntro.titleAccent}</em></h1><p className="costs-hero-lead">{costsIntro.lead}</p></div>
    <AnchorTabs items={costsIndex.map((i, k) => ({ ...i, icon: indexIcons[k] }))} />

    <Reveal><section id="base" className="cost-section" aria-labelledby="cost-base">
      <h2 id="cost-base">{base.title}</h2>
      <p className="cost-lead">{base.volume}</p>
      <CostScale scenarios={base.scenarios} tag={base.validationTag} unit={base.perSessionUnit} note={base.scaleNote} />
      <details className="cost-table-alt"><summary>Ver las cifras en una tabla</summary>
      <DataTable caption={base.title} columns={[{ key: 'label', label: t.scenario }, { key: 'perSession', label: t.perSession }, { key: 'annual', label: t.annual }]} rows={base.scenarios.map(({ value: _value, ...row }) => row)} />
      </details>
      <p className="cost-lead">{base.range}</p>
      <SafetyMargin {...base.margin} />
      <Callout tone="info" title="A escala institucional">{base.institutional}</Callout>
      <p className="cost-source">{base.source}</p>
    </section></Reveal>

    <section id="simulador" className="cost-section cost-simulator" aria-labelledby="costs-simulator">
      {shared && <Callout tone="info" title="Escenario compartido">Abriste un enlace con supuestos distintos a la base. Puedes ajustarlos, guardarlos o volver a la base con «Restablecer».</Callout>}
      <SimulatorSection initial={initial} linkFor={linkFor} key={JSON.stringify(params)} />
    </section>

    <Reveal><section id="estructura" className="cost-section" aria-labelledby="cost-structure">
      <h2 id="cost-structure">{structure.title}</h2>
      <p className="cost-lead">{structure.lead}</p>
      <CostStructure rows={structure.rows} groups={structure.groups} />
      <details className="cost-table-alt"><summary>Ver la estructura en una tabla</summary>
        <DataTable caption={structure.title} columns={[{ key: 'item', label: structure.columns.item }, { key: 'nature', label: structure.columns.nature }, { key: 'status', label: structure.columns.status }]} rows={structure.rows} />
      </details>
      <h3 className="cost-sub">{structure.precisionTitle}</h3>
      <div className="cost-cards two">{structure.precisions.map(p => <article key={p.id} className="cost-card"><h3>{p.title}</h3><p>{p.text}</p></article>)}</div>
      <Callout tone="scope" title={structure.biggestTitle}><p>{structure.biggest}</p><p>{structure.biggestClose}</p></Callout>
    </section></Reveal>

    <Reveal><section id="financiacion" className="cost-section" aria-labelledby="cost-financing">
      <h2 id="cost-financing">{financing.title}</h2>
      <FinancingPath items={financing.items} />
      <div className="cost-actions">
        <button className="secondary" onClick={() => onNavigate('implementacion')}>Ver el plan de implementación</button>
        <button className="text-button" onClick={() => onNavigate('preguntas')}>Resolver dudas en las preguntas frecuentes</button>
      </div>
    </section></Reveal>
  </div>;
}
