import { useState } from 'react';
import { ArrowRight, BriefcaseBusiness, Building2, GraduationCap, Handshake, Presentation, type LucideIcon } from 'lucide-react';
import type { AudienceVision } from '../../content/types';
import { StatusBadge } from '../../ui/StatusBadge';

interface AudienceExplorerProps {
  visions: readonly AudienceVision[];
  onOpenAudience: (id: string) => void;
}

const icons: Record<string, LucideIcon> = { estudiantes: GraduationCap, graduados: BriefcaseBusiness, profesores: Presentation, administrativos: Building2, aliados: Handshake };

/** Qué se espera para cada público: se elige un público arriba y sus tres ideas se leen en grande, una bajo otra. */
export function AudienceExplorer({ visions, onOpenAudience }: AudienceExplorerProps) {
  const [selectedId, setSelectedId] = useState(visions[0]?.id);
  const current = visions.find(v => v.id === selectedId) ?? visions[0];
  if (!current) return null;

  return <div className="aud">
    <div className="aud-picker" role="group" aria-label="Elige un público">
      {visions.map(v => {
        const Icon = icons[v.id];
        return <button key={v.id} className={v.id === current.id ? 'active' : ''} aria-pressed={v.id === current.id} onClick={() => setSelectedId(v.id)}>
          {Icon && <Icon size={22} aria-hidden="true" />}<strong>{v.title}</strong><StatusBadge kind={v.status} />
        </button>;
      })}
    </div>
    <article className="aud-panel" key={current.id} aria-live="polite">
      <header>
        <h2>{current.title}</h2>
        <button className="secondary" onClick={() => onOpenAudience(current.id)}>Ver el caso de uso <ArrowRight size={15} /></button>
      </header>
      <p className="aud-label">Lo que se espera para este público</p>
      <ol>{current.points.map((p, i) => <li key={p}><span>{i + 1}</span><p>{p}</p></li>)}</ol>
    </article>
  </div>;
}
