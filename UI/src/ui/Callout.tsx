import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import './ui.css';

interface CalloutProps {
  title?: string;
  /** Icono junto al título, para que un aviso no se sienta frío. */
  icon?: LucideIcon;
  /** `scope` destaca un límite o alcance declarado; `info` una nota general. */
  tone?: 'info' | 'scope';
  children: ReactNode;
}

export function Callout({ title, icon: Icon, tone = 'info', children }: CalloutProps) {
  return <aside className={`ui-callout ui-callout-${tone}`}>{title && <strong className={Icon ? 'ui-callout-titled' : undefined}>{Icon && <Icon size={18} aria-hidden="true" />}{title}</strong>}<div>{children}</div></aside>;
}
