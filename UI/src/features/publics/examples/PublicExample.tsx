import type { Audience } from '../../../data/audiences';
import { exampleNote } from '../../../content/ficha/publicos';
import { StatusBadge } from '../../../ui/StatusBadge';
import { ExampleBridge } from './ExampleBridge';
import { ExampleChat } from './ExampleChat';
import { ExampleConverge } from './ExampleConverge';
import { ExampleJourney } from './ExampleJourney';
import { ExampleLoop } from './ExampleLoop';
import './examples.css';

/** Cada público cuenta su ejemplo con la forma que mejor representa su caso; todas parten de los mismos seis pasos. */
const forms: Record<string, (props: { audience: Audience }) => JSX.Element> = {
  estudiantes: ExampleChat,
  graduados: ExampleJourney,
  profesores: ExampleLoop,
  administrativos: ExampleConverge,
  aliados: ExampleBridge,
};

export function PublicExample({ audience }: { audience: Audience }) {
  const Form = forms[audience.id] ?? ExampleJourney;
  return <section className="pub-section ex" aria-labelledby="pub-example">
    <div className="pub-example-head"><h2 id="pub-example">Un ejemplo para imaginarlo</h2><StatusBadge kind="ficticio" /></div>
    <p className="pub-lead">{exampleNote}</p>
    {audience.id !== 'estudiantes' && <blockquote className="ex-quote">{audience.quote}</blockquote>}
    <Form audience={audience} />
    <div className="ex-decision"><strong>{audience.output}</strong><p>Revisa y decide: {audience.owner}. Ninguna propuesta implica una decisión automática o un envío real.</p></div>
  </section>;
}
