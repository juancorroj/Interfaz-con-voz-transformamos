import { useEffect, useState } from 'react';
import { ArrowLeft, Link2 } from 'lucide-react';
import { readerNotice, supportDocuments } from '../../content/ficha/soporte';
import { copyText } from '../../app/clipboard';
import { Callout } from '../../ui/Callout';
import { Markdown, markdownOutline, type LinkTarget } from '../../ui/markdown/Markdown';
import { documentLibrary } from './documents';

interface DocumentReaderProps {
  docId: string;
  /** Enlace completo a este documento, para copiarlo. */
  linkFor: (docId: string) => string;
  onOpenDoc: (docId: string) => void;
  onBack: () => void;
}

type LoadState = { status: 'loading' } | { status: 'ready'; text: string } | { status: 'error' };

/** El título del documento ya es el de la página: no se repite en el cuerpo. */
const withoutTitle = (text: string) => text.replace(/^\s*#\s+[^\n]*\n/, '');

const scrollToHeading = (slug: string) => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(`md-${slug}`)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
};

/** Lee un documento del Dossier dentro de la web, con su índice de secciones. */
export function DocumentReader({ docId, linkFor, onOpenDoc, onBack }: DocumentReaderProps) {
  const meta = supportDocuments.find(d => d.id === docId);
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [copied, setCopied] = useState<'idle' | 'ok' | 'fail'>('idle');

  useEffect(() => {
    let active = true;
    setState({ status: 'loading' });
    documentLibrary.load(docId).then(
      text => active && setState({ status: 'ready', text }),
      () => active && setState({ status: 'error' }),
    );
    return () => { active = false; };
  }, [docId]);

  const copy = async () => {
    setCopied((await copyText(linkFor(docId))) ? 'ok' : 'fail');
    window.setTimeout(() => setCopied('idle'), 2400);
  };

  const resolveLink = (href: string): LinkTarget => {
    if (/^https?:\/\//i.test(href)) return { kind: 'external', href };
    const id = documentLibrary.idForHref(href);
    return id ? { kind: 'internal', onOpen: () => onOpenDoc(id) } : { kind: 'text' };
  };

  const outline = state.status === 'ready' ? markdownOutline(withoutTitle(state.text)) : [];

  return <div className="support-reader">
    <button className="text-button support-back" onClick={onBack}><ArrowLeft size={16} aria-hidden="true" />Volver al soporte técnico</button>
    <div className="page-heading">
      <span className="eyebrow">DOCUMENTO DE EVIDENCIA</span>
      <h1>{meta?.title ?? 'Documento'}</h1>
      {meta && <p><code>{meta.file}</code></p>}
      <div className="support-reader-actions"><button className="secondary" onClick={copy}><Link2 size={15} aria-hidden="true" />Copiar enlace</button><span role="status" aria-live="polite">{copied === 'ok' ? 'Enlace copiado' : copied === 'fail' ? 'No se pudo copiar' : ''}</span></div>
    </div>
    <Callout tone="scope" title="Antes de leer">{readerNotice.scope} {readerNotice.redaction}</Callout>
    {state.status === 'loading' && <p className="support-state" role="status">Cargando el documento…</p>}
    {state.status === 'error' && <Callout tone="scope" title="No se pudo cargar">El documento no está disponible en esta copia de la web. Puede consultarse en el repositorio: <code>{meta?.file}</code>.</Callout>}
    {state.status === 'ready' && <div className="support-reader-body">
      {outline.length > 1 && <nav className="page-index" aria-label="En este documento">{outline.map(o => <button key={o.slug} onClick={() => scrollToHeading(o.slug)}>{o.text}</button>)}</nav>}
      <Markdown source={withoutTitle(state.text)} resolveLink={resolveLink} />
    </div>}
  </div>;
}
