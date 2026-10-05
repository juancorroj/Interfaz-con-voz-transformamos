import { useState } from 'react';
import { BadgeCheck, Calculator, ExternalLink, FileText, MessageCircleQuestion, PenLine, Terminal, type LucideIcon } from 'lucide-react';
import { AnchorTabs } from '../../app/navigation/AnchorTabs';
import {
  asked, askedLead, askedTitle, corrections, correctionsLead, correctionsTitle, costSupport, supportDocuments,
  supportIndex, supportIntro, supportNotice, supportRings, supportScope, verifyClosing, verifyCommands, verifyLead, verifyTitle,
} from '../../content/ficha/soporte';
import { copyText } from '../../app/clipboard';
import { DataTable } from '../../ui/DataTable';
import { LinkCard } from '../../ui/LinkCard';
import { Reveal } from '../../ui/motion/Reveal';
import { AskedExplorer } from './AskedExplorer';
import { CommandTerminal } from './CommandTerminal';
import { EvidenceLibrary } from './EvidenceLibrary';
import { FigureRings } from './FigureRings';
import { ScopeLine } from './ScopeLine';
import { DocumentReader } from './DocumentReader';
import { documentLibrary } from './documents';
import './support.css';
import './support-visuals.css';

export const SUPPORT_SECTION_ID = 'soporte';

const indexIcons: LucideIcon[] = [BadgeCheck, FileText, PenLine, MessageCircleQuestion, Terminal, Calculator];

interface SupportPageProps {
  /** Documento abierto en el lector (`?doc=`), si lo hay. */
  doc?: string;
  /** Enlace completo a un documento. */
  linkFor: (docId: string) => string;
  onOpenDoc: (docId?: string) => void;
  onNavigate: (id: string, sub?: string) => void;
}

/** Soporte técnico: lo clave de cada documento del Dossier y acceso al texto completo cuando se publica. */
export function SupportPage({ doc, linkFor, onOpenDoc, onNavigate }: SupportPageProps) {
  const [copied, setCopied] = useState<string>();
  if (doc && documentLibrary.has(doc)) return <DocumentReader key={doc} docId={doc} linkFor={linkFor} onOpenDoc={onOpenDoc} onBack={() => onOpenDoc(undefined)} />;

  const copyCommand = async (id: string, command: string) => {
    setCopied((await copyText(command)) ? id : `fail-${id}`);
    window.setTimeout(() => setCopied(undefined), 2400);
  };
  const titleOf = (id?: string) => supportDocuments.find(d => d.id === id)?.title;

  return <div className="support">
    <div className="page-heading"><span className="eyebrow">{supportIntro.eyebrow}</span><h1 className="display-title" aria-label={supportIntro.title}>{supportIntro.titleLines.map(l => <span key={l}>{l}<br /></span>)}<em>{supportIntro.titleAccent}</em></h1><p className="sup-hero-lead">{supportIntro.lead}</p></div>
    <AnchorTabs items={supportIndex.map((i, k) => ({ ...i, icon: indexIcons[k] }))} />
    <ScopeLine title={supportNotice.title} text={supportNotice.text} {...supportScope} />

    <Reveal><section id="comprobable" className="sup-section" aria-labelledby="sup-figures">
      <h2 id="sup-figures">Lo que se puede comprobar</h2>
      <FigureRings figures={supportRings} />
    </section></Reveal>

    <Reveal><section id="documentos" className="sup-section" aria-labelledby="sup-docs">
      <h2 id="sup-docs">Los documentos de evidencia</h2>
      <EvidenceLibrary documents={supportDocuments} onOpenDoc={onOpenDoc} />
    </section></Reveal>

    <Reveal><section id="correcciones" className="sup-section" aria-labelledby="sup-corrections">
      <h2 id="sup-corrections">{correctionsTitle}</h2>
      <p className="sup-lead">{correctionsLead}</p>
      <DataTable caption={correctionsTitle} columns={[{ key: 'claim', label: 'Afirmación previa' }, { key: 'status', label: 'Estado' }, { key: 'now', label: 'Hoy' }]} rows={corrections} />
    </section></Reveal>

    <Reveal><section id="preguntas-previsibles" className="sup-section" aria-labelledby="sup-asked">
      <h2 id="sup-asked">{askedTitle}</h2>
      <p className="sup-lead">{askedLead}</p>
      <AskedExplorer items={asked} docTitle={titleOf} canOpen={id => !!id && documentLibrary.has(id)} onOpenDoc={onOpenDoc} />
    </section></Reveal>

    <Reveal><section id="comprobar" className="sup-section" aria-labelledby="sup-verify">
      <h2 id="sup-verify">{verifyTitle}</h2>
      <p className="sup-lead">{verifyLead}</p>
      <CommandTerminal commands={verifyCommands} copied={copied} onCopy={copyCommand} />
      <p className="sup-lead">{verifyClosing}</p>
    </section></Reveal>

    <Reveal><section id="soporte-costos" className="sup-section" aria-labelledby="sup-costs">
      <h2 id="sup-costs">{costSupport.title}</h2>
      <p className="sup-lead">{costSupport.text}</p>
      <p className="sup-files">{costSupport.files.map(f => <code key={f}>{f}</code>)}</p>
      <LinkCard title="Costos y simulador" text="Las cifras de la ficha, el modelo y los escenarios." icon={ExternalLink} onClick={() => onNavigate('costos')} />
    </section></Reveal>
  </div>;
}
