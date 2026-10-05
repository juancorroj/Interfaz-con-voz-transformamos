import { ArrowRight, Check, Minus } from 'lucide-react';
import { audiences } from '../../data/audiences';
import { audienceVisions } from '../../content/ficha/beneficios';
import { codesignQuestions, impactCopy, layerTitles, publics } from '../../content/ficha/publicos';
import { ImpactPanel } from './ImpactPanel';
import { Callout } from '../../ui/Callout';
import { StatTile } from '../../ui/StatTile';
import { StatusBadge } from '../../ui/StatusBadge';
import { Reveal } from '../../ui/motion/Reveal';
import { PublicExample } from './examples/PublicExample';

interface PublicDetailProps {
  publicId: string;
  onNavigate: (id: string, sub?: string) => void;
}

/** El caso de uso de un público: qué existe, qué no, qué se necesita y un ejemplo ilustrativo. */
export function PublicDetail({ publicId, onNavigate }: PublicDetailProps) {
  const profile = publics.find(p => p.id === publicId) ?? publics[0];
  const vision = audienceVisions.find(v => v.id === profile.id);
  const example = audiences.find(a => a.id === profile.id);
  const total = profile.agents.listening + profile.agents.feedback;

  return <>
    <div className="page-heading">
      <span className="eyebrow">CASO DE USO · {profile.unit.toUpperCase()}</span>
      <h2>{profile.title}</h2>
      <p>{profile.focus}</p>
      <div className="pub-meta"><StatusBadge kind={profile.status} /></div>
    </div>

    {profile.impact && <ImpactPanel impact={profile.impact} label={impactCopy.label} caveat={impactCopy.caveat} />}

    {vision && <Reveal><section className="pub-section" aria-labelledby="pub-vision">
      <h2 id="pub-vision">Qué se espera para este público</h2>
      <ul className="pub-vision">{vision.points.map(p => <li key={p}>{p}</li>)}</ul>
      {profile.status === 'disenado' && <p className="pub-foot">Es el propósito de escucha que se propone: debe confirmarse con el dueño del proceso.</p>}
    </section></Reveal>}

    <Reveal><section className="pub-section" aria-labelledby="pub-layers">
      <h2 id="pub-layers">Dónde está este caso</h2>
      <div className="pub-layers">
        <article className="pub-layer exists"><h3>{layerTitles.exists}</h3><ul>{profile.exists.map(e => <li key={e}><Check size={15} aria-hidden="true" />{e}</li>)}</ul></article>
        <article className="pub-layer missing"><h3>{layerTitles.missing}</h3><ul>{profile.missing.map(e => <li key={e}><Minus size={15} aria-hidden="true" />{e}</li>)}</ul></article>
        <article className="pub-layer needs"><h3>{layerTitles.needs}</h3>
          <p>{profile.status === 'ejecutado' ? 'Para operar con personas reales, la Universidad debe habilitar las condiciones (Fase 1) y el equipo del proceso debe formarse y acompañar los primeros ciclos (Fase 2).' : `Lo define ${profile.unit}, con las cinco preguntas de co-diseño:`}</p>
          {profile.status !== 'ejecutado' && <ol>{codesignQuestions.map((q, i) => <li key={q}><span>{i + 1}</span>{q}</li>)}</ol>}
        </article>
      </div>
    </section></Reveal>

    <Reveal><section className="pub-section" aria-labelledby="pub-mesh">
      <h2 id="pub-mesh">La malla de agentes</h2>
      <div className="pub-stats">
        <StatTile value={String(profile.agents.listening)} label="agentes de escucha" />
        <StatTile value={String(profile.agents.feedback)} label="agentes de realimentación" />
        <StatTile value={String(total)} label="especificaciones en total" detail={profile.status === 'ejecutado' ? 'ejecutadas de punta a punta' : 'diseñadas, no ejecutadas'} />
      </div>
      <h3 className="pub-sub">Fichas temáticas propias de este dominio ({profile.thematic.length})</h3>
      <ul className="pub-chips">{profile.thematic.map(t => <li key={t}>{t}</li>)}</ul>
      <p className="pub-foot">
        {profile.reusePct === null
          ? 'Es la malla de origen: de ella se derivan las demás.'
          : `El ${profile.reusePct} % de esta malla se apoya en piezas ya construidas en la malla de Asesoría; lo nuevo son sus fichas temáticas.`}
      </p>
      <p className="pub-source">Documentación en el repositorio: <code>{profile.sourcePath}</code></p>
    </section></Reveal>

    {example && <Reveal><PublicExample audience={example} /></Reveal>}

    {profile.id === 'estudiantes'
      ? <Callout tone="info" title="Este es el caso que se puede recorrer">Toda la historia está en el caso de Asesoría Psicopedagógica: el proceso, la malla, la memoria entre sesiones y el espacio del profesional.
        <div className="pub-actions inline"><button className="primary" onClick={() => onNavigate('asesoria', 'resumen')}>Abrir el caso de Asesoría <ArrowRight size={16} /></button><button className="secondary" onClick={() => onNavigate('asesoria', 'memoria')}>Ver la memoria viva</button></div></Callout>
      : <div className="pub-actions"><button className="secondary" onClick={() => onNavigate('beneficios', 'publicos')}>Ver qué se espera para cada público</button><button className="text-button" onClick={() => onNavigate('implementacion')}>Cómo se extendería: Fase 4 del plan</button></div>}
  </>;
}
