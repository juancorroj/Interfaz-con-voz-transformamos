import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { NavTarget } from '../SectionRegistry';

interface PageNavProps {
  prev?: NavTarget;
  next?: NavTarget;
  onNavigate: (id: string, sub?: string) => void;
}

/** Botones Anterior / Siguiente al final de una página. */
export function PageNav({ prev, next, onNavigate }: PageNavProps) {
  if (!prev && !next) return null;
  return <nav className="page-nav" aria-label="Navegación entre secciones">
    {prev ? <button className="page-nav-link prev" onClick={() => onNavigate(prev.id, prev.sub)}><ArrowLeft size={16} /><span><small>Anterior</small>{prev.label}</span></button> : <span />}
    {next ? <button className="page-nav-link next" onClick={() => onNavigate(next.id, next.sub)}><span><small>Siguiente</small>{next.label}</span><ArrowRight size={16} /></button> : <span />}
  </nav>;
}
