import { describe, expect, it } from 'vitest';
import { SectionRegistry, type SectionDefinition } from '../../app/SectionRegistry';
import { createSectionRegistry } from '../../app/sections';
import { guideRoutes } from '../../content/ficha/bienvenida';
import { resolveRoutes, stepKey } from './guide';

const icon = (() => null) as unknown as SectionDefinition['icon'];

describe('resolveRoutes', () => {
  const registry = new SectionRegistry()
    .registerGroup({ id: 'g', label: 'G' })
    .register({ id: 'a', label: 'A', icon, group: 'g' })
    .register({ id: 'b', label: 'B', icon, group: 'g', hidden: true })
    .register({ id: 'c', label: 'C', icon, group: 'g', subsections: [{ id: 'x', label: 'X' }] });

  it('omite pasos inexistentes u ocultos y conserva el orden', () => {
    const [route] = resolveRoutes([{ id: 'r', title: 'R', intro: '', steps: ['c', 'zzz', 'b', 'a'] }], registry);
    expect(route.steps.map(s => s.id)).toEqual(['c', 'a']);
  });

  it('resuelve pasos con subpágina', () => {
    const [route] = resolveRoutes([{ id: 'r', title: 'R', intro: '', steps: ['c/x', 'c/zzz'] }], registry);
    expect(route.steps.map(stepKey)).toEqual(['c/x']);
  });

  it('descarta los recorridos sin ningún paso visitable', () => {
    expect(resolveRoutes([{ id: 'r', title: 'R', intro: '', steps: ['zzz', 'b'] }], registry)).toEqual([]);
  });
});

describe('recorridos de la bienvenida con las secciones actuales', () => {
  const routes = resolveRoutes(guideRoutes, createSectionRegistry());

  it('ofrece solo los que ya se pueden recorrer', () => {
    expect(routes.map(r => r.id)).toEqual(['cinco-minutos', 'historia', 'entender', 'funciona', 'viabilidad', 'proceso']);
  });

  it('el recorrido para entender la propuesta incluye sus cuatro páginas', () => {
    expect(routes.find(r => r.id === 'entender')?.steps.map(stepKey)).toEqual(['solucion', 'beneficios', 'distintos', 'preguntas']);
  });

  it('los recorridos de viabilidad y de dueño de proceso ya incluyen Implementación, Costos y Ética', () => {
    expect(routes.find(r => r.id === 'viabilidad')?.steps.map(stepKey)).toEqual(['implementacion', 'costos', 'etica']);
    expect(routes.find(r => r.id === 'proceso')?.steps.map(stepKey)).toEqual(['solucion', 'publicos', 'etica']);
  });

  it('el recorrido de evidencia recorre las siete pestañas del caso', () => {
    expect(routes.find(r => r.id === 'funciona')?.steps.map(stepKey)).toEqual([
      'asesoria/resumen', 'asesoria/proceso', 'asesoria/memoria', 'asesoria/operacion', 'asesoria/malla', 'asesoria/agentes', 'asesoria/validacion', 'soporte',
    ]);
  });
});
