import { Reveal } from '../../ui/motion/Reveal';

interface PurposePathProps {
  /** Frase que introduce los verbos. */
  lead: string;
  /** Una oración por propósito; empieza por el verbo. */
  items: readonly string[];
  /** Verbos con que empiezan las oraciones, en el mismo orden. */
  verbs: readonly string[];
}

/** Separa el verbo del resto de la oración de un propósito. */
export function splitPurpose(item: string, verb: string): { verb: string; rest: string } {
  return item.startsWith(verb) ? { verb, rest: item.slice(verb.length).trim() } : { verb: '', rest: item };
}

/** Los propósitos de la asesoría como un camino de verbos: cada parada es una acción y lo que la completa. */
export function PurposePath({ lead, items, verbs }: PurposePathProps) {
  return <div className="pp">
    <p className="pp-lead">{lead}</p>
    <ol className="pp-path">
      {items.map((item, i) => { const { verb, rest } = splitPurpose(item, verbs[i] ?? ''); return <li key={item}><Reveal delay={i * 0.08}>
        <span className="pp-dot" aria-hidden="true">{i + 1}</span>
        {verb && <strong>{verb}</strong>}
        <p>{rest}</p>
      </Reveal></li>; })}
    </ol>
  </div>;
}
