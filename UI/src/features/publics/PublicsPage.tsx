import type { SectionRegistry } from '../../app/SectionRegistry';
import { SectionTabs } from '../../app/navigation/SectionTabs';
import { PublicDetail } from './PublicDetail';
import { publicsIntro } from '../../content/ficha/publicos';
import { PublicsOverview } from './PublicsOverview';
import './publics.css';

export const PUBLICS_SECTION_ID = 'publicos';

interface PublicsPageProps {
  registry: SectionRegistry;
  /** Pestaña activa: `panorama` o el id de un público. */
  sub?: string;
  onNavigate: (id: string, sub?: string) => void;
}

/** Los cinco públicos: un panorama comparativo y una pestaña por cada caso de uso. */
export function PublicsPage({ registry, sub, onNavigate }: PublicsPageProps) {
  const tabs = registry.byId(PUBLICS_SECTION_ID)?.subsections ?? [];
  const active = tabs.find(t => t.id === sub)?.id ?? tabs[0]?.id;
  const open = (id: string) => onNavigate(PUBLICS_SECTION_ID, id);

  return <div className="publics">
    <header className="page-heading"><span className="eyebrow">{publicsIntro.eyebrow}</span><h1 className="display-title" aria-label={publicsIntro.title}>{publicsIntro.titleLines.map(l => <span key={l}>{l}<br /></span>)}<em>{publicsIntro.titleAccent}</em></h1><p className="publics-lead">{publicsIntro.lead}</p></header>
    <SectionTabs registry={registry} sectionId={PUBLICS_SECTION_ID} sub={sub} label="Públicos" onNavigate={onNavigate} />
    <div className="publics-content" key={active}>
      {active === 'panorama' || !active
        ? <PublicsOverview onOpenPublic={open} onNavigate={onNavigate} />
        : <PublicDetail publicId={active} onNavigate={onNavigate} />}
    </div>
  </div>;
}
