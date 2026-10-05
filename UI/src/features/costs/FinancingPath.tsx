import { Ban, Cloud, DoorOpen, Layers, Repeat, Users, Wallet, type LucideIcon } from 'lucide-react';
import type { TitledText } from '../../content/types';

interface Zone {
  title: string;
  hint: string;
  ids: readonly string[];
}

/** Las seis decisiones de la ficha, agrupadas por lo que hacen: lo que no se compra, lo que baja el costo y cómo se acota el riesgo. */
const zones: readonly Zone[] = [
  { title: 'Lo que no se compra', hint: 'Se aprovecha lo que la Universidad ya tiene', ids: ['plataforma', 'experticia', 'no-gasta'] },
  { title: 'Lo que baja el costo', hint: 'Dos palancas, con cifras de la ficha', ids: ['arquitectura', 'escalamiento'] },
  { title: 'Cómo se acota el riesgo', hint: 'El gasto no se compromete de una vez', ids: ['tramos'] },
];

const icons: Record<string, LucideIcon> = { plataforma: Cloud, experticia: Users, 'no-gasta': Ban, arquitectura: Layers, escalamiento: Repeat, tramos: DoorOpen };

/** Cifra que cada palanca destaca; sale literal del texto de la ficha. */
const figures: Record<string, { big: string; small: string }> = {
  arquitectura: { big: '≈ 40 veces', small: 'menos por sesión al pasar a la configuración económica' },
  escalamiento: { big: '42 % a 85 %', small: 'de lo construido se reutiliza en cada proceso nuevo' },
};

export function FinancingPath({ items }: { items: readonly TitledText[] }) {
  const byId = new Map(items.map(i => [i.id, i]));
  return <div className="fzones">{zones.map((z, k) => <section key={z.title} className={`fzone z${k + 1}`} aria-label={z.title}>
    <header><span className="fzone-n">{k + 1}</span><div><h3>{z.title}</h3><small>{z.hint}</small></div></header>
    <ul>{z.ids.map(id => { const it = byId.get(id); if (!it) return null; const Icon = icons[id] ?? Wallet; const fig = figures[id]; return <li key={id}>
      <span className="fzone-icon"><Icon size={18} aria-hidden="true" /></span>
      <div>
        <strong>{it.title}</strong>
        {fig && <p className="fzone-fig"><b>{fig.big}</b><span>{fig.small}</span></p>}
        <p>{it.text}</p>
      </div>
    </li>; })}</ul>
  </section>)}</div>;
}
