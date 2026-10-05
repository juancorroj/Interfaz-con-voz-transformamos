import { useState } from 'react';
import { ArrowRight, BarChart3, Compass, Repeat2 } from 'lucide-react';
import type { SectionRegistry } from '../../app/SectionRegistry';
import { AnchorTabs } from '../../app/navigation/AnchorTabs';
import { CASE_SECTION_ID } from '../../app/sections';
import { summary, summaryFigures, summaryIndex, summaryMoments, summaryMomentLinks } from '../../content/ficha/asesoria';
import { Callout } from '../../ui/Callout';
import { CycleExplorer } from '../../ui/diagrams/CycleExplorer';
import { LinkCard } from '../../ui/LinkCard';
import { StatTile } from '../../ui/StatTile';
import { Reveal } from '../../ui/motion/Reveal';

interface CaseSummaryProps {
  registry: SectionRegistry;
  onOpen: (sub: string) => void;
}

const accents: Record<string, string> = { escuchar: '--accent-escucha', comprender: '--accent-comprension', realimentar: '--accent-realimentacion' };
const indexIcons = [Repeat2, BarChart3, Compass];

export function CaseSummary({ registry, onOpen }: CaseSummaryProps) {
  const [moment, setMoment] = useState(summaryMoments[0].id);
  const tabs = (registry.byId(CASE_SECTION_ID)?.subsections ?? []).filter(t => t.id !== 'resumen');
  return <>
    <div className="page-heading"><span className="eyebrow">{summary.eyebrow}</span><h2>{summary.title}</h2><p>{summary.why}</p><p>{summary.how}</p></div>
    <AnchorTabs items={summaryIndex.map((item, i) => ({ ...item, icon: indexIcons[i] }))} />

    <Reveal><section id="aplic-ciclo" className="case-section" aria-labelledby="case-cycle">
      <h2 id="case-cycle">El ciclo, aplicado al caso</h2>
      <p className="case-aside">Elige un momento para ver qué se hizo en Asesoría.</p>
      <CycleExplorer
        ariaLabel="El ciclo aplicado al caso de Asesoría"
        center="Memoria institucional activa"
        selectedId={moment}
        onSelect={setMoment}
        nextLabel={t => `Siguiente: ${t}`}
        restartLabel="Y vuelve a escuchar"
        nodes={summaryMoments.map(m => ({ id: m.id, label: m.title, accent: accents[m.id] }))}
        renderPanel={(id, i) => {
          const m = summaryMoments[i];
          const link = summaryMomentLinks[id];
          return <article className={`case-moment-panel moment-${id}`}>
            <span className="case-moment-number">0{i + 1}</span>
            <h3>{m.title}</h3>
            <p>{m.text}</p>
            {link && <button className="secondary" onClick={() => onOpen(link.sub)}>{link.label}<ArrowRight size={15} aria-hidden="true" /></button>}
          </article>;
        }} />
    </section></Reveal>

    <section id="aplic-cifras" className="case-section" aria-labelledby="case-figures">
      <h2 id="case-figures">En cifras</h2>
      <div className="case-figures">{summaryFigures.map(f => <StatTile key={f.label} {...f} />)}</div>
    </section>

    <Reveal><section id="aplic-recorre" className="case-section" aria-labelledby="case-explore">
      <h2 id="case-explore">Recorre el caso</h2>
      <p className="case-aside">Seis paradas, en el orden en que cuentan la historia.</p>
      <ol className="case-path">{tabs.map((t, i) => <li key={t.id}><span className="case-path-n">{i + 1}</span><LinkCard title={t.label} text={t.description} icon={t.icon} onClick={() => onOpen(t.id)} /></li>)}</ol>
    </section></Reveal>

    <Reveal><Callout tone="scope" title="Qué tan lejos llegó">Dos sesiones corrieron de punta a punta desde audio sintético y cuarenta se replicaron en texto. La conexión en vivo con Microsoft Teams está diseñada, no desplegada. El detalle está en la pestaña de validación.</Callout></Reveal>
  </>;
}
