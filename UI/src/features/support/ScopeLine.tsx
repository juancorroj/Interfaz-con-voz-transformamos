import { AudioLines, UserRoundX } from 'lucide-react';

interface ScopeLineProps {
  title: string;
  text: string;
  total: number;
  endToEnd: number;
  endToEndLabel: string;
  replicatedLabel: string;
  facts: readonly string[];
}

/** El alcance validado de un vistazo: de las 42 sesiones, solo 2 se procesaron de punta a punta; el resto se replicó. */
export function ScopeLine({ title, text, total, endToEnd, endToEndLabel, replicatedLabel, facts }: ScopeLineProps) {
  return <section className="sx-scope" aria-labelledby="sx-scope-title">
    <h2 id="sx-scope-title">{title}</h2>
    <div className="sx-scope-dots" role="img" aria-label={`${total} sesiones: ${endToEnd} ${endToEndLabel}, ${total - endToEnd} ${replicatedLabel}`}>
      {Array.from({ length: total }, (_, i) => <i key={i} className={i < endToEnd ? 'real' : ''} />)}
    </div>
    <p className="sx-scope-legend"><span className="real"><i />{endToEnd} {endToEndLabel}</span><span><i />{total - endToEnd} {replicatedLabel}</span></p>
    <ul className="sx-scope-facts">{facts.map((f, i) => <li key={f}>{i === 0 ? <AudioLines size={16} aria-hidden="true" /> : <UserRoundX size={16} aria-hidden="true" />}{f}</li>)}</ul>
    <p className="sx-scope-text">{text}</p>
  </section>;
}
