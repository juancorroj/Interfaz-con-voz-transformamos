import { useMemo, useState } from 'react';
import { ArrowRight, Check, Compass, Info, Map as MapIcon, PlayCircle, Repeat2, ShieldCheck, Sparkles, X } from 'lucide-react';
import type { ResolvedStep, SectionRegistry } from '../../app/SectionRegistry';
import { HOME_SECTION_ID } from '../../app/sections';
import { capabilityTexts, cycleReturn, scopeDeclaration, guideRoutes, statusLegend, welcomeIntro, welcomeSummary, whatItIs, whatItIsNot } from '../../content/ficha/bienvenida';
import { phases } from '../shared/phases';
import { Callout } from '../../ui/Callout';
import { LinkCard } from '../../ui/LinkCard';
import { StatusBadge } from '../../ui/StatusBadge';
import { Reveal } from '../../ui/motion/Reveal';
import { MetroMap } from './MetroMap';
import { WelcomeHero } from './WelcomeHero';
import { resolveRoutes, stepKey } from './guide';
import { AnchorTabs } from '../../app/navigation/AnchorTabs';
import './welcome.css';

/** Bloques de la página a los que lleva la barra, en el orden en que aparecen. */
const blocks = [
  { id: 'bienvenida-que-es', label: '¿Qué es ResonancIA?', icon: Sparkles },
  { id: 'bienvenida-empezar', label: 'Por dónde empezar', icon: Compass },
  { id: 'bienvenida-mapa', label: 'Mapa web', icon: MapIcon },
  { id: 'bienvenida-alcance', label: 'Alcance', icon: Info },
] as const;
interface WelcomePageProps {
  registry: SectionRegistry;
  onNavigate: (id: string, sub?: string) => void;
  /** Abre La solución en el momento que corresponde a la fase (`escucha`, `analitica` o `respuesta`). */
  onPhase: (phase: string) => void;
}

/** Puerta de entrada: la idea, por dónde empezar, el mapa de la web y su alcance. */
export function WelcomePage({ registry, onNavigate, onPhase }: WelcomePageProps) {
  const routes = useMemo(() => resolveRoutes(guideRoutes, registry), [registry]);
  const [routeId, setRouteId] = useState(routes[0]?.id);
  const route = routes.find(r => r.id === routeId) ?? routes[0];
  const groups = registry.groups()
    .map(g => ({
      group: g.group,
      // Una sección con subpáginas se muestra por sus subpáginas, que son lo que la persona visita.
      entries: g.sections.filter(s => s.id !== HOME_SECTION_ID).flatMap((s): ResolvedStep[] =>
        s.subsections?.length
          ? s.subsections.map(sub => ({ id: s.id, sub: sub.id, label: sub.label, description: sub.description, icon: sub.icon ?? s.icon, status: sub.status }))
          : [{ id: s.id, label: s.label, description: s.description, icon: s.icon }]),
    }))
    .filter(g => g.entries.length > 0);

  return <div className="welcome">
    <WelcomeHero />

    <AnchorTabs items={blocks} />

    <Reveal><section id="bienvenida-que-es" className="welcome-section welcome-what" aria-labelledby="welcome-what">
      <span className="eyebrow">{welcomeIntro.eyebrow}</span>
      <h2 id="welcome-what" className="welcome-title">Escuchar para <em>acompañar.</em></h2>
      <p className="welcome-summary">{welcomeSummary.map((seg, i) => seg.tone === 'strong'
        ? <strong key={i}>{seg.text}</strong>
        : seg.tone ? <span key={i} className="welcome-accent">{seg.text}</span> : seg.text)}</p>
      <p className="welcome-premise"><strong>{welcomeIntro.premise}</strong></p>

      <div className="capabilities">
        <div className="section-heading"><div><span className="eyebrow">UN CICLO, TRES CAPACIDADES</span><h3 className="welcome-subheading">De escuchar a transformar.</h3></div><span className="muted">La tecnología conecta. Las personas deciden.</span></div>
        <div className="phase-grid">{phases.map((p, i) => <button key={p.id} className={`phase-card ${p.id}`} onClick={() => onPhase(p.id)}>
          <div className="card-top"><p.icon size={28} /><span>0{i + 1}</span></div>
          <small>{p.method}</small><h3>{p.title}</h3><p>{capabilityTexts[p.id] ?? p.description}</p>
          <div className="phase-bottom">{p.id === 'analitica' ? 'Equipo de Analítica · Apoyo metodológico' : 'Ver cómo funciona'}<ArrowRight size={18} /></div>
        </button>)}</div>
        <p className="welcome-return"><Repeat2 size={22} aria-hidden="true" /><span>{cycleReturn}</span></p>
      </div>
    </section></Reveal>

    {route && <Reveal><section id="bienvenida-empezar" className="welcome-section" aria-labelledby="welcome-routes">
      <div className="welcome-heading"><span className="eyebrow">POR DÓNDE EMPEZAR</span><h2 id="welcome-routes">¿Qué quieres saber?</h2></div>
      <div className="route-picker" role="group" aria-label="Elige un recorrido">
        {routes.map(r => <button key={r.id} className={r.id === route.id ? 'selected' : ''} aria-pressed={r.id === route.id} onClick={() => setRouteId(r.id)}>{r.title}</button>)}
      </div>
      <div className="route-detail" aria-live="polite">
        <p>{route.intro}</p>
        {route.video && <div className="route-video">
          <button className="secondary" disabled={!route.video.available} aria-describedby="route-video-note"><PlayCircle size={18} aria-hidden="true" />{route.video.label}</button>
          {!route.video.available && <span id="route-video-note">{route.video.note}</span>}
        </div>}
        <ol className="route-steps">{route.steps.map((s, i) => <li key={stepKey(s)}><span className="step-number">{i + 1}</span><LinkCard title={s.label} text={s.description} icon={s.icon} meta={s.status && <StatusBadge kind={s.status} />} onClick={() => onNavigate(s.id, s.sub)} /></li>)}</ol>
      </div>
    </section></Reveal>}

    <Reveal><section id="bienvenida-mapa" className="welcome-section" aria-labelledby="welcome-map">
      <div className="welcome-heading"><span className="eyebrow">MAPA WEB</span><h2 id="welcome-map">Qué encontrarás y dónde.</h2></div>
      <MetroMap stations={groups} onNavigate={onNavigate} />
    </section></Reveal>

    <Reveal><section id="bienvenida-alcance" className="welcome-section" aria-labelledby="welcome-scope">
      <div className="welcome-heading"><span className="eyebrow">ALCANCE</span><h2 id="welcome-scope">Qué es y qué no es esta web.</h2></div>
      <div className="scope-grid">
        <div className="scope-col scope-is"><h3>Qué es</h3><ul>{whatItIs.map(s => <li key={s.text}><Check size={15} aria-hidden="true" />{s.text}</li>)}</ul></div>
        <div className="scope-col scope-not"><h3>Qué no es (todavía)</h3><ul>{whatItIsNot.map(s => <li key={s.text}><X size={15} aria-hidden="true" />{s.text}</li>)}</ul></div>
      </div>
      <Callout tone="scope" icon={ShieldCheck} title="Declaramos el alcance con precisión">{scopeDeclaration}</Callout>
      <h3 className="welcome-subtitle" id="welcome-legend">Cómo leer los sellos</h3>
      <p className="welcome-sublead">Verás estas marcas en toda la web.</p>
      <ul className="legend" aria-labelledby="welcome-legend">{statusLegend.map(l => <li key={l.kind}><StatusBadge kind={l.kind} /><p>{l.text}</p></li>)}</ul>
    </section></Reveal>
  </div>;
}
