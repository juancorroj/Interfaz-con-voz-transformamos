import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, BookOpen, Search } from 'lucide-react';
import type { SectionRegistry } from '../../app/SectionRegistry';
import { faqIntro, faqItems } from '../../content/ficha/preguntas';
import { Accordion, type AccordionItem } from '../../ui/Accordion';
import { ALL_TOPICS, FAQ_SUGGESTIONS, filterFaq, relatedFaq, splitAnswer, topicCounts } from './faq';
import { topicIcons } from './topicIcons';
import './faq.css';

interface FaqPageProps {
  registry: SectionRegistry;
  /** Pregunta abierta al llegar (parámetro `q` de la URL). */
  initialOpen?: string;
  onNavigate: (id: string, sub?: string) => void;
  /** Se llama al abrir o cerrar una pregunta, para reflejarlo en la URL. */
  onOpenChange: (id: string | undefined) => void;
  onHelp: () => void;
}

const topics = topicCounts(faqItems);


/** Preguntas frecuentes con búsqueda, filtro por tema y enlace directo a cada respuesta. */
export function FaqPage({ registry, initialOpen, onNavigate, onOpenChange, onHelp }: FaqPageProps) {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState(ALL_TOPICS);
  const [openId, setOpenId] = useState<string | undefined>(faqItems.some(i => i.id === initialOpen) ? initialOpen : undefined);

  const visible = useMemo(() => filterFaq(faqItems, { query, topic }), [query, topic]);

  // Si llegaron por un enlace a una pregunta, se desplaza hasta ella.
  useEffect(() => {
    if (!openId) return;
    const timer = window.setTimeout(() => document.getElementById(`faq-${openId}`)?.scrollIntoView({ block: 'center' }), 150);
    return () => window.clearTimeout(timer);
    // Solo al montar: después, abrir una pregunta no debe mover la página.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (id: string | undefined) => { setOpenId(id); onOpenChange(id); };
  // Abrir una pregunta relacionada quita los filtros para que siempre esté a la vista.
  const openRelated = (id: string) => {
    setQuery(''); setTopic(ALL_TOPICS); toggle(id);
    window.setTimeout(() => document.getElementById(`faq-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
  };

  const items: AccordionItem[] = visible.map(item => {
    const target = item.linksTo ? registry.resolveStep(item.linksTo) : undefined;
    const related = relatedFaq(faqItems, item.id);
    return {
      id: item.id,
      meta: item.topic,
      title: item.question,
      content: <div className="faq-answer">
        {(() => { const { lead, rest } = splitAnswer(item.answer); return <p>{lead && <strong>{lead} </strong>}{rest}</p>; })()}
        <div className="faq-meta">
          <span className="faq-source"><BookOpen size={13} aria-hidden="true" />{item.source}</span>
          {target && <button className="secondary faq-more" onClick={() => onNavigate(target.id, target.sub)}>Ver más: {target.label}<ArrowUpRight size={14} aria-hidden="true" /></button>}
        </div>
        {related.length > 0 && <div className="faq-related"><span>Preguntas relacionadas</span><ul>{related.map(r => <li key={r.id}><button onClick={() => openRelated(r.id)}>{r.question}</button></li>)}</ul></div>}
      </div>,
    };
  });

  return <div className="faq">
    <div className="page-heading"><span className="eyebrow">{faqIntro.eyebrow}</span><h1 className="display-title" aria-label={faqIntro.title}>{faqIntro.titleLines.map(l => <span key={l}>{l}<br /></span>)}<em>{faqIntro.titleAccent}</em></h1><p>{faqIntro.lead}</p></div>

    <div className="faq-search">
      <label className="faq-search-box"><Search size={22} aria-hidden="true" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Escribe tu duda: costos, consentimiento, tiempo…" aria-label="Buscar en las preguntas" /></label>
      <p className="faq-suggest"><span>Prueba con</span>{FAQ_SUGGESTIONS.map(q => <button key={q} onClick={() => { setQuery(q); setTopic(ALL_TOPICS); }}>{q}</button>)}</p>
    </div>
    <div className="faq-topics" role="group" aria-label="Filtrar por tema">
      {[{ topic: ALL_TOPICS, count: faqItems.length }, ...topics].map(({ topic: t, count }) => {
        const Icon = topicIcons[t];
        return <button key={t} className={t === topic ? 'selected' : ''} aria-pressed={t === topic} onClick={() => setTopic(t)}>
          {Icon && <Icon size={22} aria-hidden="true" />}<strong>{t === ALL_TOPICS ? 'Todas' : t}</strong><small>{count} {count === 1 ? 'pregunta' : 'preguntas'}</small>
        </button>;
      })}
    </div>
    <p className="results-count" aria-live="polite">{visible.length} {visible.length === 1 ? 'pregunta' : 'preguntas'}</p>

    {visible.length > 0
      ? <Accordion idPrefix="faq" items={items} openId={openId} onToggle={toggle} />
      : <div className="empty-state">No encontramos preguntas con esa búsqueda. Prueba con otras palabras o quita el filtro de tema.</div>}

    <div className="faq-help"><p>¿No encuentras tu duda?</p><button className="secondary" onClick={onHelp}>Ver la guía de la web</button></div>
  </div>;
}
