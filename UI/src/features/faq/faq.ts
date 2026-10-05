import type { FaqItem } from '../../content/types';

export const ALL_TOPICS = 'todos';

/** Minúsculas y sin tildes, para que «politica» encuentre «política». */
export const normalize = (text: string): string =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

export interface FaqFilter {
  query: string;
  topic: string;
}

/**
 * Filtra por tema y por texto. Cada palabra de la búsqueda debe aparecer en la
 * pregunta, la respuesta o el tema, sin importar el orden ni las tildes.
 */
export function filterFaq(items: readonly FaqItem[], { query, topic }: FaqFilter): FaqItem[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return items.filter(item => {
    if (topic !== ALL_TOPICS && item.topic !== topic) return false;
    if (terms.length === 0) return true;
    const haystack = normalize(`${item.question} ${item.answer} ${item.topic}`);
    return terms.every(term => haystack.includes(term));
  });
}

/** Temas en el orden en que aparecen por primera vez. */
export function faqTopics(items: readonly FaqItem[]): string[] {
  return [...new Set(items.map(i => i.topic))];
}

/** Cantidad de preguntas por tema, en el orden en que aparecen los temas. */
export function topicCounts(items: readonly FaqItem[]): { topic: string; count: number }[] {
  return faqTopics(items).map(topic => ({ topic, count: items.filter(i => i.topic === topic).length }));
}

/**
 * Separa la primera oración de una respuesta, que es la que se resalta. Si la respuesta es una sola oración o la
 * primera es demasiado larga para ser un titular, no se resalta nada.
 */
export function splitAnswer(answer: string, maxLead = 220): { lead: string; rest: string } {
  const match = /^(.+?[.!?])\s+(?=[A-ZÁÉÍÓÚÑ¿¡])/.exec(answer);
  if (!match || match[1].length > maxLead) return { lead: '', rest: answer };
  return { lead: match[1], rest: answer.slice(match[0].length) };
}

/** Otras preguntas del mismo tema que la dada, para seguir leyendo. */
export function relatedFaq(items: readonly FaqItem[], id: string, limit = 3): FaqItem[] {
  const current = items.find(i => i.id === id);
  if (!current) return [];
  return items.filter(i => i.topic === current.topic && i.id !== id).slice(0, limit);
}

/** Búsquedas de ejemplo que se ofrecen bajo el buscador. */
export const FAQ_SUGGESTIONS = ['costos', 'consentimiento', 'audio', 'tiempo'] as const;
