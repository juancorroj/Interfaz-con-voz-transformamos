import type { StatusKind } from '../content/types';
import './ui.css';

export const statusLabels: Record<StatusKind, string> = {
  ejecutado: 'Ejecutado y validado',
  disenado: 'Diseñado, no ejecutado',
  ficticio: 'Ejemplo simulado real',
};

/** Sello de estado común a toda la web. El texto siempre acompaña al color. */
export function StatusBadge({ kind, label }: { kind: StatusKind; label?: string }) {
  return <span className={`ui-badge ui-badge-${kind}`}><i aria-hidden="true" />{label ?? statusLabels[kind]}</span>;
}
