import type { ReactNode } from 'react';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import './ui.css';

interface LinkCardProps {
  title: string;
  text?: string;
  icon?: LucideIcon;
  meta?: ReactNode;
  onClick: () => void;
}

/** Tarjeta que lleva a otra parte de la web. */
export function LinkCard({ title, text, icon: Icon, meta, onClick }: LinkCardProps) {
  return <button className="ui-linkcard" onClick={onClick}>
    {Icon && <Icon size={22} className="ui-linkcard-icon" />}
    <span className="ui-linkcard-body"><strong>{title}</strong>{text && <small>{text}</small>}{meta}</span>
    <ArrowRight size={16} className="ui-linkcard-arrow" />
  </button>;
}
