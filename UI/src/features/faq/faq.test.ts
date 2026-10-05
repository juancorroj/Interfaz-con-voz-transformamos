import { describe, expect, it } from 'vitest';
import { faqItems } from '../../content/ficha/preguntas';
import { createSectionRegistry } from '../../app/sections';
import { ALL_TOPICS, faqTopics, filterFaq, normalize } from './faq';

describe('normalize', () => {
  it('ignora tildes y mayúsculas', () => {
    expect(normalize('  Política DE Retención ')).toBe('politica de retencion');
  });
});

describe('filterFaq', () => {
  it('sin filtros devuelve todo en orden', () => {
    expect(filterFaq(faqItems, { query: '', topic: ALL_TOPICS })).toEqual(faqItems);
  });

  it('filtra por tema', () => {
    const result = filterFaq(faqItems, { query: '', topic: 'Costos' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(i => i.topic === 'Costos')).toBe(true);
  });

  it('encuentra sin importar tildes', () => {
    const ids = filterFaq(faqItems, { query: 'analitica', topic: ALL_TOPICS }).map(i => i.id);
    expect(ids).toContain('quien-interpreta');
  });

  it('exige todas las palabras, en cualquier orden', () => {
    expect(filterFaq(faqItems, { query: 'audio palabra-inexistente', topic: ALL_TOPICS })).toEqual([]);
    const forward = filterFaq(faqItems, { query: 'conserva audio', topic: ALL_TOPICS }).map(i => i.id);
    const backward = filterFaq(faqItems, { query: 'audio conserva', topic: ALL_TOPICS }).map(i => i.id);
    expect(forward).toEqual(['audio']);
    expect(backward).toEqual(forward);
  });

  it('combina tema y texto', () => {
    expect(filterFaq(faqItems, { query: 'cuesta', topic: 'Implementación' })).toEqual([]);
  });
});

describe('faqTopics', () => {
  it('lista los temas sin repetir', () => {
    expect(faqTopics(faqItems)).toEqual(['Qué es', 'Cómo funciona', 'Personas y ética', 'Evidencia', 'Implementación', 'Costos', 'Alcance', 'Equipo']);
  });
});

describe('banco de preguntas', () => {
  it('tiene 27 preguntas con id único', () => {
    expect(faqItems).toHaveLength(27);
    expect(new Set(faqItems.map(i => i.id)).size).toBe(27);
  });

  it('cada pregunta cita su fuente y tiene respuesta', () => {
    for (const item of faqItems) {
      expect(item.source.length, item.id).toBeGreaterThan(0);
      expect(item.answer.length, item.id).toBeGreaterThan(40);
    }
  });

  it('los enlaces a páginas que ya existen apuntan a rutas válidas', () => {
    const registry = createSectionRegistry();
    const existing = ['solucion', 'distintos', 'asesoria/proceso', 'asesoria/validacion', 'asesoria/resumen', 'publicos', 'etica', 'implementacion', 'costos'];
    for (const item of faqItems.filter(i => i.linksTo && existing.includes(i.linksTo))) {
      expect(registry.resolveStep(item.linksTo!), item.id).toBeDefined();
    }
  });
});

import { FAQ_SUGGESTIONS, relatedFaq, splitAnswer, topicCounts } from './faq';

describe('topicCounts', () => {
  it('suma todas las preguntas', () => {
    expect(topicCounts(faqItems).reduce((n, t) => n + t.count, 0)).toBe(faqItems.length);
  });
});

describe('splitAnswer', () => {
  it('separa la primera oración y conserva el resto', () => {
    expect(splitAnswer('No. Es una decisión de diseño.')).toEqual({ lead: 'No.', rest: 'Es una decisión de diseño.' });
  });
  it('no parte números con punto', () => {
    expect(splitAnswer('Cuesta 14.000 pesos. Y mucho más.').lead).toBe('Cuesta 14.000 pesos.');
  });
  it('no resalta una respuesta de una sola oración ni una oración demasiado larga', () => {
    expect(splitAnswer('Está por definir').lead).toBe('');
    expect(splitAnswer(`${'palabra '.repeat(60)}fin. Otra.`).lead).toBe('');
  });
  it('con cualquier respuesta, lead y resto reconstruyen el texto', () => {
    for (const item of faqItems) {
      const { lead, rest } = splitAnswer(item.answer);
      expect(lead ? `${lead} ${rest}` : rest).toBe(item.answer);
    }
  });
});

describe('relatedFaq', () => {
  it('ofrece otras preguntas del mismo tema y nunca la misma', () => {
    const related = relatedFaq(faqItems, 'que-es');
    expect(related.length).toBeGreaterThan(0);
    expect(related.every(i => i.topic === 'Qué es' && i.id !== 'que-es')).toBe(true);
  });
  it('un tema con una sola pregunta no ofrece relacionadas', () => {
    const solo = topicCounts(faqItems).find(t => t.count === 1)!;
    expect(relatedFaq(faqItems, faqItems.find(i => i.topic === solo.topic)!.id)).toEqual([]);
  });
});

describe('búsquedas de ejemplo', () => {
  it('cada una encuentra al menos una pregunta', () => {
    for (const q of FAQ_SUGGESTIONS) expect(filterFaq(faqItems, { query: q, topic: ALL_TOPICS }).length, q).toBeGreaterThan(0);
  });
});
