import type { ReactNode } from 'react';
import type { SectionRegistry } from '../../app/SectionRegistry';
import { SectionTabs } from '../../app/navigation/SectionTabs';
import { CASE_SECTION_ID } from '../../app/sections';
import { caseHeader, caseTabNotes } from '../../content/ficha/asesoria';
import { Callout } from '../../ui/Callout';
import { StatusBadge } from '../../ui/StatusBadge';
import './asesoria.css';

interface AsesoriaPageProps {
  registry: SectionRegistry;
  /** Pestaña activa; si falta, se muestra la primera. */
  sub?: string;
  onNavigate: (id: string, sub?: string) => void;
  /** Abre el bloque de señal de riesgo en Ética y marco legal. */
  onOpenRisk: () => void;
  /** Contenido de la pestaña activa. */
  children: ReactNode;
}

/** Espacio del caso de Asesoría: encabezado, pestañas fijas y el contenido de la pestaña activa. */
export function AsesoriaPage({ registry, sub, onNavigate, onOpenRisk, children }: AsesoriaPageProps) {
  const tabs = registry.byId(CASE_SECTION_ID)?.subsections ?? [];
  const activeId = tabs.find(t => t.id === sub)?.id ?? tabs[0]?.id;
  const note = activeId ? caseTabNotes[activeId] : undefined;

  return <div className="case-hub">
    <header className="page-heading case-hero">
      <span className="eyebrow">{caseHeader.eyebrow}</span>
      <h1 className="display-title" aria-label={caseHeader.title}>{caseHeader.titleLines.map(l => <span key={l}>{l}<br /></span>)}<em>{caseHeader.titleAccent}</em></h1>
      <p className="case-hero-lead">{caseHeader.tagline}</p>
      <StatusBadge kind="ejecutado" label="Caso ejecutado" />
    </header>
    <SectionTabs registry={registry} sectionId={CASE_SECTION_ID} sub={sub} label="Partes del caso de Asesoría" onNavigate={onNavigate} />
    {note && <div className="case-note"><Callout tone="info">{note}{activeId === 'operacion' && <> <button className="inline-link" onClick={onOpenRisk}>Cómo se trata una señal de riesgo</button></>}</Callout></div>}
    <div className="case-content" key={activeId}>{children}</div>
  </div>;
}
