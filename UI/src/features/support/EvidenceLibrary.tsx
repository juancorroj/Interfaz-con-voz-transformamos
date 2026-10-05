import { useState } from 'react';
import { BookOpen, Check, FileText, Lock } from 'lucide-react';
import type { SupportDocument } from '../../content/ficha/soporte';

interface EvidenceLibraryProps {
  documents: readonly SupportDocument[];
  onOpenDoc: (docId: string) => void;
}

/** Biblioteca de evidencia: la lista de documentos a la izquierda y, al elegir uno, qué permite comprobar y sus puntos clave. */
export function EvidenceLibrary({ documents, onOpenDoc }: EvidenceLibraryProps) {
  const [selected, setSelected] = useState(documents[0]?.id);
  const doc = documents.find(d => d.id === selected) ?? documents[0];
  if (!doc) return null;
  return <div className="sx-lib">
    <ul className="sx-lib-list" aria-label="Documentos de evidencia">{documents.map((d, i) => <li key={d.id}>
      <button className={d.id === doc.id ? 'active' : ''} aria-pressed={d.id === doc.id} onClick={() => setSelected(d.id)}>
        <span className="sx-lib-n">{i + 1}</span>
        <span className="sx-lib-title">{d.title}</span>
        {d.badge && <em>{d.badge}</em>}
        {d.mode === 'summary' && <Lock size={13} aria-label="Solo se resume" />}
      </button>
    </li>)}</ul>
    <article className="sx-lib-detail" key={doc.id} aria-live="polite">
      <header>
        <FileText size={22} aria-hidden="true" />
        <div><h3>{doc.title}</h3><code>{doc.file}</code></div>
      </header>
      <p className="sx-lib-verifies"><b>Permite comprobar</b>{doc.verifies}</p>
      <ul>{doc.points.map(p => <li key={p}><Check size={15} aria-hidden="true" />{p}</li>)}</ul>
      {doc.mode === 'full'
        ? <button className="secondary" onClick={() => onOpenDoc(doc.id)}><BookOpen size={15} aria-hidden="true" />Leer el documento completo</button>
        : <p className="sup-summary-note">Se resume aquí y no se publica completo: {doc.summaryReason}</p>}
    </article>
  </div>;
}
