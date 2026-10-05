import { Banknote, Brain, Cloud, GraduationCap, HardHat, Mic, Plug, Scale, Users, type LucideIcon } from 'lucide-react';

interface Row { kind: string; item: string; nature: string; status: string }
interface Group { kind: string; title: string; hint: string }

interface CostStructureProps {
  rows: readonly Row[];
  groups: readonly Group[];
}

const icons: Record<string, LucideIcon> = {
  'Inferencia de los modelos': Brain,
  'Transcripción de audio': Mic,
  'Infraestructura y almacenamiento': Cloud,
  'Integraciones con Teams, App y sistemas': Plug,
  'Horas de las personas que participan': Users,
  'Formación del equipo profesional': GraduationCap,
  'Gobierno jurídico y ético': Scale,
  'Operación, monitoreo y evolución': HardHat,
};

/** «Calculado» es lo único con cifra; el resto se declara pendiente, sin inventar valores. */
const tone = (status: string) => status === 'Calculado' ? 'done' : status.startsWith('Por') ? 'todo' : 'info';

/** La estructura de costos agrupada por naturaleza, con el estado de cada rubro. */
export function CostStructure({ rows, groups }: CostStructureProps) {
  return <div className="cstruct">{groups.map(g => <section key={g.kind} className={`cstruct-col ${g.kind}`} aria-label={g.title}>
    <header><small>{g.hint}</small><h3>{g.title}</h3></header>
    <ul>{rows.filter(r => r.kind === g.kind).map(r => { const Icon = icons[r.item] ?? Banknote; return <li key={r.item}>
      <span className="cstruct-icon"><Icon size={18} aria-hidden="true" /></span>
      <div><strong>{r.item}</strong><small>{r.nature}</small><em className={tone(r.status)}>{r.status}</em></div>
    </li>; })}</ul>
  </section>)}</div>;
}
