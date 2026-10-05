import type { LucideIcon } from 'lucide-react';
import type { TitledText } from '../../content/types';
import { Reveal } from '../../ui/motion/Reveal';

interface PrinciplePillarsProps {
  /** La idea que sostienen los principios; va como techo. */
  roofLabel: string;
  roof: string;
  principles: readonly TitledText[];
  icons: Readonly<Record<string, LucideIcon>>;
}

/** Los principios como pilares: arriba, la idea que sostienen; abajo, cada principio con su icono. */
export function PrinciplePillars({ roofLabel, roof, principles, icons }: PrinciplePillarsProps) {
  return <div className="pil">
    <Reveal><div className="pil-roof"><span>{roofLabel}</span><p>{roof}</p></div></Reveal>
    <ul className="pil-columns">
      {principles.map((p, i) => { const Icon = icons[p.id]; return <li key={p.id}><Reveal delay={i * 0.08}><div className="pil-column">
        <span className="pil-icon">{Icon && <Icon size={26} aria-hidden="true" />}</span>
        <h3>{p.title}</h3>
        <p>{p.text}</p>
      </div></Reveal></li>; })}
    </ul>
    <div className="pil-base" aria-hidden="true" />
  </div>;
}
