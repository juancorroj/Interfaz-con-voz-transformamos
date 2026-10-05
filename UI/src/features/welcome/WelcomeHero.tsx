import { Sparkles } from 'lucide-react';
import agents from '../../data/agents.json';
import { Galaxy } from '../shared/Galaxy';

/** Entrada de la web: la galaxia, el lema y las cifras que resumen el estado del proyecto. */
export function WelcomeHero() {
  const defined = agents.filter(a => a.kind === 'Agente definido').length;
  const roles = agents.filter(a => a.kind === 'Rol metodológico').length;
  return <>
    <section className="hero">
      <Galaxy />
      <div className="hero-copy">
        <div className="eyebrow"><Sparkles size={14} /> CONECTA · ANALIZA · ACTIVA · TRANSFORMA</div>
        <h1>Las voces conectan.<br />La memoria<br /><em>transforma.</em></h1>
        <p>Un ecosistema de inteligencia que convierte cada conversación en una oportunidad de comprender y acompañar.</p>
      </div>
      <div className="galaxy-caption"><span>R E S O N A N C I A</span><small>El conocimiento encuentra sus conexiones.</small></div>
    </section>
    <div className="stats">
      <div><strong>03</strong><p>Marcos metodológicos flexibles y conectados para diseñar procesos de escucha y realimentación</p></div>
      <div><strong>{defined} <span>+ {roles}</span></strong><p>Agentes y roles de apoyo metodológico</p></div>
      <div><strong>42</strong><p>Sesiones simuladas · 2 de punta a punta desde el audio</p></div>
      <div><strong>05</strong><p>Públicos con metodología y malla diseñadas</p></div>
      <div><strong>01</strong><p>Malla agéntica ejecutada: Asesoría Psicopedagógica</p></div>
    </div>
  </>;
}
